import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // 🔧 請替換為實際網域（或於 .env.local 設定 NEXT_PUBLIC_SITE_URL）
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://你的網域.com'

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
