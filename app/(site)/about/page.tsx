import { Metadata } from "next"
import { AboutEditorialTemplate } from "@/components/templates/about-editorial-template"
import { siteUrl, siteLogoUrl } from "@/lib/siteConfig"
import { areaServedCambodia } from "@/lib/organizationSchema"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "About OCC | Origin Coffee Cambodia Research",
  description:
    "Origin Coffee Cambodia (OCC) is an independent coffee information and research platform focused on Cambodian coffee, Fine Robusta, Coffea canephora, processing, roasting, sensory evaluation, quality standards, and origin research.",
  keywords:
    "Origin Coffee Cambodia, OCC coffee research, Cambodian coffee research, Fine Robusta Cambodia, Coffea canephora, Mondulkiri coffee, coffee quality standards, coffee processing research",
  openGraph: {
    title: "About OCC | Origin Coffee Cambodia Research",
    description:
      "An independent coffee information and research platform documenting Cambodian coffee, Fine Robusta, quality, processing, sensory evaluation, and origin evidence.",
    url: `${siteUrl}/about`,
    siteName: "Origin Coffee Cambodia",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteUrl}/images/about-og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Origin Coffee Cambodia - Origin Coffee Cambodia (OCC) About Page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About OCC | Origin Coffee Cambodia Research",
    description:
      "Independent research and technical editorial on Cambodian coffee, Fine Robusta, quality, processing, and origin evidence.",
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
  description:
    "Origin Coffee Cambodia (OCC) is an independent coffee information and research platform focused on Cambodian coffee, Fine Robusta, Coffea canephora, processing, roasting, sensory evaluation, quality standards, and origin research.",
  areaServed: areaServedCambodia,
  knowsAbout: [
    "Fine Robusta",
    "Coffea canephora",
    "Cambodian Coffee",
    "Coffee Processing",
    "Coffee Roasting",
    "Coffee Sensory Evaluation",
    "Coffee Quality Standards",
    "Mondulkiri Coffee",
    "Cambodian Coffee Industry",
    "Coffee Origin Research",
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
    "About the scope, editorial purpose, and evidence standards of Origin Coffee Cambodia, an independent coffee information and research platform.",
  url: `${siteUrl}/about`,
  mainEntity: {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Origin Coffee Cambodia",
    description:
      "Independent research and technical editorial focused on Cambodian coffee, Fine Robusta, Coffea canephora, processing, roasting, sensory evaluation, quality standards, and origin research.",
  },
}

const sections = [
  {
    title: "Mission",
    href: "/about/mission",
    desc: "Research scope, editorial purpose, and why OCC exists.",
  },
  {
    title: "Founder",
    href: "/about/founder",
    desc: "The editorial philosophy behind OCC's evidence-led approach.",
  },
  {
    title: "Manifesto",
    href: "/about/manifesto",
    desc: "Why OCC prioritizes evidence, precision, and transparent uncertainty.",
  },
  {
    title: "Sustainability",
    href: "/about/sustainability",
    desc: "How OCC treats sustainability and traceability as claims that require evidence.",
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
