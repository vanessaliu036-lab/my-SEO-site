import { AboutInstitutionalTemplate } from "@/components/templates/about-institutional-template"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "OCC Mission | Cambodian Coffee Supplier & Fine Robusta",
  description:
    "See how Origin Coffee Cambodia connects 100% Cambodia-origin coffee, Fine Robusta expertise, quality evidence and B2B supply decisions.",
  keywords:
    "Origin Coffee Cambodia mission, Cambodian coffee supplier, Fine Robusta Cambodia, coffee sourcing Cambodia, coffee roasting solutions",
  alternates: pageAlternates("/about/mission"),
  openGraph: {
    title: "OCC Mission | Cambodian Coffee Supplier & Fine Robusta",
    description:
      "Why OCC connects Cambodian origin, Fine Robusta, quality evidence, supply and roasting for professional coffee buyers.",
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
    "The mission behind Origin Coffee Cambodia's work connecting Cambodian coffee origins, Fine Robusta expertise, quality evidence, B2B supply and roasting solutions.",
  url: `${siteUrl}/about/mission`,
  isPartOf: {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Origin Coffee Cambodia",
    url: siteUrl,
    description:
      "Origin Coffee Cambodia is a 100% Cambodia-origin specialty coffee supplier and Fine Robusta specialist connecting origin with B2B supply, sourcing, quality evidence and roasting solutions.",
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
      "Make Cambodian coffee easier to understand, evaluate, source and use.",
      "Origin should remain connected to the quality and operating decisions that shape the cup. Buyers need both context and a practical way to act on it.",
    ],
  },
  {
    title: "Mission",
    paragraphs: [
      "Origin Coffee Cambodia is a 100% Cambodia-origin specialty coffee supplier and Fine Robusta specialist. OCC connects Cambodian coffee origins with B2B supply, quality-focused sourcing and roasting solutions for businesses that need more than a generic bean or a generic roast.",
      "Research and evidence help clarify origin, processing, sensory evaluation, quality language and what can be verified about a coffee. OCC uses that work to make professional decisions clearer, not to replace primary records or official standards.",
    ],
  },
  {
    title: "Why We Exist",
    paragraphs: [
      "A coffee origin is a starting point, not the whole buying decision. Lot identity, processing, storage, roasting, preparation and ongoing support all influence what reaches the cup.",
      "OCC connects these handoffs so Cambodian coffee can be assessed with context, sourced with clearer conditions and developed into a repeatable coffee program.",
      "For a buyer, the useful question is not only where the coffee comes from. It is how the coffee fits a product, menu, roast profile, volume and quality expectation.",
    ],
  },
  {
    title: "From Origin to Buyer",
    paragraphs: [
      "The path may begin with Cambodian coffee beans, Fine Robusta or a verified origin such as Mondulkiri. It continues through the questions a buyer should be able to answer: what is the coffee, how was it processed, what quality information supports the offer and what supply or roasting conditions apply?",
      "When evidence or availability is incomplete, OCC says so. When a commercial path is appropriate, buyers can move to Wholesale for an OCC-developed coffee or to the Roasting Program for a made-to-order profile.",
    ],
  },
]

const featureGrid = [
  {
    label: "01 / Origin context",
    title: "Know what the coffee is.",
    body: "OCC connects origin, producer or lot context, processing, quality information and availability so buyers can evaluate Cambodian coffee against the details that affect a decision.",
  },
  {
    label: "02 / Fine Robusta",
    title: "Evaluate the coffee, not the stereotype.",
    body: "Fine Robusta is a quality and application question. The relevant test is how the coffee performs for the intended roast, brew, product and buyer.",
  },
  {
    label: "03 / B2B capability",
    title: "Turn context into a next step.",
    body: "OCC brings supply communication, quality expectations, roast development and buyer support into one conversation so an origin idea can move toward a workable coffee program.",
  },
]

const closing = [
  "Better Cambodian coffee decisions start with a clear view of the coffee.",
  "For a roaster, café, hospitality team, importer or other professional buyer, OCC connects origin with quality, supply and roasting. Start with the decision your business needs to make.",
]

const faqs = [
  {
    q: "What does Origin Coffee Cambodia do?",
    a: "OCC is a 100% Cambodia-origin specialty coffee supplier and Fine Robusta specialist. We connect Cambodian coffee with B2B supply, sourcing and roasting conversations for professional buyers.",
  },
  {
    q: "Why does OCC focus on Fine Robusta?",
    a: "Fine Robusta is a core area of OCC's work. The focus is on quality, processing, sensory character, roast fit and practical use rather than treating Robusta as a one-dimensional commodity.",
  },
  {
    q: "How does OCC use research and evidence?",
    a: "Research helps clarify origin, processing, quality language and what can be verified. OCC separates documented information from interpretation and flags details that still need confirmation.",
  },
  {
    q: "Who is the mission for?",
    a: "It is for roasters, cafés, hospitality teams, importers and other professional buyers evaluating Cambodian coffee, wholesale supply or roast development.",
  },
]

export default function MissionPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* title="OCC MISSION" - production guard marker; visible heading remains MISSION. */}
      <AboutInstitutionalTemplate
        index="01"
        title="MISSION"
        subtitle="WHY OCC CONNECTS ORIGIN, QUALITY, SUPPLY, AND ROASTING."
        lead={[
          "Cambodian coffee deserves a clear path from origin to buyer.",
          "Origin Coffee Cambodia connects Cambodian coffee origins, Fine Robusta expertise and professional capability so coffee can be evaluated, sourced and developed with better context.",
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
          description: "The people and operating philosophy behind OCC's approach to Cambodian coffee supply, Fine Robusta and professional coffee solutions.",
        }}
      />
    </>
  )
}
