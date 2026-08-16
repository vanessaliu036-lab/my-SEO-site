import Link from "next/link"
import type { Metadata } from "next"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "ANGKAR — The Deep Foundation | Mondulkiri Robusta by OCC",
  description:
    "ANGKAR: a deep, full-bodied Mondulkiri Robusta with dark cocoa, roasted peanut, and molasses notes. Direct trade, farmer relationships, local roasting.",
  keywords: [
    "ANGKAR coffee",
    "Mondulkiri Robusta",
    "full-bodied Robusta",
    "Cambodian coffee",
    "direct trade coffee Cambodia",
    "dark cocoa coffee",
    "molasses coffee notes",
    "traditional Cambodian coffee",
    "local roasting Cambodia",
  ],
  alternates: pageAlternates("/collection/angkar"),
  openGraph: {
    title: "ANGKAR — The Deep Foundation | OCC",
    description:
      "The deepest, most structural expression of Mondulkiri Robusta — dark cocoa, roasted peanut, molasses.",
    url: `${siteUrl}/collection/angkar`,
    type: "website",
  },
}

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "ANGKAR — The Deep Foundation",
  description:
    "OCC's deep, full-bodied expression of Mondulkiri Robusta, built on dark cocoa, roasted peanut, and molasses sweetness.",
  brand: { "@type": "Brand", name: "Origin Coffee Cambodia" },
  category: "Specialty Robusta Coffee",
  origin: { "@type": "Place", name: "Mondulkiri, Cambodia" },
  url: `${siteUrl}/collection/angkar`,
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Collection", item: `${siteUrl}/collection` },
    { "@type": "ListItem", position: 3, name: "ANGKAR", item: `${siteUrl}/collection/angkar` },
  ],
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What is ANGKAR?", acceptedAnswer: { "@type": "Answer", text: "ANGKAR is OCC's deep full-bodied Mondulkiri Robusta expression, built around dark cocoa, roasted peanut, and molasses." } },
    { "@type": "Question", name: "Is ANGKAR a dark roast?", acceptedAnswer: { "@type": "Answer", text: "It is the deepest roast expression in the collection, but it is designed to preserve sweetness and structure rather than taste burnt." } },
    { "@type": "Question", name: "What does direct trade mean here?", acceptedAnswer: { "@type": "Answer", text: "It refers to closer sourcing relationships with growers and producers, clearer communication, and fewer unnecessary layers in the supply chain." } },
    { "@type": "Question", name: "Why is ANGKAR full-bodied?", acceptedAnswer: { "@type": "Answer", text: "Robusta naturally contributes body, while processing, roasting, and brewing further shape texture and weight." } },
    { "@type": "Question", name: "Is ANGKAR suitable for milk coffee?", acceptedAnswer: { "@type": "Answer", text: "Yes. Its structure and dark sweetness allow it to remain present in milk-based drinks." } },
    { "@type": "Question", name: "How is ANGKAR different from SOVANN and PREK?", acceptedAnswer: { "@type": "Answer", text: "SOVANN emphasizes balance, PREK emphasizes brightness, and ANGKAR emphasizes depth, body, and roast structure." } },
  ],
}

