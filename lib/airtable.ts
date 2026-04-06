const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY || process.env.AIRTABLE_PAT
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
const AIRTABLE_TABLE_NAME = 'OCC_Blog_Posts'

type AirtableRecord = { id: string; fields: Record<string, string> }

function pickField(fields: Record<string, string>, keys: string[], fallback = ''): string {
  for (const key of keys) {
    const value = fields[key]
    if (typeof value === 'string' && value.trim() !== '') return value
  }
  return fallback
}

function escapeFormulaValue(value: string): string {
  return value.replace(/'/g, "\\'")
}

function normalizeStatus(status: unknown): string {
  if (typeof status !== "string") return ""
  return status.trim().toLowerCase()
}

function isPublishedRecord(fields: Record<string, string>): boolean {
  const status =
    fields.status ??
    // Airtable field name may differ in case
    (fields as Record<string, string>).Status ??
    ""
  const normalized = normalizeStatus(status)
  // If status is missing, treat as published (matches earlier legacy behavior)
  return normalized === "published" || normalized === ""
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
    console.error('Missing Airtable env vars: AIRTABLE_API_KEY/AIRTABLE_PAT or AIRTABLE_BASE_ID')
    return []
  }

  try {
    // Fetch first, then filter in code.
    // This avoids hard-to-debug cases where Airtable field name/casing differs,
    // and prevents posts.length from becoming 0 due to formula mismatch.
    const res = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}?sort[0][field]=publish_date&sort[0][direction]=desc&maxRecords=100`,
      {
        headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
        next: { revalidate: 60 },
      }
    )

    if (!res.ok) {
      console.error('Airtable API Error:', await res.text())
      return []
    }

    const data = await res.json()

    if (!data.records || !Array.isArray(data.records)) {
      console.error('Unexpected Airtable response:', data)
      return []
    }

    const records: AirtableRecord[] = data.records

    return records
      .filter((record) => isPublishedRecord(record.fields))
      .map((record: AirtableRecord): BlogPost => ({
        id: record.id,
        title: pickField(record.fields, ['title', 'Title'], 'Untitled'),
        slug: pickField(record.fields, ['slug', 'Slug']),
        summary: pickField(record.fields, ['summary', 'Summary']),
        author: pickField(record.fields, ['author', 'Author'], 'OCC Team'),
        publish_date: pickField(record.fields, ['publish_date', 'Publish Date', 'Last Modified']),
        featured_image_url: pickField(record.fields, ['featured_image_url', 'Featured Image URL']),
        category: pickField(record.fields, ['Category', 'category']),
      }))
      .filter((post) => post.slug && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug))
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPostDetail | null> {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) return null

  try {
    const safeSlug = escapeFormulaValue(slug)
    const query = new URLSearchParams({
      filterByFormula: `OR({slug}='${safeSlug}',{Slug}='${safeSlug}')`,
      maxRecords: "1",
    })

    const res = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}?${query.toString()}`,
      { headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` }, next: { revalidate: 60 } }
    )

    if (!res.ok) return null

    const data = await res.json()

    if (!data.records || data.records.length === 0) return null

    const record: AirtableRecord = data.records[0]
    if (!isPublishedRecord(record.fields)) return null
    return {
      id: record.id,
      title: pickField(record.fields, ['title', 'Title'], 'Untitled'),
      slug: pickField(record.fields, ['slug', 'Slug']),
      content: pickField(record.fields, ['Content', 'content']),
      summary: pickField(record.fields, ['summary', 'Summary']),
      author: pickField(record.fields, ['author', 'Author'], 'OCC Team'),
      publish_date: pickField(record.fields, ['publish_date', 'Publish Date', 'Last Modified']),
      featured_image_url: pickField(record.fields, ['featured_image_url', 'Featured Image URL']),
      category: pickField(record.fields, ['Category', 'category']),
      excerpt: pickField(record.fields, ['Excerpt', 'excerpt']),
      keywords: pickField(record.fields, ['Keywords', 'keywords']),
    }
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}
