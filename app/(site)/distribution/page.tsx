import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Distribution Partners | Cambodian Coffee Brand | OCC",
  description:
    "Partner with Origin Coffee Cambodia to bring 100% Cambodia-origin coffee, Fine Robusta, and premium roasted coffee into international retail, hospitality, and specialty coffee markets.",
  alternates: pageAlternates("/distribution"),
  openGraph: {
    title: "Bring Cambodian Coffee to Your Market | OCC Distribution",
    description:
      "Distribution, agency, retail, and hospitality partnerships for Origin Coffee Cambodia — a premium coffee brand built around Cambodia origin.",
    url: `${siteUrl}/distribution`,
    type: "website",
  },
}

const proofPoints = [
  "100% Cambodia Origin",
  "Fine Robusta",
  "Mondulkiri Focus",
  "Premium Positioning",
  "Origin Transparency",
  "Selected Partnerships",
] as const

const partnershipTypes = [
  {
    title: "Distributors & Importers",
    desc: "For established coffee, retail, and hospitality networks bringing OCC into a new market.",
  },
  {
    title: "Regional Agents",
    desc: "For local partners developing OCC within a defined territory and long-term market plan.",
  },
  {
    title: "Specialty Retailers & Cafés",
    desc: "For businesses seeking a distinctive origin-led coffee brand with a clear Cambodia story.",
  },
  {
    title: "Hotels & Hospitality",
    desc: "For rooms, restaurants, guest experiences, and premium gifting built around Cambodian coffee.",
  },
  {
    title: "Premium Gift & Lifestyle",
    desc: "For retail environments where origin, culture, presentation, and story are part of the product value.",
  },
] as const

const distributionFormats = [
  "Retail distribution",
  "Specialty coffee retail",
  "Café partnerships",
  "Hotel & hospitality supply",
  "Premium gifting",
  "Corporate gifting",
  "Regional representation",
  "Market-exclusive distribution",
  "Limited origin collections",
] as const

const partnerSupport = [
  "Origin & product education",
  "Brand storytelling",
  "Product imagery",
  "Digital & sales materials",
  "Coffee training support",
  "Launch collaboration",
] as const

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Origin Coffee Cambodia Distribution Partnerships",
  url: `${siteUrl}/distribution`,
  description:
    "Distribution, agency, retail, and hospitality partnership opportunities for Origin Coffee Cambodia.",
  about: {
    "@type": "Organization",
    name: "Origin Coffee Cambodia",
    url: siteUrl,
  },
}

