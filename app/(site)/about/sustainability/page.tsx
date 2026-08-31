import { AboutInstitutionalTemplate } from "@/components/templates/about-institutional-template"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sustainability | Origin Coffee Cambodia - OCC",
  description:
    "OCC documents Cambodian coffee sourcing, producer relationships, lot traceability, and quality controls across Mondulkiri, Ratanakiri, and Kampot.",
  keywords:
    "ethical coffee Cambodia, traceable coffee beans Cambodia, direct trade coffee Cambodia, Mondulkiri coffee origin, Ratanakiri arabica sourcing, sustainable coffee farming Cambodia, coffee traceability protocol, specialty coffee wholesale transparency, fair trade specialty coffee Southeast Asia, shade grown coffee Mondulkiri",
  alternates: pageAlternates("/about/sustainability"),
  openGraph: {
    title: "Sustainability | Origin Coffee Cambodia - OCC",
    description:
      "Ethical sourcing and traceability protocol. A cup is only as honest as the chain behind it. We built ours to withstand scrutiny at every link.",
    url: `${siteUrl}/about/sustainability`,
    siteName: "Origin Coffee Cambodia",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sustainability | Origin Coffee Cambodia - OCC",
    description:
      "Ethical sourcing and traceability protocol. Direct trade. Traceable beans. Environmental responsibility.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "OCC Sustainability — Ethical Sourcing and Traceability Protocol",
  description:
    "Every coffee we carry has a name, a location, and a story. We work directly with farmers across Mondulkiri, Ratanakiri, and beyond. Traceability is not optional — it is the foundation of specialty coffee done right.",
  url: `${siteUrl}/about/sustainability`,
  isPartOf: {
    "@type": "Organization",
    name: "Origin Coffee Cambodia (OCC)",
    description:
      "Specialty coffee infrastructure company based in Phnom Penh, Cambodia.",
  },
  mainEntity: {
    "@type": "Organization",
    name: "Origin Coffee Cambodia (OCC)",
    description:
      "Ethical coffee supplier Cambodia operating on direct trade model with full traceability from farm to cup.",
    areaServed: {
      "@type": "Country",
      name: "Cambodia",
    },
    makesOffer: [
      {
        "@type": "Offer",
        name: "Traceable Specialty Coffee",
        description:
          "Every batch carries complete record: farm coordinates, processing method, roast date, cupping score.",
      },
      {
        "@type": "Offer",
        name: "Direct Trade Coffee",
        description:
          "We pay above market rate for exceptional lots and build long-term relationships with farmers.",
      },
    ],
    knowsAbout: [
      "Ethical Coffee Sourcing",
      "Coffee Traceability",
      "Direct Trade",
      "Sustainable Coffee Farming",
      "Mondulkiri Coffee",
      "Ratanakiri Arabica",
      "Specialty Coffee Supply Chain",
    ],
  },
}

const originSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "OCC Coffee Origins",
  itemListElement: [
    {
      "@type": "Place",
      name: "Mondulkiri Province",
      description: "Highland coffee region in Eastern Cambodia known for volcanic soil.",
      geo: { "@type": "GeoCoordinates", latitude: 12.46, longitude: 107.10 },
    },
    {
      "@type": "Place",
      name: "Ratanakiri Province",
      description: "Northeastern province famous for its rich red soil and premium Robusta.",
      geo: { "@type": "GeoCoordinates", latitude: 13.73, longitude: 107.01 },
    },
    {
      "@type": "Place",
      name: "Kampot Province",
      description: "Coastal region producing unique flavor profiles due to sea breeze.",
      geo: { "@type": "GeoCoordinates", latitude: 10.62, longitude: 104.18 },
    },
  ],
}

