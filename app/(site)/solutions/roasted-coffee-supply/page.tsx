import type { Metadata } from "next"
import { SolutionDetailTemplate } from "@/components/templates/solution-detail-template"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Roasted Coffee Supply Cambodia | B2B Coffee | OCC",
  description:
    "Define a roasted coffee supply requirement with OCC for cafés, hotels, retailers, hospitality groups, and coffee programs using Cambodia-origin coffee.",
  alternates: pageAlternates("/solutions/roasted-coffee-supply"),
  openGraph: {
    title: "Roasted Coffee Supply | Origin Coffee Cambodia",
    description: "A requirements-led pathway for businesses evaluating recurring roasted coffee supply from Cambodia.",
    url: `${siteUrl}/solutions/roasted-coffee-supply`,
    type: "website",
  },
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Solutions", item: `${siteUrl}/solutions` },
    { "@type": "ListItem", position: 3, name: "Roasted Coffee Supply", item: `${siteUrl}/solutions/roasted-coffee-supply` },
  ],
}

const webpageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Roasted Coffee Supply Cambodia",
  url: `${siteUrl}/solutions/roasted-coffee-supply`,
  about: {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Origin Coffee Cambodia",
  },
}

const internalLinks: Record<string, string> = {
  "Wholesale & Sourcing": "/solutions/wholesale",
  "Roasting Program": "/solutions/roasting-program",
  "Fine Robusta Cambodia": "/fine-robusta-cambodia",
  "origin evidence": "/original",
}

const renderWithLinks = (text: string) => {
  const patterns = Object.keys(internalLinks).sort((a, b) => b.length - a.length)
  let result = text
  patterns.forEach((keyword) => {
    result = result.replace(
      new RegExp(`\\b${keyword}\\b`, "gi"),
      (match) => `<a href="${internalLinks[keyword]}" class="border-b border-dashed border-gray-400 hover:border-gray-800 transition-colors">${match}</a>`,
    )
  })
  return <span dangerouslySetInnerHTML={{ __html: result }} />
}

export default function RoastedCoffeeSupplyPage() {
  const sections = [
    {
      title: "Who This Is For",
      content: <p>This pathway is for cafés, hotels, restaurants, retailers, offices, hospitality groups, and other businesses evaluating a recurring roasted-coffee requirement. The conversation begins with the operating need rather than a fixed catalogue or an assumed stock position.</p>,
    },
    {
      title: "Define the Coffee Requirement",
      content: <p>Share the intended use, brewing context, target market, preferred coffee direction, approximate requirement, packaging context, and timing. If the project begins with green coffee or lot sourcing instead, continue through {renderWithLinks("Wholesale & Sourcing")}.</p>,
    },
    {
      title: "Coffee, Profile and Evidence",
      content: <p>Where an appropriate coffee is available, OCC can discuss the coffee identity, relevant {renderWithLinks("origin evidence")}, sensory direction, roast application, and what needs to be evaluated before a recurring supply arrangement is treated as ready. Cambodia and {renderWithLinks("Fine Robusta Cambodia")} remain central to OCC&apos;s origin positioning.</p>,
    },
    {
      title: "When Development Is Needed",
      content: <p>If a buyer needs a house profile, branded product, or application-specific roast rather than an existing suitable direction, the project can move into the {renderWithLinks("Roasting Program")} before recurring production assumptions are confirmed.</p>,
    },
    {
      title: "Commercial Discussion",
      content: <p>Availability, production capacity, packaging, minimums, pricing, delivery, lead time, and recurring-order terms depend on the actual coffee and project. OCC confirms those variables during the commercial discussion rather than publishing universal promises before the requirement is known.</p>,
    },
  ]

  const faqs = [
    { q: "Can I contact OCC before I know the exact coffee specification?", a: <>Yes. Intended use, market, brewing context, product direction, timing, or an existing problem is enough to start defining the requirement.</> },
    { q: "Does this page mean a fixed roasted-coffee inventory is always available?", a: <>No. Coffee, production, packaging, capacity, and availability are confirmed against the actual project before commercial commitments are made.</> },
    { q: "What if I need a custom roast profile?", a: <>Use the Roasting Program when the product direction needs structured development and evaluation before recurring supply is discussed.</> },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SolutionDetailTemplate
        index="02"
        title="ROASTED COFFEE SUPPLY"
        subtitle="Define the operating requirement first, then confirm the coffee, profile, evidence, production assumptions, and commercial supply path the project can support."
        sections={sections}
        factsTitle="Supply Discussion"
        facts={[
          "Intended use and brewing context",
          "Coffee and sensory direction",
          "Approximate requirement and timing",
          "Packaging and production context",
          "Availability and commercial terms",
        ]}
        faqs={faqs}
        relatedServices={[
          { title: "Wholesale & Sourcing", href: "/solutions/wholesale", desc: "Green coffee and sourcing requirements" },
          { title: "Roasting Program", href: "/solutions/roasting-program", desc: "Custom roast-development pathway" },
          { title: "Distribution Partnership", href: "/distribution", desc: "Market and distribution discussions" },
        ]}
        ctaLabel="Discuss Your Coffee Requirements"
      />
    </>
  )
}
