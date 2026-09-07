import type { Metadata } from "next"
import HomeTemplate from "@/components/templates/home-template"
import { ogImage, siteUrl, siteName } from "@/lib/siteConfig"
import {
  homeAuthoritySections,
  homeDateModified,
  homeDirectAnswer,
  homeSources,
} from "@/lib/homeContent"
import { pageAlternates } from "@/lib/seo"

const homeTitle = "Origin Coffee Cambodia | Fine Robusta Beans & Specialty Coffee Supplier"
const homeDescription =
  "Specialty coffee sourcing, roasting and B2B supply in Cambodia, with Fine Robusta, Mondulkiri coffee, Cambodian coffee origins, traceability and quality-focused coffee solutions"

export const metadata: Metadata = {
  title: homeTitle,
  description: homeDescription,
  keywords: [
    "Fine Robusta",
    "Fine Robusta Cambodia",
    "Fine Robusta Beans",
    "Cambodia Coffee Supplier",
    "Specialty Coffee Supplier Cambodia",
    "Cambodia Coffee Beans",
    "Cambodian Coffee Beans",
    "Cambodia Robusta Coffee Beans",
    "Mondulkiri Coffee Beans",
    "Coffee Sourcing Cambodia",
    "Wholesale Coffee Cambodia",
    "Coffee Roasting Cambodia",
    "B2B Coffee Supply",
    "Coffee Traceability",
    "Coffea canephora",
    "Coffee Processing",
    "Coffee Quality Standards",
  ],
  alternates: pageAlternates("/"),
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: siteUrl,
    siteName,
    type: "website",
    images: [{ url: ogImage, alt: "Origin Coffee Cambodia Fine Robusta and specialty coffee" }],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
    images: [ogImage],
  },
}

const organizationId = `${siteUrl}/#organization`
const websiteId = `${siteUrl}/#website`
const webpageId = `${siteUrl}/#webpage`

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": websiteId,
  name: siteName,
  url: siteUrl,
  description: homeDescription,
  publisher: { "@id": organizationId },
  inLanguage: "en",
}

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": webpageId,
  name: homeTitle,
  url: siteUrl,
  description: homeDirectAnswer,
  dateModified: homeDateModified,
  isPartOf: { "@id": websiteId },
  about: [
    {
      "@type": "DefinedTerm",
      name: "Fine Robusta",
      description:
        "Quality-focused Coffea canephora evaluated with Robusta-specific physical and sensory standards.",
    },
    { "@type": "Thing", name: "Coffea canephora" },
    { "@type": "Thing", name: "Cambodian coffee" },
    { "@type": "Place", name: "Mondulkiri, Cambodia" },
    { "@type": "Thing", name: "Specialty coffee sourcing" },
    { "@type": "Thing", name: "Wholesale coffee supply" },
  ],
  citation: homeSources.map((source) => source.href),
  mainEntity: {
    "@type": "ItemList",
    name: "Fine Robusta quality, sourcing and origin guide",
    itemListElement: homeAuthoritySections.map((section, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: section.title,
      url: `${siteUrl}/#${section.id}`,
    })),
  },
}

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      <HomeTemplate />
    </>
  )
}
