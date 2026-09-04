import { AboutInstitutionalTemplate } from "@/components/templates/about-institutional-template"
import { siteUrl } from "@/lib/siteConfig"
import { publisherLogoImageObject } from "@/lib/organizationSchema"
import { pageAlternates } from "@/lib/seo"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Manifesto | Origin Coffee Cambodia - OCC",
  description:
    "OCC's editorial manifesto: evidence before claims, context before conclusions, and transparent uncertainty in Cambodian coffee and Fine Robusta research.",
  keywords:
    "OCC manifesto, Cambodian coffee research, evidence-led coffee editorial, Fine Robusta research, coffee quality evidence, origin research methodology",
  alternates: pageAlternates("/about/manifesto"),
  openGraph: {
    title: "Manifesto | Origin Coffee Cambodia - OCC",
    description:
      "Evidence before claims. Context before conclusions. Transparent uncertainty when the available record is incomplete.",
    url: `${siteUrl}/about/manifesto`,
    siteName: "Origin Coffee Cambodia",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manifesto | Origin Coffee Cambodia - OCC",
    description:
      "The principles behind OCC's evidence-led research and technical editorial on Cambodian coffee.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Evidence Before Claims: The OCC Editorial Manifesto",
  description:
    "The principles behind OCC's evidence-led research and technical editorial on Cambodian coffee, Fine Robusta, quality, processing, and origin evidence.",
  url: `${siteUrl}/about/manifesto`,
  author: {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Origin Coffee Cambodia",
  },
  publisher: {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Origin Coffee Cambodia",
    logo: publisherLogoImageObject(),
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${siteUrl}/about/manifesto`,
  },
  keywords:
    "Cambodian coffee research, Fine Robusta research, coffee quality evidence, origin research, technical editorial",
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
    q: "What does evidence before claims mean at OCC?",
    a: "It means the strength of a statement should match the strength of its source. Historical records are labeled historical, current standards are dated, and country-level conclusions are not inferred from one lot or one anecdote.",
  },
  {
    q: "Why does OCC separate context from conclusions?",
    a: "Coffee quality depends on interacting variables such as genetics, environment, processing, storage, roasting, brewing, and sensory method. Context prevents one variable from being treated as a universal explanation.",
  },
  {
    q: "How does OCC handle incomplete evidence?",
    a: "OCC states the uncertainty, identifies what is missing, and avoids filling the gap with invented precision. A research gap is treated as a finding, not as permission to guess.",
  },
]

const sections = [
  {
    title: "Evidence Before Claims",
    paragraphs: [
      "A confident sentence is not automatically a strong sentence. OCC gives more weight to a claim only when the underlying evidence justifies it.",
      "That means distinguishing primary sources from commentary, current standards from historical frameworks, and repeatable evidence from isolated examples.",
    ],
  },
  {
    title: "Context Before Conclusions",
    paragraphs: [
      "Coffee is a multi-variable system. Species does not determine flavor by itself. Origin does not guarantee quality. Processing terminology does not describe every operational detail. A useful explanation keeps those dependencies visible.",
    ],
  },
  {
    title: "Transparent Uncertainty",
    paragraphs: [
      "When the record is incomplete, OCC says so. Unknown is not a weakness in technical editorial; pretending the unknown is settled is.",
      "This is especially important for Cambodian coffee, where public evidence can be fragmented and where emerging-origin narratives can move faster than documented production data.",
    ],
  },
  {
    title: "Correction Is Part of the Work",
    paragraphs: [
      "Standards change, institutions change, and better evidence can overturn earlier assumptions. OCC treats correction as maintenance of the knowledge base rather than as a failure of authority.",
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
        subtitle="EVIDENCE BEFORE CLAIMS."
        lead={[
          "The purpose of research is not to make every statement sound certain.",
          "It is to make clear what is known, how it is known, and where the evidence stops.",
        ]}
        sections={sections}
        closing={[
          "Precision includes the boundary of the claim.",
          "OCC would rather publish a narrower conclusion that can be defended than a stronger story that cannot.",
        ]}
        faqs={faqs}
        next={{
          href: "/about/sustainability",
          label: "Sustainability",
          description: "Evidence, documentation, and the boundaries of sustainability claims.",
        }}
      />
    </>
  )
}
