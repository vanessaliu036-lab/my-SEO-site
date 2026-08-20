import Link from "next/link"
import { Metadata } from "next"
import { MinimalistHero } from "@/components/ui/minimalist-hero"
import { CoffeeBagVisual } from "@/components/ui/coffee-bag-visual"
import { siteUrl, siteLogoUrl } from "@/lib/siteConfig"
import { areaServedCambodia } from "@/lib/organizationSchema"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "About Origin | Origin Coffee Cambodia - OCC Coffee Roaster",
  description: "Learn about Origin Coffee Cambodia (OCC) - building infrastructure, not just roasting coffee. We're reconstructing Cambodia's specialty coffee supply chain through ethical sourcing, traceability, and professional training.",
  keywords: "about coffee roaster Cambodia, OCC coffee, Origin Coffee Cambodia, Cambodia coffee supply chain, specialty coffee infrastructure Cambodia, coffee sourcing Cambodia, ethical coffee Cambodia, coffee roaster Phnom Penh about",
  openGraph: {
    title: "About Origin | Origin Coffee Cambodia - OCC",
    description: "Unlike celebrity-driven roasters, OCC builds infrastructure. We're reconstructing Cambodia's specialty coffee supply chain from the ground up.",
    url: `${siteUrl}/about`,
    siteName: "Origin Coffee Cambodia",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteUrl}/images/about-og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Origin Coffee Cambodia - Origin Coffee Cambodia (OCC) About Page"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "About Origin | Origin Coffee Cambodia",
    description: "Building infrastructure for Cambodia's specialty coffee future.",
    images: [`${siteUrl}/images/about-twitter-card.jpg`]
  },
  alternates: pageAlternates("/about"),
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Origin Coffee Cambodia (OCC)",
  "alternateName": "Origin Coffee Cambodia",
  "url": `${siteUrl}`,
  "logo": siteLogoUrl,
  "description": "Specialty coffee infrastructure company reconstructing Cambodia's coffee supply chain through ethical sourcing, traceability, and professional training.",
  "areaServed": areaServedCambodia,
  "knowsAbout": [
    "Specialty Coffee Supply Chain",
    "Coffee Infrastructure",
    "Ethical Coffee Sourcing",
    "Coffee Traceability",
    "Cambodian Coffee Industry",
    "Coffee Roasting Technology"
  ],
  "foundingDate": "2020",
  "founder": {
    "@type": "Person",
    "name": "OCC Founder",
    "jobTitle": "Founder & Head Roaster"
  }
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": `${siteUrl}`
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "About",
      "item": `${siteUrl}/about`
    }
  ]
}

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About Origin Coffee Cambodia",
  "description": "Origin Coffee Cambodia (OCC) is building infrastructure for Cambodia's specialty coffee industry - from ethical sourcing to professional training.",
  "url": `${siteUrl}/about`,
  "mainEntity": {
    "@type": "Organization",
    "name": "Origin Coffee Cambodia (OCC)",
    "description": "We don't just roast coffee. We reconstruct Cambodia's specialty coffee supply chain."
  }
}

const aboutNav = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "COFFEE", href: "/coffee/single-origin" },
  { label: "COLLECTION", href: "/collection" },
  { label: "INSIGHTS", href: "/blog" },
  { label: "SOLUTIONS", href: "/solutions" },
  { label: "CULTURE & ETHICS", href: "/about/sustainability" },
]

