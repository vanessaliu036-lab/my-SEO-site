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

export const metadata: Metadata = {
  title: seoTitle("Origin Coffee Cambodia | Fine Robusta & Specialty Coffee"),
  description: seoDescription(siteDescription),
  keywords: [
    "Fine Robusta",
    "Fine Robusta Coffee",
    "Fine Robusta Cambodia",
    "Specialty Robusta",
    "Specialty Robusta Coffee",
    "Coffea canephora",
    "Cambodian Coffee",
    "Cambodia Coffee Supplier",
    "Specialty Coffee Cambodia",
    "Wholesale Coffee Beans Cambodia",
    "Coffee Quality Institute Fine Robusta",
    "CQI Fine Robusta Standards",
    "Robusta Grading",
    "Coffee Processing",
    "Precision Roasting",
    "Single Origin Coffee",
    "Mondulkiri Coffee",
    "Sustainable Coffee",
    "Cambodian Coffee Industry",
    "Specialty Coffee B2B",
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: seoTitle("Origin Coffee Cambodia | Fine Robusta & Specialty Coffee"),
    description: seoDescription(siteDescription),
    url: siteUrl,
    siteName,
    type: "website",
    images: [{ url: ogImage, alt: siteName }],
  },
  twitter: {
    card: "summary_large_image",
    title: seoTitle("Origin Coffee Cambodia | Fine Robusta & Specialty Coffee"),
    description: seoDescription(siteDescription),
    images: [ogImage],
  },
}

const organizationId = `${siteUrl}/#organization`
const websiteId = `${siteUrl}/#website`
const webpageId = `${siteUrl}/#webpage`
const homeHeroImageUrl =
  "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=2200&q=90"

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
    name: "Fine Robusta buyer and quality guide",
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
      <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
      <link rel="preload" as="image" href={homeHeroImageUrl} fetchPriority="high" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      <HomeTemplate />
    </>
  )
}
