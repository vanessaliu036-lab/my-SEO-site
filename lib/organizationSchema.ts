import { siteLogoUrl } from "@/lib/siteConfig"

/** Service region for JSON-LD — online-first; no street address. */
export const areaServedCambodia = {
  "@type": "Country" as const,
  name: "Cambodia",
}

/** Article `publisher.logo` — single logo URL sitewide. */
export function publisherLogoImageObject() {
  return {
    "@type": "ImageObject" as const,
    url: siteLogoUrl,
  }
}
