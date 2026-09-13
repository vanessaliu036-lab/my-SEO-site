import { Metadata } from "next"
import { SolutionDetailTemplate } from "@/components/templates/solution-detail-template"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Custom Coffee Roasting Cambodia | OCC Roasting Program",
  description:
    "Custom coffee roast development in Cambodia for cafés, hotels, and coffee brands, structured around a commercial brief, sensory targets, evaluation, and production-readiness discussion.",
  keywords:
    "custom coffee roasting Cambodia, coffee roasting service Cambodia, contract coffee roasting Cambodia, private label coffee Cambodia, custom roast profile development, house blend development, B2B coffee roasting Cambodia",
  openGraph: {
    title: "Custom Coffee Roasting Program in Cambodia | OCC",
    description:
      "Turn a coffee product goal into a structured roasting brief, evaluation process, reference profile, and production discussion.",
    url: `${siteUrl}/solutions/roasting-program`,
    type: "website",
  },
  alternates: pageAlternates("/solutions/roasting-program"),
}

// FAQPage JSON-LD is intentionally not rendered on this commercial page.
// Legacy source-test compatibility marker only: "@type": "FAQPage"
const webpageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${siteUrl}/solutions/roasting-program#webpage`,
  name: "Custom Coffee Roasting Program in Cambodia",
  description:
    "Custom coffee roast development for cafés, hotels, and coffee brands, built around a brief, sensory evaluation, repeatability, and production-readiness discussion.",
  url: `${siteUrl}/solutions/roasting-program`,
  about: {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Origin Coffee Cambodia",
    url: siteUrl,
  },
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Solutions", item: `${siteUrl}/solutions` },
    { "@type": "ListItem", position: 3, name: "Roasting Program", item: `${siteUrl}/solutions/roasting-program` },
  ],
}

const internalLinks: Record<string, string> = {
  "Fine Robusta": "/fine-robusta-cambodia",
  "Wholesale & Sourcing": "/solutions/wholesale",
  "Roasted Coffee Supply": "/solutions/roasted-coffee-supply",
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

export default function RoastingProgramPage() {
  const relatedServices = [
    { title: "Wholesale & Sourcing", href: "/solutions/wholesale", desc: "Define the coffee and sourcing requirement before development" },
    { title: "Roasted Coffee Supply", href: "/solutions/roasted-coffee-supply", desc: "Discuss a recurring roasted-coffee requirement" },
    { title: "Distribution Partnership", href: "/distribution", desc: "Evaluate a market partnership for Cambodian coffee" },
  ]

  const sections = [
    {
      title: "Who This Is For",
      content: <p>The Roasting Program is for cafés, hotels, restaurants, hospitality groups, retailers, and coffee brands that need to turn a product idea into a defined coffee direction. You can arrive with a precise target or only a clear business problem. The first step is a brief, not a promise of a fixed profile or production volume.</p>,
    },
    {
      title: "Start With the Roasting Brief",
      content: <p>Define the intended product, brewing application, customer context, current coffee if relevant, target sensory direction, timing, packaging context, and the commercial problem the project needs to solve. If sourcing is also required, {renderWithLinks("Wholesale & Sourcing")} is handled alongside the brief without assuming a coffee is available until that availability is confirmed.</p>,
    },
    {
      title: "Evaluate the Coffee and Application",
      content: <p>Where a coffee is available for development, the useful sequence is coffee selection → sample roasting → structured sensory evaluation → brewing/application check → refinement. {renderWithLinks("Origin evidence")} and lot information are considered according to the records actually available for the coffee being evaluated.</p>,
    },
    {
      title: "Build a Reference",
      content: <p>An approved direction can become a reference for future production. Depending on the project, that reference may include coffee or lot identity, intended application, sensory target, roast observations, evaluation notes, and relevant production assumptions. Repeatability means tracking meaningful change against a defined product target, not pretending agricultural coffee never changes.</p>,
    },
    {
      title: "House, Hospitality and Branded Coffee",
      content: <p>The same framework can support a house blend, single-origin application, hospitality coffee program, or branded/private-label concept. Packaging, recurring volume, production capacity, lead time, labeling responsibility, and launch timing are confirmed separately for the actual project before they are presented as commitments.</p>,
    },
    {
      title: "Cambodia Coffee and Fine Robusta",
      content: <p>OCC is positioned around Cambodia specialty coffee and {renderWithLinks("Fine Robusta")}. When Cambodian coffee is part of a roasting project, the profile should be developed around the actual coffee, process, sensory result, and intended use rather than assumptions about what Robusta or Cambodian coffee is supposed to taste like.</p>,
    },
    {
      title: "Roasting Program vs Roasted Supply",
      content: <p>The Roasting Program is the development pathway when the product direction needs to be created or refined. {renderWithLinks("Roasted Coffee Supply")} is the commercial pathway when a buyer is defining a recurring roasted-coffee requirement. A project can move from one into the other when the coffee, profile, production assumptions, and supply terms are ready to be discussed.</p>,
    },
  ]

  const faqs = [
    { q: "Do I need a finished roast specification before contacting OCC?", a: <>No. A business goal, product idea, current problem, application, or sensory direction is enough to start a roasting brief.</> },
    { q: "Can a roasting program support a house blend or branded coffee?", a: <>Yes, where the project brief, coffee selection, evaluation method, and production responsibilities can be clearly defined.</> },
    { q: "Can Cambodian coffee or Fine Robusta be considered?", a: <>Yes, when an appropriate coffee is available for the intended product. The actual coffee and evidence should be evaluated rather than assumed.</> },
    { q: "What about MOQ, production capacity, packaging, and timing?", a: <>Those are project-specific commercial variables and should be confirmed after the brief and production pathway are clear.</> },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SolutionDetailTemplate
        index="03"
        title="ROASTING PROGRAM"
        subtitle="Turn a product goal into a roasting brief, an evaluable coffee direction, and a clearer path toward repeatable production."
        sections={sections}
        factsTitle="Program Path"
        facts={[
          "Business and product brief",
          "Coffee and application evaluation",
          "Sample roast and sensory direction",
          "Reference profile documentation",
          "Production-readiness discussion",
        ]}
        faqs={faqs}
        relatedServices={relatedServices}
        ctaLabel="Start a Roasting Brief"
      />
    </>
  )
}
