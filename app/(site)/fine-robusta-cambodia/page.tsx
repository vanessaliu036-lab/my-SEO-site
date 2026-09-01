import type { Metadata } from "next"
import Link from "next/link"
import { siteName, siteUrl } from "@/lib/siteConfig"
import { pageAlternates, seoDescription, seoTitle } from "@/lib/seo"

const ownerPath = "/fine-robusta-cambodia"
const ownerUrl = `${siteUrl}${ownerPath}`
const description = seoDescription(
  "Evidence-led guide to Fine Robusta Cambodia: Mondulkiri, documented quality references, processing, buyer verification, traceability, and sourcing context."
)

export const metadata: Metadata = {
  title: seoTitle("Fine Robusta Cambodia: Quality, Mondulkiri & Sourcing | OCC"),
  description,
  keywords: [
    "Fine Robusta Cambodia",
    "Cambodia Fine Robusta",
    "Cambodia Robusta",
    "Mondulkiri coffee",
    "Coffea canephora Cambodia",
    "Fine Robusta sourcing",
    "Cambodia green coffee",
  ],
  alternates: pageAlternates("/fine-robusta-cambodia"),
  openGraph: {
    title: "Fine Robusta Cambodia: Quality, Mondulkiri & Sourcing",
    description,
    url: ownerUrl,
    siteName,
    type: "article",
  },
}

const buyerChecks = [
  "Lot identity: region, producer or supplier group where available, harvest period, process, lot code, and available quantity.",
  "Physical condition: moisture, odor, visible defects, foreign matter, preparation, storage condition, and the method used for any measurement.",
  "Sensory evidence: the protocol, evaluation date, sample identity, evaluator context, and descriptive cup observations—not a score in isolation.",
  "Sample representativeness: whether the approved sample is an offer sample, contract sample, pre-shipment sample, or a sample drawn from the prepared commercial lot.",
  "Repeatability: how cherry selection, processing, drying, storage, final preparation, and replacement-lot approval are controlled across shipments.",
]

const qualitySystem = [
  "Cherry maturity and raw-material selection",
  "Transparent processing and fermentation records",
  "Controlled drying and moisture stability",
  "Physical preparation and defect control",
  "Robusta-appropriate sensory evaluation",
  "Traceability from sample to commercial lot",
]

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Fine Robusta Cambodia: Quality, Mondulkiri & Sourcing",
  description,
  url: ownerUrl,
  mainEntityOfPage: { "@type": "WebPage", "@id": ownerUrl },
  author: { "@type": "Organization", name: siteName, url: siteUrl },
  publisher: { "@type": "Organization", name: siteName, url: siteUrl },
  about: [
    { "@type": "Thing", name: "Fine Robusta" },
    { "@type": "Thing", name: "Coffea canephora" },
    { "@type": "Place", name: "Cambodia" },
    { "@type": "Place", name: "Mondulkiri, Cambodia" },
  ],
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Fine Robusta Cambodia", item: ownerUrl },
  ],
}

