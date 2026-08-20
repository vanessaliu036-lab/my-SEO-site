import Link from "next/link"
import type { Metadata } from "next"
import { OriginFeatureStrip } from "@/components/ui/origin-feature-strip"
import { AlternatingRevealSection } from "@/components/ui/alternating-reveal-section"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Single Origin Coffee | Origin Coffee Cambodia",
  description:
    "Explore Cambodia's specialty coffee terroir — Mondulkiri and Ratanakiri highlands mapped by elevation, soil composition, and sensory profile.",
  alternates: pageAlternates("/coffee/single-origin"),
  openGraph: {
    title: "Single Origin Coffee | Origin Coffee Cambodia",
    description:
      "Geographic analysis of Cambodia's highland coffee regions. Terroir architecture mapping the sensory coordinates of Mondulkiri and Ratanakiri.",
    url: `${siteUrl}/coffee/single-origin`,
    siteName: "Origin Coffee Cambodia",
    locale: "en_US",
    type: "website",
  },
}

const originSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "OCC Coffee Origins",
  itemListElement: [
    {
      "@type": "Place",
      name: "Mondulkiri Province",
      description: "Highland coffee region in Eastern Cambodia known for volcanic soil.",
      geo: { "@type": "GeoCoordinates", latitude: 12.46, longitude: 107.10 },
    },
    {
      "@type": "Place",
      name: "Ratanakiri Province",
      description: "Northeastern province famous for its rich red soil and premium Robusta.",
      geo: { "@type": "GeoCoordinates", latitude: 13.73, longitude: 107.01 },
    },
    {
      "@type": "Place",
      name: "Kampot Province",
      description: "Coastal region producing unique flavor profiles due to sea breeze.",
      geo: { "@type": "GeoCoordinates", latitude: 10.62, longitude: 104.18 },
    },
  ],
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What makes Cambodian single-origin coffee unique?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cambodian specialty coffee grows in highland volcanic basalt soils at elevations between 400 m and 1,000 m in provinces like Mondulkiri and Ratanakiri. The combination of high-altitude thermal variance, rich ferruginous laterite soil, and traditional shade-grown cultivation produces a cup profile characterised by heavy body, balanced acidity, and earthy-chocolate undertones distinct from other Southeast Asian origins.",
      },
    },
    {
      "@type": "Question",
      name: "What is the flavour profile of Mondulkiri coffee?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mondulkiri coffee, grown at 800–1,000 m on volcanic red basalt soil, is known for high bean density, balanced acidity, and nutty undertones. The highland thermal variance slows cherry development, allowing greater sugar accumulation and a cleaner, more nuanced cup compared to lowland lots.",
      },
    },
    {
      "@type": "Question",
      name: "How does Ratanakiri coffee differ from Mondulkiri?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ratanakiri coffee grows at lower elevations (400–600 m) in ferruginous latosol — iron-rich red earth. This produces a heavier-bodied cup with prominent dark chocolate notes and lower acidity. The region is particularly suited to premium Robusta, which thrives in the dense mineral soil and humid lowland climate.",
      },
    },
    {
      "@type": "Question",
      name: "Does OCC offer single-origin lots for wholesale buyers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. OCC supplies traceable single-origin lots from Mondulkiri and Ratanakiri to wholesale and hospitality clients across Cambodia. Each lot ships with full provenance documentation including farm coordinates, processing method, harvest date, and cupping score. Contact us for current available lots and minimum order quantities.",
      },
    },
  ],
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Coffee", item: `${siteUrl}/coffee` },
    { "@type": "ListItem", position: 3, name: "Single Origin", item: `${siteUrl}/coffee/single-origin` },
  ],
}

