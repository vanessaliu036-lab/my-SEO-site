import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import {
  homeAuthoritySections,
  homeDirectAnswer,
  homeFaqs,
  homeSources,
} from "@/lib/homeContent"

export default function HomeTemplate() {
  return (
    <>
      <section className="occ-home-hero relative isolate flex min-h-[620px] w-full items-center justify-center overflow-hidden bg-occ-primary text-white lg:min-h-[700px]">
        <picture className="absolute inset-0" aria-hidden="false">
          <source media="(max-width: 767px)" srcSet="/hero-home-mobile.webp" />
          <img
            src="/hero-home.webp"
            alt="A barista serving freshly brewed coffee in a warm, plant-filled café."
            width={1672}
            height={941}
            fetchPriority="high"
            decoding="async"
            className="size-full object-cover object-center"
          />
        </picture>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,14,13,0.72)_0%,rgba(18,14,13,0.56)_46%,rgba(18,14,13,0.30)_100%)]" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(41,36,36,0.18)_0%,rgba(41,36,36,0.08)_42%,rgba(41,36,36,0.58)_100%)]"
          aria-hidden="true"
        />

        <div className="pointer-events-none absolute inset-0 z-10 hidden md:block" aria-hidden="true">
          <div className="grid h-full w-full grid-cols-12 divide-x divide-white/15">
            <div className="col-span-1" />
            <div className="col-span-3" />
            <div className="col-span-4" />
            <div className="col-span-3" />
            <div className="col-span-1" />
          </div>
        </div>

        <div data-occ-home-copy className="relative z-20 mx-auto w-full max-w-[1360px] px-6 pb-24 pt-32 text-left sm:px-8 md:pb-20 lg:px-12">
          <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.3em] text-white/70 sm:text-xs">
            Cambodia · Coffea canephora · Fine Robusta
          </p>
          <h1 className="max-w-[880px] text-balance text-5xl font-normal leading-[0.96] tracking-[-0.045em] text-white sm:text-6xl md:text-7xl lg:text-[6rem]">
            Fine Robusta & Specialty Coffee from Cambodia
          </h1>
          <p className="mt-7 max-w-[720px] text-pretty text-sm font-light leading-7 text-white/80 sm:text-base md:text-lg md:leading-8">
            Origin Coffee Cambodia connects Cambodian coffee origins with specialty coffee sourcing, roasting, B2B supply, traceability, and quality-focused knowledge.
          </p>

          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Link href="/contact" className="occ-primary-cta">
              Start an enquiry
            </Link>
          </div>
        </div>

        <div data-occ-home-meta className="absolute bottom-0 left-0 right-0 z-20 flex items-end justify-between border-t border-white/15 px-5 py-5 text-[9px] uppercase tracking-[0.24em] text-white/55 sm:px-8 lg:px-12">
          <span>Origin Coffee Cambodia</span>
          <span className="hidden sm:inline">Sourcing · Quality · Solutions</span>
          <span>01 / Home</span>
        </div>
      </section>

      <section className="border-t border-occ-primary/12 bg-occ-background px-6 py-20 sm:px-8 md:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-occ-primary/52">Origin Coffee Cambodia</p>
          <h2 className="mb-6 max-w-3xl text-2xl font-semibold leading-tight tracking-tight text-occ-primary md:text-3xl">Cambodian coffee authority for sourcing, quality, and B2B decisions.</h2>
          <p className="max-w-3xl text-base leading-relaxed text-occ-primary/72 md:text-lg">{homeDirectAnswer}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/blog" className="inline-flex items-center gap-2 rounded-full border border-occ-primary/20 px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] text-occ-primary transition-colors duration-200 hover:border-occ-primary hover:bg-white/60">
              Research Journal <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
          <div className="mt-16 border-t border-occ-primary/14 md:mt-20">
            {homeAuthoritySections.map((section, sectionIndex) => (
              <section key={section.id} id={section.id} className="grid scroll-mt-24 grid-cols-12 gap-x-8 gap-y-5 border-b border-occ-primary/14 py-12 md:gap-x-12 md:py-14">
                <div className="col-span-12 md:col-span-4">
                  <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-occ-secondary">{String(sectionIndex + 1).padStart(2, "0")} / {section.eyebrow}</p>
                  <h2 className="text-xl font-semibold leading-snug tracking-tight text-occ-primary md:text-2xl">{section.title}</h2>
                </div>
                <div className="col-span-12 md:col-span-8">
                  <div className="space-y-5 text-[15px] leading-[1.8] text-occ-primary/72 md:text-base">{section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
                  {"items" in section && section.items ? <ol className="mt-8 list-decimal space-y-4 pl-6 marker:font-semibold marker:text-occ-primary">{section.items.map((item) => <li key={item} className="pl-2 text-[15px] leading-[1.75] text-occ-primary/72 md:text-base">{item}</li>)}</ol> : null}
                </div>
              </section>
            ))}
          </div>
          <section className="mt-14 md:mt-16" aria-labelledby="primary-sources-heading">
            <h2 id="primary-sources-heading" className="mb-7 text-sm font-light uppercase tracking-[0.3em] text-occ-primary/48">Primary Sources</h2>
            <ol className="list-decimal space-y-3 pl-5">{homeSources.map((source) => <li key={source.href} className="pl-2 text-sm leading-relaxed text-occ-primary/62 md:text-[15px]"><a href={source.href} target="_blank" rel="noopener noreferrer" className="underline decoration-occ-primary/20 underline-offset-4 transition-colors hover:text-occ-primary hover:decoration-occ-primary">{source.label}</a></li>)}</ol>
          </section>
          <div className="mt-20 border-t border-gray-200 pt-12">
            <h2 className="mb-12 text-sm font-light uppercase tracking-[0.3em] text-occ-primary/48">Frequently Asked Questions</h2>
            <div className="space-y-10">{homeFaqs.map(({ q, a }) => <div key={q} className="grid grid-cols-12 gap-x-12 gap-y-3 border-t border-occ-primary/14 pt-6"><h3 className="col-span-12 text-lg font-semibold tracking-tight text-occ-primary md:col-span-5">{q}</h3><p className="col-span-12 text-base leading-relaxed text-occ-primary/62 md:col-span-7">{a}</p></div>)}</div>
          </div>
        </div>
      </section>
    </>
  )
}
