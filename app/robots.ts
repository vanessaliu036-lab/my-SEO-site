import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/siteConfig'

export default function robots(): MetadataRoute.Robots {
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
      disallow: ['/api/', '/admin', '/admin/'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
