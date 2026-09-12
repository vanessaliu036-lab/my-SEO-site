import { Metadata } from "next"
import { SolutionsIndexTemplate } from "@/components/templates/solutions-index-template"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Coffee Solutions Cambodia | B2B Support | OCC",
  description:
    "Explore OCC coffee solutions in Cambodia for wholesale sourcing, roast development, and barista staffing enquiries.",
  alternates: pageAlternates("/solutions"),
  openGraph: {
    title: "Coffee Solutions Cambodia | OCC",
    description:
      "B2B coffee solution areas for sourcing, roasting, and staffing enquiries in Cambodia, with evidence-led due diligence.",
    url: `${siteUrl}/solutions`,
    type: "website",
  },
}

const services = [
  {
    href: "/solutions/wholesale",
    title: "Wholesale",
    desc: "Wholesale sourcing enquiries, buyer requirements, quality evidence, origin documentation, and supplier due diligence.",
  },
  {
    href: "/solutions/roasting-program",
    title: "Roasting Program",
    desc: "Roast-development and white-label enquiries framed around profile, repeatability, capacity, and production-readiness checks.",
  },
  {
    href: "/solutions/barista-staffing",
    title: "Barista Staffing",
    desc: "Barista staffing enquiries with role definition, candidate evaluation, training evidence, and placement-term checks.",
  },
] as const

const hubSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "OCC Coffee Solutions Cambodia",
  url: `${siteUrl}/solutions`,
  hasPart: services.map((s) => ({
    "@type": "WebPage",
    name: s.title,
    url: `${siteUrl}${s.href}`,
  })),
}

export default function SolutionsIndexPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hubSchema) }} />
      <SolutionsIndexTemplate services={services} />
    </>
  )
}
