import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { MotionReveal } from "@/components/ui/motion-reveal"

type SolutionItem = {
  href: string
  tag: string
  title: string
  desc: string
}

type SolutionsIndexTemplateProps = {
  services: readonly SolutionItem[]
  localMarket: SolutionItem
}

export function SolutionsIndexTemplate({ services, localMarket }: SolutionsIndexTemplateProps) {
  return (
    <div className="bg-[#f6f3ea] text-[#182019]">
      <section className="relative overflow-hidden border-b border-black/10 pt-28 lg:pt-32">
        <div className="pointer-events-none absolute inset-0 hidden grid-cols-12 divide-x divide-black/[0.06] md:grid" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, index) => <div key={index} />)}
        </div>
        <div className="relative mx-auto grid w-full max-w-[1680px] grid-cols-1 items-end gap-10 px-6 pb-14 pt-6 sm:px-8 md:grid-cols-12 md:px-12 lg:px-16 lg:pb-16">
          <MotionReveal direction="left" className="md:col-span-3 md:pb-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#a8542a]">Sourcing · Roasted Supply · Roasting · Distribution</p>
            <span className="mt-3 block h-px w-10 bg-[#a8542a]" aria-hidden="true" />
            <p className="mt-6 max-w-xs text-[15px] leading-7 text-black/76">
              OCC starts with the commercial requirement, then defines what can be sourced, evaluated, roasted, supplied, or brought to market according to the actual project.
            </p>
          </MotionReveal>
          <MotionReveal className="md:col-span-7 md:col-start-4">
            <h1 className="font-[var(--font-display)] text-[clamp(3.4rem,6vw,5.6rem)] font-normal leading-[0.92] tracking-[-0.04em]">Solutions</h1>
          </MotionReveal>
          <MotionReveal direction="right" className="md:col-span-2 md:pb-3">
            <p className="border-t border-black/10 pt-5 text-[10px] uppercase leading-6 tracking-[0.18em] text-black/38">
              OCC / Cambodia<br />Supply · Development · Market
            </p>
          </MotionReveal>
        </div>
        <div className="relative mx-auto flex w-full max-w-[1680px] items-center justify-between border-t border-black/10 px-6 py-5 text-[9px] uppercase tracking-[0.2em] text-black/34 sm:px-8 md:px-12 lg:px-16">
          <span>Origin Coffee Cambodia</span>
          <span className="hidden sm:block">Four international commercial paths</span>
          <span>02 / Solutions</span>
        </div>
      </section>

      <main className="mx-auto w-full max-w-[1680px] px-6 sm:px-8 md:px-12 lg:px-16">
        <section className="border-b border-black/10 py-16 lg:py-24" aria-labelledby="solutions-programs-title">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a8542a]">01 / International Commercial Paths</p>
              <span className="mt-3 block h-px w-10 bg-[#a8542a]" aria-hidden="true" />
              <h2 id="solutions-programs-title" className="mt-5 max-w-[13ch] font-[var(--font-display)] text-[clamp(2.1rem,7.5vw,3.2rem)] font-normal leading-[0.98] tracking-[-0.035em]">
                From Requirement to a Workable Path
              </h2>
            </div>
            <div className="md:col-span-8 md:col-start-5">
              {services.map((service, index) => (
                <MotionReveal key={service.href} direction={index % 2 === 0 ? "left" : "right"}>
                  <Link href={service.href} className="group grid grid-cols-[42px_1fr_auto] items-end gap-4 border-t border-black/10 py-8 last:border-b sm:grid-cols-[56px_1fr_auto] lg:py-10">
                    <span className="pb-1 text-[9px] tracking-[0.2em] text-[#a8542a]">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#a8542a]">{service.tag}</p>
                      <h3 className="font-[var(--font-display)] text-2xl font-normal leading-none tracking-[-0.03em] transition-transform duration-300 group-hover:translate-x-2 sm:text-3xl">{service.title}</h3>
                      <p className="mt-4 max-w-xl text-sm leading-7 text-black/58">{service.desc}</p>
                    </div>
                    <ArrowUpRight className="mb-1 size-5 text-[#a8542a] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>
                </MotionReveal>
              ))}
            </div>
          </div>
        </section>

        <MotionReveal>
          <section className="grid grid-cols-1 border-b border-black/10 py-16 md:grid-cols-12 lg:py-20">
            <div className="md:col-span-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a8542a]">02 / Cambodia Local Market</p>
              <span className="mt-3 block h-px w-10 bg-[#a8542a]" aria-hidden="true" />
              <h2 className="mt-5 max-w-[13ch] font-[var(--font-display)] text-[clamp(2.1rem,7.5vw,3.2rem)] font-normal leading-[0.98] tracking-[-0.035em]">
                Build a Product Customers Remember
              </h2>
            </div>
            <div className="mt-8 md:col-span-8 md:col-start-5 md:mt-0">
              <Link href={localMarket.href} className="group grid grid-cols-[42px_1fr_auto] items-end gap-4 border-y border-black/10 py-8 sm:grid-cols-[56px_1fr_auto] lg:py-10">
                <span className="pb-1 text-[9px] tracking-[0.2em] text-[#a8542a]">LOCAL</span>
                <div>
                  <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#a8542a]">{localMarket.tag}</p>
                  <h3 className="font-[var(--font-display)] text-2xl font-normal leading-none tracking-[-0.03em] transition-transform duration-300 group-hover:translate-x-2 sm:text-3xl">{localMarket.title}</h3>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-black/58">{localMarket.desc}</p>
                </div>
                <ArrowUpRight className="mb-1 size-5 text-[#a8542a] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </section>
        </MotionReveal>

        <MotionReveal>
          <section className="grid grid-cols-1 border-b border-black/10 py-16 md:grid-cols-12 md:items-end lg:py-20">
            <div className="md:col-span-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a8542a]">03 / Start a Conversation</p>
              <span className="mt-3 block h-px w-10 bg-[#a8542a]" aria-hidden="true" />
              <h2 className="mt-5 max-w-[13ch] font-[var(--font-display)] text-[clamp(2.1rem,7.5vw,3.2rem)] font-normal leading-[0.98] tracking-[-0.035em]">
                You Do Not Need a Final PO to Begin
              </h2>
            </div>
            <div className="mt-8 md:col-span-6 md:col-start-7 md:mt-0">
              <p className="max-w-[34rem] text-[15px] leading-8 text-black/76">
                Share the market, intended use, coffee format, product idea, sourcing problem, or local café objective. OCC can then route the conversation through the right commercial or Cambodia-market path without presenting unverified inventory, capacity, or supply assumptions as facts.
              </p>
              <Link href="/contact" className="group mt-8 inline-flex items-end gap-4 border-b border-black/20 pb-2 transition-colors hover:border-[#a8542a]">
                <span className="font-[var(--font-display)] text-3xl font-normal leading-none tracking-[-0.03em] transition-transform duration-300 group-hover:translate-x-2 sm:text-4xl">Start a Conversation</span>
                <ArrowUpRight className="mb-1 size-5 text-[#a8542a] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </section>
        </MotionReveal>

        <footer className="flex flex-col gap-4 py-9 text-[9px] uppercase tracking-[0.19em] text-black/34 sm:flex-row sm:justify-between">
          <span>Origin Coffee Cambodia · OCC</span>
          <span>Solutions / Cambodia</span>
        </footer>
      </main>
    </div>
  )
}
