import type { Metadata } from "next"
import { siteUrl, siteLogoUrl, ogImage, siteDescription } from "@/lib/siteConfig"
import { areaServedCambodia } from "@/lib/organizationSchema"
import { pageAlternates } from "@/lib/seo"
import ContactForm from "./ContactForm"
import type { ContactFormData } from "./action"
import "./contact-editorial.css"

const INTEREST_MAP: Record<string, ContactFormData["service"]> = {
  wholesale: "Wholesale",
  roasting: "Roasting Program",
  staffing: "Barista Staffing",
  equipment: "Equipment Service",
}

export const metadata: Metadata = {
  title: "Contact | Origin Coffee Cambodia - OCC",
  description:
    "Get in touch with Origin Coffee Cambodia (OCC). Enquire about wholesale supply, custom roasting programs, barista staffing, or equipment service in Cambodia.",
  keywords:
    "contact OCC Cambodia, coffee wholesale enquiry Phnom Penh, specialty coffee contact Cambodia, coffee supplier contact, OCC enquiry, OCC contact",
  alternates: pageAlternates("/contact"),
  openGraph: {
    title: "Contact | Origin Coffee Cambodia - OCC",
    description:
      "Every serious operation starts with a conversation. Reach out for wholesale, roasting, staffing, or equipment enquiries.",
    url: `${siteUrl}/contact`,
    siteName: "Origin Coffee Cambodia",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Origin Coffee Cambodia - OCC",
    description:
      "Get in touch with OCC for wholesale coffee supply, roasting programs, and barista staffing in Cambodia.",
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
    contactType: "sales",
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

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ interest?: string }>
}) {
  const { interest } = await searchParams
  const defaultInterest = interest ? INTEREST_MAP[interest.toLowerCase()] : undefined

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
        <ContactForm fontVars="contact-font-vars" defaultInterest={defaultInterest} />
      </div>
    </>
  )
}
