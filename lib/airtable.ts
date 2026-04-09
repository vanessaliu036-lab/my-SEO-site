const AIRTABLE_API_KEY =
  process.env.AIRTABLE_API_KEY || process.env.AIRTABLE_PAT || process.env.AIRTABLE_TOKEN
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
const AIRTABLE_TABLE_NAME = 'OCC_Blog_Posts'

const K = {
  title: ['title', 'Title'] as const,
  slug: ['slug', 'Slug'] as const,
  publishDate: ['publish_date', 'Publish Date', 'Last Modified'] as const,
  author: ['author', 'Author'] as const,
  summary: ['summary', 'Summary'] as const,
  content: ['Content', 'content'] as const,
  category: ['Category', 'category'] as const,
  excerpt: ['Excerpt', 'excerpt'] as const,
  keywords: ['Keywords', 'keywords'] as const,
  featured: ['featured_image_url', 'Featured Image URL'] as const,
}

type AirtableRecord = { id: string; fields: Record<string, unknown> }

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

function getStatus(fields: Record<string, unknown>): string {
  const raw = fields.status ?? fields.Status ?? ''
  if (typeof raw === 'object' && raw !== null && 'name' in raw) {
    return String((raw as { name: unknown }).name ?? '').trim().toLowerCase()
  }
  return String(raw).trim().toLowerCase()
}

/** 僅後台標成已發布才顯示（不再把空白 status 當上線，避免列表比「已上架」多）。 */
function isPublished(fields: Record<string, unknown>): boolean {
  const s = getStatus(fields)
  return s === 'publish' || s === 'published'
}

function escapeFormulaValue(value: string): string {
  return value.replace(/'/g, "\\'")
}

function escapeAirtableQuoted(value: string): string {
  return value.replace(/'/g, "''")
}

/** 網址列 slug：解碼、去掉前綴 blog/ */
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

/**
 * Airtable 可能存整段路徑；Next `[slug]` 只有一層，取最後一段作為網址 slug，
 * 與列表連結一致，避免點進 404。
 */
function canonicalSlugForUrl(rawSlug: string): string {
  const n = normalizeSlugParam(rawSlug)
  const parts = n.split('/').filter(Boolean)
  return (parts.length > 0 ? parts[parts.length - 1] : n).trim()
}

function isAcceptableSlug(s: string): boolean {
  return s.length > 0 && /^[a-z0-9]+(?:[-_][a-z0-9]+)*$/i.test(s)
}

function recordToListItem(record: AirtableRecord): BlogPost | null {
  if (!isPublished(record.fields)) return null
  const raw = pickField(record.fields, K.slug).trim()
  const slug = canonicalSlugForUrl(raw)
  if (!slug || !isAcceptableSlug(slug)) return null
  return {
    id: record.id,
    title: pickField(record.fields, K.title, 'Untitled'),
    slug,
    summary: pickField(record.fields, K.summary),
    author: pickField(record.fields, K.author, 'OCC Team'),
    publish_date: pickField(record.fields, K.publishDate),
    featured_image_url: pickField(record.fields, K.featured),
    category: pickField(record.fields, K.category),
  }
}

async function fetchAllTableRecords(): Promise<AirtableRecord[]> {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) return []
  const all: AirtableRecord[] = []
  let offset: string | undefined
  do {
    const params = new URLSearchParams({
      'sort[0][field]': 'publish_date',
      'sort[0][direction]': 'desc',
      maxRecords: '100',
    })
    if (offset) params.set('offset', offset)
    const res = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}?${params.toString()}`,
      {
        headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
        next: { revalidate: 3600 },
      }
    )
    if (!res.ok) break
    const data = await res.json()
    if (!data.records || !Array.isArray(data.records)) break
    all.push(...(data.records as AirtableRecord[]))
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
    const records = await fetchAllTableRecords()
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
    return mapped
  } catch (e) {
    console.error('getAllPosts', e)
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

async function fetchRecordById(recordId: string): Promise<AirtableRecord | null> {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) return null
  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}/${encodeURIComponent(recordId)}`,
      {
        headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
        next: { revalidate: 3600 },
      }
    )
    if (!res.ok) return null
    const data = await res.json()
    if (!data?.fields) return null
    return { id: data.id, fields: data.fields as Record<string, unknown> }
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
    const q1 = new URLSearchParams({
      filterByFormula: `OR({slug}='${exact}',{Slug}='${exact}')`,
      maxRecords: '1',
    })
    let res = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}?${q1.toString()}`,
      {
        headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
        next: { revalidate: 3600 },
      }
    )
    let data = res.ok ? await res.json() : null
    let rows: AirtableRecord[] =
      data?.records && Array.isArray(data.records) ? data.records : []

    if (rows.length === 0) {
      const q = escapeAirtableQuoted(keyLast.toLowerCase())
      const q2 = new URLSearchParams({
        filterByFormula: `OR(LOWER({slug})='${q}',LOWER({Slug})='${q}')`,
        maxRecords: '1',
      })
      res = await fetch(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}?${q2.toString()}`,
        {
          headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
          next: { revalidate: 3600 },
        }
      )
      data = res.ok ? await res.json() : null
      rows = data?.records && Array.isArray(data.records) ? data.records : []
    }

    if (rows.length > 0) {
      const detail = recordToDetail(rows[0])
      if (detail) return detail
    }

    const list = await getAllPosts()
    const hit = list.find((p) => p.slug.toLowerCase() === keyLast.toLowerCase())
    if (!hit) return null
    const full = await fetchRecordById(hit.id)
    if (!full) return null
    return recordToDetail(full)
  } catch (e) {
    console.error('getPostBySlug', e)
    return null
  }
}
