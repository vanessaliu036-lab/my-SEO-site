const AIRTABLE_API_KEY =
  process.env.AIRTABLE_API_KEY || process.env.AIRTABLE_PAT || process.env.AIRTABLE_TOKEN
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
const AIRTABLE_TABLE_NAMES = (
  process.env.AIRTABLE_TABLE_NAME ||
  process.env.AIRTABLE_TABLE_NAMES ||
  'Articles,OCC_Blog_Posts'
)
  .split(',')
  .map((name) => name.trim())
  .filter(Boolean)

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
}

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
  if (!value) return 'OCC Team'
  if (isLowSignalText(value)) return 'OCC Team'
  return value
}

function summaryFromContent(content: string, title = ''): string {
  const lines = content
    .split('\n')
    .map((line) => stripMarkdown(line.trim()))
    .map(normalizeText)
    .filter((line) => Boolean(line))
    .filter((line) => !/^#{1,6}\s+/.test(line))
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

function getStatus(fields: Record<string, unknown>): string {
  const raw = fields.status ?? fields.Status ?? ''
  if (typeof raw === 'object' && raw !== null && 'name' in raw) {
    return String((raw as { name: unknown }).name ?? '').trim().toLowerCase()
  }
  return String(raw).trim().toLowerCase()
}

/**
 * 僅後台標成已發布才顯示（不再把空白 status 當上線，避免列表比「已上架」多）。
 *
 * 兼容字串（不分大小寫、不分單複數）：
 *   - 已發布：publish / published / live / ready / sent / online
 *   - 未發布：draft / archived / archive / inactive / unpublish / unpublished
 *
 * 變體邏輯集中在這一支；改規則只動這裡，別處不必動。
 */
const PUBLISHED_TOKENS = new Set([
  'publish',
  'published',
  'live',
  'ready',
  'sent',
  'online',
])

const UNPUBLISHED_TOKENS = new Set([
  'draft',
  'archived',
  'archive',
  'inactive',
  'unpublish',
  'unpublished',
])

function isPublished(fields: Record<string, unknown>): boolean {
  const s = getStatus(fields)
  if (!s) return false // 空字串不算發布，避免 Draft 漏欄位時誤判
  if (UNPUBLISHED_TOKENS.has(s)) return false
  return PUBLISHED_TOKENS.has(s)
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

function slugFromRecord(record: AirtableRecord): string {
  const direct = canonicalSlugForUrl(pickField(record.fields, K.slug))
  if (isAcceptableSlug(direct)) return direct

  const titleCandidate =
    pickField(record.fields, K.title) ||
    pickField(record.fields, K.sourceTitle) ||
    ''
  const derived = slugifyText(titleCandidate)
  return isAcceptableSlug(derived) ? derived : ''
}

function sortFieldForTable(tableName: string): string {
  const lower = tableName.toLowerCase()
  if (lower.includes('article')) return 'scout_date'
  return 'publish_date'
}

function recordToListItem(record: AirtableRecord): BlogPost | null {
  if (!isPublished(record.fields)) return null
  const slug = slugFromRecord(record)
  if (!slug || !isAcceptableSlug(slug)) return null
  const title =
    pickField(record.fields, K.title) ||
    pickField(record.fields, K.sourceTitle) ||
    'Untitled'
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
  }
}

async function fetchTableRecords(tableName: string): Promise<AirtableRecord[]> {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) return []
  const all: AirtableRecord[] = []
  let offset: string | undefined
  do {
    const params = new URLSearchParams({
      'sort[0][field]': sortFieldForTable(tableName),
      'sort[0][direction]': 'desc',
      // 抓完全部 records（先前 100 筆上限會把較舊的 published 文章切掉）。
      // Airtable API 上限 100/頁，這個參數是「總筆數上限」，不是分頁大小。
      maxRecords: '1000',
    })
    if (offset) params.set('offset', offset)
    const res = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(tableName)}?${params.toString()}`,
      {
        headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
        // 60s 短窗：後台推 status=publish 後，前台最遲 60s 顯示，
        // 配合 /api/revalidate 主動刷新可達即時。
        next: { revalidate: 60 },
      }
    )
    if (!res.ok) break
    const data = await res.json()
    if (!data.records || !Array.isArray(data.records)) break
    all.push(
      ...(data.records as Array<{ id: string; fields: Record<string, unknown> }>).map((record) => ({
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
    const recordGroups = await Promise.all(AIRTABLE_TABLE_NAMES.map((tableName) => fetchTableRecords(tableName)))
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
  for (const tableName of AIRTABLE_TABLE_NAMES) {
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) return null
    try {
      const res = await fetch(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(tableName)}/${encodeURIComponent(recordId)}`,
        {
          headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
          next: { revalidate: 60 },
        }
      )
      if (!res.ok) continue
      const data = await res.json()
      if (!data?.fields) continue
      return { id: data.id, fields: data.fields as Record<string, unknown>, tableName }
    } catch {
      continue
    }
  }
  return null
}

export async function getPostBySlug(urlSlug: string): Promise<BlogPostDetail | null> {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) return null

  const key = normalizeSlugParam(urlSlug)
  const keyLast = canonicalSlugForUrl(key)
  if (!keyLast) return null

  try {
    const exact = escapeFormulaValue(keyLast)
    for (const tableName of AIRTABLE_TABLE_NAMES) {
      const q1 = new URLSearchParams({
        filterByFormula: `OR({slug}='${exact}',{Slug}='${exact}')`,
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
        const q2 = new URLSearchParams({
          filterByFormula: `OR(LOWER({slug})='${q}',LOWER({Slug})='${q}')`,
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
        if (detail) return detail
      }
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
