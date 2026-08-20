import Link from "next/link"
import { Metadata } from "next"
import { siteUrl, ogImage } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Wholesale Coffee Supply Cambodia | OCC - Direct Trade Coffee Supplier",
  description: "OCC provides B2B wholesale coffee supply for cafés, hotels, and restaurants in Phnom Penh, Siem Reap, and Sihanoukville. Direct-origin beans, flexible delivery, dedicated account management. Minimum 5kg.",
  keywords: "wholesale coffee Cambodia, coffee supplier Phnom Penh, B2B coffee supply Cambodia, café coffee wholesale, restaurant coffee supplier, direct trade coffee Cambodia, OCC wholesale, Siem Reap coffee supplier",
  openGraph: {
    title: "Wholesale Coffee Supply | OCC Cambodia",
    description: "Direct-origin beans. Reliable volume. B2B supply built for Cambodia's café industry.",
    url: `${siteUrl}/solutions/wholesale`,
    type: "website",
    images: [{ url: ogImage, width: 1200, height: 630, alt: "Wholesale Coffee Supply Cambodia — OCC" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wholesale Coffee Supply | OCC Cambodia",
    description: "Direct-origin beans. Reliable volume. B2B supply built for Cambodia's café industry.",
  },
  alternates: pageAlternates("/solutions/wholesale"),
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is your minimum order quantity?",
      "acceptedAnswer": { "@type": "Answer", "text": "We start from 5kg per origin per order. Volume discounts apply from 25kg/month." }
    },
    {
      "@type": "Question",
      "name": "Do you deliver outside Phnom Penh?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. We service major provincial cities including Siem Reap and Sihanoukville on scheduled routes." }
    },
    {
      "@type": "Question",
      "name": "Can I mix origins in one order?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Multi-origin orders are welcome with no additional handling fee." }
    }
  ]
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": `${siteUrl}` },
    { "@type": "ListItem", "position": 2, "name": "Solutions", "item": `${siteUrl}/solutions` },
    { "@type": "ListItem", "position": 3, "name": "Wholesale", "item": `${siteUrl}/solutions/wholesale` },
  ],
}

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "B2B Wholesale Coffee Supply",
  description: "Direct-origin wholesale coffee supply for cafés, hotels, restaurants, and corporate offices in Cambodia. Minimum order 5kg. Weekly and bi-weekly delivery available.",
  provider: {
    "@type": "Organization",
    name: "Origin Coffee Cambodia (OCC)",
    url: siteUrl,
  },
  serviceType: "B2B Wholesale Coffee Supply",
  areaServed: [
    { "@type": "City", name: "Phnom Penh" },
    { "@type": "City", name: "Siem Reap" },
    { "@type": "City", name: "Sihanoukville" },
    { "@type": "Country", name: "Cambodia" },
  ],
  offers: {
    "@type": "Offer",
    eligibleCustomerType: "Business",
    description: "Minimum order from 5kg per origin. Volume discounts from 25kg/month. Weekly or bi-weekly delivery windows.",
  },
}

// 蝡?????銵?
const internalLinks: Record<string, string> = {
  "roasted beans": "/solutions/roasting-program",
  "roasted bean": "/solutions/roasting-program",
  "barista": "/solutions/barista-staffing",
  "equipment": "/solutions/equipment-service",
  "wholesale": "/solutions/wholesale",
  "SCA": "/about/sustainability",
  "cupping": "/coffee/single-origin",
}

// ???扳?銝剔??摮??? (Server Component ?詨捆)
const renderWithLinks = (text: string) => {
  const patterns = Object.keys(internalLinks).sort((a, b) => b.length - a.length)
  let result = text
  patterns.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi')
    result = result.replace(regex, match => `<a href="${internalLinks[keyword]}" class="border-b border-dashed border-gray-400 hover:border-gray-800 transition-colors">${match}</a>`)
  })
  return <span dangerouslySetInnerHTML={{ __html: result }} />
}

