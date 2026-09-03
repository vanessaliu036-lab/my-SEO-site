import type { Metadata } from "next"
import HomeTemplate from "@/components/templates/home-template"
import { ogImage, siteUrl, siteName, siteDescription } from "@/lib/siteConfig"
import {
  homeAuthoritySections,
  homeDateModified,
  homeDirectAnswer,
  homeSources,
} from "@/lib/homeContent"
import { seoDescription, seoTitle } from "@/lib/seo"

const homeTitle = "Origin Coffee Cambodia | Fine Robusta & Mondulkiri Research"

export const metadata: Metadata = {
  title: seoTitle(homeTitle),
  description: seoDescription(siteDescription),
  keywords: [
    "Fine Robusta",
    "Fine Robusta Coffee",
    "Fine Robusta Cambodia",
    "Coffea canephora",
    "Cambodian Coffee",
    "Cambodia Coffee Research",
    "Coffee Quality Institute Fine Robusta",
    "CQI Fine Robusta Standards",
    "Robusta Grading",
    "Coffee Processing",
    "Coffee Fermentation",
    "Coffee Drying",
    "Coffee Roasting",
    "Coffee Sensory Evaluation",
    "Coffee Quality Standards",
    "Mondulkiri Coffee",
    "Cambodian Coffee Industry",
    "Coffee Origin Research",
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: seoTitle(homeTitle),
    description: seoDescription(siteDescription),
    url: siteUrl,
    siteName,
    type: "website",
    images: [{ url: ogImage, alt: "Origin Coffee Cambodia coffee research and origin work" }],
  },
  twitter: {
    card: "summary_large_image",
    title: seoTitle(homeTitle),
    description: seoDescription(siteDescription),
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
  description: siteDescription,
  publisher: { "@id": organizationId },
  inLanguage: "en",
}

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": webpageId,
  name: siteName,
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
  ],
  citation: homeSources.map((source) => source.href),
  mainEntity: {
    "@type": "ItemList",
    name: "Fine Robusta research and quality guide",
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
