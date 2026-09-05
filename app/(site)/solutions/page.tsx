import { Metadata } from "next"
import { SolutionsIndexTemplate } from "@/components/templates/solutions-index-template"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Coffee Solutions Cambodia | Wholesale, Roasting & B2B Support | OCC",
  description:
    "Explore OCC coffee solutions in Cambodia for wholesale sourcing, roast development, barista staffing, and equipment-service enquiries, with evidence-led requirement scoping and due diligence.",
  alternates: pageAlternates("/solutions"),
  openGraph: {
    title: "Coffee Solutions Cambodia | OCC",
    description:
      "B2B coffee solution areas for sourcing, roasting, staffing, and equipment-service enquiries in Cambodia, supported by evidence-led requirement scoping and due diligence.",
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
  {
    href: "/solutions/equipment-service",
    title: "Equipment Service",
    desc: "Equipment-service enquiries with model coverage, maintenance scope, parts support, response terms, and vendor due diligence.",
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
