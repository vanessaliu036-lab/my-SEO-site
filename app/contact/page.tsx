import type { Metadata } from "next"
import { siteUrl } from "@/lib/siteConfig"
import ContactForm from "./ContactForm"
import type { ContactFormData } from "./action"

// Map URL query param values to ContactFormData["service"] enum values
const INTEREST_MAP: Record<string, ContactFormData["service"]> = {
  wholesale: "Wholesale",
  roasting: "Roasting Program",
  staffing: "Barista Staffing",
  equipment: "Equipment Service",
}

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Contact | Origin Coffee Cambodia - OCC",
  description:
    "Get in touch with Origin Coffee Cambodia (OCC). Enquire about wholesale supply, custom roasting programs, barista staffing, or equipment service in Cambodia.",
  keywords:
    "contact OCC Cambodia, coffee wholesale enquiry Phnom Penh, specialty coffee contact Cambodia, coffee supplier contact, OCC enquiry, OCC contact",
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
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

// ── JSON-LD ───────────────────────────────────────────────────────────────────

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "WholesaleStore",
  "@id": `${siteUrl}/contact`,
  name: "Origin Coffee Cambodia (OCC)",
  alternateName: "Origin Coffee Cambodia",
  image: `${siteUrl}/og-image.png`,
  url: siteUrl,
  // TODO: replace with actual phone number
  telephone: "+855-XX-XXXXXX",
  description:
    "Specialty coffee B2B supplier and technical roasting authority in Cambodia.",
  address: {
    "@type": "PostalAddress",
    // TODO: replace with actual street address
    streetAddress: "",
    addressLocality: "Phnom Penh",
    addressCountry: "KH",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 11.5564,
    longitude: 104.9282,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  priceRange: "$$$",
  areaServed: { "@type": "Country", name: "Cambodia" },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    availableLanguage: ["English"],
    hoursAvailable: {
      "@type": "OpeningHoursSpecification",
      description: "Response within 1 business day",
    },
  },
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
      name: "Contact",
      item: `${siteUrl}/contact`,
    },
  ],
}

// ── Page (Server Component) ───────────────────────────────────────────────────

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ interest?: string }>
}) {
  const { interest } = await searchParams
  const defaultInterest = interest ? INTEREST_MAP[interest.toLowerCase()] : undefined

  return (
    <>
      {/*
       * Font loading strategy:
       * - The <link> tags use React 19's stylesheet hoisting (precedence prop)
       *   which inserts them into <head> at runtime — zero build-time network calls.
       * - The <style> block defines CSS variables as fallback font stacks;
       *   once the Google Fonts stylesheet loads these get overridden naturally
       *   because the font-family names match what Google Fonts provides.
       */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Barlow+Condensed:wght@300;400;500&display=swap"
        // @ts-ignore — precedence is a React 19 stylesheet hoisting prop, not yet in @types/react
        precedence="default"
      />
      {/* Define CSS variables so ContactForm can reference fonts via var() */}
      <style>{`
        .contact-font-vars {
          --font-bebas: 'Bebas Neue', Impact, 'Arial Narrow', sans-serif;
          --font-barlow: 'Barlow', Arial, sans-serif;
          --font-barlow-condensed: 'Barlow Condensed', 'Arial Narrow', Arial, sans-serif;
        }
      `}</style>

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Interactive contact form — Client Component */}
      <ContactForm fontVars="contact-font-vars" defaultInterest={defaultInterest} />
    </>
  )
}
