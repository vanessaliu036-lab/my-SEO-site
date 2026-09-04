import { unstable_cache } from 'next/cache'

const AIRTABLE_API_KEY =
  process.env.AIRTABLE_API_KEY || process.env.AIRTABLE_PAT || process.env.AIRTABLE_TOKEN
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID

// Canonical frontend corpus = all OCC_Blog_Posts working records +
// OCC_INDEXED_PROTECTED records, deduplicated only by true public article identity.
// Draft / Published / Public are workflow metadata and MUST NOT be frontend inclusion gates.
// There is deliberately NO maxRecords cap on corpus list fetches; pagination runs until
// Airtable returns no offset.
const AIRTABLE_TABLE_NAMES = ['OCC_Blog_Posts', 'OCC_INDEXED_PROTECTED'] as const
const AIRTABLE_CACHE_SECONDS = 300
const AIRTABLE_MAX_ATTEMPTS = 3
const AIRTABLE_RETRY_BASE_MS = 250
const TRANSIENT_AIRTABLE_STATUSES = new Set([429, 500, 502, 503, 504])
type AirtableTableName = (typeof AIRTABLE_TABLE_NAMES)[number]

type AirtableRecord = {
  id: string
  fields: Record<string, unknown>
  tableName: AirtableTableName
}

const LIST_FIELDS: Record<AirtableTableName, string[]> = {
  OCC_Blog_Posts: [
    'title',
    'slug',
    'publish_date',
    'author',
    'summary',
    'featured_image_url',
    'Category',
    'SEO_Keyword',
  ],
  OCC_INDEXED_PROTECTED: [
    'title',
    'source_title',
    'slug',
    'scout_date',
    'category',
    'keyword',
  ],
}

const K = {
  title: ['title', 'Title', 'source_title', 'Source Title', 'Title (Blogger URL)'] as const,
  slug: ['slug', 'Slug'] as const,
  publishDate: ['publish_date', 'scout_date', 'Publish Date'] as const,
  modifiedDate: ['Last Modified', 'last_modified', 'modified_date'] as const,
  author: ['author', 'Author'] as const,
  summary: ['summary', 'Summary', 'Summary (Blogger URL)'] as const,
  content: ['content', 'Content', 'Blogger Version'] as const,
  category: ['Category', 'category'] as const,
  excerpt: ['Excerpt', 'excerpt', 'Summary (Blogger URL)'] as const,
  keywords: ['Keywords', 'keywords', 'SEO_Keyword', 'keyword', 'seo_keywords'] as const,
  featured: ['featured_image_url', 'Featured Image URL'] as const,
}

// Airtable enforces a per-base request ceiling. A full OCC corpus refresh requires many
// paginated requests, so requests inside a warm server process are serialized and spaced.
// The cross-request Next.js cache below then prevents every article view from repeating
// the full corpus scan.
const AIRTABLE_MIN_REQUEST_INTERVAL_MS = 260
let airtableRequestChain: Promise<void> = Promise.resolve()
let nextAirtableRequestAt = 0

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function scheduledAirtableFetch(url: string): Promise<Response> {
  const previous = airtableRequestChain
  let release: () => void = () => undefined
  airtableRequestChain = new Promise<void>((resolve) => {
    release = resolve
  })

  await previous
  try {
    const waitMs = Math.max(0, nextAirtableRequestAt - Date.now())
    if (waitMs > 0) await sleep(waitMs)
    nextAirtableRequestAt = Date.now() + AIRTABLE_MIN_REQUEST_INTERVAL_MS

    return await fetch(url, {
      headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
      cache: 'no-store',
    })
  } finally {
    release()
  }
}

async function fetchAirtableWithRetry(url: string): Promise<Response> {
  let lastNetworkError: unknown

  for (let attempt = 0; attempt < AIRTABLE_MAX_ATTEMPTS; attempt += 1) {
    try {
      const response = await scheduledAirtableFetch(url)
      const shouldRetry = TRANSIENT_AIRTABLE_STATUSES.has(response.status)

      if (!shouldRetry || attempt === AIRTABLE_MAX_ATTEMPTS - 1) {
        return response
      }
    } catch (error) {
      lastNetworkError = error
      if (attempt === AIRTABLE_MAX_ATTEMPTS - 1) throw error
    }

    await sleep(AIRTABLE_RETRY_BASE_MS * 2 ** attempt)
  }

  if (lastNetworkError) throw lastNetworkError
  throw new Error('Airtable retry loop exhausted')
}

function requireAirtableCredentials(): void {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    throw new Error('Missing Airtable credentials')
  }
}

async function responseErrorBody(response: Response): Promise<string> {
  try {
    return (await response.text()).slice(0, 500)
  } catch {
    return ''
  }
}

