import Link from "next/link"
import type { Metadata } from "next"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "SOVANN — The Golden Highland | Mondulkiri Robusta Coffee by OCC",
  description:
    "Discover SOVANN, a balanced Mondulkiri Robusta coffee with chocolate, brown sugar, and roasted almond notes. Explore the climate, red soils, humidity, farming, flavor, and origin behind this Cambodian Robusta.",
  keywords: [
    "SOVANN coffee",
    "Mondulkiri Robusta coffee",
    "Cambodia Robusta coffee",
    "Cambodian coffee",
    "Fine Robusta",
    "Mondulkiri coffee",
    "chocolate Robusta",
    "brown sugar coffee notes",
    "roasted almond coffee",
    "coffee terroir Cambodia",
  ],
  alternates: pageAlternates("/collection/sovann"),
  openGraph: {
    title: "SOVANN — The Golden Highland | OCC",
    description:
      "A balanced expression of Mondulkiri Robusta — chocolate, brown sugar, and roasted almond.",
    url: `${siteUrl}/collection/sovann`,
    type: "website",
  },
}

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "SOVANN — The Golden Highland",
  description:
    "OCC's balanced, origin-led expression of Mondulkiri Robusta, built on chocolate, brown sugar, and roasted almond notes.",
  brand: { "@type": "Brand", name: "Origin Coffee Cambodia" },
  category: "Specialty Robusta Coffee",
  origin: { "@type": "Place", name: "Mondulkiri, Cambodia" },
  url: `${siteUrl}/collection/sovann`,
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Collection", item: `${siteUrl}/collection` },
    { "@type": "ListItem", position: 3, name: "SOVANN", item: `${siteUrl}/collection/sovann` },
  ],
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What is SOVANN?", acceptedAnswer: { "@type": "Answer", text: "SOVANN is OCC's balanced Mondulkiri Robusta expression, built around chocolate, brown sugar, and roasted almond notes." } },
    { "@type": "Question", name: "Where is SOVANN from?", acceptedAnswer: { "@type": "Answer", text: "It is positioned within the Mondulkiri Origin Collection and represents coffee grown in Mondulkiri, Cambodia." } },
    { "@type": "Question", name: "Is SOVANN a dark roast?", acceptedAnswer: { "@type": "Answer", text: "No. It is designed as a balanced origin-led profile rather than the deepest roast in the collection." } },
    { "@type": "Question", name: "Why does the coffee taste like chocolate?", acceptedAnswer: { "@type": "Answer", text: "Chocolate is a tasting description created by the interaction of variety, ripeness, processing, and roasting. No chocolate is added." } },
    { "@type": "Question", name: "What makes Mondulkiri suitable for Robusta?", acceptedAnswer: { "@type": "Answer", text: "Its climate, humidity, rainfall patterns, elevation, and soil conditions provide a distinctive growing environment for Robusta." } },
    { "@type": "Question", name: "How is SOVANN different from PREK and ANGKAR?", acceptedAnswer: { "@type": "Answer", text: "SOVANN emphasizes balance and origin. PREK is brighter and fruit-led, while ANGKAR is deeper and more full-bodied." } },
  ],
}

const keywordTerritory = [
  "Mondulkiri Robusta coffee",
  "Mondulkiri coffee",
  "Cambodia Robusta coffee",
  "Cambodian coffee origin",
  "Fine Robusta Cambodia",
  "Chocolate Robusta",
  "Brown sugar coffee notes",
  "Roasted almond coffee",
  "Coffee terroir Cambodia",
  "Red soil coffee",
  "Robusta growing climate",
  "Balanced Robusta coffee",
  "Smooth Robusta coffee",
  "Mondulkiri coffee farm",
  "Cambodia coffee guide",
]

