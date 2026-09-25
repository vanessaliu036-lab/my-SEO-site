import type { Metadata } from "next"
import { siteUrl, siteLogoUrl, ogImage, siteDescription } from "@/lib/siteConfig"
import { areaServedCambodia } from "@/lib/organizationSchema"
import { pageAlternates } from "@/lib/seo"
import ContactForm from "./ContactForm"
import "./contact-editorial.css"

export const metadata: Metadata = {
  title: "Contact OCC | Cambodian Coffee Wholesale & Roasting",
  description:
    "Contact Origin Coffee Cambodia about wholesale coffee, sourcing, Fine Robusta samples, custom roasting, partnerships or media enquiries. Share your needs.",
  keywords:
    "Origin Coffee Cambodia contact, Cambodia coffee wholesale enquiry, Fine Robusta supplier Cambodia, Cambodia coffee sourcing, coffee sample request, coffee lot list, B2B coffee solutions Cambodia",
  alternates: pageAlternates("/contact"),
  openGraph: {
    title: "Contact OCC | Cambodian Coffee Wholesale & Roasting",
    description:
      "Contact OCC about wholesale coffee, sourcing, Fine Robusta samples, custom roasting, partnerships or media enquiries.",
    url: `${siteUrl}/contact`,
    siteName: "Origin Coffee Cambodia",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact OCC | Cambodian Coffee Wholesale & Roasting",
    description:
      "Contact OCC about wholesale coffee, sourcing, Fine Robusta samples, custom roasting, partnerships or media enquiries.",
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
      email: "service@origincafekh.com",
      telephone: "+85514360479",
      availableLanguage: ["English"],
      areaServed: areaServedCambodia,
    },
    {
      "@type": "ContactPoint",
      contactType: "editorial and media inquiries",
      url: `${siteUrl}/contact`,
      email: "service@origincafekh.com",
      telephone: "+85514360479",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactOrganizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="occ-contact-shell">
        <ContactForm />
      </div>
    </>
  )
}