function pickField(fields: Record<string, unknown>, keys: readonly string[], fallback = ''): string {
  for (const key of keys) {
    const value = fields[key]
    if (typeof value === 'string' && value.trim()) return value.trim()
    if (typeof value === 'number') return String(value)
    if (value && typeof value === 'object') {
      const objectValue = value as Record<string, unknown>
      for (const candidate of ['name', 'value', 'text']) {
        const nested = objectValue[candidate]
        if (typeof nested === 'string' && nested.trim()) return nested.trim()
      }
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

function normalizeSlugParam(raw: string): string {
  let value = raw.trim()
  try {
    value = decodeURIComponent(value)
  } catch {
    // Preserve the original value if URL decoding fails.
  }
  return value.replace(/^\/+/, '').replace(/^\/?blog\/?/i, '').trim()
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
  const derived = slugifyText(pickField(record.fields, K.title))
  return isAcceptableSlug(derived) ? derived : ''
}

function sortFieldForTable(tableName: AirtableTableName): string {
  return tableName === 'OCC_INDEXED_PROTECTED' ? 'scout_date' : 'publish_date'
}

function recordToListItem(record: AirtableRecord): BlogPost | null {
  const slug = slugFromRecord(record)
  if (!slug) return null
  return {
    id: record.id,
    title: pickField(record.fields, K.title, 'Untitled'),
    slug,
    summary: pickField(record.fields, K.summary),
    author: pickField(record.fields, K.author, 'OCC Team'),
    publish_date: pickField(record.fields, K.publishDate),
    featured_image_url: pickField(record.fields, K.featured),
    category: pickField(record.fields, K.category),
    table_name: record.tableName,
  }
}

async function fetchTableRecords(tableName: AirtableTableName): Promise<AirtableRecord[]> {
  requireAirtableCredentials()

  const all: AirtableRecord[] = []
  let offset: string | undefined

  do {
    const params = new URLSearchParams()
    params.set('pageSize', '100')
    params.set('sort[0][field]', sortFieldForTable(tableName))
    params.set('sort[0][direction]', 'desc')
    for (const field of LIST_FIELDS[tableName]) params.append('fields[]', field)
    if (offset) params.set('offset', offset)

    const response = await fetchAirtableWithRetry(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(tableName)}?${params.toString()}`
    )

    if (!response.ok) {
      const body = await responseErrorBody(response)
      throw new Error(`Airtable list failed for ${tableName}: ${response.status} ${body}`)
    }

    const data = await response.json()
    const rows = Array.isArray(data.records) ? data.records : []
    all.push(
      ...rows.map((record: { id: string; fields: Record<string, unknown> }) => ({
        ...record,
        tableName,
      }))
    )
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
}

export interface BlogPostDetail extends BlogPost {
  content: string
  excerpt: string
  keywords: string
  modified_date: string
}

async function loadAllPosts(): Promise<BlogPost[]> {
  requireAirtableCredentials()

  // Keep table precedence unchanged: OCC_Blog_Posts is evaluated first so an identical
  // stable slug in OCC_INDEXED_PROTECTED is the same public article, not a second page.
  const groups: AirtableRecord[][] = []
  for (const tableName of AIRTABLE_TABLE_NAMES) {
    groups.push(await fetchTableRecords(tableName))
  }

  const seenSlug = new Set<string>()
  const posts: BlogPost[] = []

  for (const record of groups.flat()) {
    const item = recordToListItem(record)
    if (!item) continue
    const identity = item.slug.toLowerCase()
    if (seenSlug.has(identity)) continue
    seenSlug.add(identity)
    posts.push(item)
  }

  posts.sort((a, b) => {
    const aTime = a.publish_date ? Date.parse(a.publish_date) || 0 : 0
    const bTime = b.publish_date ? Date.parse(b.publish_date) || 0 : 0
    return bTime - aTime
  })

  return posts
}

const getAllPostsCached = unstable_cache(loadAllPosts, ['occ-airtable-corpus-v4'], {
  revalidate: AIRTABLE_CACHE_SECONDS,
})

export async function getAllPosts(): Promise<BlogPost[]> {
  requireAirtableCredentials()
  return getAllPostsCached()
}

function recordToDetail(record: AirtableRecord): BlogPostDetail | null {
  const base = recordToListItem(record)
  if (!base) return null
  return {
    ...base,
    content: pickField(record.fields, K.content),
    excerpt: pickField(record.fields, K.excerpt),
    keywords: pickField(record.fields, K.keywords),
    modified_date: pickField(record.fields, K.modifiedDate, base.publish_date),
  }
}

async function fetchRecordById(
  recordId: string,
  tableName: AirtableTableName
): Promise<AirtableRecord | null> {
  requireAirtableCredentials()

  const response = await fetchAirtableWithRetry(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(tableName)}/${encodeURIComponent(recordId)}`
  )

  if (!response.ok) {
    const body = await responseErrorBody(response)
    throw new Error(`Airtable request failed for ${tableName}/${recordId}: ${response.status} ${body}`)
  }

  const data = await response.json()
  return data?.fields ? { id: data.id, fields: data.fields, tableName } : null
}

async function loadPostBySlug(urlSlug: string): Promise<BlogPostDetail | null> {
  requireAirtableCredentials()

  const slug = canonicalSlugForUrl(urlSlug)
  if (!slug) return null

  // Resolve public identity from the cached canonical corpus first. This avoids two
  // Airtable formula lookups for every article request and preserves derived-slug support.
  const hit = (await getAllPosts()).find((post) => post.slug.toLowerCase() === slug.toLowerCase())
  if (!hit) return null

  const full = await fetchRecordById(hit.id, hit.table_name as AirtableTableName)
  return full ? recordToDetail(full) : null
}

const getPostBySlugCached = unstable_cache(loadPostBySlug, ['occ-post-by-slug-v4'], {
  revalidate: AIRTABLE_CACHE_SECONDS,
})

export async function getPostBySlug(urlSlug: string): Promise<BlogPostDetail | null> {
  requireAirtableCredentials()
  return getPostBySlugCached(urlSlug)
}
