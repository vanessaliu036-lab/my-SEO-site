import { LEGACY_PUBLISHED_ARTICLE_MANIFEST } from '../lib/legacyPublishedArticles.mjs'

const API_KEY = process.env.AIRTABLE_API_KEY || process.env.AIRTABLE_PAT || process.env.AIRTABLE_TOKEN
const BASE_ID = process.env.AIRTABLE_BASE_ID
const TABLE = 'OCC_Blog_Posts'
const EXPECTED = 387

if (!API_KEY || !BASE_ID) throw new Error('Missing Airtable credentials')
if (LEGACY_PUBLISHED_ARTICLE_MANIFEST.length !== EXPECTED) {
  throw new Error(`Frozen manifest changed: expected ${EXPECTED}, got ${LEGACY_PUBLISHED_ARTICLE_MANIFEST.length}`)
}
if (process.env.VERCEL && (process.env.VERCEL_ENV !== 'preview' || process.env.VERCEL_GIT_COMMIT_REF !== 'fix/occ-single-master-cutover')) {
  throw new Error('Refusing to reconcile outside dedicated preview branch')
}

const headers = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' }
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function airtable(path, init = {}) {
  const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${path}`, {
    ...init,
    headers: { ...headers, ...(init.headers || {}) },
  })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(`${res.status} ${JSON.stringify(body)}`)
  return body
}

async function fetchAll() {
  const all = []
  let offset
  do {
    const params = new URLSearchParams({ pageSize: '100' })
    for (const field of ['title', 'slug', 'Legacy Record ID', 'Legacy Indexed', 'Pre-Recovery Slug']) {
      params.append('fields[]', field)
    }
    if (offset) params.set('offset', offset)
    const data = await airtable(`${encodeURIComponent(TABLE)}?${params}`)
    all.push(...(data.records || []))
    offset = data.offset
  } while (offset)
  return all
}

const records = await fetchAll()
const byLegacyId = new Map()
const occupied = new Map()
for (const record of records) {
  const f = record.fields || {}
  const legacyId = String(f['Legacy Record ID'] || '').trim()
  if (legacyId) {
    if (byLegacyId.has(legacyId)) throw new Error(`Duplicate Legacy Record ID in master: ${legacyId}`)
    byLegacyId.set(legacyId, record)
  }
  const slug = String(f.slug || '').trim().toLowerCase()
  if (slug) {
    const hits = occupied.get(slug) || []
    hits.push(record)
    occupied.set(slug, hits)
  }
}

const missing = []
const notProtected = []
const mismatches = []
const collisions = []
for (const entry of LEGACY_PUBLISHED_ARTICLE_MANIFEST) {
  const record = byLegacyId.get(entry.id)
  if (!record) {
    missing.push(entry)
    continue
  }
  if (record.fields?.['Legacy Indexed'] !== true) notProtected.push({ entry, recordId: record.id })
  const current = String(record.fields?.slug || '').trim()
  if (current === entry.slug) continue
  mismatches.push({ entry, record, current })
  const hits = occupied.get(entry.slug.toLowerCase()) || []
  const foreign = hits.filter((hit) => hit.id !== record.id)
  if (foreign.length) {
    collisions.push({
      legacyId: entry.id,
      expected: entry.slug,
      current,
      targetRecordId: record.id,
      occupiedBy: foreign.map((x) => ({ id: x.id, title: x.fields?.title, slug: x.fields?.slug })),
    })
  }
}

console.log(JSON.stringify({
  masterCount: records.length,
  manifestCount: LEGACY_PUBLISHED_ARTICLE_MANIFEST.length,
  matchedLegacyIds: LEGACY_PUBLISHED_ARTICLE_MANIFEST.length - missing.length,
  missingCount: missing.length,
  notProtectedCount: notProtected.length,
  mismatchCount: mismatches.length,
  collisionCount: collisions.length,
  sampleMismatches: mismatches.slice(0, 15).map(({ entry, current, record }) => ({
    legacyId: entry.id, recordId: record.id, current, expected: entry.slug, title: record.fields?.title,
  })),
  collisions,
}, null, 2))

if (missing.length || notProtected.length || collisions.length) {
  throw new Error(`Guard failed: missing=${missing.length} notProtected=${notProtected.length} collisions=${collisions.length}`)
}

if (!mismatches.length) {
  console.log('[slug reconcile] No changes needed; all 387 frozen slugs already match master.')
  process.exit(0)
}

const patches = mismatches.map(({ entry, record, current }) => ({
  id: record.id,
  fields: {
    'Pre-Recovery Slug': String(record.fields?.['Pre-Recovery Slug'] || '').trim() || current,
    slug: entry.slug,
  },
}))

for (let i = 0; i < patches.length; i += 10) {
  const batch = patches.slice(i, i + 10)
  await airtable(encodeURIComponent(TABLE), {
    method: 'PATCH',
    body: JSON.stringify({ records: batch, typecast: false }),
  })
  const done = Math.min(i + batch.length, patches.length)
  if (done % 100 === 0 || done === patches.length) console.log(`[slug reconcile] wrote ${done}/${patches.length}`)
  await sleep(250)
}

const verified = await fetchAll()
const verifiedByLegacyId = new Map(
  verified
    .filter((r) => String(r.fields?.['Legacy Record ID'] || '').trim())
    .map((r) => [String(r.fields['Legacy Record ID']).trim(), r])
)
const failures = LEGACY_PUBLISHED_ARTICLE_MANIFEST.filter((entry) => {
  const r = verifiedByLegacyId.get(entry.id)
  return !r || String(r.fields?.slug || '').trim() !== entry.slug
})
if (failures.length) throw new Error(`Post-write verification failed for ${failures.length} frozen slugs`)
console.log(`[slug reconcile] COMPLETE frozenSlugs=${EXPECTED} mismatchesRepaired=${patches.length}`)
