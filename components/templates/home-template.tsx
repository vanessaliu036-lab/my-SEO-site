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
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(41,36,36,0.72)_0%,rgba(41,36,36,0.56)_46%,rgba(41,36,36,0.30)_100%)]" aria-hidden="true" />
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
            <a href="#commercial-paths" className="occ-primary-cta">
              Find your path
            </a>
            <Link href="/contact" className="inline-flex items-center gap-2 border-b border-white/45 pb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:border-white">
              Start an enquiry <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </div>

        <div data-occ-home-meta className="absolute bottom-0 left-0 right-0 z-20 flex items-end justify-between border-t border-white/15 px-5 py-5 text-[9px] uppercase tracking-[0.24em] text-white/55 sm:px-8 lg:px-12">
          <span>Origin Coffee Cambodia</span>
          <span className="hidden sm:inline">Sourcing · Quality · Solutions</span>
          <span>01 / Home</span>
        </div>
      </section>

      <section id="commercial-paths" className="scroll-mt-20 bg-[#f2ede7]" aria-labelledby="commercial-paths-title">
        <div className="border-y border-[#292424]/15">
          <div className="mx-auto max-w-[1360px] px-6 py-16 sm:px-8 md:px-12 md:py-24">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:items-end">
              <div className="md:col-span-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#984650]">
                  Commercial Gateway
                </p>
                <h2
                  id="commercial-paths-title"
                  className="mt-5 max-w-[820px] font-[var(--font-display)] text-[clamp(3rem,6vw,6.2rem)] font-normal leading-[0.9] tracking-[-0.05em] text-[#292424]"
                >
                  Start with what your business needs.
                </h2>
              </div>
              <div className="md:col-span-4 md:col-start-9">
                <p className="max-w-md text-[15px] leading-7 text-[#685f5b]">
                  OCC has four commercial paths. Choose the outcome first; we route you to the right coffee,
                  service, pilot, or market discussion.
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-[1360px] border-x border-[#292424]/15">
            {[
              {
                number: "01",
                eyebrow: "READY-TO-SELL",
                question: "Need coffee you can buy now?",
                title: "Wholesale Coffee",
                body: "Cambodia-origin coffee ready for cafés, hotels, retailers, roasters, and professional buyers.",
                href: "/solutions/wholesale",
                cta: "Source OCC coffee",
              },
              {
                number: "02",
                eyebrow: "MADE-FOR-YOU",
                question: "Need a coffee built around your business?",
                title: "Custom Roasting",
                body: "Develop a roast profile around your customer, brewing method, menu role, and commercial target.",
                href: "/solutions/roasting-program",
                cta: "Develop a roast profile",
              },
              {
                number: "03",
                eyebrow: "HOTEL PARTNERSHIP",
                question: "Want coffee to become part of the guest experience?",
                title: "Hospitality Program",
                body: "Start with an on-site pilot, choose an OCC coffee or custom profile, train the team, and build toward repeat purchasing.",
                href: "/solutions/hotels",
                cta: "Start a hotel pilot",
              },
              {
                number: "04",
                eyebrow: "INTERNATIONAL MARKETS",
                question: "Want to bring Cambodian coffee to your market?",
                title: "Distribution",
                body: "For importers and distributors evaluating Cambodia-origin coffee for retail, hospitality, or specialty channels.",
                href: "/distribution",
                cta: "Discuss distribution",
              },
            ].map((item, index) => (
              <Link
                key={item.number}
                href={item.href}
                className={`group grid min-h-[245px] grid-cols-12 border-b border-[#292424]/15 transition-colors duration-300 first:border-t ${
                  index === 2 ? "bg-[#984650] text-[#f2ede7]" : "bg-[#f2ede7] hover:bg-[#e9e1da]"
                }`}
              >
                <div
                  className={`col-span-3 flex items-start border-r p-6 sm:p-8 md:col-span-2 md:p-10 ${
                    index === 2 ? "border-white/20" : "border-[#292424]/15"
                  }`}
                >
                  <span
                    className={`font-[var(--font-display)] text-[clamp(3.6rem,6vw,6.4rem)] leading-none ${
                      index === 2 ? "text-white/30" : "text-[#984650]/35"
                    }`}
                  >
                    {item.number}
                  </span>
                </div>

                <div className="col-span-9 grid grid-cols-1 gap-8 p-6 sm:p-8 md:col-span-10 md:grid-cols-10 md:gap-10 md:p-10">
                  <div className="md:col-span-4">
                    <p
                      className={`text-[9px] font-semibold uppercase tracking-[0.24em] ${
                        index === 2 ? "text-white/60" : "text-[#984650]"
                      }`}
                    >
                      {item.eyebrow}
                    </p>
                    <p
                      className={`mt-5 max-w-sm font-[var(--font-display)] text-[clamp(1.65rem,2.8vw,2.6rem)] font-normal leading-[1.02] tracking-[-0.03em] ${
                        index === 2 ? "text-white" : "text-[#292424]"
                      }`}
                    >
                      {item.question}
                    </p>
                  </div>

                  <div className="md:col-span-6 md:border-l md:border-current/15 md:pl-10">
                    <div className="flex h-full flex-col justify-between">
                      <div>
                        <h3
                          className={`font-[var(--font-display)] text-[clamp(2.1rem,4vw,4rem)] font-normal leading-[0.96] tracking-[-0.04em] ${
                            index === 2 ? "text-white" : "text-[#292424]"
                          }`}
                        >
                          {item.title}
                        </h3>
                        <p
                          className={`mt-5 max-w-xl text-[14px] leading-7 ${
                            index === 2 ? "text-white/72" : "text-[#685f5b]"
                          }`}
                        >
                          {item.body}
                        </p>
                      </div>

                      <div
                        className={`mt-8 flex items-center justify-between border-t pt-5 ${
                          index === 2 ? "border-white/20" : "border-[#292424]/15"
                        }`}
                      >
                        <span
                          className={`text-[9px] font-semibold uppercase tracking-[0.18em] ${
                            index === 2 ? "text-white" : "text-[#292424]"
                          }`}
                        >
                          {item.cta}
                        </span>
                        <ArrowUpRight
                          className={`size-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 ${
                            index === 2 ? "text-white" : "text-[#984650]"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="bg-[#292424] text-[#f2ede7]">
            <div className="mx-auto grid max-w-[1360px] grid-cols-1 gap-10 px-6 py-12 sm:px-8 md:grid-cols-12 md:px-12 md:py-14">
              <div className="md:col-span-4">
                <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-white/40">
                  Conversion Flow
                </p>
                <h3 className="mt-4 max-w-sm font-[var(--font-display)] text-3xl font-normal leading-tight tracking-[-0.03em] text-white">
                  From first click to a commercial next step.
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-6 md:col-span-8 md:grid-cols-4 md:pl-8">
                {[
                  ["01", "Choose a path"],
                  ["02", "Share requirements"],
                  ["03", "Sample, pilot or quote"],
                  ["04", "Move into supply"],
                ].map(([number, label]) => (
                  <div key={number} className="border-t border-white/18 pt-4">
                    <p className="text-[9px] tracking-[0.18em] text-white/35">{number}</p>
                    <p className="mt-3 text-sm leading-6 text-white/80">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-occ-primary/12 bg-occ-background px-6 py-20 sm:px-8 md:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-occ-primary/52">Research & Evidence</p>
          <h2 className="mb-6 max-w-3xl text-2xl font-semibold leading-tight tracking-tight text-occ-primary md:text-3xl">Evidence for buyers who need to go deeper.</h2>
          <p className="max-w-3xl text-base leading-relaxed text-occ-primary/72 md:text-lg">{homeDirectAnswer}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/fine-robusta-cambodia" className="inline-flex items-center gap-2 rounded-full border border-occ-primary/20 px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] text-occ-primary transition-colors duration-200 hover:border-occ-primary hover:bg-white/60">
              Fine Robusta Pillar <ArrowUpRight className="size-3.5" />
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
            <div className="space-y-10">{homeFaqs.map(({ q, a }) => <div key={q} className="grid grid-cols-12 gap-x-12 gap-y-3 border-t border-occ-primary/14 pt-6"><h3 className="col-span-12 text-lg font-semibold tracking-tight text-occ-primary md:col-span-5">{q}</h3><p className="col-span-12 text-base leading-relaxed text-occ-primary/62 md:col-span-7">{a}</p></div>)}</div>
          </div>
        </div>
      </section>
    </>
  )
}
