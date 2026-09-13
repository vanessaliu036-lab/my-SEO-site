import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { MotionReveal } from "@/components/ui/motion-reveal"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Cambodia Coffee Origins & Regions | Mondulkiri Coffee | OCC",
  description:
    "Explore Cambodia coffee origins, northeastern coffee highlands, Mondulkiri coffee, Ratanakiri, growing regions, regional geography, and Cambodia-grown coffee from OCC.",
  keywords:
    "Cambodia coffee origin, Cambodia coffee regions, Cambodia coffee highlands, Cambodian highland coffee, coffee growing regions in Cambodia, Mondulkiri coffee, Mondulkiri coffee Cambodia, Sen Monorom coffee, Ratanakiri coffee, coffee grown in Cambodia, Cambodia-grown coffee",
  alternates: pageAlternates("/origins/cambodia-regions"),
  openGraph: {
    title: "Cambodia Coffee Origins & Regions | OCC",
    description:
      "A geographic guide to Cambodia coffee origins, northeastern highlands, Mondulkiri, Ratanakiri, and Cambodia-grown coffee.",
    url: `${siteUrl}/origins/cambodia-regions`,
    type: "article",
  },
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Origins", item: `${siteUrl}/origins` },
    { "@type": "ListItem", position: 3, name: "Cambodia & Regions", item: `${siteUrl}/origins/cambodia-regions` },
  ],
}

const highlights = [
  {
    title: "Cambodia",
    meta: "Country of Origin",
    text: "OCC uses Cambodia to describe agricultural origin: coffee grown in Cambodia, not simply coffee roasted, packed, branded, or served here.",
  },
  {
    title: "Northeastern Highlands",
    meta: "Regional Geography",
    text: "Cambodia’s clearest coffee geography sits in the northeast, where upland terrain differs from the country’s broad lowland plains.",
  },
  {
    title: "Mondulkiri",
    meta: "Primary OCC Focus",
    text: "Mondulkiri is OCC’s central regional reference for Cambodian coffee and the strongest current geographic focus of our origin work.",
  },
  {
    title: "Ratanakiri",
    meta: "Wider Northeast",
    text: "Ratanakiri helps complete the wider northeastern coffee map without assuming that every Cambodian growing area shares one terroir.",
  },
]

const regionFacts = [
  "Cambodia = country of agricultural origin",
  "Northeast = principal highland geography",
  "Mondulkiri = OCC’s central regional focus",
  "Sen Monorom = important geographic reference",
  "Ratanakiri = wider northeastern coffee context",
  "Region names require origin evidence",
]

