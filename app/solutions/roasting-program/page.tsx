import Link from "next/link"
import { Metadata } from "next"
import { siteUrl } from "@/lib/siteConfig"

export const metadata: Metadata = {
  title: "Custom Roasting Program Cambodia | OCC",
  description:
    "Custom roast profile development for white-label brands, house blends, and single-origin signatures in Cambodia.",
  keywords:
    "custom roasting Cambodia, white label coffee Cambodia, house blend development, roast profile development",
  openGraph: {
    title: "Custom Roasting Program | OCC",
    description:
      "Your profile. Your brand. Roasted with precision.",
    url: `${siteUrl}/solutions/roasting-program`,
    type: "website",
  },
  alternates: {
    canonical: `${siteUrl}/solutions/roasting-program`,
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can I use my own packaging?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We support client-supplied packaging or can coordinate design and print through our partners.",
      },
    },
    {
      "@type": "Question",
      name: "How long does profile development take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Typically 2-3 weeks from first sample roast to production approval.",
      },
    },
    {
      "@type": "Question",
      name: "What is the minimum production batch?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Minimum production batch is 10kg per profile.",
      },
    },
  ],
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

export default function RoastingProgramPage() {
  const relatedServices = [
    { title: "Barista Staffing", href: "/solutions/barista-staffing", desc: "Trained baristas for venues and events" },
    { title: "Equipment Service", href: "/solutions/equipment-service", desc: "Installation, preventive care, and repairs" },
    { title: "Wholesale", href: "/solutions/wholesale", desc: "Origin-led coffee supply for operations" },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-white text-gray-800">
        <main className="max-w-7xl mx-auto px-8 pt-16 pb-24">
          <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-dashed border-gray-200 -mx-8 px-8 py-4 mb-12">
            <div className="flex items-center gap-2 text-xs tracking-wider text-gray-500">
              <Link href="/" className="hover:text-gray-900 transition-colors">HOME</Link>
              <span>/</span>
              <Link href="/solutions" className="hover:text-gray-900 transition-colors">SOLUTIONS</Link>
              <span>/</span>
              <span className="text-gray-900">ROASTING PROGRAM</span>
            </div>
          </nav>

          <div className="relative mb-32">
            <div className="absolute -left-16 top-0 bottom-0 flex items-center">
              <div className="transform -rotate-90 whitespace-nowrap tracking-[0.3em] text-[10px] font-light text-gray-400">
                ROASTING
              </div>
            </div>
            <div className="pl-12 border-l-4 border-gray-900">
              <h1 className="text-5xl md:text-7xl tracking-tighter leading-none mb-6">
                ROASTING PROGRAM
              </h1>
              <p className="text-xl text-gray-500 font-light max-w-2xl leading-relaxed">
                Your profile. Your brand. Roasted with precision.
              </p>
            </div>
            <div className="absolute top-0 right-0 w-24 h-24 border border-dashed border-gray-300 -z-10" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-16">
              <section>
                <div className="flex items-center gap-4 border-b border-dashed border-gray-200 pb-3 mb-4">
                  <span className="text-sm text-gray-400 tracking-wider">01/</span>
                  <h2 className="text-2xl font-bold tracking-tight">The Program</h2>
                </div>
                <p className="text-gray-600 leading-relaxed pl-6 border-l border-dashed border-gray-200">
                  OCC&apos;s custom roasting program is designed for businesses that want their
                  own coffee identity - white-label brands, house blends, or single-origin
                  signatures. We develop, test, and lock roast profiles to your exact specification
                  for {renderWithLinks("roasted beans")} programs.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-4 border-b border-dashed border-gray-200 pb-3 mb-4">
                  <span className="text-sm text-gray-400 tracking-wider">02/</span>
                  <h2 className="text-2xl font-bold tracking-tight">The Process</h2>
                </div>
                <p className="text-gray-600 leading-relaxed pl-6 border-l border-dashed border-gray-200">
                  Sample roast to {renderWithLinks("cupping")} session to profile refinement to production approval to
                  ongoing batch production. Every profile is documented and stored. Every batch is
                  cupped before release.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-4 border-b border-dashed border-gray-200 pb-3 mb-4">
                  <span className="text-sm text-gray-400 tracking-wider">03/</span>
                  <h2 className="text-2xl font-bold tracking-tight">Why OCC</h2>
                </div>
                <p className="text-gray-600 leading-relaxed pl-6 border-l border-dashed border-gray-200">
                  Generic roasters produce generic results. OCC treats each client&apos;s profile
                  as a technical asset - reproducible, consistent, and tied to measurable cup
                  quality. We use {renderWithLinks("SCA")} cupping protocols as the baseline for every profile
                  evaluation.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-4 border-b border-dashed border-gray-200 pb-3 mb-4">
                  <span className="text-sm text-gray-400 tracking-wider">04/</span>
                  <h2 className="text-2xl font-bold tracking-tight">Who We Work With</h2>
                </div>
                <p className="text-gray-600 leading-relaxed pl-6 border-l border-dashed border-gray-200">
                  Cafe owners launching house blends, hotels building F&amp;B identity, importers
                  seeking Cambodia-origin white-label, and retail brands entering the specialty
                  segment, often alongside {renderWithLinks("barista")} and {renderWithLinks("equipment")} support.
                </p>
              </section>
            </div>

            <aside className="bg-gray-900 text-white p-8 h-fit">
              <h3 className="text-sm tracking-wider text-gray-400 mb-6">PROGRAM INCLUDES</h3>
              <div className="space-y-4">
                {[
                  "Custom roast profile development",
                  "White-label packaging available",
                  "SCA-standard cupping sessions",
                  "Batch consistency guarantee",
                  "Profile documentation and storage",
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
                <h3 className="font-bold text-gray-900">Can I use my own packaging?</h3>
                <p className="text-gray-600 text-sm">
                  Yes. We support client-supplied packaging or can coordinate design and print
                  through our partners.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-gray-900">How long does profile development take?</h3>
                <p className="text-gray-600 text-sm">
                  Typically 2-3 weeks from first sample roast to production approval.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-gray-900">What is the minimum production batch?</h3>
                <p className="text-gray-600 text-sm">Minimum production batch is 10kg per profile.</p>
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
