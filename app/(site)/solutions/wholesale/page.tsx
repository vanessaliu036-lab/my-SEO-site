import type { Metadata } from "next"
import { WholesaleApprovedLayout } from "./WholesaleApprovedLayout"
import { siteUrl, ogImage } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

const title = "Cambodian Coffee Supplier | Wholesale Fine Robusta | OCC"
const description = "Source Cambodia-origin wholesale coffee with OCC: Fine Robusta and roasted coffee supply for roasters, retailers, hotels and cafés, with samples and commercial terms confirmed per enquiry."

export const metadata: Metadata = {
  title, description,
  keywords: "wholesale coffee supplier Cambodia, Cambodian coffee beans wholesale, Fine Robusta wholesale supplier, Cambodian coffee wholesale for roasters, roasted coffee wholesale Cambodia, B2B coffee supplier for hotels and cafés",
  alternates: pageAlternates("/solutions/wholesale"),
  openGraph: { title, description, url: `${siteUrl}/solutions/wholesale`, type: "website", siteName: "Origin Coffee Cambodia", images: [{ url: ogImage, width: 1200, height: 630, alt: "Wholesale coffee supply by Origin Coffee Cambodia" }] },
  twitter: { card: "summary_large_image", title, description, images: [ogImage] },
}

const faqs = [
  { q: "Where can I buy Cambodian coffee beans wholesale?", a: "Contact OCC with your preferred format, destination and estimated volume. We can discuss Cambodia-origin coffee options and confirm availability for your enquiry." },
  { q: "Can I request a Cambodian Fine Robusta sample?", a: "Discuss the coffee and the sample or closest commercial reference available. Any sampling arrangement is confirmed before an order." },
  { q: "Does OCC offer wholesale roasted coffee for cafés and hotels?", a: "OCC discusses its developed roasted-coffee directions for professional use. Roast, format, packaging and availability depend on the specific requirement." },
  { q: "What are your MOQ, wholesale prices and lead times?", a: "These depend on product, lot or format, volume, packaging, destination and current availability. We confirm commercial terms for each enquiry." },
  { q: "Can OCC create a custom roast or private-label product?", a: "Wholesale covers OCC-developed coffee. A made-to-order roast profile belongs to the Roasting Program. Private-label packaging is subject to an explicit feasibility discussion, not a standing offer." },
  { q: "Which countries can you ship to?", a: "Share your destination and delivery requirements. Export documentation, logistics responsibility and shipping feasibility must be confirmed for the actual order." }
]

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
}
const breadcrumbSchema = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Solutions", item: `${siteUrl}/solutions` },
    { "@type": "ListItem", position: 3, name: "Wholesale", item: `${siteUrl}/solutions/wholesale` },
  ],
}

export default function WholesalePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <WholesaleApprovedLayout />
    </>
  )
}
