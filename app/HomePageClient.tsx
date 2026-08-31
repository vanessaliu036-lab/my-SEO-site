"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import {
  homeAuthoritySections,
  homeDirectAnswer,
  homeFaqs,
  homeSources,
} from "@/lib/homeContent"

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
    label: "Collection",
    links: [
      { href: "/collection", name: "Mondulkiri Origin Collection" },
      { href: "/collection/sovann", name: "SOVANN" },
      { href: "/collection/prek", name: "PREK" },
      { href: "/collection/angkar", name: "ANGKAR" },
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

  useEffect(() => {
    if (!isMenuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isMenuOpen])

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
      {/* Hero — main visual */}
      <section className="w-full bg-white flex justify-center">
        <div className="relative">
          <h1 className="sr-only">
            Fine Robusta. Exceptional Origins. Global Connection. — Origin Coffee
            Cambodia connects Cambodian Fine Robusta from Mondulkiri to the world.
          </h1>

          <img
            src="/hero-home.webp"
            alt="Origin Coffee Cambodia — Fine Robusta from Mondulkiri, Cambodia. Honey process, 99% ripe cherries. Bold and grounded."
            className="block w-auto h-auto max-w-full max-h-[100svh] select-none"
            draggable={false}
          />

          <button
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open navigation menu"
            className="absolute top-0 left-0 w-[22%] h-[13%] z-20 cursor-pointer"
          />
          <button
            onClick={handleShare}
            aria-label="Share this page"
            className="absolute top-0 right-0 w-[22%] h-[13%] z-20 cursor-pointer"
          />
        </div>
      </section>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-white overscroll-contain">
          <div className="flex min-h-[100svh] w-full items-start justify-center px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] sm:px-8">
            <div className="w-full max-w-3xl">
            <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-5 sm:mb-12 sm:border-0 sm:pb-0">
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
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 text-2xl leading-none text-gray-600 hover:text-gray-900"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
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
                          className="flex min-h-11 items-center text-lg text-gray-700 transition-colors hover:text-black"
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
        </div>
      )}

      {/* Visible AEO authority layer: BLUF + definitions + lists + sources + FAQs. */}
      <section className="bg-white border-t border-gray-200 px-6 sm:px-8 py-20 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.35em] font-medium text-gray-500 uppercase mb-4">
            Origin Coffee Cambodia
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight leading-tight mb-6">
            Cambodian Fine Robusta, explained for global coffee buyers.
          </h2>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl">
            {homeDirectAnswer}
          </p>

          <div className="mt-16 md:mt-20 border-t border-gray-200">
            {homeAuthoritySections.map((section, sectionIndex) => (
              <section
                key={section.id}
                id={section.id}
                className="grid grid-cols-12 gap-x-8 md:gap-x-12 gap-y-5 py-12 md:py-14 border-b border-gray-200 scroll-mt-24"
              >
                <div className="col-span-12 md:col-span-4">
                  <p className="text-[10px] tracking-[0.28em] text-gray-400 uppercase mb-3">
                    {String(sectionIndex + 1).padStart(2, "0")} / {section.eyebrow}
                  </p>
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900 tracking-tight leading-snug">
                    {section.title}
                  </h2>
                </div>
                <div className="col-span-12 md:col-span-8">
                  <div className="space-y-5 text-[15px] md:text-base text-gray-700 leading-[1.8]">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {"items" in section && section.items ? (
                    <ol className="mt-8 space-y-4 list-decimal pl-6 marker:font-semibold marker:text-gray-900">
                      {section.items.map((item) => (
                        <li key={item} className="pl-2 text-[15px] md:text-base text-gray-700 leading-[1.75]">
                          {item}
                        </li>
                      ))}
                    </ol>
                  ) : null}
                </div>
              </section>
            ))}
          </div>

          <section className="mt-14 md:mt-16" aria-labelledby="primary-sources-heading">
            <h2
              id="primary-sources-heading"
              className="text-sm tracking-[0.3em] font-light text-gray-400 uppercase mb-7"
            >
              Primary Sources
            </h2>
            <ol className="space-y-3 list-decimal pl-5">
              {homeSources.map((source) => (
                <li key={source.href} className="pl-2 text-sm md:text-[15px] text-gray-600 leading-relaxed">
                  <a
                    href={source.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-gray-300 underline-offset-4 hover:text-gray-900 hover:decoration-gray-900 transition-colors"
                  >
                    {source.label}
                  </a>
                </li>
              ))}
            </ol>
          </section>

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
        </div>
      </section>
    </>
  )
}
