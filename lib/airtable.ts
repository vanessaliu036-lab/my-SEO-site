import { isIndexableBySeoGate } from './publicationPolicy.mjs'

const AIRTABLE_API_KEY =
  process.env.AIRTABLE_API_KEY || process.env.AIRTABLE_PAT || process.env.AIRTABLE_TOKEN
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID

// Public runtime corpus = working master + permanently protected Google-indexed corpus.
// SEO editing must never make a published article disappear from the frontend.
const PUBLIC_AIRTABLE_TABLE_NAMES = ['OCC_Blog_Posts', 'OCC_INDEXED_PROTECTED'] as const
const PROTECTED_TABLE = 'OCC_INDEXED_PROTECTED'

const K = {
  title: ['title', 'Title'] as const,
  sourceTitle: ['source_title', 'Source Title', 'Source_title'] as const,
  slug: ['slug', 'Slug'] as const,
  publishDate: ['publish_date', 'Publish Date', 'Last Modified'] as const,
  author: ['author', 'Author'] as const,
  summary: ['summary', 'Summary'] as const,
  content: ['content', 'Content'] as const,
  category: ['Category', 'category'] as const,
  excerpt: ['Excerpt', 'excerpt'] as const,
  keywords: ['Keywords', 'keywords', 'SEO_Keyword', 'keyword'] as const,
  featured: ['featured_image_url', 'Featured Image URL'] as const,
  bloggerUrl: ['Legacy Blogger URL', 'Blogger URL', 'Blogger_URL', 'blogger_url'] as const,
} as const

type AirtableRecord = { id: string; fields: Record<string, unknown>; tableName: string }

function pickField(fields: Record<string, unknown>, keys: readonly string[], fallback = ''): string {
  for (const key of keys) {
    const value = fields[key]
    if (typeof value === 'string' && value.trim() !== '') return value
    if (typeof value === 'object' && value !== null && 'name' in value) {
      const name = String((value as { name: unknown }).name ?? '').trim()
      if (name !== '') return name
    }
  }
  return fallback
}

function normalizeText(text: string): string {
  return text.trim().replace(/\s+/g, ' ')
}

