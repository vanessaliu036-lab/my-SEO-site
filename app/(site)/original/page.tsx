import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Original | Cambodia Coffee Evidence & Buyer Confidence | OCC",
  description:
    "A commercial trust gateway for buyers evaluating OCC: origin, processing, lot and specification discussion, quality evaluation, traceability records, and availability confirmation according to the coffee being considered.",
  alternates: pageAlternates("/original"),
  openGraph: {
    title: "Original | Origin Coffee Cambodia",
    description: "See what evidence can support a Cambodia coffee sourcing, roasting, supply, or distribution discussion with OCC.",
    url: `${siteUrl}/original`,
    type: "website",
  },
}

const evidence = [
  {
    title: "Origin Information",
    body: "Where the coffee comes from and the origin scope that can be supported for the coffee being evaluated. Cambodia remains the non-negotiable origin at the center of OCC.",
  },
  {
    title: "Processing Information",
    body: "Processing details are discussed according to the records available for the coffee or lot. Missing detail is treated as a boundary, not filled with an assumption.",
  },
  {
    title: "Lot / Specification Discussion",
    body: "Lot identity, format, grade, physical or commercial specifications, and intended application are defined where relevant and where supporting information is available.",
  },
  {
    title: "Quality Evaluation",
    body: "Quality discussion can include sensory evaluation, cup direction, sample comparison, or other agreed criteria appropriate to the buyer requirement and coffee being considered.",
  },
  {
    title: "Traceability Records",
    body: "Traceability is described only to the depth supported by available records. OCC does not present a complete farm-to-buyer chain when the underlying record does not support that claim.",
  },
  {
    title: "Availability Confirmation",
    body: "Coffee, sample, production, capacity, timing, and commercial availability are confirmed according to the actual lot and sourcing situation before they become commitments.",
  },
] as const

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "OCC Original — Commercial Trust Gateway",
  url: `${siteUrl}/original`,
  about: {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Origin Coffee Cambodia",
  },
}

export default function OriginalPage() {
  return (
    <div className="bg-[#f6f3ea] text-[#182019]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />

      <section className="border-b border-[#182019]/15 px-6 pb-16 pt-32 sm:px-10 lg:px-16 lg:pb-24 lg:pt-40">
        <div className="mx-auto grid max-w-[1680px] gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-3">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#182019]/45">03 / Original</p>
            <p className="mt-8 max-w-xs text-sm leading-7 text-[#182019]/62">
              A commercial trust gateway for buyers. Evidence depth remains in OCC&apos;s existing Origins and research layers.
            </p>
          </div>
          <div className="lg:col-span-7 lg:col-start-5">
            <p className="mb-5 text-[10px] uppercase tracking-[0.28em] text-[#a8542a]">Evidence → Buyer Confidence → Conversation</p>
            <h1 className="font-[var(--font-display)] text-[clamp(4.2rem,9vw,9rem)] font-normal leading-[0.82] tracking-[-0.055em]">
              Proof before promise.
            </h1>
            <p className="mt-8 max-w-2xl text-base font-light leading-8 text-[#182019]/68">
              If you are evaluating Cambodian coffee, OCC should be able to show what is known, what can be checked, and what still needs to be confirmed before a commercial decision is made.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1680px] px-6 sm:px-10 lg:px-16">
        <section className="py-20 lg:py-28" aria-labelledby="buyer-evidence-title">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <p className="text-[10px] uppercase tracking-[0.26em] text-[#182019]/42">01 / Buyer Evidence</p>
              <h2 id="buyer-evidence-title" className="mt-5 font-[var(--font-display)] text-4xl font-normal leading-none tracking-[-0.035em]">
                What can be<br />put on the table.
              </h2>
            </div>
            <div className="lg:col-span-8 lg:col-start-5">
              {evidence.map((item, index) => (
                <article key={item.title} className="grid gap-4 border-t border-[#182019]/15 py-8 sm:grid-cols-[56px_1fr_1.4fr] sm:items-start">
                  <span className="text-[10px] tracking-[0.2em] text-[#a8542a]">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="text-2xl font-normal leading-tight">{item.title}</h3>
                  <p className="text-sm leading-7 text-[#182019]/62">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-8 border-y border-[#182019]/15 py-16 lg:grid-cols-12 lg:items-center lg:py-20">
          <div className="lg:col-span-5">
            <p className="text-[10px] uppercase tracking-[0.26em] text-[#182019]/42">02 / Evidence Depth</p>
            <h2 className="mt-5 font-[var(--font-display)] text-4xl font-normal leading-none tracking-[-0.035em]">Go deeper without duplicating owners.</h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="max-w-2xl text-sm leading-7 text-[#182019]/64">
              ORIGINAL explains the commercial evidence categories. The existing ORIGINS layer continues to carry indexed Cambodia-origin depth, while the Fine Robusta owner remains the specialist authority route.
            </p>
            <div className="mt-7 flex flex-wrap gap-5 text-[10px] uppercase tracking-[0.18em]">
              <Link href="/origins" className="border-b border-[#182019] pb-1">Explore Origin Evidence <ArrowUpRight className="ml-1 inline size-3" /></Link>
              <Link href="/fine-robusta-cambodia" className="border-b border-[#182019] pb-1">Fine Robusta Cambodia <ArrowUpRight className="ml-1 inline size-3" /></Link>
            </div>
          </div>
        </section>

        <section className="grid gap-10 py-20 lg:grid-cols-12 lg:items-end lg:py-28">
          <div className="lg:col-span-5">
            <p className="text-[10px] uppercase tracking-[0.26em] text-[#a8542a]">03 / Buyer Action</p>
            <h2 className="mt-5 font-[var(--font-display)] text-5xl font-normal leading-[0.95] tracking-[-0.04em] sm:text-6xl">
              Tell us what<br />you need to verify.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="text-sm leading-7 text-[#182019]/64">
              You do not need a finished PO. Start with the market, coffee requirement, product idea, sourcing question, or evidence you need in order to evaluate the next step.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#182019] px-5 py-3 text-[10px] font-medium uppercase tracking-[0.16em] text-[#f6f3ea]">
                Start a Conversation <ArrowUpRight className="size-3" />
              </Link>
              <Link href="/solutions" className="inline-flex items-center gap-2 rounded-full border border-[#182019]/25 px-5 py-3 text-[10px] font-medium uppercase tracking-[0.16em]">
                Explore Solutions <ArrowUpRight className="size-3" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
