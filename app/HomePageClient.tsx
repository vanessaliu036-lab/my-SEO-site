"use client"

import Link from "next/link"
import { useState } from "react"

const menuItems = [
  { href: "/about", title: "About", desc: "philosophy, mission, manifesto" },
  { href: "/vision", title: "Vision", desc: "overview, philosophy, the big idea" },
  { href: "/solutions", title: "Solutions", desc: "wholesale, roasting, staffing, equipment" },
  { href: "/solutions/wholesale", title: "Wholesale", desc: "B2B coffee supply, Phnom Penh & Cambodia" },
  { href: "/system", title: "System", desc: "ecosystem, methodology, frameworks" },
  { href: "/blog", title: "Blog", desc: "field notes, origin intelligence, insights" },
  { href: "/contact", title: "Contact", desc: "connect, collaborate, reach out" },
]

const solutions = [
  {
    num: "01",
    href: "/solutions/wholesale",
    title: "Wholesale Coffee Supply",
    desc: "Direct-origin beans for cafés, hotels, and restaurants. Minimum 5kg. Weekly delivery routes across Cambodia.",
  },
  {
    num: "02",
    href: "/solutions/roasting-program",
    title: "Custom Roasting Program",
    desc: "Profile development, white-label production, and batch consistency for house blends and signature lots.",
  },
  {
    num: "03",
    href: "/solutions/barista-staffing",
    title: "Barista Staffing",
    desc: "SCA-aligned baristas for full-time placement, hotel F&B, events, and pop-up activations.",
  },
  {
    num: "04",
    href: "/solutions/equipment-service",
    title: "Equipment Service",
    desc: "Preventive maintenance, installation, and emergency repair for commercial espresso setups.",
  },
]

