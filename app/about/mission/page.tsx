import Link from "next/link";
import { siteUrl } from "@/lib/siteConfig"

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mission | Arunéra Coffee Cambodia - OCC",
  description:
    "OCC exists to empower Cambodia's coffee community through exceptional roasting, knowledge, and training. Learn our vision, mission, and purpose.",
  keywords:
    "specialty coffee supplier Cambodia, coffee roaster Phnom Penh, Cambodia coffee culture, coffee mission, OCC mission",
  alternates: {
    canonical: `${siteUrl}/about/mission`,
  },
  openGraph: {
    title: "Mission | Arunéra Coffee Cambodia - OCC",
    description:
      "Vision, Mission, and Why We Exist. OCC exists to close the gap in Cambodia's coffee market.",
    url: `${siteUrl}/about/mission`,
    siteName: "Arunéra Coffee Cambodia",
    locale: "en_US",
    type: "website",
  },
};
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "OCC Mission",
  description: "Vision, Mission, and Why We Exist",
  url: `${siteUrl}/about/mission`,
  isPartOf: {
    "@type": "Organization",
    name: "Origin Coffee Crafter (OCC)",
    description:
      "Specialty coffee supplier Cambodia, coffee roaster Phnom Penh, empowering Cambodia's coffee culture.",
  },
};
export default function MissionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
              About / 01
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tighter">
              MISSION
            </h1>
            <p className="text-gray-600 text-sm tracking-wide mt-4">
              VISION, MISSION, AND WHY WE EXIST.
            </p>
          </div>
          {/* ① 箴言 + ② 品牌宣言 + ③ 橋樑句 */}
          <div className="border-l-4 border-gray-900 pl-8 mb-20">
            <p className="text-gray-700 text-xl italic mb-6 leading-relaxed">
              “Settle for nothing. Answer for everything.”
            </p>
            <p className="text-gray-700 text-xl italic mb-6 leading-relaxed">
              “Standards are not negotiable. Excellence is not optional.”
            </p>
            <p className="text-gray-900 font-semibold text-lg mt-8 tracking-tight">
              This is not a philosophy we hang on the wall. It is the reason OCC
              exists.
            </p>
          </div>
          {/* ④ Vision */}
          <div className="grid grid-cols-12 gap-x-12 gap-y-8 mb-20">
            <div className="col-span-12 md:col-span-5">
              <div className="relative inline-block">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight border-l-4 border-gray-900 pl-4">
                  Vision
                </h2>
                <div className="absolute -top-2 -right-6 w-8 h-8 border border-gray-200 -z-10"></div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-7">
              <p className="text-gray-600 text-base leading-relaxed">
                To inspire and elevate Cambodia's coffee culture through
                knowledge, craftsmanship, and education.
              </p>
            </div>
          </div>
          {/* ⑤ Mission */}
          <div className="grid grid-cols-12 gap-x-12 gap-y-8 mb-20">
            <div className="col-span-12 md:col-span-5">
              <div className="relative inline-block">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight border-l-4 border-gray-900 pl-4">
                  Mission
                </h2>
                <div className="absolute -top-2 -right-6 w-8 h-8 border border-gray-200 -z-10"></div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-7">
              <p className="text-gray-600 text-base leading-relaxed">
                To empower Cambodia's coffee community by supplying exceptionally
                roasted coffee, sharing practical knowledge, and supporting
                partners with the tools and training they need to thrive.
              </p>
            </div>
          </div>
          {/* ⑥ Why We Exist（段落） */}
          <div className="grid grid-cols-12 gap-x-12 gap-y-8 mb-20">
            <div className="col-span-12 md:col-span-5">
              <div className="relative inline-block">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight border-l-4 border-gray-900 pl-4">
                  Why We Exist
                </h2>
                <div className="absolute -top-2 -right-6 w-8 h-8 border border-gray-200 -z-10"></div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-7">
              <p className="text-gray-600 text-base leading-relaxed">
                Cambodia's coffee market has a problem — not with its origins,
                but with what happens after. Inconsistent roasts. Undertrained
                baristas. Suppliers who disappear after the sale.
              </p>
              <p className="text-gray-900 font-medium text-base leading-relaxed mt-4">
                OCC was built to close that gap. Not just as a supplier, but as
                a partner in every cup that carries our name.
              </p>
            </div>
          </div>
          {/* 結尾：自然導向下一個分頁 Founder */}
          <div className="mt-32 pt-12 border-t border-gray-200 flex justify-between items-center">
            <div className="text-left">
              <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">
                Next
              </p>
              <Link
                href="/about/founder"
                className="group flex items-center gap-3 text-2xl font-bold text-gray-900 hover:text-gray-600 transition-colors"
              >
                Founder
                <span className="text-xl opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                  →
                </span>
              </Link>
              <p className="text-sm text-gray-500 mt-2">
                Philosophy, Credentials, and the Big Idea.
              </p>
            </div>
            <div className="hidden md:block text-right text-xs text-gray-400">
              About / 01
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
