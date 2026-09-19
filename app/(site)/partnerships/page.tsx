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
    image: "/images/partnerships/occ-partnerships-roast.webp",
    imageAlt: "A considered Cambodian coffee gifting experience",
  },
  {
    number: "02",
    label: "Distribution Partners",
    description:
      "Bring Cambodia-origin coffee to your market as a distributor, importer, regional agent, retailer or hospitality partner.",
    href: "/distribution",
    action: "Explore Distribution",
    image: "/images/partnerships/occ-partnerships-origin.webp",
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

      <main className="bg-[#f7f5ef] text-[#171412]">
        <section className="relative overflow-hidden bg-[#182019] text-[#f6f3ea]">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#6b1323_0%,#6b1323_68%,#7a1118_150%)]" />
          <div className="relative mx-auto w-full max-w-[1120px] px-6 pb-20 pt-28 sm:px-10 md:px-14 lg:pb-28 lg:pt-36">
            <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-white/58">OCC · Partnerships</p>
            <h1 className="mt-5 text-center font-[var(--font-display)] text-[clamp(4rem,10vw,7.2rem)] font-normal leading-[0.86] tracking-[-0.055em]">
              PARTNERSHIPS
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-center font-[var(--font-display)] text-[clamp(1.6rem,3vw,2.6rem)] leading-[0.98] tracking-[-0.025em] text-white/82">
              Cambodian Coffee Partnerships Built to Be Remembered
            </p>
            <div className="mt-12 grid gap-8 md:grid-cols-[.95fr_1.22fr_.9fr] md:gap-7">
              <div className="flex flex-col justify-center md:pt-20">
                <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.36em] text-white/58"><span>Entry</span><span className="h-px w-10 bg-white/35" /></p>
                <h2 className="mt-7 font-[var(--font-display)] text-[clamp(3rem,5.8vw,5.5rem)] font-normal leading-[0.86] tracking-[-0.05em]">CAMBODIA<br />IN GOOD<br />COMPANY</h2>
                <p className="mt-7 max-w-[270px] text-[15px] leading-7 text-white/72">
                  OCC works with selected partners to bring Cambodia-origin coffee into experiences, products and markets with a clear reason to exist.
                </p>
                <Link href="#why-partnership" className="mt-7 inline-flex w-fit items-center gap-4 border-b border-white/45 pb-2 text-[10px] uppercase tracking-[0.28em] text-white/78">
                  Our approach <span aria-hidden="true">↓</span>
                </Link>
              </div>
              <div className="relative aspect-[4/5] overflow-hidden bg-[#202820]">
                <Image src="/images/partnerships/occ-partnerships-roast.webp" alt="Fine Robusta coffee visual for an OCC partnership experience" fill priority sizes="(min-width: 768px) 38vw, 100vw" className="object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.025]" />
              </div>
              <div className="flex flex-col">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#202820]">
                  <Image src="/images/partnerships/occ-partnerships-origin.webp" alt="Cambodian coffee origin visual for OCC partnerships" fill sizes="(min-width: 768px) 28vw, 100vw" className="object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.025]" />
                </div>
                <p className="mt-6 text-[10px] uppercase tracking-[0.34em] leading-[1.7] text-white/48">BOLDER ROOTS<br />BRIGHTER TOMORROWS</p>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Partnership pathways" className="mx-auto w-full max-w-[1120px] px-6 pb-20 pt-12 sm:px-10 md:px-14 lg:pb-28 lg:pt-16">
          <div className="relative z-[1] -mb-2 font-[var(--font-display)] text-[clamp(3.2rem,7.5vw,6.6rem)] font-normal leading-[0.88] tracking-[-0.055em] md:whitespace-nowrap">
            <span>BRAND &amp; GIFTING</span><span className="mx-3 text-[#c46d33]">\</span><span>DISTRIBUTION</span>
          </div>
          <div className="grid grid-cols-1 gap-px border-t border-[#ddd8cf] md:grid-cols-2">
          {partnershipPaths.map((path) => (
            <article key={path.href} className="bg-[#f7f5ef] md:border-r md:border-[#ddd8cf] md:last:border-r-0">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#ede9df]">
                <Image src={path.image} alt={path.imageAlt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="min-h-[250px] border-b border-[#ddd8cf] bg-[#faf8f3] p-7 sm:p-9 lg:p-11">
                <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-[#736d66]"><span>{path.number}</span><span className="h-px w-8 bg-[#b8b2a8]" /></p>
                <h2 className="mt-6 font-[var(--font-display)] text-[clamp(2.4rem,4.5vw,4.4rem)] font-normal leading-[0.9] tracking-[-0.045em]">{path.label}</h2>
                <p className="mt-6 max-w-md text-[15px] leading-7 text-[#37322d]">{path.description}</p>
                <Link href={path.href} className="mt-7 inline-flex w-fit items-center gap-3 border-b border-[#171412] pb-2 text-[10px] font-semibold uppercase tracking-[0.2em]">{path.action} <ArrowUpRight className="size-3" /></Link>
              </div>
            </article>
          ))}
          </div>
        </section>

        <section id="why-partnership" className="mx-auto grid w-full max-w-[1680px] grid-cols-1 px-6 pb-20 pt-6 sm:px-8 md:grid-cols-12 md:px-12 lg:px-16 lg:pb-28">
          <div className="md:col-span-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-black/45">01 / Why Cambodian Coffee Partnerships?</p>
          </div>
          <div className="mt-8 md:col-span-8 md:col-start-5 md:mt-0">
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

        <section className="bg-[#e9e2d5] py-20 lg:py-28">
          <div className="mx-auto w-full max-w-[1680px] px-6 sm:px-8 md:px-12 lg:px-16">
            <div className="grid md:grid-cols-12">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-black/45 md:col-span-3">02 / Partnership Audiences</p>
              <div className="mt-7 md:col-span-8 md:col-start-5 md:mt-0">
                <h2 className="font-[var(--font-display)] text-[clamp(2.7rem,5vw,5rem)] leading-[0.96] tracking-[-0.035em]">Who We Work With</h2>
                <p className="mt-7 max-w-3xl text-[15px] leading-7 text-black/70">We work with businesses and organisations that have a specific audience, a real setting and an idea for how Cambodian coffee could add meaning to the experience.</p>
              </div>
            </div>
            <div className="mt-12 grid gap-px border border-black/10 bg-black/10 md:grid-cols-2 xl:grid-cols-3">
              {partnerAudiences.map((partner) => (
                <article key={partner.number} className="bg-[#f6f3ea] p-7 sm:p-9">
                  <p className="text-[10px] tracking-[0.2em] text-black/40">{partner.number}</p>
                  <h3 className="mt-6 font-[var(--font-display)] text-3xl leading-tight">{partner.name}</h3>
                  <p className="mt-5 text-[15px] leading-7 text-black/65">{partner.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1680px] px-6 py-20 sm:px-8 md:px-12 lg:px-16 lg:py-28">
          <div className="grid md:grid-cols-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-black/45 md:col-span-3">03 / Collaboration Formats</p>
            <div className="mt-7 md:col-span-8 md:col-start-5 md:mt-0">
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

        <section className="bg-[#071a32] py-20 text-[#f6e7c4] lg:py-28">
          <div className="mx-auto grid w-full max-w-[1680px] px-6 sm:px-8 md:grid-cols-12 md:px-12 lg:px-16">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#e8be62] md:col-span-3">04 / Featured Collaboration</p>
            <div className="mt-8 md:col-span-8 md:col-start-5 md:mt-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#e8be62]">OCC × ARUNERA</p>
              <h2 className="mt-6 font-[var(--font-display)] text-[clamp(2.7rem,5vw,5.2rem)] leading-[0.96] tracking-[-0.035em]">
                From Cambodian coffee to an experience worth remembering.
              </h2>
              <p className="mt-9 max-w-3xl text-lg leading-8 text-white/80">
                OCC and ARUNERA bring two distinct roles to a coffee gifting collaboration. OCC brings the Cambodia-origin coffee proposition, Fine Robusta expertise and the direction behind the cup. ARUNERA focuses on the curated gift experience: product concept, presentation and meaningful discovery of Cambodian products.
              </p>
              <p className="mt-6 max-w-3xl text-[15px] leading-7 text-white/65">
                Together, those roles can inform hotel gifts, travel-related products, retail concepts and corporate occasions. A project still requires its own product brief, availability check and commercial discussion. For detailed gifting applications and presentation, explore the dedicated Brand & Gifting page.
              </p>
              <Link href="/brand-gifting" className="mt-10 inline-flex items-center gap-2 border-b border-[#e8be62] pb-2 text-[10px] font-semibold uppercase tracking-[0.17em] text-[#f6e7c4]">
                Explore OCC × ARUNERA Brand & Gifting <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-[1680px] px-6 py-20 sm:px-8 md:grid-cols-12 md:px-12 lg:px-16 lg:py-28">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-black/45 md:col-span-3">05 / Partnership Value</p>
          <div className="mt-8 md:col-span-8 md:col-start-5 md:mt-0">
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

        <section className="bg-[#e9e2d5] py-20 lg:py-28">
          <div className="mx-auto w-full max-w-[1680px] px-6 sm:px-8 md:px-12 lg:px-16">
            <div className="grid md:grid-cols-12">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-black/45 md:col-span-3">06 / From Idea to Agreement</p>
              <div className="mt-8 md:col-span-8 md:col-start-5 md:mt-0">
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

        <section className="mx-auto grid w-full max-w-[1680px] px-6 py-20 sm:px-8 md:grid-cols-12 md:px-12 lg:px-16 lg:py-28">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-black/45 md:col-span-3">07 / Start a Conversation</p>
          <div className="mt-8 md:col-span-8 md:col-start-5 md:mt-0">
            <h2 className="font-[var(--font-display)] text-[clamp(2.7rem,5vw,5rem)] leading-[0.96] tracking-[-0.035em]">What to Include in Your Enquiry</h2>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-black/80">You do not need a finished brief to begin. Tell us what you are considering and share the information you already have. We can then identify the questions that need to be answered before a project can move forward.</p>
            <div className="mt-9 grid gap-5 border-y border-black/15 py-8 text-[15px] leading-7 text-black/68 sm:grid-cols-2 sm:gap-x-12">
              <p><span className="font-semibold text-[#182019]">Your organisation:</span> company or organisation name and contact details.</p>
              <p><span className="font-semibold text-[#182019]">Market:</span> country, city and intended sales or experience location.</p>
              <p><span className="font-semibold text-[#182019]">Partnership type:</span> hospitality, travel, retail, corporate gifting, brand collaboration or distribution.</p>
              <p><span className="font-semibold text-[#182019]">Audience and channels:</span> the people you want to reach and where they will encounter the product.</p>
              <p><span className="font-semibold text-[#182019]">Product idea:</span> coffee format, gifting concept or experience you are exploring.</p>
              <p><span className="font-semibold text-[#182019]">Project scope:</span> estimated quantity or project size, if known.</p>
              <p><span className="font-semibold text-[#182019]">Timing:</span> possible launch date and any important milestones.</p>
              <p><span className="font-semibold text-[#182019]">Requirements:</span> packaging, documentation, sampling or other decision criteria.</p>
            </div>
            <p className="mt-6 max-w-3xl text-[15px] leading-7 text-black/60">You can provide this context in your message on our Contact page. Enquiries are reviewed against the proposed project's needs and available coffee or product options.</p>
          </div>
        </section>

        <section className="bg-[#182019] px-6 py-20 text-[#f6f3ea] sm:px-8 md:px-12 lg:px-16 lg:py-28">
          <div className="mx-auto w-full max-w-[1680px]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/50">Build a Cambodian Coffee Partnership</p>
            <h2 className="mt-7 max-w-5xl font-[var(--font-display)] text-[clamp(3rem,6vw,6rem)] leading-[0.95] tracking-[-0.04em]">Bring an idea. Begin with Cambodia.</h2>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-white/72">For hotels, retailers, travel businesses, corporate teams and brands interested in a meaningful Cambodian coffee experience, we would like to hear what you have in mind. Your next step is a conversation, not an obligation to commit.</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#f6f3ea] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#182019]">Discuss a Partnership <ArrowUpRight className="size-4" /></Link>
              <Link href="/distribution" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">Explore Distribution <ArrowUpRight className="size-4" /></Link>
            </div>
            <p className="mt-12 text-[12px] tracking-[0.12em] text-white/50">100% Cambodian coffee. True to its origin, unmistakably its own.</p>
          </div>
        </section>
      </main>
    </>
  )
}
