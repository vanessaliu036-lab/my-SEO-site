import type { Metadata } from "next"
import Link from "next/link"
import { siteName, siteUrl } from "@/lib/siteConfig"
import { pageAlternates, seoDescription, seoTitle } from "@/lib/seo"

const ownerPath = "/origins/single-origin"
const ownerUrl = `${siteUrl}${ownerPath}`
const description = seoDescription(
  "What single-origin coffee in Cambodia means: geographic specificity, producer and processor records, lot identity, traceability, lot separation, and sample-to-shipment verification.",
)

export const metadata: Metadata = {
  title: seoTitle("Single-Origin Coffee in Cambodia | Traceability & Lot Identity | OCC"),
  description,
  keywords: [
    "single-origin coffee Cambodia",
    "Cambodia single-origin coffee",
    "coffee traceability Cambodia",
    "coffee lot identity",
    "Cambodia coffee lot traceability",
    "producer processor coffee records",
  ],
  alternates: pageAlternates(ownerPath),
  openGraph: {
    title: "Single-Origin Coffee in Cambodia | Traceability & Lot Identity",
    description,
    url: ownerUrl,
    siteName,
    type: "website",
  },
}

const sourceLayers = [
  ["Country", "Cambodia"],
  ["Geographic specificity", "Region, district, farm, or other source level only when that boundary is verified"],
  ["Producer / processor", "Named when supported by available production or processing records"],
  ["Lot identity", "A distinct lot code or documented production unit where lot-level information is available"],
  ["Process / harvest", "Processing method and harvest timing are stated only when the records support them"],
]

