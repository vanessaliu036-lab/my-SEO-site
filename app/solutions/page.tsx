import Link from "next/link"
import { Metadata } from "next"
import { siteUrl } from "@/lib/siteConfig"

export const metadata: Metadata = {
  title: "Solutions | OCC — Wholesale, Roasting, Staffing, Equipment",
  description:
    "Coffee solutions in Cambodia: wholesale supply, custom roasting program, barista staffing, and commercial equipment service.",
  alternates: {
    canonical: `${siteUrl}/solutions`,
  },
  openGraph: {
    title: "Solutions | OCC",
    description: "Wholesale, roasting, staffing, and equipment for Cambodia's coffee industry.",
    url: `${siteUrl}/solutions`,
    type: "website",
  },
}

const services = [
  {
    href: "/solutions/wholesale",
    title: "Wholesale",
    desc: "Direct-origin beans, flexible delivery, account management.",
  },
  {
    href: "/solutions/roasting-program",
    title: "Roasting Program",
    desc: "Custom profiles, white-label, and batch consistency.",
  },
  {
    href: "/solutions/barista-staffing",
    title: "Barista Staffing",
    desc: "Trained baristas for venues, offices, and events.",
  },
  {
    href: "/solutions/equipment-service",
    title: "Equipment Service",
    desc: "Installation, maintenance, and emergency repair.",
  },
] as const

const hubSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "OCC Solutions",
  url: `${siteUrl}/solutions`,
  hasPart: services.map((s) => ({
    "@type": "WebPage",
    name: s.title,
    url: `${siteUrl}${s.href}`,
  })),
}

export default function SolutionsIndexPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hubSchema) }} />
      <div className="min-h-screen bg-white text-gray-800">
        <main className="max-w-7xl mx-auto px-8 pt-32 pb-24">
          <nav className="mb-10">
            <div className="flex items-center gap-2 text-xs tracking-wider text-gray-500">
              <Link href="/" className="hover:text-gray-900 transition-colors">
                HOME
              </Link>
              <span>/</span>
              <span className="text-gray-900">SOLUTIONS</span>
            </div>
          </nav>

          <header className="mb-16 border-l-4 border-gray-900 pl-8">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-none mb-4">SOLUTIONS</h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              Four programs built for operators who need supply, craft, people, and uptime in one ecosystem.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group block p-8 border border-dashed border-gray-300 hover:border-gray-900 transition-colors"
              >
                <h2 className="text-2xl font-bold tracking-tight mb-2 group-hover:pl-1 transition-all">{item.title}</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                <span className="inline-block mt-4 text-xs tracking-wider text-gray-400 group-hover:text-gray-900">
                  View &rarr;
                </span>
              </Link>
            ))}
          </div>

          <section className="mt-20 text-center border-t border-dashed border-gray-200 pt-12">
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
