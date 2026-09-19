import type { Metadata } from "next"
import Link from "next/link"
import { pageAlternates } from "@/lib/seo"
import { siteUrl } from "@/lib/siteConfig"

// Recovery of the original Cambodia Coffee owner route. Do not redirect this
// URL to the geography-only Cambodia & Regions page or to another blog owner.
const title = "Cambodia Coffee | Origin, Culture & Fine Robusta | OCC"
const description =
  "Discover coffee grown in Cambodia, the country's coffee culture, Mondulkiri origins, Fine Robusta quality and what buyers should verify before purchasing."

export const metadata: Metadata = {
  title,
  description,
  alternates: pageAlternates("/origins/cambodia-coffee"),
  openGraph: {
    title,
    description,
    url: `${siteUrl}/origins/cambodia-coffee`,
    type: "article",
  },
}

const steps = [
  { title: "Where it grows", href: "/origins/cambodia-regions", label: "Explore Cambodia & Regions" },
  { title: "How it grows", href: "/origins/farm-terroir", label: "Explore Farm & Terroir" },
  { title: "How quality is evaluated", href: "/fine-robusta-cambodia", label: "Explore Fine Robusta Cambodia" },
  { title: "How buyers can start", href: "/solutions/wholesale", label: "Explore Wholesale" },
]

