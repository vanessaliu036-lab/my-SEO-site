import { Metadata } from "next"
import { AboutEditorialTemplate } from "@/components/templates/about-editorial-template"
import { siteDescription, siteUrl, siteLogoUrl } from "@/lib/siteConfig"
import { areaServedCambodia } from "@/lib/organizationSchema"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "About OCC | Independent Coffee Research Platform",
  description:
    "Origin Coffee Cambodia (OCC) is an independent coffee information and research platform publishing evidence-led work on Cambodian coffee, Fine Robusta, Coffea canephora, processing, roasting, sensory evaluation, and quality standards.",
  keywords:
    "Cambodia coffee research, Fine Robusta research, Coffea canephora Cambodia, coffee quality standards, coffee processing research, coffee sensory evaluation, Mondulkiri coffee research",
  openGraph: {
    title: "About OCC | Origin Coffee Cambodia",
    description:
      "Independent coffee information and research focused on Cambodian coffee, Fine Robusta, canephora quality, processing, roasting, sensory evaluation, and standards.",
    url: `${siteUrl}/about`,
    siteName: "Origin Coffee Cambodia",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteUrl}/images/about-og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Origin Coffee Cambodia research platform"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "About OCC | Origin Coffee Cambodia",
    description: "Independent, evidence-led coffee research and editorial focused on Cambodia and Coffea canephora.",
    images: [`${siteUrl}/images/about-twitter-card.jpg`]
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
    "Coffee Quality Standards",
    "Coffee Processing",
    "Coffee Fermentation",
    "Coffee Drying",
    "Coffee Roasting",
    "Coffee Sensory Evaluation",
    "Mondulkiri Coffee",
    "Coffee Origin Research"
  ]
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "About", item: `${siteUrl}/about` }
  ]
}

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Origin Coffee Cambodia",
  description: siteDescription,
  url: `${siteUrl}/about`,
  mainEntity: { "@id": `${siteUrl}/#organization` }
}

const sections = [
  {
    title: "Mission",
    href: "/about/mission",
    desc: "Why OCC publishes evidence-led coffee research."
  },
  {
    title: "Founder",
    href: "/about/founder",
    desc: "The editorial philosophy behind OCC."
  },
  {
    title: "Manifesto",
    href: "/about/manifesto",
    desc: "Evidence before claims. Context before promotion."
  },
  {
    title: "Sustainability",
    href: "/about/sustainability",
    desc: "How OCC evaluates sustainability, traceability, and origin evidence."
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
