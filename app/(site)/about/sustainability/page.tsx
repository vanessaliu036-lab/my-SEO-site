import { AboutInstitutionalTemplate } from "@/components/templates/about-institutional-template"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sustainability & Traceability Research | Origin Coffee Cambodia",
  description:
    "How OCC evaluates sustainability, traceability, producer-economics, and environmental claims in Cambodian coffee: source quality, scope, documentation, and research limits.",
  keywords:
    "Cambodia coffee sustainability research, coffee traceability evidence, producer economics coffee, sustainable coffee Cambodia, coffee environmental research, Mondulkiri coffee traceability",
  alternates: pageAlternates("/about/sustainability"),
  openGraph: {
    title: "Sustainability & Traceability Research | OCC",
    description:
      "A research framework for evaluating sustainability and traceability claims in Cambodian coffee without treating marketing language as evidence.",
    url: `${siteUrl}/about/sustainability`,
    siteName: "Origin Coffee Cambodia",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sustainability & Traceability Research | OCC",
    description:
      "How OCC evaluates evidence behind coffee sustainability, traceability, producer-economics, and environmental claims.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "OCC Sustainability and Traceability Research Framework",
  description:
    "How Origin Coffee Cambodia evaluates sustainability, traceability, producer-economics, and environmental evidence in coffee research.",
  url: `${siteUrl}/about/sustainability`,
  about: [
    { "@type": "Thing", name: "Coffee sustainability" },
    { "@type": "Thing", name: "Coffee traceability" },
    { "@type": "Thing", name: "Producer economics" },
    { "@type": "Thing", name: "Coffee environmental impact" },
    { "@type": "Thing", name: "Cambodian coffee" },
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

const faqs = [
  {
    q: "Does OCC claim that Cambodian coffee is automatically sustainable?",
    a: "No. Sustainability is not a property that can be inferred from country, farm size, species, or a marketing label alone. OCC looks for documented practices, dates, scope, measurable outcomes, and independent or clearly attributed evidence.",
  },
  {
    q: "How does OCC evaluate coffee traceability claims?",
    a: "A strong traceability claim should identify what is being traced, which records exist, who maintains them, how lots are separated, and where the chain of documentation begins and ends. A place name by itself is not full traceability.",
  },
  {
    q: "How does OCC cover farmer income or producer economics?",
    a: "Producer-economics claims require dated price information, a clear unit of measure, production or cost context, and geographic scope. OCC avoids converting a single farm example into a claim about an entire province or country.",
  },
  {
    q: "What evidence is useful for environmental claims?",
    a: "Peer-reviewed research, field measurements, government or institutional datasets, documented farm-management records, and clearly described methods can all contribute. The strength of the conclusion depends on the quality and representativeness of the evidence.",
  },
]

const sections = [
  {
    title: "Sustainability Is a Research Question",
    paragraphs: [
      "Words such as sustainable, ethical, regenerative, shade-grown, and direct trade can describe meaningful practices, but the words themselves are not evidence. OCC treats sustainability as a set of questions that need definition, scope, and documentation.",
      "The first step is to ask what outcome is being claimed: higher producer income, lower water use, forest retention, reduced chemical inputs, better soil condition, lower emissions, stronger traceability, or something else. Different claims require different evidence.",
    ],
  },
  {
    title: "Traceability Evidence",
    paragraphs: [
      "Traceability can range from a country-level origin statement to a documented link between farm, harvest, processing unit, lot code, storage, and evaluation record. OCC distinguishes these levels instead of treating all origin information as equivalent.",
      "Useful documentation may include lot identifiers, harvest dates, processing records, producer or cooperative records, physical quality data, sensory records, and chain-of-custody information. The absence of one document does not automatically invalidate an origin claim, but the limitation should be visible.",
    ],
  },
  {
    title: "Producer Economics",
    paragraphs: [
      "Price alone does not describe farmer welfare. A meaningful economic analysis may also need yield, labor, input costs, processing responsibility, payment timing, quality premiums, rejected volume, and household or farm-level context.",
      "For Cambodia, where public datasets can be sparse or uneven, OCC dates numerical claims and avoids treating a small sample as a national benchmark.",
    ],
  },
  {
    title: "Environmental Evidence",
    paragraphs: [
      "Environmental conclusions should be tied to measured variables where possible. Shade, soil moisture, water use, biodiversity, wastewater, land management, and climate exposure are separate questions and should not be collapsed into a single sustainability score without a transparent method.",
      "OCC uses international coffee research to explain mechanisms, but Cambodia-specific conclusions are reserved for Cambodia-specific evidence or clearly labelled field observations.",
    ],
  },
]

export default function SustainabilityPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <AboutInstitutionalTemplate
        index="04"
        title="SUSTAINABILITY"
        subtitle="HOW OCC EVALUATES SUSTAINABILITY AND TRACEABILITY EVIDENCE."
        lead={[
          "Sustainability claims deserve the same scrutiny as quality claims.",
          "OCC separates labels from evidence and asks what was measured, where, when, and by whom.",
        ]}
        sections={sections}
        closing={[
          "A credible sustainability statement has boundaries.",
          "The job of research is to make those boundaries visible so readers can distinguish documented practice from assumption.",
        ]}
        faqs={faqs}
        next={{
          href: "/blog",
          label: "Journal",
          description: "Explore OCC research and technical editorial.",
        }}
      />
    </>
  )
}
