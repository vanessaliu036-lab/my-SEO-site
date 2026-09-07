import { AboutInstitutionalTemplate } from "@/components/templates/about-institutional-template"
import { siteUrl } from "@/lib/siteConfig"
import { publisherLogoImageObject } from "@/lib/organizationSchema"
import { pageAlternates } from "@/lib/seo"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Manifesto | Origin Coffee Cambodia - OCC",
  description:
    "OCC's coffee manifesto: quality before assumption, origin before generalisation, and clear standards across Cambodian coffee and Fine Robusta.",
  keywords:
    "OCC manifesto, Cambodian coffee, Fine Robusta Cambodia, coffee quality standards, coffee sourcing, coffee origin clarity",
  alternates: pageAlternates("/about/manifesto"),
  openGraph: {
    title: "Manifesto | Origin Coffee Cambodia - OCC",
    description:
      "Quality before assumption. Origin before generalisation. Clear standards from coffee origin to final cup.",
    url: `${siteUrl}/about/manifesto`,
    siteName: "Origin Coffee Cambodia",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manifesto | Origin Coffee Cambodia - OCC",
    description:
      "The principles behind OCC's approach to quality, origin, sourcing, and coffee.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Quality, Origin, and the OCC Coffee Manifesto",
  description:
    "The principles behind OCC's approach to Cambodian coffee, Fine Robusta, quality, processing, and origin.",
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
    "Cambodian coffee, Fine Robusta, coffee quality, coffee origin, coffee sourcing, coffee processing",
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
    q: "What does quality before assumption mean at OCC?",
    a: "It means coffee quality should be connected to how the coffee was grown, processed, evaluated, roasted, and prepared rather than assumed from a name, category, or origin label alone.",
  },
  {
    q: "Why does OCC keep origin context visible?",
    a: "Coffee is shaped by interacting variables such as genetics, environment, processing, storage, roasting, brewing, and sensory method. Origin context keeps one variable from being treated as the whole story.",
  },
  {
    q: "How does OCC handle incomplete information?",
    a: "OCC states what is known, identifies what is missing, and avoids turning an incomplete coffee record into a promise that cannot be supported.",
  },
]

const sections = [
  {
    title: "Quality Before Assumption",
    paragraphs: [
      "A confident coffee description is not automatically a useful one. OCC connects quality to the stages that shape the final cup.",
      "Growing conditions, harvest, processing, storage, roasting, and preparation all contribute to how a coffee performs.",
    ],
  },
  {
    title: "Origin Before Generalisation",
    paragraphs: [
      "Cambodian coffee should be understood through its own origin, production, processing, and market context. One lot, region, or story should not stand in for an entire category.",
    ],
  },
  {
    title: "Clarity in the Supply Chain",
    paragraphs: [
      "Clear information makes coffee easier to source, roast, serve, distribute, and trust.",
      "OCC keeps origin, processing, quality, sourcing, and supply conversations connected without making them larger than the information can support.",
    ],
  },
  {
    title: "Improvement Is Part of the Work",
    paragraphs: [
      "Coffee programs improve through better standards, clearer communication, stronger relationships, and repeatable work from origin to final cup.",
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
        subtitle="QUALITY, ORIGIN, AND HOW OCC APPROACHES COFFEE."
        lead={[
          "Good coffee begins with clear standards.",
          "OCC approaches quality, origin, sourcing, and coffee as connected parts of the same work.",
        ]}
        sections={sections}
        closing={[
          "Clear standards make better coffee easier to build.",
          "OCC focuses on the details that help Cambodian coffee become more recognizable, more dependable, and more valuable.",
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
