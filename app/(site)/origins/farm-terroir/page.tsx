import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { MotionReveal } from "@/components/ui/motion-reveal"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Cambodian Coffee Terroir | Farm, Soil & Climate | OCC",
  description:
    "Explore Cambodian coffee terroir through farm conditions, soil, elevation, climate, shade, water, plant material, farm management, and cherry maturity.",
  keywords:
    "Cambodian coffee terroir, coffee farm Cambodia, Cambodia coffee farm, coffee soil Cambodia, coffee elevation Cambodia, coffee climate Cambodia, shade grown coffee Cambodia, coffee farm management Cambodia, coffee cherry maturity",
  alternates: pageAlternates("/origins/farm-terroir"),
  openGraph: {
    title: "Cambodian Coffee Terroir | Farm, Soil & Climate | OCC",
    description:
      "How soil, elevation, climate, shade, water, plant material, and farm decisions shape the growing environment around Cambodian coffee.",
    url: `${siteUrl}/origins/farm-terroir`,
    type: "article",
  },
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Origins", item: `${siteUrl}/origins` },
    { "@type": "ListItem", position: 3, name: "Farm & Terroir", item: `${siteUrl}/origins/farm-terroir` },
  ],
}

const highlights = [
  {
    title: "Soil",
    meta: "Root Environment",
    text: "Drainage, texture, organic matter, nutrient availability, rooting conditions, and water movement matter more than a simplified red-soil claim.",
  },
  {
    title: "Elevation",
    meta: "Microclimate Variable",
    text: "Elevation can influence temperature patterns, exposure, and maturation, but altitude alone is not a quality score.",
  },
  {
    title: "Climate & Shade",
    meta: "Growing Cycle",
    text: "Rainfall, dry periods, heat, cooler conditions, shade, and soil moisture interact throughout flowering, fruit development, and ripening.",
  },
  {
    title: "Farm Decisions",
    meta: "Agricultural Control",
    text: "Pruning, nutrition, plant health, shade, water, harvest timing, and cherry selection determine how much growing potential survives to harvest.",
  },
]

const farmFacts = [
  "Farm & Terroir = growing conditions",
  "Soil = function, not flavor shorthand",
  "Elevation = context, not quality grade",
  "Climate = a seasonal cycle",
  "Shade = microclimate variable",
  "Farm management = agricultural decisions",
  "Cherry maturity = final farm-stage quality input",
]

