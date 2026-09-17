import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { siteUrl, ogImage } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

const pageTitle = "Cambodian Coffee Gifts & Brand Partnerships | OCC"
const pageDescription = "OCC partners with hotels, travel brands, retailers and companies to create premium Cambodian coffee gifts and origin-led experiences."

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: "Cambodian coffee gifts, Cambodia coffee partnership, hotel coffee gifts, Cambodian coffee souvenir, premium Cambodian gifts, coffee gift Cambodia, Cambodian corporate gifts, Cambodian souvenir coffee, ARUNERA, OCC partnerships",
  alternates: pageAlternates("/brand-gifting"),
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${siteUrl}/brand-gifting`,
    siteName: "Origin Coffee Cambodia",
    type: "website",
    images: [{ url: ogImage, width: 1672, height: 941, alt: "OCC Brand & Gifting — Origin Coffee Cambodia" }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [ogImage],
  },
}

const applications = [
  {
    number: "01",
    title: "Hotel Gifts",
    copy: "A hotel welcome gift, VIP gesture or in-room coffee experience can connect guests to Cambodia origin. The coffee format, packaging and hotel identity are developed for the specific hospitality project rather than assumed to be a ready-made supply program.",
  },
  {
    number: "02",
    title: "Travel Souvenirs",
    copy: "A premium Cambodian coffee souvenir combines a clear origin story, useful product information and presentation worth bringing home. The goal is to make local coffee discoverable, not to pass off anonymous or imported coffee as a Cambodian product.",
  },
  {
    number: "03",
    title: "Corporate Gifting",
    copy: "Companies, conferences and tourism partners can explore Cambodia-origin coffee as a distinctive gift for guests or collaborators. Product selection, timing, presentation and commercial scope should be agreed for each proposed program.",
  },
  {
    number: "04",
    title: "Retail Coffee Gifts",
    copy: "Selected hotel stores, cafés, travel retailers and lifestyle shops can explore coffee gift collections with origin information that customers can understand. Retail format, quantities and availability remain subject to discussion and confirmation.",
  },
]

const partnershipFlow = [
  ["Origin", "Cambodia-origin coffee from OCC"],
  ["Product", "Coffee profile and format"],
  ["Gift", "ARUNERA curation and presentation"],
  ["Destination", "Hotels · Travel · Retail · Corporate"],
]

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Brand & Gifting", item: `${siteUrl}/brand-gifting` },
  ],
}

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${siteUrl}/brand-gifting#webpage`,
  url: `${siteUrl}/brand-gifting`,
  name: pageTitle,
  description: pageDescription,
  isPartOf: { "@id": `${siteUrl}/#website` },
  about: ["Cambodian coffee gifts", "Cambodian coffee souvenir", "ARUNERA", "Origin Coffee Cambodia"],
}

