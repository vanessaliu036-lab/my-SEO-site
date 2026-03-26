import Link from "next/link"
import { Metadata } from "next"

// SEO Metadata
export const metadata: Metadata = {
  title: "About Origin | Arunéra Coffee Cambodia - OCC Coffee Roaster",
  description: "Learn about Origin Coffee Crafter (OCC) - building infrastructure, not just roasting coffee. We're reconstructing Cambodia's specialty coffee supply chain through ethical sourcing, traceability, and professional training.",
  keywords: "about coffee roaster Cambodia, OCC coffee, Origin Coffee Crafter, Cambodia coffee supply chain, specialty coffee infrastructure Cambodia, coffee sourcing Cambodia, ethical coffee Cambodia, coffee roaster Phnom Penh about",
  openGraph: {
    title: "About Origin | Arunéra Coffee Cambodia - OCC",
    description: "Unlike celebrity-driven roasters, OCC builds infrastructure. We're reconstructing Cambodia's specialty coffee supply chain from the ground up.",
    url: "https://arunera.com/about",
    siteName: "Arunéra Coffee Cambodia",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://arunera.com/images/about-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Arunéra Coffee Cambodia - Origin Coffee Crafter (OCC) About Page"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "About Origin | Arunéra Coffee Cambodia",
    description: "Building infrastructure for Cambodia's specialty coffee future.",
    images: ["https://arunera.com/images/about-twitter-card.jpg"]
  },
  alternates: {
    canonical: "https://arunera.com/about"
  }
}

// Schema.org 結構化資料
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Origin Coffee Crafter (OCC)",
  "alternateName": "Arunéra Coffee Cambodia",
  "url": "https://arunera.com",
  "logo": "https://arunera.com/images/logo.png",
  "description": "Specialty coffee infrastructure company reconstructing Cambodia's coffee supply chain through ethical sourcing, traceability, and professional training.",
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
    "Specialty Coffee Supply Chain",
    "Coffee Infrastructure",
    "Ethical Coffee Sourcing",
    "Coffee Traceability",
    "Cambodian Coffee Industry",
    "Coffee Roasting Technology"
  ],
  "foundingDate": "2020",
  "founder": {
    "@type": "Person",
    "name": "Arunéra Founder",
    "jobTitle": "Founder & Head Roaster"
  }
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://arunera.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "About",
      "item": "https://arunera.com/about"
    }
  ]
}

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About Origin Coffee Crafter",
  "description": "Origin Coffee Crafter (OCC) is building infrastructure for Cambodia's specialty coffee industry - from ethical sourcing to professional training.",
  "url": "https://arunera.com/about",
  "mainEntity": {
    "@type": "Organization",
    "name": "Origin Coffee Crafter (OCC)",
    "description": "We don't just roast coffee. We reconstruct Cambodia's specialty coffee supply chain."
  }
}

