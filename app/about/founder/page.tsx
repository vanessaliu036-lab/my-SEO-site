import Link from "next/link";
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Founder | Origin Coffee Cambodia - OCC",
  description:
    "OCC didn't begin with a business plan. It began with a question no one in Cambodia's coffee industry was asking. Meet the philosophy behind the craft.",
  keywords:
    "coffee founder Cambodia, OCC founder, specialty coffee philosophy Cambodia, coffee craftsmanship, Phnom Penh coffee roaster origin",
  alternates: pageAlternates("/about/founder"),
  openGraph: {
    title: "Founder | Origin Coffee Cambodia - OCC",
    description:
      "Philosophy, Credentials, and the Big Idea. OCC didn't begin with a business plan. It began with a question no one was asking.",
    url: `${siteUrl}/about/founder`,
    siteName: "Origin Coffee Cambodia",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Founder | Origin Coffee Cambodia - OCC",
    description:
      "Philosophy, Credentials, and the Big Idea. The story behind Cambodia's most uncompromising coffee infrastructure company.",
  },
};
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "OCC Founder — Philosophy, Credentials, and the Big Idea",
  description:
    "OCC didn't begin with a business plan. It began with a question no one in Cambodia's coffee industry was asking: why does a great origin produce a forgettable cup?",
  url: `${siteUrl}/about/founder`,
  isPartOf: {
    "@type": "Organization",
    name: "Origin Coffee Cambodia (OCC)",
    description:
      "Specialty coffee infrastructure company based in Phnom Penh, Cambodia.",
  },
  mainEntity: {
    "@type": "Person",
    name: "OCC Founder",
    jobTitle: "Founder & Head Roaster",
    description:
      "Craftsman who refused to accept that Cambodia's coffee culture was defined by its weakest cup.",
    knowsAbout: [
      "Specialty Coffee Roasting",
      "Coffee Supply Chain Infrastructure",
      "Barista Training",
      "Coffee Traceability",
      "Cambodian Coffee Industry",
    ],
  },
};
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "About", item: `${siteUrl}/about` },
    { "@type": "ListItem", position: 3, name: "Founder", item: `${siteUrl}/about/founder` },
  ],
}
export default function FounderPage() {
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
              About / 02
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tighter">
              FOUNDER
            </h1>
            <p className="text-gray-600 text-sm tracking-wide mt-4">
              PHILOSOPHY, CREDENTIALS, AND THE BIG IDEA.
            </p>
          </div>
          {/* 開頭：信念的起源 */}
          <div className="border-l-4 border-gray-900 pl-8 mb-20">
            <p className="text-gray-900 text-xl font-medium leading-relaxed mb-6">
              OCC didn't begin with a business plan. It began with a question no
              one in Cambodia's coffee industry was asking: why does a great
              origin produce a forgettable cup?
            </p>
          </div>
          {/* 核心理念段落：創辦人看到的現象 */}
          <div className="grid grid-cols-12 gap-x-12 gap-y-8 mb-20">
            <div className="col-span-12 md:col-span-5">
              <div className="relative inline-block">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight border-l-4 border-gray-900 pl-4">
                  The Question
                </h2>
                <div className="absolute -top-2 -right-6 w-8 h-8 border border-gray-200 -z-10"></div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-7">
              <p className="text-gray-600 text-base leading-relaxed">
                The answer was never the bean. It was everything that happened
                after. The roast that wasn't dialed in. The barista who wasn't
                trained. The supplier who moved on after the sale. We saw a
                system that was broken at every handoff — and decided that
                fixing one part wasn't enough.
              </p>
            </div>
          </div>
          {/* 職人精神的具體化 */}
          <div className="grid grid-cols-12 gap-x-12 gap-y-8 mb-20">
            <div className="col-span-12 md:col-span-5">
              <div className="relative inline-block">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight border-l-4 border-gray-900 pl-4">
                  Craftsmanship
                </h2>
                <div className="absolute -top-2 -right-6 w-8 h-8 border border-gray-200 -z-10"></div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-7">
              <p className="text-gray-600 text-base leading-relaxed">
                Craftsmanship, to us, is not a credential. It is a standard we
                hold ourselves to before anyone else does. Every roast profile,
                every training session, every service call — each one is either
                right or it isn't. There is no in between.
              </p>
            </div>
          </div>
          {/* 邀請訪客成為一員 */}
          <div className="grid grid-cols-12 gap-x-12 gap-y-8 mb-20">
            <div className="col-span-12 md:col-span-5">
              <div className="relative inline-block">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight border-l-4 border-gray-900 pl-4">
                  One of Us
                </h2>
                <div className="absolute -top-2 -right-6 w-8 h-8 border border-gray-200 -z-10"></div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-7">
              <p className="text-gray-600 text-base leading-relaxed">
                OCC was built by people who refused to accept that Cambodia's
                coffee culture was defined by its weakest cup. If you're reading
                this, you probably feel the same way. That makes you one of us.
              </p>
            </div>
          </div>
          {/* 結尾：自然橋接到 Manifesto */}
          <div className="mt-32 pt-12 border-t border-gray-200 flex justify-between items-center">
            <div className="text-left">
              <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">
                Next
              </p>
              <Link
                href="/about/manifesto"
                className="group flex items-center gap-3 text-2xl font-bold text-gray-900 hover:text-gray-600 transition-colors"
              >
                Manifesto
                <span className="text-xl opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                  →
                </span>
              </Link>
              <p className="text-sm text-gray-500 mt-2">
                The Barista Army Thesis: Why We'll Never Open a Cafe.
              </p>
            </div>
            <div className="hidden md:block text-right text-xs text-gray-400">
              <p className="italic text-gray-500 max-w-xs text-right">
                Which brings us to the big idea. The one that made everyone
                think we were crazy.
              </p>
            </div>
          </div>
          {/* 懸念句（移動端顯示） */}
          <div className="mt-8 md:hidden text-center">
            <p className="text-sm italic text-gray-500">
              Which brings us to the big idea. The one that made everyone think
              we were crazy.
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
