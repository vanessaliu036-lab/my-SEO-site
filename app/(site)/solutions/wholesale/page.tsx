import type { Metadata } from "next"
import { WholesaleApprovedLayout } from "./WholesaleApprovedLayout"
import { siteUrl, ogImage } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

const title = "Wholesale Coffee Supplier Cambodia | B2B | OCC"
const description = "Source 100% Cambodia-origin coffee with OCC: Fine Robusta, OCC-developed roasted coffee, sample evaluation and supply discussions for roasters, cafés, hotels and retailers."

export const metadata: Metadata = {
  title, description,
  keywords: "wholesale coffee supplier Cambodia, Cambodian coffee beans wholesale, Fine Robusta wholesale supplier, coffee bean supplier Cambodia, roasted coffee supplier Cambodia, wholesale coffee for hotels and cafés",
  alternates: pageAlternates("/solutions/wholesale"),
  openGraph: { title, description, url: `${siteUrl}/solutions/wholesale`, type: "website", siteName: "Origin Coffee Cambodia", images: [{ url: ogImage, width: 1200, height: 630, alt: "Wholesale coffee supply by Origin Coffee Cambodia" }] },
  twitter: { card: "summary_large_image", title, description, images: [ogImage] },
}

const faqs = [
  { q: "Where can I buy Cambodian coffee beans wholesale?", a: "Send OCC your preferred format, destination and estimated volume. We can then discuss the relevant Cambodia-origin coffee option and confirm what is available for your enquiry." },
  { q: "Can I request a Cambodian Fine Robusta sample?", a: "Yes, start with the coffee you want to evaluate. OCC will confirm the available sample or closest commercial reference before any order is discussed." },
  { q: "Does OCC offer wholesale roasted coffee for cafés and hotels?", a: "OCC discusses developed roasted-coffee directions for professional use. Roast direction, format, packaging and availability are confirmed against the requirement." },
  { q: "What are your MOQ, wholesale prices and lead times?", a: "MOQ, price basis, volume, packaging, destination and lead time depend on the actual product and order conditions. OCC confirms the commercial terms for each enquiry." },
  { q: "Can OCC create a custom roast or private-label product?", a: "Wholesale covers OCC-developed coffee. A made-to-order roast profile belongs to the Roasting Program. Private-label packaging requires a separate feasibility discussion." },
  { q: "Which countries can you ship to?", a: "Share your destination and delivery requirements. Export documentation, logistics responsibility and shipping feasibility are confirmed for the actual order." }
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
