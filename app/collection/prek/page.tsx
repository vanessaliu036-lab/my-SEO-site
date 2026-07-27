import Link from "next/link"
import type { Metadata } from "next"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "PREK — The Bright Current | Mondulkiri Robusta by OCC",
  description:
    "Discover PREK, a bright modern Mondulkiri Robusta with bittersweet chocolate, red berry, and citrus peel notes. Explore processing, freshness, acidity, and contemporary Cambodian coffee culture.",
  keywords: [
    "PREK coffee",
    "Mondulkiri Robusta",
    "bright Robusta coffee",
    "fruit-forward Robusta",
    "Cambodian coffee",
    "citrus coffee notes",
    "berry coffee notes",
    "modern Robusta",
    "Fine Robusta Cambodia",
  ],
  alternates: pageAlternates("/collection/prek"),
  openGraph: {
    title: "PREK — The Bright Current | OCC",
    description:
      "A brighter, more contemporary expression of Mondulkiri Robusta — bittersweet chocolate, red berries, citrus peel.",
    url: `${siteUrl}/collection/prek`,
    type: "website",
  },
}

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "PREK — The Bright Current",
  description:
    "OCC's modern, fruit-led expression of Mondulkiri Robusta, built on bittersweet chocolate, red berries, and citrus peel.",
  brand: { "@type": "Brand", name: "Origin Coffee Cambodia" },
  category: "Specialty Robusta Coffee",
  origin: { "@type": "Place", name: "Mondulkiri, Cambodia" },
  url: `${siteUrl}/collection/prek`,
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Collection", item: `${siteUrl}/collection` },
    { "@type": "ListItem", position: 3, name: "PREK", item: `${siteUrl}/collection/prek` },
  ],
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What is PREK?", acceptedAnswer: { "@type": "Answer", text: "PREK is OCC's bright modern Mondulkiri Robusta expression, built around bittersweet chocolate, red berry, and citrus peel." } },
    { "@type": "Question", name: "Is PREK acidic?", acceptedAnswer: { "@type": "Answer", text: "It has more brightness than SOVANN or ANGKAR, but the acidity is intended to be clean and integrated rather than sour." } },
    { "@type": "Question", name: "Why does PREK show fruit notes?", acceptedAnswer: { "@type": "Answer", text: "Fruit notes can result from cherry ripeness, processing, fermentation, drying, roast development, and brewing." } },
    { "@type": "Question", name: "Is PREK suitable for black coffee?", acceptedAnswer: { "@type": "Answer", text: "Yes. Its clarity and citrus finish make it especially suitable for filter-style or clean black coffee preparations." } },
    { "@type": "Question", name: "How is PREK different from SOVANN?", acceptedAnswer: { "@type": "Answer", text: "SOVANN is softer and more balanced. PREK is brighter, more aromatic, and more fruit-led." } },
    { "@type": "Question", name: "How is PREK different from ANGKAR?", acceptedAnswer: { "@type": "Answer", text: "ANGKAR emphasizes body, roast depth, and darker sweetness, while PREK emphasizes clarity and movement." } },
  ],
}

