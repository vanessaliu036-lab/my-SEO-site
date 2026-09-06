import { AboutInstitutionalTemplate } from "@/components/templates/about-institutional-template"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "OCC Mission | Cambodian Coffee Supply & Fine Robusta",
  description:
    "Learn why Origin Coffee Cambodia connects Cambodian coffee origins and Fine Robusta expertise with B2B supply, quality systems, and roasting solutions.",
  keywords:
    "Origin Coffee Cambodia mission, Cambodian coffee supplier, Fine Robusta Cambodia, coffee sourcing Cambodia, coffee roasting solutions",
  alternates: pageAlternates("/about/mission"),
  openGraph: {
    title: "OCC Mission | Cambodian Coffee Supply & Fine Robusta",
    description:
      "Why Origin Coffee Cambodia connects Cambodian coffee origins, Fine Robusta expertise, B2B supply, quality systems, and roasting solutions.",
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
    "The mission behind Origin Coffee Cambodia's work connecting Cambodian coffee origins, Fine Robusta expertise, B2B supply, quality systems, and roasting solutions.",
  url: `${siteUrl}/about/mission`,
  isPartOf: {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Origin Coffee Cambodia",
    url: siteUrl,
    description:
      "Origin Coffee Cambodia is a Cambodia-based specialty coffee supplier and Fine Robusta specialist connecting Cambodian coffee origins with B2B coffee supply, sourcing, quality systems, and roasting solutions.",
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
      "To make Cambodian coffee easier to understand, evaluate, source, and use—without separating origin from the quality and operational decisions that shape the cup.",
    ],
  },
  {
    title: "Mission",
    paragraphs: [
      "Origin Coffee Cambodia is a Cambodia specialty coffee supplier and Fine Robusta specialist. We connect Cambodian coffee origins with B2B coffee supply, quality-focused sourcing, and roasting solutions for businesses that need more than a generic bean or a generic roast.",
      "Research supports this work by clarifying origin, processing, sensory evaluation, quality standards, and what can be verified about a coffee. It is not a substitute for official standards or primary evidence; it is how OCC turns fragmented information into clearer professional decisions.",
    ],
  },
  {
    title: "Why We Exist",
    paragraphs: [
      "A coffee's origin matters, but origin alone does not determine the result. Sourcing, lot identity, processing, storage, roasting, preparation, and ongoing support all influence what reaches the cup.",
      "In Cambodia, these handoffs are often discussed separately. OCC exists to connect them—so Cambodian coffee can be assessed with context, sourced with clearer conditions, and developed into a repeatable coffee program.",
    ],
  },
  {
    title: "From Origin to Buyer",
    paragraphs: [
      "That path may begin with Cambodian coffee beans, Fine Robusta, or a verified origin such as Mondulkiri. It continues through the questions a buyer should be able to answer: what is the coffee, how was it processed, what quality information supports the offer, and what supply or roasting conditions apply?",
      "Where evidence or availability is incomplete, OCC says so. Where a commercial path is appropriate, we guide buyers toward sourcing, wholesale supply, or roast development without presenting unverified inventory, capacity, or claims as facts.",
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
        subtitle="WHY OCC CONNECTS ORIGIN, QUALITY, SUPPLY, AND ROASTING."
        lead={[
          "Better coffee decisions start with better context.",
          "Origin Coffee Cambodia connects Cambodian coffee origins, Fine Robusta expertise, and professional capability so coffee can move from origin to buyer with greater clarity.",
        ]}
        sections={sections}
        next={{
          href: "/about/founder",
          label: "Founder",
          description: "The people and operating philosophy behind OCC's approach to Cambodian coffee supply, Fine Robusta, and professional coffee solutions.",
        }}
      />
    </>
  )
}