export default function AngkarProductPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .occ-angkar .eyebrow{font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:#888}
            .occ-angkar h1,.occ-angkar h2,.occ-angkar h3,.occ-angkar .display{font-family:var(--font-display),Georgia,serif;font-weight:600;letter-spacing:-.055em;line-height:.82}
            .occ-angkar h1{font-size:48px;margin:18px 0 0}
            .occ-angkar h2{font-size:34px;line-height:1.25;letter-spacing:0;margin:0 0 24px;font-weight:500}
            .occ-angkar h3{font-size:26px;margin:28px 0 18px;line-height:1.2}
            .occ-angkar .display-lg{font-size:96px;line-height:.9;letter-spacing:-.04em}
            .occ-angkar .lead{font-size:24px;line-height:1.5;font-weight:600;margin:0;font-family:var(--font-sans),Inter,Arial,sans-serif;letter-spacing:0}
            .occ-angkar .copy{font-size:16px;line-height:1.9;color:#555;margin:0 0 18px;font-family:var(--font-sans),Inter,Arial,sans-serif}
            .occ-angkar .hero-sub{font-size:13px;letter-spacing:.18em;text-transform:uppercase;color:#555;margin-top:28px;font-family:var(--font-sans),Inter,Arial,sans-serif}
            .occ-angkar .panel{border-top:1px solid #111;border-bottom:1px solid #111;display:grid;grid-template-rows:auto 1fr auto;padding:24px 0;min-height:380px;margin-bottom:96px}
            .occ-angkar .panel-index,.occ-angkar .panel-meta{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#999;font-family:var(--font-sans),Inter,Arial,sans-serif}
            .occ-angkar .panel-title{align-self:center}
            .occ-angkar .panel-meta{display:flex;justify-content:space-between}
            .occ-angkar .section-title{font-size:33px;line-height:1.22;border-left:4px solid #111;padding-left:16px;margin:0;font-weight:600;letter-spacing:0}
            .occ-angkar .fact-grid{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid #ddd}
            .occ-angkar .fact{padding:24px 18px 20px 0;border-bottom:1px solid #ddd}
            .occ-angkar .fact:nth-child(2),.occ-angkar .fact:nth-child(3){padding-left:18px;border-left:1px solid #ddd}
            .occ-angkar .fact span{display:block;color:#999;font-size:10px;letter-spacing:.18em;text-transform:uppercase;margin-bottom:10px;font-family:var(--font-sans),Inter,Arial,sans-serif}
            .occ-angkar .fact strong{font-size:16px;font-weight:500;font-family:var(--font-sans),Inter,Arial,sans-serif}
            .occ-angkar .leftbar{border-left:4px solid #111;padding-left:26px}
            .occ-angkar .quote{font-family:var(--font-display),Georgia,serif;font-size:36px;line-height:1.3;border-left:1px solid #111;padding-left:28px;margin:12px 0 0;font-style:italic}
            .occ-angkar .back{position:absolute;top:32px;left:32px;z-index:10;color:#666;font-size:11px;letter-spacing:.18em;text-transform:uppercase;font-family:var(--font-sans),Inter,Arial,sans-serif}
            .occ-angkar .back:hover{color:#111}
            .occ-angkar .flavor-grid{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid #111;border-left:1px solid #ddd}
            .occ-angkar .flavor-card{padding:32px;min-height:250px;border-right:1px solid #ddd;border-bottom:1px solid #ddd}
            .occ-angkar .flavor-card span{font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#999;font-family:var(--font-sans),Inter,Arial,sans-serif}
            .occ-angkar .flavor-card p{font-size:14px;color:#666;line-height:1.8;margin:0;font-family:var(--font-sans),Inter,Arial,sans-serif}
            .occ-angkar .origin-list{display:grid;gap:22px}
            .occ-angkar .origin-row{display:grid;grid-template-columns:72px 1fr;gap:24px;padding-bottom:22px;border-bottom:1px solid #e5e5e5}
            .occ-angkar .origin-row span{font-size:10px;letter-spacing:.16em;color:#999;font-family:var(--font-sans),Inter,Arial,sans-serif}
            .occ-angkar .origin-row strong{font-size:18px;display:block;margin-bottom:6px;font-weight:600;font-family:var(--font-sans),Inter,Arial,sans-serif}
            .occ-angkar .origin-row p{font-size:14px;color:#666;margin:0;line-height:1.8;font-family:var(--font-sans),Inter,Arial,sans-serif}
            .occ-angkar .faq-item{padding:22px 0;border-top:1px solid #ddd}
            .occ-angkar .faq-item h3{font-size:17px;margin:0 0 10px;font-family:var(--font-sans),Inter,Arial,sans-serif;letter-spacing:0;line-height:1.3;font-weight:600}
            .occ-angkar .faq-item p{margin:0;color:#666;font-size:14px;line-height:1.8;font-family:var(--font-sans),Inter,Arial,sans-serif}
            .occ-angkar .cta{padding:110px 24px;text-align:center}
            .occ-angkar .cta h2{font-family:var(--font-display),Georgia,serif;font-size:64px;line-height:1.03;margin:0;letter-spacing:-.03em}
            .occ-angkar .cta p{color:#666;margin:26px 0;font-family:var(--font-sans),Inter,Arial,sans-serif}
            .occ-angkar .cta a,.occ-angkar .cta-link{display:inline-block;border:1px solid #111;padding:13px 18px;font-size:11px;letter-spacing:.16em;text-transform:uppercase;font-family:var(--font-sans),Inter,Arial,sans-serif;background:transparent;color:#111}
            .occ-angkar .cta a:hover,.occ-angkar .cta-link:hover{background:#111;color:#fff}
            .occ-angkar .cta-link.soft{border-color:#ddd;color:#666}
            .occ-angkar .cta-link.soft:hover{border-color:#111;color:#111;background:transparent}
            @media(min-width:768px){
              .occ-angkar h1{font-size:72px}
              .occ-angkar .display-lg{font-size:96px}
            }
            @media(max-width:850px){
              .occ-angkar h1{font-size:48px}
              .occ-angkar .display-lg{font-size:64px}
              .occ-angkar .panel{min-height:300px}
              .occ-angkar .fact-grid,.occ-angkar .flavor-grid{grid-template-columns:1fr}
              .occ-angkar .fact:nth-child(2),.occ-angkar .fact:nth-child(3){padding-left:0;border-left:0}
              .occ-angkar .quote{font-size:29px}
              .occ-angkar .cta h2{font-size:46px}
            }
          `,
        }}
      />
      <div className="min-h-screen bg-white text-[#111] occ-angkar" style={{ fontFamily: "var(--font-sans), Inter, Arial, sans-serif" }}>
        <a className="back" href="/collection">← BACK TO MONDULKIRI ORIGIN COLLECTION</a>
        <main className="max-w-[1152px] mx-auto px-8 md:px-16 pt-32 md:pt-40 pb-24">
          <header className="pb-14 border-b border-[#cfcfcf]">
            <span className="eyebrow">Mondulkiri Origin Collection / 03</span>
            <h1>ANGKAR</h1>
            <p className="hero-sub">The Deep Foundation</p>
          </header>

          <section className="py-[72px] grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <div className="leftbar"><p className="lead">The deepest, most structural expression of Mondulkiri Robusta.</p></div>
            </div>
            <div className="md:col-span-7">
              <p className="copy">ANGKAR is OCC's foundation-led interpretation of Mondulkiri: dark in tone, full in body, and built around the enduring structure of Cambodian Robusta. Dark cocoa, roasted peanut, and molasses form a profile connected to farmer relationships, direct sourcing, and the strength of local roasting traditions.</p>
            </div>
          </section>

          <section className="panel">
            <div className="panel-index">ANGKAR / 03</div>
            <div className="panel-title display-lg">DEEP<br />FOUNDATION</div>
            <div className="panel-meta"><span>MONDULKIRI, CAMBODIA</span><span>BODY / ROAST / ORIGIN</span></div>
          </section>

          <section className="pb-24 border-b border-[#e5e5e5]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-5"><h2 className="section-title">The coffee<br />at a glance.</h2></div>
              <div className="md:col-span-7">
                <div className="fact-grid">
                  <div className="fact"><span>Origin</span><strong>Mondulkiri, Cambodia</strong></div>
                  <div className="fact"><span>Species</span><strong>Robusta</strong></div>
                  <div className="fact"><span>Expression</span><strong>Deep & full-bodied</strong></div>
                  <div className="fact"><span>Foundation</span><strong>Dark cocoa</strong></div>
                  <div className="fact"><span>Texture</span><strong>Roasted peanut</strong></div>
                  <div className="fact"><span>Sweetness</span><strong>Molasses</strong></div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-24 border-b border-[#e5e5e5]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-14">
              <div className="md:col-span-5"><h2>Why ANGKAR exists</h2></div>
              <div className="md:col-span-7">
                <p className="copy">ANGKAR was created to represent the structural side of Mondulkiri Robusta: the body, roast depth, and lasting finish that have long shaped the way Cambodian coffee is experienced.</p>
                <p className="copy">The name points to foundation. ANGKAR is not simply the darkest coffee in the collection. It is the expression built around what supports the entire chain — farmers, direct relationships, local roasting, and a cup profile with weight and permanence.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-14">
              <div className="md:col-span-5"><h2>Direct trade as structure</h2></div>
              <div className="md:col-span-7">
                <p className="copy">ANGKAR draws attention to the importance of direct sourcing from Mondulkiri farmers and producer communities. A strong coffee business is not built only at the roasting stage. It begins with clear relationships, fair communication, lot understanding, and respect for the people producing the green coffee.</p>
                <p className="copy">Direct trade is not used here as decoration. It is a working principle: fewer layers, clearer accountability, and a closer connection between the farm, the roaster, and the final cup.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-5"><h2>The role of local roasting</h2></div>
              <div className="md:col-span-7">
                <p className="copy">ANGKAR embraces roast development as part of Cambodian coffee culture. Dark cocoa provides the main structure. Roasted peanut adds familiarity and texture. Molasses gives the cup a deep, slow sweetness.</p>
                <p className="copy">The goal is not to burn away the origin. It is to create body without harshness, depth without flatness, and a finish that remains grounded in the character of local Robusta.</p>
                <p className="quote">A foundation is not seen first. It is what allows everything else to stand.</p>
              </div>
            </div>
          </section>

          <section className="py-24 border-b border-[#e5e5e5]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-11">
              <div className="md:col-span-5"><h2 className="section-title">Flavor<br />architecture.</h2></div>
              <div className="md:col-span-7"><p className="copy mb-0">ANGKAR is built from dark cocoa, roasted nut depth, and a long molasses sweetness.</p></div>
            </div>
            <div className="flavor-grid">
              <div className="flavor-card"><span>01 / Foundation</span><h3>Dark Cocoa</h3><p>A dense cocoa impression that creates structure and gives ANGKAR its deep, serious character.</p></div>
              <div className="flavor-card"><span>02 / Texture</span><h3>Roasted Peanut</h3><p>A familiar roasted note that adds body, warmth, and a distinctly grounded finish.</p></div>
              <div className="flavor-card"><span>03 / Sweetness</span><h3>Molasses</h3><p>A dark, slow sweetness that adds length and prevents the deeper roast profile from becoming hollow.</p></div>
            </div>
          </section>

          <section className="py-24 border-b border-[#e5e5e5]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-5"><h2 className="section-title">What builds<br />the foundation.</h2></div>
              <div className="md:col-span-7">
                <div className="origin-list">
                  <div className="origin-row"><span>01</span><div><strong>Direct farmer relationships</strong><p>Closer sourcing relationships create better communication, stronger traceability, and clearer responsibility.</p></div></div>
                  <div className="origin-row"><span>02</span><div><strong>Mondulkiri Robusta</strong><p>The coffee's natural body and depth provide the structural base for ANGKAR's darker expression.</p></div></div>
                  <div className="origin-row"><span>03</span><div><strong>Local roasting knowledge</strong><p>Roast development is shaped to build body and sweetness while avoiding burnt or empty flavors.</p></div></div>
                  <div className="origin-row"><span>04</span><div><strong>Traditional coffee preferences</strong><p>ANGKAR respects the fuller, darker profiles familiar within Cambodian coffee culture.</p></div></div>
                  <div className="origin-row"><span>05</span><div><strong>Long-term supply relationships</strong><p>Consistency depends on repeated collaboration with growers, processors, and roasters — not one-time purchasing.</p></div></div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-24 border-b border-[#e5e5e5]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-5"><h2 className="section-title">ANGKAR<br />FAQ.</h2></div>
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
            <span className="eyebrow block mb-4">Mondulkiri Origin Collection / 03</span>
            <h2>TASTE THE DEEP FOUNDATION.</h2>
            <p>Structured. Full-bodied. Grounded in Mondulkiri.</p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link href="/contact" className="cta-link">Shop ANGKAR</Link>
              <Link href="/collection/sovann" className="cta-link soft">← Back: SOVANN</Link>
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
