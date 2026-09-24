"use client"

import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"

type InstitutionalSection = { title: string; paragraphs: string[] }
type FaqItem = { q: string; a: string }
type FeatureItem = { label: string; title: string; body: string }
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
  next?: { href: string; label: string; description: string; note?: string }
}

const chapterImages = [
  "/occ-pages/assets/occ-origin-mondulkiri-farm.webp",
  "/occ-pages/assets/occ-sensory-cupping.webp",
  "/occ-pages/assets/occ-roasting-sample-evaluation.webp",
  "/occ-pages/assets/occ-roasting-espresso.webp",
]
const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]
const anchor = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")

export function AboutInstitutionalTemplate({
  index, title, subtitle, lead, sections, closing = [], faqs = [], featureGrid = [],
  practiceLabel = "Our approach", practiceTitle = "The work, put into practice.", next,
}: AboutInstitutionalTemplateProps) {
  const reducedMotion = useReducedMotion()
  const reveal = (y = 22) => ({
    initial: reducedMotion ? { opacity: 1 } : { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.18 },
    transition: { duration: reducedMotion ? 0.01 : 0.58, ease },
  })

  return (
    <main className="bg-[#f2ede6] text-[#292424]">
      <section className="border-b border-[#d9d0c7]">
        <div className="mx-auto grid w-full max-w-[1160px] grid-cols-1 items-center gap-8 px-5 py-9 sm:px-8 md:grid-cols-2 md:gap-12 md:py-14 lg:px-0">
          <motion.div {...reveal()}>
            <Link href="/about" className="inline-flex items-center gap-2 text-xs font-semibold text-[#6a6663] hover:text-[#91434d]"><ArrowLeft className="size-3" /> About OCC</Link>
            <p className="mb-4 mt-8 text-[11px] font-bold uppercase tracking-[.12em] text-[#6a6663]">About / {index} · Origin Coffee Cambodia</p>
            <h1 className="font-[var(--font-display)] text-[clamp(3.6rem,8vw,6.5rem)] font-normal leading-[.96] tracking-[-.07em]">{title}</h1>
            <p className="mt-5 max-w-[430px] text-sm font-bold uppercase leading-6 tracking-[.07em] text-[#91434d]">{subtitle}</p>
            <p className="mt-7 max-w-[535px] font-[var(--font-display)] text-[clamp(1.75rem,3.2vw,2.45rem)] leading-[1.2] tracking-[-.03em]">{lead[0]}</p>
            {lead[1] ? <p className="mt-4 max-w-[520px] text-base leading-7 text-[#6a6663]">{lead[1]}</p> : null}
            <a href="#chapters" className="mt-6 inline-flex items-center gap-3 border-b border-[#91434d] pb-2 text-sm font-bold hover:text-[#91434d]">Explore the story <span aria-hidden="true">↓</span></a>
          </motion.div>
          <motion.figure {...reveal(32)} className="relative m-0 min-h-[340px] overflow-hidden bg-[#e9e1d8] md:min-h-[490px]">
            <img src="/occ-pages/assets/occ-roasting-hero.webp" alt="Coffee being prepared and evaluated by Origin Coffee Cambodia" className="absolute inset-0 size-full object-cover" />
            <figcaption className="absolute bottom-0 left-0 bg-[#f2ede6] px-5 py-3 text-xs font-bold tracking-[.08em]">Origin Coffee Cambodia · {index} / 04</figcaption>
          </motion.figure>
        </div>
      </section>

      {featureGrid.length ? <section id="approach" className="scroll-mt-16 border-b border-[#d9d0c7] bg-[#faf7f2] py-12 md:py-16">
        <div className="mx-auto w-full max-w-[1160px] px-5 sm:px-8 lg:px-0">
          <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div><p className="text-xs font-bold uppercase tracking-[.12em] text-[#91434d]">{practiceLabel}</p><h2 className="mt-2 max-w-[600px] font-[var(--font-display)] text-3xl leading-tight tracking-[-.04em] md:text-[2.8rem]">{practiceTitle}</h2></div>
            <p className="max-w-[250px] text-sm leading-6 text-[#6a6663]">Origin knowledge made useful for the coffee business.</p>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {featureGrid.map((item) => <article key={item.title} className="border-t-2 border-[#91434d] bg-[#f2ede6] p-6 md:p-7"><p className="text-[11px] font-bold uppercase tracking-[.1em] text-[#91434d]">{item.label}</p><h3 className="mt-5 font-[var(--font-display)] text-2xl leading-tight tracking-[-.03em]">{item.title}</h3><p className="mt-4 text-[15px] leading-7 text-[#6a6663]">{item.body}</p></article>)}
          </div>
        </div>
      </section> : null}

      <nav aria-label={`${title} chapters`} className="sticky top-0 z-20 border-y border-[#d9d0c7] bg-[#f7f4ed]/95 backdrop-blur-md">
        <div className="mx-auto flex min-h-14 max-w-[1160px] items-center gap-6 overflow-x-auto px-5 sm:px-8 lg:px-0">
          <span className="shrink-0 text-[10px] font-bold uppercase tracking-[.1em] text-[#91434d]">{title}</span>
          <div className="flex min-w-max items-center gap-5 md:gap-8">{sections.map((section, i) => <a key={section.title} href={`#${anchor(section.title)}`} className="border-b-2 border-transparent py-4 text-xs font-semibold text-[#6a6663] hover:border-[#91434d] hover:text-[#91434d]">{String(i + 1).padStart(2, "0")} {section.title}</a>)}</div>
        </div>
      </nav>

      <section id="chapters" className="mx-auto w-full max-w-[1160px] px-5 pb-8 pt-12 sm:px-8 md:pt-16 lg:px-0">
        <div className="mb-2 flex items-end justify-between gap-4 border-b border-[#d9d0c7] pb-5">
          <div><p className="text-xs font-bold uppercase tracking-[.12em] text-[#91434d]">Origin Coffee Cambodia · About</p><h2 className="mt-2 font-[var(--font-display)] text-3xl tracking-[-.04em] md:text-4xl">{practiceTitle}</h2></div>
          <span className="shrink-0 text-[11px] font-bold uppercase tracking-[.1em] text-[#6a6663]">{sections.length} chapters</span>
        </div>
        {sections.map((section, i) => (
          <motion.article id={anchor(section.title)} key={section.title} {...reveal()} className="grid scroll-mt-24 grid-cols-1 items-center gap-6 border-b border-[#d9d0c7] py-10 md:grid-cols-2 md:gap-12 md:py-14">
            <figure className={`m-0 min-w-0 bg-[#e9e1d8] ${i % 2 ? "md:order-2" : ""}`}><img src={chapterImages[i % chapterImages.length]} alt="" loading="lazy" className="aspect-[1.3] w-full object-cover"/><figcaption className="bg-[#f2ede6] pt-3 text-xs font-semibold text-[#6a6663]">Origin · Quality · Professional coffee</figcaption></figure>
            <div className={i % 2 ? "md:order-1" : ""}>
              <div className="mb-4 flex items-center gap-3"><span className="border-b border-[#91434d] pb-1 text-[13px] font-extrabold text-[#91434d]">{String(i + 1).padStart(2, "0")}</span><span className="text-[11px] font-bold uppercase tracking-[.1em] text-[#6a6663]">Chapter · OCC</span></div>
              <h3 className="mb-5 font-[var(--font-display)] text-[clamp(2.2rem,4vw,3.25rem)] leading-[1.08] tracking-[-.045em]">{section.title}</h3>
              <div className="space-y-4 text-base leading-7 text-[#6a6663] md:text-[17px] md:leading-[1.72]">{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            </div>
          </motion.article>
        ))}
      </section>

      {closing.length ? <section className="border-y border-[#d9d0c7] bg-[#faf7f2] py-12 md:py-16"><div className="mx-auto grid max-w-[1160px] grid-cols-1 gap-5 px-5 sm:px-8 md:grid-cols-[220px_1fr] md:gap-12 lg:px-0"><p className="text-xs font-bold uppercase tracking-[.12em] text-[#91434d]">The takeaway</p><div>{closing.map((paragraph, i) => <p key={paragraph} className={i === 0 ? "max-w-[815px] font-[var(--font-display)] text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.14] tracking-[-.04em]" : "mt-5 max-w-[800px] text-base leading-7 text-[#6a6663]"}>{paragraph}</p>)}</div></div></section> : null}

      {faqs.length ? <section className="mx-auto grid max-w-[1160px] grid-cols-1 gap-7 px-5 py-12 sm:px-8 md:grid-cols-[270px_1fr] md:gap-12 md:py-16 lg:px-0"><div><p className="text-xs font-bold uppercase tracking-[.12em] text-[#91434d]">Good to know</p><h2 className="mt-3 font-[var(--font-display)] text-4xl leading-tight tracking-[-.04em]">Questions,<br/>answered.</h2></div><div>{faqs.map(({ q, a }, i) => <details key={q} className="group border-t border-[#d9d0c7] py-4 last:border-b"><summary className="grid cursor-pointer list-none grid-cols-[32px_1fr_20px] items-center gap-3 py-2 text-base font-semibold"><span className="text-xs text-[#91434d]">{String(i + 1).padStart(2, "0")}</span>{q}<span className="text-xl font-normal text-[#91434d] group-open:rotate-45">＋</span></summary><p className="pb-3 pl-11 text-[15px] leading-7 text-[#6a6663]">{a}</p></details>)}</div></section> : null}

      {next ? <section className="mx-auto grid max-w-[1160px] grid-cols-1 items-end gap-5 border-y border-[#d9d0c7] px-5 py-8 sm:px-8 md:grid-cols-[1fr_auto] lg:px-0"><div><p className="text-xs font-bold uppercase tracking-[.12em] text-[#91434d]">Continue the story</p><h2 className="mt-2 font-[var(--font-display)] text-3xl tracking-[-.04em]">{next.note || next.description}</h2><p className="mt-2 max-w-xl text-sm leading-6 text-[#6a6663]">Explore the next part of OCC's work.</p></div><Link href={next.href} className="inline-flex items-center gap-2 border-b border-[#91434d] pb-2 text-sm font-bold">{next.label}<ArrowUpRight className="size-4"/></Link></section> : null}

      <section className="mt-10 bg-[#faf7f2] py-12 md:py-16"><div className="mx-auto grid max-w-[1160px] grid-cols-1 items-end gap-6 px-5 sm:px-8 md:grid-cols-[1fr_auto] lg:px-0"><div><p className="text-xs font-bold uppercase tracking-[.12em] text-[#91434d]">For professional buyers</p><h2 className="mt-3 max-w-3xl font-[var(--font-display)] text-[clamp(2.2rem,4vw,3.4rem)] leading-tight tracking-[-.04em]">Start with Cambodian coffee. Build a program around it.</h2><p className="mt-4 max-w-2xl text-base leading-7 text-[#6a6663]">Talk with OCC about Cambodian coffee, Fine Robusta, sourcing, supply, and roasting options for your business.</p></div><Link href="/contact" className="inline-flex w-fit items-center gap-2 border-b border-[#91434d] pb-2 text-sm font-bold">Discuss your coffee needs <ArrowUpRight className="size-4"/></Link></div></section>
      <footer className="mx-auto flex max-w-[1160px] flex-wrap justify-between gap-3 px-5 py-6 text-[10px] font-semibold uppercase tracking-[.12em] text-[#6a6663] sm:px-8 lg:px-0"><span>Origin Coffee Cambodia · OCC</span><span>About / {index} · Cambodia · Fine Robusta · B2B Coffee</span></footer>
    </main>
  )
}
