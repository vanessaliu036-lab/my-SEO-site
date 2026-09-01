const AIRTABLE_API_KEY =
  process.env.AIRTABLE_API_KEY || process.env.AIRTABLE_PAT || process.env.AIRTABLE_TOKEN
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID

// Canonical frontend corpus = all OCC_Blog_Posts working records +
// OCC_INDEXED_PROTECTED records, deduplicated only by true public article identity.
// Draft / Published / Public are workflow metadata and MUST NOT be frontend inclusion gates.
// There is deliberately NO maxRecords cap on list fetches; pagination runs until Airtable
// returns no offset.
const AIRTABLE_TABLE_NAMES = ['OCC_Blog_Posts', 'OCC_INDEXED_PROTECTED'] as const
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
  publishDate: ['publish_date', 'scout_date', 'Publish Date', 'Last Modified'] as const,
  author: ['author', 'Author'] as const,
  summary: ['summary', 'Summary', 'Summary (Blogger URL)'] as const,
  content: ['content', 'Content', 'Blogger Version'] as const,
  category: ['Category', 'category'] as const,
  excerpt: ['Excerpt', 'excerpt', 'Summary (Blogger URL)'] as const,
  keywords: ['Keywords', 'keywords', 'SEO_Keyword', 'keyword', 'seo_keywords'] as const,
  featured: ['featured_image_url', 'Featured Image URL'] as const,
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

function escapeFormulaValue(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
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
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) return []

  const all: AirtableRecord[] = []
  let offset: string | undefined

  do {
    const params = new URLSearchParams()
    params.set('pageSize', '100')
    params.set('sort[0][field]', sortFieldForTable(tableName))
    params.set('sort[0][direction]', 'desc')
    for (const field of LIST_FIELDS[tableName]) params.append('fields[]', field)
    if (offset) params.set('offset', offset)

    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(tableName)}?${params.toString()}`,
      {
        headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
        cache: 'no-store',
      }
    )

    if (!response.ok) {
      console.error(`Airtable list failed for ${tableName}:`, response.status, await response.text())
      break
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
}

export async function getAllPosts(): Promise<BlogPost[]> {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    console.error('Missing Airtable credentials')
    return []
  }

  try {
    const groups = await Promise.all(AIRTABLE_TABLE_NAMES.map(fetchTableRecords))
    const seenSlug = new Set<string>()
    const posts: BlogPost[] = []

    // OCC_Blog_Posts is evaluated first. When both tables point to the same stable
    // public slug, that is one public article identity and must not be double-counted.
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
  } catch (error) {
    console.error('getAllPosts', error)
    return []
  }
}

function recordToDetail(record: AirtableRecord): BlogPostDetail | null {
  const base = recordToListItem(record)
  if (!base) return null
  return {
    ...base,
    content: pickField(record.fields, K.content),
    excerpt: pickField(record.fields, K.excerpt),
    keywords: pickField(record.fields, K.keywords),
  }
}

async function fetchBySlug(tableName: AirtableTableName, slug: string): Promise<AirtableRecord | null> {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) return null

  const params = new URLSearchParams({
    filterByFormula: `{slug}='${escapeFormulaValue(slug)}'`,
    maxRecords: '1',
  })

  const response = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(tableName)}?${params.toString()}`,
    {
      headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
      cache: 'no-store',
    }
  )

  if (!response.ok) return null
  const data = await response.json()
  const record = Array.isArray(data.records) ? data.records[0] : null
  return record?.fields ? { ...record, tableName } : null
}

async function fetchRecordById(recordId: string, tableName: AirtableTableName): Promise<AirtableRecord | null> {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) return null
  const response = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(tableName)}/${encodeURIComponent(recordId)}`,
    {
      headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
      cache: 'no-store',
    }
  )
  if (!response.ok) return null
  const data = await response.json()
  return data?.fields ? { id: data.id, fields: data.fields, tableName } : null
}

export async function getPostBySlug(urlSlug: string): Promise<BlogPostDetail | null> {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) return null

  const slug = canonicalSlugForUrl(urlSlug)
  if (!slug) return null

  try {
    for (const tableName of AIRTABLE_TABLE_NAMES) {
      const record = await fetchBySlug(tableName, slug)
      const detail = record ? recordToDetail(record) : null
      if (detail) return detail
    }

    // Fallback for rows whose stored slug is blank or malformed and was derived from title.
    const hit = (await getAllPosts()).find((post) => post.slug.toLowerCase() === slug.toLowerCase())
    if (!hit) return null
    const full = await fetchRecordById(hit.id, hit.table_name as AirtableTableName)
    return full ? recordToDetail(full) : null
  } catch (error) {
    console.error('getPostBySlug', error)
    return null
  }
}
