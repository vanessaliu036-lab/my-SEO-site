import { isIndexableBySeoGate } from './publicationPolicy.mjs'

const AIRTABLE_API_KEY =
  process.env.AIRTABLE_API_KEY || process.env.AIRTABLE_PAT || process.env.AIRTABLE_TOKEN
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID

// OCC_Blog_Posts is the single runtime source of truth after corpus consolidation.
// Articles remains recovery evidence in Airtable, but the public website must not query it.
const PUBLIC_AIRTABLE_TABLE_NAMES = ['OCC_Blog_Posts']

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
  keywords: ['Keywords', 'keywords'] as const,
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

  if (lower === 'occ') return true
  if (lower === 'origin coffee cambodia') return true
  if (/^meta description[:\s-]/i.test(value)) return true
  if (titleLower && lower === titleLower) return true
  if (value.length < 30) return true
  return false
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

  const parts: string[] = []
  for (const line of lines) {
    parts.push(line)
    const joined = parts.join(' ')
    if (joined.length >= 155) return `${joined.slice(0, 152).replace(/\s+\S*$/, '')}...`
  }

  return parts.join(' ')
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

// Migrated members of the frozen historical public corpus are protected in the
// consolidated master itself. They remain indexable even if a later editorial
// SEO gate requests rewrite or deduplication.
function isLegacyIndexed(fields: Record<string, unknown>): boolean {
  return fields['Legacy Indexed'] === true
}

function escapeFormulaValue(value: string): string {
  return value.replace(/'/g, "\\'")
}

function escapeAirtableQuoted(value: string): string {
  return value.replace(/'/g, "''")
}

function normalizeSlugParam(raw: string): string {
  let t = raw.trim()
  try {
    t = decodeURIComponent(t)
  } catch {
    /* ignore */
  }
  return t
    .trim()
    .replace(/^\/+/, '')
    .replace(/^\/?blog\/?/i, '')
    .trim()
}

function canonicalSlugForUrl(rawSlug: string): string {
  const n = normalizeSlugParam(rawSlug)
  const parts = n.split('/').filter(Boolean)
  return (parts.length > 0 ? parts[parts.length - 1] : n).trim()
}

function isAcceptableSlug(s: string): boolean {
  return s.length > 0 && /^[a-z0-9]+(?:[-_][a-z0-9]+)*$/i.test(s)
}

function slugFromRecord(record: AirtableRecord): string {
  const direct = canonicalSlugForUrl(pickField(record.fields, K.slug))
  if (isAcceptableSlug(direct)) return direct

  const legacyUrl = pickField(record.fields, K.bloggerUrl)
  if (legacyUrl) {
    try {
      const pathname = new URL(legacyUrl).pathname
      const last = pathname.split('/').filter(Boolean).at(-1)?.replace(/\.html?$/i, '') || ''
      const legacySlug = canonicalSlugForUrl(last)
      if (isAcceptableSlug(legacySlug)) return legacySlug
    } catch {
      /* fall back to the title-derived slug */
    }
  }

  const titleCandidate = pickField(record.fields, K.title) || pickField(record.fields, K.sourceTitle) || ''
  const derived = slugifyText(titleCandidate)
  return isAcceptableSlug(derived) ? derived : ''
}

function sortFieldForTable(_tableName: string): string {
  return 'publish_date'
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
    summaryFromContent(content, title) ||
    excerpt ||
    summaryField

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
    indexable: isLegacyIndexed(record.fields) || isIndexableBySeoGate(record.fields),
  }
}

function recordToListItem(record: AirtableRecord): BlogPost | null {
  const item = recordToPublishedItem(record)
  if (!item || !item.indexable) return null
  return item
}

// Listing, pagination, and sitemap generation only need metadata. Full article
// content is fetched only when an individual article is opened.
function listFieldsForTable(_tableName: string): string[] {
  return [
    'title',
    'slug',
    'publish_date',
    'status',
    'author',
    'summary',
    'featured_image_url',
    'Category',
    'Keywords',
    'SEO_Gate',
    'Legacy Indexed',
    'Legacy Blogger URL',
  ]
}

async function fetchTableRecords(tableName: string): Promise<AirtableRecord[]> {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) return []
  const all: AirtableRecord[] = []
  let offset: string | undefined

  do {
    const params = new URLSearchParams({
      'sort[0][field]': sortFieldForTable(tableName),
      'sort[0][direction]': 'desc',
      pageSize: '100',
    })
    if (offset) params.set('offset', offset)
    for (const field of listFieldsForTable(tableName)) params.append('fields[]', field)

    let data: { records?: Array<{ id: string; fields: Record<string, unknown> }>; offset?: string } | undefined
    let lastStatus = 0
    for (let attempt = 1; attempt <= 3; attempt += 1) {
      const res = await fetch(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(tableName)}?${params.toString()}`,
        {
          headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
          next: { revalidate: 60 },
        }
      )
      lastStatus = res.status
      if (res.ok) {
        data = (await res.json()) as NonNullable<typeof data>
        break
      }
      console.error(`Airtable list failed for ${tableName}: ${res.status} (attempt ${attempt}/3)`)
      if (attempt < 3) await new Promise((resolve) => setTimeout(resolve, attempt * 250))
    }

    if (!data) throw new Error(`Airtable list failed for ${tableName} after retries: ${lastStatus}`)
    if (!data.records || !Array.isArray(data.records)) break

    all.push(
      ...data.records.map((record) => ({
        ...record,
        tableName,
      }))
    )
    offset = typeof data.offset === 'string' && data.offset.length > 0 ? data.offset : undefined
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

export async function getAllPosts(): Promise<BlogPost[]> {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    console.error('Missing Airtable env: AIRTABLE_TOKEN / AIRTABLE_API_KEY / AIRTABLE_PAT or AIRTABLE_BASE_ID')
    return []
  }

  try {
    const recordGroups = await Promise.all(
      PUBLIC_AIRTABLE_TABLE_NAMES.map((tableName) => fetchTableRecords(tableName))
    )
    const records = recordGroups.flat()
    const mapped: BlogPost[] = []
    const seenSlug = new Set<string>()

    for (const record of records) {
      const item = recordToListItem(record)
      if (!item) continue
      const key = item.slug.toLowerCase()
      if (seenSlug.has(key)) continue
      seenSlug.add(key)
      mapped.push(item)
    }

    mapped.sort((a, b) => {
      const aTime = Date.parse(a.publish_date)
      const bTime = Date.parse(b.publish_date)
      const aValid = Number.isFinite(aTime)
      const bValid = Number.isFinite(bTime)
      if (aValid && bValid) return bTime - aTime
      if (aValid) return -1
      if (bValid) return 1
      return a.title.localeCompare(b.title)
    })

    return mapped
  } catch (e) {
    console.error('getAllPosts', e)
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

async function fetchRecordById(recordId: string): Promise<AirtableRecord | null> {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) return null
  const tableName = PUBLIC_AIRTABLE_TABLE_NAMES[0]

  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(tableName)}/${encodeURIComponent(recordId)}`,
      {
        headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
        next: { revalidate: 60 },
      }
    )
    if (!res.ok) return null
    const data = await res.json()
    if (!data?.fields) return null
    return { id: data.id, fields: data.fields as Record<string, unknown>, tableName }
  } catch {
    return null
  }
}