export default function SingleOriginPage() {
  const regions = [
    {
      id: "01",
      name: "MONDULKIRI",
      coordinates: "12°27'15.8\"N 107°11'11.7\"E",
      altitude: "800M - 1000M",
      soil: "VOLCANIC RED BASALT",
      profile: "High Density, Balanced Acidity, Nutty Undertones",
      density: "85%",
      moisture: "11.5%"
    },
    {
      id: "02",
      name: "RATANAKIRI",
      coordinates: "13°44'43.2\"N 107°00'34.5\"E",
      altitude: "400M - 600M",
      soil: "FERRUGINOUS LATOSOL",
      profile: "Heavy Body, Dark Chocolate, Low Acidity",
      density: "82%",
      moisture: "12.0%"
    }
  ]

  const originFeatures = [
    {
      label: "ALTITUDE",
      value: "Highland lots mapped from 400 m to 1,000 m.",
      icon: "altitude" as const,
    },
    {
      label: "TERROIR",
      value: "Volcanic red basalt and ferruginous latosol shape the regional profiles.",
      icon: "terroir" as const,
    },
    {
      label: "ORIGIN",
      value: "Mondulkiri and Ratanakiri are the core highland regions mapped here.",
      icon: "origin" as const,
    },
    {
      label: "TRACEABILITY",
      value: "Wholesale lots include provenance documentation such as coordinates, processing method, harvest date, and cupping score.",
      icon: "traceability" as const,
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(originSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="min-h-screen bg-[#f6f3ea] text-[#182019]">
        <section className="relative overflow-hidden bg-[#1c211b] text-white">
          <div className="pointer-events-none absolute inset-0 hidden grid-cols-12 divide-x divide-white/[0.08] md:grid" aria-hidden="true">
            {Array.from({ length: 12 }).map((_, index) => <div key={index} />)}
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(231,242,201,0.10),transparent_30%)]" aria-hidden="true" />

          <div className="relative z-10 mx-auto max-w-[1680px] px-6 pb-12 pt-16 sm:px-8 md:px-12 lg:px-16 lg:pb-16 lg:pt-24">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
              <div className="md:col-span-3">
                <p className="occ-eyebrow text-white/45">03 / Geographic Analysis</p>
                <p className="mt-6 max-w-[260px] text-xs leading-6 text-white/45">
                  Mapping the sensory coordinates of Cambodia through altitude, soil, origin, and lot-level provenance.
                </p>
              </div>
              <div className="md:col-span-9">
                <h1 className="occ-editorial-title max-w-6xl text-[4.4rem] sm:text-[6rem] md:text-[7.5rem] lg:text-[9.2rem]">
                  Terroir Architecture.
                </h1>
              </div>
            </div>

            <div className="mt-14 lg:mt-20">
              <OriginFeatureStrip features={originFeatures} />
            </div>
          </div>
        </section>

        <main className="mx-auto w-full max-w-[1680px] overflow-hidden px-6 sm:px-8 md:px-12 lg:px-16">
          <section className="grid grid-cols-1 gap-8 border-b border-black/10 py-14 md:grid-cols-12 lg:py-20">
            <div className="md:col-span-3">
              <p className="occ-eyebrow text-black/38">Regional analysis</p>
            </div>
            <div className="md:col-span-9">
              <p className="max-w-5xl font-[var(--font-display)] text-3xl leading-[1.15] tracking-[-0.025em] sm:text-4xl lg:text-5xl">
                Cambodia’s coffee regions are not one uniform profile. Elevation, soil composition, density, moisture, and thermal conditions change the cup.
              </p>
            </div>
          </section>

          <div className="py-4 lg:py-8">
            {regions.map((region, index) => (
              <AlternatingRevealSection
                key={region.id}
                index={index}
                className="grid grid-cols-1 gap-10 border-b border-black/10 py-16 md:grid-cols-12 md:gap-0 lg:py-24"
              >
                <div className={`${index % 2 === 0 ? "md:order-1" : "md:order-2"} md:col-span-5 md:px-8 lg:px-12`}>
                  <div className="sticky top-28">
                    <p className="occ-eyebrow text-black/35">{region.id} / Region</p>
                    <h2 className="mt-5 font-[var(--font-display)] text-5xl font-normal leading-[0.94] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                      {region.name}
                    </h2>
                    <p className="mt-8 max-w-lg text-sm leading-8 text-black/52">
                      {region.profile}. High-altitude thermal variance optimizes the <span className="font-medium text-[#182019]">molecular sugar conversion</span>, processed under strict physical constraints.
                    </p>
                  </div>
                </div>

                <div className={`${index % 2 === 0 ? "md:order-2 md:border-l" : "md:order-1 md:border-r"} md:col-span-7 md:border-black/10 md:px-8 lg:px-12`}>
                  <div className="border-y border-black/10">
                    {[
                      ["Coordinates", region.coordinates],
                      ["Elevation", region.altitude],
                      ["Soil Composition", region.soil],
                    ].map(([label, value]) => (
                      <div key={label} className="grid grid-cols-[130px_1fr] gap-5 border-b border-black/10 py-5 last:border-b-0 sm:grid-cols-[180px_1fr]">
                        <span className="text-[9px] uppercase tracking-[0.18em] text-black/35">{label}</span>
                        <span className="text-right text-xs font-medium uppercase tracking-[0.08em] sm:text-sm">{value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 grid grid-cols-2 border border-black/10">
                    <div className="p-6 sm:p-8">
                      <p className="text-[9px] uppercase tracking-[0.18em] text-black/35">Density Analysis</p>
                      <p className="mt-8 font-[var(--font-display)] text-5xl leading-none tracking-[-0.04em]">{region.density}</p>
                      <div className="mt-6 h-px w-full bg-black/10">
                        <div className="h-px bg-[#182019]" style={{ width: region.density }} />
                      </div>
                    </div>
                    <div className="border-l border-black/10 p-6 sm:p-8">
                      <p className="text-[9px] uppercase tracking-[0.18em] text-black/35">Moisture Content</p>
                      <p className="mt-8 font-[var(--font-display)] text-5xl leading-none tracking-[-0.04em]">{region.moisture}</p>
                      <div className="mt-6 h-px w-full bg-black/10">
                        <div className="h-px bg-[#182019]" style={{ width: region.moisture }} />
                      </div>
                    </div>
                  </div>
                </div>
              </AlternatingRevealSection>
            ))}
          </div>

          <section className="grid grid-cols-1 gap-8 py-20 md:grid-cols-12 lg:py-28">
            <div className="md:col-span-4">
              <p className="occ-eyebrow text-black/38">Wholesale provenance</p>
            </div>
            <div className="md:col-span-8">
              <h2 className="font-[var(--font-display)] text-5xl font-normal leading-[0.95] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                Source the lot,<br />not the category.
              </h2>
              <p className="mt-7 max-w-2xl text-sm leading-8 text-black/52 sm:text-base">
                OCC supplies traceable single-origin lots from Mondulkiri and Ratanakiri to wholesale and hospitality clients across Cambodia. Each lot ships with full provenance documentation including farm coordinates, processing method, harvest date, and cupping score.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/solutions/wholesale" className="occ-pill px-7 py-3.5 text-[10px] font-medium uppercase tracking-[0.16em]">Wholesale sourcing ↗</Link>
                <Link href="/contact" className="inline-flex items-center border-b border-black/30 px-1 py-3 text-[10px] font-medium uppercase tracking-[0.16em]">Request current lots</Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
