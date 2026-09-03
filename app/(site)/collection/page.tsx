import Link from "next/link"
import type { Metadata } from "next"
import { CollectionPackageStage } from "@/components/ui/collection-package-stage"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Mondulkiri Single Origin Coffee | SOVANN, PREK, ANGKAR — OCC",
  description:
    "Explore OCC's Mondulkiri single-origin coffee: SOVANN, PREK, and ANGKAR, three Cambodian Robusta profiles shaped by origin and craft.",
  alternates: pageAlternates("/coffee/single-origin"),
  openGraph: {
    title: "Mondulkiri Single Origin Coffee | OCC",
    description:
      "SOVANN, PREK, ANGKAR — three Mondulkiri Robusta expressions, structured by direct trade, processing, and local roasting.",
    url: `${siteUrl}/coffee/single-origin`,
    type: "website",
  },
}

type CollectionItem = {
  readonly slug: string
  readonly index: string
  readonly name: string
  readonly subtitle: string
  readonly desc: string
  readonly expression: string
  readonly notes: readonly string[]
  readonly available: boolean
}

const collection: readonly CollectionItem[] = [
  {
    slug: "sovann",
    index: "01",
    name: "SOVANN",
    subtitle: "The Golden Highland",
    desc: "A balanced, origin-led Robusta built on chocolate, brown sugar, and roasted almond.",
    expression: "Balanced · Origin-led",
    notes: ["Chocolate", "Brown sugar", "Roasted almond"],
    available: true,
  },
  {
    slug: "prek",
    index: "02",
    name: "PREK",
    subtitle: "The Bright Current",
    desc: "A modern, fruit-led Robusta built on bittersweet chocolate, red berries, and citrus peel.",
    expression: "Bright · Contemporary",
    notes: ["Bittersweet chocolate", "Red berries", "Citrus peel"],
    available: true,
  },
  {
    slug: "angkar",
    index: "03",
    name: "ANGKAR",
    subtitle: "The Deep Foundation",
    desc: "A deep, full-bodied Robusta anchored by dark cocoa, roasted peanut, and molasses sweetness.",
    expression: "Deep · Full-bodied",
    notes: ["Dark cocoa", "Roasted peanut", "Molasses"],
    available: true,
  },
]

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Mondulkiri Single Origin Coffee",
  url: `${siteUrl}/coffee/single-origin`,
  description:
    "Three single-origin expressions from Mondulkiri, Cambodia, structured by direct trade, processing precision, and local roasting.",
  hasPart: collection.map((c) => ({
    "@type": "Product",
    name: c.name,
    description: `${c.subtitle} — ${c.desc}`,
    url: `${siteUrl}/collection/${c.slug}`,
  })),
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Single Origin", item: `${siteUrl}/coffee/single-origin` },
  ],
}

const stageItems = [
  { slug: "prek", name: "PREK", subtitle: "BRIGHT CURRENT", tone: "sand" as const },
  { slug: "sovann", name: "SOVANN", subtitle: "GOLDEN HIGHLAND", tone: "olive" as const },
  { slug: "angkar", name: "ANGKAR", subtitle: "DEEP FOUNDATION", tone: "charcoal" as const },
]

