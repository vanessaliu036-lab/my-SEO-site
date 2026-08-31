const API_KEY = process.env.AIRTABLE_API_KEY || process.env.AIRTABLE_PAT || process.env.AIRTABLE_TOKEN
const BASE_ID = process.env.AIRTABLE_BASE_ID
const SOURCE = 'Articles'
const TARGET = 'OCC_Blog_Posts'

if (!API_KEY || !BASE_ID) {
  console.error('[OCC restore] Missing Airtable credentials')
  process.exit(1)
}

if (process.env.VERCEL && (process.env.VERCEL_ENV !== 'preview' || process.env.VERCEL_GIT_COMMIT_REF !== 'fix/restore-occ-legacy-blog')) {
  console.error('[OCC restore] Refusing to run outside the dedicated preview branch')
  process.exit(1)
}

const headers = {
  Authorization: `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function pickSelect(value) {
  if (value && typeof value === 'object' && 'name' in value) return String(value.name || '')
  return String(value || '')
}

function normalizeTitle(value) {
  return String(value || '').trim().replace(/\s+/g, ' ').toLowerCase()
}

function slugify(value) {
  return String(value || '')
    .trim()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['’]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
}

function canonicalSlug(fields) {
  const direct = String(fields.slug || '').trim()
  if (direct) {
    const parts = direct.replace(/^https?:\/\/[^/]+/i, '').split('/').filter(Boolean)
    const last = parts.at(-1) || direct
    const normalized = slugify(last)
    if (normalized) return normalized
  }
  const legacyUrl = String(fields['Blogger URL'] || '').trim()
  if (legacyUrl) {
    try {
      const u = new URL(legacyUrl)
      const last = u.pathname.split('/').filter(Boolean).at(-1) || ''
      const withoutExt = last.replace(/\.html?$/i, '')
      const normalized = slugify(withoutExt)
      if (normalized) return normalized
    } catch {}
  }
  return slugify(fields.title || fields.source_title || '')
}

function textSummary(text, title) {
  const clean = String(text || '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#*_>`\[\]()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  if (!clean || clean.toLowerCase() === String(title || '').trim().toLowerCase()) return ''
  return clean.length > 260 ? `${clean.slice(0, 257).replace(/\s+\S*$/, '')}...` : clean
}

