import type { Metadata } from "next"
import Link from "next/link"
import { siteName, siteUrl } from "@/lib/siteConfig"
import { pageAlternates, seoDescription, seoTitle } from "@/lib/seo"

const ownerPath = "/origins/single-origin"
const ownerUrl = `${siteUrl}${ownerPath}`
const description = seoDescription(
  "Understand what single-origin Cambodian coffee means, how OCC defines source boundaries, and where to explore Cambodia origin, farm evidence, and Fine Robusta separately.",
)

export const metadata: Metadata = {
  title: seoTitle("Single-Origin Cambodian Coffee | Origin Guide | OCC"),
  description,
  keywords: [
    "single-origin Cambodian coffee",
    "Cambodia coffee origin",
    "Mondulkiri coffee origin",
    "Cambodia-grown coffee",
    "coffee traceability Cambodia",
  ],
  alternates: pageAlternates(ownerPath),
  openGraph: {
    title: "Single-Origin Cambodian Coffee | Origin Guide",
    description,
    url: ownerUrl,
    siteName,
    type: "website",
  },
}

const sourceLayers = [
  ["Country", "Cambodia"],
  ["Region", "Mondulkiri or another named Cambodian region when verified"],
  ["Producer / processor", "Identified when supported by the available records"],
  ["Lot", "Recorded individually where lot-level information is available"],
]

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Single-Origin Cambodian Coffee",
  description,
  url: ownerUrl,
  isPartOf: { "@type": "WebSite", name: siteName, url: siteUrl },
  about: [
    { "@type": "Thing", name: "Single-origin coffee" },
    { "@type": "Place", name: "Cambodia" },
    { "@type": "Place", name: "Mondulkiri, Cambodia" },
  ],
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Origins", item: `${siteUrl}/origins` },
    { "@type": "ListItem", position: 3, name: "Single Origin", item: ownerUrl },
  ],
}

