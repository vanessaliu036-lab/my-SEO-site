import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Archive",
  description: "Archive page",
}

export default function ArchivePage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://你的網域.com"
  const pageUrl = `${baseUrl}/archive`
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "🔧 請替換為網站名稱"
  const description = "past projects, experiments, case studies"

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${siteName} - Archive`,
    description,
    url: pageUrl,
  }

  return (
    <main className="min-h-screen bg-gray-100 px-8 py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className="text-5xl font-bold tracking-wider text-gray-800 mb-6">Archive</h1>
      <p className="text-gray-600 text-lg">past projects, experiments, case studies</p>
    </main>
  )
}