async function airtable(path, init = {}) {
  const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${path}`, {
    ...init,
    headers: { ...headers, ...(init.headers || {}) },
  })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(`${res.status} ${JSON.stringify(body)}`)
  return body
}

async function fetchAll(table, fields) {
  const rows = []
  let offset
  do {
    const params = new URLSearchParams({ pageSize: '100' })
    for (const field of fields) params.append('fields[]', field)
    if (offset) params.set('offset', offset)
    const data = await airtable(`${encodeURIComponent(table)}?${params}`)
    rows.push(...(data.records || []))
    offset = data.offset
  } while (offset)
  return rows
}

async function writeBatches(records, method = 'PATCH') {
  let processed = 0
  for (let i = 0; i < records.length; i += 10) {
    const batch = records.slice(i, i + 10)
    await airtable(encodeURIComponent(TARGET), {
      method,
      body: JSON.stringify({ records: batch, typecast: true }),
    })
    processed += batch.length
    if (processed % 100 === 0 || processed === records.length) {
      console.log(`[OCC restore] wrote ${processed}/${records.length}`)
    }
    await sleep(240)
  }
}

const sourceFields = [
  'title', 'scout_date', 'status', 'Blogger Version', ' Blogger Status',
  'Blogger URL', 'keyword', 'content', 'is_indexed', 'slug', 'SEO_Gate',
]
const targetFields = [
  'title', 'slug', 'publish_date', 'status', 'author', 'summary', 'Content',
  'SEO_Gate', 'Recovery Source', 'Legacy Blogger URL', 'Legacy Record ID',
  'Legacy Indexed', 'Legacy Keyword',
]

console.log('[OCC restore] Reading source and target...')
const [sources, targets] = await Promise.all([
  fetchAll(SOURCE, sourceFields),
  fetchAll(TARGET, targetFields),
])

const bySlug = new Map()
const byTitle = new Map()
for (const row of targets) {
  const slug = canonicalSlug(row.fields || {})
  const title = normalizeTitle(row.fields?.title)
  if (slug && !bySlug.has(slug)) bySlug.set(slug, row)
  if (title && !byTitle.has(title)) byTitle.set(title, row)
}

const creates = []
const updates = []
let skippedNoIdentity = 0
let matchedBySlug = 0
let matchedByTitle = 0
let duplicateWithinSource = 0
let legacyPublished = 0
let legacyIndexed = 0

for (const source of sources) {
  const f = source.fields || {}
  const title = String(f.title || '').trim()
  const slug = canonicalSlug(f)
  const normalizedTitle = normalizeTitle(title)
  if (!title || !slug) {
    skippedNoIdentity += 1
    continue
  }

  let target = bySlug.get(slug)
  if (target) matchedBySlug += 1
  if (!target && normalizedTitle) {
    target = byTitle.get(normalizedTitle)
    if (target) matchedByTitle += 1
  }

  const bloggerStatus = pickSelect(f[' Blogger Status']).toLowerCase()
  const workflowStatus = pickSelect(f.status).toLowerCase()
  const isPublished = bloggerStatus === 'published' || workflowStatus === 'publish' || workflowStatus === 'published'
  const isIndexed = Boolean(f.is_indexed) || isPublished
  if (isPublished) legacyPublished += 1
  if (isIndexed) legacyIndexed += 1

  const content = String(f.content || f['Blogger Version'] || '').trim()
  const legacyUrl = String(f['Blogger URL'] || '').trim()
  const keyword = String(f.keyword || '').trim()
  const seoGate = pickSelect(f.SEO_Gate)
  const publishDate = String(f.scout_date || '').trim()

  // A duplicate inside Articles may resolve to a create already planned in this run.
  // Merge useful fields into that planned row instead of sending an invalid synthetic ID to Airtable.
  if (target && String(target.id || '').startsWith('pending-')) {
    duplicateWithinSource += 1
    const tf = target.fields || {}
    if (legacyUrl && !tf['Legacy Blogger URL']) tf['Legacy Blogger URL'] = legacyUrl
    if (isIndexed) tf['Legacy Indexed'] = true
    if (keyword && !tf['Legacy Keyword']) tf['Legacy Keyword'] = keyword
    if (content && !String(tf.Content || '').trim()) tf.Content = content
    if (publishDate && !tf.publish_date) tf.publish_date = publishDate
    if (seoGate && !tf.SEO_Gate) tf.SEO_Gate = seoGate
    if (!String(tf.summary || '').trim() && content) tf.summary = textSummary(content, title)
    if (isPublished) tf.status = 'Published'
    continue
  }

  if (target) {
    const tf = target.fields || {}
    const fields = {
      'Recovery Source': 'Articles live recovery 2026-08-31',
      'Legacy Record ID': source.id,
    }
    if (legacyUrl && !tf['Legacy Blogger URL']) fields['Legacy Blogger URL'] = legacyUrl
    if (isIndexed) fields['Legacy Indexed'] = true
    if (keyword && !tf['Legacy Keyword']) fields['Legacy Keyword'] = keyword
    if (content && !String(tf.Content || '').trim()) fields.Content = content
    if (publishDate && !tf.publish_date) fields.publish_date = publishDate
    if (seoGate && !tf.SEO_Gate) fields.SEO_Gate = seoGate
    if (!String(tf.summary || '').trim() && content) fields.summary = textSummary(content, title)
    if (!String(tf.slug || '').trim()) fields.slug = slug
    updates.push({ id: target.id, fields })
    continue
  }

  const fields = {
    title,
    slug,
    status: isPublished ? 'Published' : 'Draft',
    author: 'OCC Team',
    'Recovery Source': 'Articles live recovery 2026-08-31',
    'Legacy Record ID': source.id,
    'Legacy Indexed': isIndexed,
  }
  if (publishDate) fields.publish_date = publishDate
  if (content) fields.Content = content
  if (content) fields.summary = textSummary(content, title)
  if (legacyUrl) fields['Legacy Blogger URL'] = legacyUrl
  if (keyword) fields['Legacy Keyword'] = keyword
  if (seoGate) fields.SEO_Gate = seoGate
  const create = { fields }
  creates.push(create)

  const synthetic = { id: `pending-${creates.length}`, fields: create.fields }
  bySlug.set(slug, synthetic)
  if (normalizedTitle) byTitle.set(normalizedTitle, synthetic)
}

console.log(JSON.stringify({
  sourceCount: sources.length,
  targetBefore: targets.length,
  matchedBySlug,
  matchedByTitle,
  duplicateWithinSource,
  toUpdate: updates.length,
  toCreate: creates.length,
  skippedNoIdentity,
  legacyPublished,
  legacyIndexed,
  projectedTargetAfter: targets.length + creates.length,
}, null, 2))

await writeBatches(updates, 'PATCH')
await writeBatches(creates, 'POST')

const verify = await fetchAll(TARGET, ['title', 'slug', 'Recovery Source'])
console.log(`[OCC restore] COMPLETE targetAfter=${verify.length}`)
