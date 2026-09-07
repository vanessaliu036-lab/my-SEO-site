import { AboutInstitutionalTemplate } from "@/components/templates/about-institutional-template"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "The Story Behind Origin Coffee Cambodia | OCC",
  description:
    "The story behind Origin Coffee Cambodia: building a stronger identity, higher standard, and clearer path for Cambodian coffee from origin to market.",
  keywords:
    "Origin Coffee Cambodia story, Cambodian coffee origin, Fine Robusta Cambodia, Cambodian coffee sourcing, specialty coffee Cambodia, B2B coffee supply",
  alternates: pageAlternates("/about/founder"),
  openGraph: {
    title: "The Story Behind Origin Coffee Cambodia | OCC",
    description:
      "Cambodian coffee with quality, origin, and ambition behind every cup.",
    url: `${siteUrl}/about/founder`,
    siteName: "Origin Coffee Cambodia",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Story Behind Origin Coffee Cambodia | OCC",
    description: "The story behind a stronger identity and clearer path for Cambodian coffee.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "The Story Behind Origin Coffee Cambodia",
  description:
    "The story behind Origin Coffee Cambodia's work with Cambodian coffee, Fine Robusta, specialty coffee, and professional coffee solutions.",
  url: `${siteUrl}/about/founder`,
  isPartOf: {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Origin Coffee Cambodia",
  },
  mainEntity: {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Origin Coffee Cambodia",
    description:
      "Cambodian coffee, Fine Robusta, Coffea canephora, processing, roasting, sensory evaluation, quality standards, and origin knowledge.",
  },
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "About", item: `${siteUrl}/about` },
    { "@type": "ListItem", position: 3, name: "Founder", item: `${siteUrl}/about/founder` },
  ],
}

const faqs = [
  {
    q: "Why does OCC begin with Robusta?",
    a: "OCC begins with Cambodian Fine Robusta because it is one of the clearest expressions of Cambodia's coffee identity. The aim is not to make Robusta resemble something else, but to understand what it can become when origin and processing are treated with care.",
  },
  {
    q: "What is OCC building?",
    a: "OCC is building a Cambodian coffee company where origin knowledge improves real decisions: what to source, how to evaluate quality, how to develop a roast, and how to create supply that can be understood and repeated.",
  },
  {
    q: "How does OCC use evidence?",
    a: "Evidence is the standard behind OCC's sourcing conversations, quality judgments, roast development, and B2B relationships. When information is incomplete, we define the boundary clearly and keep the decision proportional to what can be supported.",
  },
  {
    q: "What does OCC focus on today?",
    a: "OCC focuses on Cambodian specialty coffee supply, Fine Robusta, B2B sourcing, roasting solutions, and the origin and quality knowledge needed to support professional coffee decisions.",
  },
]

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: {
      "@type": "Answer",
      text: a,
    },
  })),
}

const sections = [
  {
    title: "Where It Began",
    paragraphs: [
      "Origin Coffee Cambodia began with a simple belief: Cambodian coffee deserves to be understood for where it comes from, how it is produced, and what it can become.",
      "Cambodia already has a growing coffee culture, but its local coffee origin has often remained less visible than those of neighboring producing countries.",
      "For OCC, that gap represented an opportunity.",
      "The idea was not simply to create another coffee brand. It was to build a Cambodian coffee company rooted in origin — one that could connect local coffee, professional roasting, quality standards, and better access to the market.",
      "Mondulkiri and the development of Cambodian Robusta became an important part of that journey.",
    ],
  },
  {
    title: "Why Fine Robusta",
    paragraphs: [
      "Robusta has long been part of Southeast Asia's coffee landscape, but quality Robusta is not a contradiction.",
      "When coffee is carefully grown, harvested, processed, evaluated, and roasted, Coffea canephora can express far more quality and complexity than the commodity category usually suggests.",
      "That is why Fine Robusta became one of OCC's central areas of specialization.",
      "For an emerging coffee origin such as Cambodia, this matters.",
      "OCC believes Cambodia should not compete by simply producing more coffee. It has the opportunity to build value through better quality, clearer origin identity, stronger traceability, and coffees that can stand on their own merit.",
      "Our role is to help turn that potential into something buyers, roasters, cafés, distributors, and coffee drinkers can experience and trust.",
    ],
  },
  {
    title: "Building From Cambodia",
    paragraphs: [
      "OCC is being built from Cambodia outward.",
      "Our focus is Cambodian coffee — from origin and processing to roasting, supply, and the final cup.",
      "That means developing deeper relationships with producers and processors, understanding individual lots and harvests, improving the information available around Cambodian coffee, and building coffee programs that can serve both local and international partners.",
      "As the Cambodian coffee sector develops, OCC intends to grow with it.",
      "Not by making Cambodia look larger than it is, but by helping the coffee become better, more traceable, more recognizable, and more valuable.",
      {
        text: "The long-term ambition is clear: to build Origin Coffee Cambodia into a premium Cambodia-origin coffee brand known for Fine Robusta, specialty coffee, and professional coffee solutions — in Cambodia and beyond.",
        strong: true,
      },
    ],
  },
]

export default function FounderPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AboutInstitutionalTemplate
        index="02"
        title="THE STORY BEHIND ORIGIN COFFEE CAMBODIA."
        lead={[
          "Cambodia has a coffee story worth building — with quality, origin, and ambition behind every cup.",
          "OCC was created to give Cambodian coffee a stronger identity, a higher standard, and a clearer path from origin to market.",
        ]}
        leadFirstStrong
        chaptersLabel="A closer look at the story"
        sections={sections}
        faqs={faqs}
        next={{
          href: "/about/manifesto",
          label: "Manifesto",
          description: "The principles behind how OCC approaches quality, origin, sourcing, and coffee.",
        }}
      />
    </>
  )
}
