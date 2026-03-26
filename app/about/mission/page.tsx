// app/about/mission/page.tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mission | Arunéra Coffee Cambodia - OCC",
  description: "OCC exists to empower Cambodia's coffee community through exceptional roasting, knowledge, and training. Learn our vision, mission, and purpose.",
  keywords: "specialty coffee supplier Cambodia, coffee roaster Phnom Penh, Cambodia coffee culture, coffee mission, OCC mission",
  alternates: {
    canonical: "https://arunera.com/about/mission",
  },
  openGraph: {
    title: "Mission | Arunéra Coffee Cambodia - OCC",
    description: "Vision, Mission, and Why We Exist. OCC exists to close the gap in Cambodia's coffee market.",
    url: "https://arunera.com/about/mission",
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
  url: "https://arunera.com/about/mission",
  isPartOf: {
    "@type": "Organization",
    name: "Origin Coffee Crafter (OCC)",
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

          {/* 引言區塊 - border-l-4 */}
          <div className="border-l-4 border-gray-900 pl-8 mb-20">
            <p className="text-gray-700 text-xl italic mb-6 leading-relaxed">
              “Settle for nothing. Answer for everything.”
            </p>
            <p className="text-gray-700 text-xl italic mb-6 leading-relaxed">
              “Standards are not negotiable. Excellence is not optional.”
            </p>
            <p className="text-gray-900 font-semibold text-lg mt-8 tracking-tight">
              This is not a philosophy we hang on the wall. It is the reason OCC exists.
            </p>
          </div>

          {/* 非對稱網格 - Vision */}
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

          {/* 非對稱網格 - Mission */}
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

          {/* 非對稱網格 - Why We Exist */}
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
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                Cambodia's coffee market has a problem — not with its origins, but
                with what happens after. Inconsistent roasts. Undertrained
                baristas. Suppliers who disappear after the sale.
              </p>
              <p className="text-gray-900 font-medium text-base leading-relaxed">
                OCC was built to close that gap. Not just as a supplier, but as a
                partner in every cup that carries our name.
              </p>
            </div>
          </div>

          {/* 技術規格卡片 - SEO 關鍵詞 */}
          <div className="mt-20 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                "Specialty Coffee Supplier Cambodia",
                "Coffee Roaster Phnom Penh",
                "Cambodia Coffee Culture",
                "Ethical Sourcing",
                "Barista Training",
              ].map((item) => (
                <div
                  key={item}
                  className="border border-gray-300 p-4 text-[10px] font-bold tracking-widest uppercase text-gray-500 hover:text-gray-900 hover:border-gray-900 transition-all duration-300 text-center flex items-center justify-center min-h-[80px] group"
                >
                  <span className="group-hover:pl-1 transition-all duration-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 強調內容塊 */}
          <section className="relative mt-20 bg-white p-12 shadow-sm border border-gray-100 group hover:bg-gray-50 transition-colors duration-300">
            <div className="absolute -top-4 -right-4 w-24 h-24 border border-gray-300 -z-10"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 border border-gray-200 -z-10"></div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight italic">
              The Partner Protocol
            </h2>
            <p className="text-gray-600 text-sm leading-loose max-w-2xl">
              We don't just supply coffee. We supply certainty. Every bag, every
              roast, every interaction follows a single principle:{' '}
              <span className="text-gray-900 font-bold underline">
                consistency is not optional
              </span>
              . From farm to cup, from training to after-sales support — we
              answer for everything.
            </p>
            <div className="mt-8 pt-4 border-t border-gray-200 group-hover:border-gray-400 transition-colors duration-300">
              <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 group-hover:text-gray-600 transition-colors duration-300">
                OCC — Zero-Compromise Coffee Infrastructure
              </span>
            </div>
          </section>
        </main>

        {/* 底部浮動背景字 */}
        <div className="fixed -bottom-10 -left-10 text-[200px] font-bold text-gray-200/50 -z-10 pointer-events-none select-none">
          OCC.
        </div>
      </div>
    </>
  );
}