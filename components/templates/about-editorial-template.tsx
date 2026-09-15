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
const heroImage = "/about/about-origin.svg"
const whyOccImage = "/about/about-fine-robusta.svg"

const differences = [
  {
    title: "One origin",
    copy: "Every OCC coffee starts in Cambodia. Origin is the product foundation, not a label added later.",
  },
  {
    title: "Small batches",
    copy: "We prefer smaller, clearer batches over volume that weakens quality or origin identity.",
  },
  {
    title: "Origin clarity",
    copy: "Country, region, producer, process, and lot claims become more specific only when the evidence does.",
  },
  {
    title: "Quality focus",
    copy: "We evaluate processing, physical condition, sensory performance, roast application, and consistency.",
  },
  {
    title: "Cambodian Fine Robusta expertise",
    copy: "Fine Robusta is our specialist wedge: canephora evaluated as a quality category, not a commodity stereotype.",
  },
]

const galleryPanels = [
  {
    label: "ONE ORIGIN",
    href: "/origins",
    image: "/about/about-origin.svg",
    note: "Cambodia first. Always.",
  },
  {
    label: "FINE ROBUSTA",
    href: "/fine-robusta-cambodia",
    image: "/about/about-fine-robusta.svg",
    note: "Our specialist coffee category.",
  },
  {
    label: "READY-TO-SELL",
    href: "/solutions/wholesale",
    image: "/about/about-ready-to-sell.svg",
    note: "Wholesale and supplier evaluation.",
  },
  {
    label: "MADE-FOR-YOU",
    href: "/solutions/roasting-program",
    image: "/about/about-made-for-you.svg",
    note: "Custom roasting and profile development.",
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
  const reveal = (offset = 42) => ({
    initial: reducedMotion ? { opacity: 1 } : { opacity: 0, y: offset },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.18 },
    transition: { duration: reducedMotion ? 0.01 : 0.68, ease },
  })

  return (
    <div className="bg-[#f3f1ea] text-[#182019]">
      <section className="relative overflow-hidden bg-[#2f3b2d] text-[#f3f1ea]">
        <div className="mx-auto grid min-h-[600px] w-full max-w-[1680px] grid-cols-1 lg:min-h-[680px] lg:grid-cols-[0.92fr_1.08fr] xl:min-h-[700px]">
          <div className="relative z-10 flex items-center px-6 py-14 sm:px-8 md:px-12 lg:px-16 xl:px-20">
            <motion.div {...reveal(24)} className="w-full max-w-[640px]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-white/66">
                Who We Are · Origin Coffee Cambodia
              </p>
              <h1
                aria-label="One origin. Cambodia."
                className="mt-7 font-[var(--font-display)] text-[clamp(3.6rem,6.2vw,6.75rem)] font-normal leading-[0.88] tracking-[-0.045em] text-white"
              >
                One origin.
                <br />Cambodia.
              </h1>
              <p className="mt-8 max-w-[580px] text-[clamp(1.12rem,1.5vw,1.45rem)] font-medium leading-[1.34] tracking-[-0.02em] text-white">
                OCC is a 100% Cambodia-origin specialty coffee supplier and Fine Robusta specialist.
              </p>
              <p className="mt-6 max-w-[560px] text-sm leading-7 text-white/70 sm:text-[15px]">
                We work with Cambodian coffee in small batches, connecting origin, quality and roasting with the people and businesses bringing Cambodian coffee to new markets.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-5">
                <Link
                  href="#why-occ"
                  className="inline-flex items-center gap-2 rounded-full border border-white/45 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-[#2f3b2d]"
                >
                  Why OCC <ArrowUpRight className="size-3" />
                </Link>
                <span className="text-[9px] uppercase tracking-[0.22em] text-white/42">100% Cambodia Origin</span>
              </div>
            </motion.div>
          </div>

          <div
            className="relative min-h-[480px] overflow-hidden bg-[#5c6f58] bg-no-repeat lg:min-h-full"
            style={{ backgroundImage: `url(${heroImage})`, backgroundSize: "cover", backgroundPosition: "50% 50%" }}
            role="img"
            aria-label="Cambodian coffee at origin"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#2f3b2d]/38 via-[#2f3b2d]/5 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-white/20 bg-[#2f3b2d]/18 px-6 py-5 text-[9px] uppercase tracking-[0.2em] text-white/68 backdrop-blur-[2px] sm:px-8 lg:px-10">
              <span>Fine Robusta Specialist</span>
              <span>01 / About</span>
            </div>
          </div>
        </div>
      </section>

      <section id="why-occ" className="relative overflow-hidden bg-[#5c6f58] text-[#f3f1ea]">
        <div data-about-ghost="origin" aria-hidden="true" className="pointer-events-none absolute -left-8 top-10 font-[var(--font-display)] text-[clamp(7rem,15vw,14rem)] font-semibold leading-none tracking-[-0.06em] text-white/[0.06]">
          origin
        </div>
        <div data-about-ghost="coffee" aria-hidden="true" className="pointer-events-none absolute -right-10 bottom-0 font-[var(--font-display)] text-[clamp(7rem,15vw,14rem)] font-semibold leading-none tracking-[-0.06em] text-white/[0.06]">
          coffee
        </div>

        <div className="relative mx-auto grid w-full max-w-[1480px] grid-cols-1 gap-12 px-6 py-20 sm:px-8 md:px-12 lg:grid-cols-12 lg:items-center lg:px-16 lg:py-28">
          <motion.div {...reveal(26)} className="lg:col-span-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-white/58">02 / Why OCC</p>
            <h2 className="mt-6 max-w-[570px] font-[var(--font-display)] text-[clamp(2.8rem,4.5vw,4.65rem)] font-normal leading-[0.96] tracking-[-0.035em] text-white">
              A Cambodian coffee supplier
              <br />with one origin to protect.
            </h2>
            <div className="mt-8 max-w-[560px] border-t border-white/20 pt-7">
              <p className="text-[17px] leading-8 text-white/88">
                OCC is built around one commercial idea: help Cambodian coffee travel further without losing the identity, evidence, and quality decisions that make the coffee worth choosing.
              </p>
              <p className="mt-5 text-[14px] leading-7 text-white/66">
                Cambodia is the origin. Fine Robusta is the specialist expertise. Wholesale coffee supply and custom roasting are the two main ways buyers work with us.
              </p>
            </div>
          </motion.div>

          <motion.div {...reveal(34)} className="lg:col-span-6 lg:col-start-7">
            <div
              className="aspect-[5/4] overflow-hidden border border-white/15 bg-[#2f3b2d] bg-no-repeat shadow-[0_24px_60px_rgba(22,31,20,0.18)] lg:aspect-[6/5] xl:aspect-[4/3]"
              style={{ backgroundImage: `url(${whyOccImage})`, backgroundSize: "cover", backgroundPosition: "50% 50%" }}
              role="img"
              aria-label="Cambodian coffee origin and production"
            />
          </motion.div>

          <div className="lg:col-span-12">
            <div className="grid grid-cols-1 border-y border-white/20 sm:grid-cols-2 xl:grid-cols-[0.9fr_0.9fr_1fr_1fr_1.35fr]">
              {differences.map((item, index) => (
                <motion.div
                  key={item.title}
                  {...reveal(22)}
                  className={`py-7 sm:px-6 xl:px-5 ${index > 0 ? "border-t border-white/15 sm:border-l sm:border-t-0" : ""} ${index === 2 ? "sm:border-l-0 xl:border-l" : ""} ${index >= 2 ? "sm:border-t xl:border-t-0" : ""}`}
                >
                  <p className="text-[9px] tracking-[0.2em] text-white/34">0{index + 1}</p>
                  <h3 className="mt-4 text-sm font-semibold leading-5 text-white">{item.title}</h3>
                  <p className="mt-3 max-w-[260px] text-[12px] leading-[1.65] text-white/58">{item.copy}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 bg-[#2f3b2d] lg:grid-cols-4" aria-label="OCC origin and commercial paths">
        {galleryPanels.map((panel, index) => (
          <Link
            key={panel.label}
            href={panel.href}
            className="group relative aspect-[3/4] overflow-hidden border-b border-r border-white/20 lg:aspect-square lg:border-b-0 xl:aspect-[5/4]"
            aria-label={`${panel.label}: ${panel.note}`}
          >
            <div
              className="absolute inset-0 bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-[1.025]"
              style={{ backgroundImage: `url(${panel.image})`, backgroundSize: "cover", backgroundPosition: "50% 50%" }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-[#1f291f]/80 transition-colors duration-500 group-hover:bg-[#2f3b2d]/14" />
            <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-7 lg:p-8">
              <p className="text-[9px] uppercase tracking-[0.2em] text-white/58">0{index + 1}</p>
              <div className="mt-3 flex items-end justify-between gap-3 sm:gap-4">
                <div>
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white sm:text-sm sm:tracking-[0.2em]">{panel.label}</h3>
                  <p className="mt-2 hidden max-w-[230px] text-[12px] leading-5 text-white/62 sm:block">{panel.note}</p>
                </div>
                <ArrowUpRight className="size-4 shrink-0 text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </div>
          </Link>
        ))}
      </section>

      <main className="bg-[#f3f1ea]">
        <motion.section {...reveal()} className="mx-auto grid w-full max-w-[1480px] grid-cols-1 border-b border-black/10 px-6 py-20 sm:px-8 md:grid-cols-12 md:px-12 lg:px-16 lg:py-28">
          <div className="md:col-span-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#5c6f58]">03 / What We Are Building</p>
          </div>
          <div className="mt-8 md:col-span-8 md:col-start-5 md:mt-0">
            <h2 aria-label="A Premium Cambodian Coffee Brand" className="max-w-[780px] font-[var(--font-display)] text-[clamp(2.8rem,4.7vw,5rem)] font-normal leading-[0.93] tracking-[-0.04em] text-[#2f3b2d]">
              A Premium
              <br />Cambodian Coffee Brand
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-8 border-t border-black/10 pt-8 lg:grid-cols-2 lg:gap-14">
              <p className="max-w-[540px] text-lg leading-8 text-black/82">
                Cambodia is still a young coffee origin in the minds of many international buyers. OCC is building toward a future in which Cambodian coffee can be recognized for its own origin identity.
              </p>
              <div className="max-w-[520px] space-y-5 text-[15px] leading-7 text-black/64">
                <p>
                  Cambodian Fine Robusta should be evaluated for quality rather than reduced to old assumptions about Robusta.
                </p>
                <p>
                  That requires origin clarity, credible quality language, better buyer information, repeatable roasting decisions, and a brand strong enough to carry Cambodia into new commercial conversations.
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
                <div key={title} className="bg-[#f3f1ea] p-7 sm:p-8 lg:min-h-[150px]">
                  <h3 className="text-sm font-semibold text-[#2f3b2d]">{title}</h3>
                  <p className="mt-3 max-w-md text-[13px] leading-6 text-black/56">{copy}</p>
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
              <motion.div {...reveal(30)}>
                <h2 id="work-with-occ-title" aria-label="How would you like to work with OCC?" className="max-w-[780px] font-[var(--font-display)] text-[clamp(2.7rem,4.4vw,4.6rem)] font-normal leading-[0.95] tracking-[-0.035em] text-[#2f3b2d]">
                  How would you like
                  <br />to work with OCC?
                </h2>
                <p className="mt-7 max-w-2xl text-[15px] leading-7 text-black/62">
                  Overseas buyer conversations belong to one of two paths: choose a Cambodian coffee profile that is ready to evaluate and sell, or build a roasting profile around the cup, market, and application you need.
                </p>
              </motion.div>

              <div className="mt-12 grid grid-cols-1 gap-6 xl:grid-cols-2">
                <motion.article {...reveal(28)} className="flex h-full flex-col border border-[#5c6f58]/30 bg-white/28 p-7 sm:p-9 xl:min-h-[500px]">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#5c6f58]">01 / Ready-to-Sell</p>
                    <span className="text-[9px] uppercase tracking-[0.18em] text-black/34">Choose our profile.</span>
                  </div>
                  <h3 className="mt-7 font-[var(--font-display)] text-4xl font-normal leading-none tracking-[-0.03em] text-[#2f3b2d]">Ready-to-Sell</h3>
                  <p className="mt-5 text-sm leading-7 text-black/66">
                    For distributors, importers, retailers, hospitality groups, and coffee businesses looking for a Cambodian coffee supplier with a defined profile and a clearer route to repeat supply.
                  </p>
                  <div className="mt-8 border-y border-black/10 py-5">
                    {readyToSellPath.map((item, index) => (
                      <div key={item} className="flex gap-4 py-2 text-[12px] leading-5 text-black/60">
                        <span className="w-5 shrink-0 text-[9px] tracking-[0.14em] text-black/28">0{index + 1}</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/solutions/wholesale" className="mt-auto inline-flex items-center gap-2 pt-8 text-[10px] font-semibold uppercase tracking-[0.17em] text-[#2f3b2d]">
                    Explore Wholesale Coffee Supply <ArrowUpRight className="size-3" />
                  </Link>
                </motion.article>

                <motion.article {...reveal(34)} className="flex h-full flex-col bg-[#2f3b2d] p-7 text-[#f3f1ea] sm:p-9 xl:min-h-[500px]">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/70">02 / Made-for-You</p>
                    <span className="text-[9px] uppercase tracking-[0.18em] text-white/38">Build yours.</span>
                  </div>
                  <h3 className="mt-7 font-[var(--font-display)] text-4xl font-normal leading-none tracking-[-0.03em]">Made-for-You</h3>
                  <p className="mt-5 text-sm leading-7 text-white/66">
                    For buyers who already know the cup, menu, format, or market position they want and need custom roasting to turn that target into a repeatable production profile.
                  </p>
                  <div className="mt-8 border-y border-white/12 py-5">
                    {madeForYouPath.map((item, index) => (
                      <div key={item} className="flex gap-4 py-2 text-[12px] leading-5 text-white/62">
                        <span className="w-5 shrink-0 text-[9px] tracking-[0.14em] text-white/28">0{index + 1}</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/solutions/roasting-program" className="mt-auto inline-flex items-center gap-2 pt-8 text-[10px] font-semibold uppercase tracking-[0.17em] text-white">
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
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/46">05 / Where We Are Going</p>
            </div>
            <div className="mt-8 md:col-span-8 md:col-start-5 md:mt-0">
              <h2 className="max-w-[820px] font-[var(--font-display)] text-[clamp(2.8rem,4.7vw,5rem)] font-normal leading-[0.93] tracking-[-0.04em] text-white">
                Cambodian coffee
                <br />for international markets.
              </h2>
              <div className="mt-9 grid grid-cols-1 gap-8 border-t border-white/18 pt-8 lg:grid-cols-2 lg:gap-14">
                <p className="max-w-[520px] text-lg leading-8 text-white/84">
                  OCC is building toward long-term relationships with international distributors, importers, retailers, and hospitality partners that want a clearer Cambodian coffee proposition.
                </p>
                <div className="max-w-[520px] space-y-5 text-[15px] leading-7 text-white/64">
                  <p>
                    The goal is repeat business built on fit: the right coffee, the right roast, the right channel, and a supply relationship that can become more precise as origin evidence and commercial requirements become more precise.
                  </p>
                  <p>
                    We are building the conditions for buyers to recognize Cambodian coffee, and especially Cambodian Fine Robusta, on its own terms.
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

        <section className="mx-auto w-full max-w-[1480px] px-6 py-20 sm:px-8 md:px-12 lg:px-16 lg:py-28" aria-labelledby="about-explore-title">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#5c6f58]">06 / Explore OCC</p>
              <h2 id="about-explore-title" className="mt-5 font-[var(--font-display)] text-3xl font-normal leading-[1.02] tracking-[-0.02em] text-[#2f3b2d] sm:text-4xl">
                The thinking
                <br />behind the company.
              </h2>
            </div>

            <div className="md:col-span-8 md:col-start-5">
              {sections.map((section, index) => (
                <motion.div key={section.href} {...reveal(34)}>
                  <Link href={section.href} className="group grid grid-cols-[38px_1fr_auto] items-end gap-4 border-t border-black/10 py-7 last:border-b sm:grid-cols-[54px_1fr_auto] sm:py-9 lg:py-10">
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
