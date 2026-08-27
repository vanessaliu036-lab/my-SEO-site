import type { Metadata } from "next"
import { siteUrl, siteLogoUrl, ogImage, siteDescription } from "@/lib/siteConfig"
import { areaServedCambodia } from "@/lib/organizationSchema"
import { pageAlternates } from "@/lib/seo"
import ContactForm from "./ContactForm"
import "./contact-editorial.css"

export const metadata: Metadata = {
  title: "Contact | Origin Coffee Cambodia - OCC",
  description:
    "Contact Origin Coffee Cambodia (OCC) with editorial questions, source corrections, media enquiries, or general questions about the research platform.",
  keywords:
    "Origin Coffee Cambodia contact, OCC editorial contact, coffee research enquiry, Cambodia coffee information",
  alternates: pageAlternates("/contact"),
  openGraph: {
    title: "Contact | Origin Coffee Cambodia - OCC",
    description:
      "Contact OCC about editorial questions, source corrections, media enquiries, or general research-platform questions.",
    url: `${siteUrl}/contact`,
    siteName: "Origin Coffee Cambodia",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Origin Coffee Cambodia - OCC",
    description:
      "Contact OCC about editorial questions, source corrections, media enquiries, or general research-platform questions.",
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
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "general inquiries",
    url: `${siteUrl}/contact`,
    availableLanguage: ["English"],
    areaServed: areaServedCambodia,
  },
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
