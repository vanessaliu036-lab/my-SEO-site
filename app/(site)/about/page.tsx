import { Metadata } from "next"
import { AboutEditorialTemplate } from "@/components/templates/about-editorial-template"
import { siteUrl, siteLogoUrl, siteDescription } from "@/lib/siteConfig"
import { areaServedCambodia } from "@/lib/organizationSchema"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "About OCC | Fine Robusta, Coffee Sourcing & B2B Solutions",
  description:
    "About Origin Coffee Cambodia: a professional coffee company connecting Cambodian coffee and Fine Robusta authority with sourcing, roasting, B2B supply, traceability, and quality-focused coffee solutions.",
  keywords:
    "Origin Coffee Cambodia, OCC, Fine Robusta Cambodia, Cambodia coffee sourcing, Cambodia coffee supplier, B2B coffee Cambodia, Mondulkiri coffee, coffee quality authority, coffee roasting Cambodia",
  openGraph: {
    title: "About OCC | Fine Robusta, Coffee Sourcing & B2B Solutions",
    description:
      "Origin Coffee Cambodia connects Cambodian coffee authority with sourcing, roasting, B2B supply, traceability, quality systems, and evidence-led coffee knowledge.",
    url: `${siteUrl}/about`,
    siteName: "Origin Coffee Cambodia",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteUrl}/images/about-og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Origin Coffee Cambodia - OCC About Page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About OCC | Fine Robusta, Coffee Sourcing & B2B Solutions",
    description:
      "Cambodian coffee and Fine Robusta authority supporting sourcing, roasting, B2B supply, traceability, and professional coffee decisions.",
    images: [`${siteUrl}/images/about-twitter-card.jpg`],
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
    "About OCC's Cambodia coffee and Fine Robusta authority, sourcing and B2B coffee focus, quality systems, roasting, traceability, and evidence standards.",
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
    desc: "The operating and evidence philosophy behind OCC's approach to Cambodian coffee.",
  },
  {
    title: "Manifesto",
    href: "/about/manifesto",
    desc: "The principles behind quality, evidence, sourcing clarity, and professional coffee decisions.",
  },
  {
    title: "Sustainability",
    href: "/about/sustainability",
    desc: "How OCC treats sustainability and traceability as claims that require evidence and scope.",
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
