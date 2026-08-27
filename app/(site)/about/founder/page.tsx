import { AboutInstitutionalTemplate } from "@/components/templates/about-institutional-template"
import { siteDescription, siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Founder | Origin Coffee Cambodia - OCC",
  description:
    "The editorial philosophy behind Origin Coffee Cambodia: study Cambodian coffee with evidence, distinguish what is known from what is inferred, and publish limitations clearly.",
  keywords:
    "Origin Coffee Cambodia founder, OCC editorial philosophy, Cambodia coffee research, Fine Robusta research, Coffea canephora research",
  alternates: pageAlternates("/about/founder"),
  openGraph: {
    title: "Founder | Origin Coffee Cambodia - OCC",
    description:
      "The editorial philosophy behind OCC and the question that shaped its research-first approach to Cambodian coffee.",
    url: `${siteUrl}/about/founder`,
    siteName: "Origin Coffee Cambodia",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Founder | Origin Coffee Cambodia - OCC",
    description:
      "Why OCC treats Cambodian coffee as a subject to document, test, and explain rather than a claim to promote.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "OCC Founder — Editorial Philosophy",
  description:
    "The editorial philosophy behind Origin Coffee Cambodia and its evidence-led approach to Cambodian coffee research.",
  url: `${siteUrl}/about/founder`,
  isPartOf: {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: "Origin Coffee Cambodia",
    url: siteUrl,
    description: siteDescription,
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
    q: "Why was OCC created?",
    a: "OCC was created because reliable information about Cambodian coffee is scattered across research papers, standards documents, local reporting, industry records, and field observations. The project brings those sources into a clearer editorial framework without pretending that incomplete evidence is complete.",
  },
  {
    q: "What is the editorial philosophy behind OCC?",
    a: "Separate evidence from inference. Date numerical claims. Identify geographic scope. Prefer primary sources where possible. State uncertainty and limitations instead of smoothing them away.",
  },
  {
    q: "What does OCC focus on?",
    a: "Cambodian coffee, Fine Robusta, Coffea canephora, genetics, climate, processing, drying, roasting, brewing, sensory evaluation, quality standards, traceability, and the evidence used to describe emerging coffee origins.",
  },
]

const sections = [
  {
    title: "The Question",
    paragraphs: [
      "The project began with a simple question: how much of what is repeated about Cambodian coffee is actually documented, and how much is assumption? Answering that question requires more than tasting notes or origin storytelling. It requires dates, methods, standards, local context, and a willingness to leave some questions open.",
    ],
  },
  {
    title: "Editorial Standard",
    paragraphs: [
      "OCC treats accuracy as an editorial practice. A production figure needs a year and scope. A sensory claim needs a method or clear attribution. A study from another species or country can provide context, but it should not be presented as direct evidence for Cambodian canephora.",
      "This approach is deliberately cautious because emerging origins are easy to overdescribe. Credibility grows when the boundary between evidence and interpretation stays visible.",
    ],
  },
  {
    title: "What Comes Next",
    paragraphs: [
      "The long-term goal is a stronger evidence base for Cambodian coffee: better source mapping, more primary research, clearer standards interpretation, and eventually more first-party datasets that can be examined rather than merely repeated.",
    ],
  },
]

export default function FounderPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <AboutInstitutionalTemplate
        index="02"
        title="FOUNDER"
        subtitle="THE EDITORIAL PHILOSOPHY BEHIND OCC."
        lead={[
          "OCC began with a research problem, not a product catalogue.",
          "The central question is still the same: what can the available evidence actually support?",
        ]}
        sections={sections}
        faqs={faqs}
        next={{
          href: "/about/manifesto",
          label: "Manifesto",
          description: "Evidence before claims. Context before promotion.",
          note: "A research platform needs a clear rule for what it will and will not claim.",
        }}
      />
    </>
  )
}