export default function FineRobustaCambodiaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="min-h-screen bg-white text-stone-950">
        <nav className="border-b border-stone-200 bg-white">
          <div className="mx-auto flex max-w-5xl items-center gap-2 px-5 py-3 text-[10px] uppercase tracking-[0.16em] text-stone-400 sm:px-8 sm:text-[11px]">
            <Link href="/" className="transition-colors hover:text-stone-950">Home</Link>
            <span>/</span>
            <span className="text-stone-700">Fine Robusta Cambodia</span>
          </div>
        </nav>

        <main className="mx-auto max-w-5xl px-5 py-12 sm:px-8 md:py-16">
          <article className="mx-auto max-w-[760px]">
            <header className="mb-12 border-b border-stone-200 pb-10">
              <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.28em] text-stone-500">Core Owner Guide · Cambodia</p>
              <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-stone-950 sm:text-5xl">
                Fine Robusta Cambodia
              </h1>
              <p className="mt-6 max-w-2xl border-l border-stone-950 pl-5 text-base leading-8 text-stone-600 sm:text-lg">
                Cambodia’s Fine Robusta opportunity is strongest when origin, processing, physical preparation, sensory evidence, traceability, and repeatability are evaluated together. This page is OCC’s central reference for the topic.
              </p>
            </header>

            <section className="space-y-5 text-[15px] leading-[1.8] text-stone-700 sm:text-base">
              <h2 className="text-2xl font-semibold tracking-tight text-stone-950">What does Fine Robusta Cambodia mean?</h2>
              <p>
                Fine Robusta Cambodia refers to quality-focused <em>Coffea canephora</em> produced in Cambodia and evaluated at the level of a specific coffee sample or lot. The phrase should not be used as an automatic grade for a country, province, farm, variety, or supplier.
              </p>
              <p>
                For buyers, the useful distinction is operational. A credible Fine Robusta offer should connect a real lot to harvest information, processing records, physical condition, sensory evaluation, sample control, commercial quantity, and a repeatable quality system. Species and origin create context; they do not replace evidence.
              </p>
            </section>

            <section className="mt-12 border-t border-stone-200 pt-10">
              <h2 className="text-2xl font-semibold tracking-tight text-stone-950">Why Mondulkiri is the clearest evidence base</h2>
              <div className="mt-5 space-y-5 text-[15px] leading-[1.8] text-stone-700 sm:text-base">
                <p>
                  Mondulkiri is currently the strongest documented geographic anchor for Cambodia’s quality-focused Canephora development. Field research around Sen Monorom, farmer programs, processing investment, harvest training, and public quality references give the province a more concrete evidence base than broad claims about a single national terroir.
                </p>
                <p>
                  That does not mean every Mondulkiri coffee is Fine Robusta. The relevant question is whether a particular lot can show the production, processing, physical, sensory, and traceability evidence required for the buyer’s intended use.
                </p>
                <p>
                  For the wider origin and agronomy context, read the <Link href="/blog/cambodia-specialty-robusta-coffee-guide" className="border-b border-stone-300 text-stone-950 hover:border-stone-950">Robusta Cambodia origin guide</Link>.
                </p>
              </div>
            </section>

            <section className="mt-12 border-t border-stone-200 pt-10">
              <h2 className="text-2xl font-semibold tracking-tight text-stone-950">A documented Cambodia quality reference</h2>
              <div className="mt-5 space-y-5 text-[15px] leading-[1.8] text-stone-700 sm:text-base">
                <p>
                  Coffee Quality Institute’s public record for Q Certified Robusta Sample 939618 documents a Cambodia sample at 80.50 points. The record identifies KOFI, harvest 2023/2024, TR4 planting material, Dry Ferment processing, 700 metres altitude, and lot K001. It is useful because the claim is tied to an identifiable sample rather than generalized to an entire origin.
                </p>
                <p>
                  Historical Q Robusta records should be read in the context of the protocol and program in force at the time of evaluation. A historical result remains evidence for that sample; it is not a permanent grade for later harvests or unrelated commercial lots.
                </p>
                <p>
                  See OCC’s <Link href="/blog/fine-robusta-grading-standards-cqi-certification-for-cambodia" className="border-b border-stone-300 text-stone-950 hover:border-stone-950">Fine Robusta grading guide</Link> for the distinction between historical CQI records and the current quality-evaluation landscape.
                </p>
              </div>
            </section>

            <section className="mt-12 border-t border-stone-200 pt-10">
              <h2 className="text-2xl font-semibold tracking-tight text-stone-950">Six controls that make the quality claim useful</h2>
              <ol className="mt-6 space-y-4 pl-6 text-[15px] leading-[1.75] text-stone-700 sm:text-base">
                {qualitySystem.map((item) => <li key={item} className="list-decimal pl-2">{item}</li>)}
              </ol>
              <p className="mt-6 text-[15px] leading-[1.8] text-stone-700 sm:text-base">
                No single fermentation technique, altitude number, cup descriptor, or certification phrase can substitute for this chain. Fine Robusta becomes commercially credible when the coffee represented by the sample can be identified, evaluated, purchased, delivered, and compared again.
              </p>
            </section>

            <section className="mt-12 border-t border-stone-200 pt-10">
              <h2 className="text-2xl font-semibold tracking-tight text-stone-950">What a buyer should verify before sourcing</h2>
              <ol className="mt-6 space-y-4 pl-6 text-[15px] leading-[1.75] text-stone-700 sm:text-base">
                {buyerChecks.map((item) => <li key={item} className="list-decimal pl-2">{item}</li>)}
              </ol>
              <p className="mt-6 text-[15px] leading-[1.8] text-stone-700 sm:text-base">
                This verification framework matters whether the coffee is intended for espresso, milk beverages, a blend, single-origin retail, or another application. Product testing should follow the actual use case rather than an assumption that all Canephora behaves the same way.
              </p>
            </section>

            <section className="mt-12 border-t border-stone-200 pt-10">
              <h2 className="text-2xl font-semibold tracking-tight text-stone-950">Processing, brewing, and sensory interpretation</h2>
              <div className="mt-5 space-y-5 text-[15px] leading-[1.8] text-stone-700 sm:text-base">
                <p>
                  Processing can create meaningful differences in aroma, sweetness, fruit expression, body, bitterness quality, and finish. Those differences should be documented rather than hidden behind vague terms such as “experimental.” For advanced processing, buyers should ask what was actually done and which additions, inoculations, infusions, or fermentation controls were used when relevant.
                </p>
                <p>
                  Brewing variables also matter. Water chemistry, grinder distribution, agitation, extraction, roast development, and resting time can change how a Fine Robusta lot presents. Crema and body can be useful espresso characteristics, but neither is a quality score by itself.
                </p>
              </div>
            </section>

            <section className="mt-12 border-t border-stone-200 pt-10">
              <h2 className="text-2xl font-semibold tracking-tight text-stone-950">Primary evidence and related OCC research</h2>
              <ul className="mt-6 space-y-4 text-[15px] leading-[1.75] text-stone-700 sm:text-base">
                <li><a href="https://database.coffeeinstitute.org/api/coffee/939618/pdf" target="_blank" rel="noopener noreferrer" className="border-b border-stone-300 text-stone-950 hover:border-stone-950">Coffee Quality Institute — Q Certified Robusta Sample 939618</a></li>
                <li><a href="https://www.snv.org/library/business-case-spotlight-kofi" target="_blank" rel="noopener noreferrer" className="border-b border-stone-300 text-stone-950 hover:border-stone-950">SNV — Business case spotlight: KOFI</a></li>
                <li><Link href="/blog/cambodia-specialty-robusta-coffee-guide" className="border-b border-stone-300 text-stone-950 hover:border-stone-950">OCC — Robusta Cambodia: origin, growing conditions, and quality evidence</Link></li>
                <li><Link href="/blog/fine-robusta-grading-standards-cqi-certification-for-cambodia" className="border-b border-stone-300 text-stone-950 hover:border-stone-950">OCC — Fine Robusta grading in 2026</Link></li>
                <li><Link href="/blog" className="border-b border-stone-300 text-stone-950 hover:border-stone-950">OCC Research Journal — processing, brewing, sensory, sourcing, and Cambodia research</Link></li>
              </ul>
            </section>

            <footer className="mt-14 border-t border-stone-200 pt-8 text-sm leading-7 text-stone-500">
              <p>
                Editorial rule: OCC treats Fine Robusta as a lot-level quality and evidence question. New records, standards, and origin data should update this central guide without changing its stable owner URL.
              </p>
            </footer>
          </article>
        </main>
      </div>
    </>
  )
}
