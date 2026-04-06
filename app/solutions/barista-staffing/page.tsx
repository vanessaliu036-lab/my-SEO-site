import Link from "next/link"
import { Metadata } from "next"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Barista Staffing Cambodia | OCC",
  description:
    "Trained barista staffing for cafes, hotels, offices, and events in Phnom Penh and across Cambodia.",
  keywords:
    "barista staffing Cambodia, barista outsourcing Phnom Penh, event barista Cambodia, coffee staff placement",
  openGraph: {
    title: "Barista Staffing | OCC",
    description: "Trained hands. Consistent service. Ready when you are.",
    url: `${siteUrl}/solutions/barista-staffing`,
    type: "website",
  },
  alternates: pageAlternates("/solutions/barista-staffing"),
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do you cover events outside Phnom Penh?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, for confirmed bookings with sufficient lead time. Travel and accommodation are factored into event quotes.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if a placed barista does not meet our expectations?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer a replacement guarantee within the first 30 days of placement at no additional cost.",
      },
    },
    {
      "@type": "Question",
      name: "Can we request baristas with specific language skills?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We can match based on language requirements including English, Khmer, and Mandarin where available.",
      },
    },
  ],
}

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Barista Staffing",
  provider: {
    "@type": "Organization",
    name: "Origin Coffee Cambodia (OCC)",
    url: siteUrl,
  },
  areaServed: [
    { "@type": "City", name: "Phnom Penh" },
    { "@type": "Country", name: "Cambodia" },
  ],
  serviceType: "Barista placement and event staffing",
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

export default function BaristaStaffingPage() {
  const relatedServices = [
    { title: "Roasting Program", href: "/solutions/roasting-program", desc: "Custom roast profile development" },
    { title: "Equipment Service", href: "/solutions/equipment-service", desc: "Preventive and emergency machine support" },
    { title: "Wholesale", href: "/solutions/wholesale", desc: "Direct-origin bean supply for operations" },
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
              <span className="text-gray-900">BARISTA STAFFING</span>
            </div>
          </nav>

          <div className="relative mb-32">
            <div className="absolute -left-16 top-0 bottom-0 flex items-center">
              <div className="transform -rotate-90 whitespace-nowrap tracking-[0.3em] text-[10px] font-light text-gray-400">
                STAFFING
              </div>
            </div>
            <div className="pl-12 border-l-4 border-gray-900">
              <h1 className="text-5xl md:text-7xl tracking-tighter leading-none mb-6">
                BARISTA STAFFING
              </h1>
              <p className="text-xl text-gray-500 font-light max-w-2xl leading-relaxed">
                Trained hands. Consistent service. Ready when you are.
              </p>
            </div>
            <div className="absolute top-0 right-0 w-24 h-24 border border-dashed border-gray-300 -z-10" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-16">
              <section>
                <div className="flex items-center gap-4 border-b border-dashed border-gray-200 pb-3 mb-4">
                  <span className="text-sm text-gray-400 tracking-wider">01/</span>
                  <h2 className="text-2xl font-bold tracking-tight">The Service</h2>
                </div>
                <p className="text-gray-600 leading-relaxed pl-6 border-l border-dashed border-gray-200">
                  OCC places trained baristas in your venue on a full-time, part-time, or event basis.
                  Every staff member is trained in-house to OCC&apos;s service standard, covering espresso
                  workflow, {renderWithLinks("equipment")} handling, cleaning protocols, and guest interaction.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-4 border-b border-dashed border-gray-200 pb-3 mb-4">
                  <span className="text-sm text-gray-400 tracking-wider">02/</span>
                  <h2 className="text-2xl font-bold tracking-tight">Our Standard</h2>
                </div>
                <p className="text-gray-600 leading-relaxed pl-6 border-l border-dashed border-gray-200">
                  All {renderWithLinks("barista")} candidates undergo {renderWithLinks("SCA")}-aligned training before placement. We assess technical skill,
                  consistency under pressure, and professional conduct. Clients receive a staff profile
                  and trial period before any long-term commitment.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-4 border-b border-dashed border-gray-200 pb-3 mb-4">
                  <span className="text-sm text-gray-400 tracking-wider">03/</span>
                  <h2 className="text-2xl font-bold tracking-tight">Why OCC</h2>
                </div>
                <p className="text-gray-600 leading-relaxed pl-6 border-l border-dashed border-gray-200">
                  Hiring baristas in Cambodia&apos;s current market often means inconsistent training
                  backgrounds and high turnover. OCC staffing removes that variable - you get vetted,
                  trained, and accountable personnel backed by OCC&apos;s ongoing quality oversight and
                  regular {renderWithLinks("cupping")} calibration.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-4 border-b border-dashed border-gray-200 pb-3 mb-4">
                  <span className="text-sm text-gray-400 tracking-wider">04/</span>
                  <h2 className="text-2xl font-bold tracking-tight">Who We Work With</h2>
                </div>
                <p className="text-gray-600 leading-relaxed pl-6 border-l border-dashed border-gray-200">
                  Specialty cafes, hotel F&amp;B operations, corporate offices with in-house coffee bars,
                  event organizers, and pop-up concepts.
                </p>
              </section>
            </div>

            <aside className="bg-gray-900 text-white p-8 h-fit">
              <h3 className="text-sm tracking-wider text-gray-400 mb-6">STAFFING OPTIONS</h3>
              <div className="space-y-4">
                {[
                  "Full-time venue placement",
                  "Part-time and shift-based options",
                  "Event and pop-up baristas",
                  "SCA-aligned training standard",
                  "Replacement guarantee included",
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
                <h3 className="font-bold text-gray-900">Do you cover events outside Phnom Penh?</h3>
                <p className="text-gray-600 text-sm">
                  Yes, for confirmed bookings with sufficient lead time. Travel and accommodation are
                  factored into event quotes.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-gray-900">
                  What happens if a placed barista does not meet our expectations?
                </h3>
                <p className="text-gray-600 text-sm">
                  We offer a replacement guarantee within the first 30 days of placement at no
                  additional cost.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-gray-900">
                  Can we request baristas with specific language skills?
                </h3>
                <p className="text-gray-600 text-sm">
                  We can match based on language requirements including English, Khmer, and Mandarin
                  where available.
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
              REQUEST A QUOTE
            </Link>
          </section>
        </main>
      </div>
    </>
  )
}
