import { AboutInstitutionalTemplate } from "@/components/templates/about-institutional-template"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "OCC Manifesto | Coffee Quality Principles",
  description:
    "The OCC manifesto defines how Origin Coffee Cambodia approaches quality as a system, Fine Robusta standards, supplier accountability, and repeatable B2B coffee programs.",
  keywords:
    "OCC manifesto, Origin Coffee Cambodia manifesto, coffee quality principles, Fine Robusta standards, supplier accountability, B2B coffee principles",
  alternates: pageAlternates("/about/manifesto"),
  openGraph: {
    title: "OCC Manifesto | Coffee Quality Principles",
    description:
      "Quality is a system. OCC's manifesto sets out its principles on Fine Robusta standards, supplier accountability, and repeatable coffee quality.",
    url: `${siteUrl}/about/manifesto`,
    siteName: "Origin Coffee Cambodia",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OCC Manifesto | Coffee Quality Principles",
    description:
      "OCC's principles on coffee quality as a system, Fine Robusta standards, and supplier accountability.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "OCC Manifesto: Quality Is a System",
  description:
    "Origin Coffee Cambodia's manifesto on coffee quality as a system, Fine Robusta standards, supplier accountability, and repeatable B2B coffee programs.",
  url: `${siteUrl}/about/manifesto`,
  about: {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Origin Coffee Cambodia",
    url: siteUrl,
  },
  mainEntity: {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Origin Coffee Cambodia",
  },
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
    q: "What does the OCC manifesto stand for?",
    a: "OCC believes coffee quality is a system. Origin, processing, sourcing, roasting, brewing, people, equipment, and service all affect whether quality can be repeated consistently.",
  },
  {
    q: "Why does OCC not build its identity around operating a café?",
    a: "One café can control quality in one location. OCC is built to support many coffee businesses through supply, roasting, training, and operational support, so its impact is not limited to a single venue.",
  },
  {
    q: "How does Fine Robusta fit into OCC's manifesto?",
    a: "OCC treats Fine Robusta as a specialist quality category rather than a lower-grade substitute for Arabica. Better selection, processing, evaluation, roasting, and buyer understanding can create more useful and more valuable Cambodian Robusta coffee.",
  },
]

const sections = [
  {
    title: "Quality Is a System",
    paragraphs: [
      "Origin Coffee Cambodia is a Cambodia specialty coffee supplier and Fine Robusta specialist focused on B2B coffee supply and roasting solutions. We believe good coffee is not created at one point in the chain.",
      "Origin matters. Processing matters. Sourcing matters. Roasting matters. Brewing matters. People and equipment matter. Quality only becomes meaningful when those parts work together consistently from the first sample to the cup served to a customer.",
    ],
  },
  {
    title: "Why We Will Not Build Our Identity Around a Café",
    paragraphs: [
      "Opening a café would be an easy way to demonstrate our coffee in one controlled environment. But one excellent café solves quality in one location, and that is not the problem OCC is built to solve.",
      "We would rather strengthen the coffee programs behind cafés, hotels, restaurants, offices, and hospitality businesses. Our customers build the experience. OCC helps make the coffee inside that experience more dependable through supply, roasting, training, and operational support.",
    ],
  },
  {
    title: "Fine Robusta Deserves Better Standards",
    paragraphs: [
      "Robusta should not be defined by the lowest-quality examples of the category. Cambodia's Coffea canephora sector has room to create greater value when better cherry selection, processing, drying, sorting, sensory evaluation, and roasting are applied with discipline.",
      "For OCC, Fine Robusta is not a substitute for Arabica and not a marketing label. It is a field of specialization that connects Cambodian origin, measurable quality, roast development, and real buyer applications.",
    ],
  },
  {
    title: "Supply Means Accountability",
    paragraphs: [
      "Supplying coffee is not only about delivering bags. A professional supplier should be accountable for consistency, appropriate quality, clear communication, useful specifications, roasting decisions, and the support required for the coffee to perform in the buyer's operation.",
      "That is why OCC connects Cambodian coffee supply with roasting solutions and practical B2B support. We are not trying to become everything in coffee. We are building around three clear roles: Cambodia specialty coffee supplier, Fine Robusta specialist, and B2B coffee supply plus roasting solutions.",
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
        title="OCC MANIFESTO"
        subtitle="EVIDENCE BEFORE CLAIMS. QUALITY IS A SYSTEM."
        lead={[
          "The OCC Manifesto defines how Origin Coffee Cambodia approaches coffee quality: evidence before claims, stronger Fine Robusta standards, supplier accountability, and repeatable B2B coffee programs.",
          "Our position is simple: better coffee comes from a system that connects origin, processing, sourcing, roasting, preparation, people, and operational discipline—not from one isolated claim or one impressive component.",
        ]}
        sections={sections}
        closing={[
          "Zero compromise does not mean pretending perfection exists. It means taking responsibility for the variables we can control and refusing to let convenience replace standards.",
          "OCC exists to strengthen the coffee behind the business: Cambodia specialty coffee supply, Fine Robusta expertise, and B2B roasting solutions built for consistency.",
        ]}
        faqs={faqs}
        next={{
          href: "/solutions/roasting-program",
          label: "Roasting Program",
          description: "See how OCC turns quality principles into a structured roast-development pathway for professional coffee programs.",
        }}
      />
    </>
  )
}