const sections = [
  {
    label: "01 / Cambodia Coffee Origin",
    title: "Where Is Coffee Grown in Cambodia?",
    content: (
      <div className="space-y-6">
        <p>
          Coffee is grown in Cambodia, although the country remains a relatively small and under-recognized producer compared with larger Southeast Asian coffee origins. For OCC, the first job of an origin page is therefore simple: make the geography clear.
        </p>
        <p>
          The strongest contemporary geographic association is with northeastern Cambodia, particularly <strong className="font-semibold text-[#182019]">Mondulkiri</strong>. Coffee has also been associated with <strong className="font-semibold text-[#182019]">Ratanakiri</strong> and other upland agricultural areas, but public documentation and lot-level evidence are not equally developed across every location.
        </p>
        <p>
          This is why OCC does not treat <strong className="font-semibold text-[#182019]">Cambodia coffee</strong> as one uniform terroir. A country can contain different regions, elevations, landscapes, agricultural systems, plant material, and post-harvest practices. Regional identity should become more specific as the evidence becomes stronger.
        </p>
      </div>
    ),
  },
  {
    label: "02 / Cambodia Coffee Highlands",
    title: "Why the Northeast Matters",
    content: (
      <div className="space-y-6">
        <p>
          Much of Cambodia is associated with lowland plains, river systems, and tropical heat. The northeastern provinces introduce a different physical landscape, including elevated plateaux, rolling uplands, forest-agriculture mosaics, and red-earth agricultural zones.
        </p>
        <p>
          That geographic contrast is the foundation behind searches such as <strong className="font-semibold text-[#182019]">Cambodia coffee highlands</strong>, <strong className="font-semibold text-[#182019]">Cambodian highland coffee</strong>, and <strong className="font-semibold text-[#182019]">coffee growing regions in Cambodia</strong>. These queries are fundamentally asking where Cambodian coffee comes from, not how a particular farm manages soil, shade, or harvest.
        </p>
        <p>
          Geography gives the map. Farm-level growing conditions belong to the next layer: <Link href="/origins/farm-terroir" className="border-b border-[#182019]/45 font-medium text-[#182019] transition-colors hover:border-[#a8542a]">Farm & Terroir</Link>.
        </p>
      </div>
    ),
  },
  {
    label: "03 / Mondulkiri Coffee",
    title: "Cambodia’s Key Coffee Reference Point",
    content: (
      <div className="space-y-6">
        <p>
          <strong className="font-semibold text-[#182019]">Mondulkiri coffee</strong> is one of the clearest regional terms for understanding modern Cambodian coffee. The province sits in eastern Cambodia and is widely associated with upland terrain, cooler conditions at elevation, red-earth landscapes, forest, and agriculture.
        </p>
        <p>
          Around <strong className="font-semibold text-[#182019]">Sen Monorom</strong>, published field research has documented Coffea canephora production and examined real coffee-growing systems. That matters because it gives an emerging coffee origin something more useful than broad marketing language: a geographic evidence base.
        </p>
        <p>
          OCC treats Mondulkiri first as a <strong className="font-semibold text-[#182019]">regional origin</strong>. It is not automatically a flavor claim, a quality grade, or another name for Fine Robusta. A coffee can be grown in Mondulkiri without every farm, harvest, or lot being identical.
        </p>
        <div className="border-l-2 border-[#a8542a] bg-[#eee8dc]/65 px-5 py-5 sm:px-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a8542a]">Geographic rule</p>
          <p className="mt-3 font-[var(--font-display)] text-2xl leading-[1.12] tracking-[-0.025em] text-[#182019]">
            Mondulkiri tells us where the coffee comes from. It does not, by itself, tell us how the coffee grew or how a lot was verified.
          </p>
        </div>
      </div>
    ),
  },
  {
    label: "04 / Sen Monorom",
    title: "A Geographic Anchor for Cambodian Coffee",
    content: (
      <div className="space-y-6">
        <p>
          Sen Monorom, the provincial capital of Mondulkiri, sits within the upland landscape most frequently associated with contemporary Cambodian coffee cultivation. Research around the area has examined Canephora farms, shade systems, soil moisture, yield, fruit development, and seasonal conditions.
        </p>
        <p>
          The role of this information on a regional page is not to turn one research site into a universal description of every Mondulkiri farm. Its value is to show that <strong className="font-semibold text-[#182019]">Mondulkiri coffee Cambodia</strong> can be discussed through real places and documented growing areas rather than a vague national story.
        </p>
        <p>
          As Cambodia develops more producer, farm, harvest, process, and lot records, the regional term can gain more resolution. A mature origin becomes stronger when a country name can lead to a region, then to a locality, then to a specific source.
        </p>
      </div>
    ),
  },
  {
    label: "05 / Ratanakiri",
    title: "The Wider Northeastern Coffee Map",
    content: (
      <div className="space-y-6">
        <p>
          Mondulkiri is OCC’s primary origin focus today, but Cambodia’s coffee geography should not be reduced to one province. <strong className="font-semibold text-[#182019]">Ratanakiri</strong>, to the north, is another major northeastern highland province with basaltic upland landscapes and a long agricultural association with perennial crops.
        </p>
        <p>
          OCC does not assume that coffee from Ratanakiri should taste like coffee from Mondulkiri, and we do not treat every northeastern farm as one terroir. The purpose of a regional origin architecture is the opposite: to create enough geographic resolution that differences can eventually become visible.
        </p>
        <p>
          As stronger evidence becomes available, Cambodia may become easier to understand through additional districts, localities, farms, and producers. That is a sign of origin maturity, not unnecessary complexity.
        </p>
      </div>
    ),
  },
  {
    label: "06 / Cambodia-Grown Coffee",
    title: "Agricultural Origin Comes First",
    content: (
      <div className="space-y-6">
        <p>
          There is an important difference between coffee <strong className="font-semibold text-[#182019]">grown in Cambodia</strong> and coffee that is only roasted, packed, branded, or served in Cambodia. Only the first describes agricultural origin.
        </p>
        <div className="grid grid-cols-1 border-l border-t border-black/10 sm:grid-cols-2">
          {["Coffee grown in Cambodia — agricultural origin", "Coffee roasted in Cambodia — production location", "Coffee packed in Cambodia — packaging location", "Cambodian-style coffee — preparation or cultural style"].map((item, index) => (
            <div key={item} className="border-b border-r border-black/10 p-4 text-sm leading-6 text-black/68">
              <span className="mr-3 text-[9px] tracking-[0.18em] text-[#a8542a]">{String(index + 1).padStart(2, "0")}</span>
              {item}
            </div>
          ))}
        </div>
        <p>
          OCC’s origin position is straightforward: whether the coffee is Robusta or Arabica, the coffee itself begins in Cambodia. That distinction gives every later layer — region, farm, lot, quality evaluation, and commercial supply — a clearer starting point.
        </p>
      </div>
    ),
  },
  {
    label: "07 / Origin Architecture",
    title: "One Geography, More Resolution Over Time",
    content: (
      <div className="space-y-6">
        <p>
          Cambodia is the country. Mondulkiri or another verified location is the regional layer. Farm & Terroir explains the growing environment. Single Origin explains how a particular coffee remains identifiable through producer, process, and lot records. Fine Robusta Cambodia explains OCC’s quality specialization.
        </p>
        <div className="border-y border-black/10 py-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a8542a]">Origin resolution</p>
          <p className="mt-4 font-[var(--font-display)] text-[clamp(1.8rem,7vw,2.7rem)] leading-[1.04] tracking-[-0.035em] text-[#182019]">
            Cambodia → Northeast → Mondulkiri → Farm → Harvest → Process → Lot
          </p>
        </div>
        <p>
          This page owns the first half of that chain: <strong className="font-semibold text-[#182019]">country and regional geography</strong>. It deliberately stops before farm management and lot traceability become the main subject.
        </p>
      </div>
    ),
  },
]

