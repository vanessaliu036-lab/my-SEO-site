import type { Metadata } from "next"
import { siteUrl, siteLogoUrl, ogImage, siteDescription } from "@/lib/siteConfig"
import { areaServedCambodia } from "@/lib/organizationSchema"
import { pageAlternates } from "@/lib/seo"
import ContactForm from "./ContactForm"
import "./contact-editorial.css"

export const metadata: Metadata = {
  title: "B2B Coffee Enquiries | Sourcing, Roasting & Distribution | OCC",
  description:
    "Start a commercial conversation with Origin Coffee Cambodia about Wholesale & Sourcing, Roasted Coffee Supply, Roasting Program, or Distribution Partnership requirements.",
  keywords:
    "Origin Coffee Cambodia contact, Cambodia coffee wholesale enquiry, Fine Robusta supplier Cambodia, Cambodia coffee sourcing, roasted coffee supply Cambodia, coffee roasting program Cambodia, Cambodia coffee distribution partnership",
  alternates: pageAlternates("/contact"),
  openGraph: {
    title: "B2B Coffee Enquiries | Origin Coffee Cambodia",
    description:
      "Tell OCC what you are building across sourcing, roasted coffee supply, roast development, or distribution. A final purchase order is not required to start the discussion.",
    url: `${siteUrl}/contact`,
    siteName: "Origin Coffee Cambodia",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "B2B Coffee Enquiries | Origin Coffee Cambodia",
    description:
      "Commercial and B2B enquiries for Cambodia coffee sourcing, roasted supply, roasting programs, and distribution partnerships.",
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
      contactType: "commercial and B2B enquiries",
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
