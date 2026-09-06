import type { Metadata } from "next"
import Link from "next/link"
import { siteName, siteUrl } from "@/lib/siteConfig"
import { pageAlternates, seoDescription, seoTitle } from "@/lib/seo"

const ownerPath = "/fine-robusta-cambodia"
const ownerUrl = `${siteUrl}${ownerPath}`
const description = seoDescription(
  "What Fine Robusta from Cambodia means, why Mondulkiri matters, how quality is evaluated, and what to verify before choosing a Cambodian Canephora coffee."
)

export const metadata: Metadata = {
  title: seoTitle("Fine Robusta Cambodia: What It Is, Mondulkiri & Quality | OCC"),
  description,
  keywords: [
    "Fine Robusta Cambodia",
    "Cambodia Fine Robusta",
    "Cambodian Fine Robusta",
    "Cambodia Robusta",
    "Mondulkiri coffee",
    "Coffea canephora Cambodia",
    "Fine Robusta coffee",
  ],
  alternates: pageAlternates(ownerPath),
  openGraph: {
    title: "Fine Robusta Cambodia: What It Is, Mondulkiri & Quality",
    description,
    url: ownerUrl,
    siteName,
    type: "article",
  },
}

const qualitySignals = [
  "Ripe-cherry selection and identifiable raw material",
  "Documented processing and fermentation where relevant",
  "Controlled drying, storage, and physical preparation",
  "Robusta-appropriate sensory evaluation with sample identity",
  "Traceability from the evaluated sample to the offered coffee",
  "Enough repeatability to compare quality across lots or harvests",
]

const consumerChecks = [
  "Origin specificity: Cambodia only, or a named region such as Mondulkiri?",
  "Coffee identity: is the species or coffee type stated where known?",
  "Processing: is the method disclosed when it is part of the quality story?",
  "Roast information: does the roast style fit the intended brew method?",
  "Freshness: is there a roast date or another useful freshness reference?",
  "Claim quality: are tasting notes and quality statements tied to this coffee rather than to Cambodia as a whole?",
]

