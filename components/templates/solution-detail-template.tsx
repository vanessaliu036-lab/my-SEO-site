import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { MotionReveal } from "@/components/ui/motion-reveal"

type SolutionSection = {
  title: string
  content: ReactNode
}

type FaqItem = {
  q: string
  a: ReactNode
}

type RelatedService = {
  title: string
  href: string
  desc: string
}

type SolutionDetailTemplateProps = {
  index: string
  title: string
  subtitle: string
  sections: SolutionSection[]
  factsTitle: string
  facts: string[]
  faqs: FaqItem[]
  relatedServices: RelatedService[]
  ctaLabel: string
}

export function SolutionDetailTemplate({
  index,
  title,
  subtitle,
  sections,
  factsTitle,
  facts,
  faqs,
  relatedServices,
  ctaLabel,
}: SolutionDetailTemplateProps) {
  return (
    <div className="bg-[#f6f3ea] text-[#182019]">
      <section className="relative overflow-hidden border-b border-black/10 pt-28 lg:pt-32">
        <div className="pointer-events-none absolute inset-0 hidden grid-cols-12 divide-x divide-black/[0.06] md:grid" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, item) => <div key={item} />)}
        </div>
        <div className="relative mx-auto grid min-h-[66svh] w-full max-w-[1680px] grid-cols-1 items-end gap-10 px-6 pb-16 sm:px-8 md:grid-cols-12 md:px-12 lg:px-16 lg:pb-20">
          <MotionReveal direction="left" className="md:col-span-3 md:pb-3">
            <Link href="/solutions" className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-black/42 transition-colors hover:text-black">
              <ArrowLeft className="size-3" /> Solutions
            </Link>
            <p className="mt-10 text-[10px] font-medium uppercase tracking-[0.24em] text-black/34">Solutions / {index}</p>
          </MotionReveal>
          <MotionReveal className="md:col-span-7 md:col-start-4">
            <h1 className="font-[var(--font-display)] text-[clamp(4.8rem,8vw,8.8rem)] font-normal leading-[0.8] tracking-[-0.06em]">{title}</h1>
          </MotionReveal>
          <MotionReveal direction="right" className="md:col-span-2 md:pb-3">
            <p className="border-t border-black/10 pt-5 text-[15px] leading-7 text-black/54">{subtitle}</p>
          </MotionReveal>
        </div>
        <div className="relative mx-auto flex w-full max-w-[1680px] items-center justify-between border-t border-black/10 px-6 py-5 text-[9px] uppercase tracking-[0.2em] text-black/34 sm:px-8 md:px-12 lg:px-16">
          <span>Origin Coffee Cambodia</span>
          <span className="hidden sm:block">B2B Coffee Infrastructure</span>
          <span>{index} / 04</span>
        </div>
      </section>

      <main className="mx-auto w-full max-w-[1680px] px-6 sm:px-8 md:px-12 lg:px-16">
        <section className="border-b border-black/10 py-16 lg:py-24">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-8">
              {sections.map((section, sectionIndex) => (
                <MotionReveal key={section.title} direction={sectionIndex % 2 === 0 ? "left" : "right"}>
                  <article className="grid grid-cols-1 border-t border-black/10 py-10 md:grid-cols-8 md:gap-8 lg:py-14">
                    <div className="md:col-span-3">
                      <p className="text-[9px] tracking-[0.2em] text-black/32">{String(sectionIndex + 1).padStart(2, "0")}</p>
                      <h2 className="mt-5 font-[var(--font-display)] text-4xl font-normal leading-[0.95] tracking-[-0.04em] sm:text-5xl">{section.title}</h2>
                    </div>
                    <div className="mt-7 text-[15px] leading-8 text-black/56 md:col-span-5 md:mt-0 [&_a]:border-b [&_a]:border-black/25 [&_a]:transition-colors hover:[&_a]:border-black">
                      {section.content}
                    </div>
                  </article>
                </MotionReveal>
              ))}
            </div>

            <MotionReveal direction="right" className="md:col-span-3 md:col-start-10">
              <aside className="sticky top-28 border-t border-black/10 bg-[#202820] px-6 py-7 text-[#f6f3ea] lg:px-7 lg:py-8">
                <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-white/45">{factsTitle}</p>
                <div className="mt-7">
                  {facts.map((fact, factIndex) => (
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

        <section className="border-b border-black/10 py-16 lg:py-20" aria-labelledby={`${index}-faq-title`}>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-black/35">FAQ</p>
              <h2 id={`${index}-faq-title`} className="mt-5 font-[var(--font-display)] text-4xl font-normal leading-none tracking-[-0.04em] sm:text-5xl">Questions,<br />answered.</h2>
            </div>
            <div className="md:col-span-8 md:col-start-5">
              {faqs.map(({ q, a }, faqIndex) => (
                <MotionReveal key={q}>
                  <div className="grid grid-cols-[38px_1fr] gap-4 border-t border-black/10 py-7 last:border-b sm:grid-cols-[54px_1fr]">
                    <span className="pt-1 text-[9px] tracking-[0.2em] text-black/32">{String(faqIndex + 1).padStart(2, "0")}</span>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-10">
                      <h3 className="text-base font-medium leading-7">{q}</h3>
                      <div className="text-sm leading-7 text-black/50 [&_a]:border-b [&_a]:border-black/25">{a}</div>
                    </div>
                  </div>
                </MotionReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-black/10 py-16 lg:py-20" aria-labelledby={`${index}-related-title`}>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-black/35">Related</p>
              <h2 id={`${index}-related-title`} className="mt-5 font-[var(--font-display)] text-4xl font-normal leading-none tracking-[-0.04em] sm:text-5xl">You may<br />also need.</h2>
            </div>
            <div className="md:col-span-8 md:col-start-5">
              {relatedServices.map((service, serviceIndex) => (
                <MotionReveal key={service.href} direction={serviceIndex % 2 === 0 ? "left" : "right"}>
                  <Link href={service.href} className="group grid grid-cols-[38px_1fr_auto] items-end gap-4 border-t border-black/10 py-7 last:border-b sm:grid-cols-[54px_1fr_auto]">
                    <span className="pb-1 text-[9px] tracking-[0.2em] text-black/32">{String(serviceIndex + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="font-[var(--font-display)] text-3xl font-normal tracking-[-0.035em] transition-transform duration-300 group-hover:translate-x-2 sm:text-4xl">{service.title}</h3>
                      <p className="mt-2 text-[11px] uppercase tracking-[0.13em] text-black/40">{service.desc}</p>
                    </div>
                    <ArrowUpRight className="mb-1 size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>
                </MotionReveal>
              ))}
            </div>
          </div>
        </section>

        <MotionReveal>
          <section className="grid grid-cols-1 border-b border-black/10 py-14 md:grid-cols-12 md:items-end lg:py-18">
            <div className="md:col-span-3">
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-black/35">Next step</p>
            </div>
            <div className="mt-6 md:col-span-7 md:col-start-5 md:mt-0">
              <Link href="/contact" className="group inline-flex items-end gap-4">
                <span className="font-[var(--font-display)] text-5xl font-normal leading-none tracking-[-0.045em] transition-transform duration-300 group-hover:translate-x-2 sm:text-6xl">{ctaLabel}</span>
                <ArrowUpRight className="mb-1 size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </section>
        </MotionReveal>

        <footer className="flex flex-col gap-4 py-9 text-[9px] uppercase tracking-[0.19em] text-black/34 sm:flex-row sm:justify-between">
          <span>Origin Coffee Cambodia · OCC</span>
          <span>Solutions / {index}</span>
        </footer>
      </main>
    </div>
  )
}
