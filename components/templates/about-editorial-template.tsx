"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"

type AboutSection = {
  title: string
  href: string
  desc: string
}

type AboutEditorialTemplateProps = {
  sections: AboutSection[]
}

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const differences = [
  {
    title: "One origin",
    copy: "Every OCC coffee starts in Cambodia. We do not use neighboring origins to fill volume or blur the story. Cambodia is the product foundation, not a marketing label added later.",
  },
  {
    title: "Small batches",
    copy: "We would rather work with smaller, clearer batches than chase volume at the expense of origin identity, quality decisions, or buyer confidence.",
  },
  {
    title: "Origin clarity",
    copy: "Country, region, producer, processing, lot, and shipment claims become more specific only when the supporting evidence becomes more specific. Clear scope matters.",
  },
  {
    title: "Quality focus",
    copy: "Quality is evaluated through the coffee itself: processing, physical condition, sensory performance, roast application, consistency, and the requirements of the buyer.",
  },
  {
    title: "Cambodian Fine Robusta expertise",
    copy: "Fine Robusta is OCC’s specialist wedge. We treat Coffea canephora as a quality category with its own origin, processing, sensory, and roasting potential — not as a commodity stereotype.",
  },
]

const readyToSellPath = [
  "Cambodian coffee / Fine Robusta",
  "Wholesale coffee supply",
  "Supplier evaluation",
  "Distributor · Importer · Retailer · Hospitality",
  "Repeat supply",
]

const madeForYouPath = [
  "Cambodian coffee / Fine Robusta",
  "Custom roasting",
  "Target cup",
  "Roast profile development",
  "Repeatable production profile",
]