const professionalChecks = [
  "Lot identity: region, producer or processor where verified, harvest period, process, and lot code.",
  "Physical condition: moisture, defects, foreign matter, preparation, storage condition, and measurement method where relevant.",
  "Sensory evidence: protocol, evaluation date, sample identity, evaluator context, and descriptive cup observations—not a score in isolation.",
  "Sample representativeness: whether the sample represents the actual commercial lot or only an earlier offer sample.",
  "Commercial reality: available quantity, packaging, timing, documentation, and whether a comparable lot can realistically be repeated.",
]

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Fine Robusta Cambodia: What It Is, Mondulkiri & Quality",
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
              <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.28em] text-stone-500">Cambodia Coffee Guide</p>
              <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-stone-950 sm:text-5xl">
                Fine Robusta Cambodia
              </h1>
              <p className="mt-6 max-w-2xl border-l border-stone-950 pl-5 text-base leading-8 text-stone-600 sm:text-lg">
                Fine Robusta from Cambodia is not a national grade or a promise that every Cambodian Robusta is premium. It is a quality-focused way of evaluating specific Coffea canephora coffees through origin, processing, physical condition, sensory evidence, traceability, and repeatability.
              </p>
            </header>

            <section className="space-y-5 text-[15px] leading-[1.8] text-stone-700 sm:text-base">
              <h2 className="text-2xl font-semibold tracking-tight text-stone-950">What is Fine Robusta from Cambodia?</h2>
              <p>
                In practical terms, Fine Robusta from Cambodia refers to quality-focused <em>Coffea canephora</em> grown in Cambodia and evaluated as an identifiable sample or lot rather than judged only by species or country name.
              </p>
              <p>
                The distinction matters because “Robusta” covers an enormous range of coffee. Canephora can be produced for high-volume commodity markets, but it can also be selectively harvested, carefully processed, dried, sorted, roasted, and evaluated with a much stronger focus on cup quality. Fine Robusta is the language used for that quality-focused end of the spectrum.
              </p>
              <p>
                Cambodia is still an emerging origin in that conversation. The country does not have the international production scale or buyer familiarity of Vietnam, Brazil, Uganda, India, or Indonesia. Its opportunity is therefore less about claiming that Cambodian Robusta is automatically better and more about showing what can be verified in individual coffees.
              </p>
            </section>

            <section className="mt-12 border-t border-stone-200 pt-10">
              <h2 className="text-2xl font-semibold tracking-tight text-stone-950">Fine Robusta is a quality claim, not an origin label</h2>
              <div className="mt-5 space-y-5 text-[15px] leading-[1.8] text-stone-700 sm:text-base">
                <p>
                  Cambodia, Mondulkiri, Robusta, and Fine Robusta describe different things. Cambodia is a country. Mondulkiri is a geographic origin. Robusta is a common trade name for Coffea canephora. Fine Robusta concerns the quality of a specific Canephora coffee under an appropriate evaluation context.
                </p>
                <p>
                  Those layers should not be collapsed into one another. A coffee can be grown in Mondulkiri without being Fine Robusta. A Cambodian coffee can have an attractive flavor without proving anything about every other Cambodian lot. A historical high-scoring sample can demonstrate potential without guaranteeing the quality of the next harvest.
                </p>
                <p>
                  This is especially important for emerging origins. Early success can create attention quickly, but long-term credibility depends on whether the same origin can produce identifiable, representative, and commercially useful coffees repeatedly.
                </p>
              </div>
            </section>

            <section className="mt-12 border-t border-stone-200 pt-10">
              <h2 className="text-2xl font-semibold tracking-tight text-stone-950">Why Mondulkiri matters</h2>
              <div className="mt-5 space-y-5 text-[15px] leading-[1.8] text-stone-700 sm:text-base">
                <p>
                  Mondulkiri is currently the clearest documented geographic anchor for Cambodia’s contemporary Canephora story. Peer-reviewed field research has examined Coffea canephora farms around Sen Monorom, while more recent development programs have documented farmer support and investment in local processing infrastructure.
                </p>
                <p>
                  A 2021 study of three Canephora plantations around Sen Monorom reported an average elevation of roughly 700 metres for the study sites, a mean annual temperature of 22.9°C, and long-term annual rainfall of about 2,203 mm. The same study compared shaded and sunny areas and found no significant reduction in its principal yield and bean-size measurements under shade in the farms studied; soil moisture was generally higher in shaded areas.
                </p>
                <p>
                  Those findings are local evidence, not a province-wide specification. They help establish that Canephora production in Mondulkiri can be studied through real farms and measured growing conditions. They do not establish a guaranteed cup score, a single terroir profile, or one flavor for the entire province.
                </p>
                <p>
                  For the broader regional picture, the <Link href="/blog/mondulkiri-next-specialty-coffee-origin" className="border-b border-stone-300 text-stone-950 hover:border-stone-950">Mondulkiri coffee origin guide</Link> explains why the province is worth watching without treating “Mondulkiri” as a quality grade.
                </p>
              </div>
            </section>

            <section className="mt-12 border-t border-stone-200 pt-10">
              <h2 className="text-2xl font-semibold tracking-tight text-stone-950">A documented Cambodian quality reference</h2>
              <div className="mt-5 space-y-5 text-[15px] leading-[1.8] text-stone-700 sm:text-base">
                <p>
                  One useful historical reference is Coffee Quality Institute’s public record for Q Certified Robusta Sample 939618. The record documents a Cambodian sample at 80.50 points and identifies KOFI, harvest 2023/2024, TR4 planting material, Dry Ferment processing, 700 metres altitude, and lot K001.
                </p>
                <p>
                  What makes the record valuable is not simply the number 80.50. It is the connection between the sensory result and an identifiable sample. That is much stronger evidence than saying “Cambodian Robusta scores 80+” as if the result applied to a country.
                </p>
                <p>
                  Historical Q Robusta results should also be interpreted within the protocol and program in force when the coffee was evaluated. Quality-evaluation systems evolve. The historical result remains evidence for that sample; it should not be converted into a permanent grade for later harvests, unrelated lots, or all coffee from Mondulkiri.
                </p>
                <p>
                  The <Link href="/blog/fine-robusta-grading-standards-cqi-certification-for-cambodia" className="border-b border-stone-300 text-stone-950 hover:border-stone-950">Fine Robusta grading guide</Link> covers that standards context in more detail.
                </p>
              </div>
            </section>

            <section className="mt-12 border-t border-stone-200 pt-10">
              <h2 className="text-2xl font-semibold tracking-tight text-stone-950">What makes a Fine Robusta claim credible?</h2>
              <p className="mt-5 text-[15px] leading-[1.8] text-stone-700 sm:text-base">
                A quality claim becomes more useful when several parts of the production and evaluation chain agree with one another. No single fermentation technique, altitude number, tasting note, certificate, or score can replace that chain.
              </p>
              <ol className="mt-6 space-y-4 pl-6 text-[15px] leading-[1.75] text-stone-700 sm:text-base">
                {qualitySignals.map((item) => <li key={item} className="list-decimal pl-2">{item}</li>)}
              </ol>
              <p className="mt-6 text-[15px] leading-[1.8] text-stone-700 sm:text-base">
                This is also why traceability is more than storytelling. If the evaluated coffee cannot be connected to the coffee that is actually sold, the quality evidence becomes much less useful to a consumer, roaster, importer, or distributor.
              </p>
            </section>

            <section className="mt-12 border-t border-stone-200 pt-10">
              <h2 className="text-2xl font-semibold tracking-tight text-stone-950">How is Fine Robusta different from commodity Robusta?</h2>
              <div className="mt-5 space-y-5 text-[15px] leading-[1.8] text-stone-700 sm:text-base">
                <p>
                  Commodity and quality-focused Canephora should not be separated by a stereotype such as “cheap versus expensive” or “bitter versus sweet.” The more useful difference is how the coffee is produced, prepared, evaluated, documented, and sold.
                </p>
                <p>
                  High-volume commodity systems are designed to move large quantities against standardized commercial specifications. Fine Robusta asks additional questions about cherry selection, post-harvest control, defects, cup quality, traceability, and whether the sensory result is repeatable enough to support a differentiated product.
                </p>
                <p>
                  The two markets can coexist. Vietnam, for example, has a huge commodity Robusta industry and a growing quality-focused Canephora segment. Cambodia does not become more credible by dismissing the commodity market or by claiming that every small lot is specialty. Its stronger position is specificity.
                </p>
                <p>
                  If you want the origin-level comparison, read <Link href="/blog/cambodian-robusta-vs-vietnamese-robusta" className="border-b border-stone-300 text-stone-950 hover:border-stone-950">Cambodian Robusta vs Vietnamese Robusta</Link>.
                </p>
              </div>
            </section>

            <section className="mt-12 border-t border-stone-200 pt-10">
              <h2 className="text-2xl font-semibold tracking-tight text-stone-950">Does Fine Robusta from Cambodia have one flavor profile?</h2>
              <div className="mt-5 space-y-5 text-[15px] leading-[1.8] text-stone-700 sm:text-base">
                <p>
                  No province-wide or country-wide flavor profile is currently defensible from the public evidence available. Individual Cambodian Canephora lots may show chocolate, nut, caramelized sweetness, spice, fruit, dense body, or other characteristics, but those observations should remain attached to the specific coffee that produced them.
                </p>
                <p>
                  Flavor can change through genetics, cherry maturity, shade and water conditions, processing, fermentation, drying, storage, roast development, resting, grinder performance, water chemistry, and extraction. Even two coffees from the same region can present very differently.
                </p>
                <p>
                  For an emerging origin, this variability is not necessarily a weakness. It is a reason to collect better multi-lot and multi-year evidence before turning a tasting note into an origin slogan.
                </p>
              </div>
            </section>

            <section className="mt-12 border-t border-stone-200 pt-10">
              <h2 className="text-2xl font-semibold tracking-tight text-stone-950">What should consumers look for?</h2>
              <p className="mt-5 text-[15px] leading-[1.8] text-stone-700 sm:text-base">
                If you are buying Cambodian coffee for home rather than evaluating a green-coffee lot, the checklist can be much simpler. Look for enough information to understand what the product actually is and what the quality claim refers to.
              </p>
              <ol className="mt-6 space-y-4 pl-6 text-[15px] leading-[1.75] text-stone-700 sm:text-base">
                {consumerChecks.map((item) => <li key={item} className="list-decimal pl-2">{item}</li>)}
              </ol>
              <p className="mt-6 text-[15px] leading-[1.8] text-stone-700 sm:text-base">
                The phrase “Fine Robusta” should make the product easier to understand, not harder. If the label is premium but the origin, roast, process, or actual coffee identity remains vague, the wording is doing more work than the evidence.
              </p>
            </section>

            <section className="mt-12 border-t border-stone-200 pt-10">
              <h2 className="text-2xl font-semibold tracking-tight text-stone-950">What should professional buyers verify?</h2>
              <p className="mt-5 text-[15px] leading-[1.8] text-stone-700 sm:text-base">
                Roasters, importers, distributors, hospitality buyers, and other professional coffee teams need a more detailed version of the same principle: verify the coffee represented by the claim.
              </p>
              <ol className="mt-6 space-y-4 pl-6 text-[15px] leading-[1.75] text-stone-700 sm:text-base">
                {professionalChecks.map((item) => <li key={item} className="list-decimal pl-2">{item}</li>)}
              </ol>
              <p className="mt-6 text-[15px] leading-[1.8] text-stone-700 sm:text-base">
                A compelling sample can start a conversation. A clear system for identity, preparation, delivery, and repeat evaluation is what makes that conversation commercially useful.
              </p>
            </section>

            <section className="mt-12 border-t border-stone-200 pt-10">
              <h2 className="text-2xl font-semibold tracking-tight text-stone-950">Why Fine Robusta from Cambodia is worth watching</h2>
              <div className="mt-5 space-y-5 text-[15px] leading-[1.8] text-stone-700 sm:text-base">
                <p>
                  Cambodia does not need to become a large-volume Robusta origin to become more interesting to the specialty market. Its more realistic opportunity is to make a smaller origin easier to understand: named places, identifiable coffees, better processing records, transparent quality evidence, and products that connect the story of Cambodia to an actual cup.
                </p>
                <p>
                  Mondulkiri gives that effort a geographic anchor. Documented Canephora production gives it a species foundation. Historical quality records show that Cambodian samples can enter serious quality conversations. What remains to be built is the depth of multi-year evidence and commercial repeatability that turns isolated promising coffees into a recognizable origin category.
                </p>
                <p>
                  That is why Fine Robusta matters here. It gives Cambodian Canephora a way to be evaluated beyond the old assumption that Robusta is only about strength, caffeine, or low-cost volume—without requiring anyone to pretend that every Cambodian coffee has already reached that quality level.
                </p>
              </div>
            </section>

            <section className="mt-12 border-t border-stone-200 pt-10">
              <h2 className="text-2xl font-semibold tracking-tight text-stone-950">Exploring Cambodian Fine Robusta beyond the category</h2>
              <div className="mt-5 space-y-5 text-[15px] leading-[1.8] text-stone-700 sm:text-base">
                <p>
                  If you’re exploring Cambodian coffee beyond the category itself, OCC is developing a Cambodia-focused premium coffee brand built around origin, Fine Robusta, quality, and international market access.
                </p>
                <p>
                  For a consumer or retail reader, the natural next step is to <Link href="/collection" className="border-b border-stone-300 text-stone-950 hover:border-stone-950">explore the Mondulkiri Origin Collection</Link> and compare how Cambodian Robusta is presented as a finished coffee product. For broader context, continue with the <Link href="/blog/cambodia-coffee" className="border-b border-stone-300 text-stone-950 hover:border-stone-950">Cambodian coffee overview</Link>.
                </p>
                <p>
                  If your interest is professional rather than retail—distribution, wholesale supply, hospitality, or a longer-term coffee partnership—continue to <Link href="/solutions/wholesale" className="border-b border-stone-300 text-stone-950 hover:border-stone-950">Wholesale &amp; Sourcing</Link> or <Link href="/contact" className="border-b border-stone-300 text-stone-950 hover:border-stone-950">contact OCC</Link>. Those commercial routes are separate from the evidence required to understand Fine Robusta itself.
                </p>
              </div>
            </section>

            <section className="mt-12 border-t border-stone-200 pt-10">
              <h2 className="text-2xl font-semibold tracking-tight text-stone-950">Sources and further reading</h2>
              <ul className="mt-6 space-y-4 text-[15px] leading-[1.75] text-stone-700 sm:text-base">
                <li><a href="https://database.coffeeinstitute.org/api/coffee/939618/pdf" target="_blank" rel="noopener noreferrer" className="border-b border-stone-300 text-stone-950 hover:border-stone-950">Coffee Quality Institute — Q Certified Robusta Sample 939618</a></li>
                <li><a href="https://www.mdpi.com/2071-1050/13/24/13823" target="_blank" rel="noopener noreferrer" className="border-b border-stone-300 text-stone-950 hover:border-stone-950">Sustainability (2021) — Coffea canephora shade research in Mondulkiri</a></li>
                <li><a href="https://www.snv.org/library/business-case-spotlight-kofi" target="_blank" rel="noopener noreferrer" className="border-b border-stone-300 text-stone-950 hover:border-stone-950">SNV — Business case spotlight: KOFI</a></li>
                <li><Link href="/blog/mondulkiri-next-specialty-coffee-origin" className="border-b border-stone-300 text-stone-950 hover:border-stone-950">Mondulkiri Coffee: What Makes It Different?</Link></li>
                <li><Link href="/blog/cambodian-robusta-vs-vietnamese-robusta" className="border-b border-stone-300 text-stone-950 hover:border-stone-950">Cambodian Robusta vs Vietnamese Robusta</Link></li>
                <li><Link href="/blog/fine-robusta-grading-standards-cqi-certification-for-cambodia" className="border-b border-stone-300 text-stone-950 hover:border-stone-950">Fine Robusta grading and standards context</Link></li>
              </ul>
            </section>

            <footer className="mt-14 border-t border-stone-200 pt-8 text-sm leading-7 text-stone-500">
              <p>
                Fine Robusta claims should be attached to identifiable coffee evidence. Origin can create interest; lot-level quality and repeatability are what make the claim useful.
              </p>
            </footer>
          </article>
        </main>
      </div>
    </>
  )
}
