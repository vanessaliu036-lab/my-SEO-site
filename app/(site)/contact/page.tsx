import type { Metadata } from "next"
import { siteUrl, siteLogoUrl, ogImage, siteDescription } from "@/lib/siteConfig"
import { areaServedCambodia } from "@/lib/organizationSchema"
import { pageAlternates } from "@/lib/seo"
import ContactForm from "./ContactForm"
import "./contact-editorial.css"

export const metadata: Metadata = {
  title: "Contact OCC | Wholesale, Custom Roasting & Coffee Marketing",
  description:
    "Contact Origin Coffee Cambodia for wholesale coffee supply, custom roast profile development, and coffee marketing for the Cambodian market.",
  keywords:
    "Origin Coffee Cambodia contact, Cambodia coffee wholesale enquiry, Fine Robusta supplier Cambodia, custom coffee roasting Cambodia, roast profile development Cambodia, coffee marketing Cambodia, signature drink development",
  alternates: pageAlternates("/contact"),
  openGraph: {
    title: "Contact OCC | Wholesale, Custom Roasting & Coffee Marketing",
    description:
      "Start a commercial conversation with OCC for ready-to-sell wholesale coffee, made-for-you custom roasting, or Cambodian-market coffee marketing.",
    url: `${siteUrl}/contact`,
    siteName: "Origin Coffee Cambodia",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact OCC | Wholesale, Custom Roasting & Coffee Marketing",
    description:
      "Wholesale coffee supply, custom roast profile development, and Cambodian-market coffee marketing enquiries for OCC.",
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
      contactType: "wholesale coffee supply inquiries",
      url: `${siteUrl}/contact`,
      availableLanguage: ["English"],
      areaServed: areaServedCambodia,
    },
    {
      "@type": "ContactPoint",
      contactType: "custom roasting inquiries",
      url: `${siteUrl}/contact`,
      availableLanguage: ["English"],
      areaServed: areaServedCambodia,
    },
    {
      "@type": "ContactPoint",
      contactType: "coffee marketing inquiries",
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
