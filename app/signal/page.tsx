import Link from "next/link"
import type { Metadata } from "next"
import { siteUrl } from "@/lib/siteConfig"

export const metadata: Metadata = {
  title: "Signal | Arunéra Coffee Cambodia",
  description:
    "Read Arunéra updates, publications, and coffee insights. Follow new releases, events, and specialty coffee knowledge from Cambodia.",
  alternates: {
    canonical: `${siteUrl}/signal`,
  },
}

export default function SignalPage() {
  const pageUrl = `${siteUrl}/signal`
  const description = "blog, updates, publications"

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Signal | Arunéra Coffee Cambodia",
    description,
    url: pageUrl,
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}` },
      { "@type": "ListItem", position: 2, name: "Signal", item: pageUrl },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className="min-h-screen bg-gray-100 px-8 py-24">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="text-sm tracking-wider text-gray-600 hover:text-gray-900">
            ← HOME
          </Link>
          <h1 className="mt-8 text-6xl font-bold tracking-tight text-gray-900">SIGNAL</h1>
          <p className="mt-6 text-gray-600 text-lg max-w-3xl">
            blog, updates, publications. Stay updated with new releases, educational content, and partner highlights.
          </p>
          <div className="mt-16 flex justify-end">
            <Link href="/contact" className="text-sm tracking-widest uppercase text-gray-500 hover:text-gray-900">
              Next: Contact →
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
