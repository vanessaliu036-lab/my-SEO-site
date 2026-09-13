import { Metadata } from "next"
import { SolutionsIndexTemplate } from "@/components/templates/solutions-index-template"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Coffee Solutions Cambodia | B2B Sourcing & Roasting | OCC",
  description:
    "Explore OCC evidence-led commercial pathways for Cambodia coffee sourcing, roasted coffee supply, roast development, and distribution partnerships.",
  alternates: pageAlternates("/solutions"),
  openGraph: {
    title: "Coffee Solutions Cambodia | OCC",
    description:
      "Evidence-led B2B coffee pathways built around requirements, available evidence, sourcing availability, development, and commercial discussion.",
    url: `${siteUrl}/solutions`,
    type: "website",
  },
}

const services = [
  {
    href: "/solutions/wholesale",
    title: "Wholesale & Sourcing",
    desc: "For buyers evaluating Cambodia-origin green coffee, Fine Robusta, lot evidence, samples, and supply planning.",
  },
  {
    href: "/solutions/roasted-coffee-supply",
    title: "Roasted Coffee Supply",
    desc: "For cafés, hotels, retailers, and operators defining a roasted coffee requirement before supply terms are confirmed.",
  },
  {
    href: "/solutions/roasting-program",
    title: "Roasting Program",
    desc: "For businesses developing a house profile, branded coffee, or application-specific roast through a structured brief and evaluation process.",
  },
  {
    href: "/distribution",
    title: "Distribution Partnership",
    desc: "For importers, distributors, agents, retailers, and hospitality partners evaluating Cambodian coffee for their market.",
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
