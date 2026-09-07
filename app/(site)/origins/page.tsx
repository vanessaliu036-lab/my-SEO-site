import Link from "next/link"
import type { Metadata } from "next"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Cambodia Origin | Coffee From an Emerging Origin | OCC",
  description: "Cambodia-grown coffee, Mondulkiri highlands, red earth, Robusta, and the chain from origin to cup.",
  alternates: pageAlternates("/origins"),
  openGraph: {
    title: "Cambodia Origin | Coffee From an Emerging Origin | OCC",
    description: "OCC works exclusively with coffee grown in Cambodia.",
    url: `${siteUrl}/origins`,
    type: "website",
  },
}

const factors = ["Elevation", "Temperature", "Rainfall", "Soil", "Coffee variety", "Farm management", "Cherry ripeness", "Harvest timing", "Processing"]
const identityPoints = ["Cambodia-grown coffee", "Mondulkiri origin", "Fine Robusta", "Processing transparency", "Quality evaluation", "Traceability", "Consistent roasting", "Clear origin storytelling"]

export default function OriginsPage() {
  return (
    <main className="min-h-screen bg-[#f6f3ea] text-[#182019]">
      <div className="mx-auto max-w-[1480px] px-6 sm:px-10 md:px-16">
        <header className="border-b border-black/10 py-24 md:py-32">
          <p className="text-[10px] uppercase tracking-[0.28em] text-black/40">ORIGINS / CAMBODIA</p>
          <h1 className="mt-8 max-w-6xl font-[var(--font-display)] text-[4.5rem] font-normal leading-[0.86] tracking-[-0.06em] sm:text-[6.8rem] md:text-[9rem]">CAMBODIA<br />ORIGIN</h1>
          <div className="mt-12 grid max-w-6xl gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
            <h2 className="font-[var(--font-display)] text-3xl font-normal leading-tight tracking-[-0.035em] sm:text-4xl">Coffee From an Emerging Origin</h2>
            <div className="max-w-2xl space-y-5 text-base leading-8 text-black/58"><p>Cambodia is still a relatively young origin in the international specialty coffee conversation.</p><p>For OCC, that is precisely what makes it important. Our coffee begins in Cambodia — with its highland growing regions, tropical climate, red soils, producers, and a coffee culture that is still developing its own international identity.</p><p className="font-medium text-[#182019]">OCC works exclusively with coffee grown in Cambodia.<br />100% Cambodia Origin.</p></div>
          </div>
        </header>

        <section className="grid gap-10 border-b border-black/10 py-20 md:grid-cols-[0.8fr_1.2fr] md:py-28 md:gap-20"><div><p className="text-[10px] uppercase tracking-[0.24em] text-black/40">01 / Mondulkiri</p><h2 className="mt-6 font-[var(--font-display)] text-5xl font-normal leading-[0.94] tracking-[-0.05em] sm:text-6xl">Cambodia’s<br />Coffee Highlands</h2></div><div className="max-w-3xl space-y-6 text-base leading-8 text-black/58"><p>Mondulkiri, in eastern Cambodia, is one of the country’s most important coffee-growing regions.</p><p>Its higher elevation, cooler conditions, and agricultural landscape create an environment distinct from Cambodia’s lowland areas.</p><p>Coffee grown here is shaped by several factors:</p><div className="grid grid-cols-2 border-y border-black/10 text-sm text-black/68 sm:grid-cols-3">{factors.map((factor) => <div key={factor} className="border-b border-r border-black/10 px-4 py-4">{factor}</div>)}</div><p>These factors together influence the final character of the coffee. For OCC, origin is not simply a country name printed on a package. It is the starting point of quality.</p></div></section>

        <section className="grid gap-10 border-b border-black/10 py-20 md:grid-cols-[0.8fr_1.2fr] md:py-28 md:gap-20"><div><p className="text-[10px] uppercase tracking-[0.24em] text-black/40">02 / Red earth</p><h2 className="mt-6 font-[var(--font-display)] text-5xl font-normal leading-[0.94] tracking-[-0.05em] sm:text-6xl">The Landscape<br />Behind the Coffee</h2></div><div className="max-w-3xl space-y-6 text-base leading-8 text-black/58"><p>Parts of Mondulkiri are known for their distinctive red lateritic soils.</p><p>Soil alone does not determine coffee quality, but it forms part of a larger growing environment that includes climate, altitude, plant health, and agricultural practices.</p><p>Understanding these conditions helps us understand why coffee from one place can behave differently from coffee grown elsewhere. Our objective is to document these relationships more clearly as Cambodia’s coffee sector develops.</p></div></section>

        <section className="grid gap-10 border-b border-black/10 py-20 md:grid-cols-[0.8fr_1.2fr] md:py-28 md:gap-20"><div><p className="text-[10px] uppercase tracking-[0.24em] text-black/40">03 / Robusta</p><h2 className="mt-6 font-[var(--font-display)] text-5xl font-normal leading-[0.94] tracking-[-0.05em] sm:text-6xl">Robusta<br />in Cambodia</h2></div><div className="max-w-3xl space-y-6 text-base leading-8 text-black/58"><p>Robusta has long been part of coffee production across Southeast Asia. But not all Robusta is the same.</p><p>Differences in cherry selection, harvesting, processing, drying, storage, and roasting can create very different cup results.</p><p>Instead of treating Robusta only as a commodity ingredient, OCC focuses on identifying and developing higher-quality Cambodian Robusta with greater clarity, cleanliness, and consistency.</p><p className="font-[var(--font-display)] text-3xl leading-tight tracking-[-0.03em] text-[#182019]">This is the foundation of our work with Fine Robusta Cambodia.</p></div></section>

        <section className="border-b border-black/10 py-20 md:py-28"><p className="text-[10px] uppercase tracking-[0.24em] text-black/40">04 / From origin to cup</p><h2 className="mt-8 max-w-4xl font-[var(--font-display)] text-5xl font-normal leading-[0.92] tracking-[-0.055em] sm:text-7xl">QUALITY IS A<br />CHAIN OF DECISIONS.</h2><p className="mt-10 text-lg tracking-[0.06em] text-black/65">Farm → Harvest → Cherry Selection → Processing → Drying → Storage → Roasting → Brewing</p><p className="mt-8 max-w-3xl text-base leading-8 text-black/58">Weakness at any stage can affect the final cup. For this reason, OCC looks beyond roast level or packaging. We are interested in how the coffee was grown, harvested, processed, and prepared before it reaches the customer.</p></section>

        <section className="py-20 md:py-28"><div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-20"><div><p className="text-[10px] uppercase tracking-[0.24em] text-black/40">05 / Identity</p><h2 className="mt-6 font-[var(--font-display)] text-5xl font-normal leading-[0.94] tracking-[-0.05em] sm:text-6xl">A Cambodian<br />Coffee Identity</h2></div><div className="max-w-3xl space-y-6 text-base leading-8 text-black/58"><p>Cambodian coffee does not need to imitate another origin. Its value comes from developing a clearer identity of its own.</p><p>Our role is to help make that identity easier to understand through:</p><div className="grid border-y border-black/10 sm:grid-cols-2">{identityPoints.map((point) => <div key={point} className="border-b border-r border-black/10 px-4 py-4 text-sm text-black/68">{point}</div>)}</div><p>Cambodia is still building its position in the global coffee market. OCC intends to grow with it.</p><Link href="/fine-robusta-cambodia" className="inline-block border-b border-black/35 pb-1 text-[10px] uppercase tracking-[0.2em] text-[#182019]">Explore Cambodia Fine Robusta ↗</Link></div></div></section>
      </div>
    </main>
  )
}
