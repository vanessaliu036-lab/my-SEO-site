import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact | Arunéra Coffee Cambodia",
  description:
    "Contact Arunéra Coffee Cambodia for wholesale partnerships, coffee consultation, and specialty coffee support in Phnom Penh and beyond.",
  alternates: {
    canonical: "https://arunera.com/contact",
  },
}

export default function ContactPage() {
  const pageUrl = "https://arunera.com/contact"
  const description = "connect, collaborate, reach out"

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Contact | Arunéra Coffee Cambodia",
    description,
    url: pageUrl,
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://arunera.com" },
      { "@type": "ListItem", position: 2, name: "Contact", item: pageUrl },
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
          <h1 className="mt-8 text-6xl font-bold tracking-tight text-gray-900">CONTACT</h1>
          <p className="mt-6 text-gray-600 text-lg max-w-3xl">
            connect, collaborate, reach out. For wholesale inquiries and collaboration, contact our team.
          </p>
          <div className="mt-16 flex justify-end">
            <Link href="/vision" className="text-sm tracking-widest uppercase text-gray-500 hover:text-gray-900">
              Back to Vision →
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
