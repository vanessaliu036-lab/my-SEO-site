import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/siteConfig'
import { getAllPosts } from '@/lib/airtable'

/**
 * Only URLs that should be indexed (aligned with `app/robots.ts`).
 * Legacy commercial routes redirect to the research journal and are not emitted.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const posts = await getAllPosts()
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

    { url: `${siteUrl}/collection`, lastModified: now },
    { url: `${siteUrl}/collection/sovann`, lastModified: now },
    { url: `${siteUrl}/collection/prek`, lastModified: now },
    { url: `${siteUrl}/collection/angkar`, lastModified: now },

    { url: `${siteUrl}/blog`, lastModified: now },
    ...blogEntries,
  ]
}