export function AboutEditorialTemplate({ sections }: AboutEditorialTemplateProps) {
  const reducedMotion = useReducedMotion()
  const reveal = (offset = 54) => ({
    initial: reducedMotion ? { opacity: 1 } : { opacity: 0, y: offset },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.18 },
    transition: { duration: reducedMotion ? 0.01 : 0.68, ease },
  })

  return (
    <div className="bg-[#f6f3ea] text-[#182019]">
      <section className="relative isolate min-h-[calc(100svh-80px)] overflow-hidden border-b border-black/10 pt-20">
        <div className="pointer-events-none absolute inset-0 hidden grid-cols-12 divide-x divide-black/[0.065] md:grid" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, index) => <div key={index} />)}
        </div>

        <div className="relative mx-auto grid min-h-[calc(100svh-80px)] w-full max-w-[1680px] grid-cols-1 content-center px-6 py-14 sm:px-8 md:grid-cols-12 md:px-12 lg:px-16 lg:py-20">
          <motion.div {...reveal(24)} className="md:col-span-3">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#a8542a]">Who We Are</p>
            <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.2em] text-black/38">Origin Coffee Cambodia · OCC</p>
          </motion.div>

          <motion.div {...reveal(34)} className="mt-10 md:col-span-8 md:col-start-5 md:mt-0">
            <h1 className="font-[var(--font-display)] text-[clamp(3.4rem,8vw,8rem)] font-normal leading-[0.86] tracking-[-0.045em]">
              One origin.
              <br />Cambodia.
            </h1>
            <p className="mt-10 max-w-[820px] text-[clamp(1.35rem,2.2vw,2.15rem)] font-medium leading-[1.24] tracking-[-0.02em] text-black/88">
              OCC is a 100% Cambodia-origin specialty coffee supplier and Fine Robusta specialist.
            </p>
            <p className="mt-7 max-w-[720px] text-[15px] leading-7 text-black/68 sm:text-base sm:leading-8">
              We work with Cambodian coffee in small batches, connecting origin, quality and roasting with the people and businesses bringing Cambodian coffee to new markets. Our role is to make the origin easier to understand, easier to evaluate, and easier to build into a repeatable commercial coffee program.
            </p>
            <Link href="#why-occ" className="mt-9 inline-flex items-center gap-2 border-b border-black/30 pb-1 text-[10px] font-medium uppercase tracking-[0.18em] transition-colors hover:border-black">
              Why OCC <ArrowUpRight className="size-3" />
            </Link>
          </motion.div>
        </div>

        <div className="relative mx-auto flex w-full max-w-[1680px] items-center justify-between border-t border-black/10 px-6 py-5 text-[9px] uppercase tracking-[0.2em] text-black/38 sm:px-8 md:px-12 lg:px-16">
          <span>100% Cambodia Origin</span>
          <span className="hidden sm:block">Fine Robusta Specialist</span>
          <span>01 / About</span>
        </div>
      </section>

      <main className="mx-auto w-full max-w-[1680px] px-6 sm:px-8 md:px-12 lg:px-16">
        <motion.section id="why-occ" {...reveal()} className="grid grid-cols-1 border-b border-black/10 py-20 md:grid-cols-12 lg:py-28">
          <div className="md:col-span-3">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-black/38">02 / Why OCC</p>
          </div>
          <div className="mt-8 md:col-span-8 md:col-start-5 md:mt-0">
            <h2 className="font-[var(--font-display)] text-[clamp(2.2rem,4vw,4.1rem)] font-normal leading-[0.98] tracking-[-0.03em]">
              A Cambodian coffee supplier
              <br />with one origin to protect.
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-8 border-t border-black/10 pt-8 lg:grid-cols-2 lg:gap-14">
              <p className="text-lg leading-8 text-black/84">
                OCC is not built around a long menu of unrelated services. It is built around one commercial idea: help Cambodian coffee travel further without losing the identity, evidence, and quality decisions that make the coffee worth choosing.
              </p>
              <p className="text-[15px] leading-7 text-black/68">
                That is why our positioning stays narrow. Cambodia is the origin. Fine Robusta is the specialist expertise. Wholesale coffee supply and custom roasting are the two main ways buyers work with us. Everything else should support those decisions rather than distract from them.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 border-t border-black/10 sm:grid-cols-2 xl:grid-cols-5">
              {differences.map((item, index) => (
                <div key={item.title} className={`py-7 sm:px-6 xl:px-5 ${index > 0 ? "border-t border-black/10 sm:border-t-0 sm:border-l" : ""} ${index === 2 ? "sm:border-l-0 xl:border-l" : ""} ${index >= 2 ? "sm:border-t xl:border-t-0" : ""}`}>
                  <p className="text-[9px] tracking-[0.2em] text-black/32">0{index + 1}</p>
                  <h3 className="mt-5 text-sm font-semibold leading-5">{item.title}</h3>
                  <p className="mt-3 text-[13px] leading-6 text-black/58">{item.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section {...reveal()} className="grid grid-cols-1 border-b border-black/10 py-20 md:grid-cols-12 lg:py-28">
          <div className="md:col-span-3">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-black/38">03 / What We Are Building</p>
          </div>
          <div className="mt-8 md:col-span-8 md:col-start-5 md:mt-0">
            <h2 className="font-[var(--font-display)] text-[clamp(2.4rem,4.8vw,5rem)] font-normal leading-[0.94] tracking-[-0.035em]">
              A Premium
              <br />Cambodian Coffee Brand
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-8 border-t border-black/10 pt-8 lg:grid-cols-2 lg:gap-14">
              <p className="text-lg leading-8 text-black/84">
                Cambodia is still a young coffee origin in the minds of many international buyers. People already have quick associations with coffee from Brazil, Ethiopia, Colombia, Vietnam, or Thailand. Cambodian coffee does not yet have that same level of global familiarity.
              </p>
              <div className="space-y-6 text-[15px] leading-7 text-black/68">
                <p>
                  OCC is building toward a different future: one in which Cambodian coffee can be recognized for its own origin identity, and Cambodian Fine Robusta can be evaluated for quality rather than reduced to old assumptions about Robusta.
                </p>
                <p>
                  That requires more than selling a bag of coffee. It requires origin clarity, credible quality language, better buyer information, repeatable roasting decisions, and a brand strong enough to carry Cambodia into new commercial conversations.
                </p>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-px border border-black/10 bg-black/10 sm:grid-cols-2">
              {[
                ["Origin first", "Cambodia remains visible from story to supply."],
                ["Quality made legible", "Processing, sensory, roast and evidence are explained in buyer language."],
                ["Commercially usable", "Profiles must work in real cafés, retail programs, hospitality, and distribution."],
                ["Built for recognition", "Each buyer relationship should increase familiarity with Cambodian coffee, not hide it."],
              ].map(([title, copy]) => (
                <div key={title} className="bg-[#f6f3ea] p-7 sm:p-8">
                  <h3 className="text-sm font-semibold">{title}</h3>
                  <p className="mt-3 max-w-md text-[13px] leading-6 text-black/58">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <section className="border-b border-black/10 py-20 lg:py-28" aria-labelledby="work-with-occ-title">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-black/38">04 / Work With OCC</p>
            </div>
            <div className="md:col-span-8 md:col-start-5">
              <motion.div {...reveal(34)}>
                <h2 id="work-with-occ-title" className="font-[var(--font-display)] text-[clamp(2.3rem,4.3vw,4.5rem)] font-normal leading-[0.96] tracking-[-0.03em]">
                  How would you like
                  <br />to work with OCC?
                </h2>
                <p className="mt-7 max-w-2xl text-[15px] leading-7 text-black/64">
                  For overseas buyers, most conversations belong to one of two paths. Choose a Cambodian coffee profile that is ready to evaluate and sell, or build a roasting profile around the cup, market, and application you need.
                </p>
              </motion.div>

              <div className="mt-12 grid grid-cols-1 gap-6 xl:grid-cols-2">
                <motion.article {...reveal(32)} className="flex h-full flex-col border border-black/12 p-7 sm:p-9">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#a8542a]">01 / Ready-to-Sell</p>
                    <span className="text-[9px] uppercase tracking-[0.18em] text-black/34">Choose our profile.</span>
                  </div>
                  <h3 className="mt-7 font-[var(--font-display)] text-4xl font-normal leading-none tracking-[-0.03em]">Ready-to-Sell</h3>
                  <p className="mt-5 text-sm leading-7 text-black/68">
                    For distributors, importers, retailers, hospitality groups, and coffee businesses looking for a Cambodian coffee supplier with a defined profile and a clearer route to repeat supply.
                  </p>
                  <div className="mt-8 border-y border-black/10 py-6">
                    {readyToSellPath.map((item, index) => (
                      <div key={item} className="flex gap-4 py-2.5 text-[12px] leading-5 text-black/64">
                        <span className="w-5 shrink-0 text-[9px] tracking-[0.14em] text-black/30">0{index + 1}</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-7 text-[13px] leading-6 text-black/58">
                    Start here when the main question is supply: what Cambodian coffee is available, how it tastes, how it is presented, whether it fits your channel, and whether the profile can support a longer commercial relationship.
                  </p>
                  <Link href="/solutions/wholesale" className="mt-auto pt-9 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.17em]">
                    Explore Wholesale Coffee Supply <ArrowUpRight className="size-3" />
                  </Link>
                </motion.article>

                <motion.article {...reveal(38)} className="flex h-full flex-col bg-[#182019] p-7 text-[#f6f3ea] sm:p-9">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#d99872]">02 / Made-for-You</p>
                    <span className="text-[9px] uppercase tracking-[0.18em] text-white/38">Build yours.</span>
                  </div>
                  <h3 className="mt-7 font-[var(--font-display)] text-4xl font-normal leading-none tracking-[-0.03em]">Made-for-You</h3>
                  <p className="mt-5 text-sm leading-7 text-white/68">
                    For buyers who already know the cup, menu, format, or market position they want and need custom roasting to turn that target into a repeatable production profile.
                  </p>
                  <div className="mt-8 border-y border-white/12 py-6">
                    {madeForYouPath.map((item, index) => (
                      <div key={item} className="flex gap-4 py-2.5 text-[12px] leading-5 text-white/64">
                        <span className="w-5 shrink-0 text-[9px] tracking-[0.14em] text-white/28">0{index + 1}</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-7 text-[13px] leading-6 text-white/55">
                    Start here when the main question is roasting: target cup, brewing application, roast direction, development feedback, production repeatability, and how Cambodian coffee should perform in your final product.
                  </p>
                  <Link href="/solutions/roasting-program" className="mt-auto pt-9 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.17em] text-white">
                    Explore Custom Roasting <ArrowUpRight className="size-3" />
                  </Link>
                </motion.article>
              </div>
            </div>
          </div>
        </section>

        <motion.section {...reveal()} className="grid grid-cols-1 border-b border-black/10 py-20 md:grid-cols-12 lg:py-28">
          <div className="md:col-span-3">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-black/38">05 / Buyer Clarity</p>
          </div>
          <div className="mt-8 md:col-span-8 md:col-start-5 md:mt-0">
            <h2 className="font-[var(--font-display)] text-[clamp(2.2rem,4vw,4rem)] font-normal leading-[0.98] tracking-[-0.03em]">
              From first evaluation
              <br />to repeat supply.
            </h2>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-black/80">
              International coffee buyers do not need more brand adjectives. They need enough clarity to decide whether a coffee, supplier, and production route fit the business they are building.
            </p>
            <div className="mt-10 grid grid-cols-1 border-y border-black/10 sm:grid-cols-3">
              {[
                ["Origin", "Where the coffee begins, what can be verified, and how specifically the origin can be described."],
                ["Quality", "How processing, sensory character, roast application, and consistency support the intended use."],
                ["Commercial fit", "What is available, how evaluation works, what needs to be confirmed, and what repeat supply would require."],
              ].map(([title, copy], index) => (
                <div key={title} className={`py-8 sm:px-7 ${index > 0 ? "border-t border-black/10 sm:border-l sm:border-t-0" : ""}`}>
                  <p className="text-[9px] tracking-[0.2em] text-black/30">0{index + 1}</p>
                  <h3 className="mt-5 text-base font-semibold">{title}</h3>
                  <p className="mt-3 text-[13px] leading-6 text-black/58">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section {...reveal()} className="grid grid-cols-1 border-b border-black/10 py-20 md:grid-cols-12 lg:py-28">
          <div className="md:col-span-3">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-black/38">06 / Where We Are Going</p>
          </div>
          <div className="mt-8 md:col-span-8 md:col-start-5 md:mt-0">
            <h2 className="font-[var(--font-display)] text-[clamp(2.4rem,4.8vw,5rem)] font-normal leading-[0.94] tracking-[-0.035em]">
              Cambodian coffee
              <br />for international markets.
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-8 border-t border-black/10 pt-8 lg:grid-cols-2 lg:gap-14">
              <p className="text-lg leading-8 text-black/84">
                OCC is building toward long-term relationships with international distributors, importers, retailers, and hospitality partners that want a clearer Cambodian coffee proposition — not a generic coffee with Cambodia added as decoration.
              </p>
              <div className="space-y-6 text-[15px] leading-7 text-black/68">
                <p>
                  The goal is repeat business built on fit: the right coffee, the right roast, the right channel, and a supply relationship that can become more precise as origin evidence and commercial requirements become more precise.
                </p>
                <p>
                  We are not trying to make Cambodia look like another famous origin. We are building the conditions for buyers to recognize Cambodian coffee, and especially Cambodian Fine Robusta, on its own terms.
                </p>
              </div>
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/solutions/wholesale" className="inline-flex items-center gap-2 rounded-full bg-[#182019] px-5 py-3 text-[10px] font-medium uppercase tracking-[0.16em] text-[#f6f3ea] transition-transform duration-200 hover:-translate-y-0.5">
                Discuss Supply <ArrowUpRight className="size-3" />
              </Link>
              <Link href="/solutions/roasting-program" className="inline-flex items-center gap-2 rounded-full border border-black/20 px-5 py-3 text-[10px] font-medium uppercase tracking-[0.16em] transition-colors hover:bg-white/60">
                Develop a Roast <ArrowUpRight className="size-3" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-black/20 px-5 py-3 text-[10px] font-medium uppercase tracking-[0.16em] transition-colors hover:bg-white/60">
                Contact OCC <ArrowUpRight className="size-3" />
              </Link>
            </div>
          </div>
        </motion.section>

        <section className="border-b border-black/10 py-20 lg:py-24" aria-labelledby="about-explore-title">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-black/38">07 / Explore OCC</p>
              <h2 id="about-explore-title" className="mt-5 font-[var(--font-display)] text-3xl font-normal leading-[1.02] tracking-[-0.02em] sm:text-4xl">
                The thinking
                <br />behind the company.
              </h2>
            </div>

            <div className="md:col-span-8 md:col-start-5">
              {sections.map((section, index) => (
                <motion.div key={section.href} {...reveal(38)}>
                  <Link href={section.href} className="group grid grid-cols-[38px_1fr_auto] items-end gap-4 border-t border-black/10 py-7 last:border-b sm:grid-cols-[54px_1fr_auto] sm:py-9">
                    <span className="pb-1 text-[9px] font-medium tracking-[0.2em] text-black/34">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="font-[var(--font-display)] text-2xl font-normal leading-none tracking-[-0.02em] transition-transform duration-300 group-hover:translate-x-2 sm:text-3xl">
                        {section.title}
                      </h3>
                      <p className="mt-3 max-w-xl text-[11px] uppercase tracking-[0.13em] text-black/42">{section.desc}</p>
                    </div>
                    <ArrowUpRight className="mb-1 size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <footer className="flex flex-col gap-5 py-10 text-[9px] uppercase tracking-[0.19em] text-black/38 sm:flex-row sm:items-end sm:justify-between">
          <span>Origin Coffee Cambodia · OCC</span>
          <span>One Origin · Fine Robusta · International Coffee Supply</span>
        </footer>
      </main>
    </div>
  )
}
