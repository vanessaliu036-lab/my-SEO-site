import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
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
  const wrapClass = "mx-auto w-[calc(100%-40px)] max-w-[1240px] sm:w-[calc(100%-64px)]"
  const eyebrowClass = "text-[10px] font-semibold uppercase tracking-[0.22em] text-[#94454d]"
  const sectionTitleClass = "mt-5 max-w-[14ch] font-[var(--font-display)] text-[clamp(2.25rem,5.2vw,4rem)] font-normal leading-[0.98] tracking-[-0.04em] text-[#25211f]"

  return (
    <div className="bg-[#f5f1ea] text-[#25211f]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes farm-reveal-up { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes farm-reveal-left { from { opacity: 0; transform: translateX(-22px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes farm-reveal-right { from { opacity: 0; transform: translateX(22px); } to { opacity: 1; transform: translateX(0); } }
        .farm-reveal-up { animation: farm-reveal-up .72s cubic-bezier(.22,1,.36,1) both; }
        .farm-reveal-left { animation: farm-reveal-left .72s cubic-bezier(.22,1,.36,1) both; }
        .farm-reveal-right { animation: farm-reveal-right .72s .08s cubic-bezier(.22,1,.36,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .farm-reveal-up, .farm-reveal-left, .farm-reveal-right { animation: none; }
        }
      ` }} />

      <section className="border-b border-[#d8cec5] py-14 sm:py-16 lg:py-20">
        <div className={wrapClass}>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.08fr_.92fr] lg:gap-20">
            <div className="farm-reveal-left max-w-[620px]">
              <p className={eyebrowClass}>ORIGINS / FARM &amp; TERROIR</p>
              <span className="mt-6 block h-px w-12 bg-[#94454d]" aria-hidden="true" />
              <h1 className="mt-7 font-[var(--font-display)] text-[clamp(3.4rem,4.9vw,4.75rem)] font-normal leading-[.9] tracking-[-.055em]">
                Farm conditions.<br /><em className="font-normal text-[#94454d]">Read at ground level.</em>
              </h1>
              <p className="mt-8 max-w-[560px] text-[17px] leading-8 text-[#625b56]">
                Soil, elevation, climate, shade, water, plant material and farm decisions shape the environment in which Cambodian coffee grows.
              </p>
              <a href="#farm-factors" className="mt-7 inline-flex items-center gap-5 border-b border-[#94454d] pb-2 text-[11px] font-semibold uppercase tracking-[.17em] text-[#94454d]">
                Explore the growing environment <span aria-hidden="true">↓</span>
              </a>
            </div>

            <div className="farm-reveal-right">
              <figure className="relative m-0 aspect-[1.05/1] translate-x-0 translate-y-0 bg-[#ded5cd] shadow-[14px_14px_0_#e8dfd7] lg:-translate-y-1">
                <img src="/occ-pages/assets/occ-origin-mondulkiri-farm.webp" alt="Coffee trees and red-earth farm path in the Mondulkiri highlands" className="h-full w-full object-cover" />
                <figcaption className="absolute bottom-5 left-5 bg-[#f5f1ea] px-5 py-3 text-[10px] font-semibold uppercase tracking-[.17em] text-[#25211f]">Farm / Growing environment</figcaption>
              </figure>
            </div>
          </div>

          <div className="farm-reveal-up mt-16 grid gap-8 border-t border-[#d8cec5] pt-9 md:grid-cols-[.65fr_1.35fr] md:items-center lg:mt-20">
            <div className="flex items-end gap-4 text-[#94454d]"><strong className="font-[var(--font-display)] text-[clamp(4.5rem,8vw,7.8rem)] font-normal leading-none tracking-[-.06em]">FARM</strong><span className="pb-3 text-[10px] font-semibold uppercase tracking-[.2em]">Scale<br />evidence</span></div>
            <p className="max-w-[650px] text-[17px] leading-8 text-[#625b56]"><strong className="text-[#25211f]">The region tells us where the coffee comes from.</strong> The farm tells us how it grew there. Terroir becomes useful when the description gets closer to the actual plants, site and agricultural decisions.</p>
          </div>
        </div>
      </section>

      <section id="farm-factors" aria-label="Farm-scale factors" className="border-b border-[#d8cec5] bg-[#eee7df] py-14 lg:py-16">
        <div className={wrapClass}>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <p className={eyebrowClass}>FOLLOW THE FARM</p>
            <p className="font-[var(--font-display)] text-2xl italic text-[#94454d]">Each factor brings the evidence closer.</p>
          </div>
          <div className="mt-8 grid grid-cols-1 border-y border-[#cfc3b9] md:grid-cols-4">
            {highlights.map((card, index) => (
              <div key={card.title}>
                <article className="min-h-[225px] border-b border-[#cfc3b9] px-0 py-7 md:border-b-0 md:border-r md:px-7 md:last:border-r-0">
                  <span className="text-[9px] font-semibold uppercase tracking-[.18em] text-[#94454d]">{String(index + 1).padStart(2, "0")} / {card.meta}</span>
                  <h2 className="mt-7 font-[var(--font-display)] text-[2rem] font-normal leading-none tracking-[-.035em]">{card.title}</h2>
                  <p className="mt-5 text-[14px] leading-7 text-[#6a625d]">{card.text}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main>
        <section className="border-b border-[#d8cec5] py-16 lg:py-24">
          <div className={wrapClass}>
            <div className="grid gap-10 lg:grid-cols-[.84fr_1.16fr] lg:items-center lg:gap-20">
              <figure className="m-0 aspect-[1.25/1] overflow-hidden bg-[#ddd3ca]">
                <img src="/media/mondulkiri-terroir-red-earth-elevation.jpg" alt="Red earth, elevation and coffee-growing landscape in Mondulkiri" className="h-full w-full object-cover" />
                <figcaption className="sr-only">Mondulkiri farm environment and red earth</figcaption>
              </figure>
              <div>
                <p className={eyebrowClass}>FARM-SCALE TERROIR</p>
                <h2 className={sectionTitleClass}>What shapes the growing environment?</h2>
                <p className="mt-7 max-w-[610px] text-[17px] leading-8 text-[#625b56]">This page owns micro growing conditions and agricultural decisions. Regional geography stays on Cambodia &amp; Regions; post-harvest quality evaluation continues on Fine Robusta Cambodia.</p>
                <Link href="/origins/cambodia-regions" className="mt-7 inline-flex border-b border-[#94454d] pb-2 text-[11px] font-semibold uppercase tracking-[.16em] text-[#94454d]">Return to Cambodia &amp; Regions ↗</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#d8cec5] py-8 lg:py-14">
          <div className={wrapClass}>
            <div>
              {sections.map((section, index) => (
                <div key={section.title}>
                  <article className="grid grid-cols-1 border-t border-[#d8cec5] py-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-20 lg:py-16">
                    <div>
                      <p className={eyebrowClass}>{section.label}</p>
                      <span className="mt-4 block h-px w-10 bg-[#94454d]" aria-hidden="true" />
                      <h2 className={sectionTitleClass}>{section.title}</h2>
                    </div>
                    <div className="mt-8 max-w-[650px] text-[16px] leading-8 text-[#625b56] lg:mt-0 [&_a]:border-b [&_a]:border-[#94454d]/60 [&_a]:font-medium [&_a]:text-[#94454d] [&_strong]:font-semibold [&_strong]:text-[#25211f] [&_.border-l-2]:border-[#94454d] [&_.bg-occ-background\/65]:bg-[#eee7df] [&_.text-occ-secondary]:text-[#94454d] [&_.text-occ-primary]:text-[#25211f]">
                      {section.content}
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#d8cec5] bg-[#eee7df] py-16 lg:py-20">
          <div className={wrapClass}>
            <div>
              <p className={eyebrowClass}>A FARM DESCRIPTION SHOULD ANSWER</p>
              <div className="mt-7 grid grid-cols-1 border-y border-[#cfc3b9] sm:grid-cols-2 lg:grid-cols-4">
                {farmFacts.slice(0, 4).map((fact, index) => (
                  <div key={fact} className="border-b border-[#cfc3b9] px-0 py-7 sm:px-6 lg:border-b-0 lg:border-r lg:first:pl-0 lg:last:border-r-0">
                    <span className="text-[2rem] font-normal text-[#94454d]">0{index + 1}</span>
                    <p className="mt-4 text-[15px] leading-7 text-[#625b56]">{fact}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 text-center lg:py-28">
          <div className={`${wrapClass} flex flex-col items-center`}>
            <p className={eyebrowClass}>FROM FARM TO CUP</p>
            <h2 className="mt-7 max-w-[950px] font-[var(--font-display)] text-[clamp(2.9rem,6vw,5.4rem)] font-normal leading-[.95] tracking-[-.05em]">Growing potential becomes meaningful when the coffee is evaluated.</h2>
            <p className="mt-7 max-w-[720px] text-[17px] leading-8 text-[#625b56]">Continue with OCC&apos;s Fine Robusta work to understand processing, physical condition, sensory evidence, traceability and repeatability.</p>
            <Link href="/fine-robusta-cambodia" className="mt-8 inline-flex items-center gap-3 bg-[#94454d] px-6 py-4 text-[11px] font-semibold uppercase tracking-[.17em] text-[#f5f1ea] transition-transform hover:-translate-y-0.5">Explore Fine Robusta <ArrowUpRight className="size-4" /></Link>
          </div>
        </section>
      </main>
    </div>
  )
}
