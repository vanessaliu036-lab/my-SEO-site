import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/siteConfig'
import { getPublishedPosts } from '@/lib/airtable'

/**
 * Only URLs that should be indexed (aligned with `app/robots.ts`).
 * Strategic published routes are emitted explicitly; the Airtable blog corpus expansion remains unchanged.
 */
async function getPublishedPostsForSitemap() {
  const hasAirtableCredentials = Boolean(
    (process.env.AIRTABLE_API_KEY || process.env.AIRTABLE_PAT || process.env.AIRTABLE_TOKEN) &&
      process.env.AIRTABLE_BASE_ID
  )
  if (!hasAirtableCredentials) return []
  const posts = await getPublishedPosts()
  return posts
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const posts = await getPublishedPostsForSitemap()
  const blogEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${siteUrl}/blog/${p.slug}`,
    lastModified: p.publish_date ? new Date(p.publish_date) : now,
  }))

  return [
    { url: siteUrl, lastModified: now },
    { url: `${siteUrl}/contact`, lastModified: now },

    { url: `${siteUrl}/about`, lastModified: now },
    { url: `${siteUrl}/about/mission`, lastModified: now },
    { url: `${siteUrl}/about/founder`, lastModified: now },
    { url: `${siteUrl}/about/manifesto`, lastModified: now },
    { url: `${siteUrl}/about/sustainability`, lastModified: now },

    { url: `${siteUrl}/fine-robusta-cambodia`, lastModified: now },
    { url: `${siteUrl}/origins`, lastModified: now },
    { url: `${siteUrl}/origins/cambodia-regions`, lastModified: now },
    { url: `${siteUrl}/origins/farm-terroir`, lastModified: now },

    { url: `${siteUrl}/solutions`, lastModified: now },
    { url: `${siteUrl}/solutions/wholesale`, lastModified: now },
    { url: `${siteUrl}/solutions/roasting-program`, lastModified: now },
    { url: `${siteUrl}/solutions/coffee-marketing`, lastModified: now },
    { url: `${siteUrl}/solutions/equipment-service`, lastModified: now },
    { url: `${siteUrl}/partnerships`, lastModified: now },
    { url: `${siteUrl}/brand-gifting`, lastModified: now },
    { url: `${siteUrl}/distribution`, lastModified: now },
    { url: `${siteUrl}/resources/coffee-buyer-specification-template`, lastModified: now },

    { url: `${siteUrl}/blog`, lastModified: now },
    ...blogEntries,
  ]
}
