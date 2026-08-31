import type { Metadata } from "next"
import HomePageClient from "./HomePageClient"
import { ogImage, siteUrl, siteName, siteDescription } from "@/lib/siteConfig"
import {
  homeAuthoritySections,
  homeDateModified,
  homeDirectAnswer,
  homeFaqs,
  homeSources,
} from "@/lib/homeContent"

export const metadata: Metadata = {
  title: "Origin Coffee Cambodia | Fine Robusta & Specialty Coffee",
  description: siteDescription,
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
    title: "Origin Coffee Cambodia | Fine Robusta & Specialty Coffee",
    description: siteDescription,
    url: siteUrl,
    siteName,
    type: "website",
    images: [{ url: ogImage, alt: siteName }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Origin Coffee Cambodia | Fine Robusta & Specialty Coffee",
    description: siteDescription,
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
    name: "Fine Robusta buyer and quality guide",
    itemListElement: homeAuthoritySections.map((section, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: section.title,
      url: `${siteUrl}/#${section.id}`,
    })),
  },
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${siteUrl}/#faq`,
  isPartOf: { "@id": webpageId },
  mainEntity: homeFaqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
}

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <HomePageClient />
    </>
  )
}
