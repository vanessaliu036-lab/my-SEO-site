import { AboutInstitutionalTemplate } from "@/components/templates/about-institutional-template"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mission | Origin Coffee Cambodia - OCC",
  description:
    "OCC builds Cambodian coffee through origin knowledge, quality standards, professional roasting, and clear access to the market.",
  keywords:
    "Origin Coffee Cambodia mission, Cambodian coffee, Fine Robusta Cambodia, coffee quality standards, coffee processing, OCC coffee supply",
  alternates: pageAlternates("/about/mission"),
  openGraph: {
    title: "Mission | Origin Coffee Cambodia - OCC",
    description:
      "The purpose behind OCC's work with Cambodian coffee, Fine Robusta, quality, processing, and professional coffee supply.",
    url: `${siteUrl}/about/mission`,
    siteName: "Origin Coffee Cambodia",
    locale: "en_US",
    type: "website",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "OCC Mission",
  description:
    "The purpose and direction of Origin Coffee Cambodia.",
  url: `${siteUrl}/about/mission`,
  isPartOf: {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Origin Coffee Cambodia",
    description:
      "Cambodian coffee, Fine Robusta, Coffea canephora, processing, roasting, sensory evaluation, quality standards, and origin knowledge.",
  },
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "About", item: `${siteUrl}/about` },
    { "@type": "ListItem", position: 3, name: "Mission", item: `${siteUrl}/about/mission` },
  ],
}

const sections = [
  {
    title: "Vision",
    paragraphs: [
      "To make Cambodian coffee easier to understand, source, roast, and serve through clear origin, quality, and supply standards.",
    ],
  },
  {
    title: "Mission",
    paragraphs: [
      "OCC builds Cambodian coffee programs across origin, Fine Robusta, Coffea canephora, processing, roasting, sensory evaluation, quality standards, and professional supply.",
      "The aim is to connect better coffee with the people and businesses that source, roast, serve, distribute, and enjoy it.",
    ],
  },
  {
    title: "Why We Exist",
    paragraphs: [
      "Cambodian coffee has a growing identity, but its origin, quality, processing, and market potential are not always connected clearly.",
      "OCC exists to help build that connection — from Cambodian coffee origin to professional roasting, dependable supply, and a better final cup.",
    ],
  },
]

export default function MissionPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <AboutInstitutionalTemplate
        index="01"
        title="MISSION"
        subtitle="ORIGIN, QUALITY, AND WHY OCC EXISTS."
        lead={[
          "Better Cambodian coffee begins with a clearer connection to origin.",
          "OCC brings together Cambodian coffee, Fine Robusta, quality standards, professional roasting, and supply built for the market.",
        ]}
        sections={sections}
        next={{
          href: "/about/founder",
          label: "Founder",
          description: "The story behind OCC's Cambodia-first approach to coffee, quality, and supply.",
        }}
      />
    </>
  )
}
