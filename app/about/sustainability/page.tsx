import Link from "next/link";
import { siteUrl } from "@/lib/siteConfig"

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sustainability | Arunéra Coffee Cambodia - OCC",
  description:
    "Ethical sourcing and traceability protocol. Every coffee we carry has a name, a location, and a story. We operate on direct trade, pay above market rate, and document every link in the supply chain.",
  keywords:
    "ethical coffee Cambodia, traceable coffee beans Cambodia, direct trade coffee Cambodia, Mondulkiri coffee origin, Ratanakiri arabica sourcing, sustainable coffee farming Cambodia, coffee traceability protocol, specialty coffee wholesale transparency, fair trade specialty coffee Southeast Asia, shade grown coffee Mondulkiri",
  alternates: {
    canonical: `${siteUrl}/about/sustainability`,
  },
  openGraph: {
    title: "Sustainability | Arunéra Coffee Cambodia - OCC",
    description:
      "Ethical sourcing and traceability protocol. A cup is only as honest as the chain behind it. We built ours to withstand scrutiny at every link.",
    url: `${siteUrl}/about/sustainability`,
    siteName: "Arunéra Coffee Cambodia",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sustainability | Arunéra Coffee Cambodia - OCC",
    description:
      "Ethical sourcing and traceability protocol. Direct trade. Traceable beans. Environmental responsibility.",
  },
};
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "OCC Sustainability — Ethical Sourcing and Traceability Protocol",
  description:
    "Every coffee we carry has a name, a location, and a story. We work directly with farmers across Mondulkiri, Ratanakiri, and beyond. Traceability is not optional — it is the foundation of specialty coffee done right.",
  url: `${siteUrl}/about/sustainability`,
  isPartOf: {
    "@type": "Organization",
    name: "Origin Coffee Crafter (OCC)",
    description:
      "Specialty coffee infrastructure company based in Phnom Penh, Cambodia.",
  },
  mainEntity: {
    "@type": "Organization",
    name: "Origin Coffee Crafter (OCC)",
    description:
      "Ethical coffee supplier Cambodia operating on direct trade model with full traceability from farm to cup.",
    areaServed: {
      "@type": "Country",
      name: "Cambodia",
    },
    makesOffer: [
      {
        "@type": "Offer",
        name: "Traceable Specialty Coffee",
        description:
          "Every batch carries complete record: farm coordinates, processing method, roast date, cupping score.",
      },
      {
        "@type": "Offer",
        name: "Direct Trade Coffee",
        description:
          "We pay above market rate for exceptional lots and build long-term relationships with farmers.",
      },
    ],
    knowsAbout: [
      "Ethical Coffee Sourcing",
      "Coffee Traceability",
      "Direct Trade",
      "Sustainable Coffee Farming",
      "Mondulkiri Coffee",
      "Ratanakiri Arabica",
      "Specialty Coffee Supply Chain",
    ],
  },
};
const originSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Arunera Coffee Origins",
  itemListElement: [
    {
      "@type": "Place",
      name: "Mondulkiri Province",
      description: "Highland coffee region in Eastern Cambodia known for volcanic soil.",
      geo: { "@type": "GeoCoordinates", latitude: 12.46, longitude: 107.10 },
    },
    {
      "@type": "Place",
      name: "Ratanakiri Province",
      description: "Northeastern province famous for its rich red soil and premium Robusta.",
      geo: { "@type": "GeoCoordinates", latitude: 13.73, longitude: 107.01 },
    },
    {
      "@type": "Place",
      name: "Kampot Province",
      description: "Coastal region producing unique flavor profiles due to sea breeze.",
      geo: { "@type": "GeoCoordinates", latitude: 10.62, longitude: 104.18 },
    },
  ],
};
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Where does Arunéra source its coffee in Cambodia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Arunéra sources directly from highland farming communities in Mondulkiri and Ratanakiri provinces in eastern Cambodia, as well as coastal estates in Kampot. Each lot is purchased through direct trade relationships with individual farmers, bypassing commodity markets entirely.",
      },
    },
    {
      "@type": "Question",
      name: "What does direct trade mean for Cambodian coffee farmers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Direct trade means Arunéra negotiates price individually with each farm, consistently paying above Fair Trade floor prices. Farmers receive payment within 30 days of delivery, retain full decision-making over processing methods, and receive written feedback from every cupping session so they can improve quality year-over-year.",
      },
    },
    {
      "@type": "Question",
      name: "How does OCC verify the traceability of its coffee supply chain?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every batch in the OCC system carries a full traceability record: GPS coordinates of the farm plot, the processing method used (washed, natural, or honey), harvest date, roast date, and cupping score. Wholesale clients receive this documentation with every order as standard.",
      },
    },
    {
      "@type": "Question",
      name: "Is Cambodian specialty coffee certified organic or Fair Trade?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most small-scale highland farms in Cambodia practice chemical-free cultivation without holding formal organic certification, as the certification cost is prohibitive for individual smallholders. OCC's direct trade model provides greater farmer premiums than Fair Trade certification in practice, and we document farming practices as part of our traceability protocol.",
      },
    },
    {
      "@type": "Question",
      name: "What environmental practices does Arunéra require from its farm partners?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "OCC prioritises farms that use shade-grown cultivation to preserve forest canopy, manage wastewater from wet processing to avoid stream contamination, and avoid synthetic pesticides. These practices are assessed during annual farm visits and documented in our supplier records.",
      },
    },
  ],
}
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "About", item: `${siteUrl}/about` },
    { "@type": "ListItem", position: 3, name: "Sustainability", item: `${siteUrl}/about/sustainability` },
  ],
}
export default function SustainabilityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(originSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="min-h-screen bg-white relative overflow-hidden font-sans text-gray-900">
        {/* 導航 */}
        <nav className="absolute top-8 left-8 z-20">
          <Link
            href="/about"
            className="text-gray-500 text-sm font-medium tracking-widest hover:text-black transition-colors uppercase flex items-center gap-2"
          >
            <span aria-hidden="true">←</span> BACK TO ABOUT
          </Link>
        </nav>
        <main className="max-w-6xl mx-auto pt-40 pb-24 px-8 md:px-16">
          {/* 章節標題模組 */}
          <div className="border-b border-gray-300 pb-12 mb-16">
            <span className="text-gray-500 tracking-widest text-xs uppercase mb-4 block">
              About / 04
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tighter">
              SUSTAINABILITY
            </h1>
            <p className="text-gray-600 text-sm tracking-wide mt-4">
              ETHICAL SOURCING AND TRACEABILITY PROTOCOL.
            </p>
          </div>
          {/* 開頭：呼應品牌箴言 */}
          <div className="border-l-4 border-gray-900 pl-8 mb-12">
            <p className="text-gray-900 text-xl font-medium leading-relaxed mb-6">
              Perfection is not a destination. It applies to everything —
              including how we source.
            </p>
            <p className="text-gray-700 text-lg italic leading-relaxed">
              A cup is only as honest as the chain behind it. We built ours to
              withstand scrutiny at every link.
            </p>
          </div>
          {/* 第一段：產地透明度 (Origin Transparency) */}
          <div className="grid grid-cols-12 gap-x-12 gap-y-8 mb-20">
            <div className="col-span-12 md:col-span-5">
              <div className="relative inline-block">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight border-l-4 border-gray-900 pl-4">
                  Origin Transparency
                </h2>
                <div className="absolute -top-2 -right-6 w-8 h-8 border border-gray-200 -z-10"></div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-7">
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                Every coffee we carry has a name, a location, and a story that
                begins long before it reaches our roastery. We work directly
                with farmers and cooperatives across Cambodia's finest growing
                regions — Mondulkiri, Ratanakiri, and beyond — ensuring that
                origin transparency is not a marketing claim, but a documented
                reality.
              </p>
              <p className="text-gray-600 text-base leading-relaxed">
                When you order from OCC, you know where your coffee came from.
                Not just the country. The farm. The altitude. The harvest
                season. Because traceability is not optional — it is the
                foundation of specialty coffee done right.
              </p>
            </div>
          </div>
          {/* 第二段：道德採購承諾 (Ethical Sourcing Protocol) */}
          <div className="grid grid-cols-12 gap-x-12 gap-y-8 mb-20">
            <div className="col-span-12 md:col-span-5">
              <div className="relative inline-block">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight border-l-4 border-gray-900 pl-4">
                  Ethical Sourcing Protocol
                </h2>
                <div className="absolute -top-2 -right-6 w-8 h-8 border border-gray-200 -z-10"></div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-7">
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                Cambodia's coffee farmers operate in one of Southeast Asia's
                most underrecognized growing regions. Their craft deserves fair
                recognition — not just in the cup, but in the price they receive
                for their work.
              </p>
              <p className="text-gray-600 text-base leading-relaxed">
                OCC operates on a direct trade model wherever possible. We pay
                above market rate for exceptional lots. We build relationships
                that last beyond a single harvest. Because a supply chain built
                on shortcuts produces exactly that — shortcuts in the cup.
              </p>
            </div>
          </div>
          {/* 第三段：可追溯性協議 (Traceability Protocol) */}
          <div className="grid grid-cols-12 gap-x-12 gap-y-8 mb-20">
            <div className="col-span-12 md:col-span-5">
              <div className="relative inline-block">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight border-l-4 border-gray-900 pl-4">
                  Traceability Protocol
                </h2>
                <div className="absolute -top-2 -right-6 w-8 h-8 border border-gray-200 -z-10"></div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-7">
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                Every batch that leaves our roastery carries a complete record
                — farm coordinates, processing method, roast date, and cupping
                score. This is not compliance documentation. It is our
                commitment to accountability at every stage of the supply
                chain.
              </p>
              <p className="text-gray-600 text-base leading-relaxed">
                For our wholesale partners, this means you can answer every
                question your customers ask about what's in their cup. For us,
                it means we answer for everything — exactly as we promised.
              </p>
            </div>
          </div>
          {/* 第四段：環境責任 (Environmental Commitment) */}
          <div className="grid grid-cols-12 gap-x-12 gap-y-8 mb-20">
            <div className="col-span-12 md:col-span-5">
              <div className="relative inline-block">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight border-l-4 border-gray-900 pl-4">
                  Environmental Commitment
                </h2>
                <div className="absolute -top-2 -right-6 w-8 h-8 border border-gray-200 -z-10"></div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-7">
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                Specialty coffee and environmental responsibility are not in
                conflict — they are dependent on each other. The highland
                ecosystems of Mondulkiri and Ratanakiri that produce Cambodia's
                finest arabica are fragile. Protecting them is not a corporate
                initiative. It is a prerequisite for everything we do.
              </p>
              <p className="text-gray-600 text-base leading-relaxed">
                We prioritize suppliers who practice shade-grown cultivation,
                water conservation, and responsible land management. Not because
                it makes for good marketing. Because without healthy farms,
                there is no story worth telling.
              </p>
            </div>
          </div>
          {/* 結尾：回到品牌核心，自然橋接到 Solutions */}
          <div className="border-l-4 border-gray-900 pl-8 mt-16 mb-12">
            <p className="text-gray-900 text-lg font-medium leading-relaxed mb-4">
              Settle for nothing. Answer for everything. This is what that means
              in practice — from the farm to the roastery, from the roastery to
              your cup.
            </p>
            <p className="text-gray-700 text-base leading-relaxed">
              If you're looking for a coffee partner who holds their supply
              chain to the same standard as their roast profiles, you're in the
              right place.
            </p>
          </div>
          {/* 結尾：導向 Solutions */}
          <div className="mt-12 pt-8 border-t border-gray-200 flex justify-between items-center">
            <div className="text-left">
              <Link
                href="/solutions"
                className="group flex items-center gap-3 text-xl font-bold text-gray-900 hover:text-gray-600 transition-colors"
              >
                Explore Our Solutions
                <span className="text-xl opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                  →
                </span>
              </Link>
            </div>
            <div className="hidden md:block text-right text-xs text-gray-400">
              About / 04
            </div>
          </div>
        </main>
        {/* 底部浮動背景字 */}
        <div
          className="fixed -bottom-10 -left-10 text-[200px] font-bold text-gray-200/50 -z-10 pointer-events-none select-none"
          aria-hidden="true"
        >
          OCC.
        </div>
      </div>
    </>
  );
}
