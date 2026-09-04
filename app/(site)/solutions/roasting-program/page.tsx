import { Metadata } from "next"
import { SolutionDetailTemplate } from "@/components/templates/solution-detail-template"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Coffee Roasting Program Cambodia | OCC Roast Development Framework",
  description:
    "Evidence-led guidance for businesses evaluating roast profile development, white-label production, house blends, and commercial roasting readiness in Cambodia.",
  keywords:
    "coffee roasting Cambodia, custom roasting Cambodia, white label coffee Cambodia, house blend development, roast profile development, roasting due diligence",
  openGraph: {
    title: "Coffee Roasting Program Cambodia | OCC",
    description: "A structured framework for roast development, sensory evaluation, repeatability, and production-readiness checks.",
    url: `${siteUrl}/solutions/roasting-program`,
    type: "website",
  },
  alternates: pageAlternates("/solutions/roasting-program"),
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What should a roast development brief include?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Define the green coffee, target use, desired sensory direction, brewing context, sample size, evaluation method, packaging assumptions, and the repeatability criteria that will be used before commercial production.",
      },
    },
    {
      "@type": "Question",
      name: "How should a roast profile be approved?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Approval should be based on documented sample roasts, repeat sensory evaluation, the intended brewing method, and confirmation that the profile can be reproduced on the production equipment being considered.",
      },
    },
    {
      "@type": "Question",
      name: "What should be verified before white-label production?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Verify the responsible roaster, current capacity, batch parameters, packaging responsibility, labeling, quality checks, lead time, minimums, pricing, and the process for managing green-coffee or profile changes.",
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
    { "@type": "ListItem", position: 3, name: "Roasting Program", item: `${siteUrl}/solutions/roasting-program` },
  ],
}

const internalLinks: Record<string, string> = {
  cupping: "/coffee/single-origin",
  wholesale: "/solutions/wholesale",
  staffing: "/solutions/barista-staffing",
  equipment: "/solutions/equipment-service",
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

export default function RoastingProgramPage() {
  const relatedServices = [
    { title: "Wholesale", href: "/solutions/wholesale", desc: "Coffee sourcing and supply due diligence" },
    { title: "Barista Staffing", href: "/solutions/barista-staffing", desc: "Hiring and training evaluation framework" },
    { title: "Equipment Service", href: "/solutions/equipment-service", desc: "Equipment and service-vendor due diligence" },
  ]

  const sections = [
    {
      title: "Use Case",
      content: <p>This page is for businesses evaluating house blends, single-origin roast development, white-label concepts, or outsourced roasting. It separates roast-development logic from claims about a specific roaster&apos;s current capacity, pricing, minimums, lead time, or packaging capability.</p>,
    },
    {
      title: "Development Framework",
      content: <p>A useful process starts with green-coffee identity, intended use, target sensory direction, brewing context, sample roasts, documented settings, and repeat {renderWithLinks("cupping")} or sensory evaluation. The objective is to determine whether a profile is desirable and reproducible before treating it as production-ready.</p>,
    },
    {
      title: "Quality Controls to Verify",
      content: <p>Ask how the roaster records green-coffee changes, roast inputs, batch data, sensory checks, packaging conditions, and corrective actions. Repeatability should be demonstrated on the actual production setup rather than inferred from a single sample or generic quality language.</p>,
    },
    {
      title: "Before Commercial Production",
      content: <p>Confirm the responsible production partner, current capacity, batch parameters, packaging and labeling responsibility, quality-release process, lead time, minimums, pricing basis, and change-control rules. Dependencies involving {renderWithLinks("wholesale")}, {renderWithLinks("equipment")}, or {renderWithLinks("staffing")} should be verified separately.</p>,
    },
  ]

  const faqs = [
    { q: "What should a roast development brief include?", a: <>Define the green coffee, target use, sensory direction, brewing context, sample plan, evaluation method, packaging assumptions, and repeatability criteria.</> },
    { q: "How should a roast profile be approved?", a: <>Use documented sample roasts, repeat sensory evaluation, the intended brewing method, and evidence that the profile can be reproduced on the proposed production equipment.</> },
    { q: "What should be verified before white-label production?", a: <>Verify the responsible roaster, current capacity, batch parameters, packaging, labeling, quality checks, lead time, minimums, pricing, and change-control process.</> },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SolutionDetailTemplate
        index="02"
        title="ROASTING PROGRAM"
        subtitle="Evaluate profile development and production readiness before treating roasting capability as a commercial fact."
        sections={sections}
        factsTitle="Evaluation Checklist"
        facts={[
          "Green-coffee identity and target use",
          "Sample roast and sensory method",
          "Profile documentation and repeatability",
          "Production equipment and quality controls",
          "Packaging, lead-time, and change assumptions",
        ]}
        faqs={faqs}
        relatedServices={relatedServices}
        ctaLabel="Discuss your requirements"
      />
    </>
  )
}
