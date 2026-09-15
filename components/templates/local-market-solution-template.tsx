import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { MotionReveal } from "@/components/ui/motion-reveal"

type HighlightCard = { title: string; text: string; meta?: string }
type ContentSection = { label: string; title: string; content: ReactNode }
type ProcessStep = { title: string; text: string }
type RelatedLink = { title: string; description: string; href: string }
type SupportCard = { eyebrow: string; title: string; description: string; href: string; cta: string; active?: boolean }
type FaqItem = { q: string; a: ReactNode }

type LocalMarketSolutionTemplateProps = {
  index: string
  title: string
  subtitle: string
  heroStatement: string
  heroCtaLabel: string
  highlightTitle: string
  highlightIntro: string
  highlightCards: HighlightCard[]
  sections: ContentSection[]
  relatedLinks: RelatedLink[]
  sidebarFacts: string[]
  processTitle: string
  processIntro: string
  processSteps: ProcessStep[]
  darkEyebrow: string
  darkTitle: string
  darkDescription: string
  darkCta: string
  supportTitle: string
  supportCards: readonly [SupportCard, SupportCard]
  faqs: FaqItem[]
  ctaLabel: string
  ctaDescription: string
}

export function LocalMarketSolutionTemplate({
  index,
  title,
  subtitle,
  heroStatement,
  heroCtaLabel,
  highlightTitle,
  highlightIntro,
  highlightCards,
  sections,
  relatedLinks,
  sidebarFacts,
  processTitle,
  processIntro,
  processSteps,
  darkEyebrow,
  darkTitle,
  darkDescription,
  darkCta,
  supportTitle,
  supportCards,
  faqs,
  ctaLabel,
  ctaDescription,
}: LocalMarketSolutionTemplateProps) {
  const sectionLabelClass = "text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a8542a]"
  const sectionTitleClass = "mt-5 max-w-[13ch] font-[var(--font-display)] text-[clamp(2.1rem,7.5vw,3.2rem)] font-normal leading-[0.98] tracking-[-0.035em] text-[#f3f1ea]"

  return (
    <div className="bg-[#2f3b2d] text-[#f3f1ea]">
      <section className="relative overflow-hidden border-b border-white/15 pt-28 lg:pt-32">
        <div className="pointer-events-none absolute inset-0 hidden grid-cols-12 divide-x divide-white/[0.08] md:grid" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, item) => <div key={item} />)}
        </div>

        <div className="relative mx-auto w-full max-w-[1680px] px-6 pb-14 pt-6 sm:px-8 md:px-12 lg:px-16 lg:pb-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
            <MotionReveal direction="left" className="md:col-span-3 md:pb-2">
              <Link href="/solutions" className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white/58 transition-colors hover:text-white">
                <ArrowLeft className="size-3" /> Solutions
              </Link>
              <p className="mt-10 text-[10px] font-medium uppercase tracking-[0.24em] text-[#a8542a]">CAMBODIAN MARKET</p>
              <p className="mt-3 text-[9px] uppercase tracking-[0.2em] text-white/42">Solutions / {index}</p>
            </MotionReveal>

            <MotionReveal className="md:col-span-6 md:col-start-4">
              <h1 className="font-[var(--font-display)] text-[clamp(3rem,5.4vw,5rem)] font-normal leading-[0.94] tracking-[-0.04em]">{title}</h1>
            </MotionReveal>

            <MotionReveal direction="right" className="md:col-span-3 md:col-start-10 md:pb-2">
              <p className="border-t border-white/15 pt-5 text-[15px] leading-7 text-white/76">{subtitle}</p>
            </MotionReveal>
          </div>

          <MotionReveal className="mt-16 grid grid-cols-1 gap-8 border-t border-white/15 pt-10 md:mt-20 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7 md:col-start-4">
              <p className="font-[var(--font-display)] text-[clamp(2.25rem,8vw,3.7rem)] font-normal leading-[0.98] tracking-[-0.04em]">{heroStatement}</p>
            </div>
            <div className="md:col-span-2 md:col-start-11">
              <Link href="/contact" className="group inline-flex items-center gap-2 rounded-full bg-[#182019] px-5 py-3 text-[10px] font-medium uppercase tracking-[0.16em] text-[#f6f3ea] transition-transform duration-300 hover:-translate-y-0.5">
                {heroCtaLabel}<ArrowUpRight className="size-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </MotionReveal>
        </div>

        <div className="relative mx-auto flex w-full max-w-[1680px] items-center justify-between border-t border-white/15 px-6 py-5 text-[9px] uppercase tracking-[0.2em] text-white/42 sm:px-8 md:px-12 lg:px-16">
          <span>Origin Coffee Cambodia</span>
          <span className="hidden sm:block">Cambodian Market</span>
          <span>{index} / 03</span>
        </div>
      </section>

      <main className="mx-auto w-full max-w-[1680px] px-6 sm:px-8 md:px-12 lg:px-16">
        <section className="border-b border-white/15 py-16 lg:py-24" aria-labelledby={`${index}-highlights`}>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <MotionReveal direction="left" className="md:col-span-3">
              <p className={sectionLabelClass}>01 / Market Focus</p>
              <span className="mt-3 block h-px w-10 bg-[#a8542a]" aria-hidden="true" />
              <h2 id={`${index}-highlights`} className={sectionTitleClass}>{highlightTitle}</h2>
              <p className="mt-6 max-w-xs text-sm leading-7 text-white/64">{highlightIntro}</p>
            </MotionReveal>

            <div className="md:col-span-8 md:col-start-5">
              <div className="grid grid-cols-1 border-l border-t border-white/15 sm:grid-cols-2">
                {highlightCards.map((card, cardIndex) => (
                  <MotionReveal key={card.title} direction={cardIndex % 2 === 0 ? "left" : "right"}>
                    <article className="group min-h-[220px] border-b border-r border-white/15 p-6 transition-colors duration-300 hover:bg-[#3a4937] lg:min-h-[250px] lg:p-8">
                      <div className="flex items-start justify-between gap-4">
                        <span className="text-[9px] tracking-[0.2em] text-[#a8542a]">{String(cardIndex + 1).padStart(2, "0")}</span>
                        {card.meta ? <span className="text-[9px] uppercase tracking-[0.16em] text-white/42">{card.meta}</span> : null}
                      </div>
                      <h3 className="mt-12 font-[var(--font-display)] text-2xl font-normal leading-[1.05] tracking-[-0.025em] transition-transform duration-300 group-hover:translate-x-1">{card.title}</h3>
                      <p className="mt-4 max-w-sm text-sm leading-7 text-white/66">{card.text}</p>
                    </article>
                  </MotionReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/15 py-16 lg:py-24">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-8">
              {sections.map((section, sectionIndex) => (
                <MotionReveal key={section.title} direction={sectionIndex % 2 === 0 ? "left" : "right"}>
                  <article className="grid grid-cols-1 border-t border-white/15 py-12 md:grid-cols-8 md:gap-8 lg:py-16">
                    <div className="md:col-span-3">
                      <p className={sectionLabelClass}>{section.label}</p>
                      <span className="mt-3 block h-px w-10 bg-[#a8542a]" aria-hidden="true" />
                      <h2 className={sectionTitleClass}>{section.title}</h2>
                    </div>
                    <div className="mt-8 max-w-[34rem] text-[15px] leading-8 text-white/76 md:col-span-5 md:mt-0 [&_a]:border-b [&_a]:border-white/45 [&_a]:font-medium [&_a]:text-white [&_a]:transition-colors hover:[&_a]:border-[#a8542a]">
                      {section.content}
                    </div>
                  </article>
                </MotionReveal>
              ))}

              <MotionReveal>
                <div className="border-t border-white/15 py-10 lg:py-12">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/46">Related Paths</p>
                  <div className="mt-5 border-t border-white/15">
                    {relatedLinks.map((item) => (
                      <Link key={item.href} href={item.href} className="group flex items-start justify-between gap-5 border-b border-white/15 py-5 transition-colors hover:bg-[#3a4937]/70 sm:px-1">
                        <div className="max-w-[34rem]">
                          <p className="text-[15px] font-semibold leading-6 text-white">{item.title}</p>
                          <p className="mt-1.5 text-sm leading-6 text-white/58">{item.description}</p>
                        </div>
                        <ArrowUpRight className="mt-1 size-4 shrink-0 text-[#a8542a] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    ))}
                  </div>
                </div>
              </MotionReveal>
            </div>

            <MotionReveal direction="right" className="md:col-span-3 md:col-start-10">
              <aside className="sticky top-28 border-t border-white/15 bg-[#202820] px-6 py-7 text-[#f6f3ea] lg:px-7 lg:py-8">
                <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-white/45">Signature Development</p>
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

        <section className="border-b border-white/15 py-16 lg:py-24" aria-labelledby={`${index}-process`}>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <MotionReveal direction="left" className="md:col-span-3">
              <p className={sectionLabelClass}>02 / Process</p>
              <span className="mt-3 block h-px w-10 bg-[#a8542a]" aria-hidden="true" />
              <h2 id={`${index}-process`} className={sectionTitleClass}>{processTitle}</h2>
              <p className="mt-6 max-w-xs text-sm leading-7 text-white/64">{processIntro}</p>
            </MotionReveal>

            <div className="md:col-span-8 md:col-start-5">
              {processSteps.map((step, stepIndex) => (
                <MotionReveal key={step.title} direction={stepIndex % 2 === 0 ? "left" : "right"}>
                  <article className="grid grid-cols-[44px_1fr] gap-5 border-t border-white/15 py-7 last:border-b sm:grid-cols-[56px_1fr] lg:grid-cols-[64px_220px_1fr] lg:gap-8 lg:py-8">
                    <span className="pt-1 text-[9px] tracking-[0.2em] text-[#a8542a]">{String(stepIndex + 1).padStart(2, "0")}</span>
                    <h3 className="font-[var(--font-display)] text-xl font-normal leading-[1.1] tracking-[-0.02em] sm:text-2xl">{step.title}</h3>
                    <p className="col-start-2 mt-2 max-w-[34rem] text-sm leading-7 text-white/66 lg:col-start-3 lg:mt-0">{step.text}</p>
                  </article>
                </MotionReveal>
              ))}
            </div>
          </div>
        </section>

        <MotionReveal>
          <section className="border-b border-white/15 py-12 lg:py-16">
            <div className="grid grid-cols-1 gap-8 bg-[#202820] p-7 text-[#f6f3ea] sm:p-9 md:grid-cols-12 md:items-end lg:p-11">
              <div className="md:col-span-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">{darkEyebrow}</p>
                <h2 className="mt-5 max-w-[15ch] font-[var(--font-display)] text-[clamp(2rem,7vw,3rem)] font-normal leading-[0.98] tracking-[-0.035em]">{darkTitle}</h2>
                <p className="mt-6 max-w-[34rem] text-sm leading-7 text-white/66">{darkDescription}</p>
              </div>
              <div className="md:col-span-4 md:col-start-9 md:text-right">
                <Link href="/contact" className="group inline-flex items-center gap-2 border-b border-white/35 pb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:border-white">
                  {darkCta}<ArrowUpRight className="size-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </section>
        </MotionReveal>

        <section className="border-b border-white/15 py-16 lg:py-24" aria-labelledby={`${index}-support`}>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <MotionReveal direction="left" className="md:col-span-3">
              <p className={sectionLabelClass}>03 / Product System</p>
              <span className="mt-3 block h-px w-10 bg-[#a8542a]" aria-hidden="true" />
              <h2 id={`${index}-support`} className={sectionTitleClass}>{supportTitle}</h2>
            </MotionReveal>

            <div className="grid grid-cols-1 md:col-span-8 md:col-start-5 lg:grid-cols-2">
              {supportCards.map((card, cardIndex) => (
                <MotionReveal key={card.title} direction={cardIndex === 0 ? "left" : "right"}>
                  <article className={`flex min-h-[330px] flex-col border border-white/15 p-7 lg:min-h-[390px] lg:p-9 ${card.active ? "bg-[#202820] text-[#f6f3ea]" : "bg-transparent text-[#f3f1ea]"}`}>
                    <p className={`text-[9px] font-medium uppercase tracking-[0.22em] ${card.active ? "text-white/45" : "text-[#a8542a]"}`}>{card.eyebrow}</p>
                    <h3 className="mt-10 font-[var(--font-display)] text-3xl font-normal leading-[1] tracking-[-0.03em] sm:text-4xl">{card.title}</h3>
                    <p className={`mt-6 max-w-md text-sm leading-7 ${card.active ? "text-white/68" : "text-white/66"}`}>{card.description}</p>
                    <Link href={card.href} className={`group mt-auto inline-flex items-center gap-2 pt-10 text-[10px] font-semibold uppercase tracking-[0.16em] ${card.active ? "text-white" : "text-white"}`}>
                      {card.cta}<ArrowUpRight className="size-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </article>
                </MotionReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-white/15 py-16 lg:py-20" aria-labelledby={`${index}-faq-title`}>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className={sectionLabelClass}>04 / Reference</p>
              <span className="mt-3 block h-px w-10 bg-[#a8542a]" aria-hidden="true" />
              <h2 id={`${index}-faq-title`} className="mt-5 max-w-[13ch] font-[var(--font-display)] text-[clamp(2rem,7vw,2.8rem)] font-normal leading-[0.98] tracking-[-0.03em]">Program details,<br />kept clear.</h2>
            </div>
            <div className="md:col-span-8 md:col-start-5">
              {faqs.map(({ q, a }, faqIndex) => (
                <MotionReveal key={q}>
                  <div className="grid grid-cols-[38px_1fr] gap-4 border-t border-white/15 py-7 last:border-b sm:grid-cols-[54px_1fr]">
                    <span className="pt-1 text-[9px] tracking-[0.2em] text-white/38">{String(faqIndex + 1).padStart(2, "0")}</span>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-10">
                      <h3 className="font-[var(--font-sans)] text-base font-semibold leading-7 tracking-[-0.01em]">{q}</h3>
                      <div className="max-w-[34rem] text-sm leading-7 text-white/76">{a}</div>
                    </div>
                  </div>
                </MotionReveal>
              ))}
            </div>
          </div>
        </section>

        <MotionReveal>
          <section className="grid grid-cols-1 border-b border-white/15 py-16 md:grid-cols-12 md:items-end lg:py-20">
            <div className="md:col-span-3">
              <p className={sectionLabelClass}>Next Step</p>
              <span className="mt-3 block h-px w-10 bg-[#a8542a]" aria-hidden="true" />
            </div>
            <div className="mt-7 md:col-span-7 md:col-start-5 md:mt-0">
              <p className="max-w-[34rem] text-sm leading-7 text-white/60">{ctaDescription}</p>
              <Link href="/contact" className="group mt-8 inline-flex items-end gap-4 border-b border-white/25 pb-2 transition-colors hover:border-[#a8542a]">
                <span className="font-[var(--font-display)] text-3xl font-normal leading-none tracking-[-0.03em] transition-transform duration-300 group-hover:translate-x-2 sm:text-4xl">{ctaLabel}</span>
                <ArrowUpRight className="mb-1 size-5 text-[#a8542a] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </section>
        </MotionReveal>

        <footer className="flex flex-col gap-4 py-9 text-[9px] uppercase tracking-[0.19em] text-white/42 sm:flex-row sm:justify-between">
          <span>Origin Coffee Cambodia · OCC</span>
          <span>CAMBODIAN MARKET / {index}</span>
        </footer>
      </main>
    </div>
  )
}
