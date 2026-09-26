import { Metadata } from "next"
import { SolutionsIndexTemplate } from "@/components/templates/solutions-index-template"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Coffee Solutions Cambodia | Wholesale, Roasting & Hospitality | OCC",
  description:
    "Explore evidence-led OCC coffee solutions for wholesale sourcing, custom roasting, hotel coffee programs, distribution partnerships, and market development built around Cambodia-origin coffee.",
  alternates: pageAlternates("/solutions"),
  openGraph: {
    title: "Coffee Solutions Cambodia | OCC",
    description:
      "Commercial paths from OCC: ready-to-sell wholesale coffee, made-for-you custom roasting, hospitality programs, distribution partnerships, and Cambodian-market coffee development.",
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
  {
    href: "/solutions/hotels",
    tag: "Hospitality",
    title: "Hotel Coffee Program",
    desc: "Source roasted Cambodian coffee for hotel service or develop a custom flavor and roast profile around your guests, menu, equipment, and brand direction.",
  },
  {
    href: "/distribution",
    tag: "International Markets",
    title: "Distribution Partnerships",
    desc: "For importers and regional distributors assessing Cambodia-origin coffee for established retail, hospitality, and specialty channels.",
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