export default function BrandGiftingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />

      <div className="bg-[#f6f3ea] text-[#182019]">
        <section className="relative overflow-hidden bg-[#182019] text-[#f6f3ea]">
          <div className="absolute inset-0 opacity-45">
            <img src="/about/occ-about-atlas.avif" alt="" aria-hidden="true" className="h-full w-full object-cover object-top saturate-[0.8]" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#182019] via-[#182019]/86 to-[#182019]/45" />
          <div className="relative mx-auto grid min-h-[72svh] w-full max-w-[1680px] grid-cols-1 content-end px-6 pb-16 pt-28 sm:px-8 md:grid-cols-12 md:px-12 lg:px-16 lg:pb-20">
            <div className="md:col-span-9 lg:col-span-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/58">Brand & Gifting · OCC × ARUNERA</p>
              <h1 className="mt-7 font-[var(--font-display)] text-[clamp(3.4rem,7vw,7rem)] font-normal leading-[0.88] tracking-[-0.045em]">
                Cambodian coffee,
                <br />made to be remembered.
              </h1>
              <p className="mt-8 max-w-[760px] text-[clamp(1.15rem,2vw,1.75rem)] leading-[1.35] text-white/86">
                A Brand & Gift partnership turns Cambodia-origin coffee into hotel gifts, travel souvenirs, corporate gifts and selected retail experiences. OCC works with selected partners to bring Cambodian coffee into formats people can discover, share and take home.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="#arunera" className="inline-flex items-center gap-2 rounded-full bg-[#f6f3ea] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.17em] text-[#182019]">
                  Explore OCC × ARUNERA <ArrowUpRight className="size-3" />
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/35 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.17em] text-white">
                  Discuss a Brand & Gift Partnership <ArrowUpRight className="size-3" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-[1680px] grid-cols-1 px-6 py-20 sm:px-8 md:grid-cols-12 md:px-12 lg:px-16 lg:py-28">
          <div className="md:col-span-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-black/38">01 / Why Partnership</p>
          </div>
          <div className="mt-8 md:col-span-8 md:col-start-5 md:mt-0">
            <h2 className="font-[var(--font-display)] text-[clamp(2.5rem,5vw,5rem)] font-normal leading-[0.94] tracking-[-0.035em]">
              Coffee does not always
              <br />begin at a café.
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-8 border-t border-black/10 pt-8 lg:grid-cols-2 lg:gap-14">
              <p className="text-lg leading-8 text-black/84">
                For many travelers, hotel guests and international buyers, a first encounter with Cambodian coffee may happen through a welcome gift, a hotel room, a souvenir shelf or a product brought home after a trip.
              </p>
              <p className="text-[15px] leading-7 text-black/64">
                OCC provides the coffee foundation: Cambodia origin, Fine Robusta expertise, quality decisions and roast direction. Our brand partners develop the format, presentation and experience around the coffee. Discover why <Link href="/fine-robusta-cambodia" className="border-b border-black/35">Fine Robusta Cambodia</Link> is central to OCC.
              </p>
            </div>
            <div className="mt-12 grid gap-10 border-t border-black/10 pt-9 sm:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold">What OCC Brings to the Partnership</h3>
                <p className="mt-4 text-[15px] leading-7 text-black/64">Cambodia-origin coffee, Fine Robusta knowledge, roast direction, origin storytelling, product quality decisions and coffee information for hospitality or retail use. Each project's available coffee and supporting records are checked before any commitment.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">What Brand Partners Build</h3>
                <p className="mt-4 text-[15px] leading-7 text-black/64">Audience insight, gift concept, packaging direction, guest experience and retail presentation. Partners may explore hotel welcome gifts, travel retail, corporate gifting and branded coffee collections, subject to individual project scope.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="arunera" className="bg-[#071a32] text-[#f3d28a]">
          <div className="mx-auto grid w-full max-w-[1680px] grid-cols-1 px-6 py-20 sm:px-8 md:grid-cols-12 md:px-12 lg:px-16 lg:py-28">
            <div className="md:col-span-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#e5ae45]">02 / Featured Partner</p>
              <p className="mt-5 text-[10px] uppercase tracking-[0.2em] text-white/42">Coffee Origin × Cambodian Gifting</p>
            </div>
            <div className="mt-9 md:col-span-8 md:col-start-5 md:mt-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#e5ae45]">OCC × ARUNERA</p>
              <h2 className="mt-6 font-[var(--font-display)] text-[clamp(2.7rem,5vw,5.4rem)] font-normal leading-[0.92] tracking-[-0.035em] text-[#f8e7bc]">
                From Cambodian coffee
                <br />to a gift people remember.
              </h2>
              <p className="mt-9 max-w-3xl text-lg leading-8 text-white/78">
                ARUNERA is a Cambodian gift platform focused on products worth bringing home. It curates Cambodian-made coffee, crafts and lifestyle products into useful and internationally presentable gift experiences.
              </p>
              <p className="mt-6 max-w-3xl text-[15px] leading-7 text-white/62">
                For coffee gifting, ARUNERA works with OCC on the product concept, packaging direction, gifting format, retail presentation and traveler discovery. OCC remains responsible for the coffee proposition; ARUNERA develops the gifting experience around it. Read more about OCC's <Link href="/about/mission" className="border-b border-white/35 text-[#f8e7bc]">Cambodia-origin mission</Link>.
              </p>
              <figure className="mt-12 overflow-hidden border border-white/15 bg-black/10">
                <img
                  src="/images/occ-arunera-cambodian-coffee-gift-partnership.avif"
                  alt="OCC and ARUNERA premium Cambodian coffee gift collection"
                  width={1448}
                  height={1086}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] h-auto w-full object-cover"
                />
                <figcaption className="border-t border-white/15 px-5 py-4 text-[10px] uppercase tracking-[0.18em] text-white/50">
                  ARUNERA Boutique · Cambodia specialty coffee gift collection
                </figcaption>
              </figure>
              <div className="mt-12 grid grid-cols-1 gap-px border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
                {partnershipFlow.map(([title, copy]) => (
                  <div key={title} className="bg-[#071a32] p-7">
                    <p className="text-[9px] uppercase tracking-[0.22em] text-[#e5ae45]">{title}</p>
                    <p className="mt-4 text-sm leading-6 text-white/72">{copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1680px] px-6 py-20 sm:px-8 md:px-12 lg:px-16 lg:py-28">
          <div className="grid grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-3"><p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-black/38">03 / Premium Coffee Gifts</p></div>
            <div className="mt-8 md:col-span-8 md:col-start-5 md:mt-0">
              <h2 className="font-[var(--font-display)] text-[clamp(2.5rem,5vw,5rem)] font-normal leading-[0.94] tracking-[-0.035em]">
                Cambodian coffee gifts
                <br />worth taking home.
              </h2>
              <p className="mt-8 max-w-3xl text-lg leading-8 text-black/76">A Cambodian coffee souvenir should be more than a generic gift. It should help the recipient understand where the coffee comes from, why Fine Robusta matters and how the product belongs in their memory of Cambodia.</p>
              <div className="mt-12 grid grid-cols-1 border-y border-black/10 sm:grid-cols-2">
                {applications.map((item, index) => (
                  <article key={item.title} className={`py-8 sm:p-8 ${index % 2 === 1 ? "sm:border-l sm:border-black/10" : ""} ${index >= 2 ? "border-t border-black/10" : index === 1 ? "border-t border-black/10 sm:border-t-0" : ""}`}>
                    <p className="text-[9px] tracking-[0.2em] text-black/30">{item.number}</p>
                    <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                    <p className="mt-4 text-[14px] leading-7 text-black/60">{item.copy}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#7a1118] text-[#f6e7c4]">
          <div className="mx-auto grid w-full max-w-[1680px] grid-cols-1 px-6 py-20 sm:px-8 md:grid-cols-12 md:px-12 lg:px-16 lg:py-28">
            <div className="md:col-span-3"><p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#e8be62]">04 / Hotels & Hospitality</p></div>
            <div className="mt-8 md:col-span-8 md:col-start-5 md:mt-0">
              <h2 className="font-[var(--font-display)] text-[clamp(2.6rem,5vw,5.2rem)] font-normal leading-[0.94] tracking-[-0.035em]">
                Make Cambodian coffee
                <br />part of the guest experience.
              </h2>
              <p className="mt-9 max-w-3xl text-lg leading-8 text-white/78">A hotel can use Cambodian coffee as more than breakfast supply. The same origin can become a welcome gift, in-room experience, retail product or hotel-branded coffee gift guests take home. The product and hospitality format depend on the partnership.</p>
              <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="border border-white/20 p-7">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#e8be62]">Hotel × OCC</p>
                  <p className="mt-5 text-sm leading-7 text-white/72">Cambodian coffee, Fine Robusta knowledge, roast direction and the coffee proposition behind the product.</p>
                </div>
                <div className="border border-white/20 p-7">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#e8be62]">Hotel × ARUNERA</p>
                  <p className="mt-5 text-sm leading-7 text-white/72">Gift concept, packaging presentation, hotel identity, retail format and the experience around taking a Cambodian product home.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-[1680px] grid-cols-1 px-6 py-20 sm:px-8 md:grid-cols-12 md:px-12 lg:px-16 lg:py-28">
          <div className="md:col-span-3"><p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-black/38">05 / Discovery After the Gift</p></div>
          <div className="mt-8 md:col-span-8 md:col-start-5 md:mt-0">
            <h2 className="font-[var(--font-display)] text-[clamp(2.4rem,4.8vw,4.8rem)] font-normal leading-[0.94] tracking-[-0.035em]">A gift can keep working<br />after the guest leaves.</h2>
            <div className="mt-10 grid grid-cols-1 gap-8 border-t border-black/10 pt-8 lg:grid-cols-2 lg:gap-14">
              <p className="text-lg leading-8 text-black/82">A coffee gift can connect the physical product to origin storytelling, QR content, travel discovery, hotel landing pages and Cambodian coffee guides. The aim is to make the origin easier to discover, remember and find again.</p>
              <p className="text-[15px] leading-7 text-black/62">OCC provides coffee knowledge and origin context, while brand partners build gift discovery and presentation. For partners focused instead on territory representation and international channels, explore <Link href="/distribution" className="border-b border-black/35 font-medium">International Distribution Partnerships</Link>.</p>
            </div>
          </div>
        </section>

        <section className="border-t border-black/10 bg-[#efe8d8]">
          <div className="mx-auto flex w-full max-w-[1680px] flex-col gap-8 px-6 py-16 sm:px-8 md:flex-row md:items-end md:justify-between md:px-12 lg:px-16 lg:py-20">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-black/38">Build a Cambodian Coffee Gift</p>
              <h2 className="mt-5 font-[var(--font-display)] text-[clamp(2.2rem,4vw,4rem)] font-normal leading-[0.96] tracking-[-0.03em]">For hotels, retailers,<br />corporate gifting and travel partners.</h2>
              <p className="mt-5 max-w-2xl text-[15px] leading-7 text-black/60">Tell us your audience, intended gift format, destination and timing. Coffee choice and project terms will be discussed for each enquiry.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#182019] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.17em] text-white">Discuss a Brand & Gift Partnership <ArrowUpRight className="size-3" /></Link>
              <Link href="/solutions/wholesale" className="inline-flex items-center gap-2 rounded-full border border-black/20 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.17em]">Coffee Supply <ArrowUpRight className="size-3" /></Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
