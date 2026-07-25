import type { Metadata } from "next"
import HomePageClient from "./HomePageClient"
import { siteUrl, siteName, siteDescription } from "@/lib/siteConfig"

export const metadata: Metadata = {
  title: "Origin Coffee Cambodia | Fine Robusta & Specialty Coffee",
  description: siteDescription,
  keywords: [
    "Fine Robusta",
    "Fine Robusta Coffee",
    "Fine Robusta Cambodia",
    "Specialty Robusta",
    "Specialty Robusta Coffee",
    "Cambodian Coffee",
    "Cambodia Coffee Supplier",
    "Specialty Coffee Cambodia",
    "Wholesale Coffee Beans Cambodia",
    "Coffee Quality Institute Fine Robusta",
    "CQI Fine Robusta Standards",
    "Robusta Grading",
    "Coffee Processing",
    "Precision Roasting",
    "Single Origin Coffee",
    "Mondulkiri Coffee",
    "Mondulkiri Arabica",
    "Sustainable Coffee",
    "Cambodian Coffee Industry",
    "Specialty Coffee B2B",
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Origin Coffee Cambodia | Fine Robusta & Specialty Coffee",
    description: siteDescription,
    url: siteUrl,
    siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Origin Coffee Cambodia | Fine Robusta & Specialty Coffee",
    description: siteDescription,
  },
}

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl,
  description: siteDescription,
}

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: siteName,
  url: siteUrl,
  description: siteDescription,
  mainEntity: {
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
  },
}

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      <HomePageClient />
    </>
  )
}