export default function SingleOriginPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="min-h-screen bg-[#f6f3ea] text-[#182019]">
        <div className="mx-auto max-w-[1480px] px-6 sm:px-10 md:px-16">
          <header className="border-b border-black/10 py-24 md:py-32">
            <p className="text-[10px] uppercase tracking-[0.28em] text-black/40">ORIGINS / SINGLE ORIGIN</p>
            <h1 className="mt-8 max-w-6xl font-[var(--font-display)] text-[4.2rem] font-normal leading-[0.86] tracking-[-0.06em] sm:text-[6.5rem] md:text-[8.5rem]">
              <span>Single-Origin</span><br />Cambodian Coffee
            </h1>
            <div className="mt-12 grid max-w-6xl gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
              <h2 className="font-[var(--font-display)] text-3xl font-normal leading-tight tracking-[-0.035em] sm:text-4xl">
                One source boundary.<br />A clearer origin story.
              </h2>
              <div className="max-w-2xl space-y-5 text-base leading-8 text-black/58">
                <p>Single origin describes where a coffee comes from and how clearly that source is defined. It is not another name for Robusta, and it is not a quality grade.</p>
                <p>For OCC, coffee begins in Cambodia — with its growing regions, climate, soils, producers, and a coffee culture developing its own international identity.</p>
                <p className="font-medium text-[#182019]">OCC works exclusively with coffee grown in Cambodia. 100% Cambodia Origin.</p>
              </div>
            </div>
          </header>

          <section className="grid gap-10 border-b border-black/10 py-20 md:grid-cols-[0.8fr_1.2fr] md:py-28 md:gap-20">
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-black/40">01 / Source boundary</p>
              <h2 className="mt-6 font-[var(--font-display)] text-5xl font-normal leading-[0.94] tracking-[-0.05em] sm:text-6xl">What “Single<br />Origin” Means</h2>
            </div>
            <div className="max-w-3xl space-y-6 text-base leading-8 text-black/58">
              <p>Origin is not simply a country name printed on a package. It is the starting point of quality and the boundary used to understand the coffee being evaluated.</p>
              <div className="border-t border-black/10">
                {sourceLayers.map(([label, value]) => (
                  <div key={label} className="grid gap-2 border-b border-black/10 py-5 sm:grid-cols-[0.35fr_0.65fr]">
                    <strong className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#182019]">{label}</strong>
                    <span className="text-sm leading-7 text-black/62">{value}</span>
                  </div>
                ))}
              </div>
              <p>Where information has not yet been verified, OCC leaves the boundary open rather than creating artificial precision.</p>
            </div>
          </section>

          <section className="grid gap-10 border-b border-black/10 py-20 md:grid-cols-[0.8fr_1.2fr] md:py-28 md:gap-20">
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-black/40">02 / Cambodia</p>
              <h2 className="mt-6 font-[var(--font-display)] text-5xl font-normal leading-[0.94] tracking-[-0.05em] sm:text-6xl">Coffee From an<br />Emerging Origin</h2>
            </div>
            <div className="max-w-3xl space-y-6 text-base leading-8 text-black/58">
              <p>Cambodia is still a relatively young origin in the international specialty coffee conversation. Its highland growing regions, tropical climate, red soils, producers, and harvest decisions form the wider context behind each coffee.</p>
              <p>The Cambodia Origin page explains the country-level story without treating every region, farm, lot, or coffee type as identical.</p>
              <Link href="/origins" className="inline-block border-b border-black/35 pb-1 text-[10px] uppercase tracking-[0.2em] text-[#182019]">Explore Cambodia Origin ↗</Link>
            </div>
          </section>

          <section className="grid gap-10 border-b border-black/10 py-20 md:grid-cols-[0.8fr_1.2fr] md:py-28 md:gap-20">
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-black/40">03 / Evidence</p>
              <h2 className="mt-6 font-[var(--font-display)] text-5xl font-normal leading-[0.94] tracking-[-0.05em] sm:text-6xl">From Place<br />to Lot</h2>
            </div>
            <div className="max-w-3xl space-y-6 text-base leading-8 text-black/58">
              <p>Coffee quality begins long before roasting. Farm environment, plant material, weather, harvest decisions, processing, drying, storage, and evaluation all influence what eventually appears in the cup.</p>
              <p className="text-lg tracking-[0.04em] text-black/68">Farm → Harvest → Processing → Drying → Storage → Evaluation</p>
              <p>Farm &amp; Terroir documents the evidence OCC expects to connect with individual coffees as verified origin records expand.</p>
              <Link href="/origins/farm-terroir" className="inline-block border-b border-black/35 pb-1 text-[10px] uppercase tracking-[0.2em] text-[#182019]">Explore Farm &amp; Terroir ↗</Link>
            </div>
          </section>

          <section className="grid gap-10 py-20 md:grid-cols-[0.8fr_1.2fr] md:py-28 md:gap-20">
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-black/40">04 / Coffee type</p>
              <h2 className="mt-6 font-[var(--font-display)] text-5xl font-normal leading-[0.94] tracking-[-0.05em] sm:text-6xl">Origin Is Not<br />a Quality Grade</h2>
            </div>
            <div className="max-w-3xl space-y-6 text-base leading-8 text-black/58">
              <p>A coffee can be single-origin without being Fine Robusta. Fine Robusta is a separate quality-focused framework for evaluating identifiable Coffea canephora coffees through processing, physical condition, sensory evidence, traceability, and repeatability.</p>
              <p>Keeping these pages separate lets visitors understand place first, then evaluate the specific coffee type and quality evidence without collapsing both ideas into one claim.</p>
              <Link href="/fine-robusta-cambodia" className="inline-block border-b border-black/35 pb-1 text-[10px] uppercase tracking-[0.2em] text-[#182019]">Explore Fine Robusta Cambodia ↗</Link>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
