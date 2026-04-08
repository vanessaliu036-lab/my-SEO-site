import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/siteConfig'

export default function robots(): MetadataRoute.Robots {
  // Block indexing on preview / staging deployments (Vercel preview URLs)
  const isPreview = process.env.VERCEL_ENV === 'preview' || process.env.VERCEL_ENV === 'development'

  if (isPreview) {
    return {
      rules: { userAgent: '*', disallow: '/' },
      sitemap: `${siteUrl}/sitemap.xml`,
    }
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Thin / stub routes — not listed in `app/sitemap.ts` so crawlers are not nudged to index them.
      disallow: [
        '/api/',
        '/archive/',
        '/matter/',
        '/signal/',
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