export default function SovannProductPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .occ-sovann .eyebrow{font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:#888}
            .occ-sovann h1,.occ-sovann h2,.occ-sovann h3,.occ-sovann .display{font-family:var(--font-display),Georgia,serif;font-weight:600;letter-spacing:-.055em;line-height:.82}
            .occ-sovann h1{font-size:116px;margin:18px 0 0}
            .occ-sovann h2{font-size:34px;line-height:1.25;letter-spacing:0;margin:0 0 24px;font-weight:500}
            .occ-sovann h3{font-size:26px;margin:28px 0 18px;line-height:1.2}
            .occ-sovann .display-lg{font-size:140px;line-height:.82;letter-spacing:-.055em}
            .occ-sovann .lead{font-size:24px;line-height:1.5;font-weight:600;margin:0;font-family:var(--font-sans),Inter,Arial,sans-serif;letter-spacing:0}
            .occ-sovann .copy{font-size:16px;line-height:1.9;color:#555;margin:0 0 18px;font-family:var(--font-sans),Inter,Arial,sans-serif}
            .occ-sovann .hero-sub{font-size:13px;letter-spacing:.18em;text-transform:uppercase;color:#555;margin-top:28px;font-family:var(--font-sans),Inter,Arial,sans-serif}
            .occ-sovann .panel{border-top:1px solid #111;border-bottom:1px solid #111;display:grid;grid-template-rows:auto 1fr auto;padding:24px 0;min-height:380px;margin-bottom:96px}
            .occ-sovann .panel-index,.occ-sovann .panel-meta{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#999;font-family:var(--font-sans),Inter,Arial,sans-serif}
            .occ-sovann .panel-title{align-self:center}
            .occ-sovann .panel-meta{display:flex;justify-content:space-between}
            .occ-sovann .section-title{font-size:33px;line-height:1.22;border-left:4px solid #111;padding-left:16px;margin:0;font-weight:600;letter-spacing:0}
            .occ-sovann .fact-grid{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid #ddd}
            .occ-sovann .fact{padding:24px 18px 20px 0;border-bottom:1px solid #ddd}
            .occ-sovann .fact:nth-child(2),.occ-sovann .fact:nth-child(3){padding-left:18px;border-left:1px solid #ddd}
            .occ-sovann .fact span{display:block;color:#999;font-size:10px;letter-spacing:.18em;text-transform:uppercase;margin-bottom:10px;font-family:var(--font-sans),Inter,Arial,sans-serif}
            .occ-sovann .fact strong{font-size:16px;font-weight:500;font-family:var(--font-sans),Inter,Arial,sans-serif}
            .occ-sovann .leftbar{border-left:4px solid #111;padding-left:26px}
            .occ-sovann .quote{font-family:var(--font-display),Georgia,serif;font-size:36px;line-height:1.3;border-left:1px solid #111;padding-left:28px;margin:12px 0 0;font-style:italic}
            .occ-sovann .back{position:absolute;top:32px;left:32px;z-index:10;color:#666;font-size:11px;letter-spacing:.18em;text-transform:uppercase;font-family:var(--font-sans),Inter,Arial,sans-serif}
            .occ-sovann .back:hover{color:#111}
            .occ-sovann .flavor-grid{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid #111;border-left:1px solid #ddd}
            .occ-sovann .flavor-card{padding:32px;min-height:250px;border-right:1px solid #ddd;border-bottom:1px solid #ddd}
            .occ-sovann .flavor-card span{font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#999;font-family:var(--font-sans),Inter,Arial,sans-serif}
            .occ-sovann .flavor-card p{font-size:14px;color:#666;line-height:1.8;margin:0;font-family:var(--font-sans),Inter,Arial,sans-serif}
            .occ-sovann .origin-list{display:grid;gap:22px}
            .occ-sovann .origin-row{display:grid;grid-template-columns:72px 1fr;gap:24px;padding-bottom:22px;border-bottom:1px solid #e5e5e5}
            .occ-sovann .origin-row span{font-size:10px;letter-spacing:.16em;color:#999;font-family:var(--font-sans),Inter,Arial,sans-serif}
            .occ-sovann .origin-row strong{font-size:18px;display:block;margin-bottom:6px;font-weight:600;font-family:var(--font-sans),Inter,Arial,sans-serif}
            .occ-sovann .origin-row p{font-size:14px;color:#666;margin:0;line-height:1.8;font-family:var(--font-sans),Inter,Arial,sans-serif}
            .occ-sovann .cluster{margin-top:96px;padding:64px 0;border-top:1px solid #111;border-bottom:1px solid #111}
            .occ-sovann .cluster h3{font-family:var(--font-display),Georgia,serif;font-size:56px;line-height:1.05;margin:0 0 24px;letter-spacing:-.03em;font-weight:600}
            .occ-sovann .keyword-list{display:flex;flex-wrap:wrap;gap:8px}
            .occ-sovann .keyword-list span{border:1px solid #d8d8d8;padding:8px 11px;font-size:10px;letter-spacing:.12em;text-transform:uppercase;font-family:var(--font-sans),Inter,Arial,sans-serif}
            .occ-sovann .faq-item{padding:22px 0;border-top:1px solid #ddd}
            .occ-sovann .faq-item h3{font-size:17px;margin:0 0 10px;font-family:var(--font-sans),Inter,Arial,sans-serif;letter-spacing:0;line-height:1.3;font-weight:600}
            .occ-sovann .faq-item p{margin:0;color:#666;font-size:14px;line-height:1.8;font-family:var(--font-sans),Inter,Arial,sans-serif}
            .occ-sovann .cta{padding:110px 24px;text-align:center}
            .occ-sovann .cta h2{font-family:var(--font-display),Georgia,serif;font-size:64px;line-height:1.03;margin:0;letter-spacing:-.03em}
            .occ-sovann .cta p{color:#666;margin:26px 0;font-family:var(--font-sans),Inter,Arial,sans-serif}
            .occ-sovann .cta a,.occ-sovann .cta-link{display:inline-block;border:1px solid #111;padding:13px 18px;font-size:11px;letter-spacing:.16em;text-transform:uppercase;font-family:var(--font-sans),Inter,Arial,sans-serif;background:transparent;color:#111}
            .occ-sovann .cta a:hover,.occ-sovann .cta-link:hover{background:#111;color:#fff}
            .occ-sovann .cta-link.soft{border-color:#ddd;color:#666}
            .occ-sovann .cta-link.soft:hover{border-color:#111;color:#111;background:transparent}
            @media(max-width:850px){
              .occ-sovann h1{font-size:76px}
              .occ-sovann .display-lg{font-size:80px}
              .occ-sovann .panel{min-height:300px}
              .occ-sovann .fact-grid,.occ-sovann .flavor-grid{grid-template-columns:1fr}
              .occ-sovann .fact:nth-child(2),.occ-sovann .fact:nth-child(3){padding-left:0;border-left:0}
              .occ-sovann .quote{font-size:29px}
              .occ-sovann .cluster h3{font-size:42px}
              .occ-sovann .cta h2{font-size:46px}
            }
          `,
        }}
      />
      <div className="min-h-screen bg-white text-[#111] occ-sovann" style={{ fontFamily: "var(--font-sans), Inter, Arial, sans-serif" }}>
        <a className="back" href="/collection">← BACK TO MONDULKIRI ORIGIN COLLECTION</a>
        <main className="max-w-[1152px] mx-auto px-8 md:px-16 pt-32 md:pt-40 pb-24">
          <header className="pb-14 border-b border-[#cfcfcf]">
            <span className="eyebrow">Mondulkiri Origin Collection / 01</span>
            <h1>SOVANN</h1>
            <p className="hero-sub">The Golden Highland</p>
          </header>

          <section className="py-[72px] grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <div className="leftbar"><p className="lead">A balanced expression of Mondulkiri Robusta.</p></div>
            </div>
            <div className="md:col-span-7">
              <p className="copy">SOVANN is OCC's origin-led interpretation of Mondulkiri: gentle in structure, grounded in chocolate, and lifted by the warm sweetness of brown sugar and roasted almond. It is designed to show that Cambodian Robusta can be calm, refined, and deeply connected to place.</p>
            </div>
          </section>

          <section className="panel">
            <div className="panel-index">SOVANN / 01</div>
            <div className="panel-title display-lg">GOLDEN<br />HIGHLAND</div>
            <div className="panel-meta"><span>MONDULKIRI, CAMBODIA</span><span>BALANCE / ORIGIN / DEPTH</span></div>
          </section>

          <section className="pb-24 border-b border-[#e5e5e5]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-5"><h2 className="section-title">The coffee<br />at a glance.</h2></div>
              <div className="md:col-span-7">
                <div className="fact-grid">
                  <div className="fact"><span>Origin</span><strong>Mondulkiri, Cambodia</strong></div>
                  <div className="fact"><span>Species</span><strong>Robusta</strong></div>
                  <div className="fact"><span>Expression</span><strong>Balanced & origin-led</strong></div>
                  <div className="fact"><span>Main notes</span><strong>Chocolate</strong></div>
                  <div className="fact"><span>Sweetness</span><strong>Brown sugar</strong></div>
                  <div className="fact"><span>Finish</span><strong>Roasted almond</strong></div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-24 border-b border-[#e5e5e5]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-14">
              <div className="md:col-span-5"><h2>Why SOVANN exists</h2></div>
              <div className="md:col-span-7">
                <p className="copy">SOVANN was created to represent the quieter side of Mondulkiri Robusta. Instead of emphasizing intensity alone, it focuses on balance, softness, and a steady chocolate finish.</p>
                <p className="copy">The name draws from the Khmer word associated with gold. Here, gold does not mean luxury without context. It refers to value rooted in land, labor, and origin — the enduring value of Mondulkiri's highlands and the people who cultivate coffee there.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-14">
              <div className="md:col-span-5"><h2>The Mondulkiri connection</h2></div>
              <div className="md:col-span-7">
                <p className="copy">Mondulkiri is one of Cambodia's most distinctive coffee-growing regions. Its higher elevation, cooler conditions, seasonal rainfall, humidity, and widely recognized red soils create a growing environment that differs from the country's lowland areas.</p>
                <p className="copy">These conditions do not determine flavor on their own. Variety, cherry ripeness, processing, drying, storage, and roasting all remain essential. But together, they provide the agricultural setting in which Mondulkiri Robusta develops its character.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-5"><h2>From land to cup</h2></div>
              <div className="md:col-span-7">
                <p className="copy">In the cup, SOVANN is designed around clarity rather than force. Chocolate forms the foundation. Brown sugar adds warmth and roundness. Roasted almond gives the finish structure without turning the coffee heavy or harsh.</p>
                <p className="copy">This makes SOVANN the most approachable expression in the Mondulkiri Origin Collection and the clearest starting point for understanding Cambodian Robusta through origin rather than stereotype.</p>
                <p className="quote">Balanced does not mean simple. It means every element has a place.</p>
              </div>
            </div>
          </section>

          <section className="py-24 border-b border-[#e5e5e5]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-11">
              <div className="md:col-span-5"><h2 className="section-title">Flavor<br />architecture.</h2></div>
              <div className="md:col-span-7"><p className="copy mb-0">The flavor profile is built as a sequence: chocolate first, brown sugar through the center, and roasted almond in the finish.</p></div>
            </div>
            <div className="flavor-grid">
              <div className="flavor-card"><span>01 / Foundation</span><h3>Chocolate</h3><p>A soft cocoa-like depth that gives the cup structure without aggressive bitterness. This note defines the core of SOVANN.</p></div>
              <div className="flavor-card"><span>02 / Sweetness</span><h3>Brown Sugar</h3><p>A warm, rounded sweetness that sits between caramel and molasses, helping the cup feel balanced and approachable.</p></div>
              <div className="flavor-card"><span>03 / Finish</span><h3>Roasted Almond</h3><p>A refined nutty finish that adds texture and length while keeping SOVANN distinct from deeper roasted profiles.</p></div>
            </div>
          </section>

          <section className="py-24 border-b border-[#e5e5e5]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-5"><h2 className="section-title">What shapes<br />the origin.</h2></div>
              <div className="md:col-span-7">
                <div className="origin-list">
                  <div className="origin-row"><span>01</span><div><strong>Highland climate</strong><p>Cooler conditions and elevation help distinguish Mondulkiri from Cambodia's warmer lowland coffee environments.</p></div></div>
                  <div className="origin-row"><span>02</span><div><strong>Humidity and rainfall</strong><p>Moisture supports growth, but careful harvest and drying remain critical to quality and consistency.</p></div></div>
                  <div className="origin-row"><span>03</span><div><strong>Red soils</strong><p>Mondulkiri is widely associated with red soils that influence drainage, root development, and overall growing conditions.</p></div></div>
                  <div className="origin-row"><span>04</span><div><strong>Farmer knowledge</strong><p>Local growing knowledge, selective harvesting, processing, and post-harvest control ultimately decide what reaches the cup.</p></div></div>
                  <div className="origin-row"><span>05</span><div><strong>Roasting interpretation</strong><p>OCC refines the profile to preserve chocolate depth while maintaining sweetness, balance, and a clean finish.</p></div></div>
                </div>
              </div>
            </div>
          </section>

          <section className="cluster">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-5">
                <span className="eyebrow block mb-4">SEO Cluster</span>
                <h3>SOVANN keyword territory</h3>
              </div>
              <div className="md:col-span-7">
                <div className="keyword-list">
                  {keywordTerritory.map((k) => (
                    <span key={k}>{k}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="py-24 border-b border-[#e5e5e5]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-5"><h2 className="section-title">SOVANN<br />FAQ.</h2></div>
              <div className="md:col-span-7">
                {faqSchema.mainEntity.map((q) => (
                  <div key={q.name} className="faq-item">
                    <h3>{q.name}</h3>
                    <p>{(q.acceptedAnswer as { text: string }).text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="cta">
            <span className="eyebrow block mb-4">Mondulkiri Origin Collection / 01</span>
            <h2>TASTE THE GOLDEN HIGHLAND.</h2>
            <p>Balanced. Grounded. Rooted in Mondulkiri.</p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link href="/contact" className="cta-link">Shop SOVANN</Link>
              <Link href="/collection/prek" className="cta-link soft">Next: PREK →</Link>
            </div>
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
