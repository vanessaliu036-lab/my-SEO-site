import { AboutInstitutionalTemplate } from "@/components/templates/about-institutional-template"
import { siteUrl } from "@/lib/siteConfig"
import { publisherLogoImageObject } from "@/lib/organizationSchema"
import { pageAlternates } from "@/lib/seo"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Manifesto | Origin Coffee Cambodia - OCC",
  description:
    "OCC is building Cambodia's specialty coffee infrastructure from farmer to cup, with training and quality control at every handoff.",
  keywords:
    "barista training Cambodia, skilled barista army, coffee manifesto, OCC manifesto, specialty coffee infrastructure Cambodia, why we never open a cafe, coffee consistency Cambodia",
  alternates: pageAlternates("/about/manifesto"),
  openGraph: {
    title: "Manifesto | Origin Coffee Cambodia - OCC",
    description:
      "The Barista Army Thesis: Why We'll Never Open a Café. Instead of building one great café, we decided to build the people who make great cafés possible.",
    url: `${siteUrl}/about/manifesto`,
    siteName: "Origin Coffee Cambodia",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manifesto | Origin Coffee Cambodia - OCC",
    description:
      "The Barista Army Thesis: Why We'll Never Open a Café. Cambodia doesn't have a coffee problem. It has a consistency problem.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "The Barista Army Thesis: Why We'll Never Open a Café",
  description:
    "Cambodia doesn't have a coffee problem. It has a consistency problem. Instead of building one great café, we decided to build the people who make great cafés possible.",
  url: `${siteUrl}/about/manifesto`,
  author: {
    "@type": "Organization",
    name: "Origin Coffee Cambodia (OCC)",
  },
  publisher: {
    "@type": "Organization",
    name: "Origin Coffee Cambodia (OCC)",
    logo: publisherLogoImageObject(),
  },
  datePublished: "2024-01-15",
  dateModified: "2024-01-15",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${siteUrl}/about/manifesto`,
  },
  keywords:
    "barista training Cambodia, skilled barista army, coffee manifesto, coffee consistency, specialty coffee infrastructure",
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "About", item: `${siteUrl}/about` },
    { "@type": "ListItem", position: 3, name: "Manifesto", item: `${siteUrl}/about/manifesto` },
  ],
}

const faqs = [
  {
    q: "Why will OCC never open a café?",
    a: "Opening a café solves one problem in one location. It does nothing for the industry — nothing for the untrained barista down the street, or the café owner whose coffee tastes different every morning. OCC builds the infrastructure behind great cafés instead of competing with them.",
  },
  {
    q: "What is the Skilled Barista Army?",
    a: "A pipeline, not a training program: free enrollment, intensive education, and placement within businesses that understand what quality means. Every graduate carries OCC's standard with them.",
  },
  {
    q: "What is zero-compromise coffee infrastructure?",
    a: "A system where every link holds: fresh roasts that arrive on time, baristas trained to use them correctly, and service support when something goes wrong. Sourcing from OCC means buying into that system, not just a bag of beans.",
  },
]

const faqSchema = {
  "@context": "https://schema.org",
  // Visible FAQs remain on the page; structured FAQ data is intentionally omitted.
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
}

const sections = [
  {
    title: "The Problem",
    paragraphs: [
      "Cambodia doesn't have a coffee problem. It has a consistency problem. Walk into ten cafés in Phnom Penh. You'll find ten different interpretations of the same bean — some extraordinary, most forgettable. The difference was never the origin. It was the person behind the machine, and whether anyone had ever taught them to care.",
    ],
  },
  {
    title: "Why Not a Café?",
    paragraphs: [
      "Opening a café solves one problem in one location. It creates a great experience for the people who walk through that door. But it does nothing for the industry. Nothing for the barista at the hotel down the street who never had proper training. Nothing for the café owner who can't figure out why her coffee tastes different every morning. Nothing for Cambodia's coffee culture at large.",
    ],
  },
  {
    title: "Skilled Barista Army",
    paragraphs: [
      "So we made a different choice. Instead of building one great café, we decided to build the people who make great cafés possible. The Skilled Barista Army is not a training program. It is a pipeline — from free enrollment, to intensive education, to placement within businesses that understand what quality means. Every graduate carries OCC's standard with them. Every cup they make is an answer to the problem we set out to solve.",
    ],
  },
  {
    title: "Zero-Compromise Infrastructure",
    paragraphs: [
      "When you source from OCC, you're not buying a bag of beans. You're buying into a system. Fresh roasts that arrive on time. Baristas who know exactly what to do with them. Service support when something goes wrong. We call it zero-compromise coffee infrastructure — because every link in the chain has to hold, or the whole thing fails.",
    ],
  },
]

export default function ManifestoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <AboutInstitutionalTemplate
        index="03"
        title="MANIFESTO"
        subtitle="THE BARISTA ARMY THESIS: WHY WE'LL NEVER OPEN A CAFÉ."
        lead={[
          "Everyone who heard our plan told us the same thing: just open a café. It's simpler. It's safer. It's what everyone does.",
          "We said no. Here's why.",
        ]}
        sections={sections}
        closing={[
          "Perfection is not a destination. It is the only direction.",
          "That's why we'll never open a café. Because what we're building is worth more than any single cup — and we're not done yet.",
        ]}
        faqs={faqs}
        next={{
          href: "/about/sustainability",
          label: "Sustainability",
          description: "Ethical sourcing and traceability protocol.",
        }}
      />
    </>
  )
}
