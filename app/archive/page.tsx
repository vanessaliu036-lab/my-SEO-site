import Link from "next/link"
import type { Metadata } from "next"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Archive | Origin Coffee Cambodia",
  description:
    "Browse OCC archive for projects, coffee experiments, and case studies from Cambodia's specialty coffee journey.",
  alternates: pageAlternates("/archive"),
  robots: {
    index: false,
    follow: true,
  },
}

export default function ArchivePage() {
  const pageUrl = `${siteUrl}/archive`
  const description = "past projects, experiments, case studies"

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Archive | Origin Coffee Cambodia",
    description,
    url: pageUrl,
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}` },
      { "@type": "ListItem", position: 2, name: "Archive", item: pageUrl },
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
          <h1 className="mt-8 text-6xl font-bold tracking-tight text-gray-900">ARCHIVE</h1>
          <p className="mt-6 text-gray-600 text-lg max-w-3xl">
            past projects, experiments, case studies. A record of practical learning and coffee quality improvements.
          </p>
          <div className="mt-16 flex justify-end">
            <Link href="/matter" className="text-sm tracking-widest uppercase text-gray-500 hover:text-gray-900">
              Next: Matter →
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