export default function CambodiaRegionsPage() {
  const sectionLabelClass = "text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a8542a]"
  const sectionTitleClass = "mt-5 max-w-[15ch] font-[var(--font-display)] text-[clamp(2.1rem,7.5vw,3.2rem)] font-normal leading-[0.98] tracking-[-0.035em] text-[#182019]"

  return (
    <div className="bg-[#f6f3ea] text-[#182019]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="relative overflow-hidden border-b border-black/10 pt-28 lg:pt-32">
        <div className="pointer-events-none absolute inset-0 hidden grid-cols-12 divide-x divide-black/[0.055] md:grid" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, item) => <div key={item} />)}
        </div>

        <div className="relative mx-auto w-full max-w-[1680px] px-6 pb-14 pt-6 sm:px-8 md:px-12 lg:px-16 lg:pb-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
            <MotionReveal direction="left" className="md:col-span-3 md:pb-2">
              <Link href="/origins" className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-black/42 transition-colors hover:text-black">
                <ArrowLeft className="size-3" /> Origins
              </Link>
              <p className="mt-10 text-[10px] font-medium uppercase tracking-[0.24em] text-[#a8542a]">WHERE / GEOGRAPHY</p>
              <p className="mt-3 text-[9px] uppercase tracking-[0.2em] text-black/34">Origins / 01</p>
            </MotionReveal>

            <MotionReveal className="md:col-span-6 md:col-start-4">
              <h1 className="font-[var(--font-display)] text-[clamp(3rem,5.4vw,5rem)] font-normal leading-[0.94] tracking-[-0.04em]">
                CAMBODIA & REGIONS
              </h1>
            </MotionReveal>

            <MotionReveal direction="right" className="md:col-span-3 md:col-start-10 md:pb-2">
              <p className="border-t border-black/10 pt-5 text-[15px] leading-7 text-black/76">
                Cambodia coffee origins, northeastern highlands, Mondulkiri coffee, Ratanakiri, and the regional geography behind Cambodia-grown coffee.
              </p>
            </MotionReveal>
          </div>

          <MotionReveal className="mt-16 grid grid-cols-1 gap-8 border-t border-black/10 pt-10 md:mt-20 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7 md:col-start-4">
              <p className="font-[var(--font-display)] text-[clamp(2.25rem,8vw,3.7rem)] font-normal leading-[0.98] tracking-[-0.04em]">
                Where Cambodian coffee begins — before the conversation moves to farm, lot, or quality category.
              </p>
            </div>
            <div className="md:col-span-2 md:col-start-11">
              <Link href="/origins/farm-terroir" className="group inline-flex items-center gap-2 rounded-full bg-[#182019] px-5 py-3 text-[10px] font-medium uppercase tracking-[0.16em] text-[#f6f3ea] transition-transform duration-300 hover:-translate-y-0.5">
                Explore Farm & Terroir <ArrowUpRight className="size-3" />
              </Link>
            </div>
          </MotionReveal>
        </div>
      </section>

      <main className="mx-auto w-full max-w-[1680px] px-6 sm:px-8 md:px-12 lg:px-16">
        <section className="border-b border-black/10 py-16 lg:py-24">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <MotionReveal direction="left" className="md:col-span-3">
              <p className={sectionLabelClass}>Origin Map</p>
              <span className="mt-3 block h-px w-10 bg-[#a8542a]" aria-hidden="true" />
              <h2 className={sectionTitleClass}>Cambodia Coffee Geography</h2>
              <p className="mt-6 max-w-xs text-sm leading-7 text-black/62">
                This page owns geographic search intent: country, highlands, regions, Mondulkiri, Ratanakiri, and where coffee is grown in Cambodia.
              </p>
            </MotionReveal>

            <div className="md:col-span-8 md:col-start-5">
              <div className="grid grid-cols-1 border-l border-t border-black/10 sm:grid-cols-2">
                {highlights.map((card, index) => (
                  <MotionReveal key={card.title} direction={index % 2 === 0 ? "left" : "right"}>
                    <article className="min-h-[220px] border-b border-r border-black/10 p-6 transition-colors duration-300 hover:bg-[#eee8dc] lg:min-h-[250px] lg:p-8">
                      <div className="flex items-start justify-between gap-4">
                        <span className="text-[9px] tracking-[0.2em] text-[#a8542a]">{String(index + 1).padStart(2, "0")}</span>
                        <span className="text-[9px] uppercase tracking-[0.16em] text-black/35">{card.meta}</span>
                      </div>
                      <h3 className="mt-12 font-[var(--font-display)] text-2xl font-normal leading-[1.05] tracking-[-0.025em]">{card.title}</h3>
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
              {sections.map((section, index) => (
                <MotionReveal key={section.title} direction={index % 2 === 0 ? "left" : "right"}>
                  <article className="grid grid-cols-1 border-t border-black/10 py-12 md:grid-cols-8 md:gap-8 lg:py-16">
                    <div className="md:col-span-3">
                      <p className={sectionLabelClass}>{section.label}</p>
                      <span className="mt-3 block h-px w-10 bg-[#a8542a]" aria-hidden="true" />
                      <h2 className={sectionTitleClass}>{section.title}</h2>
                    </div>
                    <div className="mt-8 max-w-[34rem] text-[15px] leading-8 text-black/76 md:col-span-5 md:mt-0">
                      {section.content}
                    </div>
                  </article>
                </MotionReveal>
              ))}
            </div>

            <MotionReveal direction="right" className="md:col-span-3 md:col-start-10">
              <aside className="sticky top-28 border-t border-black/10 bg-[#202820] px-6 py-7 text-[#f6f3ea] lg:px-7 lg:py-8">
                <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-white/45">Geography Owner</p>
                <p className="mt-5 font-[var(--font-display)] text-2xl leading-[1.08] tracking-[-0.025em]">Where is Cambodian coffee grown?</p>
                <div className="mt-7">
                  {regionFacts.map((fact, index) => (
                    <div key={fact} className="grid grid-cols-[30px_1fr] gap-3 border-t border-white/14 py-4 last:border-b">
                      <span className="text-[8px] tracking-[0.18em] text-white/30">{String(index + 1).padStart(2, "0")}</span>
                      <span className="text-sm leading-6 text-white/72">{fact}</span>
                    </div>
                  ))}
                </div>
              </aside>
            </MotionReveal>
          </div>
        </section>

        <MotionReveal>
          <section className="py-12 lg:py-16">
            <div className="grid grid-cols-1 gap-8 bg-[#202820] p-7 text-[#f6f3ea] sm:p-9 md:grid-cols-12 md:items-end lg:p-11">
              <div className="md:col-span-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">Next Origin Layer</p>
                <h2 className="mt-5 max-w-[15ch] font-[var(--font-display)] text-[clamp(2rem,7vw,3rem)] font-normal leading-[0.98] tracking-[-0.035em]">
                  The Map Ends Where the Farm Begins.
                </h2>
                <p className="mt-6 max-w-[34rem] text-sm leading-7 text-white/66">
                  Continue from regional geography into elevation, soil, climate, shade, water, plant material, farm management, and cherry maturity.
                </p>
              </div>
              <div className="md:col-span-4 md:col-start-9 md:text-right">
                <Link href="/origins/farm-terroir" className="group inline-flex items-center gap-2 border-b border-white/35 pb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:border-white">
                  Explore Farm & Terroir <ArrowUpRight className="size-3" />
                </Link>
              </div>
            </div>
          </section>
        </MotionReveal>
      </main>
    </div>
  )
}