export default function CambodiaCoffeePage() {
  return (
    <article className="bg-occ-background text-occ-primary">
      <header className="border-b border-black/10 px-6 pb-16 pt-28 sm:px-8 md:px-12 lg:pb-24 lg:pt-36">
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-occ-secondary">ORIGINS / CAMBODIA COFFEE</p>
        <h1 className="mt-8 max-w-5xl font-[var(--font-display)] text-[clamp(3rem,7vw,6rem)] font-normal leading-[0.98] tracking-[-0.04em]">Cambodia Coffee</h1>
        <p className="mt-8 max-w-3xl text-lg leading-8 text-occ-primary/75">A country of origin, a living coffee culture and a quality story worth understanding on its own terms.</p>
        <p className="mt-6 max-w-3xl text-base leading-8 text-occ-primary/70">OCC begins with coffee grown in Cambodia. Robusta or Arabica, the agricultural origin comes first. This introduction separates the country, the way coffee is enjoyed, the work behind individual lots and the evidence required to describe quality responsibly.</p>
      </header>

      <div className="mx-auto max-w-5xl space-y-16 px-6 py-16 sm:px-8 md:px-12 lg:space-y-24 lg:py-24">
        <section aria-labelledby="meaning-title" className="border-b border-black/10 pb-14">
          <p className="text-[10px] uppercase tracking-[0.2em] text-occ-secondary">01 / COUNTRY OF ORIGIN</p>
          <h2 id="meaning-title" className="mt-5 font-[var(--font-display)] text-4xl leading-tight">What does Cambodian coffee mean?</h2>
          <div className="mt-7 max-w-3xl space-y-5 text-base leading-8 text-occ-primary/75">
            <p>Cambodian coffee can describe several different things: coffee cultivated in the country, coffee roasted or packaged locally, or a beverage prepared in a Cambodian style. These descriptions are not interchangeable. When OCC says Cambodia-origin coffee, it refers to the coffee itself being grown in Cambodia, not merely a product sold or prepared there.</p>
            <p>That distinction is especially important for people discovering an unfamiliar origin. A country name is a starting point, not a substitute for information about a specific producer, harvest, processing method or lot. A clear origin claim should become more precise when supporting records are available.</p>
            <p>OCC focuses exclusively on Cambodian-grown coffee. We do not treat beans from another country as Cambodian coffee simply because they have been roasted, packed or served in Cambodia. The origin promise and the quality evaluation are separate commitments: one identifies where coffee begins, and the other asks what the particular coffee can demonstrate.</p>
          </div>
        </section>

        <section aria-labelledby="regions-title" className="border-b border-black/10 pb-14">
          <p className="text-[10px] uppercase tracking-[0.2em] text-occ-secondary">02 / PLACE</p>
          <h2 id="regions-title" className="mt-5 font-[var(--font-display)] text-4xl leading-tight">Where is coffee grown in Cambodia?</h2>
          <div className="mt-7 max-w-3xl space-y-5 text-base leading-8 text-occ-primary/75">
            <p>The country's northeastern highlands provide an important context for contemporary Cambodian coffee. Mondulkiri is OCC's primary regional focus. Ratanakiri contributes to the wider geographical picture, but no single province, elevation or landscape should be used to describe every Cambodian lot.</p>
            <p>Geography can help buyers ask better questions. A regional name can lead to a farm or producer, then a harvest, process and identifiable lot. It cannot, on its own, prove the coffee's sensory quality or establish a universal flavor profile for the region.</p>
            <p>The separate <Link className="underline underline-offset-4" href="/origins/cambodia-regions">Cambodia &amp; Regions</Link> guide owns the geographic questions: growing regions, northeastern highlands, Mondulkiri and Ratanakiri. For the interaction between climate, soil, shade and farm decisions, continue to <Link className="underline underline-offset-4" href="/origins/farm-terroir">Farm &amp; Terroir</Link>. This page is the broader country-level introduction, not a competing regional guide.</p>
          </div>
        </section>

        <section aria-labelledby="culture-title" className="border-b border-black/10 pb-14">
          <p className="text-[10px] uppercase tracking-[0.2em] text-occ-secondary">03 / CULTURE &amp; THE CUP</p>
          <h2 id="culture-title" className="mt-5 font-[var(--font-display)] text-4xl leading-tight">Coffee culture and coffee origin are different stories.</h2>
          <div className="mt-7 max-w-3xl space-y-5 text-base leading-8 text-occ-primary/75">
            <p>Visitors may encounter coffee through sweetened drinks, iced preparations, condensed milk and darker roast traditions. Those are part of how coffee is experienced, shared and enjoyed in Cambodia. They do not by themselves identify where the beans were grown or how the raw coffee was processed.</p>
            <p>Origin-focused coffee starts with a different question: what does this particular bean reveal about its source? Its cup may change with harvest selection, post-harvest handling, drying, roasting and brewing. The same country can contain distinct coffee experiences without requiring every coffee to taste alike.</p>
            <p>Neither story needs to replace the other. Cambodian coffee culture gives people an accessible first encounter. The origin and processing record allows that encounter to become more specific. OCC connects those layers while avoiding the claim that one traditional preparation or one tasting note represents every coffee from Cambodia.</p>
          </div>
        </section>

        <section aria-labelledby="robusta-title" className="border-b border-black/10 pb-14">
          <p className="text-[10px] uppercase tracking-[0.2em] text-occ-secondary">04 / QUALITY</p>
          <h2 id="robusta-title" className="mt-5 font-[var(--font-display)] text-4xl leading-tight">Why Fine Robusta matters to OCC.</h2>
          <div className="mt-7 max-w-3xl space-y-5 text-base leading-8 text-occ-primary/75">
            <p>Robusta has often been reduced to a narrow expectation of bitterness and strength. A quality-focused Cambodian Canephora conversation asks more useful questions: how cherries were selected, how fermentation and drying were controlled, whether defects were assessed, and what the cup actually shows under an appropriate evaluation method.</p>
            <p>Fine Robusta is not a synonym for coffee from Cambodia, and a Mondulkiri origin claim does not automatically confer a quality grade. Each lot must stand on its own evidence. OCC uses Fine Robusta as a professional focus while keeping the broader promise clear: all OCC coffee, including Arabica where offered, begins in Cambodia.</p>
            <p>For definitions, processing, grading and sensory evaluation, visit the distinct <Link className="underline underline-offset-4" href="/fine-robusta-cambodia">Fine Robusta Cambodia</Link> quality guide. This country-level page introduces the subject; it does not replace the specialist quality owner or claim scores and certifications for undocumented lots.</p>
          </div>
        </section>

        <section aria-labelledby="buyers-title" className="border-b border-black/10 pb-14">
          <p className="text-[10px] uppercase tracking-[0.2em] text-occ-secondary">05 / EVIDENCE</p>
          <h2 id="buyers-title" className="mt-5 font-[var(--font-display)] text-4xl leading-tight">How can buyers verify Cambodian coffee?</h2>
          <div className="mt-7 max-w-3xl space-y-5 text-base leading-8 text-occ-primary/75">
            <p>Begin with agricultural origin rather than packaging language. Ask for the producer or source, region, harvest or crop year, processing method and lot identity where available. For professional purchases, follow with sample identity, physical grading, moisture, sensory protocol, available quantity, storage and export or shipment documentation appropriate to the transaction.</p>
            <p>Some information may not yet be available for an emerging origin. A missing field should be described as unverified, not filled with an invented farm name, cup score, stock level or certification. Transparent limitations are more useful to a buyer than a promise that cannot be traced to a sample or lot.</p>
            <p>OCC connects education about Cambodian coffee with practical sourcing and roasting conversations. The professional buying route is <Link className="underline underline-offset-4" href="/solutions/wholesale">Wholesale</Link>; it is a commercial next step rather than the owner of the broad informational term Cambodia Coffee.</p>
          </div>
        </section>

        <nav aria-label="Continue exploring Cambodian coffee" className="grid gap-6 border-t border-black/10 pt-10 sm:grid-cols-2">
          {steps.map((step) => (
            <Link key={step.href} href={step.href} className="block border-b border-black/15 pb-7 transition-opacity hover:opacity-65">
              <span className="block text-xs uppercase tracking-[0.18em] text-occ-secondary">{step.title}</span>
              <span className="mt-3 block font-[var(--font-display)] text-2xl">{step.label} ↗</span>
            </Link>
          ))}
        </nav>
      </div>
    </article>
  )
}
