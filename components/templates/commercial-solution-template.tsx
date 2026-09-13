import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { MotionReveal } from "@/components/ui/motion-reveal"

type HighlightCard = {
  title: string
  text: string
  meta?: string
}

type CommercialSection = {
  label: string
  title: string
  content: ReactNode
}

type ProcessStep = {
  title: string
  text: string
}

type ComparisonPath = {
  eyebrow: string
  title: string
  description: string
  href: string
  cta: string
  active?: boolean
}

type FaqItem = {
  q: string
  a: ReactNode
}

type CommercialSolutionTemplateProps = {
  index: string
  pathLabel: string
  title: string
  subtitle: string
  heroStatement: string
  heroCtaLabel: string
  highlightTitle: string
  highlightIntro: string
  highlightCards: HighlightCard[]
  sections: CommercialSection[]
  processTitle: string
  processIntro: string
  processSteps: ProcessStep[]
  sidebarLabel: string
  sidebarFacts: string[]
  comparisonTitle: string
  comparison: [ComparisonPath, ComparisonPath]
  faqs: FaqItem[]
  ctaLabel: string
  ctaDescription: string
}

export function CommercialSolutionTemplate({
  index,
  pathLabel,
  title,
  subtitle,
  heroStatement,
  heroCtaLabel,
  highlightTitle,
  highlightIntro,
  highlightCards,
  sections,
  processTitle,
  processIntro,
  processSteps,
  sidebarLabel,
  sidebarFacts,
  comparisonTitle,
  comparison,
  faqs,
  ctaLabel,
  ctaDescription,
}: CommercialSolutionTemplateProps) {
  return (
    <div className="bg-[#f6f3ea] text-[#182019]">
      <section className="relative overflow-hidden border-b border-black/10 pt-28 lg:pt-32">
        <div className="pointer-events-none absolute inset-0 hidden grid-cols-12 divide-x divide-black/[0.055] md:grid" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, item) => <div key={item} />)}
        </div>

        <div className="relative mx-auto w-full max-w-[1680px] px-6 pb-14 pt-6 sm:px-8 md:px-12 lg:px-16 lg:pb-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
            <MotionReveal direction="left" className="md:col-span-3 md:pb-2">
              <Link href="/solutions" className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-black/42 transition-colors hover:text-black">
                <ArrowLeft className="size-3" /> Solutions
              </Link>
              <p className="mt-10 text-[10px] font-medium uppercase tracking-[0.24em] text-[#a8542a]">{pathLabel}</p>
              <p className="mt-3 text-[9px] uppercase tracking-[0.2em] text-black/34">Solutions / {index}</p>
            </MotionReveal>

            <MotionReveal className="md:col-span-6 md:col-start-4">
              <h1 className="font-[var(--font-display)] text-[clamp(3rem,5.4vw,5rem)] font-normal leading-[0.94] tracking-[-0.04em]">{title}</h1>
            </MotionReveal>

            <MotionReveal direction="right" className="md:col-span-3 md:col-start-10 md:pb-2">
              <p className="border-t border-black/10 pt-5 text-[15px] leading-7 text-black/76">{subtitle}</p>
            </MotionReveal>
          </div>

          <MotionReveal className="mt-16 grid grid-cols-1 gap-8 border-t border-black/10 pt-10 md:mt-20 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7 md:col-start-4">
              <p className="font-[var(--font-display)] text-[clamp(2.1rem,3.8vw,3.7rem)] font-normal leading-[1.02] tracking-[-0.035em]">{heroStatement}</p>
            </div>
            <div className="md:col-span-2 md:col-start-11">
              <Link href="/contact" className="group inline-flex items-center gap-2 rounded-full bg-[#182019] px-5 py-3 text-[10px] font-medium uppercase tracking-[0.16em] text-[#f6f3ea] transition-transform duration-300 hover:-translate-y-0.5">
                {heroCtaLabel}<ArrowUpRight className="size-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </MotionReveal>
        </div>

        <div className="relative mx-auto flex w-full max-w-[1680px] items-center justify-between border-t border-black/10 px-6 py-5 text-[9px] uppercase tracking-[0.2em] text-black/34 sm:px-8 md:px-12 lg:px-16">
          <span>Origin Coffee Cambodia</span>
          <span className="hidden sm:block">Commercial Coffee Solutions</span>
          <span>{index} / 02</span>
        </div>
      </section>

      <main className="mx-auto w-full max-w-[1680px] px-6 sm:px-8 md:px-12 lg:px-16">
        <section className="border-b border-black/10 py-16 lg:py-24" aria-labelledby={`${index}-highlights`}>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <MotionReveal direction="left" className="md:col-span-3">
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-black/35">01 / Commercial Focus</p>
              <h2 id={`${index}-highlights`} className="mt-5 font-[var(--font-display)] text-3xl font-normal leading-[1.02] tracking-[-0.03em] sm:text-4xl">{highlightTitle}</h2>
              <p className="mt-6 max-w-xs text-sm leading-7 text-black/62">{highlightIntro}</p>
            </MotionReveal>

            <div className="md:col-span-8 md:col-start-5">
              <div className="grid grid-cols-1 border-l border-t border-black/10 sm:grid-cols-2">
                {highlightCards.map((card, cardIndex) => (
                  <MotionReveal key={card.title} direction={cardIndex % 2 === 0 ? "left" : "right"}>
                    <article className="group min-h-[220px] border-b border-r border-black/10 p-6 transition-colors duration-300 hover:bg-[#eee8dc] lg:min-h-[250px] lg:p-8">
                      <div className="flex items-start justify-between gap-4">
                        <span className="text-[9px] tracking-[0.2em] text-[#a8542a]">{String(cardIndex + 1).padStart(2, "0")}</span>
                        {card.meta ? <span className="text-[9px] uppercase tracking-[0.16em] text-black/35">{card.meta}</span> : null}
                      </div>
                      <h3 className="mt-12 font-[var(--font-display)] text-2xl font-normal leading-[1.05] tracking-[-0.025em] transition-transform duration-300 group-hover:translate-x-1">{card.title}</h3>
                      <p className="mt-4 max-w-sm text-sm leading-7 text-black/64">{card.text}</p>
                    </article>
                  </MotionReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-black/10 py-16 lg:py-24">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-8">
              {sections.map((section, sectionIndex) => (
                <MotionReveal key={section.title} direction={sectionIndex % 2 === 0 ? "left" : "right"}>
                  <article className="grid grid-cols-1 border-t border-black/10 py-11 md:grid-cols-8 md:gap-8 lg:py-16">
                    <div className="md:col-span-3">
                      <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#a8542a]">{section.label}</p>
                      <h2 className="mt-5 font-[var(--font-display)] text-2xl font-normal leading-[1.04] tracking-[-0.025em] sm:text-3xl">{section.title}</h2>
                    </div>
                    <div className="mt-7 text-[15px] leading-8 text-black/76 md:col-span-5 md:mt-0 [&_a]:border-b [&_a]:border-black/25 [&_a]:transition-colors hover:[&_a]:border-black">
                      {section.content}
                    </div>
                  </article>
                </MotionReveal>
              ))}
            </div>

            <MotionReveal direction="right" className="md:col-span-3 md:col-start-10">
              <aside className="sticky top-28 border-t border-black/10 bg-[#202820] px-6 py-7 text-[#f6f3ea] lg:px-7 lg:py-8">
                <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-white/45">{sidebarLabel}</p>
                <div className="mt-7">
                  {sidebarFacts.map((fact, factIndex) => (
                    <div key={fact} className="grid grid-cols-[30px_1fr] gap-3 border-t border-white/14 py-4 last:border-b">
                      <span className="text-[8px] tracking-[0.18em] text-white/30">{String(factIndex + 1).padStart(2, "0")}</span>
                      <span className="text-sm leading-6 text-white/72">{fact}</span>
                    </div>
                  ))}
                </div>
              </aside>
            </MotionReveal>
          </div>
        </section>

        <section className="border-b border-black/10 py-16 lg:py-24" aria-labelledby={`${index}-process`}>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <MotionReveal direction="left" className="md:col-span-3">
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-black/35">02 / Process</p>
              <h2 id={`${index}-process`} className="mt-5 font-[var(--font-display)] text-3xl font-normal leading-[1.02] tracking-[-0.03em] sm:text-4xl">{processTitle}</h2>
              <p className="mt-6 max-w-xs text-sm leading-7 text-black/62">{processIntro}</p>
            </MotionReveal>

            <div className="md:col-span-8 md:col-start-5">
              {processSteps.map((step, stepIndex) => (
                <MotionReveal key={step.title} direction={stepIndex % 2 === 0 ? "left" : "right"}>
                  <article className="grid grid-cols-[44px_1fr] gap-5 border-t border-black/10 py-7 last:border-b sm:grid-cols-[56px_1fr] lg:grid-cols-[64px_220px_1fr] lg:gap-8 lg:py-8">
                    <span className="pt-1 text-[9px] tracking-[0.2em] text-[#a8542a]">{String(stepIndex + 1).padStart(2, "0")}</span>
                    <h3 className="font-[var(--font-display)] text-xl font-normal leading-[1.1] tracking-[-0.02em] sm:text-2xl">{step.title}</h3>
                    <p className="col-start-2 mt-2 text-sm leading-7 text-black/64 lg:col-start-3 lg:mt-0">{step.text}</p>
                  </article>
                </MotionReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-black/10 py-16 lg:py-24" aria-labelledby={`${index}-comparison`}>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <MotionReveal direction="left" className="md:col-span-3">
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-black/35">03 / Two Commercial Paths</p>
              <h2 id={`${index}-comparison`} className="mt-5 font-[var(--font-display)] text-3xl font-normal leading-[1.02] tracking-[-0.03em] sm:text-4xl">{comparisonTitle}</h2>
            </MotionReveal>

            <div className="grid grid-cols-1 md:col-span-8 md:col-start-5 lg:grid-cols-2">
              {comparison.map((path, pathIndex) => (
                <MotionReveal key={path.title} direction={pathIndex === 0 ? "left" : "right"}>
                  <article className={`flex min-h-[330px] flex-col border border-black/10 p-7 lg:min-h-[390px] lg:p-9 ${path.active ? "bg-[#202820] text-[#f6f3ea]" : "bg-transparent text-[#182019]"}`}>
                    <p className={`text-[9px] font-medium uppercase tracking-[0.22em] ${path.active ? "text-white/45" : "text-[#a8542a]"}`}>{path.eyebrow}</p>
                    <h3 className="mt-10 font-[var(--font-display)] text-3xl font-normal leading-[1] tracking-[-0.03em] sm:text-4xl">{path.title}</h3>
                    <p className={`mt-6 max-w-md text-sm leading-7 ${path.active ? "text-white/68" : "text-black/64"}`}>{path.description}</p>
                    <Link href={path.href} className={`group mt-auto inline-flex items-center gap-2 pt-10 text-[10px] font-medium uppercase tracking-[0.16em] ${path.active ? "text-white" : "text-black"}`}>
                      {path.cta}<ArrowUpRight className="size-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </article>
                </MotionReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-black/10 py-16 lg:py-20" aria-labelledby={`${index}-faq-title`}>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-black/35">04 / Reference</p>
              <h2 id={`${index}-faq-title`} className="mt-5 font-[var(--font-display)] text-2xl font-normal leading-[1.05] tracking-[-0.02em] sm:text-3xl">Commercial details,<br />kept explicit.</h2>
            </div>
            <div className="md:col-span-8 md:col-start-5">
              {faqs.map(({ q, a }, faqIndex) => (
                <MotionReveal key={q}>
                  <div className="grid grid-cols-[38px_1fr] gap-4 border-t border-black/10 py-7 last:border-b sm:grid-cols-[54px_1fr]">
                    <span className="pt-1 text-[9px] tracking-[0.2em] text-black/32">{String(faqIndex + 1).padStart(2, "0")}</span>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-10">
                      <h3 className="font-[var(--font-sans)] text-base font-semibold leading-7 tracking-[-0.01em]">{q}</h3>
                      <div className="text-sm leading-7 text-black/76 [&_a]:border-b [&_a]:border-black/25">{a}</div>
                    </div>
                  </div>
                </MotionReveal>
              ))}
            </div>
          </div>
        </section>

        <MotionReveal>
          <section className="grid grid-cols-1 border-b border-black/10 py-16 md:grid-cols-12 md:items-end lg:py-20">
            <div className="md:col-span-3">
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-black/35">Next step</p>
            </div>
            <div className="mt-6 md:col-span-7 md:col-start-5 md:mt-0">
              <p className="max-w-2xl text-sm leading-7 text-black/58">{ctaDescription}</p>
              <Link href="/contact" className="group mt-7 inline-flex items-end gap-4">
                <span className="font-[var(--font-display)] text-3xl font-normal leading-none tracking-[-0.03em] transition-transform duration-300 group-hover:translate-x-2 sm:text-4xl">{ctaLabel}</span>
                <ArrowUpRight className="mb-1 size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </section>
        </MotionReveal>

        <footer className="flex flex-col gap-4 py-9 text-[9px] uppercase tracking-[0.19em] text-black/34 sm:flex-row sm:justify-between">
          <span>Origin Coffee Cambodia · OCC</span>
          <span>{pathLabel} / {index}</span>
        </footer>
      </main>
    </div>
  )
}
