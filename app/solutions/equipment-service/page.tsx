import Link from "next/link"
import { Metadata } from "next"
import { siteUrl } from "@/lib/siteConfig"

export const metadata: Metadata = {
  title: "Coffee Equipment Service Cambodia | OCC",
  description:
    "Commercial coffee equipment service in Phnom Penh and Cambodia: preventive maintenance, emergency repair, and installation support.",
  keywords:
    "espresso machine service Cambodia, grinder repair Phnom Penh, coffee equipment maintenance, cafe equipment technician",
  openGraph: {
    title: "Equipment Service | OCC",
    description: "Preventive care. Fast response. Zero downtime tolerance.",
    url: `${siteUrl}/solutions/equipment-service`,
    type: "website",
  },
  alternates: {
    canonical: `${siteUrl}/solutions/equipment-service`,
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What brands do you service?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We service major commercial brands including La Marzocco, Synesso, Nuova Simonelli, Mahlkonig, and Mazzer.",
      },
    },
    {
      "@type": "Question",
      name: "How fast is your emergency response?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We target same-day response for Phnom Penh clients on active maintenance contracts.",
      },
    },
    {
      "@type": "Question",
      name: "Do you supply spare parts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Common wear parts are stocked. Non-stock parts are sourced and expedited where possible.",
      },
    },
  ],
}

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Equipment Service",
  provider: {
    "@type": "Organization",
    name: "Origin Coffee Cambodia (OCC)",
    url: siteUrl,
  },
  areaServed: [
    { "@type": "City", name: "Phnom Penh" },
    { "@type": "Country", name: "Cambodia" },
  ],
  serviceType: "Commercial coffee equipment installation, maintenance, and repair",
}

const internalLinks: Record<string, string> = {
  "roasted beans": "/solutions/roasting-program",
  barista: "/solutions/barista-staffing",
  equipment: "/solutions/equipment-service",
  wholesale: "/solutions/wholesale",
  SCA: "/about/sustainability",
  cupping: "/coffee/single-origin",
}

const renderWithLinks = (text: string) => {
  const patterns = Object.keys(internalLinks).sort((a, b) => b.length - a.length)
  let result = text
  patterns.forEach((keyword) => {
    const regex = new RegExp(`\\b${keyword}\\b`, "gi")
    result = result.replace(
      regex,
      (match) =>
        `<a href="${internalLinks[keyword]}" class="border-b border-dashed border-gray-400 hover:border-gray-800 transition-colors">${match}</a>`,
    )
  })
  return <span dangerouslySetInnerHTML={{ __html: result }} />
}

