import { AboutInstitutionalTemplate } from "@/components/templates/about-institutional-template"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Founder Philosophy | Origin Coffee Cambodia - OCC",
  description:
    "The founding editorial philosophy behind OCC: research before repetition, evidence before certainty, and clear boundaries between what is documented and what is still unknown.",
  keywords:
    "OCC editorial philosophy, Cambodian coffee research philosophy, evidence-led coffee research, Fine Robusta evidence, origin research methodology",
  alternates: pageAlternates("/about/founder"),
  openGraph: {
    title: "Founder Philosophy | Origin Coffee Cambodia - OCC",
    description:
      "The editorial philosophy behind OCC's evidence-led approach to Cambodian coffee, Fine Robusta, processing, quality, and origin research.",
    url: `${siteUrl}/about/founder`,
    siteName: "Origin Coffee Cambodia",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Founder Philosophy | Origin Coffee Cambodia - OCC",
    description:
      "Research before repetition. Evidence before certainty. Clear boundaries around what the evidence can support.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Founding Editorial Philosophy — Origin Coffee Cambodia",
  description:
    "The editorial philosophy behind OCC's evidence-led approach to Cambodian coffee research.",
  url: `${siteUrl}/about/founder`,
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
  },
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "About", item: `${siteUrl}/about` },
    { "@type": "ListItem", position: 3, name: "Founder", item: `${siteUrl}/about/founder` },
  ],
}

const faqs = [
  {
    q: "What is the editorial philosophy behind OCC?",
    a: "OCC starts with evidence rather than a preferred conclusion. Research pages distinguish documented facts, historical frameworks, current standards, interpretation, and unresolved questions so readers can see where each statement comes from.",
  },
  {
    q: "Why does OCC state uncertainty explicitly?",
    a: "Coffee origin and quality discussions often contain incomplete or uneven evidence. Marking uncertainty prevents a narrow example, historical record, or market narrative from being presented as a universal fact.",
  },
  {
    q: "What does OCC focus on today?",
    a: "OCC focuses on research and technical editorial about Cambodian coffee, Fine Robusta, Coffea canephora, processing, roasting, sensory evaluation, quality standards, and origin evidence.",
  },
]

const sections = [
  {
    title: "The Question",
    paragraphs: [
      "OCC began from a simple editorial problem: many statements about Cambodian coffee sounded precise even when the evidence underneath them was thin, historical, or difficult to verify.",
      "The response was to build a research platform that separates observation from inference and current evidence from inherited industry language.",
    ],
  },
  {
    title: "Evidence Before Certainty",
    paragraphs: [
      "A strong claim should be traceable to strong evidence. A useful research page should also show what would change the conclusion, where the source is limited, and whether a framework is historical or current.",
      "That discipline matters especially in emerging-origin coverage, where one lot, one producer, or one dated protocol can otherwise become shorthand for an entire country or category.",
    ],
  },
  {
    title: "Editorial Discipline",
    paragraphs: [
      "OCC's editorial standard is to be specific without pretending to know more than the evidence allows. That means correcting outdated language, distinguishing Fine Robusta from generic Robusta claims, and keeping Cambodia-specific conclusions proportional to Cambodia-specific evidence.",
    ],
  },
]

export default function FounderPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <AboutInstitutionalTemplate
        index="02"
        title="FOUNDER"
        subtitle="THE EDITORIAL PHILOSOPHY BEHIND OCC."
        lead={[
          "Research before repetition. Evidence before certainty.",
          "The point is not to make every claim sound stronger. It is to make each claim easier to verify.",
        ]}
        sections={sections}
        faqs={faqs}
        next={{
          href: "/about/manifesto",
          label: "Manifesto",
          description: "Why OCC prioritizes evidence, precision, and transparent uncertainty.",
          note: "The philosophy becomes useful only when it changes how the work is published.",
        }}
      />
    </>
  )
}
