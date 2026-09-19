import Image from "next/image"
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
        <Image
          src="/hero-home.webp"
          alt="Origin Coffee Cambodia hero image"
          fill
          preload
          sizes="100vw"
          className="absolute inset-0 object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/45" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(42,33,29,0.18)_0%,rgba(42,33,29,0.08)_42%,rgba(42,33,29,0.58)_100%)]"
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

        <div className="relative z-20 mx-auto w-full max-w-6xl px-6 pb-24 pt-32 text-center sm:px-8 md:pb-20">
          <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.34em] text-white/70 sm:text-xs">
            Cambodia · Coffea canephora · Fine Robusta
          </p>
          <h1 className="mx-auto max-w-5xl text-balance text-5xl font-normal leading-[0.96] tracking-[-0.055em] text-white sm:text-6xl md:text-7xl lg:text-[6.5rem]">
            Fine Robusta & Specialty Coffee from Cambodia
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-pretty text-sm font-light leading-7 text-white/80 sm:text-base md:text-lg md:leading-8">
            Origin Coffee Cambodia connects Cambodian coffee origins with specialty coffee sourcing, roasting, B2B supply, traceability, and quality-focused knowledge.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/solutions/wholesale"
              className="group inline-flex items-center rounded-full text-sm font-medium text-occ-primary"
            >
              <span className="rounded-full bg-occ-background px-6 py-3.5 transition-colors duration-300 group-hover:bg-white">
                Wholesale & Sourcing
              </span>
              <span className="relative -ml-px flex size-[50px] items-center justify-center overflow-hidden rounded-full bg-occ-background transition-colors duration-300 group-hover:bg-white">
                <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-6 group-hover:-translate-y-6" />
                <ArrowUpRight className="absolute size-5 -translate-x-6 translate-y-6 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0" />
              </span>
            </Link>
            <Link
              href="/fine-robusta-cambodia"
              className="border-b border-white/45 pb-1 text-xs font-medium uppercase tracking-[0.18em] text-white/80 transition-colors hover:border-white hover:text-white"
            >
              Fine Robusta Guide · Coffea canephora Cambodia
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 flex items-end justify-between border-t border-white/15 px-5 py-5 text-[9px] uppercase tracking-[0.24em] text-white/55 sm:px-8 lg:px-12">
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
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-occ-primary px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] text-occ-background transition-transform duration-200 hover:-translate-y-0.5 hover:bg-occ-primary">
              Start an Enquiry <ArrowUpRight className="size-3.5" />
            </Link>
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
            <div className="space-y-10">{homeFaqs.map(({ q, a }) => <div key={q} className="grid grid-cols-12 gap-x-12 gap-y-3"><h3 className="col-span-12 border-l-4 border-occ-secondary pl-4 text-lg font-semibold tracking-tight text-occ-primary md:col-span-5">{q}</h3><p className="col-span-12 text-base leading-relaxed text-occ-primary/62 md:col-span-7">{a}</p></div>)}</div>
          </div>
        </div>
      </section>
    </>
  )
}