const sections = [
  {
    label: "01 / Farm Environment",
    title: "From Region to Micro-Conditions",
    content: (
      <div className="space-y-6">
        <p>
          <Link href="/origins/cambodia-regions" className="border-b border-occ-primary/45 font-medium text-occ-primary transition-colors hover:border-occ-secondary">Cambodia & Regions</Link> explains where coffee is grown. Farm & Terroir goes one level closer and asks a different question: <strong className="font-semibold text-occ-primary">what happens inside the coffee-growing environment?</strong>
        </p>
        <p>
          Two farms in the same province can experience different conditions. They can sit at different elevations, face different slopes, receive different amounts of shade, move water differently through the soil, use different plant material, and follow different agricultural practices.
        </p>
        <p>
          This is why a regional name is useful but incomplete at farm scale. Terroir is the interaction between environment and agriculture around a specific coffee plant, not a guarantee that every coffee from one region will behave the same way.
        </p>
        <div className="border-l-2 border-occ-secondary bg-occ-background/65 px-5 py-5 sm:px-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-occ-secondary">Farm-level question</p>
          <p className="mt-3 font-[var(--font-display)] text-2xl leading-[1.12] tracking-[-0.025em] text-occ-primary">
            How did this coffee grow here — under these soil, climate, shade, water, plant, and management conditions?
          </p>
        </div>
      </div>
    ),
  },
  {
    label: "02 / Elevation",
    title: "One Variable, Not a Quality Score",
    content: (
      <div className="space-y-6">
        <p>
          Elevation is one of the most frequently used terms in specialty coffee and one of the easiest to oversimplify. Higher altitude does not automatically mean higher quality, and one altitude number should never substitute for farm-specific evidence.
        </p>
        <p>
          Elevation can influence local temperature patterns, solar exposure, wind, the pace of plant development, and cherry maturation. Its effect depends on latitude, species, slope, shade, rainfall, soil, and farm management.
        </p>
        <p>
          Published field research on Canephora farms near Sen Monorom has documented coffee production around roughly 700 metres above sea level. That is useful evidence for the farms studied, not a universal altitude for all Cambodian coffee farms.
        </p>
        <p>
          OCC records elevation at farm or lot level when it can be verified. Where it cannot, we prefer an open field to artificial precision.
        </p>
      </div>
    ),
  },
  {
    label: "03 / Soil",
    title: "More Than Red Earth",
    content: (
      <div className="space-y-6">
        <p>
          Red soils are visually associated with parts of Cambodia’s northeastern highlands, but <strong className="font-semibold text-occ-primary">red soil is not a flavor note</strong>. At farm level, soil matters through physical and biological function.
        </p>
        <div className="grid grid-cols-1 border-l border-t border-black/10 sm:grid-cols-2">
          {["Drainage and water movement", "Water-holding capacity", "Soil texture and structure", "Organic matter", "Rooting conditions", "Nutrient availability", "Ground cover and erosion", "Farm inputs and soil care"].map((item, index) => (
            <div key={item} className="border-b border-r border-black/10 p-4 text-sm leading-6 text-black/68">
              <span className="mr-3 text-[9px] tracking-[0.18em] text-occ-secondary">{String(index + 1).padStart(2, "0")}</span>
              {item}
            </div>
          ))}
        </div>
        <p>
          Research around Sen Monorom has described clay-rich tropical soils in studied coffee areas, while broader environmental assessments of northeastern Cambodia describe highly weathered red tropical soils across basaltic uplands. These references give context, but OCC does not assume every farm has identical soil.
        </p>
        <p>
          Farm-specific soil evidence is more useful than a generalized color claim because terroir becomes credible when the description gets closer to the actual growing site.
        </p>
      </div>
    ),
  },
  {
    label: "04 / Climate & Seasonality",
    title: "Coffee Grows Through a Cycle",
    content: (
      <div className="space-y-6">
        <p>
          A coffee plant does not experience climate as one annual average. It experiences rainfall, dry periods, heat, cooler nights, wind, flowering conditions, changing soil moisture, fruit development, ripening, and harvest across a seasonal cycle.
        </p>
        <p>
          Research in the Sen Monorom area has documented tropical highland conditions and seasonal coffee development, including flowering toward the end of the dry period and harvest later in the year. Those observations belong to the studied farms and should not be turned into a universal calendar for every Cambodian producer.
        </p>
        <p>
          The useful principle is seasonality. Flowering, fruit set, cherry development, maturation, and harvest happen under different environmental conditions. Understanding terroir means understanding the sequence, not just quoting one annual temperature or rainfall figure.
        </p>
      </div>
    ),
  },
  {
    label: "05 / Shade & Water",
    title: "The Microclimate Around the Coffee Tree",
    content: (
      <div className="space-y-6">
        <p>
          Shade changes the immediate environment surrounding a coffee plant. It can influence solar exposure, temperature, soil moisture, wind, and the broader ecology of a farm.
        </p>
        <p>
          Cambodian Canephora field research has compared shaded and more exposed coffee plots and documented measurable differences in variables such as soil moisture. The value of that research is not a universal claim that shade always improves coffee. It shows that shade can be evaluated as a real farm condition.
        </p>
        <p>
          Water is equally important. Annual rainfall tells only part of the story. At farm level, slope, soil texture, ground cover, organic matter, shade, and drainage all affect how water enters, remains in, and leaves the root environment.
        </p>
        <p>
          Two farms can receive similar rainfall and still behave differently. Terroir is therefore a system of interacting variables, not a checklist of attractive words.
        </p>
      </div>
    ),
  },
  {
    label: "06 / Plant Material",
    title: "Robusta Is Not One Uniform Plant",
    content: (
      <div className="space-y-6">
        <p>
          Much of OCC’s current farm-level work centers on <strong className="font-semibold text-occ-primary">Coffea canephora</strong>, commonly called Robusta. But species alone does not describe all plant differences inside a farm.
        </p>
        <p>
          Planting material can differ in vigor, yield, disease response, maturation behavior, resilience, and sensory potential. OCC therefore separates three levels of description: species, verified variety or clone where known, and quality category only after quality evaluation.
        </p>
        <div className="border-y border-black/10 py-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-occ-secondary">Keep the layers separate</p>
          <p className="mt-4 text-[15px] leading-8 text-black/76">
            <strong className="text-occ-primary">Coffea canephora</strong> describes species. A verified variety or clone describes plant material. <Link href="/fine-robusta-cambodia" className="border-b border-occ-primary/45 font-medium text-occ-primary transition-colors hover:border-occ-secondary">Fine Robusta Cambodia</Link> describes OCC’s quality specialization. They are related, but they are not interchangeable terms.
          </p>
        </div>
      </div>
    ),
  },
  {
    label: "07 / Farm Management",
    title: "Terroir Creates Conditions. Farmers Make Decisions.",
    content: (
      <div className="space-y-6">
        <p>
          Natural conditions matter, but coffee is agriculture. Farm management determines how the plant is cared for within those conditions and how much of the site’s potential reaches harvest.
        </p>
        <div className="grid grid-cols-1 border-l border-t border-black/10 sm:grid-cols-2">
          {["Pruning", "Nutrition", "Weed management", "Shade management", "Soil protection", "Plant health", "Pest and disease management", "Water management", "Harvest timing", "Cherry selection"].map((item, index) => (
            <div key={item} className="border-b border-r border-black/10 p-4 text-sm leading-6 text-black/68">
              <span className="mr-3 text-[9px] tracking-[0.18em] text-occ-secondary">{String(index + 1).padStart(2, "0")}</span>
              {item}
            </div>
          ))}
        </div>
        <p>
          A promising environment does not guarantee a high-quality coffee. The growing environment creates potential; farm management helps determine how much of that potential survives in healthy trees and mature fruit.
        </p>
      </div>
    ),
  },
  {
    label: "08 / Cherry Maturity",
    title: "The Farm’s Last Quality Decision",
    content: (
      <div className="space-y-6">
        <p>
          Before coffee becomes a processing question, it is a fruit. Cherry maturity matters because the condition of the harvested fruit becomes the raw material for every later stage.
        </p>
        <p>
          Selective harvesting of mature cherries can provide a more consistent starting point for processing. Mixed maturity can increase variability before fermentation, drying, sorting, roasting, or brewing even begins.
        </p>
        <p>
          This is where Farm & Terroir deliberately stops. Once the cherry leaves the farm stage, the central questions change from <strong className="font-semibold text-occ-primary">how did it grow?</strong> to <strong className="font-semibold text-occ-primary">how is quality evaluated through processing, physical condition, sensory evidence, traceability, and repeatability?</strong>
        </p>
        <p>
          That next quality layer belongs to <Link href="/fine-robusta-cambodia" className="border-b border-occ-primary/45 font-medium text-occ-primary transition-colors hover:border-occ-secondary">Fine Robusta Cambodia</Link>.
        </p>
      </div>
    ),
  },
]

