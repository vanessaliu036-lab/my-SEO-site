"use client"

import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"

type InstitutionalSection = {
  title: string
  paragraphs: string[]
}

type FaqItem = {
  q: string
  a: string
}

type AboutInstitutionalTemplateProps = {
  index: string
  title: string
  subtitle: string
  lead: string[]
  sections: InstitutionalSection[]
  closing?: string[]
  faqs?: FaqItem[]
  next?: {
    href: string
    label: string
    description: string
    note?: string
  }
}

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

export function AboutInstitutionalTemplate({
  index,
  title,
  subtitle,
  lead,
  sections,
  closing = [],
  faqs = [],
  next,
}: AboutInstitutionalTemplateProps) {
  const reducedMotion = useReducedMotion()
  const reveal = (x = 0, y = 34) => ({
    initial: reducedMotion ? { opacity: 1 } : { opacity: 0, x, y },
    whileInView: { opacity: 1, x: 0, y: 0 },
    viewport: { once: true, amount: 0.22 },
    transition: { duration: reducedMotion ? 0.01 : 0.64, ease },
  })

  return (
    <div className="bg-[#f6f3ea] text-[#182019]">
      <section className="relative overflow-hidden border-b border-black/10 pt-28 lg:pt-32">
        <div className="pointer-events-none absolute inset-0 hidden grid-cols-12 divide-x divide-black/[0.06] md:grid" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, item) => <div key={item} />)}
        </div>
        <div className="relative mx-auto grid min-h-[68svh] w-full max-w-[1680px] grid-cols-1 items-end gap-10 px-6 pb-16 sm:px-8 md:grid-cols-12 md:px-12 lg:px-16 lg:pb-20">
          <motion.div {...reveal(-34, 0)} className="md:col-span-3 md:pb-3">
            <Link href="/about" className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-black/42 transition-colors hover:text-black">
              <ArrowLeft className="size-3" /> About
            </Link>
            <p className="mt-10 text-[10px] font-medium uppercase tracking-[0.24em] text-black/34">About / {index}</p>
          </motion.div>
          <motion.div {...reveal(0, 38)} className="md:col-span-6 md:col-start-4">
            <h1 className="font-[var(--font-display)] text-[clamp(4.8rem,9vw,9.5rem)] font-normal leading-[0.78] tracking-[-0.065em]">{title}</h1>
            <p className="mt-7 max-w-2xl text-[11px] font-medium uppercase leading-6 tracking-[0.17em] text-black/46">{subtitle}</p>
          </motion.div>
          <motion.div {...reveal(32, 0)} className="md:col-span-3 md:pb-3">
            <div className="border-t border-black/10 pt-6">
              {lead.map((paragraph, leadIndex) => (
                <p key={paragraph} className={leadIndex === 0 ? "text-lg leading-8 text-black/70" : "mt-5 text-[15px] italic leading-7 text-black/50"}>
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
        <div className="relative mx-auto flex w-full max-w-[1680px] items-center justify-between border-t border-black/10 px-6 py-5 text-[9px] uppercase tracking-[0.2em] text-black/34 sm:px-8 md:px-12 lg:px-16">
          <span>Origin Coffee Cambodia</span>
          <span className="hidden sm:block">Institutional / About</span>
          <span>{index} / 04</span>
        </div>
      </section>

      <main className="mx-auto w-full max-w-[1680px] px-6 sm:px-8 md:px-12 lg:px-16">
        <section className="border-b border-black/10 py-16 lg:py-24">
          {sections.map((section, sectionIndex) => {
            const fromLeft = sectionIndex % 2 === 0
            return (
              <motion.article
                key={section.title}
                {...reveal(fromLeft ? -56 : 56, 0)}
                className="grid grid-cols-1 border-t border-black/10 py-10 md:grid-cols-12 md:gap-10 lg:py-14"
              >
                <div className="md:col-span-4">
                  <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-black/32">{String(sectionIndex + 1).padStart(2, "0")}</p>
                  <h2 className="mt-5 font-[var(--font-display)] text-4xl font-normal leading-[0.95] tracking-[-0.04em] sm:text-5xl lg:text-6xl">{section.title}</h2>
                </div>
                <div className="mt-8 md:col-span-7 md:col-start-6 md:mt-0">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="mb-5 max-w-3xl text-[15px] leading-8 text-black/56 last:mb-0">{paragraph}</p>
                  ))}
                </div>
              </motion.article>
            )
          })}
        </section>

        {closing.length > 0 ? (
          <motion.section {...reveal()} className="grid grid-cols-1 border-b border-black/10 py-16 md:grid-cols-12 lg:py-20">
            <div className="md:col-span-3">
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-black/35">Closing note</p>
            </div>
            <div className="mt-7 md:col-span-8 md:col-start-5 md:mt-0">
              {closing.map((paragraph, index) => (
                <p key={paragraph} className={index === 0 ? "font-[var(--font-display)] text-4xl leading-[1.02] tracking-[-0.035em] sm:text-5xl" : "mt-7 max-w-3xl text-[15px] leading-8 text-black/54"}>
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.section>
        ) : null}

        {faqs.length > 0 ? (
          <section className="border-b border-black/10 py-16 lg:py-20" aria-labelledby={`${title.toLowerCase()}-faq-title`}>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
              <div className="md:col-span-3">
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-black/35">FAQ</p>
                <h2 id={`${title.toLowerCase()}-faq-title`} className="mt-5 font-[var(--font-display)] text-4xl font-normal leading-none tracking-[-0.04em] sm:text-5xl">Questions,<br />answered.</h2>
              </div>
              <div className="md:col-span-8 md:col-start-5">
                {faqs.map(({ q, a }, faqIndex) => (
                  <motion.div key={q} {...reveal(0, 24)} className="grid grid-cols-[38px_1fr] gap-4 border-t border-black/10 py-7 last:border-b sm:grid-cols-[54px_1fr]">
                    <span className="pt-1 text-[9px] tracking-[0.2em] text-black/32">{String(faqIndex + 1).padStart(2, "0")}</span>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-10">
                      <h3 className="text-base font-medium leading-7">{q}</h3>
                      <p className="text-sm leading-7 text-black/50">{a}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {next ? (
          <section className="grid grid-cols-1 border-b border-black/10 py-14 md:grid-cols-12 md:items-end lg:py-18">
            <div className="md:col-span-3">
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-black/35">Next</p>
            </div>
            <div className="mt-6 md:col-span-6 md:col-start-5 md:mt-0">
              <Link href={next.href} className="group inline-flex items-end gap-4">
                <span className="font-[var(--font-display)] text-5xl font-normal leading-none tracking-[-0.045em] transition-transform duration-300 group-hover:translate-x-2 sm:text-6xl">{next.label}</span>
                <ArrowUpRight className="mb-1 size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
              <p className="mt-4 text-[11px] uppercase tracking-[0.13em] text-black/40">{next.description}</p>
            </div>
            {next.note ? <p className="mt-6 text-sm italic leading-7 text-black/42 md:col-span-3 md:mt-0">{next.note}</p> : null}
          </section>
        ) : null}

        <footer className="flex flex-col gap-4 py-9 text-[9px] uppercase tracking-[0.19em] text-black/34 sm:flex-row sm:justify-between">
          <span>Origin Coffee Cambodia · OCC</span>
          <span>About / {index}</span>
        </footer>
      </main>
    </div>
  )
}
