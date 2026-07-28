import Link from "next/link"
import type { Metadata } from "next"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Mondulkiri Origin Collection | SOVANN, PREK, ANGKAR — OCC",
  description:
    "Three single-origin expressions from Mondulkiri, Cambodia: SOVANN (Balance), PREK (Bright Current), ANGKAR (Deep Foundation). Direct trade, local roasting, traceable terroir.",
  alternates: pageAlternates("/collection"),
  openGraph: {
    title: "Mondulkiri Origin Collection | OCC",
    description:
      "SOVANN, PREK, ANGKAR — three Mondulkiri Robusta expressions, structured by direct trade, processing, and local roasting.",
    url: `${siteUrl}/collection`,
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
  name: "Mondulkiri Origin Collection",
  url: `${siteUrl}/collection`,
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
    { "@type": "ListItem", position: 2, name: "Collection", item: `${siteUrl}/collection` },
  ],
}

export default function CollectionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .occ-collection .eyebrow{font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:#888}
            .occ-collection h1,.occ-collection h2,.occ-collection h3,.occ-collection .display{font-family:var(--font-display),Georgia,serif;font-weight:600;letter-spacing:-.055em;line-height:.82}
            .occ-collection h1{font-size:48px;margin:18px 0 0}
            .occ-collection h2{font-size:34px;line-height:1.25;letter-spacing:0;margin:0 0 24px;font-weight:500}
            .occ-collection .display-lg{font-size:96px;line-height:.9;letter-spacing:-.04em}
            .occ-collection .lead{font-size:24px;line-height:1.5;font-weight:600;margin:0;font-family:var(--font-sans),Inter,Arial,sans-serif;letter-spacing:0}
            .occ-collection .copy{font-size:16px;line-height:1.9;color:#555;margin:0;font-family:var(--font-sans),Inter,Arial,sans-serif}
            .occ-collection .hero-sub{font-size:13px;letter-spacing:.18em;text-transform:uppercase;color:#555;margin-top:28px;font-family:var(--font-sans),Inter,Arial,sans-serif}
            .occ-collection .panel{border-top:1px solid #111;border-bottom:1px solid #111;display:grid;grid-template-rows:auto 1fr auto;padding:24px 0;min-height:380px}
            .occ-collection .panel-index,.occ-collection .panel-meta{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#999;font-family:var(--font-sans),Inter,Arial,sans-serif}
            .occ-collection .panel-title{align-self:center}
            .occ-collection .panel-meta{display:flex;justify-content:space-between}
            .occ-collection .section-title{font-size:33px;line-height:1.22;border-left:4px solid #111;padding-left:16px;margin:0;font-weight:600;letter-spacing:0}
            .occ-collection .fact-grid{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid #ddd}
            .occ-collection .fact{padding:24px 18px 20px 0;border-bottom:1px solid #ddd}
            .occ-collection .fact:nth-child(2),.occ-collection .fact:nth-child(3){padding-left:18px;border-left:1px solid #ddd}
            .occ-collection .fact span{display:block;color:#999;font-size:10px;letter-spacing:.18em;text-transform:uppercase;margin-bottom:10px;font-family:var(--font-sans),Inter,Arial,sans-serif}
            .occ-collection .fact strong{font-size:16px;font-weight:500;font-family:var(--font-sans),Inter,Arial,sans-serif}
            .occ-collection .leftbar{border-left:4px solid #111;padding-left:26px}
            .occ-collection .quote{font-family:var(--font-display),Georgia,serif;font-size:36px;line-height:1.3;border-left:1px solid #111;padding-left:28px;margin:12px 0 0;font-style:italic}
            .occ-collection .back{font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#666;font-family:var(--font-sans),Inter,Arial,sans-serif}
            .occ-collection .back:hover{color:#111}
            .occ-collection .pill{border:1px solid #d8d8d8;padding:8px 11px;font-size:10px;letter-spacing:.12em;text-transform:uppercase;font-family:var(--font-sans),Inter,Arial,sans-serif}
            .occ-collection .pill-soft{border:1px solid #ddd;padding:6px 10px;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:#666;font-family:var(--font-sans),Inter,Arial,sans-serif}
            @media(min-width:768px){
              .occ-collection h1{font-size:72px}
              .occ-collection .display-lg{font-size:96px}
            }
            @media(max-width:850px){
              .occ-collection h1{font-size:48px}
              .occ-collection .display-lg{font-size:64px}
              .occ-collection .fact-grid{grid-template-columns:1fr}
              .occ-collection .fact:nth-child(2),.occ-collection .fact:nth-child(3){padding-left:0;border-left:0}
              .occ-collection .quote{font-size:29px}
            }
          `,
        }}
      />
      <div className="min-h-screen bg-white text-gray-800 occ-collection" style={{ fontFamily: "var(--font-sans), Inter, Arial, sans-serif" }}>
        <main className="max-w-[1152px] mx-auto px-8 md:px-16 pt-32 md:pt-40 pb-24">
          <header className="pb-14 border-b border-[#cfcfcf]">
            <span className="eyebrow">Mondulkiri Origin Collection</span>
            <h1>THREE EXPRESSIONS,<br />ONE ORIGIN.</h1>
            <p className="hero-sub">A balanced core, a bright current, a deep foundation — all from Mondulkiri.</p>
          </header>

          <section className="py-[72px] grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <div className="leftbar">
                <p className="lead">SOVANN, PREK, and ANGKAR — three structured interpretations of Mondulkiri Robusta.</p>
              </div>
            </div>
            <div className="md:col-span-7">
              <p className="copy">Three single-origin expressions from the same farmers, the same terroir, and the same direct-trade relationships — but developed through different processing and roast philosophies. SOVANN is balanced and origin-led. PREK is bright and fruit-led. ANGKAR is deep and full-bodied.</p>
            </div>
          </section>

          <section className="panel mb-24">
            <div className="panel-index">COLLECTION / 03</div>
            <div className="panel-title display-lg">MONDULKIRI<br />ORIGIN</div>
            <div className="panel-meta"><span>MONDULKIRI, CAMBODIA</span><span>ROBUSTA / DIRECT TRADE / LOCAL ROAST</span></div>
          </section>

          <section className="pb-24 mb-24 border-b border-[#e5e5e5]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-10">
              <div className="md:col-span-5">
                <h2 className="section-title">The three<br />expressions.</h2>
              </div>
              <div className="md:col-span-7">
                <p className="copy">Each coffee is traceable to the same farmer relationships and the same province. What changes is processing, roast development, and the part of the cup we want to surface.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-[#ddd]">
              {collection.map((c) => (
                <div key={c.slug} className="p-8 min-h-[250px] border-r border-b border-[#ddd]">
                  <span className="block text-[10px] tracking-[0.18em] text-[#999] uppercase mb-7">
                    {c.index} / {c.subtitle}
                  </span>
                  <h3 className="text-[26px] mb-[18px] mt-0">{c.name}</h3>
                  <p className="text-[14px] text-[#666] leading-[1.8] mb-5">{c.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {c.notes.map((n) => (
                      <span key={n} className="pill-soft">{n}</span>
                    ))}
                  </div>
                  <Link
                    href={`/collection/${c.slug}`}
                    className="text-[11px] tracking-[0.15em] uppercase text-[#111] hover:opacity-70"
                  >
                    Explore {c.name} →
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <section className="pb-24 border-b border-[#e5e5e5]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-5">
                <h2 className="section-title">Why three,<br />not one.</h2>
              </div>
              <div className="md:col-span-7">
                <p className="copy mb-6">Mondulkiri Robusta is a single origin with multiple personalities. The collection exists to show that personality, not to fragment the origin.</p>
                <p className="copy mb-6">Choose by the part of the cup you want most, or build a relationship with all three and let the origin show its full range.</p>
                <p className="quote">A single origin can speak in more than one voice. The collection is the way it speaks.</p>
              </div>
            </div>
          </section>

          <section className="text-center py-[110px]">
            <span className="eyebrow block mb-4">Mondulkiri Origin Collection</span>
            <h2 className="text-[64px] leading-[1.03]" style={{ fontFamily: "var(--font-display), Georgia, serif", letterSpacing: "-0.03em" }}>
              TASTE THE COLLECTION.
            </h2>
            <p className="text-[#666] mt-[26px] mb-[26px]">Balanced. Bright. Deep. One origin, three expressions.</p>
            <Link
              href="/contact"
              className="inline-block border border-[#111] py-[13px] px-[18px] text-[11px] tracking-[0.16em] uppercase hover:bg-[#111] hover:text-white transition-colors"
            >
              Request a Collection Sample
            </Link>
          </section>
        </main>
        <div
          aria-hidden="true"
          className="fixed left-[-28px] bottom-[-50px] text-[190px] font-bold text-[rgba(230,230,230,0.5)] z-[-1] select-none pointer-events-none"
          style={{ fontFamily: "var(--font-sans), Inter, Arial, sans-serif" }}
        >
          OCC.
        </div>
      </div>
    </>
  )
}
