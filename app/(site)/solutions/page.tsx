import { Metadata } from "next"
import { SolutionsIndexTemplate } from "@/components/templates/solutions-index-template"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Coffee Solutions Cambodia | Wholesale & Custom Roasting | OCC",
  description:
    "Explore evidence-led OCC coffee solutions for wholesale sourcing, custom roasting and signature drink development, with Cambodia-origin supply and clear B2B processes.",
  alternates: pageAlternates("/solutions"),
  openGraph: {
    title: "Coffee Solutions Cambodia | OCC",
    description:
      "Three clear commercial paths from OCC: ready-to-sell wholesale coffee, made-for-you custom roasting, and Cambodian-market coffee marketing built around signature drink development.",
    url: `${siteUrl}/solutions`,
    type: "website",
  },
}

const services = [
  {
    href: "/solutions/wholesale",
    tag: "Ready-to-Sell",
    title: "Wholesale",
    desc: "Choose an OCC-developed coffee direction for distributors, retailers, hotels, cafés, and B2B partners bringing Cambodian coffee to market.",
  },
  {
    href: "/solutions/roasting-program",
    tag: "Made-for-You",
    title: "Custom Roasting",
    desc: "Build a roast profile around your market, application, customer, and commercial product direction.",
  },
  {
    href: "/solutions/coffee-marketing",
    tag: "Cambodian Market",
    title: "Coffee Marketing",
    desc: "Turn the menu you already have into a signature drink customers remember, talk about, and return for.",
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
