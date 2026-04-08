/**
 * Airtable 表 `OCC_Blog_Posts` 欄位與後台截圖一致（請勿改名）：
 * title, slug, publish_date, status, author, summary, Content
 */
/** Vercel 上常見名稱 AIRTABLE_TOKEN，與 PAT / API_KEY 擇一即可 */
const AIRTABLE_API_KEY =
  process.env.AIRTABLE_API_KEY || process.env.AIRTABLE_PAT || process.env.AIRTABLE_TOKEN
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
const AIRTABLE_TABLE_NAME = 'OCC_Blog_Posts'

/** API 讀取順序：截圖欄位名優先，其餘為相容舊表。 */
const K = {
  title: ['title', 'Title'] as const,
  slug: ['slug', 'Slug', 'URL slug', 'url_slug'] as const,
  publishDate: ['publish_date', 'Publish Date', 'Last Modified'] as const,
  author: ['author', 'Author'] as const,
  summary: ['summary', 'Summary'] as const,
  content: ['Content', 'content', 'Body', 'body', 'Post', '正文'] as const,
}

type AirtableRecord = { id: string; fields: Record<string, unknown> }

/** 畫面上欄名與 API 鍵偶爾不完全一致（空白、全形等），用正規化比對。 */
function findFieldRaw(fields: Record<string, unknown>, canonical: string): unknown {
  const want = canonical.trim().toLowerCase()
  for (const [key, val] of Object.entries(fields)) {
    if (key.trim().toLowerCase() === want) return val
  }
  return undefined
}

function stringifyFieldValue(value: unknown): string {
  if (typeof value === 'string' && value.trim() !== '') return value
  if (typeof value === 'number' && Number.isFinite(value)) return String(value)
  if (typeof value === 'boolean') return value ? 'true' : ''
  if (typeof value === 'object' && value !== null && 'name' in value) {
    const name = String((value as { name: unknown }).name ?? '').trim()
    if (name !== '') return name
  }
  if (typeof value === 'object' && value !== null) {
    const o = value as Record<string, unknown>
    for (const k of ['text', 'value', 'markdown', 'plain_text', 'body', 'content'] as const) {
      const inner = o[k]
      if (typeof inner === 'string' && inner.trim() !== '') return inner
    }
  }
  if (Array.isArray(value)) {
    const parts = value
      .map((item) => {
        if (typeof item === 'string') return item.trim()
        if (typeof item === 'number' && Number.isFinite(item)) return String(item)
        if (typeof item === 'object' && item !== null && 'name' in item) {
          return String((item as { name: unknown }).name ?? '').trim()
        }
        return stringifyFieldValue(item)
      })
      .filter(Boolean)
    if (parts.length > 0) return parts.join('\n')
  }
  return ''
}

function pickField(fields: Record<string, unknown>, keys: readonly string[], fallback = ''): string {
  for (const key of keys) {
    let raw = fields[key]
    if (raw === undefined) raw = findFieldRaw(fields, key)
    const s = stringifyFieldValue(raw)
    if (s !== '') return s
  }
  return fallback
}

