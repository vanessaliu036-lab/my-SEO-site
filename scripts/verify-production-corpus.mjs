const isVercelProduction = process.env.VERCEL === "1" && process.env.VERCEL_ENV === "production"

const BASELINES = {
  OCC_Blog_Posts: 1753,
  OCC_INDEXED_PROTECTED: 1310,
  canonicalUnion: 1841,
}

function fail(message) {
  console.error(`Blocked production deployment: ${message}`)
  process.exit(1)
}

function slugifyText(text) {
  return String(text || "")
    .trim()
    .replace(/\s+/g, " ")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase()
}

function canonicalSlug(rawSlug, title) {
  let value = String(rawSlug || "").trim()
  try {
    value = decodeURIComponent(value)
  } catch {
    // Preserve raw value if URL decoding fails.
  }

  value = value.replace(/^\/+/, "").replace(/^\/?blog\/?/i, "").trim()
  const parts = value.split("/").filter(Boolean)
  const direct = (parts.length ? parts[parts.length - 1] : value).trim()
  if (/^[a-z0-9]+(?:[-_][a-z0-9]+)*$/i.test(direct)) return direct.toLowerCase()

  const derived = slugifyText(title)
  return /^[a-z0-9]+(?:[-_][a-z0-9]+)*$/i.test(derived) ? derived : ""
}

function pick(fields, keys) {
  for (const key of keys) {
    const value = fields?.[key]
    if (typeof value === "string" && value.trim()) return value.trim()
    if (typeof value === "number") return String(value)
  }
  return ""
}

async function sleep(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

async function fetchPage(url, apiKey) {
  let lastError
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${apiKey}` },
        cache: "no-store",
      })
      if (response.ok) return response.json()
      const body = (await response.text()).slice(0, 300)
      lastError = new Error(`${response.status} ${body}`)
      if (![429, 500, 502, 503, 504].includes(response.status)) break
    } catch (error) {
      lastError = error
    }
    await sleep(300 * 2 ** attempt)
  }
  throw lastError || new Error("Airtable request failed")
}

async function fetchTable(tableName, baseId, apiKey) {
  const records = []
  let offset

  do {
    const params = new URLSearchParams()
    params.set("pageSize", "100")
    // Only request fields guaranteed to exist in both canonical tables. Corpus
    // identity needs title + slug; table-specific editorial fields are unnecessary.
    params.append("fields[]", "title")
    params.append("fields[]", "slug")
    if (offset) params.set("offset", offset)

    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}?${params}`
    const data = await fetchPage(url, apiKey)
    if (!Array.isArray(data.records)) fail(`Airtable returned an invalid record list for ${tableName}.`)
    records.push(...data.records)
    offset = typeof data.offset === "string" && data.offset ? data.offset : undefined
    if (offset) await sleep(260)
  } while (offset)

  return records
}

async function verifyProductionCorpus() {
  if (!isVercelProduction) return

  if (process.env.NODE_ENV === "test" && process.env.OCC_TEST_CANONICAL_CORPUS_COUNT) {
    const count = Number(process.env.OCC_TEST_CANONICAL_CORPUS_COUNT)
    if (!Number.isFinite(count) || count < BASELINES.canonicalUnion) {
      fail(`Research Journal canonical corpus ${count} is below verified baseline ${BASELINES.canonicalUnion}.`)
    }
    return
  }

  const apiKey = process.env.AIRTABLE_API_KEY || process.env.AIRTABLE_PAT || process.env.AIRTABLE_TOKEN
  const baseId = process.env.AIRTABLE_BASE_ID
  if (!apiKey || !baseId) fail("Airtable credentials are missing; corpus integrity cannot be verified.")

  const blogRecords = await fetchTable("OCC_Blog_Posts", baseId, apiKey)
  const protectedRecords = await fetchTable("OCC_INDEXED_PROTECTED", baseId, apiKey)

  if (blogRecords.length < BASELINES.OCC_Blog_Posts) {
    fail(`OCC_Blog_Posts count ${blogRecords.length} is below verified baseline ${BASELINES.OCC_Blog_Posts}.`)
  }
  if (protectedRecords.length < BASELINES.OCC_INDEXED_PROTECTED) {
    fail(`OCC_INDEXED_PROTECTED count ${protectedRecords.length} is below verified baseline ${BASELINES.OCC_INDEXED_PROTECTED}.`)
  }

  const seen = new Set()
  for (const record of [...blogRecords, ...protectedRecords]) {
    const fields = record?.fields || {}
    const slug = canonicalSlug(
      pick(fields, ["slug", "Slug"]),
      pick(fields, ["title", "Title", "source_title", "Source Title", "Title (Blogger URL)"]),
    )
    if (slug) seen.add(slug)
  }

  if (seen.size < BASELINES.canonicalUnion) {
    fail(`Research Journal canonical corpus ${seen.size} is below verified baseline ${BASELINES.canonicalUnion}.`)
  }

  console.log(
    `Production corpus verified: OCC_Blog_Posts=${blogRecords.length}, OCC_INDEXED_PROTECTED=${protectedRecords.length}, canonicalUnion=${seen.size}.`,
  )
}

await verifyProductionCorpus()
