import { Metadata } from "next"
import { SolutionDetailTemplate } from "@/components/templates/solution-detail-template"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Barista Staffing Cambodia | OCC Hiring & Training Framework",
  description:
    "Evidence-led guidance for cafés, hotels, offices, and event operators evaluating barista hiring, training, placement, and staffing providers in Cambodia.",
  keywords:
    "barista staffing Cambodia, barista hiring Phnom Penh, barista training Cambodia, event barista Cambodia, coffee staff placement, barista due diligence",
  openGraph: {
    title: "Barista Staffing Cambodia | OCC",
    description: "A practical framework for defining roles, evaluating candidates, verifying training, and documenting placement terms.",
    url: `${siteUrl}/solutions/barista-staffing`,
    type: "website",
  },
  alternates: pageAlternates("/solutions/barista-staffing"),
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What should a barista staffing brief include?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Define the venue, role, schedule, expected beverage volume, equipment used, language needs, service responsibilities, supervision model, and the technical skills required for the position.",
      },
    },
    {
      "@type": "Question",
      name: "How should barista candidates be evaluated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use practical observation of workflow, beverage preparation, cleaning, grinder and espresso-machine handling, consistency under pressure, communication, and role-specific service requirements.",
      },
    },
    {
      "@type": "Question",
      name: "What should be documented before a placement begins?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Document the employer or contracting party, role scope, schedule, compensation, trial or review process, replacement terms if any, training responsibility, supervision, and any travel or event-specific conditions.",
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
    { "@type": "ListItem", position: 3, name: "Barista Staffing", item: `${siteUrl}/solutions/barista-staffing` },
  ],
}

const internalLinks: Record<string, string> = {
  equipment: "/solutions/equipment-service",
  wholesale: "/solutions/wholesale",
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

export default function BaristaStaffingPage() {
  const relatedServices = [
    { title: "Wholesale", href: "/solutions/wholesale", desc: "Coffee supply and buyer due diligence" },
    { title: "Roasting Program", href: "/solutions/roasting-program", desc: "Roast development and production-readiness framework" },
    { title: "Equipment Service", href: "/solutions/equipment-service", desc: "Equipment and service-vendor evaluation" },
  ]

  const sections = [
    {
      title: "Use Case",
      content: <p>This page is for cafés, hotels, offices, event organizers, and pop-up concepts evaluating barista staffing in Cambodia. It focuses on the evidence and role definition needed before treating a candidate pool, training standard, language capability, or placement term as confirmed.</p>,
    },
    {
      title: "Candidate Evaluation",
      content: <p>Assess the skills that matter for the actual role: workflow, espresso and milk preparation where relevant, grinder adjustment, cleaning, {renderWithLinks("equipment")} handling, service communication, consistency during volume, and the ability to follow the venue&apos;s operating procedures.</p>,
    },
    {
      title: "Training Evidence",
      content: <p>Training should be described with specific competencies, assessment methods, dates, and responsible trainers rather than broad labels alone. A provider&apos;s internal program, external course, or industry reference should not be treated as equivalent to certification unless the credential can be verified.</p>,
    },
    {
      title: "Before Placement",
      content: <p>Confirm who employs or contracts the worker, role scope, schedule, compensation, trial or review process, supervision, training responsibility, replacement terms if any, and travel conditions for events. Dependencies involving {renderWithLinks("wholesale")} coffee or {renderWithLinks("roasting")} should be documented separately from staffing.</p>,
    },
  ]

  const faqs = [
    { q: "What should a barista staffing brief include?", a: <>Define the venue, role, schedule, beverage volume, equipment used, language needs, service responsibilities, supervision model, and required technical skills.</> },
    { q: "How should barista candidates be evaluated?", a: <>Use practical observation of workflow, beverage preparation, cleaning, equipment handling, consistency under pressure, communication, and role-specific service requirements.</> },
    { q: "What should be documented before a placement begins?", a: <>Document the contracting party, role scope, schedule, compensation, review process, any replacement terms, training responsibility, supervision, and event or travel conditions.</> },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SolutionDetailTemplate
        index="03"
        title="BARISTA STAFFING"
        subtitle="Define the role, verify candidate evidence, and document placement terms before treating staffing capability as confirmed."
        sections={sections}
        factsTitle="Evaluation Checklist"
        facts={[
          "Role scope and operating schedule",
          "Practical technical-skill assessment",
          "Training evidence and assessment method",
          "Language and service requirements",
          "Contracting, supervision, and review terms",
        ]}
        faqs={faqs}
        relatedServices={relatedServices}
        ctaLabel="Discuss your requirements"
      />
    </>
  )
}
