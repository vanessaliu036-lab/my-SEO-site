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
      "That means treating coffee as a connected system. A strong origin story matters, but so do the details that allow a buyer, roaster, or café team to make a sound decision and repeat the result.",
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
      "For buyers, this creates a more useful conversation: not only where the coffee comes from, but how it fits a product, menu, roast profile, volume, and quality expectation.",
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

const featureGrid = [
  {
    label: "01 / Origin context",
    title: "Know what the coffee is.",
    body: "We connect origin, producer or lot context, processing, quality information, and availability so buyers can evaluate Cambodian coffee with the details that actually affect a decision.",
  },
  {
    label: "02 / Fine Robusta",
    title: "Evaluate more than a category.",
    body: "Fine Robusta is treated as a quality and application question—not a shortcut or a commodity label. The relevant test is how the coffee performs for the intended roast, brew, product, and buyer.",
  },
  {
    label: "03 / B2B capability",
    title: "Make the next step workable.",
    body: "Sourcing is only useful when it can move toward a repeatable coffee program. OCC brings together supply communication, quality expectations, roast development, and practical buyer support.",
  },
]

const closing = [
  "The mission is simple: make better Cambodian coffee decisions possible.",
  "For a roaster, café, hospitality team, importer, or other professional buyer, that starts with a clear view of origin and continues through quality, supply, and roasting. OCC's role is to make those connections easier to understand and easier to act on.",
]

const faqs = [
  {
    q: "What does Origin Coffee Cambodia do?",
    a: "OCC connects Cambodian coffee origins and Fine Robusta expertise with B2B coffee supply, quality-focused sourcing, and roasting solutions for professional buyers.",
  },
  {
    q: "Why does OCC focus on Fine Robusta?",
    a: "Fine Robusta is a core area of OCC's work. The focus is on understanding quality, processing, sensory character, roast fit, and practical use rather than treating Robusta as a one-dimensional commodity.",
  },
  {
    q: "How does OCC use research and evidence?",
    a: "Research helps clarify origin, processing, quality language, and what can be verified. OCC separates documented information from interpretation and flags details that still require confirmation.",
  },
  {
    q: "Who is the mission for?",
    a: "It is for roasters, cafés, hospitality teams, importers, and other professional buyers looking for clearer Cambodian coffee sourcing, wholesale supply, or roast development conversations.",
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
        featureGrid={featureGrid}
        practiceLabel="What OCC connects"
        practiceTitle="From context to a workable coffee program."
        closing={closing}
        faqs={faqs}
        next={{
          href: "/about/founder",
          label: "Founder",
          description: "The people and operating philosophy behind OCC's approach to Cambodian coffee supply, Fine Robusta, and professional coffee solutions.",
        }}
      />
    </>
  )
}
