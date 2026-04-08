import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/siteConfig'
import { getAllPosts } from '@/lib/airtable'

function safeLastModified(raw: string | undefined, fallback: Date): Date {
  if (!raw?.trim()) return fallback
  const d = new Date(raw)
  return Number.isNaN(d.getTime()) ? fallback : d
}

/**
 * Only URLs that should be indexed (aligned with `app/robots.ts`).
 * Do not add routes that are `disallow` there (e.g. /archive, /matter, /signal).
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  let posts: Awaited<ReturnType<typeof getAllPosts>> = []
  try {
    posts = await getAllPosts()
  } catch {
    posts = []
  }

  const blogEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${siteUrl}/blog/${p.slug}`,
    lastModified: safeLastModified(p.publish_date, now),
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
    { url: `${siteUrl}/solutions/wholesale`,      lastModified: now, changeFrequency: 'monthly',  priority: 0.9 },
    { url: `${siteUrl}/solutions/roasting-program`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/solutions/barista-staffing`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/solutions/equipment-service`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/system`,                   lastModified: now, changeFrequency: 'monthly',  priority: 0.7 },
    { url: `${siteUrl}/vision`,                   lastModified: now, changeFrequency: 'monthly',  priority: 0.7 },

    // ── Blog index ────────────────────────────────────────────────────────
    { url: `${siteUrl}/blog`,                     lastModified: now, changeFrequency: 'weekly',   priority: 0.8 },

    // ── Blog posts (dynamic, from Airtable) ───────────────────────────────
    ...blogEntries,
  ]
}
