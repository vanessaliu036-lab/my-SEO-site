import { Metadata } from "next"
import { SolutionDetailTemplate } from "@/components/templates/solution-detail-template"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Coffee Equipment Service Cambodia | OCC Vendor Evaluation Framework",
  description:
    "Evidence-led guidance for cafés, hotels, offices, and operators evaluating coffee equipment installation, maintenance, repair, spare-parts support, and service vendors in Cambodia.",
  keywords:
    "espresso machine service Cambodia, coffee equipment maintenance Cambodia, grinder repair Phnom Penh, cafe equipment technician, coffee equipment vendor due diligence",
  openGraph: {
    title: "Coffee Equipment Service Cambodia | OCC",
    description: "A practical framework for defining equipment scope, verifying technician capability, parts support, response terms, and service documentation.",
    url: `${siteUrl}/solutions/equipment-service`,
    type: "website",
  },
  alternates: pageAlternates("/solutions/equipment-service"),
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What should be verified before choosing a coffee equipment service provider?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Verify the exact equipment models covered, technician experience, access to service documentation, parts sourcing, preventive-maintenance scope, response expectations, reporting, warranty implications, and escalation process.",
      },
    },
    {
      "@type": "Question",
      name: "How should emergency response claims be evaluated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ask whether response time is a contractual service level or only a target, which locations are covered, what hours apply, whether parts availability changes the timeline, and what happens when the target cannot be met.",
      },
    },
    {
      "@type": "Question",
      name: "What should buyers check about spare parts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Confirm which parts are actually held locally, which must be ordered, expected lead times, compatibility, authenticity, warranty conditions, and who bears the cost of expedited sourcing.",
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
    { "@type": "ListItem", position: 3, name: "Equipment Service", item: `${siteUrl}/solutions/equipment-service` },
  ],
}

const internalLinks: Record<string, string> = {
  wholesale: "/solutions/wholesale",
  staffing: "/solutions/barista-staffing",
  roasting: "/solutions/roasting-program",
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

export default function EquipmentServicePage() {
  const relatedServices = [
    { title: "Wholesale", href: "/solutions/wholesale", desc: "Coffee supply and buyer due diligence" },
    { title: "Roasting Program", href: "/solutions/roasting-program", desc: "Roast development and production-readiness framework" },
    { title: "Barista Staffing", href: "/solutions/barista-staffing", desc: "Hiring and training evaluation framework" },
  ]

  const sections = [
    {
      title: "Scope to Define",
      content: <p>Start with the exact espresso machines, grinders, brewers, water systems, installation conditions, usage level, and service history involved. A vendor should only be treated as suitable after confirming capability for the specific models and work required.</p>,
    },
    {
      title: "Service Model to Verify",
      content: <p>Clarify whether support is preventive maintenance, installation, calibration, on-call repair, or a combination. Confirm what is included, what is excluded, response expectations, travel coverage, reporting, escalation, and how parts availability affects completion time.</p>,
    },
    {
      title: "Vendor Evidence",
      content: <p>Ask for technician experience relevant to the equipment, access to technical documentation, diagnostic process, parts sourcing, service records, warranty implications, and references where appropriate. Brand familiarity should be verified against the actual models rather than assumed from generic commercial-equipment language.</p>,
    },
    {
      title: "Before Contracting",
      content: <p>Document service scope, covered equipment, maintenance frequency, response terms, labor and travel charges, parts policy, reporting, warranty responsibility, and escalation. Dependencies involving {renderWithLinks("staffing")}, {renderWithLinks("wholesale")}, or {renderWithLinks("roasting")} should be evaluated separately rather than bundled into unsupported operating claims.</p>,
    },
  ]

  const faqs = [
    { q: "What should be verified before choosing a coffee equipment service provider?", a: <>Verify the exact models covered, technician experience, service documentation, parts sourcing, maintenance scope, response terms, reporting, warranty implications, and escalation process.</> },
    { q: "How should emergency response claims be evaluated?", a: <>Confirm whether the response time is contractual or only a target, the locations and hours covered, parts dependencies, and what happens when the target cannot be met.</> },
    { q: "What should buyers check about spare parts?", a: <>Confirm which parts are held locally, which must be ordered, expected lead times, compatibility, authenticity, warranty conditions, and expedited-sourcing responsibility.</> },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SolutionDetailTemplate
        index="04"
        title="EQUIPMENT SERVICE"
        subtitle="Verify model coverage, technician evidence, parts support, and response terms before relying on a service provider."
        sections={sections}
        factsTitle="Service Due Diligence"
        facts={[
          "Exact equipment and model coverage",
          "Technician experience and documentation",
          "Preventive and repair scope",
          "Parts sourcing and lead-time assumptions",
          "Response, reporting, and escalation terms",
        ]}
        faqs={faqs}
        relatedServices={relatedServices}
        ctaLabel="Discuss your requirements"
      />
    </>
  )
}
