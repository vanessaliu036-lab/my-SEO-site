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
        title="MANIFESTO"
        subtitle="QUALITY IS A SYSTEM."
        lead={[
          "We do not believe better coffee comes from one impressive bean, one roast profile, or one skilled barista.",
          "It comes from a system that makes quality repeatable from Cambodian origin and sourcing through roasting, preparation, and service.",
        ]}
        sections={sections}
        closing={[
          "Zero compromise does not mean pretending perfection exists. It means taking responsibility for the variables we can control and refusing to let convenience replace standards.",
          "OCC exists to strengthen the coffee behind the business: Cambodia specialty coffee supply, Fine Robusta expertise, and B2B roasting solutions built for consistency.",
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
