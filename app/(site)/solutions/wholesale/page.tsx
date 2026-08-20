import { Metadata } from "next"
import { SolutionDetailTemplate } from "@/components/templates/solution-detail-template"
import { siteUrl, ogImage } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Wholesale Coffee Supply Cambodia | OCC",
  description: "OCC supplies direct-origin coffee to cafés, hotels, and restaurants in Cambodia with flexible delivery, account support, and orders from 5kg.",
  keywords: "wholesale coffee Cambodia, coffee supplier Phnom Penh, B2B coffee supply Cambodia, café coffee wholesale, restaurant coffee supplier, direct trade coffee Cambodia, OCC wholesale, Siem Reap coffee supplier",
  openGraph: {
    title: "Wholesale Coffee Supply | OCC Cambodia",
    description: "Direct-origin beans. Reliable volume. B2B supply built for Cambodia's café industry.",
    url: `${siteUrl}/solutions/wholesale`,
    type: "website",
    images: [{ url: ogImage, width: 1200, height: 630, alt: "Wholesale Coffee Supply Cambodia — OCC" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wholesale Coffee Supply | OCC Cambodia",
    description: "Direct-origin beans. Reliable volume. B2B supply built for Cambodia's café industry.",
  },
  alternates: pageAlternates("/solutions/wholesale"),
}

const faqSchema = {
  "@context": "https://schema.org",
  // Visible FAQs remain on the page; structured FAQ data is intentionally omitted.
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is your minimum order quantity?",
      "acceptedAnswer": { "@type": "Answer", "text": "We start from 5kg per origin per order. Volume discounts apply from 25kg/month." }
    },
    {
      "@type": "Question",
      "name": "Do you deliver outside Phnom Penh?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. We service major provincial cities including Siem Reap and Sihanoukville on scheduled routes." }
    },
    {
      "@type": "Question",
      "name": "Can I mix origins in one order?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Multi-origin orders are welcome with no additional handling fee." }
    }
  ]
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": `${siteUrl}` },
    { "@type": "ListItem", "position": 2, "name": "Solutions", "item": `${siteUrl}/solutions` },
    { "@type": "ListItem", "position": 3, "name": "Wholesale", "item": `${siteUrl}/solutions/wholesale` },
  ],
}

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "B2B Wholesale Coffee Supply",
  description: "Direct-origin wholesale coffee supply for cafés, hotels, restaurants, and corporate offices in Cambodia. Minimum order 5kg. Weekly and bi-weekly delivery available.",
  provider: {
    "@type": "Organization",
    name: "Origin Coffee Cambodia (OCC)",
    url: siteUrl,
  },
  serviceType: "B2B Wholesale Coffee Supply",
  areaServed: [
    { "@type": "City", name: "Phnom Penh" },
    { "@type": "City", name: "Siem Reap" },
    { "@type": "City", name: "Sihanoukville" },
    { "@type": "Country", name: "Cambodia" },
  ],
  offers: {
    "@type": "Offer",
    eligibleCustomerType: "Business",
    description: "Minimum order from 5kg per origin. Volume discounts from 25kg/month. Weekly or bi-weekly delivery windows.",
  },
}

const internalLinks: Record<string, string> = {
  "roasted beans": "/solutions/roasting-program",
  "roasted bean": "/solutions/roasting-program",
  "barista": "/solutions/barista-staffing",
  "equipment": "/solutions/equipment-service",
  "wholesale": "/solutions/wholesale",
  "SCA": "/about/sustainability",
  "cupping": "/coffee/single-origin",
}

const renderWithLinks = (text: string) => {
  const patterns = Object.keys(internalLinks).sort((a, b) => b.length - a.length)
  let result = text
  patterns.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi')
    result = result.replace(regex, match => `<a href="${internalLinks[keyword]}" class="border-b border-dashed border-gray-400 hover:border-gray-800 transition-colors">${match}</a>`)
  })
  return <span dangerouslySetInnerHTML={{ __html: result }} />
}

export default function WholesalePage() {
  const relatedServices = [
    { title: "Roasting Program", href: "/solutions/roasting-program", desc: "Custom roast profiles & technical training" },
    { title: "Barista Staffing", href: "/solutions/barista-staffing", desc: "Trained professionals for your team" },
    { title: "Equipment Service", href: "/solutions/equipment-service", desc: "Installation, maintenance & repair" }
  ]

  const sections = [
    {
      title: "Who It's For",
      content: <p>B2B wholesale supply for cafés, hotels, restaurants, co-working spaces, and corporate offices in Phnom Penh, Siem Reap, Sihanoukville, and across Cambodia. Whether you're running a single-outlet café or a multi-location group, OCC structures supply around your volume and schedule.</p>,
    },
    {
      title: "What You Get",
      content: <p>Green beans sourced directly from Cambodian farms and regional origins. {renderWithLinks("roasted beans")} to order or supplied green for in-house roasting. Flexible contract terms with fixed weekly or bi-weekly delivery windows.</p>,
    },
    {
      title: "Why OCC",
      content: <p>Most {renderWithLinks("wholesale")} suppliers in Cambodia operate on inconsistent roast schedules and limited origin transparency. OCC operates differently - every batch is traceable, every delivery is documented, and every account has a dedicated point of contact. No middlemen. No guesswork. Our {renderWithLinks("equipment")} partners ensure your brewing setup matches your coffee quality.</p>,
    },
    {
      title: "Who We Work With",
      content: <p>Specialty cafés · Boutique hotels · Restaurant groups · Corporate offices · Coworking spaces · Event caterers</p>,
    },
  ]

  const faqs = [
    { q: "What is your minimum order quantity?", a: <>We start from 5kg per origin per order. Volume discounts apply from 25kg/month.</> },
    { q: "Do you deliver outside Phnom Penh?", a: <>Yes. We service major provincial cities including Siem Reap and Sihanoukville on scheduled routes.</> },
    { q: "Can I mix origins in one order?", a: <>Yes. Multi-origin orders are welcome with no additional handling fee.</> },
    { q: "Do you provide cupping sessions?", a: <>Yes. We offer regular {renderWithLinks("cupping")} sessions for wholesale partners to evaluate new arrivals and seasonal lots.</> },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <SolutionDetailTemplate
        index="01"
        title="WHOLESALE"
        subtitle="Direct-origin beans. Reliable volume. Built for Cambodia's growing café industry."
        sections={sections}
        factsTitle="Supply Terms"
        facts={[
          "Minimum order from 5kg per origin",
          "Weekly or bi-weekly delivery",
          "Green & roasted bean options",
          "Dedicated account manager",
          "Origin documentation provided",
        ]}
        faqs={faqs}
        relatedServices={relatedServices}
        ctaLabel="Talk to our team"
      />
    </>
  )
}
