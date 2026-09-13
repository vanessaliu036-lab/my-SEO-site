import Link from "next/link"
import type { Metadata } from "next"
import { ArrowUpRight } from "lucide-react"
import { MotionReveal } from "@/components/ui/motion-reveal"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Cambodia Coffee Origins | Regions, Terroir & Fine Robusta | OCC",
  description:
    "Explore Cambodia coffee origins through regional geography, Mondulkiri highlands, farm terroir, traceability, lot identity, and Fine Robusta from OCC.",
  keywords:
    "Cambodia coffee origin, Cambodia coffee origins, Cambodian coffee origin, Cambodia coffee regions, Cambodia coffee highlands, Mondulkiri coffee, Cambodian coffee terroir, coffee traceability Cambodia, Fine Robusta Cambodia",
  alternates: pageAlternates("/origins"),
  openGraph: {
    title: "Cambodia Coffee Origins | OCC",
    description:
      "A structured guide to Cambodia coffee geography, farm terroir, traceability, lot identity, and Fine Robusta.",
    url: `${siteUrl}/origins`,
    type: "website",
  },
}

const originPaths = [
  {
    index: "01",
    title: "Cambodia & Regions",
    eyebrow: "Where",
    href: "/origins/cambodia-regions",
    text: "Country, northeastern highlands, Mondulkiri, Ratanakiri, and the regional geography behind Cambodia-grown coffee.",
  },
  {
    index: "02",
    title: "Farm & Terroir",
    eyebrow: "How It Grows",
    href: "/origins/farm-terroir",
    text: "Elevation, soil, climate, shade, water, plant material, farm management, and cherry maturity at farm scale.",
  },
  {
    index: "03",
    title: "Fine Robusta Cambodia",
    eyebrow: "How Quality Is Defined",
    href: "/fine-robusta-cambodia",
    text: "OCC’s quality specialization in Cambodian Canephora: processing, physical condition, sensory evidence, traceability, and repeatability.",
  },
]

const traceabilitySteps = [
  "Country",
  "Region",
  "Producer / Processor",
  "Farm or Source Boundary",
  "Harvest",
  "Process",
  "Lot",
  "Sample",
  "Shipment",
]

