import type { Metadata } from "next"
import { siteUrl, siteLogoUrl, ogImage, siteDescription } from "@/lib/siteConfig"
import { areaServedCambodia } from "@/lib/organizationSchema"
import { pageAlternates } from "@/lib/seo"
import ContactForm from "./ContactForm"
import "./contact-editorial.css"

export const metadata: Metadata = {
  title: "Wholesale, Sourcing & Contact | Origin Coffee Cambodia",
  description:
    "Contact Origin Coffee Cambodia for wholesale and sourcing enquiries, sample requests, lot-list questions, roasting and B2B coffee solutions, editorial questions, or media enquiries.",
  keywords:
    "Origin Coffee Cambodia contact, Cambodia coffee wholesale enquiry, Fine Robusta supplier Cambodia, Cambodia coffee sourcing, coffee sample request, coffee lot list, B2B coffee solutions Cambodia",
  alternates: pageAlternates("/contact"),
  openGraph: {
    title: "Wholesale, Sourcing & Contact | Origin Coffee Cambodia",
    description:
      "Start a wholesale, sourcing, sample, lot-list, roasting, B2B coffee solution, editorial, or media enquiry with OCC.",
    url: `${siteUrl}/contact`,
    siteName: "Origin Coffee Cambodia",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wholesale, Sourcing & Contact | Origin Coffee Cambodia",
    description:
      "Wholesale, sourcing, sample, lot-list, roasting, coffee solution, editorial, and media enquiries for OCC.",
  },
}

const contactOrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "Origin Coffee Cambodia (OCC)",
  alternateName: "Origin Coffee Cambodia",
  url: siteUrl,
  logo: siteLogoUrl,
  image: ogImage,
  description: siteDescription,
  areaServed: areaServedCambodia,
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "wholesale and sourcing inquiries",
      url: `${siteUrl}/contact`,
      availableLanguage: ["English"],
      areaServed: areaServedCambodia,
    },
    {
      "@type": "ContactPoint",
      contactType: "editorial and media inquiries",
      url: `${siteUrl}/contact`,
      availableLanguage: ["English"],
      areaServed: areaServedCambodia,
    },
  ],
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Contact", item: `${siteUrl}/contact` },
  ],
}

export default function ContactPage() {
  return (
    <>
      <style>{`
        .contact-font-vars {
          --font-bebas: var(--font-display), Georgia, serif;
          --font-barlow: var(--font-sans), Inter, Arial, sans-serif;
          --font-barlow-condensed: var(--font-sans), Inter, Arial, sans-serif;
        }
      `}</style>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactOrganizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="occ-contact-shell">
        <ContactForm fontVars="contact-font-vars" />
      </div>
    </>
  )
}
