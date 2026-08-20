import { Metadata } from "next"
import { AboutEditorialTemplate } from "@/components/templates/about-editorial-template"
import { siteUrl, siteLogoUrl } from "@/lib/siteConfig"
import { areaServedCambodia } from "@/lib/organizationSchema"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "About Origin | Origin Coffee Cambodia - OCC Coffee Roaster",
  description: "Learn how Origin Coffee Cambodia builds a traceable specialty coffee supply chain through ethical sourcing, quality control, and professional training.",
  keywords: "about coffee roaster Cambodia, OCC coffee, Origin Coffee Cambodia, Cambodia coffee supply chain, specialty coffee infrastructure Cambodia, coffee sourcing Cambodia, ethical coffee Cambodia, coffee roaster Phnom Penh about",
  openGraph: {
    title: "About Origin | Origin Coffee Cambodia - OCC",
    description: "Unlike celebrity-driven roasters, OCC builds infrastructure. We're reconstructing Cambodia's specialty coffee supply chain from the ground up.",
    url: `${siteUrl}/about`,
    siteName: "Origin Coffee Cambodia",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteUrl}/images/about-og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Origin Coffee Cambodia - Origin Coffee Cambodia (OCC) About Page"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "About Origin | Origin Coffee Cambodia",
    description: "Building infrastructure for Cambodia's specialty coffee future.",
    images: [`${siteUrl}/images/about-twitter-card.jpg`]
  },
  alternates: pageAlternates("/about"),
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Origin Coffee Cambodia (OCC)",
  "alternateName": "Origin Coffee Cambodia",
  "url": `${siteUrl}`,
  "logo": siteLogoUrl,
  "description": "Specialty coffee infrastructure company reconstructing Cambodia's coffee supply chain through ethical sourcing, traceability, and professional training.",
  "areaServed": areaServedCambodia,
  "knowsAbout": [
    "Specialty Coffee Supply Chain",
    "Coffee Infrastructure",
    "Ethical Coffee Sourcing",
    "Coffee Traceability",
    "Cambodian Coffee Industry",
    "Coffee Roasting Technology"
  ],
  "foundingDate": "2020",
  "founder": {
    "@type": "Person",
    "name": "OCC Founder",
    "jobTitle": "Founder & Head Roaster"
  }
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": `${siteUrl}`
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "About",
      "item": `${siteUrl}/about`
    }
  ]
}

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About Origin Coffee Cambodia",
  "description": "Origin Coffee Cambodia (OCC) is building infrastructure for Cambodia's specialty coffee industry - from ethical sourcing to professional training.",
  "url": `${siteUrl}/about`,
  "mainEntity": {
    "@type": "Organization",
    "name": "Origin Coffee Cambodia (OCC)",
    "description": "We don't just roast coffee. We reconstruct Cambodia's specialty coffee supply chain."
  }
}

const sections = [
  {
    title: "Mission",
    href: "/about/mission",
    desc: "Vision, Mission, and Why We Exist."
  },
  {
    title: "Founder",
    href: "/about/founder",
    desc: "Philosophy, Credentials, and the Big Idea."
  },
  {
    title: "Manifesto",
    href: "/about/manifesto",
    desc: "The Barista Army Thesis: Why We'll Never Open a Cafe."
  },
  {
    title: "Sustainability",
    href: "/about/sustainability",
    desc: "Ethical sourcing and traceability protocol."
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
