import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/siteConfig'
import { getAllPosts } from '@/lib/airtable'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  // Fetch blog posts from Airtable — falls back to [] if env vars not set
  const posts = await getAllPosts()
  const blogEntries: MetadataRoute.Sitemap = posts
    .filter((p) => p.slug)
    .map((p) => ({
      url: `${siteUrl}/blog/${p.slug}`,
      lastModified: p.publish_date ? new Date(p.publish_date) : now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

  return [
    // ── Core ──────────────────────────────────────────────────────────────
    { url: siteUrl,                               lastModified: now, changeFrequency: 'monthly',  priority: 1.0 },
    { url: `${siteUrl}/contact`,                  lastModified: now, changeFrequency: 'yearly',   priority: 0.9 },

    // ── About ─────────────────────────────────────────────────────────────
    { url: `${siteUrl}/about`,                    lastModified: now, changeFrequency: 'monthly',  priority: 0.8 },
    { url: `${siteUrl}/about/mission`,            lastModified: now, changeFrequency: 'monthly',  priority: 0.7 },
    { url: `${siteUrl}/about/founder`,            lastModified: now, changeFrequency: 'monthly',  priority: 0.7 },
    { url: `${siteUrl}/about/manifesto`,          lastModified: now, changeFrequency: 'monthly',  priority: 0.7 },
    { url: `${siteUrl}/about/sustainability`,     lastModified: now, changeFrequency: 'monthly',  priority: 0.8 },

    // ── Coffee / Origin ────────────────────────────────────────────────────
    { url: `${siteUrl}/coffee/single-origin`,     lastModified: now, changeFrequency: 'monthly',  priority: 0.8 },

    // ── Solutions / System / Vision ────────────────────────────────────────
    { url: `${siteUrl}/solutions`,                lastModified: now, changeFrequency: 'monthly',  priority: 0.8 },
    { url: `${siteUrl}/system`,                   lastModified: now, changeFrequency: 'monthly',  priority: 0.7 },
    { url: `${siteUrl}/vision`,                   lastModified: now, changeFrequency: 'monthly',  priority: 0.7 },

    // ── Blog index ────────────────────────────────────────────────────────
    { url: `${siteUrl}/blog`,                     lastModified: now, changeFrequency: 'weekly',   priority: 0.8 },

    // ── Blog posts (dynamic, from Airtable) ───────────────────────────────
    ...blogEntries,
  ]
}
