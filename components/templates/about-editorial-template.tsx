"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"

type AboutSection = {
  title: string
  href: string
  desc: string
}

type AboutEditorialTemplateProps = {
  sections: AboutSection[]
}

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

export function AboutEditorialTemplate({ sections }: AboutEditorialTemplateProps) {
  const reducedMotion = useReducedMotion()
  const reveal = (offset = 44) => ({
    initial: reducedMotion ? { opacity: 1 } : { opacity: 0, y: offset },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: reducedMotion ? 0.01 : 0.68, ease },
  })

  return (
    <div className="about-serif-page min-h-[100dvh]">
      <section className="relative isolate overflow-hidden border-b border-[#e8e4df] bg-[#fafaf8]">
        <div
          className="about-grid-lines pointer-events-none absolute inset-0 opacity-60"
          aria-hidden="true"
        />

        <div className="relative mx-auto w-full max-w-[1440px] px-6 sm:px-8 md:px-12 lg:px-16">
          <div className="flex items-center justify-between border-b border-[#e8e4df] py-5">
            <span className="about-label">Origin Coffee Cambodia</span>
            <span className="about-label hidden sm:inline">Phnom Penh · Cambodia</span>
            <span className="about-label">01 / About</span>
          </div>

          <div className="grid min-h-[calc(100svh-150px)] grid-cols-1 items-center gap-12 py-16 md:grid-cols-[0.78fr_1.1fr_0.9fr] md:gap-8 md:py-20 lg:gap-16 lg:py-24">
            <motion.aside {...reveal(26)} className="order-2 self-end md:order-1 md:pb-12">
              <div className="mb-7 h-px w-16 bg-[#b8860b]" aria-hidden="true" />
              <p className="about-label">Supply · Quality · Origin</p>
              <p className="about-copy mt-6 max-w-[310px] text-[15px]">
                OCC is a professional coffee company connecting Cambodian coffee and Fine Robusta authority with sourcing, roasting, B2B supply, traceability, and quality-focused coffee solutions.
              </p>
              <Link
                href="#about-system"
                className="mt-8 inline-flex min-h-11 items-center gap-2 border-b border-[#b8860b] pb-2 text-xs font-medium uppercase tracking-[0.15em] text-[#1a1a1a] transition-colors hover:text-[#b8860b]"
              >
                Explore OCC <ArrowUpRight className="size-3.5" />
              </Link>
            </motion.aside>

            <div className="order-1 flex min-h-[430px] items-center justify-center md:order-2 md:min-h-[620px]">
              <div className="relative flex items-center justify-center">
                <motion.div
                  initial={reducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.84 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: reducedMotion ? 0.01 : 0.8, ease }}
                  className="absolute h-[300px] w-[300px] rounded-full bg-[#f5f3f0] ring-1 ring-[#e8e4df] sm:h-[380px] sm:w-[380px] md:h-[500px] md:w-[500px]"
                  aria-hidden="true"
                />
                <motion.div
                  initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 42 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reducedMotion ? 0.01 : 0.72, delay: reducedMotion ? 0 : 0.1, ease }}
                  className="relative z-10 flex min-h-[300px] w-full max-w-[360px] items-center justify-center border-y border-[#e8e4df] bg-white/60 px-8 py-14 text-center shadow-[0_18px_44px_rgba(26,26,26,0.05)] sm:min-h-[360px] sm:max-w-[430px]"
                >
                  <div className="absolute left-0 top-10 h-24 w-px bg-[#b8860b]" aria-hidden="true" />
                  <div>
                    <p className="about-label">Origin Coffee Cambodia</p>
                    <p className="about-display mt-7 text-[clamp(5.5rem,12vw,9rem)] leading-[0.72] text-[#1a1a1a]">OCC</p>
                    <div className="mx-auto mt-9 h-px w-14 bg-[#b8860b]" aria-hidden="true" />
                    <p className="about-label mt-6">Fine Robusta · Cambodia</p>
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.div {...reveal(30)} className="order-3 md:pb-10">
              <p className="about-label mb-6">Origin Coffee Cambodia</p>
              <h1 className="about-display max-w-[480px] text-[clamp(3.2rem,6.2vw,6.7rem)] leading-[0.88] text-[#1a1a1a]">
                About
                <br />
                Origin Coffee
                <br />
                Cambodia.
              </h1>
              <div className="mt-8 h-px w-24 bg-[#b8860b]" aria-hidden="true" />
            </motion.div>
          </div>

          <div className="flex items-center justify-between border-t border-[#e8e4df] py-5">
            <span className="about-label">Origin Coffee Cambodia</span>
            <span className="about-label hidden sm:block">Phnom Penh · Cambodia</span>
            <span className="about-label">01 / About</span>
          </div>
        </div>
      </section>

      <main id="about-system" className="mx-auto w-full max-w-[1440px] px-6 sm:px-8 md:px-12 lg:px-16">
        <motion.section {...reveal()} className="grid grid-cols-1 border-b border-[#e8e4df] py-24 md:grid-cols-12 md:py-32">
          <div className="md:col-span-3">
            <p className="about-label">02 / Position</p>
          </div>
          <div className="mt-8 md:col-span-8 md:col-start-5 md:mt-0">
            <p className="about-display text-[clamp(2.4rem,4vw,4.3rem)] leading-[0.98] text-[#1a1a1a]">
              Supply, quality,
              <br />
              origin.
            </p>
            <div className="mt-12 grid grid-cols-1 gap-10 border-t border-[#e8e4df] pt-9 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
              <p className="about-copy text-lg">
                OCC connects Cambodian coffee supply, quality standards, and professional service through clear origin information, practical evaluation, and accountable coffee systems.
              </p>
              <p className="about-copy text-[15px]">
                Origin Coffee Cambodia (OCC) connects Cambodian coffee origins and Fine Robusta expertise with specialty coffee sourcing, roasting, B2B supply, traceability, and quality-focused solutions. Clear origin and quality information supports the commercial coffee business.
              </p>
            </div>
          </div>
        </motion.section>

        <section className="border-b border-[#e8e4df] py-24 md:py-32" aria-labelledby="about-explore-title">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="about-label">03 / Explore</p>
              <h2 id="about-explore-title" className="about-display mt-6 text-4xl leading-[0.96] text-[#1a1a1a] sm:text-5xl">
                Four parts.
                <br />One system.
              </h2>
            </div>

            <div className="md:col-span-8 md:col-start-5">
              {sections.map((section, index) => (
                <motion.div key={section.href} {...reveal(32)}>
                  <Link
                    href={section.href}
                    className="group grid min-h-11 grid-cols-[42px_1fr_auto] items-end gap-5 border-t border-[#e8e4df] py-8 transition-colors hover:border-[#b8860b] sm:grid-cols-[58px_1fr_auto] sm:py-10"
                  >
                    <span className="about-label pb-1 text-[#b8860b]">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="about-display text-3xl leading-none text-[#1a1a1a] transition-colors group-hover:text-[#b8860b] sm:text-4xl">
                        {section.title}
                      </h3>
                      <p className="about-copy mt-4 max-w-xl text-xs uppercase tracking-[0.11em] text-[#6b6b6b]">{section.desc}</p>
                    </div>
                    <ArrowUpRight className="mb-1 size-5 text-[#b8860b] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>
                </motion.div>
              ))}
              <div className="border-t border-[#e8e4df]" aria-hidden="true" />
            </div>
          </div>
        </section>

        <motion.section {...reveal()} className="border-b border-[#e8e4df] py-20 md:py-24" aria-label="OCC facts">
          <div className="grid grid-cols-1 border-y border-[#e8e4df] sm:grid-cols-3">
            {[
              ["Cambodia", "Origin & supply"],
              ["Fine Robusta", "Authority wedge"],
              ["B2B", "Coffee solutions"],
            ].map(([value, label], index) => (
              <div key={label} className={`py-9 sm:px-9 ${index > 0 ? "border-t border-[#e8e4df] sm:border-l sm:border-t-0" : ""}`}>
                <p className="about-display text-4xl leading-none text-[#1a1a1a] lg:text-5xl">{value}</p>
                <p className="about-label mt-4">{label}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section {...reveal()} className="grid grid-cols-1 border-b border-[#e8e4df] py-24 md:grid-cols-12 md:py-32">
          <div className="md:col-span-4">
            <p className="about-label">04 / Quality system</p>
            <h2 className="about-display mt-6 text-4xl leading-[0.96] text-[#1a1a1a] sm:text-5xl">
              Built around
              <br />quality.
            </h2>
          </div>
          <div className="mt-12 md:col-span-7 md:col-start-6 md:mt-0">
            {[
              ["Origin and Standards", "Keep origin information clear, connect it to practical quality standards, and make each coffee easier to understand and use."],
              ["Origin Context", "Evaluate Cambodian coffee and Fine Robusta without treating one lot, region, or anecdote as proof for an entire category."],
              ["Buyer Clarity", "Keep quality information clear and proportional so sourcing, roasting, and coffee-program decisions can be made with confidence."],
            ].map(([title, copy], index) => (
              <div key={title} className="grid grid-cols-[48px_1fr] gap-5 border-t border-[#e8e4df] py-8 last:border-b">
                <span className="about-label pt-1 text-[#b8860b]">0{index + 1}</span>
                <div>
                  <h3 className="about-display text-2xl text-[#1a1a1a]">{title}</h3>
                  <p className="about-copy mt-3 max-w-xl text-[15px]">{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section {...reveal()} className="grid grid-cols-1 border-b border-[#e8e4df] py-24 md:grid-cols-12 md:py-28">
          <div className="md:col-span-4">
            <p className="about-label">05 / Cambodia coffee</p>
            <h2 className="about-display mt-6 text-4xl leading-[0.96] text-[#1a1a1a] sm:text-5xl">
              From origin
              <br />to buyer.
            </h2>
          </div>
          <div className="mt-12 border-t border-[#e8e4df] pt-9 md:col-span-7 md:col-start-6 md:mt-0">
            <p className="about-copy text-sm uppercase tracking-[0.14em]">
              Cambodia · Mondulkiri · Fine Robusta · Coffea canephora
            </p>
            <p className="about-copy mt-6 max-w-2xl text-[15px]">
              OCC connects origin, processing, quality standards, sensory evaluation, roasting, sourcing context, and professional coffee solutions so Cambodian coffee can be assessed and used with greater clarity.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/solutions" className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[#b8860b] px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] text-white shadow-[0_1px_2px_rgba(26,26,26,0.04)] transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-[#d4a84b]">
                Solutions <ArrowUpRight className="size-3.5" />
              </Link>
              <Link href="/contact" className="inline-flex min-h-11 items-center gap-2 rounded-md border border-[#1a1a1a] px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] text-[#1a1a1a] transition-colors duration-200 hover:border-[#b8860b] hover:bg-[#f5f3f0] hover:text-[#b8860b]">
                Contact OCC <ArrowUpRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </motion.section>

        <footer className="flex flex-col gap-5 py-12 text-[#6b6b6b] sm:flex-row sm:items-end sm:justify-between">
          <span className="about-label">Origin Coffee Cambodia · OCC</span>
          <span className="about-label">Fine Robusta · Sourcing · Quality</span>
        </footer>
      </main>
    </div>
  )
}
