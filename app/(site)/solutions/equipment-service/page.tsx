import { Metadata } from "next"
import { SolutionDetailTemplate } from "@/components/templates/solution-detail-template"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Coffee Equipment Service Cambodia | OCC",
  description:
    "Commercial coffee equipment service in Phnom Penh and Cambodia: preventive maintenance, emergency repair, and installation support.",
  keywords:
    "espresso machine service Cambodia, grinder repair Phnom Penh, coffee equipment maintenance, cafe equipment technician",
  openGraph: {
    title: "Equipment Service | OCC",
    description: "Preventive care. Fast response. Zero downtime tolerance.",
    url: `${siteUrl}/solutions/equipment-service`,
    type: "website",
  },
  alternates: pageAlternates("/solutions/equipment-service"),
}

const faqSchema = {
  "@context": "https://schema.org",
  // FAQ content is rendered visibly; no FAQ structured data is emitted.
  mainEntity: [
    {
      "@type": "Question",
      name: "What brands do you service?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We service major commercial brands including La Marzocco, Synesso, Nuova Simonelli, Mahlkonig, and Mazzer.",
      },
    },
    {
      "@type": "Question",
      name: "How fast is your emergency response?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We target same-day response for Phnom Penh clients on active maintenance contracts.",
      },
    },
    {
      "@type": "Question",
      name: "Do you supply spare parts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Common wear parts are stocked. Non-stock parts are sourced and expedited where possible.",
      },
    },
  ],
}

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Equipment Service",
  provider: {
    "@type": "Organization",
    name: "Origin Coffee Cambodia (OCC)",
    url: siteUrl,
  },
  areaServed: [
    { "@type": "City", name: "Phnom Penh" },
    { "@type": "Country", name: "Cambodia" },
  ],
  serviceType: "Commercial coffee equipment installation, maintenance, and repair",
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
  "roasted beans": "/solutions/roasting-program",
  barista: "/solutions/barista-staffing",
  equipment: "/solutions/equipment-service",
  wholesale: "/solutions/wholesale",
  SCA: "/about/sustainability",
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

export default function EquipmentServicePage() {
  const relatedServices = [
    { title: "Roasting Program", href: "/solutions/roasting-program", desc: "Custom roast profile development" },
    { title: "Barista Staffing", href: "/solutions/barista-staffing", desc: "Trained staffing for venues and events" },
    { title: "Wholesale", href: "/solutions/wholesale", desc: "Direct-origin and production bean supply" },
  ]

  const sections = [
    {
      title: "What We Cover",
      content: <p>Commercial espresso machines, grinders, batch brewers, and water filtration systems. OCC&apos;s equipment service covers installation, scheduled maintenance, calibration, and emergency repair for cafe-grade and hotel-grade equipment.</p>,
    },
    {
      title: "Service Model",
      content: <p>Two options: scheduled maintenance contracts for ongoing preventive care, or on-call repair response for urgent breakdowns. Both include documented service reports after every visit, and can be paired with {renderWithLinks("barista")} operations support.</p>,
    },
    {
      title: "Why OCC",
      content: <p>Equipment failure costs more than a service contract. OCC&apos;s technicians are trained on commercial-grade machinery and work to minimize downtime, not extend it. Every service visit is logged, and every repair comes with a follow-up check and optional {renderWithLinks("SCA")} brew calibration.</p>,
    },
    {
      title: "Who We Work With",
      content: <p>Specialty cafes, hotel F&amp;B departments, office coffee setups, and multi-location operators needing consolidated service contracts linked to their {renderWithLinks("wholesale")} supply chain.</p>,
    },
  ]

  const faqs = [
    { q: "What brands do you service?", a: <>We service major commercial brands including La Marzocco, Synesso, Nuova Simonelli, Mahlkonig, and Mazzer.</> },
    { q: "How fast is your emergency response?", a: <>We target same-day response for Phnom Penh clients on active maintenance contracts.</> },
    { q: "Do you supply spare parts?", a: <>Yes. Common wear parts are stocked. Non-stock parts are sourced and expedited where possible.</> },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SolutionDetailTemplate
        index="04"
        title="EQUIPMENT SERVICE"
        subtitle="Preventive care. Fast response. Zero downtime tolerance."
        sections={sections}
        factsTitle="Service Includes"
        facts={[
          "Preventive maintenance plans",
          "Emergency repair response",
          "Equipment installation and setup",
          "Calibration and performance checks",
          "Documented service reports",
        ]}
        faqs={faqs}
        relatedServices={relatedServices}
        ctaLabel="Talk to our team"
      />
    </>
  )
}
