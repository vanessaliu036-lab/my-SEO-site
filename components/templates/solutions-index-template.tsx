import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { MotionReveal } from "@/components/ui/motion-reveal"

type SolutionItem = {
  href: string
  title: string
  desc: string
}

type SolutionsIndexTemplateProps = {
  services: readonly SolutionItem[]
}

export function SolutionsIndexTemplate({ services }: SolutionsIndexTemplateProps) {
  return (
    <div className="bg-[#f6f3ea] text-[#182019]">
      <section className="relative overflow-hidden border-b border-black/10 pt-28 lg:pt-32">
        <div className="pointer-events-none absolute inset-0 hidden grid-cols-12 divide-x divide-black/[0.06] md:grid" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, index) => <div key={index} />)}
        </div>
        <div className="relative mx-auto grid w-full max-w-[1680px] grid-cols-1 items-end gap-10 px-6 pb-14 pt-6 sm:px-8 md:grid-cols-12 md:px-12 lg:px-16 lg:pb-16">
          <MotionReveal direction="left" className="md:col-span-3 md:pb-2">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-black/36">Supply · Craft · People · Uptime</p>
            <p className="mt-6 max-w-xs text-[15px] leading-7 text-black/76">
              Four programs built for operators who need supply, craft, people, and uptime in one ecosystem.
            </p>
          </MotionReveal>
          <MotionReveal className="md:col-span-7 md:col-start-4">
            <h1 className="font-[var(--font-display)] text-[clamp(3.4rem,6vw,5.6rem)] font-normal leading-[0.92] tracking-[-0.04em]">
              Solutions
            </h1>
          </MotionReveal>
          <MotionReveal direction="right" className="md:col-span-2 md:pb-3">
            <p className="border-t border-black/10 pt-5 text-[10px] uppercase leading-6 tracking-[0.18em] text-black/38">
              OCC / Cambodia<br />B2B Coffee Infrastructure
            </p>
          </MotionReveal>
        </div>
        <div className="relative mx-auto flex w-full max-w-[1680px] items-center justify-between border-t border-black/10 px-6 py-5 text-[9px] uppercase tracking-[0.2em] text-black/34 sm:px-8 md:px-12 lg:px-16">
          <span>Origin Coffee Cambodia</span>
          <span className="hidden sm:block">Four connected programs</span>
          <span>02 / Solutions</span>
        </div>
      </section>

      <main className="mx-auto w-full max-w-[1680px] px-6 sm:px-8 md:px-12 lg:px-16">
        <section className="border-b border-black/10 py-16 lg:py-24" aria-labelledby="solutions-programs-title">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-black/35">01 / Programs</p>
              <h2 id="solutions-programs-title" className="mt-5 font-[var(--font-display)] text-3xl font-normal leading-[1.02] tracking-[-0.03em] sm:text-4xl">
                One operating
                <br />ecosystem.
              </h2>
            </div>
            <div className="md:col-span-8 md:col-start-5">
              {services.map((service, index) => (
                <MotionReveal key={service.href} direction={index % 2 === 0 ? "left" : "right"}>
                  <Link href={service.href} className="group grid grid-cols-[42px_1fr_auto] items-end gap-4 border-t border-black/10 py-8 last:border-b sm:grid-cols-[56px_1fr_auto] lg:py-10">
                    <span className="pb-1 text-[9px] tracking-[0.2em] text-[#a8542a]">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="font-[var(--font-display)] text-2xl font-normal leading-none tracking-[-0.03em] transition-transform duration-300 group-hover:translate-x-2 sm:text-3xl">
                        {service.title}
                      </h3>
                      <p className="mt-3 max-w-xl text-[11px] uppercase leading-6 tracking-[0.13em] text-black/50">{service.desc}</p>
                    </div>
                    <ArrowUpRight className="mb-1 size-5 text-[#a8542a] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>
                </MotionReveal>
              ))}
            </div>
          </div>
        </section>

        <MotionReveal>
          <section className="grid grid-cols-1 border-b border-black/10 py-16 md:grid-cols-12 md:items-end lg:py-20">
            <div className="md:col-span-4">
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-black/35">02 / Start a conversation</p>
              <h2 className="mt-5 font-[var(--font-display)] text-3xl font-normal leading-[1.02] tracking-[-0.03em] sm:text-4xl">
                Build the right
                <br />service stack.
              </h2>
            </div>
            <div className="mt-8 md:col-span-6 md:col-start-7 md:mt-0">
              <p className="max-w-xl text-[15px] leading-8 text-black/76">
                Start with one service or combine supply, roasting, staffing, and equipment support around your operation.
              </p>
              <Link href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#182019] px-5 py-3 text-[10px] font-medium uppercase tracking-[0.16em] text-[#f6f3ea] transition-transform duration-200 hover:-translate-y-0.5">
                Request a quote <ArrowUpRight className="size-3" />
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
