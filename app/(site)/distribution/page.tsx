import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

const pageTitle = "International Coffee Distribution Partnerships | OCC"
const pageDescription =
  "Partner with OCC to distribute Cambodia-origin coffee, Fine Robusta and premium roasted coffee through retail, hospitality and specialty channels."

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: pageAlternates("/distribution"),
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${siteUrl}/distribution`,
    type: "website",
  },
}

const proofPoints = [
  "100% Cambodia Origin",
  "Fine Robusta Expertise",
  "Mondulkiri Focus",
  "Origin-Led Products",
  "Market Collaboration",
  "Selected Partnerships",
] as const

const partnershipTypes = [
  {
    title: "Importers",
    desc: "Coffee importers assessing Cambodia-origin products for their existing market and logistics network.",
  },
  {
    title: "Regional Distributors",
    desc: "Distribution businesses developing retail, foodservice, or specialty channels within a defined territory.",
  },
  {
    title: "Specialty Retailers",
    desc: "Retail groups and specialty coffee networks looking to introduce Cambodian coffee to their customers.",
  },
  {
    title: "Hotels & Hospitality Groups",
    desc: "Hospitality operators exploring recurring coffee distribution for guest and food-and-beverage channels.",
  },
  {
    title: "Travel & Lifestyle Retailers",
    desc: "Retail networks evaluating origin-led coffee products for their established market channels.",
  },
] as const

const productDirections = [
  {
    number: "01 / Roasted Coffee",
    title: "Premium Roasted Coffee",
    desc: "Cambodia-origin roasted coffee for retail, specialty, and hospitality channels. Product selection and packaging are reviewed against the needs of each market.",
  },
  {
    number: "02 / Fine Robusta",
    title: "Cambodia Fine Robusta",
    desc: "OCC's specialist coffee direction, with attention to origin, processing, cup quality, and the information buyers need to evaluate available lots.",
  },
  {
    number: "03 / Collections",
    title: "Origin-Led Collections",
    desc: "Coffee collections connected to Cambodian identity and product context, with range and availability confirmed during the partnership discussion.",
  },
] as const

const partnershipSteps = [
  {
    title: "Market & Territory Discussion",
    desc: "Share your target country, geographic coverage, current channels, and the market opportunity you intend to develop.",
  },
  {
    title: "Product & Sample Review",
    desc: "Identify the coffee categories of interest and discuss product information and samples, subject to availability.",
  },
  {
    title: "Channel & Volume Assessment",
    desc: "Review your retail or hospitality network, import capability, and estimated purchasing requirements together.",
  },
  {
    title: "Commercial Terms",
    desc: "Discuss the relevant product range, order quantities, pricing, territory, logistics, and any requested exclusivity; no terms are presumed or guaranteed.",
  },
  {
    title: "Launch & Market Support",
    desc: "Agree on a realistic launch plan and identify which product, origin, and brand materials may be available to support it.",
  },
] as const

const enquiryDetails = [
  "Target country or territory",
  "Current distribution channels",
  "Import and logistics capability",
  "Product categories of interest",
  "Estimated order volume",
  "Retail or hospitality network",
  "Preferred exclusivity arrangement, if any",
  "Proposed launch timeline",
] as const

const partnerSupport = [
  "Origin and product information",
  "Brand storytelling materials",
  "Product imagery, where available",
  "Digital and sales material discussion",
  "Coffee education needs",
  "Launch planning together",
] as const

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "International Coffee Distribution Partnerships",
  url: `${siteUrl}/distribution`,
  description: pageDescription,
  about: {
    "@type": "Organization",
    name: "Origin Coffee Cambodia",
    url: siteUrl,
  },
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Distribution", item: `${siteUrl}/distribution` },
  ],
}

export default function DistributionPage() {
  return (
    <div className="bg-occ-background text-occ-primary">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="border-b border-occ-primary/15">
        <div className="mx-auto grid min-h-[640px] w-full max-w-[1360px] lg:grid-cols-12">
          <div className="flex flex-col justify-between px-6 py-14 sm:px-10 lg:col-span-7 lg:px-14 lg:py-20 xl:px-20">
            <div className="flex items-center justify-between gap-6">
              <p className="text-[10px] uppercase tracking-[0.28em] text-occ-primary/58">
                Distribution · International Partnerships
              </p>
              <span className="hidden text-[10px] uppercase tracking-[0.24em] text-occ-primary/42 sm:inline">
                Origin Coffee Cambodia
              </span>
            </div>

            <div className="max-w-3xl py-14 lg:py-20">
              <p className="mb-5 text-[11px] uppercase tracking-[0.3em] text-occ-primary/52">
                Bring Cambodia-origin coffee to your market.
              </p>
              <h1 className="max-w-3xl text-[clamp(3rem,5.5vw,5.8rem)] font-normal leading-[0.94] tracking-[-0.045em]">
                International Coffee Distribution Partnerships
              </h1>
              <p className="mt-9 max-w-xl text-[15px] font-light leading-7 text-occ-primary/72 sm:text-base">
                OCC works with importers, regional distributors, and established retail or hospitality networks interested
                in introducing 100% Cambodia-origin coffee to their markets. Explore products, channels, and a commercial
                partnership built around your territory.
              </p>
            </div>

            <div className="flex flex-col gap-5 border-t border-occ-primary/15 pt-7 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-md text-sm leading-6 text-occ-primary/58">
                Fine Robusta, premium roasted coffee, and origin-led collections for selected international markets.
              </p>
              <Link
                href="/contact"
                className="inline-flex w-fit items-center gap-4 border-b border-occ-primary pb-1 text-[11px] uppercase tracking-[0.22em] transition-opacity hover:opacity-55"
              >
                Discuss Distribution <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>

          <div className="relative min-h-[440px] overflow-hidden bg-occ-primary lg:col-span-5 lg:min-h-full">
            <Image
              src="/distribution-hero.webp"
              alt="Coffee being prepared for OCC international distribution partners"
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover opacity-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-occ-primary/45 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between border-t border-white/45 pt-5 text-white sm:bottom-10 sm:left-10 sm:right-10">
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/75">One Origin</p>
              <p className="text-4xl font-light italic sm:text-5xl">Cambodia.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-occ-primary/15">
        <div className="mx-auto grid w-full max-w-[1360px] grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
          {proofPoints.map((item) => (
            <div
              key={item}
              className="flex min-h-28 items-center border-r border-t border-occ-primary/10 px-5 py-6 first:border-t-0 md:border-t-0 xl:first:border-l-0"
            >
              <span className="text-[10px] uppercase leading-5 tracking-[0.2em] text-occ-primary/62">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1360px] px-6 py-20 sm:px-10 lg:px-14 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="mb-5 text-[10px] uppercase tracking-[0.28em] text-occ-primary/48">01 · Partners</p>
            <h2 className="text-5xl font-normal leading-none sm:text-6xl">Who We Work With</h2>
            <p className="mt-7 max-w-sm text-sm leading-7 text-occ-primary/56">
              We focus on partners with identifiable channels and a defined plan for developing Cambodian coffee in their market.
            </p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            {partnershipTypes.map((item, index) => (
              <div key={item.title} className="grid gap-4 border-t border-occ-primary/15 py-7 sm:grid-cols-[70px_1fr_1.25fr] sm:items-start">
                <span className="text-[10px] tracking-[0.22em] text-occ-primary/38">0{index + 1}</span>
                <h3 className="text-2xl font-normal">{item.title}</h3>
                <p className="text-sm leading-6 text-occ-primary/58">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-occ-primary/15 bg-occ-background">
        <div className="mx-auto w-full max-w-[1360px] px-6 py-16 sm:px-10 lg:px-14">
          <div className="mb-14 flex flex-col gap-5 border-b border-occ-primary/15 pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-4 text-[10px] uppercase tracking-[0.28em] text-occ-primary/48">02 · Products</p>
              <h2 className="text-4xl font-normal sm:text-5xl">What Partners Can Bring to Market</h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-occ-primary/54">
              Product availability and formats are reviewed for each proposed partnership.
            </p>
          </div>
          <div className="grid lg:grid-cols-3">
            {productDirections.map((product, index) => (
              <article
                key={product.title}
                className={`py-9 ${index < 2 ? "border-b border-occ-primary/15 lg:border-b-0 lg:border-r" : ""} ${index === 0 ? "lg:pr-10" : index === 1 ? "lg:px-10" : "lg:pl-10"}`}
              >
                <p className="mb-14 text-[10px] uppercase tracking-[0.24em] text-occ-primary/42">{product.number}</p>
                <h3 className="text-3xl font-normal">{product.title}</h3>
                <p className="mt-5 max-w-md text-sm leading-7 text-occ-primary/62">{product.desc}</p>
              </article>
            ))}
          </div>
          <p className="mt-9 max-w-3xl border-t border-occ-primary/15 pt-7 text-sm leading-7 text-occ-primary/62">
            Selected partners may also explore Cambodian coffee gifting formats for hotels, travel retail and corporate programs. For dedicated gift and brand collaboration, visit{" "}
            <Link href="/partnerships" className="border-b border-current text-occ-primary transition-opacity hover:opacity-60">
              Brand &amp; Gift Partnerships
            </Link>.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1360px] px-6 py-20 sm:px-10 lg:px-14 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="mb-6 text-[10px] uppercase tracking-[0.28em] text-occ-primary/48">03 · Why OCC</p>
            <h2 className="max-w-xl text-5xl font-normal leading-[0.94] sm:text-6xl lg:text-7xl">
              Why Partner With OCC
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-10">
            <p className="max-w-2xl text-lg font-light leading-8 text-occ-primary/70">
              Cambodia is the origin behind every OCC coffee product, not an interchangeable sourcing label. Our Fine Robusta
              focus gives partners a distinct coffee category to introduce and explain, supported by an origin-led brand story.
            </p>
            <p className="mt-8 max-w-xl text-sm leading-7 text-occ-primary/56">
              We discuss product fit, buyer information, and practical market development with each potential partner. Exact
              product specifications, supply, and commercial commitments are confirmed before an agreement is made.
            </p>
            <Link href="/fine-robusta-cambodia" className="mt-8 inline-flex border-b border-occ-primary pb-1 text-[11px] uppercase tracking-[0.2em] transition-opacity hover:opacity-55">
              Explore Cambodia Fine Robusta <span className="ml-3" aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1360px] border-y border-occ-primary/15 bg-occ-background px-6 py-20 sm:px-10 lg:px-14 lg:py-24">
        <div className="mb-14 grid gap-8 border-b border-occ-primary/15 pb-9 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="mb-5 text-[10px] uppercase tracking-[0.28em] text-occ-primary/48">04 · Process</p>
            <h2 className="max-w-3xl text-4xl font-normal sm:text-5xl">How a Distribution Partnership Works</h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-occ-primary/56 lg:col-span-4 lg:col-start-9 lg:self-end">
            A structured discussion helps both sides assess the fit before making commitments.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 lg:gap-x-20">
          {partnershipSteps.map((step, index) => (
            <article key={step.title} className="grid grid-cols-[48px_1fr] gap-5 border-t border-occ-primary/15 py-8">
              <span className="text-[10px] tracking-[0.2em] text-occ-primary/44">0{index + 1}</span>
              <div>
                <h3 className="text-2xl font-normal">{step.title}</h3>
                <p className="mt-4 max-w-xl text-sm leading-7 text-occ-primary/60">{step.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-b border-occ-primary/15">
        <div className="mx-auto grid w-full max-w-[1360px] lg:grid-cols-2">
          <div className="border-b border-occ-primary/15 px-6 py-16 sm:px-10 lg:border-b-0 lg:border-r lg:px-14 lg:py-20 xl:px-20">
            <p className="mb-5 text-[10px] uppercase tracking-[0.28em] text-occ-primary/48">05 · Partner Enquiry</p>
            <h2 className="max-w-xl text-4xl font-normal sm:text-5xl">What to Include in Your Enquiry</h2>
            <p className="mt-7 max-w-xl text-sm leading-7 text-occ-primary/58">
              Introduce your company and include the details below so we can understand your distribution model and discuss
              a relevant next step. These are discussion points, not automatic eligibility requirements.
            </p>
            <div className="mt-12 grid gap-x-8 sm:grid-cols-2">
              {enquiryDetails.map((item) => (
                <div key={item} className="border-t border-occ-primary/12 py-4 text-sm text-occ-primary/66">{item}</div>
              ))}
            </div>
            <p className="mt-8 text-xs leading-6 text-occ-primary/46">
              Pricing, order quantities, territory rights, and exclusivity are discussed individually; they are not pre-approved offers.
            </p>
          </div>
          <div className="bg-occ-primary px-6 py-16 text-occ-background sm:px-10 lg:px-14 lg:py-20 xl:px-20">
            <p className="mb-5 text-[10px] uppercase tracking-[0.28em] text-occ-background/50">06 · Market Support</p>
            <h2 className="max-w-xl text-4xl font-normal sm:text-5xl">Building the Market Together</h2>
            <p className="mt-7 max-w-xl text-sm leading-7 text-occ-background/68">
              Partners can discuss the information and launch support appropriate to their product range and market plan.
              Materials and support are agreed individually rather than promised in advance.
            </p>
            <div className="mt-12 grid sm:grid-cols-2">
              {partnerSupport.map((item) => (
                <div key={item} className="border-t border-occ-background/20 py-4 text-sm text-occ-background/78">{item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-occ-surface px-6 py-20 text-center text-occ-primary sm:px-10 lg:px-14 lg:py-24">
        <p className="mb-7 text-[10px] uppercase tracking-[0.3em] text-occ-primary/52">Represent OCC in Your Market</p>
        <h2 className="mx-auto max-w-4xl text-[clamp(3rem,5.5vw,5.6rem)] font-normal leading-[0.95] tracking-[-0.04em]">
          Let's Discuss Your Market.
        </h2>
        <p className="mx-auto mt-7 max-w-2xl text-[15px] leading-7 text-occ-primary/68">
          Share your company, territory, existing channels, import capability, product interests, estimated volumes, and
          launch timeline. We will use these details to assess a possible international distribution partnership.
        </p>
        <Link href="/contact" className="mt-9 inline-flex items-center gap-5 border-b border-occ-primary/70 pb-2 text-[11px] uppercase tracking-[0.24em] transition-opacity hover:opacity-55">
          Discuss an International Distribution Partnership <span aria-hidden="true">↗</span>
        </Link>
        <p className="mt-14 text-[10px] uppercase tracking-[0.28em] text-occ-primary/40">
          Origin Coffee Cambodia · Cambodia-origin coffee. Built for the world.
        </p>
      </section>
    </div>
  )
}