function escapeFormulaValue(value: string): string {
  return value.replace(/'/g, "\\'")
}

/** Airtable 公式字串內單引號需變成兩個單引號。 */
function escapeAirtableQuoted(value: string): string {
  return value.replace(/'/g, "''")
}

/** 僅使用 status 欄位（相容 API 鍵名空白／大小寫）。 */
function getStatus(fields: Record<string, unknown>): string {
  let raw: unknown = fields.status ?? fields.Status
  if (raw === undefined) raw = findFieldRaw(fields, 'status')
  if (typeof raw === 'object' && raw !== null && 'name' in raw) {
    return String((raw as { name: unknown }).name ?? '').trim().toLowerCase()
  }
  return String(raw ?? '').trim().toLowerCase()
}

function isPublishStatus(fields: Record<string, unknown>): boolean {
  const s = getStatus(fields)
  return s === 'publish' || s === 'published'
}

function pickPublishDate(fields: Record<string, unknown>): string {
  for (const key of K.publishDate) {
    const value = fields[key]
    if (typeof value === 'string' && value.trim() !== '') return value.trim()
    if (typeof value === 'number' && Number.isFinite(value)) return String(value)
  }
  return ''
}

/** 公開顯示條件與診斷共用；null 表示可上線。 */
export type BlogSkipReason =
  | 'not_publish'
  | 'missing_title'
  | 'missing_content'
  | 'empty_slug'
  | 'bad_slug'

export function skipReasonForFields(fields: Record<string, unknown>): BlogSkipReason | null {
  if (!isPublishStatus(fields)) return 'not_publish'
  const title = pickField(fields, K.title).trim()
  const content = pickField(fields, K.content).trim()
  const slug = pickField(fields, K.slug).trim()
  if (!title) return 'missing_title'
  if (!content) return 'missing_content'
  if (!slug) return 'empty_slug'
  if (!isAcceptableSlug(slug)) return 'bad_slug'
  return null
}

function isDisplayableRecord(fields: Record<string, unknown>): boolean {
  return skipReasonForFields(fields) === null
}

/** 後台常見全形／長橫線，與網址 ASCII 不一致時先正規化再驗證。
 *  另外處理：作者習慣把整段 path（含 `/blog/`）貼進 slug 欄，例如
 *  `/blog/my-post`、`blog/my-post`、`/my-post`，全部正規化成 `my-post`。
 *  若不剝掉這個前綴，slug 會卡在 `bad_slug`，整批文章不會出現在 /blog。 */
function normalizeSlugForUrl(slug: string): string {
  let s = slug
    .trim()
    .replace(/[\u2010-\u2015\u2212\ufe58\ufe63\uff0d\u3000]/g, '-')
    .replace(/\s+/g, '-')
  // 連續的前導 / 與選擇性的 blog/ 段：/blog/x、//blog/x、blog/x、/x → x
  s = s.replace(/^\/+/, '')
  s = s.replace(/^blog\/+/, '')
  s = s.replace(/\/+$/, '')
  return s
}

function isAcceptableSlug(slug: string): boolean {
  const t = normalizeSlugForUrl(slug)
  return t.length > 0 && /^[a-z0-9]+(?:[-_][a-z0-9]+)*$/i.test(t)
}

/** 列表／網址用 slug（與後台可能含全形橫線之欄位對齊）。 */
function slugFromFields(fields: Record<string, unknown>): string {
  return normalizeSlugForUrl(pickField(fields, K.slug))
}

/** 與截圖欄位對應；不含 category / 圖片／keywords 等額外欄。 */
export interface BlogPost {
  id: string
  title: string
  slug: string
  summary: string
  author: string
  publish_date: string
}

export interface BlogPostDetail extends BlogPost {
  content: string
}

export interface BlogAlignmentSkipped {
  id: string
  reason: BlogSkipReason
  titleHint: string
  statusHint: string
  slugHint: string
}

export interface BlogAlignmentReport {
  env: { hasKey: boolean; hasBase: boolean }
  apiOk: boolean
  apiError?: string
  totalRecords: number
  displayableCount: number
  displayable: BlogPost[]
  skipped: BlogAlignmentSkipped[]
}

async function fetchBlogTableRecords(): Promise<{
  ok: boolean
  records: AirtableRecord[]
  apiError?: string
}> {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    return { ok: false, records: [], apiError: 'missing_env' }
  }

  try {
    const all: AirtableRecord[] = []
    let offset: string | undefined

    do {
      // 注意：Airtable 的 `maxRecords` 是「整個請求全部頁加總」的上限，
      // 不是單頁筆數；之前誤設成 '100' 會讓表內第 101 筆之後永遠拿不到，
      // 造成 /blog 顯示篇數與 Airtable 已發佈數對不上。每頁筆數要用 `pageSize`。
      const params = new URLSearchParams({
        'sort[0][field]': 'publish_date',
        'sort[0][direction]': 'desc',
        pageSize: '100',
      })
      if (offset) params.set('offset', offset)

      const res = await fetch(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}?${params.toString()}`,
        {
          headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
          next: { revalidate: 3600 },
        }
      )

      if (!res.ok) {
        const text = await res.text()
        return { ok: false, records: all, apiError: text.slice(0, 500) }
      }

      const data = await res.json()

      if (!data.records || !Array.isArray(data.records)) {
        return { ok: false, records: all, apiError: 'unexpected_response_shape' }
      }

      all.push(...(data.records as AirtableRecord[]))
      offset = typeof data.offset === 'string' && data.offset.length > 0 ? data.offset : undefined
    } while (offset)

    return { ok: true, records: all }
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    return { ok: false, records: [], apiError: msg }
  }
}

/** 與網站同一套規則：env、API、可顯示篇數、被排除原因（對齊本機／Vercel／資料表）。 */
export async function getBlogAlignmentReport(): Promise<BlogAlignmentReport> {
  const env = {
    hasKey: Boolean(AIRTABLE_API_KEY),
    hasBase: Boolean(AIRTABLE_BASE_ID),
  }

  const empty = (): BlogAlignmentReport => ({
    env,
    apiOk: false,
    totalRecords: 0,
    displayableCount: 0,
    displayable: [],
    skipped: [],
  })

  if (!env.hasKey || !env.hasBase) {
    return { ...empty(), apiError: 'missing_env' }
  }

  const { ok, records, apiError } = await fetchBlogTableRecords()
  if (!ok) {
    return { ...empty(), apiError }
  }

  const displayable: BlogPost[] = []
  const skipped: BlogAlignmentSkipped[] = []

  for (const record of records) {
    const fields = record.fields
    const reason = skipReasonForFields(fields)
    if (reason === null) {
      displayable.push({
        id: record.id,
        title: pickField(fields, K.title, 'Untitled'),
        slug: slugFromFields(fields),
        summary: pickField(fields, K.summary),
        author: pickField(fields, K.author, 'OCC Team'),
        publish_date: pickPublishDate(fields),
      })
    } else {
      const slugRaw = pickField(fields, K.slug)
      skipped.push({
        id: record.id,
        reason,
        titleHint: pickField(fields, K.title).slice(0, 80) || '(empty)',
        statusHint: getStatus(fields) || '(empty)',
        slugHint: slugRaw.slice(0, 120) || '(empty)',
      })
    }
  }

  const filtered = displayable.filter((post) => post.slug && isAcceptableSlug(post.slug))

  return {
    env,
    apiOk: true,
    totalRecords: records.length,
    displayableCount: filtered.length,
    displayable: filtered,
    skipped,
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    console.error('Missing Airtable env vars: AIRTABLE_TOKEN / AIRTABLE_API_KEY / AIRTABLE_PAT or AIRTABLE_BASE_ID')
    return []
  }

  const { ok, records, apiError } = await fetchBlogTableRecords()
  if (!ok) {
    console.error('Airtable API Error:', apiError)
    return []
  }

  try {
    return records
      .filter((record) => isDisplayableRecord(record.fields))
      .map((record: AirtableRecord): BlogPost => ({
        id: record.id,
        title: pickField(record.fields, K.title, 'Untitled'),
        slug: slugFromFields(record.fields),
        summary: pickField(record.fields, K.summary),
        author: pickField(record.fields, K.author, 'OCC Team'),
        publish_date: pickPublishDate(record.fields),
      }))
      .filter((post) => post.slug && isAcceptableSlug(post.slug))
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

async function fetchRecordById(recordId: string): Promise<AirtableRecord | null> {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) return null
  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}/${encodeURIComponent(recordId)}`,
      { headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` }, next: { revalidate: 3600 } }
    )
    if (!res.ok) return null
    const data = await res.json()
    if (!data?.fields) return null
    return { id: data.id, fields: data.fields as Record<string, unknown> }
  } catch {
    return null
  }
}

function recordToDetail(record: AirtableRecord): BlogPostDetail | null {
  if (!isDisplayableRecord(record.fields)) return null
  return {
    id: record.id,
    title: pickField(record.fields, K.title, 'Untitled'),
    slug: slugFromFields(record.fields),
    content: pickField(record.fields, K.content),
    summary: pickField(record.fields, K.summary),
    author: pickField(record.fields, K.author, 'OCC Team'),
    publish_date: pickPublishDate(record.fields),
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPostDetail | null> {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) return null

  let trimmed = slug.trim()
  try {
    trimmed = decodeURIComponent(trimmed).trim()
  } catch {
    /* 非標準編碼時沿用原字串 */
  }
  if (!trimmed) return null

  const normalizedPath = normalizeSlugForUrl(trimmed)

  try {
    // 1) 與 Airtable 完全一致（最快）。後台習慣會把整段 path（含 `/blog/`）
    // 貼進 slug 欄，所以同時嘗試 `xxx` 與 `/blog/xxx` 兩種寫法。
    const exact = escapeFormulaValue(trimmed)
    const exactWithPrefix = escapeFormulaValue(`/blog/${trimmed}`)
    const q1 = new URLSearchParams({
      filterByFormula: `OR({slug}='${exact}',{Slug}='${exact}',{slug}='${exactWithPrefix}',{Slug}='${exactWithPrefix}')`,
      maxRecords: '1',
    })
    let res = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}?${q1.toString()}`,
      { headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` }, next: { revalidate: 3600 } }
    )

    let data = res.ok ? await res.json() : null
    let records: AirtableRecord[] = data?.records && Array.isArray(data.records) ? data.records : []

    // 2) 不分大小寫（網址 / 後台 slug 大小寫不一致時），同樣涵蓋兩種寫法
    if (records.length === 0) {
      const q = escapeAirtableQuoted(trimmed.toLowerCase())
      const qWithPrefix = escapeAirtableQuoted(`/blog/${trimmed}`.toLowerCase())
      const q2 = new URLSearchParams({
        filterByFormula: `OR(LOWER({slug})='${q}',LOWER({Slug})='${q}',LOWER({slug})='${qWithPrefix}',LOWER({Slug})='${qWithPrefix}')`,
        maxRecords: '1',
      })
      res = await fetch(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}?${q2.toString()}`,
        { headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` }, next: { revalidate: 3600 } }
      )
      data = res.ok ? await res.json() : null
      records = data?.records && Array.isArray(data.records) ? data.records : []
    }

    // 3) 用已通過篩選的列表對 slug 做不分大小寫比對，再依 record id 拉一筆（避開公式邊界情況）
    if (records.length === 0) {
      const list = await getAllPosts()
      const hit = list.find(
        (p) =>
          p.slug.toLowerCase() === trimmed.toLowerCase() ||
          p.slug.toLowerCase() === normalizedPath.toLowerCase()
      )
      if (hit) {
        const byId = await fetchRecordById(hit.id)
        if (byId) return recordToDetail(byId)
      }
      return null
    }

    return recordToDetail(records[0])
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}