export default function AboutPage() {
  const sections = [
    {
      title: "Mission",
      href: "/about/mission",
      desc: "Vision, Mission, and Why We Exist.",
      keywords: "coffee mission Cambodia, specialty coffee vision"
    },
    {
      title: "Founder",
      href: "/about/founder",
      desc: "Philosophy, Credentials, and the Big Idea.",
      keywords: "coffee founder Cambodia, head roaster Phnom Penh"
    },
    {
      title: "Manifesto",
      href: "/about/manifesto",
      desc: "The Barista Army Thesis: Why We'll Never Open a Cafe.",
      keywords: "coffee manifesto Cambodia, barista army"
    },
    {
      title: "Sustainability",
      href: "/about/sustainability",
      desc: "Ethical sourcing and traceability protocol.",
      keywords: "ethical coffee Cambodia, coffee traceability, sustainable sourcing"
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }} />

      <div className="min-h-screen bg-[#f6f3ea] text-[#182019]">
        <MinimalistHero
          logoText="OCC"
          navLinks={aboutNav}
          mainText="Unlike celebrity-driven roasters, OCC builds infrastructure. We reconstruct Cambodia's specialty coffee supply chain through sourcing, traceability, training, and long-term partnerships."
          readMoreLink="#about-details"
          readMoreLabel="Explore the system"
          imageSrc=""
          imageAlt="Origin Coffee Cambodia coffee bag"
          overlayText={{ part1: "ABOUT", part2: "ORIGIN." }}
          socialLinks={[]}
          locationText="Phnom Penh · Cambodia"
          eyebrow="Infrastructure · Origin · Traceability"
          showHeader={false}
          visual={<CoffeeBagVisual name="OCC" subtitle="MONDULKIRI" tone="olive" />}
        />

        <main id="about-details" className="occ-grid-lines mx-auto w-full max-w-[1680px] px-6 py-20 sm:px-8 md:px-12 lg:px-16 lg:py-28">
          <section className="grid grid-cols-1 gap-12 border-y border-black/10 py-14 md:grid-cols-12 md:gap-0 lg:py-20">
            <div className="md:col-span-5 md:pr-12 lg:pr-20">
              <p className="occ-eyebrow mb-7 text-black/40">01 / Position</p>
              <p className="font-[var(--font-display)] text-[2.2rem] leading-[1.05] tracking-[-0.035em] sm:text-[2.8rem] lg:text-[3.6rem]">
                Unlike celebrity-driven roasters, <strong className="font-normal">OCC builds infrastructure.</strong>
              </p>
              <p className="mt-7 max-w-xl text-base leading-8 text-black/55">
                我們不只是在烘焙咖啡，我們在重構柬埔寨的精品咖啡供應鏈。
              </p>
              <p className="mt-5 max-w-xl text-sm leading-7 text-black/55">
                Origin Coffee Cambodia (OCC) is a <strong className="font-medium text-[#182019]">specialty coffee infrastructure company</strong> based in Phnom Penh,
                Cambodia. We focus on building the foundational systems—from ethical sourcing and traceability protocols
                to professional training and supply chain optimization—that enable Cambodia's coffee industry to thrive
                sustainably.
              </p>

              <div className="mt-10 grid grid-cols-2 border-y border-black/10">
                <div className="py-6 pr-6">
                  <p className="font-[var(--font-display)] text-4xl leading-none">2020</p>
                  <p className="mt-2 text-[9px] uppercase tracking-[0.18em] text-black/40">Founded</p>
                </div>
                <div className="border-l border-black/10 py-6 pl-6">
                  <p className="font-[var(--font-display)] text-4xl leading-none">100%</p>
                  <p className="mt-2 text-[9px] uppercase tracking-[0.18em] text-black/40">Traceable Beans</p>
                </div>
              </div>
            </div>

            <nav aria-label="About pages navigation" className="md:col-span-7 md:border-l md:border-black/10 md:pl-12 lg:pl-20">
              <p className="occ-eyebrow mb-7 text-black/40">02 / Explore</p>
              {sections.map((section, idx) => (
                <Link key={section.href} href={section.href} className="group grid grid-cols-[42px_1fr_auto] items-end gap-4 border-t border-black/10 py-6 last:border-b">
                  <span className="text-[9px] tracking-[0.18em] text-black/35">{String(idx + 1).padStart(2, "0")}</span>
                  <div>
                    <h2 className="font-[var(--font-display)] text-3xl font-normal tracking-[-0.035em] transition-transform duration-300 group-hover:translate-x-2 sm:text-4xl">
                      {section.title}
                    </h2>
                    <p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-black/42">{section.desc}</p>
                  </div>
                  <span className="pb-1 text-xl transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">↗</span>
                </Link>
              ))}
            </nav>
          </section>

          <section className="border-b border-black/10 py-16 lg:py-24">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
              <div className="md:col-span-4">
                <p className="occ-eyebrow mb-5 text-black/40">03 / Why infrastructure</p>
                <h2 className="font-[var(--font-display)] text-5xl font-normal leading-[0.95] tracking-[-0.045em]">Built beyond<br />the roast.</h2>
              </div>
              <div className="md:col-span-8">
                <div className="grid grid-cols-1 border-t border-black/10 lg:grid-cols-3">
                  {[
                    {
                      title: "Supply Chain Transparency",
                      description: "Full traceability from farm to cup, documenting every step of our coffee's journey from Mondulkiri, Ratanakiri, and Kampot to your espresso machine."
                    },
                    {
                      title: "Professional Training",
                      description: "Building a skilled barista army through comprehensive education programs that elevate service standards across Cambodia's café industry."
                    },
                    {
                      title: "Sustainable Partnerships",
                      description: "Long-term relationships with farmers, café owners, and hospitality businesses built on trust, consistency, and shared growth."
                    }
                  ].map((item, i) => (
                    <div key={item.title} className="border-b border-black/10 p-6 lg:border-r lg:last:border-r-0">
                      <span className="text-[9px] tracking-[0.18em] text-black/35">0{i + 1}</span>
                      <h3 className="mt-10 text-base font-medium tracking-[-0.01em]">{item.title}</h3>
                      <p className="mt-4 text-sm leading-7 text-black/52">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-10 border-b border-black/10 py-16 md:grid-cols-12 lg:py-20">
            <div className="md:col-span-5">
              <p className="occ-eyebrow mb-5 text-black/40">04 / Cambodia network</p>
              <h2 className="font-[var(--font-display)] text-5xl font-normal leading-[0.95] tracking-[-0.045em]">Serving the<br />coffee community.</h2>
            </div>
            <div className="md:col-span-7 md:border-l md:border-black/10 md:pl-10 lg:pl-16">
              <p className="text-sm uppercase tracking-[0.14em] text-black/50">
                <strong>Phnom Penh</strong> · <strong>Siem Reap</strong> · <strong>Sihanoukville</strong> · <strong>Battambang</strong> · <strong>Kampot</strong>
              </p>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-black/45">
                Partnering with cafés, hotels, restaurants, and coffee enthusiasts across Cambodia
              </p>
              <Link href="/solutions/wholesale" className="occ-pill mt-8 px-6 py-3 text-[10px] font-medium uppercase tracking-[0.16em]">
                View Wholesale Supply ↗
              </Link>
            </div>
          </section>

          <footer className="flex flex-col gap-8 py-12 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[9px] uppercase tracking-[0.2em] text-black/35">Origin Coffee Cambodia</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-black/58">OCC · Building Infrastructure</p>
            </div>
            <div className="flex gap-6">
              <Link href="/vision" className="text-[10px] uppercase tracking-[0.16em] text-black/45 hover:text-black">← Vision</Link>
              <Link href="/system" className="text-[10px] uppercase tracking-[0.16em] text-black/45 hover:text-black">Ecosystem →</Link>
            </div>
          </footer>
        </main>
      </div>
    </>
  )
}
