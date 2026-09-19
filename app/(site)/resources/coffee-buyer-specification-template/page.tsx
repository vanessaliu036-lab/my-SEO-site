import type { Metadata } from "next"
import Link from "next/link"
import { siteUrl, ogImage } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

const pathname = "/resources/coffee-buyer-specification-template"
const canonical = `${siteUrl}${pathname}`

export const metadata: Metadata = {
  title: "Coffee Buyer Specification Template | OCC",
  description:
    "A coffee buyer specification template for defining coffee format, cup profile, lot evidence, volume, delivery, and sample approval before contacting suppliers.",
  alternates: pageAlternates("/resources/coffee-buyer-specification-template"),
  openGraph: {
    title: "Coffee Buyer Specification Template | OCC",
    description:
      "Define the coffee, evidence, and supply conditions before treating an offer as commercially ready.",
    url: canonical,
    type: "article",
    images: [{ url: ogImage, width: 1200, height: 630, alt: "Coffee buyer specification template — OCC" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coffee Buyer Specification Template | OCC",
    description: "Define coffee specifications, sample evidence, and commercial requirements before requesting a quote.",
    images: [ogImage],
  },
}

const specificationFields = [
  {
    title: "Coffee format",
    detail: "Green, roasted, or both; whole bean or ground; intended market and packaging format.",
  },
  {
    title: "Use case",
    detail: "Espresso, filter, blend component, retail, hospitality, training, or another defined application.",
  },
  {
    title: "Target cup profile",
    detail: "Desired sweetness, body, acidity, bitterness, roast range, and acceptable variation.",
  },
  {
    title: "Lot identity",
    detail: "Origin, production area, processing method, harvest or production timing, and lot reference.",
  },
  {
    title: "Evidence required",
    detail: "Sample notes, moisture or water activity where available, grading, defects, and supporting documents.",
  },
  {
    title: "Commercial conditions",
    detail: "Expected volume, delivery location, storage responsibility, price basis, and review timeline.",
  },
  {
    title: "Approval process",
    detail: "Who cups or tests the sample, what passes, how substitutions are handled, and what happens next.",
  },
] as const

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Coffee Buyer Specification Template", item: canonical },
  ],
}

export default function CoffeeBuyerSpecificationTemplatePage() {
  return (
    <article className="bg-occ-background text-occ-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <header className="border-b border-black/10 px-6 pb-16 pt-10 sm:px-10 lg:px-20 lg:pb-24">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-16 flex gap-3 text-[10px] uppercase tracking-[0.2em] text-black/45">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Buyer tool</span>
          </nav>
          <p className="mb-5 text-[11px] uppercase tracking-[0.22em] text-black/45">Buyer tool / 01</p>
          <h1 className="max-w-4xl font-[var(--font-display)] text-[clamp(2.7rem,6vw,6rem)] font-normal leading-[0.98] tracking-[-0.04em]">
            COFFEE BUYER<br />SPECIFICATION TEMPLATE
          </h1>
          <p className="mt-10 max-w-2xl border-l-2 border-occ-secondary pl-5 text-lg leading-8 text-black/70">
            Use this checklist to define the coffee, evidence, and supply conditions before requesting a sample, lot list, or wholesale proposal.
          </p>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-14 px-6 py-16 sm:px-10 lg:grid-cols-12 lg:px-20 lg:py-24">
        <div className="lg:col-span-4">
          <p className="text-[11px] uppercase tracking-[0.2em] text-black/45">Why start here</p>
          <h2 className="mt-5 text-3xl font-normal tracking-[-0.03em]">A clear brief reduces sourcing friction.</h2>
        </div>
        <div className="space-y-6 text-[16px] leading-8 text-black/70 lg:col-span-7 lg:col-start-6">
          <p>
            A supplier conversation becomes more useful when both sides can distinguish the coffee being requested from the evidence needed to approve it. This template is not a certification or a substitute for sensory and commercial due diligence. It is a compact starting brief for importers, roasters, cafés, hotels, and other professional buyers.
          </p>
          <p>
            Complete the fields that matter to your use case, then send the brief with your expected timing and delivery location. If a requirement is unknown, mark it as open rather than filling the gap with an assumption.
          </p>
        </div>
      </section>

      <section className="border-y border-black/10 bg-occ-background px-6 py-16 sm:px-10 lg:px-20 lg:py-24" aria-labelledby="checklist-title">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] uppercase tracking-[0.2em] text-black/45">Specification checklist</p>
          <h2 id="checklist-title" className="mt-4 max-w-2xl text-4xl font-normal tracking-[-0.04em]">
            Define these seven fields before the first serious quote.
          </h2>
          <ol className="mt-12 divide-y divide-black/10 border-t border-black/10">
            {specificationFields.map((field, index) => (
              <li key={field.title} className="grid gap-5 py-7 md:grid-cols-12 md:gap-8">
                <span className="text-sm text-occ-secondary md:col-span-1" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-medium md:col-span-3">{field.title}</h3>
                <p className="max-w-2xl text-[15px] leading-7 text-black/65 md:col-span-7 md:col-start-6">
                  {field.detail}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:px-10 lg:grid-cols-12 lg:px-20 lg:py-24">
        <div className="lg:col-span-5">
          <p className="text-[11px] uppercase tracking-[0.2em] text-black/45">Sample evaluation</p>
          <h2 className="mt-4 text-4xl font-normal tracking-[-0.04em]">Do not approve a lot from origin language alone.</h2>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <ul className="space-y-5 text-[15px] leading-7 text-black/70">
            <li><strong className="text-black">Compare the physical sample.</strong> Record the sample identity, date received, preparation method, and test conditions.</li>
            <li><strong className="text-black">Separate facts from interpretation.</strong> Mark which claims are documented, which are sensory observations, and which still require confirmation.</li>
            <li><strong className="text-black">Define the commercial next step.</strong> State whether the next action is a second sample, lot review, roast test, price discussion, or supply conversation.</li>
          </ul>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link className="bg-occ-primary px-6 py-4 text-[11px] uppercase tracking-[0.18em] text-occ-background transition-colors hover:bg-occ-secondary" href="/contact">
              Discuss a sourcing brief
            </Link>
            <Link className="border border-black/20 px-6 py-4 text-[11px] uppercase tracking-[0.18em] transition-colors hover:border-black" href="/solutions/wholesale">
              Wholesale guidance
            </Link>
          </div>
        </div>
      </section>
    </article>
  )
}
