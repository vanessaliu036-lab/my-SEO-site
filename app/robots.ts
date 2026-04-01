import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/siteConfig'

export default function robots(): MetadataRoute.Robots {
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
