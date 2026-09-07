import type { Metadata } from "next"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Farm & Terroir | Mondulkiri Coffee Origin | OCC",
  description: "The soil, farm environment, agricultural decisions, and traceability behind Cambodian coffee.",
  alternates: pageAlternates("/origins/farm-terroir"),
  openGraph: {
    title: "Farm & Terroir | Mondulkiri Coffee Origin | OCC",
    description: "Where coffee quality begins: place, soil, farming, and evidence.",
    url: `${siteUrl}/origins/farm-terroir`,
    type: "article",
  },
}

const conditions = ["Highland terrain", "Seasonal rainfall", "Tropical climate", "Cooler conditions at elevation", "Agricultural land", "Distinctive red soils"]
const soilFactors = ["Drainage", "Water availability", "Organic matter", "Root development", "Farm management", "Shade", "Rainfall", "Temperature"]
const farmRecords = ["Country — Cambodia", "Region — Mondulkiri / lot specific", "Farm / Producer — Lot specific", "Variety — Lot specific", "Elevation — Verified where available", "Harvest — Lot specific", "Processing — Lot specific", "Drying — Lot specific", "Lot — Recorded individually", "Moisture — Recorded where tested", "Cupping — Lot-specific evaluation", "Traceability — Verified according to available records"]

export default function FarmTerroirPage() {
  return (
    <main className="min-h-screen bg-[#f6f3ea] text-[#182019]">
      <div className="mx-auto max-w-[1480px] px-6 sm:px-10 md:px-16">
        <header className="border-b border-black/10 py-24 md:py-32"><p className="text-[10px] uppercase tracking-[0.28em] text-black/40">ORIGINS / MONDULKIRI</p><h1 className="mt-8 max-w-6xl font-[var(--font-display)] text-[4.5rem] font-normal leading-[0.86] tracking-[-0.06em] sm:text-[6.8rem] md:text-[9rem]">FARM &<br />TERROIR</h1><div className="mt-12 grid max-w-6xl gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-20"><h2 className="font-[var(--font-display)] text-3xl font-normal leading-tight tracking-[-0.035em] sm:text-4xl">Where Coffee Quality Begins</h2><div className="max-w-2xl space-y-5 text-base leading-8 text-black/58"><p>Coffee quality begins long before roasting. It begins with place.</p><p>The farm environment, coffee plant, soil, weather, harvest decisions, and post-harvest handling all influence what eventually appears in the cup.</p><p>For OCC, understanding Cambodian coffee means understanding where it comes from.</p></div></div></header>

        <section className="grid gap-10 border-b border-black/10 py-20 md:grid-cols-[0.8fr_1.2fr] md:py-28 md:gap-20"><div><p className="text-[10px] uppercase tracking-[0.24em] text-black/40">01 / Mondulkiri Highlands</p><h2 className="mt-6 font-[var(--font-display)] text-5xl font-normal leading-[0.94] tracking-[-0.05em] sm:text-6xl">The Growing<br />Environment</h2></div><div className="max-w-3xl space-y-6 text-base leading-8 text-black/58"><p>Mondulkiri forms an important part of Cambodia’s developing coffee landscape. Compared with much of Cambodia’s lowland geography, its upland environment provides different growing conditions for coffee.</p><p>The region combines:</p><div className="grid grid-cols-2 border-y border-black/10 text-sm text-black/68 sm:grid-cols-3">{conditions.map((item) => <div key={item} className="border-b border-r border-black/10 px-4 py-4">{item}</div>)}</div><p>But terroir is not a guarantee of quality. It creates the environment. The producer determines what happens within it.</p></div></section>

        <section className="grid gap-10 border-b border-black/10 py-20 md:grid-cols-[0.8fr_1.2fr] md:py-28 md:gap-20"><div><p className="text-[10px] uppercase tracking-[0.24em] text-black/40">02 / Soil</p><h2 className="mt-6 font-[var(--font-display)] text-5xl font-normal leading-[0.94] tracking-[-0.05em] sm:text-6xl">Cambodia’s<br />Red Earth</h2></div><div className="max-w-3xl space-y-6 text-base leading-8 text-black/58"><p>Red lateritic soil is a visible feature across parts of Mondulkiri. These soils form within a tropical environment and are part of the physical landscape in which coffee is cultivated.</p><p>For coffee, soil interacts with many other variables:</p><div className="grid grid-cols-2 border-y border-black/10 text-sm text-black/68 sm:grid-cols-4">{soilFactors.map((item) => <div key={item} className="border-b border-r border-black/10 px-4 py-4">{item}</div>)}</div><p>OCC does not use soil as a simplified marketing claim. We document it as one component of the coffee’s origin.</p></div></section>

        <section className="grid gap-10 border-b border-black/10 py-20 md:grid-cols-[0.8fr_1.2fr] md:py-28 md:gap-20"><div><p className="text-[10px] uppercase tracking-[0.24em] text-black/40">03 / The farm</p><h2 className="mt-6 font-[var(--font-display)] text-5xl font-normal leading-[0.94] tracking-[-0.05em] sm:text-6xl">Coffee Is<br />Agricultural</h2></div><div className="max-w-3xl space-y-6 text-base leading-8 text-black/58"><p>Every cup begins with agricultural decisions. Farm management can influence plant health, cherry development, and harvest quality.</p><div className="space-y-5 border-y border-black/10 py-6 text-sm leading-7 text-black/68"><p><strong className="text-[#182019]">Coffee Variety</strong><br />Different plant material can influence yield, resilience, and sensory potential.</p><p><strong className="text-[#182019]">Cherry Ripeness</strong><br />Selective harvesting of ripe cherries creates a stronger foundation for quality processing.</p><p><strong className="text-[#182019]">Harvest Timing</strong><br />Harvest conditions affect maturity and post-harvest handling.</p><p><strong className="text-[#182019]">Farm Management</strong><br />Pruning, nutrition, shade, soil management, and plant health all affect production.</p></div><p>From farmer to processing, a coffee can move through: Producer → Cherry Collection → Processing → Drying → Milling → Storage.</p></div></section>

        <section className="grid gap-10 border-b border-black/10 py-20 md:grid-cols-[0.8fr_1.2fr] md:py-28 md:gap-20"><div><p className="text-[10px] uppercase tracking-[0.24em] text-black/40">04 / Farm data</p><h2 className="mt-6 font-[var(--font-display)] text-5xl font-normal leading-[0.94] tracking-[-0.05em] sm:text-6xl">Evidence<br />Before Precision</h2></div><div className="max-w-3xl space-y-6 text-base leading-8 text-black/58"><p>As our origin records expand, individual coffee lots will be connected to verified information where available.</p><div className="grid border-y border-black/10 sm:grid-cols-2">{farmRecords.map((record) => <div key={record} className="border-b border-r border-black/10 px-4 py-4 text-sm text-black/68">{record}</div>)}</div><p>We publish farm data when it can be supported by actual records. Where information has not yet been verified, we prefer to leave it open rather than create artificial precision.</p></div></section>

        <section className="py-20 md:py-28"><p className="text-[10px] uppercase tracking-[0.24em] text-black/40">05 / People behind the origin</p><h2 className="mt-8 max-w-5xl font-[var(--font-display)] text-5xl font-normal leading-[0.92] tracking-[-0.055em] sm:text-7xl">THE ANSWERS SHOULD<br />COME FROM EVIDENCE.</h2><div className="mt-10 grid max-w-5xl gap-8 text-base leading-8 text-black/58 md:grid-cols-2"><p>A coffee origin is not only geography. It is also the people who grow, collect, process, dry, sort, and prepare the coffee.</p><p>We believe an origin becomes stronger when buyers and customers can understand where it was grown, who handled it, how it was processed, how it was evaluated, and what it tastes like.</p></div></section>
      </div>
    </main>
  )
}
