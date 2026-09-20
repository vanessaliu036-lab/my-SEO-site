import Link from "next/link"
import { ArrowUpRight, BadgeCheck, Blend, Coffee, FlaskConical, Gift, MapPinned, Repeat2 } from "lucide-react"
import { InnerPageHero } from "@/components/site/inner-page-hero"

type SolutionItem = { href: string; tag: string; title: string; desc: string }
type SolutionsIndexTemplateProps = { services: readonly SolutionItem[] }

const servicePresentation = [
  { icon: Coffee, image: "/images/solutions/occ-solutions-wholesale-guide.webp", action: "Explore wholesale" },
  { icon: Blend, image: "/images/solutions/occ-solutions-custom-roasting-profile.webp", action: "Explore custom roasting" },
  { icon: Gift, image: "/images/solutions/occ-solutions-signature-drink-development.webp", action: "Explore coffee marketing" },
] as const

const method = [
  { icon: MapPinned, title: "Start with the market", copy: "Define where the coffee will be sold, served or experienced." },
  { icon: FlaskConical, title: "Evaluate the coffee", copy: "Connect origin, process and cup performance to the intended use." },
  { icon: BadgeCheck, title: "Approve a direction", copy: "Make product and commercial decisions against a clear reference." },
  { icon: Repeat2, title: "Build repeatability", copy: "Use the approved direction to guide supply, roasting and review." },
] as const

export function SolutionsIndexTemplate({ services }: SolutionsIndexTemplateProps) {
  return (
    <div className="bg-occ-background text-occ-primary">
      <InnerPageHero
        eyebrow="Coffee solutions"
        title="Choose the path that fits your market."
        summary="Source an OCC-developed coffee, build a custom roast, or create a product customers remember."
        image="/images/solutions/occ-solutions-origin-lot-traceability.webp"
        imageAlt="Cambodian coffee lots documented for a commercial program"
        imageCaption="Origin · Quality · Commercial direction"
        actions={[{ href: "#solution-paths", label: "View three paths", direction: "down" }]}
      />

      <section id="solution-paths" className="mx-auto w-full max-w-[1280px] px-6 py-20 sm:px-8 md:px-12 lg:px-16 lg:py-28" aria-labelledby="solution-paths-title">
        <div className="max-w-3xl">
          <p className="occ-section-label">Three ways to work with OCC</p>
          <h2 id="solution-paths-title" className="mt-5 text-[clamp(2.5rem,4.5vw,4.5rem)]">One decision at a time.</h2>
          <p className="mt-6 max-w-2xl text-lg text-occ-secondary">Each path has a different job. Choose the one that matches what your business needs next.</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          {services.map((service, index) => {
            const presentation = servicePresentation[index]
            const Icon = presentation.icon
            return (
              <article key={service.href} className={`group overflow-hidden border border-occ-primary/12 bg-white/35 ${index === 0 ? "lg:col-span-7" : "lg:col-span-5"}`}>
                <div className="relative aspect-[16/10] overflow-hidden bg-occ-surface">
                  <img src={presentation.image} alt="" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]" />
                  <div className="absolute left-5 top-5 flex size-12 items-center justify-center rounded-full border border-white/60 bg-occ-background/90 text-occ-primary backdrop-blur-sm">
                    <Icon aria-hidden="true" className="size-5" strokeWidth={1.6} />
                  </div>
                </div>
                <div className="p-7 sm:p-9">
                  <p className="occ-section-label">{service.tag}</p>
                  <h3 className="mt-4 text-[clamp(2rem,3vw,3.2rem)]">{service.title}</h3>
                  <p className="mt-5 max-w-xl text-base text-occ-secondary">{service.desc}</p>
                  <Link href={service.href} className="occ-cta occ-cta--text mt-7">
                    {presentation.action}<ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.8} />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="border-y border-occ-primary/10 bg-occ-primary py-20 text-occ-background lg:py-24" aria-labelledby="solution-method-title">
        <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-8 md:px-12 lg:px-16">
          <div className="max-w-3xl">
            <p className="occ-section-label text-white/60">The shared method</p>
            <h2 id="solution-method-title" className="mt-5 text-[clamp(2.4rem,4vw,4rem)] text-white">A clear route from brief to business.</h2>
          </div>
          <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {method.map(({ icon: Icon, title, copy }) => (
              <article key={title} className="border-t border-white/25 pt-7">
                <div className="flex size-14 items-center justify-center rounded-full border border-white/35 text-white">
                  <Icon aria-hidden="true" className="size-6" strokeWidth={1.5} />
                </div>
                <h3 className="mt-7 text-xl text-white">{title}</h3>
                <p className="mt-4 text-base text-white/68">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1280px] gap-10 px-6 py-20 sm:px-8 md:px-12 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:px-16 lg:py-28" aria-labelledby="guide-title">
        <div className="relative aspect-[4/3] overflow-hidden bg-occ-surface">
          <img src="/images/solutions/occ-solutions-wholesale-guide.webp" alt="Wholesale coffee guide and Cambodian coffee reference" className="h-full w-full object-cover" />
        </div>
        <div className="lg:pl-8">
          <p className="occ-section-label">Free buyer resource</p>
          <h2 id="guide-title" className="mt-5 text-[clamp(2.5rem,4.5vw,4.4rem)]">The Wholesale Coffee Guide</h2>
          <p className="mt-6 max-w-2xl text-lg text-occ-secondary">A practical starting point for evaluating Cambodian coffee, quality, logistics and the questions to ask before supply.</p>
          <Link href="/resources/coffee-buyer-specification-template" className="occ-cta occ-cta--primary mt-8">
            Open the buyer guide<ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.8} />
          </Link>
        </div>
      </section>

      <section className="bg-occ-surface px-6 py-20 sm:px-8 md:px-12 lg:px-16 lg:py-24" aria-label="Start a coffee project">
        <div className="mx-auto flex w-full max-w-[1160px] flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="occ-section-label">Work with OCC</p>
            <h2 className="mt-5 text-[clamp(2.5rem,4.5vw,4.5rem)]">Tell us what the coffee needs to do.</h2>
          </div>
          <Link href="/contact" className="occ-cta occ-cta--primary shrink-0">
            Start an enquiry<ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.8} />
          </Link>
        </div>
      </section>
    </div>
  )
}
