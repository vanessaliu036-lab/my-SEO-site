const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
const AIRTABLE_TABLE_NAME = 'OCC_Blog_Posts'

type AirtableRecord = { id: string; fields: Record<string, string> }

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
  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}?filterByFormula={status}='Published'&sort[0][field]=publish_date&sort[0][direction]=desc`,
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

    return data.records.map((record: AirtableRecord) => ({
      id: record.id,
      title: record.fields.title || 'Untitled',
      slug: record.fields.slug || '',
      summary: record.fields.summary || '',
      author: record.fields.author || 'OCC Team',
      publish_date: record.fields.publish_date || '',
      featured_image_url: record.fields.featured_image_url || '',
      category: record.fields.Category || '',
    }))
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPostDetail | null> {
  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}?filterByFormula=AND({slug}='${slug}',{status}='Published')`,
      {
        headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
        next: { revalidate: 60 },
      }
    )

    if (!res.ok) return null

    const data = await res.json()

    if (!data.records || data.records.length === 0) return null

    const record: AirtableRecord = data.records[0]
    return {
      id: record.id,
      title: record.fields.title || 'Untitled',
      slug: record.fields.slug || '',
      content: record.fields.Content || '',
      summary: record.fields.summary || '',
      author: record.fields.author || 'OCC Team',
      publish_date: record.fields.publish_date || '',
      featured_image_url: record.fields.featured_image_url || '',
      category: record.fields.Category || '',
      excerpt: record.fields.Excerpt || '',
      keywords: record.fields.Keywords || '',
    }
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}