export default function PrekProductPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .occ-prek .eyebrow{font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:#888}
            .occ-prek h1,.occ-prek h2,.occ-prek h3,.occ-prek .display{font-family:var(--font-display),Georgia,serif;font-weight:600;letter-spacing:-.055em;line-height:.82}
            .occ-prek h1{font-size:116px;margin:18px 0 0}
            .occ-prek h2{font-size:34px;line-height:1.25;letter-spacing:0;margin:0 0 24px;font-weight:500}
            .occ-prek h3{font-size:26px;margin:28px 0 18px;line-height:1.2}
            .occ-prek .display-lg{font-size:140px;line-height:.82;letter-spacing:-.055em}
            .occ-prek .lead{font-size:24px;line-height:1.5;font-weight:600;margin:0;font-family:var(--font-sans),Inter,Arial,sans-serif;letter-spacing:0}
            .occ-prek .copy{font-size:16px;line-height:1.9;color:#555;margin:0 0 18px;font-family:var(--font-sans),Inter,Arial,sans-serif}
            .occ-prek .hero-sub{font-size:13px;letter-spacing:.18em;text-transform:uppercase;color:#555;margin-top:28px;font-family:var(--font-sans),Inter,Arial,sans-serif}
            .occ-prek .panel{border-top:1px solid #111;border-bottom:1px solid #111;display:grid;grid-template-rows:auto 1fr auto;padding:24px 0;min-height:380px;margin-bottom:96px}
            .occ-prek .panel-index,.occ-prek .panel-meta{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#999;font-family:var(--font-sans),Inter,Arial,sans-serif}
            .occ-prek .panel-title{align-self:center}
            .occ-prek .panel-meta{display:flex;justify-content:space-between}
            .occ-prek .section-title{font-size:33px;line-height:1.22;border-left:4px solid #111;padding-left:16px;margin:0;font-weight:600;letter-spacing:0}
            .occ-prek .fact-grid{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid #ddd}
            .occ-prek .fact{padding:24px 18px 20px 0;border-bottom:1px solid #ddd}
            .occ-prek .fact:nth-child(2),.occ-prek .fact:nth-child(3){padding-left:18px;border-left:1px solid #ddd}
            .occ-prek .fact span{display:block;color:#999;font-size:10px;letter-spacing:.18em;text-transform:uppercase;margin-bottom:10px;font-family:var(--font-sans),Inter,Arial,sans-serif}
            .occ-prek .fact strong{font-size:16px;font-weight:500;font-family:var(--font-sans),Inter,Arial,sans-serif}
            .occ-prek .leftbar{border-left:4px solid #111;padding-left:26px}
            .occ-prek .quote{font-family:var(--font-display),Georgia,serif;font-size:36px;line-height:1.3;border-left:1px solid #111;padding-left:28px;margin:12px 0 0;font-style:italic}
            .occ-prek .back{position:absolute;top:32px;left:32px;z-index:10;color:#666;font-size:11px;letter-spacing:.18em;text-transform:uppercase;font-family:var(--font-sans),Inter,Arial,sans-serif}
            .occ-prek .back:hover{color:#111}
            .occ-prek .flavor-grid{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid #111;border-left:1px solid #ddd}
            .occ-prek .flavor-card{padding:32px;min-height:250px;border-right:1px solid #ddd;border-bottom:1px solid #ddd}
            .occ-prek .flavor-card span{font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#999;font-family:var(--font-sans),Inter,Arial,sans-serif}
            .occ-prek .flavor-card p{font-size:14px;color:#666;line-height:1.8;margin:0;font-family:var(--font-sans),Inter,Arial,sans-serif}
            .occ-prek .origin-list{display:grid;gap:22px}
            .occ-prek .origin-row{display:grid;grid-template-columns:72px 1fr;gap:24px;padding-bottom:22px;border-bottom:1px solid #e5e5e5}
            .occ-prek .origin-row span{font-size:10px;letter-spacing:.16em;color:#999;font-family:var(--font-sans),Inter,Arial,sans-serif}
            .occ-prek .origin-row strong{font-size:18px;display:block;margin-bottom:6px;font-weight:600;font-family:var(--font-sans),Inter,Arial,sans-serif}
            .occ-prek .origin-row p{font-size:14px;color:#666;margin:0;line-height:1.8;font-family:var(--font-sans),Inter,Arial,sans-serif}
            .occ-prek .faq-item{padding:22px 0;border-top:1px solid #ddd}
            .occ-prek .faq-item h3{font-size:17px;margin:0 0 10px;font-family:var(--font-sans),Inter,Arial,sans-serif;letter-spacing:0;line-height:1.3;font-weight:600}
            .occ-prek .faq-item p{margin:0;color:#666;font-size:14px;line-height:1.8;font-family:var(--font-sans),Inter,Arial,sans-serif}
            .occ-prek .cta{padding:110px 24px;text-align:center}
            .occ-prek .cta h2{font-family:var(--font-display),Georgia,serif;font-size:64px;line-height:1.03;margin:0;letter-spacing:-.03em}
            .occ-prek .cta p{color:#666;margin:26px 0;font-family:var(--font-sans),Inter,Arial,sans-serif}
            .occ-prek .cta a,.occ-prek .cta-link{display:inline-block;border:1px solid #111;padding:13px 18px;font-size:11px;letter-spacing:.16em;text-transform:uppercase;font-family:var(--font-sans),Inter,Arial,sans-serif;background:transparent;color:#111}
            .occ-prek .cta a:hover,.occ-prek .cta-link:hover{background:#111;color:#fff}
            .occ-prek .cta-link.soft{border-color:#ddd;color:#666}
            .occ-prek .cta-link.soft:hover{border-color:#111;color:#111;background:transparent}
            @media(max-width:850px){
              .occ-prek h1{font-size:76px}
              .occ-prek .display-lg{font-size:80px}
              .occ-prek .panel{min-height:300px}
              .occ-prek .fact-grid,.occ-prek .flavor-grid{grid-template-columns:1fr}
              .occ-prek .fact:nth-child(2),.occ-prek .fact:nth-child(3){padding-left:0;border-left:0}
              .occ-prek .quote{font-size:29px}
              .occ-prek .cta h2{font-size:46px}
            }
          `,
        }}
      />
      <div className="min-h-screen bg-white text-[#111] occ-prek" style={{ fontFamily: "var(--font-sans), Inter, Arial, sans-serif" }}>
        <a className="back" href="/collection">← BACK TO MONDULKIRI ORIGIN COLLECTION</a>
        <main className="max-w-[1152px] mx-auto px-8 md:px-16 pt-32 md:pt-40 pb-24">
          <header className="pb-14 border-b border-[#cfcfcf]">
            <span className="eyebrow">Mondulkiri Origin Collection / 02</span>
            <h1>PREK</h1>
            <p className="hero-sub">The Bright Current</p>
          </header>

          <section className="py-[72px] grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <div className="leftbar"><p className="lead">A brighter, more contemporary expression of Mondulkiri Robusta.</p></div>
            </div>
            <div className="md:col-span-7">
              <p className="copy">PREK is OCC's modern interpretation of Mondulkiri: structured by bittersweet chocolate, lifted by red berry, and sharpened by citrus peel. It shows a cleaner, more vivid side of Cambodian Robusta — one shaped by freshness, careful processing, and a contemporary approach to roast development.</p>
            </div>
          </section>

          <section className="panel">
            <div className="panel-index">PREK / 02</div>
            <div className="panel-title display-lg">BRIGHT<br />CURRENT</div>
            <div className="panel-meta"><span>MONDULKIRI, CAMBODIA</span><span>BRIGHTNESS / FRUIT / CLARITY</span></div>
          </section>

          <section className="pb-24 border-b border-[#e5e5e5]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-5">
                <h2 className="section-title">The coffee<br />at a glance.</h2>
              </div>
              <div className="md:col-span-7">
                <div className="fact-grid">
                  <div className="fact"><span>Origin</span><strong>Mondulkiri, Cambodia</strong></div>
                  <div className="fact"><span>Species</span><strong>Robusta</strong></div>
                  <div className="fact"><span>Expression</span><strong>Bright & contemporary</strong></div>
                  <div className="fact"><span>Foundation</span><strong>Bittersweet chocolate</strong></div>
                  <div className="fact"><span>Fruit note</span><strong>Red berries</strong></div>
                  <div className="fact"><span>Finish</span><strong>Citrus peel</strong></div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-24 border-b border-[#e5e5e5]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-14">
              <div className="md:col-span-5"><h2>Why PREK exists</h2></div>
              <div className="md:col-span-7">
                <p className="copy">PREK was created to expand the way Cambodian Robusta is understood. Instead of relying on weight and roast intensity, it focuses on brightness, aroma, and a more transparent flavor structure.</p>
                <p className="copy">The name evokes movement and current. PREK is not static. It is the expression within the collection that carries Mondulkiri forward — toward cleaner roasting, fresher presentation, and a more contemporary coffee language.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-14">
              <div className="md:col-span-5"><h2>A modern Robusta profile</h2></div>
              <div className="md:col-span-7">
                <p className="copy">Bittersweet chocolate gives PREK its base, but the cup quickly moves toward red berry and citrus peel. The result is not sharp or thin. It is structured, vivid, and deliberate.</p>
                <p className="copy">This profile depends on more than origin alone. Harvest quality, cherry maturity, processing precision, drying, storage, roast development, and freshness all influence whether fruit character remains clear or disappears beneath bitterness.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-5"><h2>Freshness as part of flavor</h2></div>
              <div className="md:col-span-7">
                <p className="copy">PREK places freshness at the center of the experience. A coffee with fruit-led notes must retain aroma, clarity, and balance from roast to brew.</p>
                <p className="copy">For OCC, this means treating Robusta with the same discipline expected of high-quality specialty coffee: careful sourcing, intentional roasting, controlled resting, and brewing methods that preserve definition.</p>
                <p className="quote">Brightness is not the absence of depth. It is depth with movement.</p>
              </div>
            </div>
          </section>

          <section className="py-24 border-b border-[#e5e5e5]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-11">
              <div className="md:col-span-5"><h2 className="section-title">Flavor<br />architecture.</h2></div>
              <div className="md:col-span-7"><p className="copy mb-0">PREK moves from chocolate structure into berry brightness and finishes with a dry citrus lift.</p></div>
            </div>
            <div className="flavor-grid">
              <div className="flavor-card"><span>01 / Structure</span><h3>Bittersweet Chocolate</h3><p>A darker chocolate base that gives the coffee stability while leaving space for fruit and acidity to remain visible.</p></div>
              <div className="flavor-card"><span>02 / Lift</span><h3>Red Berries</h3><p>A ripe, wine-like fruit impression that brings freshness and distinguishes PREK from heavier Robusta profiles.</p></div>
              <div className="flavor-card"><span>03 / Finish</span><h3>Citrus Peel</h3><p>A dry aromatic finish that adds precision and helps the cup feel modern, clean, and composed.</p></div>
            </div>
          </section>

          <section className="py-24 border-b border-[#e5e5e5]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-5"><h2 className="section-title">What shapes<br />the expression.</h2></div>
              <div className="md:col-span-7">
                <div className="origin-list">
                  <div className="origin-row"><span>01</span><div><strong>Careful cherry selection</strong><p>Fruit-led Robusta begins with mature cherries and disciplined sorting rather than roast manipulation alone.</p></div></div>
                  <div className="origin-row"><span>02</span><div><strong>Processing precision</strong><p>Fermentation, washing, drying, and storage influence whether berry and citrus notes remain clear.</p></div></div>
                  <div className="origin-row"><span>03</span><div><strong>Fresh regional sourcing</strong><p>Shorter supply chains and clear origin relationships help protect quality and maintain traceability.</p></div></div>
                  <div className="origin-row"><span>04</span><div><strong>Modern roast development</strong><p>The roast is developed enough for sweetness and structure, but restrained enough to preserve aroma and brightness.</p></div></div>
                  <div className="origin-row"><span>05</span><div><strong>Contemporary Cambodian coffee culture</strong><p>PREK reflects a new generation of Cambodian coffee that values clarity, craft, and origin expression.</p></div></div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-24 border-b border-[#e5e5e5]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-5"><h2 className="section-title">PREK<br />FAQ.</h2></div>
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
            <span className="eyebrow block mb-4">Mondulkiri Origin Collection / 02</span>
            <h2>TASTE THE BRIGHT CURRENT.</h2>
            <p>Vivid. Clean. A modern expression of Mondulkiri.</p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link href="/contact" className="cta-link">Shop PREK</Link>
              <Link href="/collection/angkar" className="cta-link soft">Next: ANGKAR →</Link>
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