export default function DistributionPage() {
  return (
    <div className="bg-[#f6f3ea] text-[#182019]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <section className="border-b border-[#182019]/15">
        <div className="grid min-h-[680px] lg:grid-cols-12">
          <div className="flex flex-col justify-between px-6 py-14 sm:px-10 lg:col-span-7 lg:px-14 lg:py-20 xl:px-20">
            <div className="flex items-center justify-between gap-6">
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#182019]/58">
                Distribution · International Partnerships
              </p>
              <span className="hidden text-[10px] uppercase tracking-[0.24em] text-[#182019]/42 sm:inline">
                Origin Coffee Cambodia
              </span>
            </div>

            <div className="max-w-4xl py-16 lg:py-24">
              <p className="mb-5 text-[11px] uppercase tracking-[0.3em] text-[#182019]/52">
                Cambodia-origin coffee
              </p>
              <h1 className="max-w-4xl text-[clamp(4rem,8vw,8.4rem)] font-normal leading-[0.83] tracking-[-0.055em]">
                Bring Cambodian Coffee to Your Market
              </h1>
              <p className="mt-9 max-w-xl text-[15px] font-light leading-7 text-[#182019]/72 sm:text-base">
                OCC is a premium coffee brand built around one origin: Cambodia. We work with selected distributors,
                agents, retailers, and hospitality partners to introduce Cambodia-grown coffee to new markets.
              </p>
            </div>

            <div className="flex flex-col gap-5 border-t border-[#182019]/15 pt-7 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-md text-sm leading-6 text-[#182019]/58">
                Fine Robusta, premium roasted coffee, and origin-led collections developed for long-term market building.
              </p>
              <Link
                href="/contact"
                className="inline-flex w-fit items-center gap-4 border-b border-[#182019] pb-1 text-[11px] uppercase tracking-[0.22em] transition-opacity hover:opacity-55"
              >
                Become a Distribution Partner <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>

          <div className="relative min-h-[440px] overflow-hidden bg-[#273229] lg:col-span-5 lg:min-h-full">
            <Image
              src="/hero-home.webp"
              alt="Origin Coffee Cambodia"
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#182019]/45 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between border-t border-white/45 pt-5 text-white sm:bottom-10 sm:left-10 sm:right-10">
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/75">One Origin</p>
              <p className="text-4xl font-light italic sm:text-5xl">Cambodia.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#182019]/15">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
          {proofPoints.map((item) => (
            <div
              key={item}
              className="flex min-h-28 items-center border-r border-t border-[#182019]/10 px-5 py-6 first:border-t-0 md:border-t-0 xl:first:border-l-0"
            >
              <span className="text-[10px] uppercase leading-5 tracking-[0.2em] text-[#182019]/62">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-24 sm:px-10 lg:px-14 lg:py-32 xl:px-20">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="mb-6 text-[10px] uppercase tracking-[0.28em] text-[#182019]/48">01 · The Opportunity</p>
            <h2 className="max-w-xl text-5xl font-normal leading-[0.94] sm:text-6xl lg:text-7xl">
              A coffee origin the world is only beginning to discover.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-16">
            <p className="max-w-2xl text-lg font-light leading-8 text-[#182019]/70">
              Cambodia remains one of Southeast Asia&apos;s lesser-known coffee origins. For international partners, that
              creates a genuine point of difference — not another generic coffee label, but a product connected to place,
              emerging quality, and a story consumers have not heard hundreds of times before.
            </p>
            <p className="mt-8 max-w-xl text-sm leading-7 text-[#182019]/56">
              OCC&apos;s role is to make Cambodian coffee easier to discover, understand, and bring to market while keeping
              Cambodia clearly at the center of the brand.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-[#182019]/15 bg-[#f1ede2]">
        <div className="px-6 py-16 sm:px-10 lg:px-14 xl:px-20">
          <div className="mb-14 flex flex-col gap-5 border-b border-[#182019]/15 pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-4 text-[10px] uppercase tracking-[0.28em] text-[#182019]/48">02 · The Coffee</p>
              <h2 className="text-4xl font-normal sm:text-5xl">Cambodian Coffee, Built for Premium Markets</h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[#182019]/54">
              Three complementary product directions. One clear origin identity.
            </p>
          </div>

          <div className="grid lg:grid-cols-3">
            <article className="border-b border-[#182019]/15 py-9 lg:border-b-0 lg:border-r lg:pr-10">
              <p className="mb-14 text-[10px] uppercase tracking-[0.24em] text-[#182019]/42">01 / Fine Robusta</p>
              <h3 className="text-3xl font-normal">Cambodia Fine Robusta</h3>
              <p className="mt-5 max-w-md text-sm leading-7 text-[#182019]/62">
                A central OCC category built around cup quality, origin, processing, and character — moving beyond the
                commodity perception traditionally associated with Robusta.
              </p>
            </article>

            <article className="border-b border-[#182019]/15 py-9 lg:border-b-0 lg:border-r lg:px-10">
              <p className="mb-14 text-[10px] uppercase tracking-[0.24em] text-[#182019]/42">02 / Roasted Coffee</p>
              <h3 className="text-3xl font-normal">Premium Roasted Coffee</h3>
              <p className="mt-5 max-w-md text-sm leading-7 text-[#182019]/62">
                Roasted coffee for retail, gifting, hospitality, and specialty coffee environments, developed to express
                Cambodian origin with consistency and accessibility.
              </p>
            </article>

            <article className="py-9 lg:pl-10">
              <p className="mb-14 text-[10px] uppercase tracking-[0.24em] text-[#182019]/42">03 / Collections</p>
              <h3 className="text-3xl font-normal">Origin-Led Collections</h3>
              <p className="mt-5 max-w-md text-sm leading-7 text-[#182019]/62">
                Collections shaped by place, coffee character, and Cambodian identity. Cambodia is not decorative context;
                it is the origin and the story.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 sm:px-10 lg:px-14 lg:py-32 xl:px-20">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="mb-5 text-[10px] uppercase tracking-[0.28em] text-[#182019]/48">03 · Partnerships</p>
            <h2 className="text-5xl font-normal leading-none sm:text-6xl">Who We Work With</h2>
            <p className="mt-7 max-w-sm text-sm leading-7 text-[#182019]/56">
              Focused regional partnerships are preferred over uncontrolled distribution. The aim is to build OCC properly
              in each market.
            </p>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            {partnershipTypes.map((item, index) => (
              <div
                key={item.title}
                className="grid gap-4 border-t border-[#182019]/15 py-7 sm:grid-cols-[70px_1fr_1.25fr] sm:items-start"
              >
                <span className="text-[10px] tracking-[0.22em] text-[#182019]/38">0{index + 1}</span>
                <h3 className="text-2xl font-normal">{item.title}</h3>
                <p className="text-sm leading-6 text-[#182019]/58">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#182019]/15">
        <div className="grid lg:grid-cols-2">
          <div className="border-b border-[#182019]/15 px-6 py-16 sm:px-10 lg:border-b-0 lg:border-r lg:px-14 lg:py-20 xl:px-20">
            <p className="mb-5 text-[10px] uppercase tracking-[0.28em] text-[#182019]/48">04 · Distribution Formats</p>
            <h2 className="max-w-xl text-4xl font-normal sm:text-5xl">Flexible structures for different markets.</h2>
            <div className="mt-12 grid gap-x-8 sm:grid-cols-2">
              {distributionFormats.map((item) => (
                <div key={item} className="border-t border-[#182019]/12 py-4 text-sm text-[#182019]/66">
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-8 text-xs leading-6 text-[#182019]/46">
              Product range, MOQ, territory, pricing, and commercial terms are discussed according to market requirements.
            </p>
          </div>

          <div className="bg-[#273229] px-6 py-16 text-[#f6f3ea] sm:px-10 lg:px-14 lg:py-20 xl:px-20">
            <p className="mb-5 text-[10px] uppercase tracking-[0.28em] text-[#f6f3ea]/50">05 · Partner Support</p>
            <h2 className="max-w-xl text-4xl font-normal sm:text-5xl">Building the Market Together</h2>
            <p className="mt-7 max-w-xl text-sm leading-7 text-[#f6f3ea]/68">
              Introducing a lesser-known coffee origin takes more than supplying products. Selected partners may receive the
              tools needed to explain and represent Cambodian coffee with clarity and consistency.
            </p>
            <div className="mt-12 grid sm:grid-cols-2">
              {partnerSupport.map((item) => (
                <div key={item} className="border-t border-[#f6f3ea]/20 py-4 text-sm text-[#f6f3ea]/78">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#182019] px-6 py-24 text-center text-[#f6f3ea] sm:px-10 lg:px-14 lg:py-32 xl:px-20">
        <p className="mb-8 text-[10px] uppercase tracking-[0.3em] text-[#f6f3ea]/46">Represent OCC in Your Market</p>
        <h2 className="mx-auto max-w-5xl text-[clamp(3.5rem,7vw,7.6rem)] font-normal leading-[0.9] tracking-[-0.045em]">
          Bring Cambodian Coffee to Your Market.
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-[#f6f3ea]/62">
          We are exploring selected distribution, agency, retail, and hospitality partnerships. Tell us about your company,
          market, network, product interest, expected volume, and preferred partnership model.
        </p>
        <Link
          href="/contact"
          className="mt-10 inline-flex items-center gap-5 border-b border-[#f6f3ea]/70 pb-2 text-[11px] uppercase tracking-[0.24em] transition-opacity hover:opacity-55"
        >
          Discuss Distribution <span aria-hidden="true">↗</span>
        </Link>
        <p className="mt-20 text-[10px] uppercase tracking-[0.28em] text-[#f6f3ea]/36">
          Origin Coffee Cambodia · Cambodia-origin coffee. Built for the world.
        </p>
      </section>
    </div>
  )
}
