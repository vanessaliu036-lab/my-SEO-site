import { AboutInstitutionalTemplate } from "@/components/templates/about-institutional-template"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mission | Origin Coffee Cambodia - OCC",
  description:
    "OCC exists to make Cambodian coffee easier to understand through research, evidence-led technical editorial, and clear documentation of quality, processing, and origin questions.",
  keywords:
    "Origin Coffee Cambodia mission, Cambodian coffee research, Fine Robusta research, coffee quality evidence, coffee processing research, OCC editorial mission",
  alternates: pageAlternates("/about/mission"),
  openGraph: {
    title: "Mission | Origin Coffee Cambodia - OCC",
    description:
      "The research scope and editorial purpose behind OCC's work on Cambodian coffee, Fine Robusta, quality, processing, and origin evidence.",
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
    "The research scope and editorial purpose of Origin Coffee Cambodia.",
  url: `${siteUrl}/about/mission`,
  isPartOf: {
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
    { "@type": "ListItem", position: 3, name: "Mission", item: `${siteUrl}/about/mission` },
  ],
}

const sections = [
  {
    title: "Vision",
    paragraphs: [
      "To make Cambodian coffee easier to evaluate, discuss, and understand through evidence rather than repetition or unsupported category claims.",
    ],
  },
  {
    title: "Mission",
    paragraphs: [
      "OCC publishes research and technical editorial on Cambodian coffee, Fine Robusta, Coffea canephora, processing, roasting, sensory evaluation, quality standards, and origin systems.",
      "The aim is not to replace primary research or official standards. It is to connect available evidence, identify what is known, separate historical frameworks from current ones, and state clearly where evidence is still incomplete.",
    ],
  },
  {
    title: "Why We Exist",
    paragraphs: [
      "Cambodian coffee is often described with broad claims that are difficult to verify. Quality language, origin narratives, processing terminology, and market assumptions can move faster than the evidence behind them.",
      "OCC exists to document those questions carefully. When evidence is strong, we cite it. When evidence is limited, we mark the boundary instead of converting uncertainty into certainty.",
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
        subtitle="RESEARCH SCOPE, EDITORIAL PURPOSE, AND WHY OCC EXISTS."
        lead={[
          "Evidence first. Claims second.",
          "OCC is built to make Cambodian coffee easier to understand without overstating what the available evidence can support.",
        ]}
        sections={sections}
        next={{
          href: "/about/founder",
          label: "Founder",
          description: "The editorial philosophy behind OCC's evidence-led approach.",
        }}
      />
    </>
  )
}