export default function CollectionPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="min-h-screen bg-[#f6f3ea] text-[#182019]">
        <section className="occ-grid-lines overflow-hidden border-b border-black/10 px-6 pb-4 pt-20 sm:px-8 md:px-12 lg:px-16 lg:pt-28">
          <div className="mx-auto max-w-[1680px] text-center">
            <p className="occ-eyebrow text-black/42">Mondulkiri Origin Collection</p>
            <h1 className="occ-editorial-title mx-auto mt-6 max-w-6xl text-[3.6rem] sm:text-[5rem] md:text-[6.6rem] lg:text-[8.4rem]">
              THREE EXPRESSIONS,<br />ONE ORIGIN.
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-black/50 sm:text-base">
              A balanced core, a bright current, a deep foundation — all from Mondulkiri.
            </p>

            <CollectionPackageStage items={stageItems} />
          </div>
        </section>

        <main className="mx-auto w-full max-w-[1680px] px-6 sm:px-8 md:px-12 lg:px-16">
          <section className="grid grid-cols-1 gap-10 border-b border-black/10 py-16 md:grid-cols-12 lg:py-24">
            <div className="md:col-span-4">
              <p className="occ-eyebrow mb-6 text-black/38">01 / Collection thesis</p>
              <h2 className="font-[var(--font-display)] text-5xl font-normal leading-[0.96] tracking-[-0.045em] sm:text-6xl">
                One terroir.<br />Three voices.
              </h2>
            </div>
            <div className="md:col-span-8 md:border-l md:border-black/10 md:pl-10 lg:pl-16">
              <p className="max-w-4xl font-[var(--font-display)] text-2xl leading-[1.28] tracking-[-0.02em] sm:text-3xl lg:text-4xl">
                SOVANN, PREK, and ANGKAR — three structured interpretations of Mondulkiri Robusta.
              </p>
              <p className="mt-8 max-w-3xl text-sm leading-8 text-black/52 sm:text-base">
                Three single-origin expressions from the same farmers, the same terroir, and the same direct-trade relationships — but developed through different processing and roast philosophies. SOVANN is balanced and origin-led. PREK is bright and fruit-led. ANGKAR is deep and full-bodied.
              </p>
            </div>
          </section>

          <section className="border-b border-black/10 py-16 lg:py-24">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
              <div className="md:col-span-3">
                <p className="occ-eyebrow text-black/38">02 / Expressions</p>
              </div>
              <div className="md:col-span-9">
                {collection.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/collection/${c.slug}`}
                    className="group grid grid-cols-1 gap-6 border-t border-black/10 py-8 last:border-b md:grid-cols-12 md:items-center"
                  >
                    <div className="md:col-span-2">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-black/35">{c.index}</span>
                    </div>
                    <div className="md:col-span-4">
                      <h2 className="font-[var(--font-display)] text-4xl font-normal tracking-[-0.04em] transition-transform duration-300 group-hover:translate-x-2 sm:text-5xl">
                        {c.name}
                      </h2>
                      <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-black/40">{c.subtitle}</p>
                    </div>
                    <div className="md:col-span-4">
                      <p className="text-sm leading-7 text-black/52">{c.desc}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {c.notes.map((note) => (
                          <span key={note} className="rounded-full border border-black/10 px-3 py-1 text-[9px] uppercase tracking-[0.12em] text-black/45">
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-end md:col-span-2">
                      <span className="text-xl transition-transform duration-300 group-hover:translate-x-2" aria-hidden="true">↗</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-8 border-b border-black/10 py-16 md:grid-cols-12 lg:py-24">
            <div className="md:col-span-3">
              <p className="occ-eyebrow text-black/38">03 / Origin system</p>
            </div>
            <div className="md:col-span-9">
              <div className="grid grid-cols-1 border-y border-black/10 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ["Origin", "Mondulkiri, Cambodia"],
                  ["Species", "Robusta / Canephora"],
                  ["Model", "Direct trade"],
                  ["Roast", "Local development"],
                ].map(([label, value]) => (
                  <div key={label} className="border-b border-black/10 p-6 sm:border-r lg:border-b-0 lg:last:border-r-0">
                    <p className="text-[9px] uppercase tracking-[0.18em] text-black/35">{label}</p>
                    <p className="mt-8 text-sm font-medium">{value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-14 max-w-4xl">
                <h2 className="font-[var(--font-display)] text-5xl font-normal leading-[0.96] tracking-[-0.045em]">Why three,<br />not one.</h2>
                <p className="mt-8 text-sm leading-8 text-black/52 sm:text-base">Mondulkiri Robusta is a single origin with multiple personalities. The collection exists to show that personality, not to fragment the origin.</p>
                <p className="mt-5 text-sm leading-8 text-black/52 sm:text-base">Choose by the part of the cup you want most, or build a relationship with all three and let the origin show its full range.</p>
                <p className="mt-10 border-l border-black/30 pl-6 font-[var(--font-display)] text-3xl italic leading-[1.2] tracking-[-0.02em] sm:text-4xl">
                  A single origin can speak in more than one voice. The collection is the way it speaks.
                </p>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-8 py-20 md:grid-cols-12 lg:py-28">
            <div className="md:col-span-4">
              <p className="occ-eyebrow text-black/38">04 / Sample</p>
            </div>
            <div className="md:col-span-8">
              <h2 className="font-[var(--font-display)] text-6xl font-normal leading-[0.94] tracking-[-0.05em] sm:text-7xl lg:text-8xl">TASTE THE<br />COLLECTION.</h2>
              <p className="mt-7 text-sm text-black/50">Balanced. Bright. Deep. One origin, three expressions.</p>
              <Link href="/contact" className="occ-pill mt-8 px-7 py-3.5 text-[10px] font-medium uppercase tracking-[0.16em]">
                Request a Collection Sample ↗
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
