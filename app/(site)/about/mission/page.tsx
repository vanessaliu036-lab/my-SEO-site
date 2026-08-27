import { AboutInstitutionalTemplate } from "@/components/templates/about-institutional-template"
import { siteDescription, siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mission | Origin Coffee Cambodia - OCC",
  description:
    "OCC is an independent coffee information and research platform. Its mission is to publish evidence-led work on Cambodian coffee, Fine Robusta, Coffea canephora, processing, roasting, sensory evaluation, and standards.",
  keywords:
    "Cambodia coffee research mission, Fine Robusta research, Coffea canephora Cambodia, coffee quality standards, coffee education Cambodia",
  alternates: pageAlternates("/about/mission"),
  openGraph: {
    title: "Mission | Origin Coffee Cambodia - OCC",
    description:
      "Why OCC exists: to make Cambodian coffee knowledge clearer, better sourced, and more useful without turning editorial work into promotion.",
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
    "The research and editorial mission of Origin Coffee Cambodia, an independent coffee information and research platform.",
  url: `${siteUrl}/about/mission`,
  isPartOf: {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: "Origin Coffee Cambodia",
    url: siteUrl,
    description: siteDescription,
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
      "To make Cambodian coffee easier to study, verify, and understand through clear evidence, transparent sourcing of information, and careful interpretation of what the available data can and cannot show.",
    ],
  },
  {
    title: "Mission",
    paragraphs: [
      "OCC publishes evidence-led research and educational material on Cambodian coffee, Fine Robusta, Coffea canephora, processing, roasting, brewing, sensory evaluation, quality standards, origin systems, and related industry questions.",
      "The aim is not to turn every topic into a commercial recommendation. The aim is to separate observation from inference, distinguish standards from marketing language, and give readers enough context to evaluate a claim for themselves.",
    ],
  },
  {
    title: "Why We Exist",
    paragraphs: [
      "Information about Cambodian coffee is fragmented. Local production figures are often repeated without dates or geographic scope. Canephora is frequently described through assumptions borrowed from commodity coffee or Arabica. Processing, climate, genetics, roasting, and sensory claims are often presented without enough method or limitation.",
      "OCC exists to close that information gap. When evidence is strong, we explain it. When evidence is limited, we say so. When a question remains unresolved, we treat it as a research question rather than filling the gap with promotion.",
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
        subtitle="WHY OCC PUBLISHES COFFEE RESEARCH."
        lead={[
          "Evidence before assumption.",
          "Context before certainty. OCC exists to make Cambodian coffee knowledge more useful by making the basis of each claim easier to see.",
        ]}
        sections={sections}
        next={{
          href: "/about/founder",
          label: "Founder",
          description: "The editorial philosophy behind OCC.",
        }}
      />
    </>
  )
}