const traceabilityControls = [
  ["Geographic specificity", "OCC stops the origin claim at the highest source level that can be supported. A country claim is not automatically presented as a farm claim."],
  ["Producer / processor identity", "Producer and processor names are connected to a coffee only when the available records support that relationship."],
  ["Lot separation", "Where lot-level sourcing is available, each lot should remain identifiable through storage, sample evaluation, and commercial review rather than being treated as an anonymous origin blend."],
  ["Traceability chain", "The preferred evidence path is region → producer or processor → lot → process → sample → shipment. Missing fields remain unclaimed until verified."],
  ["Sample-to-shipment identity", "Offer or pre-shipment samples should be tied back to the identified lot so the coffee approved by a buyer can be compared with the coffee prepared for shipment."],
]

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Single-Origin Coffee in Cambodia",
  description,
  url: ownerUrl,
  isPartOf: { "@type": "WebSite", name: siteName, url: siteUrl },
  about: [
    { "@type": "Thing", name: "Single-origin coffee" },
    { "@type": "Thing", name: "Coffee traceability" },
    { "@type": "Thing", name: "Coffee lot identity" },
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
              <span>Single-Origin Coffee</span><br />in Cambodia
            </h1>
            <div className="mt-12 grid max-w-6xl gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
              <h2 className="font-[var(--font-display)] text-3xl font-normal leading-tight tracking-[-0.035em] sm:text-4xl">
                One source boundary.<br />One identifiable coffee.
              </h2>
              <div className="max-w-2xl space-y-5 text-base leading-8 text-black/58">
                <p>Single origin describes how specifically a coffee can be connected to one source boundary. It is not another name for Robusta, and it is not a quality grade.</p>
                <p>For OCC, the useful question is not simply whether a bag says “Cambodia.” It is how far the source can be verified: country, region, producer or processor, lot, process, sample, and eventually the commercial shipment.</p>
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
              <p>Origin is not simply a country name printed on a package. It is the boundary used to understand which coffee is being evaluated and which claims can be supported.</p>
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
              <p className="text-[10px] uppercase tracking-[0.24em] text-black/40">02 / Geographic specificity</p>
              <h2 className="mt-6 font-[var(--font-display)] text-5xl font-normal leading-[0.94] tracking-[-0.05em] sm:text-6xl">From Cambodia<br />to a Named Place</h2>
            </div>
            <div className="max-w-3xl space-y-6 text-base leading-8 text-black/58">
              <p>Cambodia is the fixed national origin for OCC. Within that boundary, a coffee may become more specific when evidence supports a named region, producer group, processor, farm, or lot.</p>
              <p>Mondulkiri is central to Cambodia’s current specialty-coffee story, but the region name should not be applied automatically to every Cambodian coffee. Geographic specificity is useful only when it remains verifiable.</p>
              <Link href="/origins" className="inline-block border-b border-black/35 pb-1 text-[10px] uppercase tracking-[0.2em] text-[#182019]">Explore Cambodia Origin ↗</Link>
            </div>
          </section>

          <section className="grid gap-10 border-b border-black/10 py-20 md:grid-cols-[0.8fr_1.2fr] md:py-28 md:gap-20">
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-black/40">03 / Producer & lot</p>
              <h2 className="mt-6 font-[var(--font-display)] text-5xl font-normal leading-[0.94] tracking-[-0.05em] sm:text-6xl">Identity Before<br />Storytelling</h2>
            </div>
            <div className="max-w-3xl space-y-6 text-base leading-8 text-black/58">
              <p>A producer or processor name is useful only when it can be connected to the coffee being described. The same principle applies to lot identity: a lot should represent an identifiable production unit, not simply a marketing label added after the fact.</p>
              <p>Lot identity creates the bridge between origin information and quality evaluation. It allows processing data, physical analysis, cupping results, samples, and buyer decisions to refer to the same coffee.</p>
              <Link href="/origins/farm-terroir" className="inline-block border-b border-black/35 pb-1 text-[10px] uppercase tracking-[0.2em] text-[#182019]">Explore Farm &amp; Terroir ↗</Link>
            </div>
          </section>

          <section className="grid gap-10 border-b border-black/10 py-20 md:grid-cols-[0.8fr_1.2fr] md:py-28 md:gap-20">
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-black/40">04 / Traceability</p>
              <h2 className="mt-6 font-[var(--font-display)] text-5xl font-normal leading-[0.94] tracking-[-0.05em] sm:text-6xl">Keep the Coffee<br />Identifiable</h2>
            </div>
            <div className="max-w-3xl space-y-6 text-base leading-8 text-black/58">
              <p>Traceability is useful when the coffee remains identifiable as it moves from origin records into sampling and commercial evaluation. The objective is not to create more claims. It is to reduce ambiguity.</p>
              <div className="border-t border-black/10">
                {traceabilityControls.map(([label, value]) => (
                  <div key={label} className="grid gap-2 border-b border-black/10 py-5 sm:grid-cols-[0.35fr_0.65fr]">
                    <strong className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#182019]">{label}</strong>
                    <span className="text-sm leading-7 text-black/62">{value}</span>
                  </div>
                ))}
              </div>
              <p className="text-lg tracking-[0.04em] text-black/68">Origin → Producer / Processor → Lot → Process → Sample → Shipment</p>
            </div>
          </section>

          <section className="grid gap-10 py-20 md:grid-cols-[0.8fr_1.2fr] md:py-28 md:gap-20">
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-black/40">05 / Coffee type</p>
              <h2 className="mt-6 font-[var(--font-display)] text-5xl font-normal leading-[0.94] tracking-[-0.05em] sm:text-6xl">Origin Is Not<br />a Quality Grade</h2>
            </div>
            <div className="max-w-3xl space-y-6 text-base leading-8 text-black/58">
              <p>A coffee can be single-origin without being Fine Robusta. Fine Robusta is a separate quality-focused framework for evaluating identifiable Coffea canephora coffees through processing, physical condition, sensory evidence, traceability, and repeatability.</p>
              <p>Keeping the two pages separate prevents the broad Fine Robusta Cambodia query from competing with Single-Origin intent. This page owns source definition, lot identity, and traceability; the Fine Robusta page owns the Cambodia-level Fine Robusta quality topic.</p>
              <Link href="/fine-robusta-cambodia" className="inline-block border-b border-black/35 pb-1 text-[10px] uppercase tracking-[0.2em] text-[#182019]">Explore Fine Robusta Cambodia ↗</Link>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
