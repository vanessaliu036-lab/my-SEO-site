import Link from "next/link"
import { siteUrl, siteLogoUrl } from "@/lib/siteConfig"
import { areaServedCambodia } from "@/lib/organizationSchema"
import { pageAlternates } from "@/lib/seo"

import { Metadata } from "next"

// SEO Metadata
export const metadata: Metadata = {
  title: "The Ecosystem | Origin Coffee Cambodia - Coffee Academy & Supply Chain",
  description: "Building Cambodia's coffee ecosystem through The Academy, equipment supply, green bean trading, and professional training programs. Creating a skilled barista army to elevate the industry.",
  keywords: "coffee academy Cambodia, barista training Phnom Penh, coffee equipment supply Cambodia, green bean trading Cambodia, coffee ecosystem, coffee packaging solutions, coffee service maintenance, specialty coffee supply chain Cambodia",
  openGraph: {
    title: "The Ecosystem | Origin Coffee Cambodia",
    description: "From farm to cup - building a skilled barista army and sustainable coffee ecosystem in Cambodia.",
    url: `${siteUrl}/system`,
    siteName: "Origin Coffee Cambodia",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteUrl}/images/ecosystem-og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Origin Coffee Cambodia Ecosystem - Academy, Equipment, Green Bean Trading"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "The Ecosystem | Origin Coffee Cambodia",
    description: "Building Cambodia's coffee future through education, equipment, and sustainable supply chains.",
    images: [`${siteUrl}/images/ecosystem-twitter-card.jpg`]
  },
  alternates: pageAlternates("/system"),
}
export default function SystemPage() {
  // Schema.org 結構化資料 - Organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Origin Coffee Cambodia",
    "url": `${siteUrl}`,
    "logo": siteLogoUrl,
    "description": "Specialty coffee roaster building Cambodia's coffee ecosystem through The Academy, equipment supply, green bean trading, and professional training.",
    "areaServed": areaServedCambodia,
    "knowsAbout": [
      "Coffee Education",
      "Barista Training",
      "Coffee Equipment Supply",
      "Green Bean Trading",
      "Coffee Packaging",
      "Specialty Coffee Supply Chain"
    ]
  }
  // Schema.org 結構化資料 - BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${siteUrl}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "The Ecosystem",
        "item": `${siteUrl}/system`
      }
    ]
  }
  // Schema.org 結構化資料 - EducationalOrganization (針對 The Academy)
  const academySchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "OCC Coffee Academy",
    "url": `${siteUrl}/system`,
    "description": "A new kind of coffee academy built from scratch to shape truly skilled baristas in Cambodia. Offering free enrollment for qualified individuals and second chance opportunities.",
    "areaServed": areaServedCambodia,
    "knowsAbout": ["Barista Training", "Coffee Education", "Professional Coffee Skills"],
    "offers": {
      "@type": "Offer",
      "description": "Free enrollment for qualified individuals",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/PreOrder"
    }
  }
  const entities = [
    "Coffee Equipment & Accessories",
    "Packaging Solutions",
    "Service & Maintenance",
    "Green Bean Trading",
    "The Academy (Future Initiative)"
  ]
  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(academySchema) }}
      />
      <div className="min-h-screen bg-gray-100 relative overflow-hidden font-sans">
        {/* Back Navigation */}
        <nav className="absolute top-8 left-8 z-20" aria-label="Breadcrumb">
          <Link 
            href="/" 
            className="text-gray-600 text-sm font-medium tracking-wider hover:text-gray-800 transition-colors flex items-center gap-2"
            aria-label="Return to homepage"
          >
            <span aria-hidden="true">←</span> HOME
          </Link>
        </nav>
        {/* 背景幾何裝飾 */}
        <div className="absolute right-0 top-0 w-1/3 h-1/3 bg-gray-200/40 rounded-bl-full -z-10" aria-hidden="true"></div>
        <div className="absolute left-1/4 bottom-0 w-px h-64 border-l border-dashed border-gray-400 -z-10" aria-hidden="true"></div>
        <main className="max-w-6xl mx-auto pt-32 pb-24 px-8 md:px-16">
          {/* Header */}
          <header className="mb-24 border-b border-gray-300 pb-12 relative">
            <div className="absolute -left-16 top-0 -rotate-90 origin-top-left flex items-center gap-4" aria-hidden="true">
              <span className="w-8 h-px bg-gray-400"></span>
              <span className="text-gray-500 text-xs tracking-[0.3em] font-medium uppercase">Infrastructure</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tighter mb-4">THE ECOSYSTEM</h1>
            <p className="text-gray-500 tracking-widest text-xs uppercase">Origin Coffee Cambodia (OCC) & Beyond</p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
            {/* Section 1: The Problem */}
            <section className="md:col-span-5 space-y-8">
              <h2 className="text-xl font-bold text-gray-800 uppercase tracking-widest border-l-4 border-gray-900 pl-4">
                The Problem We Aim to Solve
              </h2>
              <p className="text-gray-600 leading-relaxed italic text-lg">
                "Why does the same coffee chain have one branch that serves excellent coffee, while another falls short?"
              </p>
              <p className="text-sm text-gray-500 leading-loose">
                Inconsistency exists because the supply of cafés is far greater than the available skilled human resources. 
                Current training programs clearly aren't enough to meet the growing demand for qualified coffee professionals in 
                <strong> Cambodia's rapidly expanding specialty coffee market</strong>.
              </p>
              <div className="pt-4">
                <div className="bg-gray-900/5 p-6 border-l-2 border-gray-900">
                  <p className="text-xs text-gray-600 uppercase tracking-wider mb-2">The Gap</p>
                  <p className="text-sm text-gray-700">
                    <strong>300+ cafés</strong> in Phnom Penh alone, but <strong>less than 20%</strong> have consistently trained baristas.
                  </p>
                </div>
              </div>
            </section>
            {/* Section 2: The Academy Solution */}
            <section className="md:col-span-7 bg-white p-12 shadow-sm relative">
              <div className="absolute -top-4 -right-4 w-24 h-24 border border-gray-300 -z-10" aria-hidden="true"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border border-gray-300 -z-10" aria-hidden="true"></div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">The Academy</h2>
              <div className="space-y-6 text-gray-600 text-sm leading-loose">
                <p>
                  We are building a <span className="text-gray-900 font-bold underline">new kind of coffee academy</span>—built from scratch—with the goal of shaping truly skilled baristas who can elevate Cambodia's coffee standards.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  <div className="border border-gray-200 p-6 hover:bg-gray-50 transition-colors">
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">Second Chance</h3>
                    <p className="text-sm text-gray-600">Providing individuals without formal degrees a second chance at life through intensive skill training and career placement.</p>
                  </div>
                  <div className="border border-gray-200 p-6 hover:bg-gray-50 transition-colors">
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">Free Enrollment</h3>
                    <p className="text-sm text-gray-600">Enrollment will be free for those who qualify, ensuring talent isn't blocked by financial barriers.</p>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-gray-50">
                  <p className="text-xs text-gray-500 italic">
                    ✕ Curriculum includes: Espresso fundamentals, sensory evaluation, machine maintenance, customer service, and business operations.
                  </p>
                </div>
              </div>
            </section>
          </div>
          {/* Scalability Section */}
          <section className="mt-32">
            <h2 className="text-sm tracking-[0.3em] font-bold text-gray-400 uppercase mb-12">Scalability & Sustainability</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {entities.map((item, i) => (
                <div 
                  key={i} 
                  className="border border-gray-300 p-4 text-[10px] font-bold tracking-widest uppercase text-gray-500 hover:text-gray-900 hover:border-gray-900 transition-colors text-center flex items-center justify-center min-h-[80px]"
                >
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-12 text-center text-gray-400 text-xs italic">
              Building a "Skilled Barista Army" to uplift the community and the industry.
            </p>
          </section>
          {/* CTA Section */}
          <section className="mt-32 pt-12 border-t border-gray-300">
            <div className="bg-gray-900 p-12 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Join the Ecosystem</h3>
              <p className="text-gray-300 text-sm mb-8 max-w-2xl mx-auto">
                Whether you're a café owner seeking equipment, a future barista looking for training, or a partner interested in green bean trading — we're here to build the future of Cambodia's coffee industry together.
              </p>
              <Link 
                href="/contact" 
                className="inline-block bg-white text-gray-900 px-8 py-3 text-sm font-bold tracking-wider hover:bg-gray-100 transition-colors"
              >
                GET IN TOUCH →
              </Link>
            </div>
          </section>
          {/* Footer Navigation - 加入 About 連結 */}
          <footer className="mt-24 pt-12 border-t border-gray-300 flex justify-between items-end">
            <div>
              <p className="text-xs text-gray-400 tracking-widest uppercase">Visual System v1.0</p>
              <p className="text-sm text-gray-600 font-medium">OCC ECOSYSTEM</p>
            </div>
            <div className="flex gap-6">
              <Link 
                href="/vision" 
                className="group flex items-center gap-2 text-xs tracking-widest text-gray-400 hover:text-gray-900 transition-colors uppercase"
                aria-label="Navigate to Vision page"
              >
                ← Vision
              </Link>
              <Link 
                href="/about" 
                className="group flex items-center gap-2 text-xs tracking-widest text-gray-400 hover:text-gray-900 transition-colors uppercase"
                aria-label="Navigate to About page"
              >
                About →
              </Link>
            </div>
          </footer>
        </main>
        {/* 側邊垂直裝飾線 */}
        <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 items-center" aria-hidden="true">
          <div className="w-px h-12 bg-gray-300"></div>
          <span className="text-[10px] text-gray-400 [writing-mode:vertical-lr] tracking-widest uppercase">Ecosystem</span>
          <div className="w-px h-12 bg-gray-300"></div>
        </div>
      </div>
    </>
  )
}
