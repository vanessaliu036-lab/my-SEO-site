"use client"

import Link from "next/link"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { useState } from "react"
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

const primaryNav = [
  { href: "/blog/cambodia-specialty-robusta-coffee-guide", label: "Fine Robusta" },
  { href: "/collection", label: "Collection" },
  { href: "/solutions/wholesale", label: "Wholesale" },
  { href: "/blog", label: "Journal" },
]

export default function HomePageClient() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <section className="relative isolate flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-[#1c211b] text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=2200&q=90)",
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/45" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,10,7,0.18)_0%,rgba(6,10,7,0.08)_42%,rgba(6,10,7,0.58)_100%)]"
          aria-hidden="true"
        />

        <div className="pointer-events-none absolute inset-0 z-10 hidden md:block" aria-hidden="true">
          <div className="grid h-full w-full grid-cols-12 divide-x divide-white/15">
            <div className="col-span-1" />
            <div className="col-span-3" />
            <div className="col-span-4" />
            <div className="col-span-3" />
            <div className="col-span-1" />
          </div>
        </div>

        <header className="absolute inset-x-0 top-0 z-30 border-b border-white/15">
          <div className="mx-auto flex h-20 w-full max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-12">
            <Link href="/" className="group flex items-end gap-3" aria-label="Origin Coffee Cambodia home">
              <span className="text-2xl font-semibold tracking-[-0.07em]">OCC</span>
              <span className="mb-0.5 hidden text-[9px] font-medium uppercase leading-tight tracking-[0.24em] text-white/65 sm:block">
                Origin Coffee
                <br />
                Cambodia
              </span>
            </Link>

            <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
              {primaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/75 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="rounded-full border border-white/35 px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.16em] transition-colors hover:bg-white hover:text-black"
              >
                Contact
              </Link>
            </nav>

            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open navigation menu"
              className="inline-flex size-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white hover:text-black lg:hidden"
            >
              <Menu className="size-4" />
            </button>
          </div>
        </header>

        <div className="relative z-20 mx-auto w-full max-w-6xl px-6 pb-24 pt-32 text-center sm:px-8 md:pb-20">
          <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.34em] text-white/70 sm:text-xs">
            Mondulkiri · Cambodia · Fine Robusta
          </p>
          <h1 className="mx-auto max-w-5xl text-balance text-5xl font-normal leading-[0.96] tracking-[-0.055em] text-white sm:text-6xl md:text-7xl lg:text-[6.5rem]">
            Cambodia’s Fine Robusta. Built for the World.
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-pretty text-sm font-light leading-7 text-white/80 sm:text-base md:text-lg md:leading-8">
            From Mondulkiri farms to global roasters, we connect quality-focused Cambodian canephora with buyers who care about process, traceability, and cup performance.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/solutions/wholesale"
              className="group inline-flex items-center rounded-full text-sm font-medium text-[#172018]"
            >
              <span className="rounded-full bg-[#e7f2c9] px-6 py-3.5 transition-colors duration-300 group-hover:bg-white">
                Explore Wholesale
              </span>
              <span className="relative -ml-px flex size-[50px] items-center justify-center overflow-hidden rounded-full bg-[#e7f2c9] transition-colors duration-300 group-hover:bg-white">
                <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-6 group-hover:-translate-y-6" />
                <ArrowUpRight className="absolute size-5 -translate-x-6 translate-y-6 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0" />
              </span>
            </Link>
            <Link
              href="/blog/cambodia-specialty-robusta-coffee-guide"
              className="border-b border-white/45 pb-1 text-xs font-medium uppercase tracking-[0.18em] text-white/80 transition-colors hover:border-white hover:text-white"
            >
              Discover Fine Robusta
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 flex items-end justify-between border-t border-white/15 px-5 py-5 text-[9px] uppercase tracking-[0.24em] text-white/55 sm:px-8 lg:px-12">
          <span>Origin Coffee Cambodia</span>
          <span className="hidden sm:inline">From origin to global buyers</span>
          <span>01 / Home</span>
        </div>
      </section>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#f3f0e8] px-6 py-7 text-[#182019] sm:px-10">
          <div className="mx-auto w-full max-w-6xl">
            <div className="flex items-center justify-between border-b border-black/15 pb-6">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-semibold tracking-[-0.07em]"
              >
                OCC
              </Link>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
                className="inline-flex size-11 items-center justify-center rounded-full border border-black/20 transition-colors hover:bg-black hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
              {navGroups.map((group, index) => (
                <div key={group.label}>
                  <p className="mb-6 text-[10px] uppercase tracking-[0.28em] text-black/40">
                    {String(index + 1).padStart(2, "0")} / {group.label}
                  </p>
                  <ul className="space-y-4">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="text-xl tracking-tight text-black/75 transition-colors hover:text-black"
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

      <section className="bg-white border-t border-gray-200 px-6 sm:px-8 py-20 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.35em] font-medium text-gray-500 uppercase mb-4">Origin Coffee Cambodia</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight leading-tight mb-6">Cambodian Fine Robusta, explained for global coffee buyers.</h2>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl">{homeDirectAnswer}</p>
          <div className="mt-16 md:mt-20 border-t border-gray-200">
            {homeAuthoritySections.map((section, sectionIndex) => (
              <section key={section.id} id={section.id} className="grid grid-cols-12 gap-x-8 md:gap-x-12 gap-y-5 py-12 md:py-14 border-b border-gray-200 scroll-mt-24">
                <div className="col-span-12 md:col-span-4">
                  <p className="text-[10px] tracking-[0.28em] text-gray-400 uppercase mb-3">{String(sectionIndex + 1).padStart(2, "0")} / {section.eyebrow}</p>
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900 tracking-tight leading-snug">{section.title}</h2>
                </div>
                <div className="col-span-12 md:col-span-8">
                  <div className="space-y-5 text-[15px] md:text-base text-gray-700 leading-[1.8]">{section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
                  {"items" in section && section.items ? <ol className="mt-8 space-y-4 list-decimal pl-6 marker:font-semibold marker:text-gray-900">{section.items.map((item) => <li key={item} className="pl-2 text-[15px] md:text-base text-gray-700 leading-[1.75]">{item}</li>)}</ol> : null}
                </div>
              </section>
            ))}
          </div>
          <section className="mt-14 md:mt-16" aria-labelledby="primary-sources-heading">
            <h2 id="primary-sources-heading" className="text-sm tracking-[0.3em] font-light text-gray-400 uppercase mb-7">Primary Sources</h2>
            <ol className="space-y-3 list-decimal pl-5">{homeSources.map((source) => <li key={source.href} className="pl-2 text-sm md:text-[15px] text-gray-600 leading-relaxed"><a href={source.href} target="_blank" rel="noopener noreferrer" className="underline decoration-gray-300 underline-offset-4 hover:text-gray-900 hover:decoration-gray-900 transition-colors">{source.label}</a></li>)}</ol>
          </section>
          <div className="mt-20 pt-12 border-t border-gray-200">
            <h2 className="text-sm tracking-[0.3em] font-light text-gray-400 uppercase mb-12">Frequently Asked Questions</h2>
            <div className="space-y-10">{homeFaqs.map(({ q, a }) => <div key={q} className="grid grid-cols-12 gap-x-12 gap-y-3"><h3 className="col-span-12 md:col-span-5 text-lg font-bold text-gray-900 tracking-tight border-l-4 border-gray-900 pl-4">{q}</h3><p className="col-span-12 md:col-span-7 text-gray-600 text-base leading-relaxed">{a}</p></div>)}</div>
          </div>
        </div>
      </section>
    </>
  )
}