function slugifyText(text: string): string {
  return normalizeText(text)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['’]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
}

function stripMarkdown(text: string): string {
  return text
    .replace(/^#{1,6}\s+/, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
    .trim()
}

function isLowSignalText(text: string, title = ''): boolean {
  const value = normalizeText(text)
  if (!value) return true
  const lower = value.toLowerCase()
  const titleLower = normalizeText(title).toLowerCase()
  if (lower === 'occ' || lower === 'origin coffee cambodia') return true
  if (/^meta description[:\s-]/i.test(value)) return true
  if (titleLower && lower === titleLower) return true
  return value.length < 30
}

function normalizeAuthor(text: string): string {
  const value = normalizeText(text)
  if (!value || isLowSignalText(value)) return 'OCC Team'
  return value
}

function summaryFromContent(content: string, title = ''): string {
  const lines = content
    .split('\n')
    .map((line) => stripMarkdown(line.trim()))
    .map(normalizeText)
    .filter(Boolean)
    .filter((line) => !/^\[INTERNAL LINK:/i.test(line))
    .filter((line) => !isLowSignalText(line, title))
  if (!lines.length) return ''
  const joined = lines.join(' ')
  if (joined.length <= 155) return joined
  return `${joined.slice(0, 152).replace(/\s+\S*$/, '')}...`
}

function normalizeStatusValue(raw: unknown): string {
  if (typeof raw === 'object' && raw !== null && 'name' in raw) {
    return String((raw as { name: unknown }).name ?? '').trim().toLowerCase()
  }
  return String(raw ?? '').trim().toLowerCase()
}

const PUBLISHED_TOKENS = new Set(['publish', 'published', 'live', 'ready', 'sent', 'online'])
const UNPUBLISHED_TOKENS = new Set(['draft', 'archived', 'archive', 'inactive', 'unpublish', 'unpublished'])

function isPublished(record: AirtableRecord): boolean {
  const status = normalizeStatusValue(record.fields.status ?? record.fields.Status ?? '')
  if (!status || UNPUBLISHED_TOKENS.has(status)) return false
  return PUBLISHED_TOKENS.has(status)
}

function isLegacyIndexed(fields: Record<string, unknown>): boolean {
  return fields['Legacy Indexed'] === true || fields.is_indexed === true
}

function normalizeSlugParam(raw: string): string {
  let t = raw.trim()
  try {
    t = decodeURIComponent(t)
  } catch {
    // keep original input
  }
  return t.trim().replace(/^\/+/, '').replace(/^\/?blog\/?/i, '').trim()
}

function canonicalSlugForUrl(rawSlug: string): string {
  const normalized = normalizeSlugParam(rawSlug)
  const parts = normalized.split('/').filter(Boolean)
  return (parts.length ? parts[parts.length - 1] : normalized).trim()
}

function isAcceptableSlug(slug: string): boolean {
  return slug.length > 0 && /^[a-z0-9]+(?:[-_][a-z0-9]+)*$/i.test(slug)
}

function slugFromRecord(record: AirtableRecord): string {
  const direct = canonicalSlugForUrl(pickField(record.fields, K.slug))
  if (isAcceptableSlug(direct)) return direct
  const legacyUrl = pickField(record.fields, K.bloggerUrl)
  if (legacyUrl) {
    try {
      const last = new URL(legacyUrl).pathname.split('/').filter(Boolean).at(-1)?.replace(/\.html?$/i, '') || ''
      const legacySlug = canonicalSlugForUrl(last)
      if (isAcceptableSlug(legacySlug)) return legacySlug
    } catch {
      // fall through
    }
  }
  const title = pickField(record.fields, K.title) || pickField(record.fields, K.sourceTitle)
  const derived = slugifyText(title)
  return isAcceptableSlug(derived) ? derived : ''
}

function isProtected(record: AirtableRecord): boolean {
  return record.tableName === PROTECTED_TABLE
}

function listFieldsForTable(tableName: string): string[] {
  if (tableName === PROTECTED_TABLE) {
    return ['title', 'slug', 'status', 'content', 'keyword', 'SEO_Gate', 'is_indexed', 'Blogger URL', 'source_title']
  }
  return [
    'title', 'slug', 'publish_date', 'status', 'author', 'summary', 'featured_image_url',
    'Category', 'Keywords', 'SEO_Keyword', 'SEO_Gate', 'Legacy Indexed', 'Legacy Blogger URL',
  ]
}

async function fetchTableRecords(tableName: string): Promise<AirtableRecord[]> {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) return []
  const all: AirtableRecord[] = []
  let offset: string | undefined

  do {
    const params = new URLSearchParams({ pageSize: '100' })
    if (tableName !== PROTECTED_TABLE) {
      params.set('sort[0][field]', 'publish_date')
      params.set('sort[0][direction]', 'desc')
    }
    if (offset) params.set('offset', offset)
    for (const field of listFieldsForTable(tableName)) params.append('fields[]', field)

    let data: { records?: Array<{ id: string; fields: Record<string, unknown> }>; offset?: string } | undefined
    let lastStatus = 0
    for (let attempt = 1; attempt <= 3; attempt += 1) {
      const res = await fetch(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(tableName)}?${params.toString()}`,
        { headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` }, next: { revalidate: 60 } }
      )
      lastStatus = res.status
      if (res.ok) {
        data = await res.json()
        break
      }
      console.error(`Airtable list failed for ${tableName}: ${res.status} (attempt ${attempt}/3)`)
      if (attempt < 3) await new Promise((resolve) => setTimeout(resolve, attempt * 250))
    }
    if (!data) throw new Error(`Airtable list failed for ${tableName} after retries: ${lastStatus}`)
    if (!Array.isArray(data.records)) break
    all.push(...data.records.map((record) => ({ ...record, tableName })))
    offset = typeof data.offset === 'string' && data.offset ? data.offset : undefined
  } while (offset)

  return all
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  summary: string
  author: string
  publish_date: string
  featured_image_url: string
  category: string
  table_name: string
  indexable: boolean
}

export interface BlogPostDetail extends BlogPost {
  content: string
  excerpt: string
  keywords: string
}

