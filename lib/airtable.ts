const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = 'OCC_Blog_Posts';

export async function getAllPosts() {
  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}?filterByFormula={status}='Published'&sort[0][field]=publish_date&sort[0][direction]=desc`,
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        },
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Airtable API Error:', errorText);
      return [];
    }

    const data = await res.json();

    if (!data.records || !Array.isArray(data.records)) {
      console.error('Unexpected Airtable response:', data);
      return [];
    }

    return data.records.map((record: any) => ({
      id: record.id,
      title: record.fields.title || 'Untitled',
      slug: record.fields.slug || '',
      summary: record.fields.summary || '',
      author: record.fields.author || 'OCC Team',
      publish_date: record.fields.publish_date || '',
      featured_image_url: record.fields.featured_image_url || '',
      category: record.fields.Category || '',
    }));
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}?filterByFormula=AND({slug}='${slug}',{status}='Published')`,
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        },
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      return null;
    }

    const data = await res.json();

    if (!data.records || data.records.length === 0) {
      return null;
    }

    const record = data.records[0];
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
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}
