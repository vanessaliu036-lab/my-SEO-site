import { AboutInstitutionalTemplate } from "@/components/templates/about-institutional-template"
import { siteUrl } from "@/lib/siteConfig"
import { publisherLogoImageObject } from "@/lib/organizationSchema"
import { pageAlternates } from "@/lib/seo"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Manifesto | Origin Coffee Cambodia - OCC",
  description:
    "The OCC editorial manifesto: evidence before claims, context before certainty, and transparent limits when research on Cambodian coffee is incomplete.",
  keywords:
    "coffee research manifesto, Cambodia coffee evidence, Fine Robusta research, Coffea canephora standards, coffee editorial principles",
  alternates: pageAlternates("/about/manifesto"),
  openGraph: {
    title: "Manifesto | Origin Coffee Cambodia - OCC",
    description:
      "Evidence before claims. Context before certainty. OCC publishes coffee research without turning every conclusion into promotion.",
    url: `${siteUrl}/about/manifesto`,
    siteName: "Origin Coffee Cambodia",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manifesto | Origin Coffee Cambodia - OCC",
    description:
      "The editorial rules behind OCC's evidence-led work on Cambodian coffee and Coffea canephora.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Evidence Before Claims: The OCC Editorial Manifesto",
  description:
    "Origin Coffee Cambodia's editorial principles for research, standards interpretation, source quality, uncertainty, and transparent limitations.",
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
  dateModified: "2026-08-27",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${siteUrl}/about/manifesto`,
  },
  keywords:
    "Cambodian coffee research, Fine Robusta, Coffea canephora, coffee standards, source quality, research limitations",
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
    q: "Does OCC sell coffee?",
    a: "No. OCC currently operates as an independent coffee information and research platform. Its editorial work is not written to convert readers into product customers.",
  },
  {
    q: "How does OCC decide whether a claim is strong enough to publish?",
    a: "OCC looks for a clear source, date, geographic scope, method, and an appropriate link between the evidence and the conclusion. Where those elements are missing, the uncertainty should remain visible.",
  },
  {
    q: "What happens when research is limited or indirect?",
    a: "Indirect evidence can be useful as context, but OCC labels the limitation. Evidence from another species, origin, processing system, or experimental setup should not be presented as direct proof for Cambodian canephora.",
  },
]

const sections = [
  {
    title: "The Problem",
    paragraphs: [
      "Coffee writing becomes unreliable when repeated language replaces evidence. Emerging origins are especially vulnerable to this because a small number of facts can quickly become generalized into claims about an entire country, species, or quality category.",
      "OCC treats that as an editorial problem. A useful article should show where a claim comes from and how far the evidence can reasonably travel.",
    ],
  },
  {
    title: "Evidence Before Claims",
    paragraphs: [
      "Primary research, official standards, institutional data, dated local records, and clearly attributed field evidence come before unsourced repetition. A citation is not decoration. It should support the specific statement attached to it.",
      "When several sources disagree, the disagreement is part of the story. When a number is old, it should remain old rather than being silently presented as current.",
    ],
  },
  {
    title: "Context Before Certainty",
    paragraphs: [
      "Coffee quality is shaped by genetics, environment, harvest, processing, drying, storage, roasting, brewing, and sensory method. OCC avoids explanations that collapse those variables into a single stereotype about species or origin.",
      "The same discipline applies to Cambodian coffee. Local evidence is preferred when the question is local. International research is used to explain mechanisms or provide comparison, not to manufacture certainty where Cambodia-specific data do not yet exist.",
    ],
  },
  {
    title: "What We Will Not Do",
    paragraphs: [
      "OCC will not turn an editorial conclusion into a disguised sales recommendation. It will not present a marketing term as a standard, a supplier claim as independent proof, or a limited case study as a province-wide fact.",
      "Authority is built by showing the boundary of the evidence, not by pretending the boundary is not there.",
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
          "A research platform earns trust by making the basis of its conclusions visible.",
          "That means being precise about what is known, what is inferred, and what still needs to be studied.",
        ]}
        sections={sections}
        closing={[
          "Accuracy is not certainty at any cost.",
          "Sometimes the most accurate conclusion is that the evidence is not yet strong enough. OCC will keep that answer available.",
        ]}
        faqs={faqs}
        next={{
          href: "/about/sustainability",
          label: "Sustainability",
          description: "How OCC evaluates sustainability and traceability evidence.",
        }}
      />
    </>
  )
}