export default function HomePageClient() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isShareOpen, setIsShareOpen] = useState(false)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
    } catch (err) {
      console.error("Failed to copy link:", err)
    }
  }

  return (
    <>
      {/* Hero — first viewport */}
      <section className="relative w-full h-screen bg-gray-100 overflow-hidden">
        {/* Top Navigation */}
        <div className="absolute top-8 left-8 z-20">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-600 text-sm font-medium tracking-wider hover:text-gray-800 transition-colors"
          >
            MENU
          </button>
        </div>

        <div className="absolute top-8 right-8 z-20">
          <button
            onClick={() => setIsShareOpen(!isShareOpen)}
            className="text-gray-600 text-sm font-medium tracking-wider hover:text-gray-800 transition-colors"
          >
            SHARE
          </button>
        </div>

        {/* SEO H1 — visually hidden, reads first in DOM */}
        <h1 className="sr-only">
          Origin Coffee Cambodia — Specialty Coffee Wholesale, Roasting, and Infrastructure
        </h1>

        <div className="relative w-full h-full flex items-center justify-center">
          {/* Large background circles */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gray-200/50 -translate-x-1/2" aria-hidden="true" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-dashed border-gray-400 -translate-x-1/4" aria-hidden="true" />

          {/* Vertical ORIGIN text — decorative */}
          <div className="absolute left-16 top-1/2 -translate-y-1/2 -rotate-90 origin-center" aria-hidden="true">
            <span className="text-6xl font-bold text-gray-800 tracking-wider">ORIGIN</span>
          </div>

          {/* Central geometric object — decorative */}
          <div className="relative z-10" aria-hidden="true">
            <div className="w-48 h-64 bg-gray-900 transform rotate-12 relative">
              <div className="absolute inset-0 bg-gray-800 transform -skew-x-12 skew-y-6"></div>
              <div className="absolute inset-0 bg-gray-700 transform skew-x-6 -skew-y-3 translate-x-4"></div>
              <div className="absolute inset-0 bg-gray-900 transform -skew-x-6 skew-y-12 translate-y-2"></div>
              <div className="absolute top-0 left-1/2 w-0 h-0 border-l-12 border-r-12 border-b-16 border-l-transparent border-r-transparent border-b-gray-800 -translate-x-1/2 -translate-y-4"></div>
            </div>
          </div>

          <div
            className="absolute left-1/3 top-1/3 w-[152px] h-[152px] opacity-40 [background-image:radial-gradient(#9ca3af_1px,transparent_1px)] [background-size:20px_20px]"
            aria-hidden="true"
          />

          <div className="absolute top-16 left-1/2 -translate-x-1/2 text-gray-600 text-xl" aria-hidden="true">
            ✕✕
          </div>
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-gray-600 text-xl" aria-hidden="true">
            ✕✕
          </div>

          {/* Right rotated marker — WHOLESALE */}
          <div className="absolute right-16 top-1/2 -translate-y-1/2" aria-hidden="true">
            <div className="border border-gray-600 px-4 py-8 rotate-90">
              <span className="text-gray-600 text-xs font-medium tracking-widest">WHOLESALE</span>
            </div>
          </div>

          <div className="absolute top-1/4 right-1/4 w-32 h-px border-t border-dashed border-gray-400 rotate-45" aria-hidden="true" />
          <div className="absolute bottom-1/3 left-1/3 w-24 h-px border-t border-dashed border-gray-400 -rotate-12" aria-hidden="true" />
        </div>

        {/* Bottom-left brand line */}
        <div className="absolute bottom-16 left-8 z-10">
          <p className="text-gray-800 text-lg font-medium tracking-wider">SPECIALTY COFFEE</p>
          <p className="text-gray-600 text-sm tracking-wide">B2B · CAMBODIA</p>
        </div>

        <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col gap-2" aria-hidden="true">
          <div className="w-px h-4 bg-gray-400"></div>
          <div className="w-px h-4 bg-gray-400"></div>
          <div className="w-px h-4 bg-gray-400"></div>
        </div>

        {/* Bottom-right scroll cue */}
        <a
          href="#origin"
          className="absolute bottom-16 right-8 z-10 flex items-center gap-2 group"
        >
          <span className="text-gray-600 text-sm font-medium tracking-wider group-hover:text-gray-900 transition-colors">
            EXPLORE
          </span>
          <span className="text-gray-600 text-lg group-hover:translate-y-0.5 transition-transform">↓</span>
        </a>
      </section>

      {/* Below the fold — content for users and crawlers */}
      <section id="origin" className="bg-white py-24 px-8 md:px-16 border-t border-gray-200">
        <div className="max-w-5xl mx-auto">
          <span className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-6 block">
            OCC — Origin Coffee Cambodia
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-8 [text-wrap:balance]">
            Specialty coffee wholesale and roasting infrastructure, built for Cambodia.
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mb-6">
            OCC supplies direct-origin specialty coffee to cafés, hotels, restaurants, and corporate
            operators across Phnom Penh, Siem Reap, and Sihanoukville. From traceable Mondulkiri and
            Ratanakiri lots to custom roast profiles, our work covers every link between the farm and
            the cup.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mb-16">
            We are not a café. We are the supply chain, the roastery, the SCA-aligned training, and
            the equipment service behind the operators that take coffee seriously.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {solutions.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group block p-8 border border-dashed border-gray-300 hover:border-gray-900 transition-colors"
              >
                <span className="text-xs tracking-[0.22em] text-gray-400 uppercase mb-3 block">
                  {item.num} / Solution
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:pl-1 transition-all">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                <span className="inline-block mt-5 text-xs tracking-wider text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all">
                  View →
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-20 pt-12 border-t border-gray-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-xs text-gray-400 tracking-[0.22em] uppercase mb-2">Ready to talk?</p>
              <p className="text-xl font-medium text-gray-900">
                Get a wholesale quote or roasting proposal.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 text-sm tracking-wider hover:bg-gray-800 transition-colors"
            >
              CONTACT OCC →
            </Link>
          </div>
        </div>
      </section>

      {/* Share dialog */}
      {isShareOpen && (
        <div className="fixed inset-0 bg-gray-100/95 backdrop-blur-sm z-40 flex items-center justify-center pointer-events-auto">
          <div className="max-w-md w-full px-8">
            <div className="space-y-12">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 tracking-wider">SHARE</h2>
                <button
                  onClick={() => setIsShareOpen(false)}
                  className="text-gray-600 hover:text-gray-800 text-2xl"
                  aria-label="Close share dialog"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <button
                  onClick={() =>
                    window.open(
                      `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`,
                      "_blank",
                    )
                  }
                  className="w-full text-left border-b border-gray-300 pb-4 hover:border-gray-400 transition-colors group"
                >
                  <h3 className="text-lg font-medium text-gray-800 tracking-wide mb-1 group-hover:text-gray-900">
                    Broadcast
                  </h3>
                  <p className="text-gray-600 text-sm tracking-wide">→ Twitter</p>
                </button>

                <button
                  onClick={() =>
                    window.open(
                      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
                      "_blank",
                    )
                  }
                  className="w-full text-left border-b border-gray-300 pb-4 hover:border-gray-400 transition-colors group"
                >
                  <h3 className="text-lg font-medium text-gray-800 tracking-wide mb-1 group-hover:text-gray-900">
                    Upload to Grid
                  </h3>
                  <p className="text-gray-600 text-sm tracking-wide">→ LinkedIn</p>
                </button>

                <button
                  onClick={() =>
                    window.open(
                      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
                      "_blank",
                    )
                  }
                  className="w-full text-left border-b border-gray-300 pb-4 hover:border-gray-400 transition-colors group"
                >
                  <h3 className="text-lg font-medium text-gray-800 tracking-wide mb-1 group-hover:text-gray-900">
                    Echo in Void
                  </h3>
                  <p className="text-gray-600 text-sm tracking-wide">→ Facebook</p>
                </button>

                <button
                  onClick={handleCopyLink}
                  className="w-full text-left pb-4 hover:text-gray-900 transition-colors group"
                >
                  <h3 className="text-lg font-medium text-gray-800 tracking-wide mb-1 group-hover:text-gray-900">
                    Replicate Signal
                  </h3>
                  <p className="text-gray-600 text-sm tracking-wide">→ Copy Link</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Menu dialog */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-gray-100/95 backdrop-blur-sm z-40 flex items-center justify-center pointer-events-auto overflow-y-auto py-12">
          <div className="max-w-2xl w-full px-8">
            <div className="space-y-12">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 tracking-wider">NAVIGATION</h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-600 hover:text-gray-800 text-2xl"
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-8">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-left border-b border-gray-300 pb-6 transition-colors hover:border-gray-400"
                  >
                    <h3 className="text-xl font-medium text-gray-800 tracking-wide mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm tracking-wide">{item.desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
