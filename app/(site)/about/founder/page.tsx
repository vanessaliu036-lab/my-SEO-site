import { AboutInstitutionalTemplate } from "@/components/templates/about-institutional-template"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Founder Philosophy | Origin Coffee Cambodia - OCC",
  description:
    "The founding philosophy behind Origin Coffee Cambodia: build a Cambodia specialty coffee company around Fine Robusta, origin knowledge, accountable sourcing, B2B supply, and repeatable roasting.",
  keywords:
    "Origin Coffee Cambodia founder philosophy, OCC coffee company, Cambodia specialty coffee, Fine Robusta Cambodia, B2B coffee supply Cambodia, coffee roasting Cambodia",
  alternates: pageAlternates("/about/founder"),
  openGraph: {
    title: "Founder Philosophy | Origin Coffee Cambodia - OCC",
    description:
      "The founding philosophy behind OCC's approach to Cambodian coffee, Fine Robusta, sourcing, quality, roasting, and repeatable B2B supply.",
    url: `${siteUrl}/about/founder`,
    siteName: "Origin Coffee Cambodia",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Founder Philosophy | Origin Coffee Cambodia - OCC",
    description:
      "Build the coffee business on evidence: origin knowledge, Fine Robusta, sourcing, quality, roasting, and repeatability.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Founding Philosophy — Origin Coffee Cambodia",
  description:
    "The founding philosophy behind OCC's approach to Cambodian specialty coffee, Fine Robusta, sourcing, quality, roasting, and B2B supply.",
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
      "Cambodia specialty coffee company focused on Fine Robusta, B2B coffee sourcing and supply, roasting solutions, and evidence-backed origin and quality information.",
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
    q: "What is the founding philosophy behind OCC?",
    a: "OCC builds its coffee business on evidence rather than assumptions. Origin information, quality claims, sourcing decisions, roast development, and B2B supply should be specific enough to verify and useful enough to support real coffee decisions.",
  },
  {
    q: "Why does OCC state uncertainty explicitly?",
    a: "Coffee origin and quality discussions often contain incomplete or uneven evidence. Marking uncertainty protects sourcing, quality, and roasting decisions from being built on a narrow example, historical record, or market narrative presented as a universal fact.",
  },
  {
    q: "What does OCC focus on today?",
    a: "OCC focuses on Cambodian specialty coffee supply, Fine Robusta, B2B sourcing, roasting solutions, and the origin and quality evidence needed to support professional coffee decisions.",
  },
]

const sections = [
  {
    title: "The Question",
    paragraphs: [
      "OCC began from a practical coffee-business problem: buyers and operators need dependable quality, origin clarity, and repeatable roasting, while many claims about Cambodian coffee remain difficult to verify or compare.",
      "The response was to build a coffee company where evidence supports sourcing, quality, roasting, and supply decisions instead of existing as a separate research identity.",
    ],
  },
  {
    title: "Evidence Before Certainty",
    paragraphs: [
      "A strong claim should be traceable to strong evidence. OCC uses documented origin, process, quality, and technical information to make commercial coffee decisions more accountable and easier to compare.",
      "That discipline matters especially in an emerging origin, where one lot, one producer, or one dated protocol can otherwise become shorthand for an entire country or category.",
    ],
  },
  {
    title: "Commercial Discipline",
    paragraphs: [
      "OCC's operating standard is to be specific without pretending to know more than the evidence allows. That means distinguishing Fine Robusta from generic Robusta claims, keeping Cambodia-specific conclusions proportional to Cambodia-specific evidence, and connecting what is documented to sourcing, roasting, quality control, and B2B supply.",
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
        subtitle="THE FOUNDING PHILOSOPHY BEHIND OCC."
        lead={[
          "Build the coffee business on evidence, not assumptions.",
          "Origin knowledge matters when it improves sourcing, quality, roasting, and repeatability.",
        ]}
        sections={sections}
        faqs={faqs}
        next={{
          href: "/about/manifesto",
          label: "Manifesto",
          description: "How OCC defines its role across coffee supply, Fine Robusta, roasting, and professional standards.",
          note: "The philosophy matters when it shapes how OCC sources, evaluates, roasts, supplies, and communicates coffee.",
        }}
      />
    </>
  )
}