export async function getPostBySlug(urlSlug: string): Promise<BlogPostDetail | null> {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) return null

  const key = normalizeSlugParam(urlSlug)
  const keyLast = canonicalSlugForUrl(key)
  if (!keyLast) return null

  try {
    const exact = escapeFormulaValue(keyLast)
    const exactBlog = escapeFormulaValue(`blog/${keyLast}`)
    const exactSlashBlog = escapeFormulaValue(`/blog/${keyLast}`)
    let nonIndexableFallback: BlogPostDetail | null = null

    for (const tableName of PUBLIC_AIRTABLE_TABLE_NAMES) {
      const q1 = new URLSearchParams({
        filterByFormula: `OR({slug}='${exact}',{slug}='${exactBlog}',{slug}='${exactSlashBlog}')`,
        maxRecords: '1',
      })
      let res = await fetch(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(tableName)}?${q1.toString()}`,
        {
          headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
          next: { revalidate: 60 },
        }
      )
      let data = res.ok ? await res.json() : null
      let rows: AirtableRecord[] =
        data?.records && Array.isArray(data.records)
          ? (data.records as Array<{ id: string; fields: Record<string, unknown> }>).map((record) => ({
              ...record,
              tableName,
            }))
          : []

      if (rows.length === 0) {
        const q = escapeAirtableQuoted(keyLast.toLowerCase())
        const qBlog = escapeAirtableQuoted(`blog/${keyLast.toLowerCase()}`)
        const qSlashBlog = escapeAirtableQuoted(`/blog/${keyLast.toLowerCase()}`)
        const q2 = new URLSearchParams({
          filterByFormula: `OR(LOWER({slug})='${q}',LOWER({slug})='${qBlog}',LOWER({slug})='${qSlashBlog}')`,
          maxRecords: '1',
        })
        res = await fetch(
          `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(tableName)}?${q2.toString()}`,
          {
            headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
            next: { revalidate: 60 },
          }
        )
        data = res.ok ? await res.json() : null
        rows =
          data?.records && Array.isArray(data.records)
            ? (data.records as Array<{ id: string; fields: Record<string, unknown> }>).map((record) => ({
                ...record,
                tableName,
              }))
            : []
      }

      if (rows.length > 0) {
        const detail = recordToDetail(rows[0])
        if (!detail) continue
        if (detail.indexable) return detail
        if (!nonIndexableFallback) nonIndexableFallback = detail
      }
    }

    const list = await getAllPosts()
    const hit = list.find((p) => p.slug.toLowerCase() === keyLast.toLowerCase())
    if (hit) {
      const full = await fetchRecordById(hit.id)
      if (full) {
        const detail = recordToDetail(full)
        if (detail) return detail
      }
    }

    return nonIndexableFallback
  } catch (e) {
    console.error('getPostBySlug', e)
    return null
  }
}