export default function FarmTerroirPage() {
  const sectionLabelClass = "text-[11px] font-semibold uppercase tracking-[0.22em] text-occ-secondary"
  const sectionTitleClass = "mt-5 max-w-[15ch] font-[var(--font-display)] text-[clamp(2.1rem,7.5vw,3.2rem)] font-normal leading-[0.98] tracking-[-0.035em] text-occ-primary"

  return (
    <div className="origins-text-only bg-occ-background text-occ-primary">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="relative overflow-hidden border-b border-black/10 pt-28 lg:pt-32">
        <div className="pointer-events-none absolute inset-0 hidden grid-cols-12 divide-x divide-black/[0.055] md:grid" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, item) => <div key={item} />)}
        </div>

        <div className="relative w-full px-6 pb-14 pt-6 sm:px-8 md:px-12 lg:px-12 lg:pb-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
            <MotionReveal direction="left" className="md:col-span-3 md:pb-2">
              <Link href="/origins" className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-black/42 transition-colors hover:text-black">
                <ArrowLeft className="size-3" /> Origins
              </Link>
              <p className="mt-10 text-[10px] font-medium uppercase tracking-[0.24em] text-occ-secondary">HOW / GROWING ENVIRONMENT</p>
              <p className="mt-3 text-[9px] uppercase tracking-[0.2em] text-black/34">Origins / 02</p>
            </MotionReveal>

            <MotionReveal className="md:col-span-6 md:col-start-4">
              <h1 className="font-[var(--font-display)] text-[clamp(3rem,5.4vw,5rem)] font-normal leading-[0.94] tracking-[-0.04em]">
                FARM &amp; TERROIR
              </h1>
            </MotionReveal>

            <MotionReveal direction="right" className="md:col-span-3 md:col-start-10 md:pb-2">
              <p className="border-t border-black/10 pt-5 text-[15px] leading-7 text-black/76">
                Soil, elevation, climate, shade, water, plant material and farm decisions shape the environment in which Cambodian coffee grows.
              </p>
            </MotionReveal>
          </div>

          <MotionReveal className="mt-16 grid grid-cols-1 gap-8 border-t border-black/10 pt-10 md:mt-20 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7 md:col-start-4">
              <p className="font-[var(--font-display)] text-[clamp(2.25rem,8vw,3.7rem)] font-normal leading-[0.98] tracking-[-0.04em]">
                Farm conditions, read at ground level — where regional geography becomes a growing environment.
              </p>
            </div>
            <div className="md:col-span-2 md:col-start-11">
              <Link href="/origins/cambodia-regions" className="group inline-flex items-center gap-2 rounded-full bg-occ-primary px-5 py-3 text-[10px] font-medium uppercase tracking-[0.16em] text-occ-background transition-transform duration-300 hover:-translate-y-0.5">
                Cambodia &amp; Regions <ArrowUpRight className="size-3" />
              </Link>
            </div>
          </MotionReveal>
        </div>
      </section>

      <main className="w-full px-6 sm:px-8 md:px-12 lg:px-12">
        <section id="farm-factors" className="border-b border-black/10 py-16 lg:py-24">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <MotionReveal direction="left" className="md:col-span-3">
              <p className={sectionLabelClass}>Farm Environment</p>
              <span className="mt-3 block h-px w-10 bg-occ-secondary" aria-hidden="true" />
              <h2 className={sectionTitleClass}>Read the Farm, Not Just the Region</h2>
              <p className="mt-6 max-w-xs text-sm leading-7 text-black/62">
                The region identifies where a coffee comes from. These farm-scale factors explain how it grew there.
              </p>
            </MotionReveal>

            <div className="md:col-span-9 md:col-start-4">
              <div className="grid grid-cols-1 border-l border-t border-black/10 sm:grid-cols-2">
                {highlights.map((card, index) => (
                  <MotionReveal key={card.title} direction={index % 2 === 0 ? "left" : "right"}>
                    <article className="min-h-[220px] border-b border-r border-black/10 p-6 transition-colors duration-300 hover:bg-occ-background lg:min-h-[250px] lg:p-8">
                      <div className="flex items-start justify-between gap-4">
                        <span className="text-[9px] tracking-[0.2em] text-occ-secondary">{String(index + 1).padStart(2, "0")}</span>
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
                      <span className="mt-3 block h-px w-10 bg-occ-secondary" aria-hidden="true" />
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
              <aside className="sticky top-28 border-t border-black/10 bg-occ-primary px-6 py-7 text-occ-background lg:px-7 lg:py-8">
                <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-white/45">Farm Evidence</p>
                <p className="mt-5 font-[var(--font-display)] text-2xl leading-[1.08] tracking-[-0.025em]">How did this coffee grow here?</p>
                <div className="mt-7">
                  {farmFacts.map((fact, index) => (
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
      </main>
    </div>
  )
}
