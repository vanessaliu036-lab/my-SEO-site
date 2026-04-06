import HomePageClient from "./HomePageClient"
import { siteUrl, siteName, siteDescription } from "@/lib/siteConfig"

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl,
  description: siteDescription,
}

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: siteName,
  url: siteUrl,
  description: siteDescription,
  mainEntity: {
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
  },
}

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      <HomePageClient />
    </>
  )
}
