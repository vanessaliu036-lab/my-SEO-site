import { Metadata } from "next"
import { SolutionDetailTemplate } from "@/components/templates/solution-detail-template"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Custom Roasting Program Cambodia | OCC",
  description:
    "Custom roast profile development for white-label brands, house blends, and single-origin signatures in Cambodia.",
  keywords:
    "custom roasting Cambodia, white label coffee Cambodia, house blend development, roast profile development",
  openGraph: {
    title: "Custom Roasting Program | OCC",
    description:
      "Your profile. Your brand. Roasted with precision.",
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
      name: "Can I use my own packaging?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We support client-supplied packaging or can coordinate design and print through our partners.",
      },
    },
    {
      "@type": "Question",
      name: "How long does profile development take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Typically 2-3 weeks from first sample roast to production approval.",
      },
    },
    {
      "@type": "Question",
      name: "What is the minimum production batch?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Minimum production batch is 10kg per profile.",
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

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Custom Roasting Program",
  description:
    "Custom roast profile development, white-label roasting, and house-blend engineering for Cambodian coffee brands. Includes cupping, sample iterations, and production batches from 10kg.",
  provider: {
    "@type": "Organization",
    name: "Origin Coffee Cambodia (OCC)",
    url: siteUrl,
  },
  serviceType: "Coffee Roasting & Profile Development",
  areaServed: [
    { "@type": "City", name: "Phnom Penh" },
    { "@type": "Country", name: "Cambodia" },
  ],
  offers: {
    "@type": "Offer",
    eligibleCustomerType: "Business",
    description:
      "Minimum production batch 10kg per profile. 2-3 week profile development lead time. Client-supplied packaging supported.",
  },
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

export default function RoastingProgramPage() {
  const relatedServices = [
    { title: "Barista Staffing", href: "/solutions/barista-staffing", desc: "Trained baristas for venues and events" },
    { title: "Equipment Service", href: "/solutions/equipment-service", desc: "Installation, preventive care, and repairs" },
    { title: "Wholesale", href: "/solutions/wholesale", desc: "Origin-led coffee supply for operations" },
  ]

  const sections = [
    {
      title: "The Program",
      content: <p>OCC&apos;s custom roasting program is designed for businesses that want their own coffee identity - white-label brands, house blends, or single-origin signatures. We develop, test, and lock roast profiles to your exact specification for {renderWithLinks("roasted beans")} programs.</p>,
    },
    {
      title: "The Process",
      content: <p>Sample roast to {renderWithLinks("cupping")} session to profile refinement to production approval to ongoing batch production. Every profile is documented and stored. Every batch is cupped before release.</p>,
    },
    {
      title: "Why OCC",
      content: <p>Generic roasters produce generic results. OCC treats each client&apos;s profile as a technical asset - reproducible, consistent, and tied to measurable cup quality. We use {renderWithLinks("SCA")} cupping protocols as the baseline for every profile evaluation.</p>,
    },
    {
      title: "Who We Work With",
      content: <p>Cafe owners launching house blends, hotels building F&amp;B identity, importers seeking Cambodia-origin white-label, and retail brands entering the specialty segment, often alongside {renderWithLinks("barista")} and {renderWithLinks("equipment")} support.</p>,
    },
  ]

  const faqs = [
    { q: "Can I use my own packaging?", a: <>Yes. We support client-supplied packaging or can coordinate design and print through our partners.</> },
    { q: "How long does profile development take?", a: <>Typically 2-3 weeks from first sample roast to production approval.</> },
    { q: "What is the minimum production batch?", a: <>Minimum production batch is 10kg per profile.</> },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <SolutionDetailTemplate
        index="02"
        title="ROASTING PROGRAM"
        subtitle="Your profile. Your brand. Roasted with precision."
        sections={sections}
        factsTitle="Program Includes"
        facts={[
          "Custom roast profile development",
          "White-label packaging available",
          "SCA-standard cupping sessions",
          "Batch consistency guarantee",
          "Profile documentation and storage",
        ]}
        faqs={faqs}
        relatedServices={relatedServices}
        ctaLabel="Request a quote"
      />
    </>
  )
}
