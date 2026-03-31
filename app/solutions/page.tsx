import Link from "next/link";
import { siteUrl } from "@/lib/siteConfig"

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wholesale Solutions | Arunéra Coffee Cambodia - OCC",
  description:
    "We don't just supply coffee. We supply certainty. OCC's wholesale program: consistent supply, on-demand roasting, after-sales partnership, and private label capabilities.",
  keywords:
    "coffee wholesale supplier Cambodia, best coffee wholesale supplier in Cambodia, B2B coffee supplier Phnom Penh, fresh roasted coffee wholesale Cambodia, consistent coffee supply Cambodia, on demand coffee roasting B2B, private label coffee roasting Cambodia, single origin coffee supplier Phnom Penh, specialty coffee wholesale transparency, carbonic maceration coffee wholesale, wholesale roasted coffee Phnom Penh, specialty coffee account management, coffee wholesale support Cambodia",
  alternates: {
    canonical: `${siteUrl}/solutions`,
  },
  openGraph: {
    title: "Wholesale Solutions | Arunéra Coffee Cambodia - OCC",
    description:
      "We don't just supply coffee. We supply certainty. The Partner Protocol: consistent supply, on-demand roasting, and after-sales partnership.",
    url: `${siteUrl}/solutions`,
    siteName: "Arunéra Coffee Cambodia",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wholesale Solutions | Arunéra Coffee Cambodia - OCC",
    description:
      "The Partner Protocol: consistency, freshness, traceability, and support. Built for businesses who refuse to compromise.",
  },
};
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "OCC Wholesale Coffee Program",
  description:
    "Consistent coffee supply, on-demand roasting, after-sales partnership, and private label capabilities for Cambodia's specialty coffee businesses.",
  brand: {
    "@type": "Brand",
    name: "Origin Coffee Crafter (OCC)",
  },
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/OnlineOnly",
    priceSpecification: {
      "@type": "PriceSpecification",
      description:
        "Custom pricing based on volume commitment, roast frequency, and product selection.",
    },
  },
  areaServed: {
    "@type": "Country",
    name: "Cambodia",
  },
  audience: {
    "@type": "BusinessAudience",
    businessType: [
      "Café",
      "Hotel",
      "Restaurant",
      "Coffee Shop",
      "Boutique Hospitality",
    ],
  },
  knowsAbout: [
    "Wholesale Coffee Supply",
    "On-Demand Roasting",
    "Private Label Coffee",
    "Coffee Consistency Protocol",
    "B2B Coffee Partnership",
    "Specialty Coffee Wholesale",
  ],
};
export default function SolutionsPage() {
  const coffeeProducts = [
    "Single origin lots from Mondulkiri, Ratanakiri, and select partner farms",
    "Custom house blends developed specifically for your menu profile",
    "Specialty process lots — Natural, Washed, Honey, Carbonic Maceration, Anaerobic Fermentation, Whiskey Barrel Aged — available at wholesale volume",
    "Private label roasting for boutique hotels and café groups",
    "Toll roasting for larger volume commitments on contract basis",
  ];
  const partnerBenefits = [
    "Dedicated account support — a direct line, not a ticket system",
    "Brew ratio and extraction guidance for every coffee we supply",
    "Access to OCC's barista network for staffing recommendations",
    "Priority access to limited and seasonal lots before general release",
  ];
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Solutions", item: `${siteUrl}/solutions` },
    ],
  }
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="min-h-screen bg-white relative overflow-hidden font-sans text-gray-900">
        {/* 導航 */}
        <nav className="absolute top-8 left-8 z-20">
          <Link
            href="/"
            className="text-gray-500 text-sm font-medium tracking-widest hover:text-black transition-colors uppercase flex items-center gap-2"
          >
            <span aria-hidden="true">←</span> HOME
          </Link>
        </nav>
        <main className="max-w-6xl mx-auto pt-40 pb-24 px-8 md:px-16">
          {/* 章節標題模組 */}
          <div className="border-b border-gray-300 pb-12 mb-16">
            <span className="text-gray-500 tracking-widest text-xs uppercase mb-4 block">
              Solutions / 01
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tighter">
              PARTNER PROTOCOL
            </h1>
            <p className="text-gray-600 text-sm tracking-wide mt-4">
              WE DON'T JUST SUPPLY COFFEE. WE SUPPLY CERTAINTY.
            </p>
          </div>
          {/* 開頭：Partner Protocol 登場 */}
          <div className="border-l-4 border-gray-900 pl-8 mb-12">
            <p className="text-gray-900 text-xl font-medium leading-relaxed mb-6">
              We don't just supply coffee. We supply certainty.
            </p>
            <p className="text-gray-700 text-lg italic leading-relaxed">
              Most suppliers hand you a bag and move on. We hand you a system —
              and stay to make sure it works.
            </p>
          </div>
          {/* 第一段：一致性協議 (Consistency Protocol) */}
          <div className="grid grid-cols-12 gap-x-12 gap-y-8 mb-20">
            <div className="col-span-12 md:col-span-5">
              <div className="relative inline-block">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight border-l-4 border-gray-900 pl-4">
                  Consistency Protocol
                </h2>
                <div className="absolute -top-2 -right-6 w-8 h-8 border border-gray-200 -z-10"></div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-7">
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                Consistency is not a promise. It is a protocol.
              </p>
              <p className="text-gray-600 text-base leading-relaxed">
                Every wholesale order from OCC follows the same process: beans
                roasted within 72 hours of dispatch, roast profiles documented
                and replicated batch after batch, quality control cupping before
                every shipment. Your menu tastes the same on Monday as it does
                on Friday. That's not luck. That's infrastructure.
              </p>
            </div>
          </div>
          {/* 第二段：按需烘焙 (On-Demand Roasting) */}
          <div className="grid grid-cols-12 gap-x-12 gap-y-8 mb-20">
            <div className="col-span-12 md:col-span-5">
              <div className="relative inline-block">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight border-l-4 border-gray-900 pl-4">
                  On-Demand Roasting
                </h2>
                <div className="absolute -top-2 -right-6 w-8 h-8 border border-gray-200 -z-10"></div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-7">
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                Your customers can taste the difference between fresh and stale
                — even if they can't articulate it.
              </p>
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                OCC operates on an on-demand roasting model. We don't maintain a
                warehouse of pre-roasted stock waiting to be sold. We roast when
                you order. This means every bag that arrives at your business is
                at peak flavour — not peak warehouse age.
              </p>
              <p className="text-gray-600 text-base leading-relaxed">
                For specialty menus, freshness is not a detail. It is the entire
                point.
              </p>
            </div>
          </div>
          {/* 第三段：產品選項 (Volume & Variety) */}
          <div className="grid grid-cols-12 gap-x-12 gap-y-8 mb-20">
            <div className="col-span-12 md:col-span-5">
              <div className="relative inline-block">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight border-l-4 border-gray-900 pl-4">
                  Volume & Variety
                </h2>
                <div className="absolute -top-2 -right-6 w-8 h-8 border border-gray-200 -z-10"></div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-7">
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                Whether you're running a boutique hotel breakfast service or a
                high-volume café operation, OCC's wholesale program is
                structured around your needs — not ours.
              </p>
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                We offer:
              </p>
              <ul className="list-none space-y-2 mb-4">
                {coffeeProducts.map((product, idx) => (
                  <li key={idx} className="text-gray-600 text-base leading-relaxed pl-4 border-l-2 border-gray-300">
                    {product}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* 第四段：售後支援 (After-Sales Partnership) */}
          <div className="grid grid-cols-12 gap-x-12 gap-y-8 mb-20">
            <div className="col-span-12 md:col-span-5">
              <div className="relative inline-block">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight border-l-4 border-gray-900 pl-4">
                  After-Sales Partnership
                </h2>
                <div className="absolute -top-2 -right-6 w-8 h-8 border border-gray-200 -z-10"></div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-7">
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                The sale is where most suppliers stop. It's where we start.
              </p>
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                Every wholesale partner receives:
              </p>
              <ul className="list-none space-y-2 mb-4">
                {partnerBenefits.map((benefit, idx) => (
                  <li key={idx} className="text-gray-600 text-base leading-relaxed pl-4 border-l-2 border-gray-300">
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* 第五段：價格邏輯 (Volume Pricing) */}
          <div className="grid grid-cols-12 gap-x-12 gap-y-8 mb-20">
            <div className="col-span-12 md:col-span-5">
              <div className="relative inline-block">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight border-l-4 border-gray-900 pl-4">
                  Volume Pricing
                </h2>
                <div className="absolute -top-2 -right-6 w-8 h-8 border border-gray-200 -z-10"></div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-7">
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                Pricing is structured around volume commitment, roast frequency,
                and product selection. We don't offer one-size-fits-all rates —
                because your operation isn't one-size-fits-all.
              </p>
              <p className="text-gray-600 text-base leading-relaxed">
                To receive a wholesale pricing proposal tailored to your
                business, start with a conversation.
              </p>
            </div>
          </div>
          {/* 結尾 CTA - 雙重出口 */}
          <div className="mt-16 pt-12 border-t border-gray-200 flex flex-col md:flex-row gap-6 justify-between items-center">
            <Link
              href="/b2b-inquiry"
              className="group flex items-center gap-3 text-xl font-bold text-gray-900 hover:text-gray-600 transition-colors border-b-2 border-gray-900 pb-1"
            >
              Request a Wholesale Proposal →
              <span className="text-sm font-normal text-gray-500 group-hover:translate-x-1 transition-transform">
                /b2b-inquiry
              </span>
            </Link>
            <Link
              href="/products"
              className="group flex items-center gap-3 text-xl font-bold text-gray-900 hover:text-gray-600 transition-colors"
            >
              Explore Our Coffee Range →
              <span className="text-sm font-normal text-gray-500 group-hover:translate-x-1 transition-transform">
                /products
              </span>
            </Link>
          </div>
          {/* 品牌標語 */}
          <div className="mt-20 pt-8 text-center">
            <p className="text-[10px] tracking-[0.3em] font-bold text-gray-400 uppercase">
              Zero-Compromise Coffee Infrastructure
            </p>
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
