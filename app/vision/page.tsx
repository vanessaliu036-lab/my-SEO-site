import Link from "next/link"
import { siteUrl } from "@/lib/siteConfig"

import { Metadata } from "next"

// SEO Metadata (需在 layout.tsx 或 page.tsx 中配置)
export const metadata: Metadata = {
  title: "Vision & Mission | Origin Coffee Cambodia - Specialty Coffee Roaster",
  description: "Discover OCC's vision to elevate Cambodia's coffee culture through exceptional roasting, origin transparency, and wholesale technical support. Leading specialty coffee supplier in Phnom Penh.",
  keywords: "Cambodia coffee mission, specialty coffee vision Cambodia, Cambodian coffee culture, coffee roasting excellence Cambodia, traceable coffee beans Cambodia, wholesale coffee support Phnom Penh, Cambodia coffee suppliers",
  openGraph: {
    title: "Vision & Mission | Origin Coffee Cambodia",
    description: "Empowering Cambodia's coffee community through quality roasting, knowledge sharing, and professional wholesale support.",
    url: `${siteUrl}/vision`,
    siteName: "Origin Coffee Cambodia",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteUrl}/images/vision-og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Origin Coffee Cambodia Vision and Mission"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Vision & Mission | Origin Coffee Cambodia",
    description: "Elevating Cambodia's coffee culture through craftsmanship and education.",
    images: [`${siteUrl}/images/vision-twitter-card.jpg`]
  },
  alternates: {
    canonical: `${siteUrl}/vision`
  }
}
export default function VisionPage() {
  // Schema.org 結構化資料
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Origin Coffee Cambodia",
    "url": `${siteUrl}`,
    "logo": `${siteUrl}/images/logo.png`,
    "description": "Specialty coffee roaster elevating Cambodia's coffee culture through exceptional quality, origin transparency, and wholesale technical support.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Phnom Penh",
      "addressCountry": "Cambodia"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "11.5564",
      "longitude": "104.9282"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Cambodia"
    },
    "knowsAbout": [
      "Specialty Coffee Roasting",
      "Cambodian Coffee Origins",
      "Coffee Education",
      "Wholesale Coffee Supply",
      "Traceable Coffee Beans"
    ]
  }
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
        "name": "Vision & Mission",
        "item": `${siteUrl}/vision`
      }
    ]
  }
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
      <div className="min-h-screen bg-gray-100 relative overflow-hidden font-sans selection:bg-gray-900 selection:text-white">
        
        {/* 頂部導航 - 返回首頁 */}
        <nav className="absolute top-8 left-8 z-20" aria-label="Breadcrumb">
          <Link 
            href="/" 
            className="text-gray-600 text-sm font-medium tracking-wider hover:text-gray-800 transition-colors flex items-center gap-2"
            aria-label="Return to homepage"
          >
            <span aria-hidden="true">←</span> HOME
          </Link>
        </nav>
        {/* 背景幾何裝飾 (與首頁呼應) */}
        <div className="absolute right-0 top-0 w-1/3 h-1/3 bg-gray-200/40 rounded-bl-full -z-10" aria-hidden="true"></div>
        <div className="absolute left-1/4 bottom-0 w-px h-64 border-l border-dashed border-gray-400 -z-10" aria-hidden="true"></div>
        
        <main className="max-w-6xl mx-auto pt-32 pb-24 px-8 md:px-16 relative">
          
          {/* 標題區塊 */}
          <header className="relative mb-32">
            <div className="absolute -left-16 top-0 -rotate-90 origin-top-left flex items-center gap-4" aria-hidden="true">
              <span className="w-8 h-px bg-gray-400"></span>
              <span className="text-gray-500 text-xs tracking-[0.3em] font-medium uppercase">Philosophy</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-gray-900 tracking-tighter leading-none">
              VISION & <br /> MISSION
            </h1>
            <p className="mt-8 text-gray-500 tracking-widest text-sm uppercase">OCC — Elevating Cambodia's Coffee Culture</p>
          </header>
          {/* 內容格線佈局 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            
            {/* 左側:Vision & Mission 詳述 */}
            <div className="md:col-span-7 space-y-24">
              
              {/* Vision Section */}
              <section className="group">
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-gray-400 font-mono text-sm" aria-hidden="true">01/</span>
                  <h2 className="text-2xl font-bold text-gray-800 tracking-wide uppercase">Our Vision</h2>
                </div>
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-light italic border-l-2 border-gray-300 pl-8 mb-8">
                  "To <span className="font-semibold text-gray-900">inspire and elevate</span> Cambodia's coffee culture through knowledge, craftsmanship, and education."
                </p>
                
                {/* SEO 延伸內容 */}
                <div className="prose prose-gray max-w-none">
                  <p className="text-base text-gray-600 leading-relaxed">
                    OCC envisions a thriving <strong>Cambodian coffee culture</strong> where specialty coffee knowledge, artisanal roasting craftsmanship, and comprehensive education converge. We aspire to become Cambodia's leading force in transforming local coffee appreciation—from casual consumption to an informed, quality-driven coffee community that celebrates the unique terroir of Cambodian coffee origins including <strong>Mondulkiri</strong>, <strong>Ratanakiri</strong>, and <strong>Kampot</strong> regions.
                  </p>
                  <p className="text-base text-gray-600 leading-relaxed mt-4">
                    Through relentless pursuit of roasting excellence and origin transparency, we aim to position <strong>Cambodia specialty coffee</strong> on the global map—proving that Southeast Asian coffee can compete with the world's finest beans while maintaining authentic cultural identity and sustainable practices.
                  </p>
                </div>
              </section>
              {/* Mission Section */}
              <section className="group">
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-gray-400 font-mono text-sm" aria-hidden="true">02/</span>
                  <h2 className="text-2xl font-bold text-gray-800 tracking-wide uppercase">Our Mission</h2>
                </div>
                <p className="text-lg text-gray-600 leading-loose mb-8">
                  To <span className="text-gray-900 font-medium underline underline-offset-4">empower</span> Cambodia's coffee community by supplying exceptionally roasted coffee, sharing practical knowledge, and supporting partners with the tools and training they need to thrive.
                </p>
                {/* SEO 延伸內容 */}
                <div className="prose prose-gray max-w-none">
                  <p className="text-base text-gray-600 leading-relaxed">
                    OCC's mission is to <strong>empower Cambodia's growing coffee community</strong> by supplying exceptionally roasted specialty coffee beans, sharing practical brewing and sensory evaluation knowledge, and supporting our <strong>wholesale partners in Phnom Penh</strong> and beyond with professional training, technical consultation, and reliable supply chain solutions.
                  </p>
                  <p className="text-base text-gray-600 leading-relaxed mt-4">
                    We bridge the gap between Cambodia's exceptional coffee-growing regions and the nation's evolving café culture through <strong>transparency</strong>, <strong>consistency</strong>, and unwavering quality standards. Every roast batch is meticulously profiled, every origin story is thoroughly documented, and every wholesale partner receives dedicated technical support to ensure their success.
                  </p>
                </div>
                {/* Mission 核心支柱 */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 border-l-4 border-gray-900">
                    <h3 className="text-sm font-bold tracking-wider text-gray-800 mb-3 uppercase">Quality Excellence</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Consistent, traceable, and exceptionally roasted coffee beans sourced from Cambodia's finest origins.
                    </p>
                  </div>
                  <div className="bg-white p-6 border-l-4 border-gray-900">
                    <h3 className="text-sm font-bold tracking-wider text-gray-800 mb-3 uppercase">Knowledge Sharing</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Practical training in brewing techniques, sensory evaluation, and coffee science for café partners.
                    </p>
                  </div>
                  <div className="bg-white p-6 border-l-4 border-gray-900">
                    <h3 className="text-sm font-bold tracking-wider text-gray-800 mb-3 uppercase">Technical Support</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Ongoing consultation for equipment setup, recipe development, and quality control systems.
                    </p>
                  </div>
                  <div className="bg-white p-6 border-l-4 border-gray-900">
                    <h3 className="text-sm font-bold tracking-wider text-gray-800 mb-3 uppercase">Partnership Growth</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Collaborative relationships built on reliability, transparency, and mutual success.
                    </p>
                  </div>
                </div>
              </section>
            </div>
            {/* 右側:Why OCC (幾何色塊區塊) */}
            <aside className="md:col-span-5 relative">
              <div className="bg-gray-900 text-gray-100 p-10 md:p-12 transform md:translate-y-24 shadow-2xl">
                <h3 className="text-sm tracking-[0.2em] font-bold mb-8 text-gray-400 uppercase">Market Purpose</h3>
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  Currently, many local coffee suppliers offer inconsistent roast quality and limited transparency. OCC exists to bridge this gap.
                </p>
                {/* SEO 延伸段落 */}
                <p className="text-sm leading-relaxed mb-10 text-gray-300">
                  <strong>Cambodia's coffee market</strong> faces significant challenges: inconsistent roast quality from local suppliers, limited origin transparency, and insufficient technical support for wholesale customers. OCC was founded to address these critical gaps by establishing a new standard for <strong>specialty coffee roasting in Cambodia</strong>—one built on traceability, quality consistency, professional service, and collaborative partnerships with café owners, restaurants, and hospitality businesses.
                </p>
                
                <h4 className="text-xs tracking-wider font-bold mb-6 text-gray-500 uppercase">Our Commitments</h4>
                <ul className="space-y-6 text-sm">
                  {[
                    {
                      title: "Consistent High-Quality Roasted Beans",
                      description: "Every batch meticulously profiled and quality-controlled"
                    },
                    {
                      title: "Origin Transparency & Traceability",
                      description: "Full documentation from farm to cup"
                    },
                    {
                      title: "Wholesale Technical Support",
                      description: "Training, consultation, and ongoing guidance"
                    },
                    {
                      title: "Reliable Professional Service",
                      description: "Timely delivery and responsive communication"
                    }
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 group">
                      <span className="text-gray-500 mt-1 flex-shrink-0" aria-hidden="true">✕</span>
                      <div>
                        <span className="block group-hover:text-white transition-colors font-medium">{item.title}</span>
                        <span className="block text-xs text-gray-500 mt-1">{item.description}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              {/* 裝飾性點陣圖 */}
              <div className="absolute -bottom-12 -right-12 grid grid-cols-4 gap-2 opacity-30" aria-hidden="true">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 bg-gray-900 rounded-full"></div>
                ))}
              </div>
            </aside>
          </div>
          {/* 新增:服務對象與影響範圍 (GEO優化) */}
          <section className="mt-32 pt-16 border-t border-gray-300">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 tracking-tight">Serving Cambodia's Coffee Community</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Café Partners</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Independent specialty coffee shops, third-wave cafés, and boutique roasteries throughout <strong>Phnom Penh</strong>, <strong>Siem Reap</strong>, and <strong>Sihanoukville</strong> seeking reliable wholesale coffee suppliers.
                </p>
              </div>
              <div className="bg-white p-8 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Hospitality Businesses</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Hotels, resorts, restaurants, and boutique accommodations committed to offering guests authentic <strong>Cambodian specialty coffee</strong> experiences with full origin traceability.
                </p>
              </div>
              <div className="bg-white p-8 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Coffee Enthusiasts</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Home brewers, coffee professionals, and educated consumers seeking <strong>premium Cambodian coffee beans</strong> with transparent sourcing and roasting profiles.
                </p>
              </div>
            </div>
          </section>
          {/* 底部導引 - 加入 About 連結 */}
          <footer className="mt-48 pt-12 border-t border-gray-300 flex justify-between items-end">
            <div>
              <p className="text-xs text-gray-400 tracking-widest uppercase">Visual System v1.0</p>
              <p className="text-sm text-gray-600 font-medium">OCC BRANDING</p>
            </div>
            <div className="flex gap-6">
              <Link 
                href="/about" 
                className="group flex items-center gap-2 text-xs tracking-widest text-gray-400 hover:text-gray-900 transition-colors uppercase"
                aria-label="Navigate to About page"
              >
                About →
              </Link>
              <Link 
                href="/system" 
                className="group flex items-center gap-2 text-xs tracking-widest text-gray-400 hover:text-gray-900 transition-colors uppercase"
                aria-label="Navigate to System page"
              >
                System →
              </Link>
            </div>
          </footer>
        </main>
        {/* 側邊垂直裝飾線 */}
        <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 items-center" aria-hidden="true">
          <div className="w-px h-12 bg-gray-300"></div>
          <span className="text-[10px] text-gray-400 [writing-mode:vertical-lr] tracking-widest uppercase">Cambodia</span>
          <div className="w-px h-12 bg-gray-300"></div>
        </div>
      </div>
    </>
  )
}
