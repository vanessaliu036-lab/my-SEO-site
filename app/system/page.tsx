import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "System | Arunéra Coffee Cambodia",
  description:
    "Explore Arunéra's coffee system: roasting methodology, quality control workflow, and technical framework for reliable wholesale coffee support in Cambodia.",
  alternates: {
    canonical: "https://arunera.com/system",
  },
}

export default function SystemPage() {
  const pageUrl = "https://arunera.com/system"
  const description = "methodology, process, frameworks"

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "System | Arunéra Coffee Cambodia",
    description,
    url: pageUrl,
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://arunera.com" },
      { "@type": "ListItem", position: 2, name: "System", item: pageUrl },
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
          <h1 className="mt-8 text-6xl font-bold tracking-tight text-gray-900">SYSTEM</h1>
          <p className="mt-6 text-gray-600 text-lg max-w-3xl">
            methodology, process, frameworks. This page outlines our roasting standards, calibration routines, and
            partner support workflow.
          </p>
          <div className="mt-16 flex justify-end">
            <Link href="/archive" className="text-sm tracking-widest uppercase text-gray-500 hover:text-gray-900">
              Next: Archive →
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
