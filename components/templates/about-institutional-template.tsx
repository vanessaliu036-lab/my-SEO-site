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

type FeatureItem = {
  label: string
  title: string
  body: string
}

type AboutInstitutionalTemplateProps = {
  index: string
  title: string
  subtitle: string
  lead: string[]
  sections: InstitutionalSection[]
  closing?: string[]
  faqs?: FaqItem[]
  featureGrid?: FeatureItem[]
  practiceLabel?: string
  practiceTitle?: string
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
  featureGrid = [],
  practiceLabel = "In practice",
  practiceTitle = "How the work moves.",
  next,
}: AboutInstitutionalTemplateProps) {
  const reducedMotion = useReducedMotion()
  const titleScale = title.length > 11 ? "text-[clamp(2rem,3.4vw,3.2rem)]" : "text-[clamp(2.2rem,3.8vw,3.6rem)]"
  const reveal = (x = 0, y = 34) => ({
    initial: reducedMotion ? { opacity: 1 } : { opacity: 0, x, y },
    whileInView: { opacity: 1, x: 0, y: 0 },
    viewport: { once: true, amount: 0.22 },
    transition: { duration: reducedMotion ? 0.01 : 0.64, ease },
  })

  return (
    <div className="bg-[#f6f3ea] text-[#182019]">
      <section className="relative overflow-hidden border-b border-black/10">
        <div className="pointer-events-none absolute inset-0 hidden grid-cols-12 divide-x divide-black/[0.055] md:grid" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, item) => <div key={item} />)}
        </div>
        <div className="relative mx-auto grid min-h-[min(590px,calc(100dvh-80px))] w-full max-w-[1680px] grid-cols-1 items-center gap-10 px-6 py-16 sm:px-8 md:grid-cols-12 md:gap-8 md:px-12 md:py-20 lg:px-16">
          <motion.div {...reveal(-24, 0)} className="md:col-span-2">
            <Link href="/about" className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-black/48 transition-colors hover:text-black">
              <ArrowLeft className="size-3" /> About
            </Link>
            <p className="mt-8 text-[10px] font-medium uppercase tracking-[0.24em] text-black/35">About / {index}</p>
          </motion.div>
          <motion.div {...reveal(0, 22)} className="min-w-0 md:col-span-6 md:col-start-3">
            <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.24em] text-black/42">Origin Coffee Cambodia</p>
            <h1 id={`${title.toLowerCase()}-title`} className={`max-w-[11ch] break-words font-[var(--font-display)] ${titleScale} font-normal leading-[0.94] tracking-[-0.02em]`}>{title}</h1>
            <p className="mt-7 max-w-xl text-[10px] font-medium uppercase leading-6 tracking-[0.18em] text-black/48">{subtitle}</p>
          </motion.div>
          <motion.div {...reveal(26, 0)} className="min-w-0 md:col-span-4 md:col-start-9">
            <p className="border-t border-black/15 pt-5 text-[10px] font-medium uppercase tracking-[0.22em] text-black/45">The point of view</p>
            <div className="mt-7 max-w-md">
              {lead.map((paragraph, leadIndex) => (
                <p key={paragraph} className={leadIndex === 0 ? "text-[clamp(1.15rem,1.6vw,1.55rem)] leading-7 text-black/86" : "mt-6 border-l border-black/25 pl-5 text-sm italic leading-6 text-black/78"}>
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

      {featureGrid.length > 0 ? (
        <section className="border-b border-black/10 bg-[#ebe5d8]" aria-labelledby={`${title.toLowerCase()}-practice-title`}>
          <div className="mx-auto grid w-full max-w-[1680px] grid-cols-1 px-6 py-14 sm:px-8 md:grid-cols-12 md:gap-10 md:px-12 md:py-16 lg:px-16 lg:py-20">
            <div className="md:col-span-3">
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-black/45">{practiceLabel}</p>
              <h2 id={`${title.toLowerCase()}-practice-title`} className="mt-5 max-w-[13rem] font-[var(--font-display)] text-2xl font-normal leading-[1.02] tracking-[-0.02em] sm:text-3xl">{practiceTitle}</h2>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-px border border-black/10 bg-black/10 md:col-span-9 md:mt-0 md:grid-cols-3">
              {featureGrid.map((item) => (
                <article key={item.title} className="bg-[#f6f3ea] p-6 sm:p-7 lg:p-8">
                  <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-black/38">{item.label}</p>
                  <h3 className="mt-10 font-[var(--font-display)] text-xl font-normal leading-none tracking-[-0.02em] sm:text-2xl">{item.title}</h3>
                  <p className="mt-6 text-[15px] leading-7 text-black/82">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <div className="mx-auto w-full max-w-[1680px] px-6 sm:px-8 md:px-12 lg:px-16">
        <section className="border-b border-black/10 py-16 lg:py-20" aria-labelledby={`${title.toLowerCase()}-chapters-title`}>
          <div className="mb-8 flex items-end justify-between gap-6 border-b border-black/10 pb-5">
            <h2 id={`${title.toLowerCase()}-chapters-title`} className="text-[10px] font-medium uppercase tracking-[0.22em] text-black/42">A closer look at the work</h2>
            <span className="text-[10px] uppercase tracking-[0.18em] text-black/32">{sections.length} chapters</span>
          </div>
          {sections.map((section, sectionIndex) => {
            const fromLeft = sectionIndex % 2 === 0
            return (
              <motion.article
                key={section.title}
                {...reveal(fromLeft ? -56 : 56, 0)}
                className="grid grid-cols-1 border-t border-black/10 py-10 md:grid-cols-12 md:gap-10 lg:py-14"
              >
                <div className="md:col-span-4">
                  <div className="flex items-center gap-4">
                    <span className="flex size-8 items-center justify-center rounded-full border border-black/20 text-[9px] font-medium tracking-[0.1em]">{String(sectionIndex + 1).padStart(2, "0")}</span>
                    <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-black/38">Chapter</span>
                  </div>
                  <h2 className="mt-6 max-w-sm font-[var(--font-display)] text-2xl font-normal leading-[1.02] tracking-[-0.02em] sm:text-3xl">{section.title}</h2>
                </div>
                <div className="mt-8 md:col-span-7 md:col-start-6 md:mt-0">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="mb-5 max-w-3xl text-base leading-8 text-black/82 last:mb-0">{paragraph}</p>
                  ))}
                </div>
              </motion.article>
            )
          })}
        </section>

        {closing.length > 0 ? (
          <motion.section {...reveal()} className="grid grid-cols-1 border-b border-black/10 py-16 md:grid-cols-12 lg:py-20">
            <div className="md:col-span-3">
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-black/42">The takeaway</p>
            </div>
            <div className="mt-7 md:col-span-8 md:col-start-5 md:mt-0">
              {closing.map((paragraph, index) => (
                <p key={paragraph} className={index === 0 ? "max-w-4xl font-[var(--font-display)] text-[clamp(1.5rem,2.4vw,2.4rem)] leading-[1.15] tracking-[-0.02em]" : "mt-8 max-w-3xl text-base leading-8 text-black/82"}>
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
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-black/42">Good to know</p>
                <h2 id={`${title.toLowerCase()}-faq-title`} className="mt-5 font-[var(--font-display)] text-4xl font-normal leading-none tracking-[-0.04em] sm:text-5xl">Questions,<br />answered.</h2>
              </div>
              <div className="md:col-span-8 md:col-start-5">
                {faqs.map(({ q, a }, faqIndex) => (
                  <motion.div key={q} {...reveal(0, 24)} className="grid grid-cols-[38px_1fr] gap-4 border-t border-black/10 py-7 last:border-b sm:grid-cols-[54px_1fr]">
                    <span className="pt-1 text-[9px] tracking-[0.2em] text-black/32">{String(faqIndex + 1).padStart(2, "0")}</span>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-10">
                      <h3 className="font-[var(--font-sans)] text-base font-semibold leading-7 tracking-[-0.01em]">{q}</h3>
                      <p className="text-base leading-7 text-black/82">{a}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {next ? (
          <section className="my-10 grid grid-cols-1 border-y border-black/10 py-12 md:grid-cols-12 md:items-end lg:my-16 lg:py-14">
            <div className="md:col-span-3">
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-black/42">Continue the story</p>
            </div>
            <div className="mt-6 md:col-span-6 md:col-start-5 md:mt-0">
              <Link href={next.href} className="group inline-flex items-end gap-4">
                <span className="font-[var(--font-display)] text-4xl font-normal leading-none tracking-[-0.04em] transition-transform duration-300 group-hover:translate-x-2 sm:text-5xl">{next.label}</span>
                <ArrowUpRight className="mb-1 size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
              <p className="mt-4 text-[11px] uppercase leading-6 tracking-[0.14em] text-black/42">{next.description}</p>
            </div>
            {next.note ? <p className="mt-6 text-sm italic leading-7 text-black/46 md:col-span-3 md:mt-0">{next.note}</p> : null}
          </section>
        ) : null}

        <footer className="flex flex-col gap-4 py-9 text-[9px] uppercase tracking-[0.19em] text-black/34 sm:flex-row sm:justify-between">
          <span>Origin Coffee Cambodia · OCC</span>
          <span>About / {index}</span>
        </footer>
      </div>
    </div>
  )
}
