const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image: string;
  category: string;
  keywords: string;
  status: string;
  publish_date: string;
  author: string;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const res = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/OCC_Blog_Posts?filterByFormula={status}='Published'&sort[0][field]=publish_date&sort[0][direction]=desc`,
    {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
      next: { revalidate: 60 },
    }
  );
  const data = await res.json();
  return data.records.map((record: any) => ({
    id: record.id,
    title: record.fields.title || '',
    slug: record.fields.slug || '',
    content: record.fields.Content || '',
    excerpt: record.fields.Excerpt || '',
    cover_image: record.fields.Cover_Image || '',
    category: record.fields.Category || '',
    keywords: record.fields.Keywords || '',
    status: record.fields.status || '',
    publish_date: record.fields.publish_date || '',
    author: record.fields.author || '',
  }));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const res = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/OCC_Blog_Posts?filterByFormula={slug}='${slug}'`,
    {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
      next: { revalidate: 60 },
    }
  );
  const data = await res.json();
  if (!data.records || data.records.length === 0) return null;
  const record = data.records[0];
  return {
    id: record.id,
    title: record.fields.title || '',
    slug: record.fields.slug || '',
    content: record.fields.Content || '',
    excerpt: record.fields.Excerpt || '',
    cover_image: record.fields.Cover_Image || '',
    category: record.fields.Category || '',
    keywords: record.fields.Keywords || '',
    status: record.fields.status || '',
    publish_date: record.fields.publish_date || '',
    author: record.fields.author || '',
  };
}