export default function EquipmentServicePage() {
  const relatedServices = [
    { title: "Roasting Program", href: "/solutions/roasting-program", desc: "Custom roast profile development" },
    { title: "Barista Staffing", href: "/solutions/barista-staffing", desc: "Trained staffing for venues and events" },
    { title: "Wholesale", href: "/solutions/wholesale", desc: "Direct-origin and production bean supply" },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <div className="min-h-screen bg-white text-gray-800">
        <main className="max-w-7xl mx-auto px-8 pt-16 pb-24">
          <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-dashed border-gray-200 -mx-8 px-8 py-4 mb-12">
            <div className="flex items-center gap-2 text-xs tracking-wider text-gray-500">
              <Link href="/" className="hover:text-gray-900 transition-colors">HOME</Link>
              <span>/</span>
              <Link href="/solutions" className="hover:text-gray-900 transition-colors">SOLUTIONS</Link>
              <span>/</span>
              <span className="text-gray-900">EQUIPMENT SERVICE</span>
            </div>
          </nav>

          <div className="relative mb-32">
            <div className="absolute -left-16 top-0 bottom-0 flex items-center">
              <div className="transform -rotate-90 whitespace-nowrap tracking-[0.3em] text-[10px] font-light text-gray-400">
                EQUIPMENT
              </div>
            </div>
            <div className="pl-12 border-l-4 border-gray-900">
              <h1 className="text-5xl md:text-7xl tracking-tighter leading-none mb-6">
                EQUIPMENT SERVICE
              </h1>
              <p className="text-xl text-gray-500 font-light max-w-2xl leading-relaxed">
                Preventive care. Fast response. Zero downtime tolerance.
              </p>
            </div>
            <div className="absolute top-0 right-0 w-24 h-24 border border-dashed border-gray-300 -z-10" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-16">
              <section>
                <div className="flex items-center gap-4 border-b border-dashed border-gray-200 pb-3 mb-4">
                  <span className="text-sm text-gray-400 tracking-wider">01/</span>
                  <h2 className="text-2xl font-bold tracking-tight">What We Cover</h2>
                </div>
                <p className="text-gray-600 leading-relaxed pl-6 border-l border-dashed border-gray-200">
                  Commercial espresso machines, grinders, batch brewers, and water filtration systems.
                  OCC&apos;s equipment service covers installation, scheduled maintenance, calibration,
                  and emergency repair for cafe-grade and hotel-grade equipment.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-4 border-b border-dashed border-gray-200 pb-3 mb-4">
                  <span className="text-sm text-gray-400 tracking-wider">02/</span>
                  <h2 className="text-2xl font-bold tracking-tight">Service Model</h2>
                </div>
                <p className="text-gray-600 leading-relaxed pl-6 border-l border-dashed border-gray-200">
                  Two options: scheduled maintenance contracts for ongoing preventive care, or on-call
                  repair response for urgent breakdowns. Both include documented service reports after
                  every visit, and can be paired with {renderWithLinks("barista")} operations support.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-4 border-b border-dashed border-gray-200 pb-3 mb-4">
                  <span className="text-sm text-gray-400 tracking-wider">03/</span>
                  <h2 className="text-2xl font-bold tracking-tight">Why OCC</h2>
                </div>
                <p className="text-gray-600 leading-relaxed pl-6 border-l border-dashed border-gray-200">
                  Equipment failure costs more than a service contract. OCC&apos;s technicians are
                  trained on commercial-grade machinery and work to minimize downtime, not extend it.
                  Every service visit is logged, and every repair comes with a follow-up check and
                  optional {renderWithLinks("SCA")} brew calibration.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-4 border-b border-dashed border-gray-200 pb-3 mb-4">
                  <span className="text-sm text-gray-400 tracking-wider">04/</span>
                  <h2 className="text-2xl font-bold tracking-tight">Who We Work With</h2>
                </div>
                <p className="text-gray-600 leading-relaxed pl-6 border-l border-dashed border-gray-200">
                  Specialty cafes, hotel F&amp;B departments, office coffee setups, and multi-location
                  operators needing consolidated service contracts linked to their {renderWithLinks("wholesale")} supply chain.
                </p>
              </section>
            </div>

            <aside className="bg-gray-900 text-white p-8 h-fit">
              <h3 className="text-sm tracking-wider text-gray-400 mb-6">SERVICE INCLUDES</h3>
              <div className="space-y-4">
                {[
                  "Preventive maintenance plans",
                  "Emergency repair response",
                  "Equipment installation and setup",
                  "Calibration and performance checks",
                  "Documented service reports",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm text-gray-300">
                    <span className="text-gray-500">&times;</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>

          <section className="mt-24 pt-12 border-t border-dashed border-gray-200">
            <h2 className="text-sm tracking-[0.3em] font-light text-gray-400 uppercase mb-10">FAQ</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <h3 className="font-bold text-gray-900">What brands do you service?</h3>
                <p className="text-gray-600 text-sm">
                  We service major commercial brands including La Marzocco, Synesso, Nuova Simonelli,
                  Mahlkonig, and Mazzer.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-gray-900">How fast is your emergency response?</h3>
                <p className="text-gray-600 text-sm">
                  We target same-day response for Phnom Penh clients on active maintenance contracts.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-gray-900">Do you supply spare parts?</h3>
                <p className="text-gray-600 text-sm">
                  Yes. Common wear parts are stocked. Non-stock parts are sourced and expedited where
                  possible.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-24">
            <h2 className="text-sm tracking-[0.3em] font-light text-gray-400 uppercase mb-8">You may also need</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((service) => (
                <Link key={service.href} href={service.href} className="group block p-6 border border-dashed border-gray-300 hover:border-gray-800 transition-all hover:-translate-y-1">
                  <h3 className="text-xl font-bold tracking-tight mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-500">{service.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-24 text-center border-t border-dashed border-gray-200 pt-12">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 text-sm tracking-wider hover:bg-gray-800 transition-colors"
            >
              TALK TO OUR TEAM
            </Link>
          </section>
        </main>
      </div>
    </>
  )
}
