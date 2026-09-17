import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { ogImage, siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "OCC Partnerships | Brand, Gifting & Distribution",
  description:
    "Explore OCC partnership pathways for Cambodian coffee gifting, hospitality, retail, distribution and international market development.",
  keywords:
    "OCC partnerships, Cambodian coffee partnership, coffee gifting, coffee distribution partners, Cambodian coffee importer, Cambodian coffee distributor",
  alternates: pageAlternates("/partnerships"),
  openGraph: {
    title: "OCC Partnerships | Brand, Gifting & Distribution",
    description:
      "Two clear ways to work with Origin Coffee Cambodia: brand and gifting collaborations, or distribution partnerships.",
    url: siteUrl + "/partnerships",
    siteName: "Origin Coffee Cambodia",
    type: "website",
    images: [{ url: ogImage, width: 1672, height: 941, alt: "OCC Partnerships — Origin Coffee Cambodia" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "OCC Partnerships | Brand, Gifting & Distribution",
    description: "Find the right partnership path for Cambodian coffee.",
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
  },
  {
    number: "02",
    label: "Distribution Partners",
    description:
      "Bring Cambodia-origin coffee to your market as a distributor, importer, regional agent, retailer or hospitality partner.",
    href: "/distribution",
    action: "Explore Distribution",
  },
]

const partnershipSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": siteUrl + "/partnerships#webpage",
  url: siteUrl + "/partnerships",
  name: "OCC Partnerships | Brand, Gifting & Distribution",
  description:
    "Two partnership pathways for Cambodian coffee: brand and gifting collaborations, or distribution partnerships.",
  isPartOf: { "@id": siteUrl + "/#website" },
}

export default function PartnershipsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(partnershipSchema) }} />

      <main className="bg-[#f6f3ea] text-[#182019]">
        <section className="relative overflow-hidden bg-[#182019] text-[#f6f3ea]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(151,45,35,0.42),transparent_32%),linear-gradient(135deg,#182019_0%,#273229_68%,#7a1118_150%)]" />
          <div className="relative mx-auto w-full max-w-[1680px] px-6 pb-20 pt-28 sm:px-8 md:px-12 lg:px-16 lg:pb-28 lg:pt-36">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/58">OCC · Partnerships</p>
            <h1 className="mt-7 max-w-5xl font-[var(--font-display)] text-[clamp(4rem,8vw,8.4rem)] font-normal leading-[0.86] tracking-[-0.05em]">
              Find the right
              <br />
              way to work with OCC.
            </h1>
            <p className="mt-9 max-w-2xl text-lg leading-8 text-white/76">
              OCC connects Cambodia-origin coffee with partners who want to build meaningful products, gifting experiences and new markets.
            </p>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-[1680px] grid-cols-1 gap-px px-6 py-16 sm:px-8 md:grid-cols-2 md:px-12 lg:px-16 lg:py-24">
          {partnershipPaths.map((path) => (
            <article key={path.href} className="flex min-h-[360px] flex-col justify-between border border-black/10 bg-[#efe9dc] p-7 sm:p-10 lg:p-14">
              <div>
                <p className="text-[10px] tracking-[0.22em] text-black/36">{path.number}</p>
                <h2 className="mt-7 max-w-md font-[var(--font-display)] text-[clamp(2.7rem,5vw,5.4rem)] font-normal leading-[0.9] tracking-[-0.04em]">
                  {path.label}
                </h2>
                <p className="mt-7 max-w-md text-[15px] leading-7 text-black/66">{path.description}</p>
              </div>
              <Link
                href={path.href}
                className="mt-10 inline-flex w-fit items-center gap-2 border-b border-[#182019] pb-2 text-[10px] font-semibold uppercase tracking-[0.18em]"
              >
                {path.action} <ArrowUpRight className="size-3" />
              </Link>
            </article>
          ))}
        </section>
      </main>
    </>
  )
}
