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

type RelatedLink = {
  title: string
  description: string
  href: string
}

type NextPath = {
  eyebrow: string
  title: string
  description: string
  href: string
  cta: string
}

type HeroSecondaryCta = {
  label: string
  href: string
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
  heroSecondaryCta?: HeroSecondaryCta
  highlightTitle: string
  highlightIntro: string
  highlightCards: HighlightCard[]
  sections: CommercialSection[]
  relatedLinksTitle: string
  relatedLinks: RelatedLink[]
  processTitle: string
  processIntro: string
  processSteps: ProcessStep[]
  sidebarLabel: string
  sidebarFacts: string[]
  nextPath: NextPath
  comparisonTitle: string
  comparison: readonly [ComparisonPath, ComparisonPath]
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
  heroSecondaryCta,
  highlightTitle,
  highlightIntro,
  highlightCards,
  sections,
  relatedLinksTitle,
  relatedLinks,
  processTitle,
  processIntro,
  processSteps,
  sidebarLabel,
  sidebarFacts,
  nextPath,
  comparisonTitle,
  comparison,
  faqs,
  ctaLabel,
  ctaDescription,
}: CommercialSolutionTemplateProps) {
  const sectionLabelClass = "text-[11px] font-semibold uppercase tracking-[0.22em] text-occ-secondary"
  const sectionTitleClass = "mt-5 max-w-[13ch] font-[var(--font-display)] text-[clamp(2.1rem,7.5vw,3.2rem)] font-normal leading-[0.98] tracking-[-0.035em] text-occ-primary"

  return (
    <div className="bg-occ-background text-occ-primary">
      <section className="relative overflow-hidden border-b border-black/10 pt-28 lg:pt-32">
        <div className="pointer-events-none absolute inset-0 hidden grid-cols-12 divide-x divide-black/[0.055] md:grid" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, item) => <div key={item} />)}
        </div>

        <div className="relative mx-auto w-full max-w-[1360px] px-6 pb-14 pt-6 sm:px-8 md:px-12 lg:px-16 lg:pb-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
            <MotionReveal direction="left" className="md:col-span-3 md:pb-2">
              <Link href="/solutions" className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-black/42 transition-colors hover:text-black">
                <ArrowLeft className="size-3" /> Solutions
              </Link>
              <p className="mt-10 text-[10px] font-medium uppercase tracking-[0.24em] text-occ-secondary">{pathLabel}</p>
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
              <p className="font-[var(--font-display)] text-[clamp(2.25rem,8vw,3.7rem)] font-normal leading-[0.98] tracking-[-0.04em]">{heroStatement}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 md:col-span-5 md:col-start-9 md:justify-end">
              <Link href="/contact" className="group inline-flex items-center gap-2 rounded-full bg-occ-primary px-5 py-3 text-[10px] font-medium uppercase tracking-[0.16em] text-occ-background transition-transform duration-300 hover:-translate-y-0.5">
                {heroCtaLabel}<ArrowUpRight className="size-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              {heroSecondaryCta ? (
                <Link href={heroSecondaryCta.href} className="group inline-flex items-center gap-2 rounded-full border border-occ-primary/20 px-5 py-3 text-[10px] font-medium uppercase tracking-[0.16em] text-occ-primary transition-colors hover:border-occ-primary hover:bg-occ-background">
                  {heroSecondaryCta.label}<ArrowUpRight className="size-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              ) : null}
            </div>
          </MotionReveal>
        </div>

        <div className="relative mx-auto flex w-full max-w-[1360px] items-center justify-between border-t border-black/10 px-6 py-5 text-[9px] uppercase tracking-[0.2em] text-black/34 sm:px-8 md:px-12 lg:px-16">
          <span>Origin Coffee Cambodia</span>
          <span className="hidden sm:block">Commercial Coffee Solutions</span>
          <span>{index} / 02</span>
        </div>
      </section>

      <main className="mx-auto w-full max-w-[1360px] px-6 sm:px-8 md:px-12 lg:px-16">
        <section className="border-b border-black/10 py-16 lg:py-24" aria-labelledby={`${index}-highlights`}>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <MotionReveal direction="left" className="md:col-span-3">
              <p className={sectionLabelClass}>01 / Commercial Focus</p>
              <span className="mt-3 block w-10 h-px bg-occ-secondary" aria-hidden="true" />
              <h2 id={`${index}-highlights`} className={sectionTitleClass}>{highlightTitle}</h2>
              <p className="mt-6 max-w-xs text-sm leading-7 text-black/62">{highlightIntro}</p>
            </MotionReveal>

            <div className="md:col-span-9 md:col-start-4">
              <div className="grid grid-cols-1 border-l border-t border-black/10 sm:grid-cols-2">
                {highlightCards.map((card, cardIndex) => (
                  <MotionReveal key={card.title} direction={cardIndex % 2 === 0 ? "left" : "right"}>
                    <article className="group min-h-[220px] border-b border-r border-black/10 p-6 transition-colors duration-300 hover:bg-occ-background lg:min-h-[250px] lg:p-8">
                      <div className="flex items-start justify-between gap-4">
                        <span className="text-[9px] tracking-[0.2em] text-occ-secondary">{String(cardIndex + 1).padStart(2, "0")}</span>
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
                  <article className="grid grid-cols-1 border-t border-black/10 py-12 md:grid-cols-8 md:gap-8 lg:py-16">
                    <div className="md:col-span-3">
                      <p className={sectionLabelClass}>{section.label}</p>
                      <span className="mt-3 block w-10 h-px bg-occ-secondary" aria-hidden="true" />
                      <h2 className={sectionTitleClass}>{section.title}</h2>
                    </div>
                    <div className="mt-8 max-w-[34rem] text-[15px] leading-8 text-black/76 md:col-span-5 md:mt-0 [&_a]:border-b [&_a]:border-occ-primary/45 [&_a]:font-medium [&_a]:text-occ-primary [&_a]:transition-colors hover:[&_a]:border-occ-secondary">
                      {section.content}
                    </div>
                  </article>
                </MotionReveal>
              ))}

              <MotionReveal>
                <div className="border-t border-black/10 py-10 lg:py-12">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40">{relatedLinksTitle}</p>
                  <div className="mt-5 border-t border-black/10">
                    {relatedLinks.map((item) => (
                      <Link key={item.href} href={item.href} className="group flex items-start justify-between gap-5 border-b border-black/10 py-5 transition-colors hover:bg-occ-background/70 sm:px-1">
                        <div className="max-w-[34rem]">
                          <p className="text-[15px] font-semibold leading-6 text-occ-primary">{item.title}</p>
                          <p className="mt-1.5 text-sm leading-6 text-black/56">{item.description}</p>
                        </div>
                        <ArrowUpRight className="mt-1 size-4 shrink-0 text-occ-secondary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    ))}
                  </div>
                </div>
              </MotionReveal>
            </div>

            <MotionReveal direction="right" className="md:col-span-3 md:col-start-10">
              <aside className="sticky top-28 border-t border-black/10 bg-occ-primary px-6 py-7 text-occ-background lg:px-7 lg:py-8">
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
              <p className={sectionLabelClass}>02 / Process</p>
              <span className="mt-3 block w-10 h-px bg-occ-secondary" aria-hidden="true" />
              <h2 id={`${index}-process`} className={sectionTitleClass}>{processTitle}</h2>
              <p className="mt-6 max-w-xs text-sm leading-7 text-black/62">{processIntro}</p>
            </MotionReveal>

            <div className="md:col-span-9 md:col-start-4">
              {processSteps.map((step, stepIndex) => (
                <MotionReveal key={step.title} direction={stepIndex % 2 === 0 ? "left" : "right"}>
                  <article className="grid grid-cols-[44px_1fr] gap-5 border-t border-black/10 py-7 last:border-b sm:grid-cols-[56px_1fr] lg:grid-cols-[64px_220px_1fr] lg:gap-8 lg:py-8">
                    <span className="pt-1 text-[9px] tracking-[0.2em] text-occ-secondary">{String(stepIndex + 1).padStart(2, "0")}</span>
                    <h3 className="font-[var(--font-display)] text-xl font-normal leading-[1.1] tracking-[-0.02em] sm:text-2xl">{step.title}</h3>
                    <p className="col-start-2 mt-2 max-w-[34rem] text-sm leading-7 text-black/64 lg:col-start-3 lg:mt-0">{step.text}</p>
                  </article>
                </MotionReveal>
              ))}
            </div>
          </div>
        </section>

        <MotionReveal>
          <section className="border-b border-black/10 py-12 lg:py-16">
            <div className="grid grid-cols-1 gap-8 bg-occ-primary p-7 text-occ-background sm:p-9 md:grid-cols-12 md:items-end lg:p-11">
              <div className="md:col-span-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">{nextPath.eyebrow}</p>
                <h2 className="mt-5 max-w-[15ch] font-[var(--font-display)] text-[clamp(2rem,7vw,3rem)] font-normal leading-[0.98] tracking-[-0.035em]">{nextPath.title}</h2>
                <p className="mt-6 max-w-[34rem] text-sm leading-7 text-white/66">{nextPath.description}</p>
              </div>
              <div className="md:col-span-4 md:col-start-9 md:text-right">
                <Link href={nextPath.href} className="group inline-flex items-center gap-2 border-b border-white/35 pb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:border-white">
                  {nextPath.cta}<ArrowUpRight className="size-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </section>
        </MotionReveal>

        <section className="border-b border-black/10 py-16 lg:py-24" aria-labelledby={`${index}-comparison`}>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <MotionReveal direction="left" className="md:col-span-3">
              <p className={sectionLabelClass}>03 / Two Commercial Paths</p>
              <span className="mt-3 block w-10 h-px bg-occ-secondary" aria-hidden="true" />
              <h2 id={`${index}-comparison`} className={sectionTitleClass}>{comparisonTitle}</h2>
            </MotionReveal>

            <div className="grid grid-cols-1 md:col-span-9 md:col-start-4 lg:grid-cols-2">
              {comparison.map((path, pathIndex) => (
                <MotionReveal key={path.title} direction={pathIndex === 0 ? "left" : "right"}>
                  <article className={`flex min-h-[330px] flex-col border border-black/10 p-7 lg:min-h-[390px] lg:p-9 ${path.active ? "bg-occ-primary text-occ-background" : "bg-transparent text-occ-primary"}`}>
                    <p className={`text-[9px] font-medium uppercase tracking-[0.22em] ${path.active ? "text-white/45" : "text-occ-secondary"}`}>{path.eyebrow}</p>
                    <h3 className="mt-10 font-[var(--font-display)] text-3xl font-normal leading-[1] tracking-[-0.03em] sm:text-4xl">{path.title}</h3>
                    <p className={`mt-6 max-w-md text-sm leading-7 ${path.active ? "text-white/68" : "text-black/64"}`}>{path.description}</p>
                    <Link href={path.href} className={`group mt-auto inline-flex items-center gap-2 pt-10 text-[10px] font-semibold uppercase tracking-[0.16em] ${path.active ? "text-white" : "text-black"}`}>
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
              <p className={sectionLabelClass}>04 / Reference</p>
              <span className="mt-3 block w-10 h-px bg-occ-secondary" aria-hidden="true" />
              <h2 id={`${index}-faq-title`} className="mt-5 max-w-[13ch] font-[var(--font-display)] text-[clamp(2rem,7vw,2.8rem)] font-normal leading-[0.98] tracking-[-0.03em]">Commercial details,<br />kept explicit.</h2>
            </div>
            <div className="md:col-span-9 md:col-start-4">
              {faqs.map(({ q, a }, faqIndex) => (
                <MotionReveal key={q}>
                  <div className="grid grid-cols-[38px_1fr] gap-4 border-t border-black/10 py-7 last:border-b sm:grid-cols-[54px_1fr]">
                    <span className="pt-1 text-[9px] tracking-[0.2em] text-black/32">{String(faqIndex + 1).padStart(2, "0")}</span>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-10">
                      <h3 className="font-[var(--font-sans)] text-base font-semibold leading-7 tracking-[-0.01em]">{q}</h3>
                      <div className="max-w-[34rem] text-sm leading-7 text-black/76 [&_a]:border-b [&_a]:border-black/35">{a}</div>
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
              <p className={sectionLabelClass}>Next Step</p>
              <span className="mt-3 block w-10 h-px bg-occ-secondary" aria-hidden="true" />
            </div>
            <div className="mt-7 md:col-span-7 md:col-start-5 md:mt-0">
              <p className="max-w-[34rem] text-sm leading-7 text-black/58">{ctaDescription}</p>
              <Link href="/contact" className="group mt-8 inline-flex items-end gap-4 border-b border-black/20 pb-2 transition-colors hover:border-occ-secondary">
                <span className="font-[var(--font-display)] text-3xl font-normal leading-none tracking-[-0.03em] transition-transform duration-300 group-hover:translate-x-2 sm:text-4xl">{ctaLabel}</span>
                <ArrowUpRight className="mb-1 size-5 text-occ-secondary transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
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