const faqSchema = {
  "@context": "https://schema.org",
  // Visible FAQs remain on the page; structured FAQ data is intentionally omitted.
  mainEntity: [
    {
      "@type": "Question",
      name: "Where does OCC source its coffee in Cambodia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "OCC sources directly from highland farming communities in Mondulkiri and Ratanakiri provinces in eastern Cambodia, as well as coastal estates in Kampot. Each lot is purchased through direct trade relationships with individual farmers, bypassing commodity markets entirely.",
      },
    },
    {
      "@type": "Question",
      name: "What does direct trade mean for Cambodian coffee farmers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Direct trade means OCC negotiates price individually with each farm, consistently paying above Fair Trade floor prices. Farmers receive payment within 30 days of delivery, retain full decision-making over processing methods, and receive written feedback from every cupping session so they can improve quality year-over-year.",
      },
    },
    {
      "@type": "Question",
      name: "How does OCC verify the traceability of its coffee supply chain?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every batch in the OCC system carries a full traceability record: GPS coordinates of the farm plot, the processing method used (washed, natural, or honey), harvest date, roast date, and cupping score. Wholesale clients receive this documentation with every order as standard.",
      },
    },
    {
      "@type": "Question",
      name: "Is Cambodian specialty coffee certified organic or Fair Trade?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most small-scale highland farms in Cambodia practice chemical-free cultivation without holding formal organic certification, as the certification cost is prohibitive for individual smallholders. OCC's direct trade model provides greater farmer premiums than Fair Trade certification in practice, and we document farming practices as part of our traceability protocol.",
      },
    },
    {
      "@type": "Question",
      name: "What environmental practices does OCC require from its farm partners?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "OCC prioritises farms that use shade-grown cultivation to preserve forest canopy, manage wastewater from wet processing to avoid stream contamination, and avoid synthetic pesticides. These practices are assessed during annual farm visits and documented in our supplier records.",
      },
    },
  ],
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "About", item: `${siteUrl}/about` },
    { "@type": "ListItem", position: 3, name: "Sustainability", item: `${siteUrl}/about/sustainability` },
  ],
}

const sections = [
  {
    title: "Origin Transparency",
    paragraphs: [
      "Every coffee we carry has a name, a location, and a story that begins long before it reaches our roastery. We work directly with farmers and cooperatives across Cambodia's finest growing regions — Mondulkiri, Ratanakiri, and beyond — ensuring that origin transparency is not a marketing claim, but a documented reality.",
      "When you order from OCC, you know where your coffee came from. Not just the country. The farm. The altitude. The harvest season. Because traceability is not optional — it is the foundation of specialty coffee done right.",
    ],
  },
  {
    title: "Ethical Sourcing Protocol",
    paragraphs: [
      "Cambodia's coffee farmers operate in one of Southeast Asia's most underrecognized growing regions. Their craft deserves fair recognition — not just in the cup, but in the price they receive for their work.",
      "OCC operates on a direct trade model wherever possible. We pay above market rate for exceptional lots. We build relationships that last beyond a single harvest. Because a supply chain built on shortcuts produces exactly that — shortcuts in the cup.",
    ],
  },
  {
    title: "Traceability Protocol",
    paragraphs: [
      "Every batch that leaves our roastery carries a complete record — farm coordinates, processing method, roast date, and cupping score. This is not compliance documentation. It is our commitment to accountability at every stage of the supply chain.",
      "For our wholesale partners, this means you can answer every question your customers ask about what's in their cup. For us, it means we answer for everything — exactly as we promised.",
    ],
  },
  {
    title: "Environmental Commitment",
    paragraphs: [
      "Specialty coffee and environmental responsibility are not in conflict — they are dependent on each other. The highland ecosystems of Mondulkiri and Ratanakiri that produce Cambodia's finest arabica are fragile. Protecting them is not a corporate initiative. It is a prerequisite for everything we do.",
      "We prioritize suppliers who practice shade-grown cultivation, water conservation, and responsible land management. Not because it makes for good marketing. Because without healthy farms, there is no story worth telling.",
    ],
  },
]

export default function SustainabilityPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(originSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <AboutInstitutionalTemplate
        index="04"
        title="SUSTAINABILITY"
        subtitle="ETHICAL SOURCING AND TRACEABILITY PROTOCOL."
        lead={[
          "Perfection is not a destination. It applies to everything — including how we source.",
          "A cup is only as honest as the chain behind it. We built ours to withstand scrutiny at every link.",
        ]}
        sections={sections}
        closing={[
          "Settle for nothing. Answer for everything.",
          "This is what that means in practice — from the farm to the roastery, from the roastery to your cup. If you're looking for a coffee partner who holds their supply chain to the same standard as their roast profiles, you're in the right place.",
        ]}
        next={{
          href: "/solutions",
          label: "Solutions",
          description: "Explore Our Solutions",
        }}
      />
    </>
  )
}
