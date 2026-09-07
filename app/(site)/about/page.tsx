import { Metadata } from "next"
import { AboutEditorialTemplate } from "@/components/templates/about-editorial-template"
import { siteUrl, siteLogoUrl, siteDescription, ogImage } from "@/lib/siteConfig"
import { areaServedCambodia } from "@/lib/organizationSchema"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "About OCC | Fine Robusta, Coffee Sourcing & B2B Solutions",
  description:
    "About Origin Coffee Cambodia: connecting Cambodian coffee and Fine Robusta with sourcing, roasting, B2B supply, traceability, and quality-focused solutions.",
  keywords:
    "Origin Coffee Cambodia, OCC, Fine Robusta Cambodia, Cambodia coffee sourcing, Cambodia coffee supplier, B2B coffee Cambodia, Mondulkiri coffee, coffee quality authority, coffee roasting Cambodia",
  openGraph: {
    title: "About OCC | Fine Robusta, Coffee Sourcing & B2B Solutions",
    description:
      "Origin Coffee Cambodia connects Cambodian coffee and Fine Robusta with sourcing, roasting, B2B supply, traceability, and origin-led coffee knowledge.",
    url: `${siteUrl}/about`,
    siteName: "Origin Coffee Cambodia",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: ogImage,
        width: 1672,
        height: 941,
        alt: "Origin Coffee Cambodia - OCC About Page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About OCC | Fine Robusta, Coffee Sourcing & B2B Solutions",
    description:
      "Cambodian coffee and Fine Robusta authority supporting sourcing, roasting, B2B supply, traceability, and professional coffee decisions.",
    images: [ogImage],
  },
  alternates: pageAlternates("/about"),
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "Origin Coffee Cambodia",
  alternateName: "OCC",
  url: siteUrl,
  logo: siteLogoUrl,
  description: siteDescription,
  areaServed: areaServedCambodia,
  knowsAbout: [
    "Fine Robusta",
    "Coffea canephora",
    "Cambodian Coffee",
    "Coffee Sourcing",
    "Wholesale Coffee",
    "Coffee Processing",
    "Coffee Roasting",
    "Coffee Sensory Evaluation",
    "Coffee Quality Standards",
    "Coffee Traceability",
    "Mondulkiri Coffee",
  ],
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "About",
      item: `${siteUrl}/about`,
    },
  ],
}

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Origin Coffee Cambodia",
  description:
    "About OCC's Cambodia coffee and Fine Robusta authority, sourcing and B2B coffee focus, quality systems, roasting, traceability, and clear operating standards.",
  url: `${siteUrl}/about`,
  mainEntity: {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Origin Coffee Cambodia",
    description: siteDescription,
  },
}

const sections = [
  {
    title: "Mission",
    href: "/about/mission",
    desc: "Why OCC connects better coffee supply with quality authority and professional capability in Cambodia.",
  },
  {
    title: "Founder",
    href: "/about/founder",
    desc: "The story behind OCC's Cambodia-first approach to coffee, quality, and supply.",
  },
  {
    title: "Manifesto",
    href: "/about/manifesto",
    desc: "The principles behind quality, origin, sourcing clarity, and professional coffee decisions.",
  },
  {
    title: "Sustainability",
    href: "/about/sustainability",
    desc: "How OCC approaches sustainability and traceability with clear documentation and scope.",
  },
]

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }} />
      <AboutEditorialTemplate sections={sections} />
    </>
  )
}
