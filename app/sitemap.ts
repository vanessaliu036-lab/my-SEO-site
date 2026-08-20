import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/siteConfig'
import { getAllPosts } from '@/lib/airtable'

/**
 * Only URLs that should be indexed (aligned with `app/robots.ts`).
 * Legacy public routes are handled by permanent redirects and are not emitted.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  // Fetch blog posts from Airtable — falls back to [] if env vars not set
  // getAllPosts() already filters to URL-safe slugs (same as lib/airtable)
  const posts = await getAllPosts()
  const blogEntries: MetadataRoute.Sitemap = posts.map((p) => ({
      url: `${siteUrl}/blog/${p.slug}`,
      lastModified: p.publish_date ? new Date(p.publish_date) : now,
    }))

  return [
    // ── Core ──────────────────────────────────────────────────────────────
    { url: siteUrl,                               lastModified: now },
    { url: `${siteUrl}/contact`,                  lastModified: now },

    // ── About ─────────────────────────────────────────────────────────────
    { url: `${siteUrl}/about`,                    lastModified: now },
    { url: `${siteUrl}/about/mission`,            lastModified: now },
    { url: `${siteUrl}/about/founder`,            lastModified: now },
    { url: `${siteUrl}/about/manifesto`,          lastModified: now },
    { url: `${siteUrl}/about/sustainability`,     lastModified: now },

    // ── Solutions ─────────────────────────────────────────────────────────
    { url: `${siteUrl}/solutions`,                lastModified: now },
    { url: `${siteUrl}/solutions/wholesale`,      lastModified: now },
    { url: `${siteUrl}/solutions/roasting-program`, lastModified: now },
    { url: `${siteUrl}/solutions/barista-staffing`, lastModified: now },
    { url: `${siteUrl}/solutions/equipment-service`, lastModified: now },

    // ── Collection (Mondulkiri Origin) ────────────────────────────────────
    { url: `${siteUrl}/collection`,             lastModified: now },
    { url: `${siteUrl}/collection/sovann`,      lastModified: now },
    { url: `${siteUrl}/collection/prek`,        lastModified: now },
    { url: `${siteUrl}/collection/angkar`,      lastModified: now },

    // ── Blog index ────────────────────────────────────────────────────────
    { url: `${siteUrl}/blog`,                     lastModified: now },

    // ── Blog posts (dynamic, from Airtable) ───────────────────────────────
    ...blogEntries,
  ]
}
