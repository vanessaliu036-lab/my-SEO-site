import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { ogImage, siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Cambodian Coffee Partnerships | OCC × ARUNERA",
  description:
    "Build meaningful coffee partnerships with OCC and ARUNERA through Cambodian coffee gifts, hotel experiences, retail products and corporate gifting.",
  keywords:
    "Cambodian coffee partnerships, Cambodia coffee partnership, hotel coffee partnership, coffee gifting collaboration, OCC partnerships, Cambodian coffee distribution",
  alternates: pageAlternates("/partnerships"),
  openGraph: {
    title: "Cambodian Coffee Partnerships | OCC × ARUNERA",
    description:
      "Build meaningful coffee partnerships with OCC and ARUNERA through Cambodian coffee gifts, hotel experiences, retail products and corporate gifting.",
    url: siteUrl + "/partnerships",
    siteName: "Origin Coffee Cambodia",
    type: "website",
    images: [{ url: ogImage, width: 1672, height: 941, alt: "OCC Partnerships — Origin Coffee Cambodia" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cambodian Coffee Partnerships | OCC × ARUNERA",
    description: "Explore Cambodian coffee partnerships for hospitality, retail and gifting.",
    images: [ogImage],
  },
}

const partnershipPaths = [
  {
    number: "01",
    label: "Brand & Gifting",
    description:
      "Work with OCC on Cambodian coffee gifts, hotel gifting, travel retail, corporate gifting and retail-ready product experiences.",
    href: "/brand-gifting",
    action: "Explore Brand & Gifting",
    image: "/images/partnerships/occ-partnerships-gifting.webp",
    imageAlt: "A considered Cambodian coffee gifting experience",
  },
  {
    number: "02",
    label: "Distribution Partners",
    description:
      "Bring Cambodia-origin coffee to your market as a distributor, importer, regional agent, retailer or hospitality partner.",
    href: "/distribution",
    action: "Explore Distribution",
    image: "/images/partnerships/occ-partnerships-distribution.webp",
    imageAlt: "Cambodian coffee prepared for selected market partners",
  },
]

const partnerAudiences = [
  {
    number: "01",
    name: "Hotels & Hospitality",
    copy:
      "A first cup in a guest room, a thoughtful welcome gift or an item on a hotel retail shelf can introduce a visitor to Cambodian coffee. We discuss the guest, the moment and the coffee format before shaping a hospitality concept.",
  },
  {
    number: "02",
    name: "Retail & Concept Stores",
    copy:
      "For shops and selected retailers looking for products with a clear sense of place, we explore coffee presentation, product information and the experience of discovering an origin that many customers have not yet encountered.",
  },
  {
    number: "03",
    name: "Travel & Tourism",
    copy:
      "Travel companies, destination businesses and cultural partners can make Cambodian coffee part of a visit, a welcome experience or a meaningful item to bring home, with the story of the coffee remaining connected to its origin.",
  },
  {
    number: "04",
    name: "Corporate Gifting",
    copy:
      "A company gift, conference welcome package or partner appreciation project can offer something more personal than a generic promotional product. We explore the audience, occasion, format and required presentation together.",
  },
  {
    number: "05",
    name: "Brands & Product Collaborators",
    copy:
      "For creative teams and product partners, Cambodian coffee can be the starting point for a limited concept, a co-developed product or an origin-led campaign. Each project begins with the intended use and what can actually be delivered.",
  },
]

const collaborationFormats = [
  {
    title: "Hotel coffee experiences",
    copy:
      "Bring a Cambodia-origin cup into the guest journey, from an in-room moment and welcome amenity to a hotel-specific product concept. Packaging, preparation and presentation should be appropriate to the experience, not merely decorative.",
  },
  {
    title: "Premium coffee gifts",
    copy:
      "Explore gifting formats for visitors, colleagues and partners that make Cambodian coffee easier to discover, understand and remember. Coffee identity, product use and a clear origin story come before the gift presentation.",
  },
  {
    title: "Retail-ready concepts",
    copy:
      "Shape an origin-led offer for selected shops, lifestyle destinations and travel retail. We can discuss the customer, coffee format, packaging direction and the information a retail team needs to present the product responsibly.",
  },
  {
    title: "Co-branded campaigns",
    copy:
      "Connect a product launch or seasonal occasion to genuine Cambodian coffee content. A collaboration may combine a coffee proposition with storytelling, educational material or a brand experience tailored to its audience.",
  },
]

const partnershipSteps = [
  {
    number: "01",
    title: "Understand the opportunity",
    copy:
      "Tell us who your audience is, where the partnership will appear and what you want people to experience. A hotel welcome, a retail collection and a corporate gift have different requirements, so we begin with the actual use case.",
  },
  {
    number: "02",
    title: "Define the coffee direction",
    copy:
      "We discuss Cambodia-origin coffee, the intended cup profile, green or roasted format where applicable, and the evidence available for the specific coffee being considered. Fine Robusta expertise informs the conversation without replacing a project-specific assessment.",
  },
  {
    number: "03",
    title: "Shape the product experience",
    copy:
      "Together we consider presentation, packaging direction, customer touchpoints and the information needed to explain the product. For gift-oriented projects, ARUNERA may help develop a more considered gifting concept.",
  },
  {
    number: "04",
    title: "Review commercial requirements",
    copy:
      "We check the proposed quantity, timeline, market, samples, product specifications and any required documentation against actual project and coffee availability. Pricing, minimum quantities and delivery terms are discussed rather than assumed.",
  },
  {
    number: "05",
    title: "Prepare the partnership",
    copy:
      "If the direction is workable for both parties, we agree the next steps, responsibilities, approval points and communication plan before making commitments. The outcome should be a useful collaboration, not simply a logo on a product.",
  },
]

const partnershipSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": siteUrl + "/partnerships#webpage",
  url: siteUrl + "/partnerships",
  name: "Cambodian Coffee Partnerships | OCC × ARUNERA",
  description:
    "Explore coffee collaborations with OCC for hospitality, retail and gifting, with Brand & Gifting and Distribution as distinct partnership paths.",
  isPartOf: { "@id": siteUrl + "/#website" },
}

export default function PartnershipsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(partnershipSchema) }} />

      <main className="bg-occ-background text-occ-primary">
        <section className="border-b border-occ-primary/10 bg-occ-background">
          <div className="mx-auto grid min-h-[640px] w-full max-w-[1240px] grid-cols-1 px-6 sm:px-8 md:grid-cols-[minmax(0,1.05fr)_minmax(360px,.95fr)] md:px-12 lg:px-16">
            <div className="flex flex-col justify-center py-20 pr-0 md:py-24 md:pr-14 lg:pr-20">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-occ-burgundy">OCC · Partnerships</p>
              <h1 className="mt-6 max-w-[690px] font-[var(--font-display)] text-[clamp(3.8rem,7vw,5.8rem)] font-normal leading-[0.92] tracking-[-0.04em]">
                Cambodian coffee,<br />in good company.
              </h1>
              <p className="mt-7 max-w-[580px] font-[var(--font-display)] text-[clamp(1.45rem,2.4vw,2rem)] leading-[1.12] tracking-[-0.02em] text-occ-primary/78">Cambodian Coffee Partnerships Built to Be Remembered</p>
              <p className="mt-8 max-w-[600px] text-[17px] leading-8 text-occ-secondary">
                OCC works with selected partners to bring Cambodia-origin coffee into experiences, products and markets with a clear reason to exist.
              </p>
              <Link href="#partnership-paths" className="mt-9 inline-flex w-fit items-center gap-4 border-b border-occ-primary/55 pb-2 text-[10px] font-semibold uppercase tracking-[0.22em]">
                Our approach <span aria-hidden="true">↓</span>
              </Link>
            </div>
            <div className="relative min-h-[420px] overflow-hidden md:min-h-full">
              <Image src="/images/partnerships/occ-partnerships-origin-collaboration.webp" alt="Cambodian producer and coffee buyer evaluating ripe cherries together" fill priority sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
            </div>
          </div>
        </section>

        <section id="partnership-paths" aria-label="Partnership pathways" className="mx-auto w-full max-w-[1240px] px-6 pb-20 pt-20 sm:px-8 md:px-12 lg:px-16 lg:pb-28 lg:pt-24">
          <div className="mb-10 border-b border-occ-primary/12 pb-7">
            <h2 className="font-[var(--font-display)] text-[clamp(2.7rem,5vw,4.6rem)] font-normal leading-[0.96] tracking-[-0.035em]">Brand &amp; Gifting <span className="text-occ-burgundy">/</span> Distribution</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {partnershipPaths.map((path) => (
            <article key={path.href} className="flex h-full flex-col bg-occ-background">
              <div className="relative aspect-[4/3] overflow-hidden bg-occ-background">
                <Image src={path.image} alt={path.imageAlt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col border-x border-b border-occ-primary/12 bg-occ-background p-7 sm:p-9 lg:min-h-[340px] lg:p-10">
                <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-occ-secondary"><span>{path.number}</span><span className="h-px w-8 bg-occ-secondary" /></p>
                <h2 className="mt-6 font-[var(--font-display)] text-[clamp(2.4rem,4.5vw,4.4rem)] font-normal leading-[0.9] tracking-[-0.045em]">{path.label}</h2>
                <p className="mt-6 max-w-md text-[15px] leading-7 text-occ-primary">{path.description}</p>
                <Link href={path.href} className="mt-auto inline-flex w-fit items-center gap-3 border-b border-occ-primary pt-8 pb-2 text-[10px] font-semibold uppercase tracking-[0.2em]">{path.action} <ArrowUpRight className="size-3" /></Link>
              </div>
            </article>
          ))}
          </div>
        </section>

        <section id="why-partnership" className="mx-auto grid w-full max-w-[1360px] grid-cols-1 px-6 pb-20 pt-6 sm:px-8 md:grid-cols-12 md:px-12 lg:px-16 lg:pb-28">
          <div className="md:col-span-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-black/45">01 / Why Cambodian Coffee Partnerships?</p>
          </div>
          <div className="mt-8 md:col-span-9 md:col-start-4 md:mt-0">
            <h2 className="font-[var(--font-display)] text-[clamp(2.7rem,5vw,5rem)] font-normal leading-[0.96] tracking-[-0.035em]">
              A coffee origin can become more than a product.
            </h2>
            <div className="mt-9 grid gap-7 border-t border-black/15 pt-8 lg:grid-cols-2 lg:gap-12">
              <p className="text-lg leading-8 text-black/80">
                For many people, their first encounter with Cambodian coffee does not happen in a café. It may happen in a hotel room, at a welcome desk, on a retail shelf, during a corporate event or through a gift brought home from Cambodia.
              </p>
              <p className="text-[15px] leading-7 text-black/65">
                A partnership can make that encounter intentional. The coffee should remain recognizable as Cambodian, with a product format and presentation that suit the audience. OCC begins with the coffee proposition; partners help shape where and how people experience it.
              </p>
            </div>
            <p className="mt-8 max-w-3xl text-[15px] leading-7 text-black/65">
              We focus on origin-led collaborations rather than interchangeable souvenirs or unsupported supply promises. Whether the result is a welcome gift or a retail concept, the starting point is the same: genuine Cambodia-origin coffee, a clear purpose and a product people can understand.
            </p>
          </div>
        </section>

        <section className="bg-occ-surface py-20 lg:py-28">
          <div className="mx-auto w-full max-w-[1360px] px-6 sm:px-8 md:px-12 lg:px-16">
            <div className="grid md:grid-cols-12">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-black/45 md:col-span-3">02 / Partnership Audiences</p>
              <div className="mt-7 md:col-span-9 md:col-start-4 md:mt-0">
                <h2 className="font-[var(--font-display)] text-[clamp(2.7rem,5vw,5rem)] leading-[0.96] tracking-[-0.035em]">Who We Work With</h2>
                <p className="mt-7 max-w-3xl text-[15px] leading-7 text-black/70">We work with businesses and organisations that have a specific audience, a real setting and an idea for how Cambodian coffee could add meaning to the experience.</p>
              </div>
            </div>
            <div className="mt-12 grid gap-px border border-black/10 bg-black/10 md:grid-cols-2 xl:grid-cols-3">
              {partnerAudiences.map((partner) => (
                <article key={partner.number} className="bg-occ-background p-7 sm:p-9">
                  <p className="text-[10px] tracking-[0.2em] text-black/40">{partner.number}</p>
                  <h3 className="mt-6 font-[var(--font-display)] text-3xl leading-tight">{partner.name}</h3>
                  <p className="mt-5 text-[15px] leading-7 text-black/65">{partner.copy}</p>
                </article>
              ))}
              <figure className="relative min-h-[330px] overflow-hidden bg-occ-primary md:min-h-[390px]" aria-label="Cambodian coffee partnership visual">
                <Image src="/images/partnerships/occ-partnerships-roast.webp" alt="Roasted Cambodian coffee prepared for a partnership concept" fill sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover" />
              </figure>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1360px] px-6 py-20 sm:px-8 md:px-12 lg:px-16 lg:py-28">
          <div className="grid md:grid-cols-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-black/45 md:col-span-3">03 / Collaboration Formats</p>
            <div className="mt-7 md:col-span-9 md:col-start-4 md:mt-0">
              <h2 className="font-[var(--font-display)] text-[clamp(2.7rem,5vw,5rem)] leading-[0.96] tracking-[-0.035em]">What We Can Build Together</h2>
              <p className="mt-7 max-w-3xl text-[15px] leading-7 text-black/70">Every concept is shaped around the setting, the audience and actual product requirements. These are directions to explore, not pre-set packages or promises of fixed stock.</p>
              <div className="mt-10 grid gap-8 border-t border-black/15 pt-8 sm:grid-cols-2">
                {collaborationFormats.map((format) => (
                  <article key={format.title}>
                    <h3 className="font-[var(--font-display)] text-2xl">{format.title}</h3>
                    <p className="mt-4 text-[15px] leading-7 text-black/65">{format.copy}</p>
                  </article>
                ))}
              </div>
              <p className="mt-9 border-t border-black/15 pt-6 text-[15px] leading-7 text-black/65">
                Interested in procuring coffee as a wholesale buyer rather than developing a brand experience? Visit our <Link className="underline underline-offset-4" href="/solutions/wholesale">Wholesale & Sourcing</Link> page for the separate buyer process.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-occ-primary py-20 text-occ-surface lg:py-28">
          <div className="mx-auto grid w-full max-w-[1360px] px-6 sm:px-8 md:grid-cols-12 md:px-12 lg:px-16">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-occ-surface md:col-span-3">04 / Featured Collaboration</p>
            <div className="mt-8 md:col-span-9 md:col-start-4 md:mt-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-occ-surface">OCC × ARUNERA</p>
              <h2 className="mt-6 font-[var(--font-display)] text-[clamp(2.7rem,5vw,5.2rem)] leading-[0.96] tracking-[-0.035em]">
                From Cambodian coffee to an experience worth remembering.
              </h2>
              <p className="mt-9 max-w-3xl text-lg leading-8 text-white/80">
                OCC and ARUNERA bring two distinct roles to a coffee gifting collaboration. OCC brings the Cambodia-origin coffee proposition, Fine Robusta expertise and the direction behind the cup. ARUNERA focuses on the curated gift experience: product concept, presentation and meaningful discovery of Cambodian products.
              </p>
              <p className="mt-6 max-w-3xl text-[15px] leading-7 text-white/65">
                Together, those roles can inform hotel gifts, travel-related products, retail concepts and corporate occasions. A project still requires its own product brief, availability check and commercial discussion. For detailed gifting applications and presentation, explore the dedicated Brand & Gifting page.
              </p>
              <Link href="/brand-gifting" className="mt-10 inline-flex items-center gap-2 border-b border-occ-surface pb-2 text-[10px] font-semibold uppercase tracking-[0.17em] text-occ-surface">
                Explore OCC × ARUNERA Brand & Gifting <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-[1360px] px-6 py-20 sm:px-8 md:grid-cols-12 md:px-12 lg:px-16 lg:py-28">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-black/45 md:col-span-3">05 / Partnership Value</p>
          <div className="mt-8 md:col-span-9 md:col-start-4 md:mt-0">
            <h2 className="font-[var(--font-display)] text-[clamp(2.7rem,5vw,5rem)] leading-[0.96] tracking-[-0.035em]">Why the Experience Matters</h2>
            <p className="mt-9 max-w-3xl text-lg leading-8 text-black/80">
              A thoughtful coffee experience gives people a reason to ask where the coffee came from, how it tastes and what makes it connected to Cambodia. The product, the story and the way it is presented should support one another.
            </p>
            <div className="mt-9 grid gap-8 border-t border-black/15 pt-8 sm:grid-cols-2">
              <div>
                <h3 className="font-[var(--font-display)] text-2xl">For your audience</h3>
                <p className="mt-4 text-[15px] leading-7 text-black/65">Offer an encounter with a specific origin rather than an anonymous coffee product. Clear preparation guidance and credible origin information help make the experience useful beyond the first moment.</p>
              </div>
              <div>
                <h3 className="font-[var(--font-display)] text-2xl">For your business</h3>
                <p className="mt-4 text-[15px] leading-7 text-black/65">Develop a product or experience that fits your customer journey, occasion and channel. We define the relevant product and operating requirements before treating an idea as a commercial arrangement.</p>
              </div>
            </div>
            <p className="mt-8 text-[15px] leading-7 text-black/65">Origin is not a decorative claim. Any producer, processing, lot, quality or traceability information shared for a project should be supported by evidence available for that specific coffee.</p>
          </div>
        </section>

        <section className="bg-occ-surface py-20 lg:py-28">
          <div className="mx-auto w-full max-w-[1360px] px-6 sm:px-8 md:px-12 lg:px-16">
            <div className="grid md:grid-cols-12">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-black/45 md:col-span-3">06 / From Idea to Agreement</p>
              <div className="mt-8 md:col-span-9 md:col-start-4 md:mt-0">
                <h2 className="font-[var(--font-display)] text-[clamp(2.7rem,5vw,5rem)] leading-[0.96] tracking-[-0.035em]">How a Partnership Works</h2>
                <p className="mt-7 text-[15px] leading-7 text-black/70">A clear conversation keeps creative possibilities connected to product reality. The process is adapted to each project and does not imply that stock, pricing or timelines have already been confirmed.</p>
                <div className="mt-9 divide-y divide-black/15 border-y border-black/15">
                  {partnershipSteps.map((step) => (
                    <article key={step.number} className="grid gap-5 py-7 sm:grid-cols-[55px_1fr] sm:gap-8">
                      <p className="text-[11px] tracking-[0.2em] text-black/40">{step.number}</p>
                      <div>
                        <h3 className="font-[var(--font-display)] text-2xl">{step.title}</h3>
                        <p className="mt-4 text-[15px] leading-7 text-black/65">{step.copy}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-[1360px] px-6 py-20 sm:px-8 md:grid-cols-12 md:px-12 lg:px-16 lg:py-28">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-black/45 md:col-span-3">07 / Start a Conversation</p>
          <div className="mt-8 md:col-span-9 md:col-start-4 md:mt-0">
            <h2 className="font-[var(--font-display)] text-[clamp(2.7rem,5vw,5rem)] leading-[0.96] tracking-[-0.035em]">What to Include in Your Enquiry</h2>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-black/80">You do not need a finished brief to begin. Tell us what you are considering and share the information you already have. We can then identify the questions that need to be answered before a project can move forward.</p>
            <div className="mt-9 grid gap-5 border-y border-black/15 py-8 text-[15px] leading-7 text-black/68 sm:grid-cols-2 sm:gap-x-12">
              <p><span className="font-semibold text-occ-primary">Your organisation:</span> company or organisation name and contact details.</p>
              <p><span className="font-semibold text-occ-primary">Market:</span> country, city and intended sales or experience location.</p>
              <p><span className="font-semibold text-occ-primary">Partnership type:</span> hospitality, travel, retail, corporate gifting, brand collaboration or distribution.</p>
              <p><span className="font-semibold text-occ-primary">Audience and channels:</span> the people you want to reach and where they will encounter the product.</p>
              <p><span className="font-semibold text-occ-primary">Product idea:</span> coffee format, gifting concept or experience you are exploring.</p>
              <p><span className="font-semibold text-occ-primary">Project scope:</span> estimated quantity or project size, if known.</p>
              <p><span className="font-semibold text-occ-primary">Timing:</span> possible launch date and any important milestones.</p>
              <p><span className="font-semibold text-occ-primary">Requirements:</span> packaging, documentation, sampling or other decision criteria.</p>
            </div>
            <p className="mt-6 max-w-3xl text-[15px] leading-7 text-black/60">You can provide this context in your message on our Contact page. Enquiries are reviewed against the proposed project's needs and available coffee or product options.</p>
          </div>
        </section>

        <section className="bg-occ-primary px-6 py-20 text-occ-background sm:px-8 md:px-12 lg:px-16 lg:py-28">
          <div className="mx-auto w-full max-w-[1360px]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/50">Build a Cambodian Coffee Partnership</p>
            <h2 className="mt-7 max-w-5xl font-[var(--font-display)] text-[clamp(3rem,6vw,6rem)] leading-[0.95] tracking-[-0.04em]">Bring an idea. Begin with Cambodia.</h2>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-white/72">For hotels, retailers, travel businesses, corporate teams and brands interested in a meaningful Cambodian coffee experience, we would like to hear what you have in mind. Your next step is a conversation, not an obligation to commit.</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-occ-background px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-occ-primary">Discuss a Partnership <ArrowUpRight className="size-4" /></Link>
              <Link href="/distribution" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">Explore Distribution <ArrowUpRight className="size-4" /></Link>
            </div>
            <p className="mt-12 text-[12px] tracking-[0.12em] text-white/50">100% Cambodian coffee. True to its origin, unmistakably its own.</p>
          </div>
        </section>
      </main>
    </>
  )
}