function recordToPublishedItem(record: AirtableRecord): BlogPost | null {
  if (!isPublished(record)) return null
  const slug = slugFromRecord(record)
  if (!slug || !isAcceptableSlug(slug)) return null
  const title = pickField(record.fields, K.title) || pickField(record.fields, K.sourceTitle) || 'Untitled'
  const content = pickField(record.fields, K.content)
  const excerpt = pickField(record.fields, K.excerpt)
  const summaryField = pickField(record.fields, K.summary)
  const summary =
    (!isLowSignalText(summaryField, title) ? summaryField : '') ||
    (!isLowSignalText(excerpt, title) ? excerpt : '') ||
    summaryFromContent(content, title) || excerpt || summaryField

  return {
    id: record.id,
    title,
    slug,
    summary,
    author: normalizeAuthor(pickField(record.fields, K.author, 'OCC Team')),
    publish_date: pickField(record.fields, K.publishDate),
    featured_image_url: pickField(record.fields, K.featured),
    category: pickField(record.fields, K.category),
    table_name: record.tableName,
    indexable: isProtected(record) || isLegacyIndexed(record.fields) || isIndexableBySeoGate(record.fields),
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    console.error('Missing Airtable env: AIRTABLE_TOKEN / AIRTABLE_API_KEY / AIRTABLE_PAT or AIRTABLE_BASE_ID')
    return []
  }
  try {
    const groups = await Promise.all(PUBLIC_AIRTABLE_TABLE_NAMES.map((tableName) => fetchTableRecords(tableName)))
    const mapped: BlogPost[] = []
    const seenSlug = new Set<string>()
    for (const record of groups.flat()) {
      // Visibility rule: every Published article is visible. SEO_Gate controls indexing, not frontend visibility.
      const item = recordToPublishedItem(record)
      if (!item) continue
      const key = item.slug.toLowerCase()
      if (seenSlug.has(key)) continue
      seenSlug.add(key)
      mapped.push(item)
    }
    mapped.sort((a, b) => {
      const aTime = Date.parse(a.publish_date)
      const bTime = Date.parse(b.publish_date)
      if (Number.isFinite(aTime) && Number.isFinite(bTime)) return bTime - aTime
      if (Number.isFinite(aTime)) return -1
      if (Number.isFinite(bTime)) return 1
      return a.title.localeCompare(b.title)
    })
    return mapped
  } catch (error) {
    console.error('getAllPosts', error)
    return []
  }
}

function recordToDetail(record: AirtableRecord): BlogPostDetail | null {
  const base = recordToPublishedItem(record)
  if (!base) return null
  return {
    ...base,
    content: pickField(record.fields, K.content),
    excerpt: pickField(record.fields, K.excerpt),
    keywords: pickField(record.fields, K.keywords),
  }
}

async function fetchRecordById(recordId: string, preferredTable?: string): Promise<AirtableRecord | null> {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) return null
  const tables = preferredTable
    ? [preferredTable, ...PUBLIC_AIRTABLE_TABLE_NAMES.filter((name) => name !== preferredTable)]
    : [...PUBLIC_AIRTABLE_TABLE_NAMES]
  for (const tableName of tables) {
    try {
      const res = await fetch(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(tableName)}/${encodeURIComponent(recordId)}`,
        { headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` }, next: { revalidate: 60 } }
      )
      if (!res.ok) continue
      const data = await res.json()
      if (data?.fields) return { id: data.id, fields: data.fields as Record<string, unknown>, tableName }
    } catch {
      // try next table
    }
  }
  return null
}

export async function getPostBySlug(urlSlug: string): Promise<BlogPostDetail | null> {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) return null
  const keyLast = canonicalSlugForUrl(urlSlug)
  if (!keyLast) return null

  try {
    for (const tableName of PUBLIC_AIRTABLE_TABLE_NAMES) {
      const escaped = keyLast.replace(/'/g, "\\'")
      const params = new URLSearchParams({
        filterByFormula: `LOWER({slug})=LOWER('${escaped}')`,
        maxRecords: '1',
      })
      const res = await fetch(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(tableName)}?${params.toString()}`,
        { headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` }, next: { revalidate: 60 } }
      )
      if (!res.ok) continue
      const data = await res.json()
      const row = Array.isArray(data?.records) ? data.records[0] : null
      if (!row?.fields) continue
      const detail = recordToDetail({ id: row.id, fields: row.fields, tableName })
      if (detail) return detail
    }

    const list = await getAllPosts()
    const hit = list.find((post) => post.slug.toLowerCase() === keyLast.toLowerCase())
    if (!hit) return null
    const full = await fetchRecordById(hit.id, hit.table_name)
    return full ? recordToDetail(full) : null
  } catch (error) {
    console.error('getPostBySlug', error)
    return null
  }
}
