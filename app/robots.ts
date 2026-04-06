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
      disallow: [
        '/api/',
        '/archive/', // thin content — stub page
        '/matter/',  // thin content — stub page
        '/signal/',  // thin content — stub page
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