export default function OriginsPage() {
  return (
    <main className="min-h-screen bg-[#f6f3ea] text-[#182019]">
      <section className="relative overflow-hidden border-b border-black/10 pt-28 lg:pt-32">
        <div className="pointer-events-none absolute inset-0 hidden grid-cols-12 divide-x divide-black/[0.055] md:grid" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, item) => <div key={item} />)}
        </div>

        <div className="relative mx-auto w-full max-w-[1680px] px-6 pb-14 pt-6 sm:px-8 md:px-12 lg:px-16 lg:pb-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
            <MotionReveal direction="left" className="md:col-span-3 md:pb-2">
              <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#a8542a]">CAMBODIA ORIGIN SYSTEM</p>
              <p className="mt-3 text-[9px] uppercase tracking-[0.2em] text-black/34">Cambodia / OCC</p>
            </MotionReveal>

            <MotionReveal className="md:col-span-6 md:col-start-4">
              <h1 className="font-[var(--font-display)] text-[clamp(3rem,5.4vw,5rem)] font-normal leading-[0.94] tracking-[-0.04em]">
                CAMBODIA COFFEE ORIGINS
              </h1>
            </MotionReveal>

            <MotionReveal direction="right" className="md:col-span-3 md:col-start-10 md:pb-2">
              <p className="border-t border-black/10 pt-5 text-[15px] leading-7 text-black/76">
                A structured guide to where Cambodian coffee grows, how farm conditions shape it, how origin remains identifiable, and how OCC defines Fine Robusta quality.
              </p>
            </MotionReveal>
          </div>

          <MotionReveal className="mt-16 grid grid-cols-1 gap-8 border-t border-black/10 pt-10 md:mt-20 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7 md:col-start-4">
              <p className="font-[var(--font-display)] text-[clamp(2.25rem,8vw,3.7rem)] font-normal leading-[0.98] tracking-[-0.04em]">
                Origin becomes more useful as geography, farm conditions, evidence, and quality stay connected.
              </p>
            </div>
          </MotionReveal>
        </div>
      </section>

      <div className="mx-auto w-full max-w-[1680px] px-6 sm:px-8 md:px-12 lg:px-16">
        <section className="border-b border-black/10 py-16 lg:py-24">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <MotionReveal direction="left" className="md:col-span-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a8542a]">01 / Origin Structure</p>
              <span className="mt-3 block h-px w-10 bg-[#a8542a]" aria-hidden="true" />
              <h2 className="mt-5 max-w-[13ch] font-[var(--font-display)] text-[clamp(2.1rem,7.5vw,3.2rem)] font-normal leading-[0.98] tracking-[-0.035em]">
                Three Layers, One Origin System
              </h2>
              <p className="mt-6 max-w-xs text-sm leading-7 text-black/62">
                Each layer answers a different origin question: where the coffee grows, how the growing environment works, and how Fine Robusta quality is evaluated.
              </p>
            </MotionReveal>

            <div className="md:col-span-8 md:col-start-5">
              <div className="grid grid-cols-1 border-l border-t border-black/10 lg:grid-cols-3">
                {originPaths.map((item, index) => (
                  <MotionReveal key={item.title} direction={index % 2 === 0 ? "left" : "right"}>
                    <Link href={item.href} className="group block h-full border-b border-r border-black/10 p-6 transition-colors hover:bg-[#eee8dc] lg:min-h-[310px] lg:p-8">
                      <div className="flex items-start justify-between gap-4">
                        <span className="text-[9px] tracking-[0.2em] text-[#a8542a]">{item.index}</span>
                        <span className="text-[9px] uppercase tracking-[0.16em] text-black/35">{item.eyebrow}</span>
                      </div>
                      <h3 className="mt-12 font-[var(--font-display)] text-3xl font-normal leading-[1.02] tracking-[-0.03em]">{item.title}</h3>
                      <p className="mt-5 text-sm leading-7 text-black/64">{item.text}</p>
                      <span className="mt-8 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#182019]">
                        Explore <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </Link>
                  </MotionReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-black/10 py-16 lg:py-24">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <MotionReveal direction="left" className="md:col-span-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a8542a]">02 / Definition</p>
              <span className="mt-3 block h-px w-10 bg-[#a8542a]" aria-hidden="true" />
              <h2 className="mt-5 max-w-[13ch] font-[var(--font-display)] text-[clamp(2.1rem,7.5vw,3.2rem)] font-normal leading-[0.98] tracking-[-0.035em]">
                What Origin Means at OCC
              </h2>
            </MotionReveal>

            <MotionReveal direction="right" className="md:col-span-8 md:col-start-5">
              <div className="max-w-[42rem] space-y-6 text-[15px] leading-8 text-black/76">
                <p>
                  Origin is not simply a country name printed on a coffee bag. It is the chain of evidence that connects a coffee to a real place and keeps that identity understandable as the coffee moves through evaluation and commercial use.
                </p>
                <p>
                  OCC begins with one non-negotiable boundary: the coffee itself starts in Cambodia. From there, the origin can become more specific through region, producer or processor, farm or source boundary, harvest, processing, lot identity, sample, and shipment.
                </p>
                <div className="border-l-2 border-[#a8542a] bg-[#eee8dc]/65 px-5 py-5 sm:px-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a8542a]">Origin principle</p>
                  <p className="mt-3 font-[var(--font-display)] text-2xl leading-[1.12] tracking-[-0.025em]">
                    The more specific the claim, the stronger the evidence must become.
                  </p>
                </div>
              </div>
            </MotionReveal>
          </div>
        </section>

        <section className="border-b border-black/10 py-16 lg:py-24">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <MotionReveal direction="left" className="md:col-span-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a8542a]">03 / Traceability</p>
              <span className="mt-3 block h-px w-10 bg-[#a8542a]" aria-hidden="true" />
              <h2 className="mt-5 max-w-[13ch] font-[var(--font-display)] text-[clamp(2.1rem,7.5vw,3.2rem)] font-normal leading-[0.98] tracking-[-0.035em]">
                Keep the Coffee Identifiable
              </h2>
              <p className="mt-6 max-w-xs text-sm leading-7 text-black/62">
                Traceability, source boundary, and lot identity belong inside the main Origin Hub so the coffee stays connected to the place and evidence that define it.
              </p>
            </MotionReveal>

            <MotionReveal direction="right" className="md:col-span-8 md:col-start-5">
              <div className="max-w-[42rem] space-y-6 text-[15px] leading-8 text-black/76">
                <p>
                  Traceability is useful when the coffee can remain identifiable from the origin claim through sampling and commercial evaluation. A country claim should not automatically become a farm claim, and a region name should not automatically become a lot identity.
                </p>
                <div className="grid grid-cols-1 border-l border-t border-black/10 sm:grid-cols-3">
                  {traceabilitySteps.map((step, index) => (
                    <div key={step} className="border-b border-r border-black/10 p-4">
                      <span className="text-[9px] tracking-[0.18em] text-[#a8542a]">{String(index + 1).padStart(2, "0")}</span>
                      <p className="mt-3 text-sm leading-6 text-black/68">{step}</p>
                    </div>
                  ))}
                </div>
                <p>
                  Missing fields remain unclaimed until verified. OCC prefers an open field to artificial precision.
                </p>
              </div>
            </MotionReveal>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="grid grid-cols-1 gap-8 bg-[#202820] p-7 text-[#f6f3ea] sm:p-9 md:grid-cols-12 md:items-end lg:p-11">
            <div className="md:col-span-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">Explore the Origin</p>
              <h2 className="mt-5 max-w-[14ch] font-[var(--font-display)] text-[clamp(2rem,7vw,3rem)] font-normal leading-[0.98] tracking-[-0.035em]">
                Start With Geography. Then Move Closer to the Coffee.
              </h2>
              <p className="mt-6 max-w-[34rem] text-sm leading-7 text-white/66">
                Cambodia & Regions establishes where the coffee comes from. Farm & Terroir explains how the growing environment works. Fine Robusta Cambodia defines OCC’s quality specialization.
              </p>
            </div>
            <div className="md:col-span-4 md:col-start-9 md:text-right">
              <Link href="/origins/cambodia-regions" className="group inline-flex items-center gap-2 border-b border-white/35 pb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:border-white">
                Explore Cambodia & Regions <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
