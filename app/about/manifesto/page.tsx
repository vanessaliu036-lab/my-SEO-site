import Link from "next/link";
import { siteUrl } from "@/lib/siteConfig"

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manifesto | Origin Coffee Cambodia - OCC",
  description:
    "The Barista Army Thesis: Why We'll Never Open a Café. Cambodia doesn't have a coffee problem. It has a consistency problem. We're building the skilled barista army to solve it.",
  keywords:
    "barista training Cambodia, skilled barista army, coffee manifesto, OCC manifesto, specialty coffee infrastructure Cambodia, why we never open a cafe, coffee consistency Cambodia",
  alternates: {
    canonical: `${siteUrl}/about/manifesto`,
  },
  openGraph: {
    title: "Manifesto | Origin Coffee Cambodia - OCC",
    description:
      "The Barista Army Thesis: Why We'll Never Open a Café. Instead of building one great café, we decided to build the people who make great cafés possible.",
    url: `${siteUrl}/about/manifesto`,
    siteName: "Origin Coffee Cambodia",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manifesto | Origin Coffee Cambodia - OCC",
    description:
      "The Barista Army Thesis: Why We'll Never Open a Café. Cambodia doesn't have a coffee problem. It has a consistency problem.",
  },
};
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "The Barista Army Thesis: Why We'll Never Open a Café",
  description:
    "Cambodia doesn't have a coffee problem. It has a consistency problem. Instead of building one great café, we decided to build the people who make great cafés possible.",
  url: `${siteUrl}/about/manifesto`,
  author: {
    "@type": "Organization",
    name: "Origin Coffee Cambodia (OCC)",
  },
  publisher: {
    "@type": "Organization",
    name: "Origin Coffee Cambodia (OCC)",
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/images/logo.png`,
    },
  },
  datePublished: "2024-01-15",
  dateModified: "2024-01-15",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${siteUrl}/about/manifesto`,
  },
  keywords:
    "barista training Cambodia, skilled barista army, coffee manifesto, coffee consistency, specialty coffee infrastructure",
};
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "About", item: `${siteUrl}/about` },
    { "@type": "ListItem", position: 3, name: "Manifesto", item: `${siteUrl}/about/manifesto` },
  ],
}
export default function ManifestoPage() {
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
              About / 03
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tighter">
              MANIFESTO
            </h1>
            <p className="text-gray-600 text-sm tracking-wide mt-4">
              THE BARISTA ARMY THESIS: WHY WE'LL NEVER OPEN A CAFÉ.
            </p>
          </div>
          {/* 開頭：製造懸念 */}
          <div className="border-l-4 border-gray-900 pl-8 mb-12">
            <p className="text-gray-900 text-xl font-medium leading-relaxed mb-6">
              Everyone who heard our plan told us the same thing: just open a
              café. It's simpler. It's safer. It's what everyone does.
            </p>
            <p className="text-gray-700 text-lg italic leading-relaxed">
              We said no. Here's why.
            </p>
          </div>
          {/* 第一段：定義真正的問題 */}
          <div className="grid grid-cols-12 gap-x-12 gap-y-8 mb-20">
            <div className="col-span-12 md:col-span-5">
              <div className="relative inline-block">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight border-l-4 border-gray-900 pl-4">
                  The Problem
                </h2>
                <div className="absolute -top-2 -right-6 w-8 h-8 border border-gray-200 -z-10"></div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-7">
              <p className="text-gray-600 text-base leading-relaxed">
                Cambodia doesn't have a coffee problem. It has a consistency
                problem. Walk into ten cafés in Phnom Penh. You'll find ten
                different interpretations of the same bean — some extraordinary,
                most forgettable. The difference was never the origin. It was
                the person behind the machine, and whether anyone had ever
                taught them to care.
              </p>
            </div>
          </div>
          {/* 第二段：為什麼一家咖啡廳解決不了這個問題 */}
          <div className="grid grid-cols-12 gap-x-12 gap-y-8 mb-20">
            <div className="col-span-12 md:col-span-5">
              <div className="relative inline-block">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight border-l-4 border-gray-900 pl-4">
                  Why Not a Café?
                </h2>
                <div className="absolute -top-2 -right-6 w-8 h-8 border border-gray-200 -z-10"></div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-7">
              <p className="text-gray-600 text-base leading-relaxed">
                Opening a café solves one problem in one location. It creates a
                great experience for the people who walk through that door. But
                it does nothing for the industry. Nothing for the barista at the
                hotel down the street who never had proper training. Nothing for
                the café owner who can't figure out why her coffee tastes
                different every morning. Nothing for Cambodia's coffee culture
                at large.
              </p>
            </div>
          </div>
          {/* 第三段：Skilled Barista Army 的邏輯 */}
          <div className="grid grid-cols-12 gap-x-12 gap-y-8 mb-20">
            <div className="col-span-12 md:col-span-5">
              <div className="relative inline-block">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight border-l-4 border-gray-900 pl-4">
                  Skilled Barista Army
                </h2>
                <div className="absolute -top-2 -right-6 w-8 h-8 border border-gray-200 -z-10"></div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-7">
              <p className="text-gray-600 text-base leading-relaxed">
                So we made a different choice. Instead of building one great
                café, we decided to build the people who make great cafés
                possible. The Skilled Barista Army is not a training program.
                It is a pipeline — from free enrollment, to intensive
                education, to placement within businesses that understand what
                quality means. Every graduate carries OCC's standard with them.
                Every cup they make is an answer to the problem we set out to
                solve.
              </p>
            </div>
          </div>
          {/* 第四段：閉環宣言 */}
          <div className="grid grid-cols-12 gap-x-12 gap-y-8 mb-20">
            <div className="col-span-12 md:col-span-5">
              <div className="relative inline-block">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight border-l-4 border-gray-900 pl-4">
                  Zero-Compromise Infrastructure
                </h2>
                <div className="absolute -top-2 -right-6 w-8 h-8 border border-gray-200 -z-10"></div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-7">
              <p className="text-gray-600 text-base leading-relaxed">
                When you source from OCC, you're not buying a bag of beans.
                You're buying into a system. Fresh roasts that arrive on time.
                Baristas who know exactly what to do with them. Service support
                when something goes wrong. We call it zero-compromise coffee
                infrastructure — because every link in the chain has to hold,
                or the whole thing fails.
              </p>
            </div>
          </div>
          {/* 結尾：回到職人精神，呼應品牌箴言 */}
          <div className="border-l-4 border-gray-900 pl-8 mt-16 mb-20">
            <p className="text-gray-900 text-xl font-medium leading-relaxed italic">
              Perfection is not a destination. It is the only direction. That's
              why we'll never open a café. Because what we're building is worth
              more than any single cup — and we're not done yet.
            </p>
          </div>
          {/* 結尾：自然導向下一個分頁 Sustainability */}
          <div className="mt-32 pt-12 border-t border-gray-200 flex justify-between items-center">
            <div className="text-left">
              <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">
                Next
              </p>
              <Link
                href="/about/sustainability"
                className="group flex items-center gap-3 text-2xl font-bold text-gray-900 hover:text-gray-600 transition-colors"
              >
                Sustainability
                <span className="text-xl opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                  →
                </span>
              </Link>
              <p className="text-sm text-gray-500 mt-2">
                Ethical sourcing and traceability protocol.
              </p>
            </div>
            <div className="hidden md:block text-right text-xs text-gray-400">
              About / 03
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