export default function WholesalePage() {
  const relatedServices = [
    { title: "Roasting Program", href: "/solutions/roasting-program", desc: "Custom roast profiles & technical training" },
    { title: "Barista Staffing", href: "/solutions/barista-staffing", desc: "Trained professionals for your team" },
    { title: "Equipment Service", href: "/solutions/equipment-service", desc: "Installation, maintenance & repair" }
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <div className="min-h-screen bg-white text-gray-800">
        {/* ???蝬脫 */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute left-[10%] top-0 bottom-0 w-px" style={{ backgroundImage: 'repeating-linear-gradient(to bottom, #e5e5e5, #e5e5e5 1px, transparent 1px, transparent 24px)' }} />
          <div className="absolute right-[15%] top-0 bottom-0 w-px" style={{ backgroundImage: 'repeating-linear-gradient(to bottom, #e5e5e5, #e5e5e5 1px, transparent 1px, transparent 24px)' }} />
          <div className="absolute left-0 right-0 top-[25%] h-px" style={{ backgroundImage: 'repeating-linear-gradient(to right, #e5e5e5, #e5e5e5 1px, transparent 1px, transparent 24px)' }} />
          <div className="absolute left-0 right-0 bottom-[20%] h-px" style={{ backgroundImage: 'repeating-linear-gradient(to right, #e5e5e5, #e5e5e5 1px, transparent 1px, transparent 24px)' }} />
        </div>

        {/* Breadcrumb 撠 */}
        <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-dashed border-gray-200">
          <div className="max-w-7xl mx-auto px-8 py-4">
            <div className="flex items-center gap-2 text-xs tracking-wider text-gray-500">
              <Link href="/" className="hover:text-gray-900 transition-colors">HOME</Link>
              <span>/</span>
              <Link href="/solutions" className="hover:text-gray-900 transition-colors">SOLUTIONS</Link>
              <span>/</span>
              <span className="text-gray-900">WHOLESALE</span>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-8 pt-16 pb-24">
          {/* ?湧??璅惜 + Hero */}
          <div className="relative mb-32">
            <div className="absolute -left-16 top-0 bottom-0 flex items-center">
              <div className="transform -rotate-90 whitespace-nowrap tracking-[0.3em] text-[10px] font-light text-gray-400">
                WHOLESALE
              </div>
            </div>
            <div className="pl-12 border-l-4 border-gray-900">
              <h1 className="text-5xl md:text-7xl tracking-tighter leading-none mb-6">
                WHOLESALE
              </h1>
              <p className="text-xl text-gray-500 font-light max-w-2xl leading-relaxed">
                Direct-origin beans. Reliable volume. Built for Cambodia's growing café industry.
              </p>
            </div>
            <div className="absolute top-0 right-0 w-24 h-24 border border-dashed border-gray-300 -z-10" />
          </div>

          {/* 銝餃摰寞蝺?- 撌血蝺刻??憛?/ ?喳瘛梯?∠? */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* 撌血?批捆? (雿?甈? */}
            <div className="lg:col-span-2 space-y-20">
              {/* 01/ Who It's For */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 border-b border-dashed border-gray-200 pb-3">
                  <span className="text-sm text-gray-400 tracking-wider">01/</span>
                  <h2 className="text-2xl font-bold tracking-tight">WHO IT'S FOR</h2>
                </div>
                <p className="text-gray-600 leading-relaxed pl-6 border-l border-dashed border-gray-200">
                  B2B wholesale supply for cafés, hotels, restaurants, co-working spaces, and corporate offices in Phnom Penh, Siem Reap, Sihanoukville, and across Cambodia.
                  Whether you're running a single-outlet café or a multi-location group, OCC structures supply around your volume and schedule.
                </p>
              </div>

              {/* 02/ What You Get */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 border-b border-dashed border-gray-200 pb-3">
                  <span className="text-sm text-gray-400 tracking-wider">02/</span>
                  <h2 className="text-2xl font-bold tracking-tight">WHAT YOU GET</h2>
                </div>
                <p className="text-gray-600 leading-relaxed pl-6 border-l border-dashed border-gray-200">
                  Green beans sourced directly from Cambodian farms and regional origins. 
                  {renderWithLinks(" roasted beans ")}to order or supplied green for in-house roasting. 
                  Flexible contract terms with fixed weekly or bi-weekly delivery windows.
                </p>
              </div>

              {/* 03/ Why OCC */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 border-b border-dashed border-gray-200 pb-3">
                  <span className="text-sm text-gray-400 tracking-wider">03/</span>
                  <h2 className="text-2xl font-bold tracking-tight">WHY OCC</h2>
                </div>
                <p className="text-gray-600 leading-relaxed pl-6 border-l border-dashed border-gray-200">
                  Most {renderWithLinks("wholesale")} suppliers in Cambodia operate on inconsistent roast schedules and limited origin transparency.
                  OCC operates differently - every batch is traceable, every delivery is documented, and every account has a dedicated point of contact.
                  No middlemen. No guesswork. Our {renderWithLinks("equipment")} partners ensure your brewing setup matches your coffee quality.
                </p>
              </div>

              {/* 04/ Who We Work With */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 border-b border-dashed border-gray-200 pb-3">
                  <span className="text-sm text-gray-400 tracking-wider">04/</span>
                  <h2 className="text-2xl font-bold tracking-tight">WHO WE WORK WITH</h2>
                </div>
                <div className="pl-6 border-l border-dashed border-gray-200">
                  <div className="flex flex-wrap gap-3">
                    {["Specialty cafés", "Boutique hotels", "Restaurant groups", "Corporate offices", "Coworking spaces", "Event caterers"].map((item, i) => (
                      <span key={i} className="text-sm text-gray-600 bg-gray-50 px-3 py-1">{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ?喳瘛梯?∠? */}
            <div className="bg-gray-900 text-white p-8 h-fit">
              <h3 className="text-sm tracking-wider text-gray-400 mb-6">SUPPLY TERMS</h3>
              <div className="space-y-4">
                {[
                  "Minimum order from 5kg per origin",
                  "Weekly or bi-weekly delivery",
                  "Green & roasted bean options",
                  "Dedicated account manager",
                  "Origin documentation provided"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-gray-300">
                    <span className="text-gray-500">&rarr;</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ ?憛?*/}
          <section className="mt-24 pt-12 border-t border-dashed border-gray-200">
            <h2 className="text-sm tracking-[0.3em] font-light text-gray-400 uppercase mb-12">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <h3 className="font-bold text-gray-900">What is your minimum order quantity?</h3>
                <p className="text-gray-600 text-sm">We start from 5kg per origin per order. Volume discounts apply from 25kg/month.</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-gray-900">Do you deliver outside Phnom Penh?</h3>
                <p className="text-gray-600 text-sm">Yes. We service major provincial cities including Siem Reap and Sihanoukville on scheduled routes.</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-gray-900">Can I mix origins in one order?</h3>
                <p className="text-gray-600 text-sm">Yes. Multi-origin orders are welcome with no additional handling fee.</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-gray-900">Do you provide {renderWithLinks("cupping")} sessions?</h3>
                <p className="text-gray-600 text-sm">Yes. We offer regular cupping sessions for wholesale partners to evaluate new arrivals and seasonal lots.</p>
              </div>
            </div>
          </section>

          {/* Related Services 摨?∠? */}
          <section className="mt-24">
            <h2 className="text-sm tracking-[0.3em] font-light text-gray-400 uppercase mb-8">You may also need</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((service, idx) => (
                <Link key={idx} href={service.href} className="group block p-6 border border-dashed border-gray-300 hover:border-gray-800 transition-all hover:-translate-y-1">
                  <h3 className="text-xl font-bold tracking-tight mb-2 group-hover:pl-2 transition-all">{service.title}</h3>
                  <p className="text-sm text-gray-500">{service.desc}</p>
                  <span className="inline-block mt-4 text-xs tracking-wider text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all">&rarr;</span>
                </Link>
              ))}
            </div>
          </section>

          {/* CTA ?憛?*/}
          <section className="mt-24 pt-12 border-t border-dashed border-gray-200 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6">Ready to scale your coffee program?</h2>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-gray-900 text-white px-8 py-4 text-sm tracking-wider hover:bg-gray-800 transition-colors group">
              <span>TALK TO OUR TEAM</span>
            </Link>
          </section>
        </main>
      </div>
    </>
  )
}





