import { Metadata } from "next"
import { SolutionsIndexTemplate } from "@/components/templates/solutions-index-template"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Solutions | OCC — Wholesale, Roasting, Staffing, Equipment",
  description:
    "Coffee solutions in Cambodia: wholesale supply, custom roasting program, barista staffing, and commercial equipment service.",
  alternates: pageAlternates("/solutions"),
  openGraph: {
    title: "Solutions | OCC",
    description: "Wholesale, roasting, staffing, and equipment for Cambodia's coffee industry.",
    url: `${siteUrl}/solutions`,
    type: "website",
  },
}

const services = [
  {
    href: "/solutions/wholesale",
    title: "Wholesale",
    desc: "Direct-origin beans, flexible delivery, account management.",
  },
  {
    href: "/solutions/roasting-program",
    title: "Roasting Program",
    desc: "Custom profiles, white-label, and batch consistency.",
  },
  {
    href: "/solutions/barista-staffing",
    title: "Barista Staffing",
    desc: "Trained baristas for venues, offices, and events.",
  },
  {
    href: "/solutions/equipment-service",
    title: "Equipment Service",
    desc: "Installation, maintenance, and emergency repair.",
  },
] as const

const hubSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "OCC Solutions",
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
