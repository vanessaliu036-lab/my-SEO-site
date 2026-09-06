import { AboutInstitutionalTemplate } from "@/components/templates/about-institutional-template"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sustainability | Origin Coffee Cambodia - OCC",
  description:
    "How OCC approaches sustainability and traceability in Cambodian coffee sourcing and supply: document claims, verify scope, and separate evidence from assumptions.",
  keywords:
    "sustainable coffee sourcing Cambodia, coffee traceability documentation, Cambodian coffee sustainability, Fine Robusta traceability, coffee sourcing claims, origin transparency evidence",
  alternates: pageAlternates("/about/sustainability"),
  openGraph: {
    title: "Sustainability | Origin Coffee Cambodia - OCC",
    description:
      "Evidence, documentation, and claim boundaries for sustainability and traceability in Cambodian coffee sourcing and supply.",
    url: `${siteUrl}/about/sustainability`,
    siteName: "Origin Coffee Cambodia",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sustainability | Origin Coffee Cambodia - OCC",
    description:
      "How OCC evaluates sustainability and traceability claims within sourcing, quality, and coffee-supply decisions.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "OCC Sustainability — Sourcing, Evidence and Traceability",
  description:
    "How Origin Coffee Cambodia applies sustainability, traceability, and origin-transparency evidence to coffee sourcing, quality, and supply decisions.",
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
      "Cambodia specialty coffee company focused on Fine Robusta, B2B coffee sourcing and supply, roasting solutions, traceability, origin transparency, and quality standards.",
    knowsAbout: [
      "Coffee Sustainability Evidence",
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
    title: "Evidence Before Labels",
    paragraphs: [
      "Terms such as sustainable, ethical, direct, regenerative, organic, shade-grown, and traceable can describe very different systems. OCC does not treat a label as proof by itself.",
      "A sustainability claim is stronger when the underlying evidence is specific: who recorded it, what was measured or documented, which lot or farm it applies to, and when the observation was made.",
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
      "Where public evidence is limited, OCC reports the limitation instead of assigning an environmental benefit that has not been demonstrated.",
    ],
  },
  {
    title: "How OCC Applies This",
    paragraphs: [
      "OCC uses sustainability and traceability evidence to support sourcing, lot evaluation, quality communication, and B2B coffee-supply decisions. Documentation is attached to the claim it can actually verify rather than treated as a general marketing label.",
      "Where a practice, certification, farm-level outcome, or supply-chain claim cannot yet be verified, OCC keeps that boundary explicit. Evidence-led content supports the coffee business; it does not define OCC as a research organization.",
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
        subtitle="EVIDENCE, TRACEABILITY, AND CLAIM BOUNDARIES."
        lead={[
          "A sustainability claim is only as useful as the evidence behind it.",
          "OCC separates documented practice from assumption and treats missing evidence as a boundary, not a blank to fill.",
        ]}
        sections={sections}
        closing={[
          "Documentation before declaration.",
          "For emerging origins and Fine Robusta in particular, careful claim boundaries are more useful than generic sustainability language.",
        ]}
        next={{
          href: "/solutions",
          label: "Solutions",
          description: "Explore OCC's coffee supply, roasting, and B2B solution pathways.",
        }}
      />
    </>
  )
}
