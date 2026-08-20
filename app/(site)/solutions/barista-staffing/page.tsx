import { Metadata } from "next"
import { SolutionDetailTemplate } from "@/components/templates/solution-detail-template"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Barista Staffing Cambodia | OCC",
  description:
    "Trained barista staffing for cafes, hotels, offices, and events in Phnom Penh and across Cambodia.",
  keywords:
    "barista staffing Cambodia, barista outsourcing Phnom Penh, event barista Cambodia, coffee staff placement",
  openGraph: {
    title: "Barista Staffing | OCC",
    description: "Trained hands. Consistent service. Ready when you are.",
    url: `${siteUrl}/solutions/barista-staffing`,
    type: "website",
  },
  alternates: pageAlternates("/solutions/barista-staffing"),
}

const faqSchema = {
  "@context": "https://schema.org",
  // FAQ content is rendered visibly; no FAQ structured data is emitted.
  mainEntity: [
    {
      "@type": "Question",
      name: "Do you cover events outside Phnom Penh?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, for confirmed bookings with sufficient lead time. Travel and accommodation are factored into event quotes.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if a placed barista does not meet our expectations?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer a replacement guarantee within the first 30 days of placement at no additional cost.",
      },
    },
    {
      "@type": "Question",
      name: "Can we request baristas with specific language skills?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We can match based on language requirements including English, Khmer, and Mandarin where available.",
      },
    },
  ],
}

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Barista Staffing",
  provider: {
    "@type": "Organization",
    name: "Origin Coffee Cambodia (OCC)",
    url: siteUrl,
  },
  areaServed: [
    { "@type": "City", name: "Phnom Penh" },
    { "@type": "Country", name: "Cambodia" },
  ],
  serviceType: "Barista placement and event staffing",
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

export default function BaristaStaffingPage() {
  const relatedServices = [
    { title: "Roasting Program", href: "/solutions/roasting-program", desc: "Custom roast profile development" },
    { title: "Equipment Service", href: "/solutions/equipment-service", desc: "Preventive and emergency machine support" },
    { title: "Wholesale", href: "/solutions/wholesale", desc: "Direct-origin bean supply for operations" },
  ]

  const sections = [
    {
      title: "The Service",
      content: <p>OCC places trained baristas in your venue on a full-time, part-time, or event basis. Every staff member is trained in-house to OCC&apos;s service standard, covering espresso workflow, {renderWithLinks("equipment")} handling, cleaning protocols, and guest interaction.</p>,
    },
    {
      title: "Our Standard",
      content: <p>All {renderWithLinks("barista")} candidates undergo {renderWithLinks("SCA")}-aligned training before placement. We assess technical skill, consistency under pressure, and professional conduct. Clients receive a staff profile and trial period before any long-term commitment.</p>,
    },
    {
      title: "Why OCC",
      content: <p>Hiring baristas in Cambodia&apos;s current market often means inconsistent training backgrounds and high turnover. OCC staffing removes that variable - you get vetted, trained, and accountable personnel backed by OCC&apos;s ongoing quality oversight and regular {renderWithLinks("cupping")} calibration.</p>,
    },
    {
      title: "Who We Work With",
      content: <p>Specialty cafes, hotel F&amp;B operations, corporate offices with in-house coffee bars, event organizers, and pop-up concepts.</p>,
    },
  ]

  const faqs = [
    { q: "Do you cover events outside Phnom Penh?", a: <>Yes, for confirmed bookings with sufficient lead time. Travel and accommodation are factored into event quotes.</> },
    { q: "What happens if a placed barista does not meet our expectations?", a: <>We offer a replacement guarantee within the first 30 days of placement at no additional cost.</> },
    { q: "Can we request baristas with specific language skills?", a: <>We can match based on language requirements including English, Khmer, and Mandarin where available.</> },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SolutionDetailTemplate
        index="03"
        title="BARISTA STAFFING"
        subtitle="Trained hands. Consistent service. Ready when you are."
        sections={sections}
        factsTitle="Staffing Options"
        facts={[
          "Full-time venue placement",
          "Part-time and shift-based options",
          "Event and pop-up baristas",
          "SCA-aligned training standard",
          "Replacement guarantee included",
        ]}
        faqs={faqs}
        relatedServices={relatedServices}
        ctaLabel="Request a quote"
      />
    </>
  )
}
