import { Metadata } from "next"
import { SolutionDetailTemplate } from "@/components/templates/solution-detail-template"
import { siteUrl, ogImage } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Wholesale Coffee Cambodia | OCC B2B Sourcing & Supply Framework",
  description:
    "Evidence-led guidance for cafés, hotels, restaurants, and buyers evaluating wholesale coffee in Cambodia, including quality, origin documentation, volume planning, and supplier due diligence.",
  keywords:
    "wholesale coffee Cambodia, coffee supplier Phnom Penh, B2B coffee supply Cambodia, café coffee wholesale, restaurant coffee supplier, coffee sourcing Cambodia, supplier due diligence",
  openGraph: {
    title: "Wholesale Coffee Cambodia | OCC",
    description: "A buyer-focused framework for evaluating quality, documentation, volume, and supply readiness in Cambodia.",
    url: `${siteUrl}/solutions/wholesale`,
    type: "website",
    images: [{ url: ogImage, width: 1200, height: 630, alt: "Wholesale Coffee Cambodia — OCC" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wholesale Coffee Cambodia | OCC",
    description: "A buyer-focused framework for evaluating quality, documentation, volume, and supply readiness in Cambodia.",
  },
  alternates: pageAlternates("/solutions/wholesale"),
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What should a wholesale coffee buyer define before contacting suppliers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Define expected monthly volume, green or roasted format, target cup profile, delivery locations, documentation requirements, and the sampling process you will use to approve a lot.",
      },
    },
    {
      "@type": "Question",
      name: "How should origin and traceability claims be evaluated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ask for documentation that can be checked against the lot being offered, including origin, processing, harvest or production timing where available, and the chain of custody relevant to the transaction.",
      },
    },
    {
      "@type": "Question",
      name: "What should a wholesale supply agreement clarify?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A commercial agreement should clarify specifications, approved samples, lot substitution rules, volume, pricing basis, delivery responsibilities, quality acceptance, and what happens when supply conditions change.",
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
    { "@type": "ListItem", position: 3, name: "Wholesale", item: `${siteUrl}/solutions/wholesale` },
  ],
}

const internalLinks: Record<string, string> = {
  "roast development": "/solutions/roasting-program",
  staffing: "/solutions/barista-staffing",
  equipment: "/solutions/equipment-service",
  cupping: "/coffee/single-origin",
}

const renderWithLinks = (text: string) => {
  const patterns = Object.keys(internalLinks).sort((a, b) => b.length - a.length)
  let result = text
  patterns.forEach((keyword) => {
    const regex = new RegExp(`\\b${keyword}\\b`, "gi")
    result = result.replace(
      regex,
      (match) =>
        `<a href="${internalLinks[keyword]}" class="border-b border-dashed border-gray-400 hover:border-gray-800 transition-colors">${match}</a>`,
    )
  })
  return <span dangerouslySetInnerHTML={{ __html: result }} />
}

export default function WholesalePage() {
  const relatedServices = [
    { title: "Roasting Program", href: "/solutions/roasting-program", desc: "Roast development and production-readiness framework" },
    { title: "Barista Staffing", href: "/solutions/barista-staffing", desc: "Hiring, training, and placement due diligence" },
    { title: "Equipment Service", href: "/solutions/equipment-service", desc: "Maintenance and service-vendor evaluation" },
  ]

  const sections = [
    {
      title: "Who This Is For",
      content: <p>This page is for cafés, hotels, restaurants, offices, importers, and multi-location operators evaluating wholesale coffee in Cambodia. The objective is to define the evidence a buyer should require before treating any supplier, lot, price, volume, or delivery schedule as commercially ready.</p>,
    },
    {
      title: "What to Evaluate",
      content: <p>Start with coffee format, target cup profile, sample approval, lot identity, documentation, expected volume, storage, and delivery feasibility. If roasted coffee is required, evaluate {renderWithLinks("roast development")} separately from green-coffee sourcing so quality and production assumptions do not get mixed together.</p>,
    },
    {
      title: "Evidence Standard",
      content: <p>Origin, processing, quality, availability, and logistics should be supported by documentation that matches the coffee actually being evaluated. Sensory claims should be checked through a defined {renderWithLinks("cupping")} process, while operational claims should be verified with the responsible supplier or service provider before contracting.</p>,
    },
    {
      title: "Commercial Readiness",
      content: <p>Before committing, confirm the approved sample, current lot, specification, substitution policy, volume basis, price basis, delivery responsibility, quality-acceptance process, and any dependencies involving {renderWithLinks("equipment")} or {renderWithLinks("staffing")}. OCC does not present unverified inventory, capacity, or logistics assumptions as current operating facts.</p>,
    },
  ]

  const faqs = [
    { q: "What should a wholesale coffee buyer define before contacting suppliers?", a: <>Define expected volume, green or roasted format, target cup profile, delivery locations, documentation requirements, and a sample-approval process.</> },
    { q: "How should origin and traceability claims be evaluated?", a: <>Ask for documentation that can be checked against the specific lot being offered, rather than relying on broad origin language alone.</> },
    { q: "What should a wholesale supply agreement clarify?", a: <>Clarify specifications, approved samples, substitution rules, volume, pricing basis, delivery responsibilities, quality acceptance, and change management.</> },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SolutionDetailTemplate
        index="01"
        title="WHOLESALE"
        subtitle="Define the coffee, evidence, and supply conditions before treating an offer as commercially ready."
        sections={sections}
        factsTitle="Buyer Checklist"
        facts={[
          "Coffee format and target cup profile",
          "Approved sample and lot identity",
          "Origin and processing documentation",
          "Volume, storage, and delivery assumptions",
          "Quality acceptance and substitution rules",
        ]}
        faqs={faqs}
        relatedServices={relatedServices}
        ctaLabel="Discuss your requirements"
      />
    </>
  )
}
