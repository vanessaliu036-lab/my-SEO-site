import { AboutInstitutionalTemplate } from "@/components/templates/about-institutional-template"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sustainability | Origin Coffee Cambodia - OCC",
  description:
    "OCC treats sustainability and traceability as evidence questions: claims should be documented, scoped, dated when necessary, and separated from assumptions about farms, regions, or supply chains.",
  keywords:
    "coffee sustainability evidence, coffee traceability documentation, Cambodian coffee sustainability, Fine Robusta sustainability research, coffee sourcing claims, origin transparency evidence",
  alternates: pageAlternates("/about/sustainability"),
  openGraph: {
    title: "Sustainability | Origin Coffee Cambodia - OCC",
    description:
      "Evidence, documentation, and claim boundaries for sustainability and traceability in Cambodian coffee research.",
    url: `${siteUrl}/about/sustainability`,
    siteName: "Origin Coffee Cambodia",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sustainability | Origin Coffee Cambodia - OCC",
    description:
      "How OCC evaluates sustainability and traceability claims without turning incomplete evidence into certainty.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "OCC Sustainability — Evidence and Traceability Claims",
  description:
    "How Origin Coffee Cambodia evaluates sustainability, traceability, and origin-transparency claims through evidence and documentation.",
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
      "Independent coffee information and research platform focused on Cambodian coffee, Fine Robusta, Coffea canephora, processing, roasting, sensory evaluation, quality standards, and origin research.",
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
    title: "What OCC Publishes",
    paragraphs: [
      "OCC's role is to document available evidence, compare definitions, date standards and institutional frameworks, identify research gaps, and give readers a clearer basis for evaluating sustainability and traceability claims.",
      "That approach is deliberately narrower than claiming operational practices OCC cannot publicly verify. The boundary is part of the research standard.",
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
          description: "Explore OCC's published site sections.",
        }}
      />
    </>
  )
}
