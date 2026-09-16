import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
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

type WholesaleEditorialTemplateProps = {
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

const eyebrowClass = "text-[10px] font-medium uppercase tracking-[0.28em] text-black/48"
const displayTitleClass = "font-[var(--font-display)] font-normal tracking-[-0.045em] text-[#182019]"

export function WholesaleEditorialTemplate({
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
}: WholesaleEditorialTemplateProps) {
  const leadSection = sections[0]
  const supportingSections = sections.slice(1)

  return (
    <div data-wholesale-layout="reference-editorial" className="bg-[#f3f1ea] text-[#182019]">
      <div className="mx-auto w-full max-w-[1680px] px-5 py-8 sm:px-8 md:px-12 lg:px-16 lg:py-12">
        <section className="grid grid-cols-1 gap-10 border-b border-black/10 pb-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:pb-20" aria-labelledby="wholesale-title">
          <MotionReveal direction="left" className="flex flex-col justify-center py-2 lg:py-8">
            <div className="flex items-center gap-4">
              <span className={eyebrowClass}>{pathLabel}</span>
              <span className="h-px w-10 bg-black/18" aria-hidden="true" />
              <span className="text-[9px] uppercase tracking-[0.22em] text-black/32">Solutions / {index}</span>
            </div>
            <h1 id="wholesale-title" className={`${displayTitleClass} mt-6 max-w-[720px] text-[clamp(3.8rem,7.2vw,7rem)] leading-[0.88]`}>
              {title}
            </h1>
            <p className="mt-8 max-w-[650px] font-[var(--font-display)] text-[clamp(1.8rem,3vw,2.6rem)] font-normal leading-[1.08] tracking-[-0.03em] text-black/86">
              {heroStatement}
            </p>
            <p className="mt-6 max-w-[640px] text-[15px] leading-8 text-black/60 sm:text-base">{subtitle}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/contact" className="group inline-flex items-center gap-3 rounded-full bg-[#182019] px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#f6f3ea] transition-transform hover:-translate-y-0.5">
                {heroCtaLabel}<ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link href="#commercial-focus" className="group inline-flex items-center gap-3 rounded-full border border-black/18 px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#182019] transition-colors hover:bg-white/60">
                Explore Supply<ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </MotionReveal>

          <MotionReveal direction="right" className="relative min-h-[430px] overflow-hidden bg-[#e8e3d9] sm:min-h-[520px] lg:min-h-[650px]">
            <img src="/hero-home.webp" alt="Cambodia-origin coffee prepared for professional wholesale supply" className="h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-white/25 bg-[#182019]/58 px-5 py-4 text-[9px] uppercase tracking-[0.2em] text-white/72 backdrop-blur-[2px] sm:px-7">
              <span>Origin Coffee Cambodia</span>
              <span>Wholesale / {index}</span>
            </div>
          </MotionReveal>
        </section>

        <section id="commercial-focus" className="border-b border-black/10 py-16 lg:py-20" aria-labelledby="commercial-focus-title">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
            <MotionReveal direction="left">
              <p className={eyebrowClass}>Commercial Focus</p>
              <h2 id="commercial-focus-title" className={`${displayTitleClass} mt-5 max-w-[620px] text-[clamp(2.8rem,5.5vw,5rem)] leading-[0.94]`}>{highlightTitle}</h2>
            </MotionReveal>
            <MotionReveal direction="right">
              <p className="max-w-[720px] text-[15px] leading-8 text-black/60 sm:text-base">{highlightIntro}</p>
            </MotionReveal>
          </div>

          <div className="mt-10 grid grid-cols-1 border-l border-t border-black/12 sm:grid-cols-2 xl:grid-cols-4">
            {highlightCards.map((card, cardIndex) => (
              <MotionReveal key={card.title} direction={cardIndex % 2 === 0 ? "left" : "right"}>
                <article className="flex min-h-[250px] h-full flex-col justify-between border-b border-r border-black/12 p-6 transition-colors hover:bg-white/45 lg:p-7">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-[9px] tracking-[0.2em] text-black/35">{String(cardIndex + 1).padStart(2, "0")}</span>
                      {card.meta ? <span className="text-right text-[9px] uppercase tracking-[0.16em] text-black/34">{card.meta}</span> : null}
                    </div>
                    <h3 className={`${displayTitleClass} mt-10 text-3xl leading-none`}>{card.title}</h3>
                    <p className="mt-5 text-sm leading-7 text-black/58">{card.text}</p>
                  </div>
                </article>
              </MotionReveal>
            ))}
          </div>
        </section>

        {leadSection ? (
          <section className="grid grid-cols-1 gap-10 border-b border-black/10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-20" aria-labelledby="wholesale-market-path">
            <MotionReveal direction="left" className="relative min-h-[430px] overflow-hidden bg-[#e8e3d9] lg:min-h-[620px]">
              <img src="/about/about-origin.svg" alt="Cambodian coffee origin and supply context" className="h-full w-full object-cover" />
            </MotionReveal>
            <MotionReveal direction="right" className="flex flex-col justify-center">
              <p className={eyebrowClass}>{leadSection.label}</p>
              <h2 id="wholesale-market-path" className={`${displayTitleClass} mt-5 max-w-[620px] text-[clamp(2.8rem,5.4vw,4.8rem)] leading-[0.94]`}>{leadSection.title}</h2>
              <div className="mt-7 max-w-[680px] text-[15px] leading-8 text-black/65 [&_a]:border-b [&_a]:border-black/35 [&_a]:font-medium [&_a]:transition-colors hover:[&_a]:border-black">
                {leadSection.content}
              </div>

              {supportingSections.length ? (
                <div className="mt-10 grid grid-cols-1 border-l border-t border-black/12 sm:grid-cols-2">
                  {supportingSections.map((section) => (
                    <article key={section.title} className="border-b border-r border-black/12 p-6 sm:min-h-[245px]">
                      <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-black/38">{section.label}</p>
                      <h3 className={`${displayTitleClass} mt-4 text-[1.75rem] leading-[1.02]`}>{section.title}</h3>
                      <div className="mt-4 text-[13px] leading-6 text-black/58 [&_p+_p]:mt-3 [&_a]:border-b [&_a]:border-black/30 [&_a]:font-medium">
                        {section.content}
                      </div>
                    </article>
                  ))}
                </div>
              ) : null}
            </MotionReveal>
          </section>
        ) : null}

        <section className="border-b border-black/10 py-16 lg:py-20" aria-labelledby="wholesale-process-title">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.02fr_0.78fr] lg:items-stretch lg:gap-14">
            <MotionReveal direction="left" className="flex flex-col justify-center py-2">
              <p className={eyebrowClass}>Evidence Standard</p>
              <h2 id="wholesale-process-title" className={`${displayTitleClass} mt-5 max-w-[760px] text-[clamp(2.9rem,5.7vw,5.1rem)] leading-[0.94]`}>{processTitle}</h2>
              <p className="mt-6 max-w-[720px] text-[15px] leading-8 text-black/60 sm:text-base">{processIntro}</p>
            </MotionReveal>
            <MotionReveal direction="right" className="min-h-[320px] overflow-hidden bg-[#e8e3d9] sm:min-h-[390px]">
              <img src="/about/about-fine-robusta.svg" alt="Coffee evaluation supporting OCC wholesale qualification" className="h-full w-full object-cover" />
            </MotionReveal>
          </div>

          <div className="mt-10 grid grid-cols-1 border-l border-t border-black/12 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step, stepIndex) => (
              <MotionReveal key={step.title} direction={stepIndex % 2 === 0 ? "left" : "right"}>
                <article className="flex min-h-[205px] h-full flex-col justify-between border-b border-r border-black/12 p-6">
                  <span className="text-[9px] uppercase tracking-[0.18em] text-black/34">{String(stepIndex + 1).padStart(2, "0")} / Evidence</span>
                  <div>
                    <h3 className={`${displayTitleClass} text-[1.85rem] leading-none`}>{step.title}</h3>
                    <p className="mt-4 text-sm leading-6 text-black/58">{step.text}</p>
                  </div>
                </article>
              </MotionReveal>
            ))}
          </div>
        </section>

        <section className="border-b border-black/10 py-16 lg:py-20" aria-labelledby="commercial-requirements-title">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
            <MotionReveal direction="left" className="lg:sticky lg:top-28 lg:self-start">
              <p className={eyebrowClass}>{sidebarLabel}</p>
              <h2 id="commercial-requirements-title" className={`${displayTitleClass} mt-5 max-w-[560px] text-[clamp(2.8rem,5vw,4.7rem)] leading-[0.94]`}>{comparisonTitle}</h2>
              <p className="mt-6 max-w-[520px] text-[15px] leading-8 text-black/60">{ctaDescription}</p>
              <Link href="/contact" className="group mt-8 inline-flex items-center gap-3 rounded-full border border-black/18 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors hover:bg-white/60">
                {ctaLabel}<ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </MotionReveal>

            <MotionReveal direction="right">
              <dl className="border-t border-black/12">
                {sidebarFacts.map((fact, factIndex) => (
                  <div key={fact} className="grid grid-cols-[120px_1fr] gap-5 border-b border-black/12 py-6 sm:grid-cols-[180px_1fr] sm:gap-8">
                    <dt className="text-[10px] uppercase tracking-[0.16em] text-black/38">Requirement {String(factIndex + 1).padStart(2, "0")}</dt>
                    <dd className="m-0 text-[15px] leading-7 text-black/68">{fact}</dd>
                  </div>
                ))}
              </dl>
            </MotionReveal>
          </div>
        </section>

        <section className="border-b border-black/10 py-16 lg:py-20" aria-labelledby="comparison-title">
          <MotionReveal>
            <p className={eyebrowClass}>Two Commercial Paths</p>
            <h2 id="comparison-title" className={`${displayTitleClass} mt-5 max-w-[760px] text-[clamp(2.8rem,5vw,4.7rem)] leading-[0.94]`}>{comparisonTitle}</h2>
          </MotionReveal>
          <div className="mt-10 grid grid-cols-1 border-l border-t border-black/12 lg:grid-cols-2">
            {comparison.map((item, itemIndex) => (
              <MotionReveal key={item.title} direction={itemIndex === 0 ? "left" : "right"}>
                <article className={`flex min-h-[330px] h-full flex-col justify-between border-b border-r p-7 sm:p-9 ${item.active ? "border-[#2f3b2d] bg-[#2f3b2d] text-[#f3f1ea]" : "border-black/12 bg-white/24 text-[#182019]"}`}>
                  <div>
                    <p className={`text-[9px] font-medium uppercase tracking-[0.2em] ${item.active ? "text-white/48" : "text-black/38"}`}>{item.eyebrow}</p>
                    <h3 className={`mt-5 font-[var(--font-display)] text-[2.6rem] font-normal leading-none tracking-[-0.035em] ${item.active ? "text-white" : "text-[#182019]"}`}>{item.title}</h3>
                    <p className={`mt-6 max-w-[560px] text-[15px] leading-7 ${item.active ? "text-white/66" : "text-black/60"}`}>{item.description}</p>
                  </div>
                  <Link href={item.href} className={`group mt-8 inline-flex w-fit items-center gap-2 border-b pb-1 text-[10px] font-semibold uppercase tracking-[0.15em] ${item.active ? "border-white/35 text-white" : "border-black/30 text-[#182019]"}`}>
                    {item.cta}<ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </article>
              </MotionReveal>
            ))}
          </div>
        </section>

        <MotionReveal>
          <section className="my-12 grid grid-cols-1 gap-8 bg-[#2f3b2d] p-7 text-[#f3f1ea] sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end lg:p-12">
            <div>
              <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-white/46">{nextPath.eyebrow}</p>
              <h2 className="mt-4 max-w-[800px] font-[var(--font-display)] text-[clamp(2.5rem,4.6vw,4.4rem)] font-normal leading-[0.95] tracking-[-0.04em] text-white">{nextPath.title}</h2>
              <p className="mt-5 max-w-[760px] text-[15px] leading-7 text-white/64">{nextPath.description}</p>
            </div>
            <Link href={nextPath.href} className="group inline-flex items-center gap-3 rounded-full border border-white/32 px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-[#2f3b2d]">
              {nextPath.cta}<ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </section>
        </MotionReveal>

        <section className="grid grid-cols-1 gap-12 border-t border-black/10 py-16 lg:grid-cols-[0.86fr_1.14fr] lg:gap-16 lg:py-20">
          <MotionReveal direction="left">
            <p className={eyebrowClass}>{relatedLinksTitle}</p>
            <div className="mt-6 border-t border-black/12">
              {relatedLinks.map((item) => (
                <Link key={item.href} href={item.href} className="group flex items-start justify-between gap-6 border-b border-black/12 py-5">
                  <div>
                    <h3 className={`${displayTitleClass} text-2xl leading-none`}>{item.title}</h3>
                    <p className="mt-2 max-w-[520px] text-sm leading-6 text-black/55">{item.description}</p>
                  </div>
                  <ArrowUpRight className="mt-1 size-4 shrink-0 text-black/44 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              ))}
            </div>
          </MotionReveal>

          <MotionReveal direction="right">
            <p className={eyebrowClass}>FAQ</p>
            <div className="mt-6 border-t border-black/12">
              {faqs.map((item, faqIndex) => (
                <article key={item.q} className="grid grid-cols-[38px_1fr] gap-4 border-b border-black/12 py-6 sm:grid-cols-[48px_1fr]">
                  <span className="pt-1 text-[9px] tracking-[0.18em] text-black/34">{String(faqIndex + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className={`${displayTitleClass} text-[1.65rem] leading-[1.05]`}>{item.q}</h3>
                    <div className="mt-4 text-sm leading-7 text-black/60">{item.a}</div>
                  </div>
                </article>
              ))}
            </div>
          </MotionReveal>
        </section>

        <MotionReveal>
          <section className="mb-8 grid grid-cols-1 gap-8 border border-black/12 bg-[#ece7dd] p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:p-12">
            <div>
              <p className={eyebrowClass}>B2B Partnerships</p>
              <h2 className={`${displayTitleClass} mt-4 max-w-[820px] text-[clamp(2.5rem,4.5vw,4.3rem)] leading-[0.96]`}>{ctaLabel}</h2>
              <p className="mt-5 max-w-[760px] text-[15px] leading-7 text-black/58">{ctaDescription}</p>
            </div>
            <Link href="/contact" className="group inline-flex items-center justify-center gap-3 rounded-full border border-black/20 bg-[#f6f3ea] px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#182019] transition-transform hover:-translate-y-0.5">
              Contact OCC<ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </section>
        </MotionReveal>
      </div>
    </div>
  )
}
