import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Matter | Arunéra Coffee Cambodia",
  description:
    "Find Arunéra resources, tools, and downloadable materials for brewing standards, coffee operations, and partner training.",
  alternates: {
    canonical: "https://arunera.com/matter",
  },
}

export default function MatterPage() {
  const pageUrl = "https://arunera.com/matter"
  const description = "resources, tools, downloads"

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Matter | Arunéra Coffee Cambodia",
    description,
    url: pageUrl,
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://arunera.com" },
      { "@type": "ListItem", position: 2, name: "Matter", item: pageUrl },
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
          <h1 className="mt-8 text-6xl font-bold tracking-tight text-gray-900">MATTER</h1>
          <p className="mt-6 text-gray-600 text-lg max-w-3xl">
            resources, tools, downloads. Centralize operational templates and learning materials for coffee teams.
          </p>
          <div className="mt-16 flex justify-end">
            <Link href="/signal" className="text-sm tracking-widest uppercase text-gray-500 hover:text-gray-900">
              Next: Signal →
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