export default function AboutPage() {
  const sections = [
    { 
      title: "Mission", 
      href: "/about/mission", 
      desc: "Vision, Mission, and Why We Exist.",
      keywords: "coffee mission Cambodia, specialty coffee vision"
    },
    { 
      title: "Founder", 
      href: "/about/founder", 
      desc: "Philosophy, Credentials, and the Big Idea.",
      keywords: "coffee founder Cambodia, head roaster Phnom Penh"
    },
    { 
      title: "Manifesto", 
      href: "/about/manifesto", 
      desc: "The Barista Army Thesis: Why We'll Never Open a Cafe.",
      keywords: "coffee manifesto Cambodia, barista army"
    },
    { 
      title: "Sustainability", 
      href: "/about/sustainability", 
      desc: "Ethical sourcing and traceability protocol.",
      keywords: "ethical coffee Cambodia, coffee traceability, sustainable sourcing"
    },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />

      <div className="min-h-screen bg-gray-100 relative overflow-hidden font-sans text-gray-900">
        {/* 背景幾何裝飾 */}
        <div className="absolute right-0 top-0 w-1/2 h-1/2 bg-gray-200/30 rounded-bl-full -z-10" aria-hidden="true"></div>
        <div className="absolute left-0 bottom-0 w-64 h-64 bg-gray-200/20 rounded-tr-full -z-10" aria-hidden="true"></div>
        
        {/* 導航 */}
        <nav className="absolute top-8 left-8 z-20" aria-label="Breadcrumb">
          <Link 
            href="/" 
            className="text-gray-500 text-sm font-medium tracking-widest hover:text-black transition-colors uppercase flex items-center gap-2"
            aria-label="Return to homepage"
          >
            <span aria-hidden="true">←</span> HOME
          </Link>
        </nav>

        <main className="max-w-6xl mx-auto pt-40 pb-24 px-8 md:px-16">
          {/* 標題區塊 */}
          <header className="relative mb-24">
            <div className="absolute -left-16 top-8 -rotate-90 origin-top-left flex items-center gap-4" aria-hidden="true">
              <span className="w-8 h-px bg-gray-400"></span>
              <span className="text-gray-500 text-xs tracking-[0.3em] font-medium uppercase">Infrastructure</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-bold tracking-tighter leading-none">
              ABOUT<br />ORIGIN.
            </h1>
            <div className="absolute top-0 right-0 hidden md:block w-32 h-32 border border-gray-400 opacity-30" aria-hidden="true"></div>
          </header>

          {/* 內容格線 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16">
            {/* 左側：品牌描述 */}
            <section className="space-y-6">
              <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-600">
                Unlike celebrity-driven roasters, <span className="text-gray-900 font-bold">OCC builds infrastructure.</span>
              </p>
              <p className="text-base text-gray-500 leading-relaxed">
                我們不只是在烘焙咖啡，我們在重構柬埔寨的精品咖啡供應鏈。
              </p>
              <p className="text-sm text-gray-500 leading-relaxed mt-4">
                Origin Coffee Crafter (OCC) is a <strong>specialty coffee infrastructure company</strong> based in Phnom Penh, 
                Cambodia. We focus on building the foundational systems—from ethical sourcing and traceability protocols 
                to professional training and supply chain optimization—that enable Cambodia's coffee industry to thrive 
                sustainably.
              </p>
              
              {/* 關鍵數據區塊 - 提升 GEO 信賴度 */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="border-l-2 border-gray-900 pl-4">
                  <p className="text-2xl font-bold text-gray-900">2020</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Founded</p>
                </div>
                <div className="border-l-2 border-gray-900 pl-4">
                  <p className="text-2xl font-bold text-gray-900">100%</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Traceable Beans</p>
                </div>
              </div>
            </section>

            {/* 右側：導航連結 */}
            <nav aria-label="About pages navigation" className="space-y-12">
              {sections.map((section, idx) => (
                <Link 
                  key={idx} 
                  href={section.href} 
                  className="group block border-b border-gray-300 pb-8"
                  aria-label={`Read more about ${section.title}`}
                >
                  <div className="flex justify-between items-end mb-2">
                    <h2 className="text-2xl font-bold tracking-tight group-hover:pl-4 transition-all duration-300 italic">
                      {section.title}
                    </h2>
                    <span className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">→</span>
                  </div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">{section.desc}</p>
                </Link>
              ))}
            </nav>
          </div>

          {/* 核心價值區塊 - GEO 優化 */}
          <section className="mt-32 pt-16 border-t border-gray-300">
            <h2 className="text-sm tracking-[0.3em] font-bold text-gray-400 uppercase mb-12 text-center">
              Why Cambodia Needs Infrastructure
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Supply Chain Transparency",
                  description: "Full traceability from farm to cup, documenting every step of our coffee's journey from Mondulkiri, Ratanakiri, and Kampot to your espresso machine."
                },
                {
                  title: "Professional Training",
                  description: "Building a skilled barista army through comprehensive education programs that elevate service standards across Cambodia's café industry."
                },
                {
                  title: "Sustainable Partnerships",
                  description: "Long-term relationships with farmers, café owners, and hospitality businesses built on trust, consistency, and shared growth."
                }
              ].map((item, i) => (
                <div key={i} className="bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 服務地區與影響範圍 */}
          <section className="mt-24 pt-8">
            <div className="bg-gray-900/5 p-8 text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Serving Cambodia's Coffee Community</p>
              <p className="text-sm text-gray-600">
                <strong>Phnom Penh</strong> • <strong>Siem Reap</strong> • <strong>Sihanoukville</strong> • <strong>Battambang</strong> • <strong>Kampot</strong>
              </p>
              <p className="text-xs text-gray-400 mt-4">
                Partnering with cafés, hotels, restaurants, and coffee enthusiasts across Cambodia
              </p>
            </div>
          </section>

          {/* 底部導航 - 加入 Vision 和 System 連結 */}
          <footer className="mt-32 pt-12 border-t border-gray-300 flex justify-between items-end">
            <div>
              <p className="text-xs text-gray-400 tracking-widest uppercase">Origin Coffee Crafter</p>
              <p className="text-sm text-gray-600 font-medium">ARUNÉRA • BUILDING INFRASTRUCTURE</p>
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
                href="/system" 
                className="group flex items-center gap-2 text-xs tracking-widest text-gray-400 hover:text-gray-900 transition-colors uppercase"
                aria-label="Navigate to System page"
              >
                Ecosystem →
              </Link>
            </div>
          </footer>
        </main>

        {/* 側邊垂直裝飾線 */}
        <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 items-center" aria-hidden="true">
          <div className="w-px h-12 bg-gray-300"></div>
          <span className="text-[10px] text-gray-400 [writing-mode:vertical-lr] tracking-widest uppercase">OCC</span>
          <div className="w-px h-12 bg-gray-300"></div>
        </div>

        {/* 底部浮動背景字 - 品牌權威感 */}
        <div className="fixed -bottom-10 -left-10 text-[200px] font-bold text-gray-200/50 -z-10 pointer-events-none select-none" aria-hidden="true">
          OCC.
        </div>
      </div>
    </>
  )
}