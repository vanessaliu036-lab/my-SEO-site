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
const atlas = "/about/occ-about-atlas.avif"

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

const galleryPanels = [
  { label: "ONE ORIGIN", position: 0 },
  { label: "FINE ROBUSTA", position: 33.333 },
  { label: "READY-TO-SELL", position: 66.667 },
  { label: "MADE-FOR-YOU", position: 100 },
]

export function AboutEditorialTemplate({ sections }: AboutEditorialTemplateProps) {
  const reducedMotion = useReducedMotion()
  const reveal = (offset = 48) => ({
    initial: reducedMotion ? { opacity: 1 } : { opacity: 0, y: offset },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.18 },
    transition: { duration: reducedMotion ? 0.01 : 0.68, ease },
  })

  return (
    <div className="bg-[#f3f1ea] text-[#182019]">
      <section className="relative overflow-hidden bg-[#5c6f58] text-[#f3f1ea]">
        <div className="relative aspect-[16/9] overflow-hidden">
          <img src={atlas} alt="" aria-hidden="true" className="absolute inset-x-0 top-0 h-auto w-full max-w-none" />
          <div className="absolute inset-0 bg-[#2f3b2d]/48" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#2f3b2d]/15 via-transparent to-[#2f3b2d]/55" />
        </div>

        <div className="relative px-6 py-14 sm:px-8 md:absolute md:inset-0 md:flex md:items-center md:justify-center md:px-12 md:py-16 lg:px-16">
          <motion.div {...reveal(28)} className="mx-auto w-full max-w-[920px] text-left md:text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-white/80">Who We Are · Origin Coffee Cambodia</p>
            <h1 aria-label="One origin. Cambodia." className="mt-7 font-[var(--font-display)] text-[clamp(3.4rem,8vw,7.5rem)] font-normal leading-[0.86] tracking-[-0.045em] text-white">
              One origin.
              <br />Cambodia.
            </h1>
            <p className="mx-0 mt-8 max-w-[820px] text-[clamp(1.15rem,2vw,1.8rem)] font-medium leading-[1.28] tracking-[-0.02em] text-white md:mx-auto">
              OCC is a 100% Cambodia-origin specialty coffee supplier and Fine Robusta specialist.
            </p>
            <p className="mx-0 mt-6 max-w-[680px] text-sm leading-7 text-white/82 sm:text-[15px] md:mx-auto">
              We work with Cambodian coffee in small batches, connecting origin, quality and roasting with the people and businesses bringing Cambodian coffee to new markets. Our role is to make the origin easier to understand, easier to evaluate, and easier to build into a repeatable commercial coffee program.
            </p>
            <Link href="#why-occ" className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/55 bg-[#2f3b2d]/20 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-[#2f3b2d]">
              Why OCC <ArrowUpRight className="size-3" />
            </Link>
          </motion.div>
        </div>

        <div className="relative flex items-center justify-between border-t border-white/20 px-6 py-5 text-[9px] uppercase tracking-[0.2em] text-white/62 sm:px-8 md:px-12 lg:px-16">
          <span>100% Cambodia Origin</span>
          <span className="hidden sm:block">Fine Robusta Specialist</span>
          <span>01 / About</span>
        </div>
      </section>

      <section id="why-occ" className="relative overflow-hidden bg-[#5c6f58] px-6 py-20 text-[#f3f1ea] sm:px-8 md:px-12 lg:px-16 lg:py-28">
        <div data-about-ghost="origin" aria-hidden="true" className="pointer-events-none absolute -left-3 top-20 font-[var(--font-display)] text-[clamp(6rem,14vw,13rem)] font-semibold leading-none tracking-[-0.06em] text-white/[0.08]">origin</div>
        <div data-about-ghost="coffee" aria-hidden="true" className="pointer-events-none absolute -right-8 bottom-8 font-[var(--font-display)] text-[clamp(6rem,14vw,13rem)] font-semibold leading-none tracking-[-0.06em] text-white/[0.08]">coffee</div>

        <div className="relative mx-auto w-full max-w-[1480px]">
          <motion.div {...reveal()} className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6 lg:pr-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-white/58">02 / Why OCC</p>
              <h2 className="mt-6 font-[var(--font-display)] text-[clamp(2.5rem,5vw,5rem)] font-normal leading-[0.94] tracking-[-0.035em] text-white">
                A Cambodian coffee supplier
                <br />with one origin to protect.
              </h2>
              <div className="mt-9 max-w-2xl space-y-6 border-t border-white/20 pt-8">
                <p className="text-lg leading-8 text-white/90">
                  OCC is not built around a long menu of unrelated services. It is built around one commercial idea: help Cambodian coffee travel further without losing the identity, evidence, and quality decisions that make the coffee worth choosing.
                </p>
                <p className="text-[15px] leading-7 text-white/72">
                  That is why our positioning stays narrow. Cambodia is the origin. Fine Robusta is the specialist expertise. Wholesale coffee supply and custom roasting are the two main ways buyers work with us. Everything else should support those decisions rather than distract from them.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <div
                className="aspect-[2/3] overflow-hidden border border-white/15 bg-[#2f3b2d] bg-no-repeat shadow-[0_24px_60px_rgba(22,31,20,0.22)]"
                style={{ backgroundImage: `url(${atlas})`, backgroundSize: "400% auto", backgroundPosition: "0% 100%" }}
                role="img"
                aria-label="Coffee harvest at origin"
              />
            </div>
          </motion.div>

          <div className="relative mt-16 grid grid-cols-1 border-y border-white/20 sm:grid-cols-2 xl:grid-cols-5">
            {differences.map((item, index) => (
              <motion.div key={item.title} {...reveal(24)} className={`py-7 sm:px-6 xl:px-5 ${index > 0 ? "border-t border-white/15 sm:border-l sm:border-t-0" : ""} ${index === 2 ? "sm:border-l-0 xl:border-l" : ""} ${index >= 2 ? "sm:border-t xl:border-t-0" : ""}`}>
                <p className="text-[9px] tracking-[0.2em] text-white/38">0{index + 1}</p>
                <h3 className="mt-5 text-sm font-semibold leading-5 text-white">{item.title}</h3>
                <p className="mt-3 text-[13px] leading-6 text-white/62">{item.copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 bg-[#2f3b2d] lg:grid-cols-4" aria-label="OCC origin and commercial paths">
        {galleryPanels.map((panel) => (
          <div key={panel.label} className="group relative aspect-[2/3] overflow-hidden border-r border-white/20 border-b border-white/20 bg-no-repeat lg:border-b-0" style={{ backgroundImage: `url(${atlas})`, backgroundSize: "400% auto", backgroundPosition: `${panel.position}% 100%` }}>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#2f3b2d]/60 transition-colors duration-500 group-hover:bg-[#2f3b2d]/15" />
            <span className="absolute bottom-6 left-5 z-10 rotate-180 text-[9px] font-semibold uppercase tracking-[0.32em] text-white [writing-mode:vertical-rl] sm:bottom-8 sm:left-6">{panel.label}</span>
          </div>
        ))}
      </section>

      <main className="bg-[#f3f1ea]">
        <motion.section {...reveal()} className="mx-auto grid w-full max-w-[1480px] grid-cols-1 border-b border-black/10 px-6 py-20 sm:px-8 md:grid-cols-12 md:px-12 lg:px-16 lg:py-28">
          <div className="md:col-span-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#5c6f58]">03 / What We Are Building</p>
          </div>
          <div className="mt-8 md:col-span-8 md:col-start-5 md:mt-0">
            <h2 aria-label="A Premium Cambodian Coffee Brand" className="font-[var(--font-display)] text-[clamp(2.6rem,5vw,5.2rem)] font-normal leading-[0.92] tracking-[-0.04em] text-[#2f3b2d]">
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
                <div key={title} className="bg-[#f3f1ea] p-7 sm:p-8">
                  <h3 className="text-sm font-semibold text-[#2f3b2d]">{title}</h3>
                  <p className="mt-3 max-w-md text-[13px] leading-6 text-black/58">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <section className="mx-auto w-full max-w-[1480px] border-b border-black/10 px-6 py-20 sm:px-8 md:px-12 lg:px-16 lg:py-28" aria-labelledby="work-with-occ-title">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#5c6f58]">04 / Work With OCC</p>
            </div>
            <div className="md:col-span-8 md:col-start-5">
              <motion.div {...reveal(34)}>
                <h2 id="work-with-occ-title" aria-label="How would you like to work with OCC?" className="font-[var(--font-display)] text-[clamp(2.5rem,4.6vw,4.8rem)] font-normal leading-[0.94] tracking-[-0.035em] text-[#2f3b2d]">
                  How would you like
                  <br />to work with OCC?
                </h2>
                <p className="mt-7 max-w-2xl text-[15px] leading-7 text-black/64">
                  For overseas buyers, most conversations belong to one of two paths. Choose a Cambodian coffee profile that is ready to evaluate and sell, or build a roasting profile around the cup, market, and application you need.
                </p>
              </motion.div>

              <div className="mt-12 grid grid-cols-1 gap-6 xl:grid-cols-2">
                <motion.article {...reveal(32)} className="flex h-full flex-col border border-[#5c6f58]/30 bg-white/25 p-7 sm:p-9">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#5c6f58]">01 / Ready-to-Sell</p>
                    <span className="text-[9px] uppercase tracking-[0.18em] text-black/34">Choose our profile.</span>
                  </div>
                  <h3 className="mt-7 font-[var(--font-display)] text-4xl font-normal leading-none tracking-[-0.03em] text-[#2f3b2d]">Ready-to-Sell</h3>
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
                  <Link href="/solutions/wholesale" className="mt-auto inline-flex items-center gap-2 pt-9 text-[10px] font-semibold uppercase tracking-[0.17em] text-[#2f3b2d]">
                    Explore Wholesale Coffee Supply <ArrowUpRight className="size-3" />
                  </Link>
                </motion.article>

                <motion.article {...reveal(38)} className="flex h-full flex-col bg-[#2f3b2d] p-7 text-[#f3f1ea] sm:p-9">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/70">02 / Made-for-You</p>
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
                  <Link href="/solutions/roasting-program" className="mt-auto inline-flex items-center gap-2 pt-9 text-[10px] font-semibold uppercase tracking-[0.17em] text-white">
                    Explore Custom Roasting <ArrowUpRight className="size-3" />
                  </Link>
                </motion.article>
              </div>
            </div>
          </div>
        </section>

        <motion.section {...reveal()} className="bg-[#2f3b2d] px-6 py-20 text-[#f3f1ea] sm:px-8 md:px-12 lg:px-16 lg:py-28">
          <div className="mx-auto grid w-full max-w-[1352px] grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/48">05 / Buyer Clarity</p>
            </div>
            <div className="mt-8 md:col-span-8 md:col-start-5 md:mt-0">
              <h2 className="font-[var(--font-display)] text-[clamp(2.5rem,4.6vw,4.8rem)] font-normal leading-[0.94] tracking-[-0.035em] text-white">
                From first evaluation
                <br />to repeat supply.
              </h2>
              <p className="mt-8 max-w-3xl text-lg leading-8 text-white/78">
                International coffee buyers do not need more brand adjectives. They need enough clarity to decide whether a coffee, supplier, and production route fit the business they are building.
              </p>
              <div className="mt-10 grid grid-cols-1 border-y border-white/18 sm:grid-cols-3">
                {[
                  ["Origin", "Where the coffee begins, what can be verified, and how specifically the origin can be described."],
                  ["Quality", "How processing, sensory character, roast application, and consistency support the intended use."],
                  ["Commercial fit", "What is available, how evaluation works, what needs to be confirmed, and what repeat supply would require."],
                ].map(([title, copy], index) => (
                  <div key={title} className={`py-8 sm:px-7 ${index > 0 ? "border-t border-white/15 sm:border-l sm:border-t-0" : ""}`}>
                    <p className="text-[9px] tracking-[0.2em] text-white/32">0{index + 1}</p>
                    <h3 className="mt-5 text-base font-semibold text-white">{title}</h3>
                    <p className="mt-3 text-[13px] leading-6 text-white/58">{copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section {...reveal()} className="bg-[#5c6f58] px-6 py-20 text-[#f3f1ea] sm:px-8 md:px-12 lg:px-16 lg:py-28">
          <div className="mx-auto grid w-full max-w-[1352px] grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/50">06 / Where We Are Going</p>
            </div>
            <div className="mt-8 md:col-span-8 md:col-start-5 md:mt-0">
              <h2 className="font-[var(--font-display)] text-[clamp(2.6rem,5vw,5.2rem)] font-normal leading-[0.92] tracking-[-0.04em] text-white">
                Cambodian coffee
                <br />for international markets.
              </h2>
              <div className="mt-10 grid grid-cols-1 gap-8 border-t border-white/20 pt-8 lg:grid-cols-2 lg:gap-14">
                <p className="text-lg leading-8 text-white/88">
                  OCC is building toward long-term relationships with international distributors, importers, retailers, and hospitality partners that want a clearer Cambodian coffee proposition — not a generic coffee with Cambodia added as decoration.
                </p>
                <div className="space-y-6 text-[15px] leading-7 text-white/68">
                  <p>
                    The goal is repeat business built on fit: the right coffee, the right roast, the right channel, and a supply relationship that can become more precise as origin evidence and commercial requirements become more precise.
                  </p>
                  <p>
                    We are not trying to make Cambodia look like another famous origin. We are building the conditions for buyers to recognize Cambodian coffee, and especially Cambodian Fine Robusta, on its own terms.
                  </p>
                </div>
              </div>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/solutions/wholesale" className="inline-flex items-center gap-2 rounded-full bg-[#f3f1ea] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#2f3b2d] transition-transform duration-200 hover:-translate-y-0.5">
                  Discuss Supply <ArrowUpRight className="size-3" />
                </Link>
                <Link href="/solutions/roasting-program" className="inline-flex items-center gap-2 rounded-full border border-white/35 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-[#2f3b2d]">
                  Develop a Roast <ArrowUpRight className="size-3" />
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/35 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-[#2f3b2d]">
                  Contact OCC <ArrowUpRight className="size-3" />
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

        <section className="mx-auto w-full max-w-[1480px] border-b border-black/10 px-6 py-20 sm:px-8 md:px-12 lg:px-16 lg:py-24" aria-labelledby="about-explore-title">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#5c6f58]">07 / Explore OCC</p>
              <h2 id="about-explore-title" className="mt-5 font-[var(--font-display)] text-3xl font-normal leading-[1.02] tracking-[-0.02em] text-[#2f3b2d] sm:text-4xl">
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
                      <h3 className="font-[var(--font-display)] text-2xl font-normal leading-none tracking-[-0.02em] text-[#2f3b2d] transition-transform duration-300 group-hover:translate-x-2 sm:text-3xl">
                        {section.title}
                      </h3>
                      <p className="mt-3 max-w-xl text-[11px] uppercase tracking-[0.13em] text-black/42">{section.desc}</p>
                    </div>
                    <ArrowUpRight className="mb-1 size-5 text-[#5c6f58] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
