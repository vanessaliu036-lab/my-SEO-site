"use client"

import Link from "next/link"
import { useState } from "react"
import { homeFaqs, homeDateModified } from "@/lib/homeContent"

const navGroups = [
  {
    label: "About",
    links: [
      { href: "/about/mission", name: "Mission" },
      { href: "/about/founder", name: "Founder" },
      { href: "/about/manifesto", name: "Manifesto" },
      { href: "/about/sustainability", name: "Sustainability" },
    ],
  },
  {
    label: "Solutions",
    links: [
      { href: "/solutions/wholesale", name: "Wholesale" },
      { href: "/solutions/roasting-program", name: "Roasting Program" },
      { href: "/solutions/barista-staffing", name: "Barista Staffing" },
      { href: "/solutions/equipment-service", name: "Equipment Service" },
    ],
  },
  {
    label: "More",
    links: [
      { href: "/blog", name: "Blog" },
      { href: "/contact", name: "Contact" },
    ],
  },
]

export default function HomePageClient() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : ""
    try {
      if (navigator.share) {
        await navigator.share({ title: "Origin Coffee Cambodia", url })
      } else {
        await navigator.clipboard.writeText(url)
      }
    } catch {
      /* user dismissed share sheet — no-op */
    }
  }

  return (
    <>
      {/* Hero — 主視覺（整張設計圖），限制在一個視窗高度內、置中，避免大螢幕被放大 */}
      <section className="w-full bg-[#f3f0ea] flex justify-center">
        <div className="relative">
          <h1 className="sr-only">
            Fine Robusta. Exceptional Origins. Global Connection. — Origin Coffee
            Cambodia connects Cambodian Fine Robusta from Mondulkiri to the world.
          </h1>

          {/* 設計主視覺（WebP，約 85KB） */}
          <img
            src="/hero-home.webp"
            alt="Origin Coffee Cambodia — Fine Robusta from Mondulkiri, Cambodia. Honey process, 99% ripe cherries. Bold and grounded."
            className="block w-auto h-auto max-w-full max-h-[100svh] select-none"
            draggable={false}
          />

          {/* 隱形可點區：MENU（左上）開啟導覽 */}
          <button
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open navigation menu"
            className="absolute top-0 left-0 w-[22%] h-[13%] z-20 cursor-pointer"
          />
          {/* 隱形可點區：SHARE（右上） */}
          <button
            onClick={handleShare}
            aria-label="Share this page"
            className="absolute top-0 right-0 w-[22%] h-[13%] z-20 cursor-pointer"
          />
        </div>
      </section>

      {/* 導覽 Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#f3f0ea] z-50 flex items-center justify-center px-8">
          <div className="max-w-3xl w-full">
            <div className="flex justify-between items-center mb-12">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-bold tracking-tighter text-gray-900"
              >
                OCC
              </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
                className="text-gray-600 hover:text-gray-900 text-2xl"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {navGroups.map((group) => (
                <div key={group.label}>
                  <p className="text-gray-400 text-xs tracking-widest mb-4 uppercase">
                    {group.label}
                  </p>
                  <ul className="space-y-3">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="text-gray-700 hover:text-black transition-colors text-lg"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* AEO 內容區塊 — hero 之下，供 AI 引擎擷取（自包含直答 + FAQ + 權威引用） */}
      <section className="bg-[#f3f0ea] border-t border-gray-200 px-8 py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.35em] font-medium text-gray-500 uppercase mb-4">
            Origin Coffee Cambodia
          </p>
          {/* 定義區塊 — 首段自包含直答 */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight leading-tight mb-6">
            Cambodia&apos;s specialty coffee company, built on Fine Robusta.
          </h2>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl">
            Origin Coffee Cambodia (OCC) is a B2B specialty coffee supplier and industry
            platform that sources, grades, and roasts Cambodian Fine Robusta for roasters,
            importers, cafés, and distributors worldwide. OCC grades every lot against the{" "}
            <a
              href="https://www.coffeeinstitute.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-gray-400 underline-offset-4 hover:text-gray-900 transition-colors"
            >
              Coffee Quality Institute
            </a>{" "}
            Fine Robusta protocol, controlling quality at every handoff from farm to cup.
          </p>

          {/* 問答區塊 — 與 FAQPage schema 內容一致 */}
          <div className="mt-20 pt-12 border-t border-gray-200">
            <h2 className="text-sm tracking-[0.3em] font-light text-gray-400 uppercase mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-10">
              {homeFaqs.map(({ q, a }) => (
                <div key={q} className="grid grid-cols-12 gap-x-12 gap-y-3">
                  <h3 className="col-span-12 md:col-span-5 text-lg font-bold text-gray-900 tracking-tight border-l-4 border-gray-900 pl-4">
                    {q}
                  </h3>
                  <p className="col-span-12 md:col-span-7 text-gray-600 text-base leading-relaxed">
                    {a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-16 text-xs text-gray-400 tracking-wider">
            Last updated{" "}
            <time dateTime={homeDateModified}>{homeDateModified}</time>
          </p>
        </div>
      </section>
    </>
  )
}
