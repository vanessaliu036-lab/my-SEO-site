import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { siteUrl, ogImage } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "OCC Brand & Gifting | Cambodian Coffee Gifts with ARUNERA",
  description:
    "OCC partners with ARUNERA to turn Cambodia-origin coffee and Fine Robusta into premium Cambodian coffee gifts, hotel gifts, travel souvenirs, corporate gifting and retail-ready products.",
  keywords:
    "Cambodian coffee gifts, Cambodian coffee souvenir, premium Cambodian gifts, coffee gift Cambodia, hotel coffee gifts Cambodia, Cambodian corporate gifts, Cambodian souvenir coffee, premium souvenir Cambodia, ARUNERA, OCC partnerships",
  alternates: pageAlternates("/brand-gifting"),
  openGraph: {
    title: "OCC Brand & Gifting | Cambodian Coffee Gifts with ARUNERA",
    description:
      "Coffee origin from OCC. Cambodian gifting by ARUNERA. A partnership for premium coffee gifts, hospitality, travel, corporate gifting and retail.",
    url: `${siteUrl}/brand-gifting`,
    siteName: "Origin Coffee Cambodia",
    type: "website",
    images: [{ url: ogImage, width: 1672, height: 941, alt: "OCC Brand & Gifting — Origin Coffee Cambodia" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "OCC Brand & Gifting | Cambodian Coffee Gifts with ARUNERA",
    description: "Cambodian coffee, made to be remembered — OCC × ARUNERA.",
    images: [ogImage],
  },
}

const applications = [
  {
    number: "01",
    title: "Hotel Gift",
    copy: "Cambodian coffee developed for guest welcome gifts, VIP gifting, room experiences, hotel retail shelves and seasonal hospitality programs.",
  },
  {
    number: "02",
    title: "Travel Souvenir",
    copy: "A premium Cambodian coffee souvenir built around origin, Fine Robusta, local identity and a product presentation worth taking home.",
  },
  {
    number: "03",
    title: "Corporate Gifting",
    copy: "Coffee gifting for companies, conferences, tourism events, institutional programs and partner appreciation with a clear Cambodian identity.",
  },
  {
    number: "04",
    title: "Retail",
    copy: "Retail-ready Cambodian coffee gifts for hotels, cafés, concept stores, airport retail, lifestyle stores and selected souvenir channels.",
  },
]

const partnershipFlow = [
  ["Origin", "Cambodian coffee from OCC"],
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
  name: "OCC Brand & Gifting | Cambodian Coffee Gifts with ARUNERA",
  description:
    "OCC and ARUNERA connect Cambodia-origin coffee with premium gifting formats for hospitality, travel, corporate gifting and retail.",
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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(196,109,51,0.28),transparent_30%),linear-gradient(125deg,#6b1323_0%,#6b1323_64%,#6b1323_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#182019] via-[#182019]/92 to-[#182019]/62" />

          <div className="relative mx-auto grid min-h-[72svh] w-full max-w-[1680px] grid-cols-1 content-end px-6 pb-16 pt-28 sm:px-8 md:grid-cols-12 md:px-12 lg:px-16 lg:pb-20">
            <div className="md:col-span-9 lg:col-span-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/58">Brand & Gifting · OCC × ARUNERA</p>
              <h1 className="mt-7 font-[var(--font-display)] text-[clamp(3.4rem,7vw,7rem)] font-normal leading-[0.88] tracking-[-0.045em]">
                Cambodian coffee,
                <br />made to be remembered.
              </h1>
              <p className="mt-8 max-w-[760px] text-[clamp(1.15rem,2vw,1.75rem)] leading-[1.35] text-white/86">
                OCC works with selected partners to bring Cambodian coffee into new formats, markets and experiences. With ARUNERA, Cambodia-origin coffee becomes a premium gift people can discover, share and take home.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="#arunera" className="inline-flex items-center gap-2 rounded-full bg-[#f6f3ea] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.17em] text-[#182019]">
                  OCC × ARUNERA <ArrowUpRight className="size-3" />
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/35 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.17em] text-white">
                  Discuss a Partnership <ArrowUpRight className="size-3" />
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
                For many travelers, hotel guests and international buyers, a first encounter with Cambodian coffee may happen through a gift, a hotel room, a souvenir shelf or a product brought home after the trip.
              </p>
              <p className="text-[15px] leading-7 text-black/64">
                OCC provides the coffee foundation: Cambodia origin, Fine Robusta expertise, quality decisions and roast direction. ARUNERA turns that foundation into a premium Cambodian gift experience designed for hospitality, travel, retail and meaningful occasions.
              </p>
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
                ARUNERA is a Cambodian gift platform focused on products worth bringing home. It curates Cambodian-made coffee, crafts and lifestyle products into more refined, useful and internationally presentable gift experiences.
              </p>
              <p className="mt-6 max-w-3xl text-[15px] leading-7 text-white/62">
                For coffee gifting, ARUNERA works with OCC to connect Cambodian coffee with product concept, packaging direction, gifting format, retail presentation and traveler discovery. OCC remains responsible for the coffee proposition; ARUNERA develops the gifting experience around it.
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
            <div className="md:col-span-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-black/38">03 / Premium Coffee Gifts</p>
            </div>
            <div className="mt-8 md:col-span-8 md:col-start-5 md:mt-0">
              <h2 className="font-[var(--font-display)] text-[clamp(2.5rem,5vw,5rem)] font-normal leading-[0.94] tracking-[-0.035em]">
                Cambodian coffee gifts
                <br />worth taking home.
              </h2>
              <p className="mt-8 max-w-3xl text-lg leading-8 text-black/76">
                The goal is not to make another generic souvenir. A Cambodian coffee souvenir should make the origin easier to remember: where the coffee comes from, why Fine Robusta matters, how the product is used and why it belongs in the person’s memory of Cambodia.
              </p>

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
            <div className="md:col-span-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#e8be62]">04 / Hotels & Hospitality</p>
            </div>
            <div className="mt-8 md:col-span-8 md:col-start-5 md:mt-0">
              <h2 className="font-[var(--font-display)] text-[clamp(2.6rem,5vw,5.2rem)] font-normal leading-[0.94] tracking-[-0.035em]">
                Make Cambodian coffee
                <br />part of the guest experience.
              </h2>
              <p className="mt-9 max-w-3xl text-lg leading-8 text-white/78">
                A hotel can use Cambodian coffee as more than breakfast supply. The same origin can become a welcome gift, room experience, retail product or hotel-branded coffee gift that guests can take with them.
              </p>
              <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="border border-white/20 p-7">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#e8be62]">Hotel × OCC</p>
                  <p className="mt-5 text-sm leading-7 text-white/72">Cambodian coffee, Fine Robusta expertise, roast direction and the coffee proposition behind the product.</p>
                </div>
                <div className="border border-white/20 p-7">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#e8be62]">Hotel × ARUNERA</p>
                  <p className="mt-5 text-sm leading-7 text-white/72">Gift concept, presentation, hotel identity, retail format and the experience around taking a Cambodian product home.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-[1680px] grid-cols-1 px-6 py-20 sm:px-8 md:grid-cols-12 md:px-12 lg:px-16 lg:py-28">
          <div className="md:col-span-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-black/38">05 / Discovery After the Gift</p>
          </div>
          <div className="mt-8 md:col-span-8 md:col-start-5 md:mt-0">
            <h2 className="font-[var(--font-display)] text-[clamp(2.4rem,4.8vw,4.8rem)] font-normal leading-[0.94] tracking-[-0.035em]">
              A gift can keep working
              <br />after the guest leaves.
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-8 border-t border-black/10 pt-8 lg:grid-cols-2 lg:gap-14">
              <p className="text-lg leading-8 text-black/82">
                The product can connect to origin storytelling, QR content, travel discovery pages, hotel-branded landing pages and search-led Cambodian gift guides. The objective is to make the gift findable again, not just attractive once.
              </p>
              <p className="text-[15px] leading-7 text-black/62">
                This is where the partnership goes beyond packaging. OCC builds coffee authority and product credibility. ARUNERA builds the Cambodian gift context around the product. Together, the coffee has a clearer path from origin to discovery, purchase, gifting and memory.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-black/10 bg-[#efe8d8]">
          <div className="mx-auto flex w-full max-w-[1680px] flex-col gap-8 px-6 py-16 sm:px-8 md:flex-row md:items-end md:justify-between md:px-12 lg:px-16 lg:py-20">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-black/38">Build a Cambodian Coffee Gift</p>
              <h2 className="mt-5 font-[var(--font-display)] text-[clamp(2.2rem,4vw,4rem)] font-normal leading-[0.96] tracking-[-0.03em]">
                For hotels, retailers,
                <br />corporate gifting and travel partners.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#182019] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.17em] text-white">
                Discuss a Partnership <ArrowUpRight className="size-3" />
              </Link>
              <Link href="/solutions/wholesale" className="inline-flex items-center gap-2 rounded-full border border-black/20 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.17em]">
                Coffee Supply <ArrowUpRight className="size-3" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
