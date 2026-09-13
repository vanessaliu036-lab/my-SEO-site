import { Metadata } from "next"
import { AboutEditorialTemplate } from "@/components/templates/about-editorial-template"
import { siteUrl, siteLogoUrl, siteDescription, ogImage } from "@/lib/siteConfig"
import { areaServedCambodia } from "@/lib/organizationSchema"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "About OCC | Cambodia-Origin Coffee & Fine Robusta",
  description:
    "About Origin Coffee Cambodia: a Cambodia-origin specialty coffee company and Fine Robusta specialist connecting origin evidence with sourcing, roasted supply, roast development, and market access.",
  keywords:
    "Origin Coffee Cambodia, OCC, Cambodia coffee, Fine Robusta Cambodia, Cambodian coffee origin, Cambodia coffee sourcing, roasted coffee supply Cambodia, coffee roasting Cambodia, coffee distribution Cambodia",
  openGraph: {
    title: "About OCC | Cambodia-Origin Coffee & Fine Robusta",
    description:
      "Origin Coffee Cambodia is built around one origin — Cambodia — with Fine Robusta expertise, traceable evidence, coffee supply, roast development, and market access.",
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
    title: "About OCC | Cambodia-Origin Coffee & Fine Robusta",
    description:
      "Cambodia-origin coffee, Fine Robusta expertise, origin evidence, supply, roast development, and market access from OCC.",
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
    "Cambodian Coffee",
    "Fine Robusta",
    "Coffea canephora",
    "Coffee Sourcing",
    "Wholesale Coffee",
    "Roasted Coffee Supply",
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
    "About OCC's Cambodia-origin positioning, Fine Robusta expertise, origin evidence, coffee supply, roast development, and market access.",
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
    desc: "Why OCC keeps Cambodia at the center while building clearer quality, supply, and market pathways around the coffee.",
  },
  {
    title: "Founder",
    href: "/about/founder",
    desc: "The operating philosophy behind OCC's focus on Cambodia, Fine Robusta, evidence, and commercially useful coffee decisions.",
  },
  {
    title: "Manifesto",
    href: "/about/manifesto",
    desc: "The principles behind origin integrity, Fine Robusta quality, evidence before promise, and long-term market building.",
  },
  {
    title: "Sustainability",
    href: "/about/sustainability",
    desc: "How OCC treats sustainability, traceability, and origin claims as responsibilities that require evidence and scope.",
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
