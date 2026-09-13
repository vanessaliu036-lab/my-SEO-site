import { Metadata } from "next"
import { SolutionDetailTemplate } from "@/components/templates/solution-detail-template"
import { siteUrl, ogImage } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Wholesale Coffee Cambodia | B2B Sourcing | OCC",
  description:
    "B2B Cambodia coffee sourcing for professional buyers, with requirement definition, lot evaluation, documentation, sample discussion, and supply planning according to availability.",
  keywords:
    "wholesale coffee Cambodia, Cambodia coffee sourcing, Fine Robusta supplier, green coffee Cambodia, B2B coffee supply Cambodia, supplier due diligence",
  openGraph: {
    title: "Wholesale & Sourcing | Cambodia Coffee | OCC",
    description: "Start a Cambodia coffee sourcing conversation around intended use, available lots, evidence, samples, and workable commercial conditions.",
    url: `${siteUrl}/solutions/wholesale`,
    type: "website",
    images: [{ url: ogImage, width: 1200, height: 630, alt: "Wholesale & Sourcing — OCC" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wholesale & Sourcing | OCC",
    description: "Cambodia coffee sourcing for professional buyers, structured around requirements, evidence, availability, and sample discussion.",
  },
  alternates: pageAlternates("/solutions/wholesale"),
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do I need a final purchase order before contacting OCC?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. A buyer can begin with a sourcing requirement, intended use, target market, coffee format, quality direction, timing, or another commercial constraint. Availability and supply terms are then discussed against the actual project.",
      },
    },
    {
      "@type": "Question",
      name: "How should origin and traceability claims be evaluated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ask for information that can be checked against the coffee being evaluated. The available record may include origin, processing, lot or specification information, quality evaluation, and traceability evidence depending on the lot and sourcing pathway.",
      },
    },
    {
      "@type": "Question",
      name: "What happens after a sourcing requirement is defined?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The next step may include evaluating available coffee, reviewing relevant evidence, discussing samples, and defining supply planning or commercial terms. The sequence depends on the project and actual sourcing availability.",
      },
    },
  ],
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Solutions", item: `${siteUrl}/solutions` },
    { "@type": "ListItem", position: 3, name: "Wholesale & Sourcing", item: `${siteUrl}/solutions/wholesale` },
  ],
}

const internalLinks: Record<string, string> = {
  "Fine Robusta Cambodia": "/fine-robusta-cambodia",
  "roast development": "/solutions/roasting-program",
  "roasted coffee supply": "/solutions/roasted-coffee-supply",
  "origin evidence": "/original",
}

const renderWithLinks = (text: string) => {
  const patterns = Object.keys(internalLinks).sort((a, b) => b.length - a.length)
  let result = text
  patterns.forEach((keyword) => {
    const regex = new RegExp(`\\b${keyword}\\b`, "gi")
    result = result.replace(
      regex,
      (match) => `<a href="${internalLinks[keyword]}" class="border-b border-dashed border-gray-400 hover:border-gray-800 transition-colors">${match}</a>`,
    )
  })
  return <span dangerouslySetInnerHTML={{ __html: result }} />
}

export default function WholesalePage() {
  const relatedServices = [
    { title: "Roasted Coffee Supply", href: "/solutions/roasted-coffee-supply", desc: "Define a roasted-coffee requirement and supply pathway" },
    { title: "Roasting Program", href: "/solutions/roasting-program", desc: "Turn a product target into a structured roast-development brief" },
    { title: "Distribution Partnership", href: "/distribution", desc: "Discuss bringing Cambodian coffee into a market" },
  ]

  const sections = [
    {
      title: "Who This Is For",
      content: <p>OCC supports professional buyers evaluating Cambodia-origin coffee for cafés, hotels, restaurants, retail, roasting, import, distribution, and other B2B applications. You can begin before a final purchase order exists. Start with the market, intended use, coffee format, quality direction, timing, or another requirement that needs to be defined.</p>,
    },
    {
      title: "Start With the Requirement",
      content: <p>The useful first step is not pretending a fixed catalogue can answer every project. Define whether you are evaluating green coffee, {renderWithLinks("roasted coffee supply")}, Fine Robusta, a particular application, or another Cambodia coffee need. OCC can then separate what is known from what still needs to be confirmed.</p>,
    },
    {
      title: "Define and Verify",
      content: <p>Depending on the coffee and sourcing pathway, the discussion can cover origin information, processing information, lot or specification details, quality evaluation, traceability records, current availability, sample requirements, expected volume, delivery context, and commercial dependencies. {renderWithLinks("Origin evidence")} is evaluated according to available records rather than filled with assumptions.</p>,
    },
    {
      title: "From Evaluation to Supply Planning",
      content: <p>Once the relevant coffee and evidence are clear, the next step may be sample discussion, lot evaluation, specification alignment, or supply planning. Availability, capacity, pricing, logistics, and substitution terms are confirmed for the actual project before they are treated as operating facts. Where a product needs development, {renderWithLinks("roast development")} is handled as a separate technical pathway.</p>,
    },
    {
      title: "Cambodia and Fine Robusta",
      content: <p>OCC is built around Cambodia as the origin, with {renderWithLinks("Fine Robusta Cambodia")} as a core area of expertise. The sourcing conversation stays specific to the coffee being evaluated rather than assuming that every Cambodian coffee, process, or lot has the same profile or evidence set.</p>,
    },
  ]

  const faqs = [
    { q: "Do I need a final purchase order before contacting OCC?", a: <>No. A sourcing need, market, intended use, format, target, or timing is enough to begin defining the requirement.</> },
    { q: "How should origin and traceability claims be evaluated?", a: <>Against the records available for the coffee being discussed. The evidence scope may differ by lot and sourcing pathway.</> },
    { q: "What happens after the requirement is defined?", a: <>The project can move into coffee or lot evaluation, evidence review, sample discussion, and supply planning according to actual availability and commercial fit.</> },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SolutionDetailTemplate
        index="01"
        title="WHOLESALE & SOURCING"
        subtitle="Start with the buyer requirement. Then define the coffee, evidence, evaluation, sample path, and supply discussion that the actual project supports."
        sections={sections}
        factsTitle="What We Define"
        facts={[
          "Origin, market, and intended use",
          "Green or roasted coffee requirement",
          "Lot / specification and quality discussion",
          "Evidence and traceability scope",
          "Availability, sample, and supply planning",
        ]}
        faqs={faqs}
        relatedServices={relatedServices}
        ctaLabel="Start a Sourcing Conversation"
      />
    </>
  )
}
