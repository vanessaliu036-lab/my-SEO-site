import { Metadata } from "next"
import { SolutionDetailTemplate } from "@/components/templates/solution-detail-template"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Coffee Equipment Service Cambodia | OCC",
  description:
    "Evidence-led guidance for operators evaluating coffee equipment, maintenance, repairs, parts support, and service vendors in Cambodia.",
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

// Visible FAQ content is rendered on the page; FAQPage JSON-LD is intentionally omitted.

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
  "coffee marketing": "/solutions/coffee-marketing",
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
    { title: "Coffee Marketing", href: "/solutions/coffee-marketing", desc: "Menu and signature drink product development" },
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
      content: <p>Document service scope, covered equipment, maintenance frequency, response terms, labor and travel charges, parts policy, reporting, warranty responsibility, and escalation. Dependencies involving {renderWithLinks("coffee marketing")}, {renderWithLinks("wholesale")}, or {renderWithLinks("roasting")} should be evaluated separately rather than bundled into unsupported operating claims.</p>,
    },
    {
      title: "Preventive Maintenance Plan",
      content: <p>A useful maintenance plan names the equipment, service interval, inspection points, cleaning responsibilities, calibration checks, consumables, replacement thresholds, and the records supplied after each visit. The schedule should reflect drink volume, water conditions, operating hours, and manufacturer guidance rather than applying one generic interval to every café.</p>,
    },
    {
      title: "Water, Calibration & Cup Quality",
      content: <p>Equipment reliability and beverage quality are connected. Water hardness, filtration, pressure, temperature, grinder condition, burr wear, dose consistency, and machine calibration can change both service risk and cup performance. Confirm who checks each variable, what measuring tools are used, and how adjustments are documented for the operator.</p>,
    },
    {
      title: "Parts & Downtime Planning",
      content: <p>Ask which critical parts are held locally, which require import, expected lead times, compatibility evidence, warranty coverage, and whether temporary equipment or operating workarounds are available. A fast first response does not guarantee a fast repair when diagnosis, approval, parts sourcing, travel, or specialist support remain unresolved.</p>,
    },
    {
      title: "Service Records & Handover",
      content: <p>Each visit should leave a usable record: reported fault, inspection findings, work completed, parts replaced, measurements, remaining risks, follow-up date, and the person responsible for the next action. Clear records help operators compare recurring failures, protect warranty decisions, brief another technician, and plan future equipment investment.</p>,
    },
  ]

  const faqs = [
    { q: "What should be verified before choosing a coffee equipment service provider?", a: <>Verify the exact models covered, technician experience, service documentation, parts sourcing, maintenance scope, response terms, reporting, warranty implications, and escalation process.</> },
    { q: "How should emergency response claims be evaluated?", a: <>Confirm whether the response time is contractual or only a target, the locations and hours covered, parts dependencies, and what happens when the target cannot be met.</> },
    { q: "What should buyers check about spare parts?", a: <>Confirm which parts are held locally, which must be ordered, expected lead times, compatibility, authenticity, warranty conditions, and expedited-sourcing responsibility.</> },
    { q: "How often should espresso machines and grinders be serviced?", a: <>The interval depends on manufacturer guidance, drink volume, water conditions, operating hours, cleaning practice, and equipment condition. Ask the provider to justify the schedule for the actual models and usage rather than quoting a universal interval.</> },
    { q: "What should a service report include?", a: <>A practical report should record the fault, inspection findings, measurements, work completed, parts used, unresolved risks, recommended follow-up, and responsibility for the next action.</> },
    { q: "Should a service provider also train café staff?", a: <>Ask the provider to separate technician work from operator training. Staff guidance may cover daily cleaning, safe shutdown, basic checks, and when to escalate a fault, but it should not encourage unqualified repairs or actions that affect equipment warranty and electrical safety.</> },
  ]

  return (
    <>
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
