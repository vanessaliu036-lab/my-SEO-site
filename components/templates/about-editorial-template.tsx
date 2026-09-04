"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { CoffeeBagVisual } from "@/components/ui/coffee-bag-visual"

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
  const reveal = (offset = 54) => ({
    initial: reducedMotion ? { opacity: 1 } : { opacity: 0, y: offset },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.22 },
    transition: { duration: reducedMotion ? 0.01 : 0.68, ease },
  })

  return (
    <div className="bg-[#f6f3ea] text-[#182019]">
      <section className="relative isolate min-h-[calc(100svh-80px)] overflow-hidden border-b border-black/10 pt-24 lg:pt-20">
        <div className="pointer-events-none absolute inset-0 hidden grid-cols-12 divide-x divide-black/[0.065] md:grid" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, index) => <div key={index} />)}
        </div>

        <div className="relative mx-auto grid min-h-[calc(100svh-80px)] w-full max-w-[1680px] grid-cols-1 items-center px-6 pb-14 sm:px-8 md:grid-cols-12 md:px-12 lg:px-16">
          <motion.div
            {...reveal(28)}
            className="order-3 border-t border-black/10 pt-7 md:order-1 md:col-span-3 md:border-t-0 md:pr-10 md:pt-0 lg:pr-14"
          >
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-black/42">Research · Origin · Evidence</p>
            <p className="mt-6 max-w-[310px] text-[15px] leading-7 text-black/80">
              OCC is an independent coffee information and research platform documenting Cambodian coffee, Fine Robusta, processing, quality, sensory evaluation, and origin evidence.
            </p>
            <Link href="#about-system" className="mt-7 inline-flex items-center gap-2 border-b border-black/25 pb-1 text-[10px] font-medium uppercase tracking-[0.18em] transition-colors hover:border-black">
              Explore the research <ArrowUpRight className="size-3" />
            </Link>
          </motion.div>

          <div className="order-1 flex min-h-[470px] items-center justify-center py-8 md:order-2 md:col-span-5 md:min-h-[650px] md:py-0">
            <div className="relative flex items-center justify-center">
              <motion.div
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.82 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: reducedMotion ? 0.01 : 0.78, ease }}
                className="absolute h-[300px] w-[300px] rounded-full bg-[#d8cfb7] sm:h-[360px] sm:w-[360px] md:h-[470px] md:w-[470px]"
                aria-hidden="true"
              />
              <motion.div
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 48 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0.01 : 0.72, delay: reducedMotion ? 0 : 0.08, ease }}
                className="relative z-10"
              >
                <CoffeeBagVisual name="OCC" subtitle="MONDULKIRI" tone="olive" />
              </motion.div>
            </div>
          </div>

          <motion.div
            {...reveal(32)}
            className="order-2 pb-10 text-center md:order-3 md:col-span-4 md:pb-0 md:text-left"
          >
            <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.24em] text-black/38">Origin Coffee Cambodia</p>
            <h1 className="font-[var(--font-display)] text-[clamp(2.4rem,4.4vw,4rem)] font-normal leading-[0.98] tracking-[-0.02em]">
              About
              <br />
              Origin.
            </h1>
          </motion.div>
        </div>

        <div className="relative mx-auto flex w-full max-w-[1680px] items-center justify-between border-t border-black/10 px-6 py-5 text-[9px] uppercase tracking-[0.2em] text-black/38 sm:px-8 md:px-12 lg:px-16">
          <span>Origin Coffee Cambodia</span>
          <span className="hidden sm:block">Phnom Penh · Cambodia</span>
          <span>01 / About</span>
        </div>
      </section>

      <main id="about-system" className="mx-auto w-full max-w-[1680px] px-6 sm:px-8 md:px-12 lg:px-16">
        <motion.section {...reveal()} className="grid grid-cols-1 border-b border-black/10 py-20 md:grid-cols-12 lg:py-28">
          <div className="md:col-span-3">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-black/38">02 / Position</p>
          </div>
          <div className="mt-8 md:col-span-8 md:col-start-5 md:mt-0">
            <p className="font-[var(--font-display)] text-[clamp(1.8rem,3vw,2.8rem)] font-normal leading-[1.08] tracking-[-0.02em]">
              OCC documents
              <br />
              the evidence.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-8 border-t border-black/10 pt-8 lg:grid-cols-2 lg:gap-14">
              <p className="text-lg leading-8 text-black/84">
                我們用研究、來源與可驗證證據，整理柬埔寨咖啡與 Fine Robusta 的已知資訊與證據缺口。
              </p>
              <p className="text-[15px] leading-7 text-black/76">
                Origin Coffee Cambodia (OCC) is an independent coffee information and research platform focused on Cambodian coffee, Fine Robusta, Coffea canephora, processing, roasting, sensory evaluation, quality standards, and origin research.
              </p>
            </div>
          </div>
        </motion.section>

        <section className="border-b border-black/10 py-20 lg:py-28" aria-labelledby="about-explore-title">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-black/38">03 / Explore</p>
              <h2 id="about-explore-title" className="mt-5 font-[var(--font-display)] text-3xl font-normal leading-[1.02] tracking-[-0.02em] sm:text-4xl">
                Four parts.
                <br />One system.
              </h2>
            </div>

            <div className="md:col-span-8 md:col-start-5">
              {sections.map((section, index) => (
                <motion.div key={section.href} {...reveal(38)}>
                  <Link
                    href={section.href}
                    className="group grid grid-cols-[38px_1fr_auto] items-end gap-4 border-t border-black/10 py-7 last:border-b sm:grid-cols-[54px_1fr_auto] sm:py-9"
                  >
                    <span className="pb-1 text-[9px] font-medium tracking-[0.2em] text-black/34">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="font-[var(--font-display)] text-2xl font-normal leading-none tracking-[-0.02em] transition-transform duration-300 group-hover:translate-x-2 sm:text-3xl">
                        {section.title}
                      </h3>
                      <p className="mt-3 max-w-xl text-[11px] uppercase tracking-[0.13em] text-black/42">{section.desc}</p>
                    </div>
                    <ArrowUpRight className="mb-1 size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <motion.section {...reveal()} className="border-b border-black/10 py-16 lg:py-20" aria-label="OCC facts">
          <div className="grid grid-cols-1 border-y border-black/10 sm:grid-cols-3">
            {[
              ["Cambodia", "Research scope"],
              ["Fine Robusta", "Core topic"],
              ["Evidence-led", "Editorial standard"],
            ].map(([value, label], index) => (
              <div key={label} className={`py-8 sm:px-8 ${index > 0 ? "border-t border-black/10 sm:border-l sm:border-t-0" : ""}`}>
                <p className="font-[var(--font-display)] text-3xl font-normal leading-none tracking-[-0.02em] lg:text-4xl">{value}</p>
                <p className="mt-3 text-[9px] font-medium uppercase tracking-[0.2em] text-black/38">{label}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section {...reveal()} className="grid grid-cols-1 border-b border-black/10 py-20 md:grid-cols-12 lg:py-28">
          <div className="md:col-span-4">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-black/38">04 / Why research</p>
            <h2 className="mt-5 font-[var(--font-display)] text-3xl font-normal leading-[1.02] tracking-[-0.02em] sm:text-4xl">
              Built around
              <br />evidence.
            </h2>
          </div>
          <div className="mt-10 md:col-span-7 md:col-start-6 md:mt-0">
            {[
              ["Evidence and Sources", "Document what is known, distinguish primary evidence from commentary, and keep current standards separate from historical frameworks."],
              ["Origin Context", "Study Cambodian coffee and Fine Robusta without treating one lot, region, or anecdote as proof for an entire category."],
              ["Transparent Uncertainty", "State research gaps and claim boundaries clearly when public evidence is incomplete or difficult to verify."],
            ].map(([title, copy], index) => (
              <div key={title} className="grid grid-cols-[44px_1fr] gap-5 border-t border-black/10 py-7 last:border-b">
                <span className="text-[9px] tracking-[0.2em] text-black/34">0{index + 1}</span>
                <div>
                  <h3 className="text-base font-medium tracking-[-0.01em]">{title}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-black/76">{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section {...reveal()} className="grid grid-cols-1 border-b border-black/10 py-20 md:grid-cols-12 lg:py-24">
          <div className="md:col-span-4">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-black/38">05 / Cambodia research</p>
            <h2 className="mt-5 font-[var(--font-display)] text-3xl font-normal leading-[1.02] tracking-[-0.02em] sm:text-4xl">
              Studying the
              <br />origin.
            </h2>
          </div>
          <div className="mt-10 border-t border-black/10 pt-8 md:col-span-7 md:col-start-6 md:mt-0">
            <p className="text-sm uppercase leading-7 tracking-[0.14em] text-black/76">
              Cambodia · Mondulkiri · Fine Robusta · Coffea canephora
            </p>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-black/45">
              Research and technical editorial on origin, processing, quality standards, sensory evaluation, roasting, and evidence gaps in Cambodian coffee.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/solutions" className="inline-flex items-center gap-2 rounded-full bg-[#182019] px-5 py-3 text-[10px] font-medium uppercase tracking-[0.16em] text-[#f6f3ea] transition-transform duration-200 hover:-translate-y-0.5">
                Solutions <ArrowUpRight className="size-3" />
              </Link>
              <Link href="/collection" className="inline-flex items-center gap-2 rounded-full border border-black/20 px-5 py-3 text-[10px] font-medium uppercase tracking-[0.16em] transition-colors hover:bg-white/60">
                Collection <ArrowUpRight className="size-3" />
              </Link>
            </div>
          </div>
        </motion.section>

        <footer className="flex flex-col gap-5 py-10 text-[9px] uppercase tracking-[0.19em] text-black/38 sm:flex-row sm:items-end sm:justify-between">
          <span>Origin Coffee Cambodia · OCC</span>
          <span>Evidence-led research on Cambodian coffee</span>
        </footer>
      </main>
    </div>
  )
}
