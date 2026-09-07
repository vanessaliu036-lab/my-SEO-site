import { AboutInstitutionalTemplate } from "@/components/templates/about-institutional-template"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sustainability | Origin Coffee Cambodia - OCC",
  description:
    "OCC approaches sustainability and traceability through clear documentation, practical scope, and responsible Cambodian coffee supply.",
  keywords:
    "coffee sustainability, coffee traceability documentation, Cambodian coffee sustainability, Fine Robusta Cambodia, coffee sourcing, origin transparency",
  alternates: pageAlternates("/about/sustainability"),
  openGraph: {
    title: "Sustainability | Origin Coffee Cambodia - OCC",
    description:
      "Documentation, practical scope, and clear standards for sustainability and traceability in Cambodian coffee.",
    url: `${siteUrl}/about/sustainability`,
    siteName: "Origin Coffee Cambodia",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sustainability | Origin Coffee Cambodia - OCC",
    description:
      "How OCC approaches sustainability and traceability without overstating what a coffee origin or label can prove.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "OCC Sustainability — Evidence and Traceability Claims",
  description:
    "How Origin Coffee Cambodia approaches sustainability, traceability, and origin transparency through documentation and clear scope.",
  url: `${siteUrl}/about/sustainability`,
  isPartOf: {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Origin Coffee Cambodia",
  },
  mainEntity: {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Origin Coffee Cambodia",
    description:
      "Cambodian coffee, Fine Robusta, Coffea canephora, processing, roasting, sensory evaluation, quality standards, and origin knowledge.",
    knowsAbout: [
      "Coffee Sustainability Standards",
      "Coffee Traceability Documentation",
      "Origin Transparency",
      "Cambodian Coffee",
      "Fine Robusta",
      "Coffee Quality Standards",
    ],
  },
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "About", item: `${siteUrl}/about` },
    { "@type": "ListItem", position: 3, name: "Sustainability", item: `${siteUrl}/about/sustainability` },
  ],
}

const sections = [
  {
    title: "Clarity Before Labels",
    paragraphs: [
      "Terms such as sustainable, ethical, direct, regenerative, organic, shade-grown, and traceable can describe very different systems. OCC does not treat a label as a complete description by itself.",
      "A sustainability statement is more useful when its scope is specific: which practice it describes, which lot or partner it applies to, and when the information was recorded.",
    ],
  },
  {
    title: "Traceability as Documentation",
    paragraphs: [
      "Traceability is not one universal checklist. The useful question is what chain of custody or origin information is actually documented for a specific lot and which parts of that record can be independently checked.",
      "OCC distinguishes documented traceability from marketing language and avoids assuming that a country, region, producer group, or processing style automatically provides a complete record.",
    ],
  },
  {
    title: "Environmental Claims Need Context",
    paragraphs: [
      "Environmental performance depends on local conditions and management practices. Water use, shade, soil management, agrochemical use, energy, waste, and land-use pressure cannot be inferred reliably from a coffee species or origin name alone.",
      "Where information is limited, OCC keeps the statement narrow instead of assigning an environmental benefit that has not been demonstrated.",
    ],
  },
  {
    title: "What OCC Publishes",
    paragraphs: [
      "OCC's role is to document available information, compare definitions, keep standards current, and give partners a clearer basis for evaluating sustainability and traceability practices.",
      "That approach is deliberately narrower than claiming operational practices OCC cannot verify. Clear scope is part of responsible coffee supply.",
    ],
  },
]

export default function SustainabilityPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <AboutInstitutionalTemplate
        index="04"
        title="SUSTAINABILITY"
        subtitle="DOCUMENTATION, TRACEABILITY, AND RESPONSIBLE SUPPLY."
        lead={[
          "Responsible supply begins with clear documentation.",
          "OCC connects sustainability, traceability, and origin information to the practical work of building better Cambodian coffee supply.",
        ]}
        sections={sections}
        closing={[
          "Documentation before declaration.",
          "For Cambodian coffee and Fine Robusta in particular, clear scope is more useful than generic sustainability language.",
        ]}
        next={{
          href: "/solutions",
          label: "Solutions",
          description: "Explore OCC's published site sections.",
        }}
      />
    </>
  )
}
