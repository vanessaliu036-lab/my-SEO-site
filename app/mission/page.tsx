// app/mission/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mission & Vision | Origins Coffee Crafter',
  description: 'Inspiring and elevating Cambodia\'s coffee culture through knowledge, craftsmanship, and education. Empowering coffee communities with exceptional roasting and training.',
  keywords: 'specialty coffee Cambodia, coffee roaster Phnom Penh, Cambodia coffee culture, coffee mission statement',
  openGraph: {
    title: 'Our Mission & Vision | Origins Coffee Crafter',
    description: 'To inspire and elevate Cambodia\'s coffee culture through knowledge, craftsmanship, and education.',
    url: 'https://occ.com/mission',
    siteName: 'Origins Coffee Crafter',
    locale: 'en_KH',
    type: 'website',
  },
  alternates: {
    canonical: 'https://occ.com/mission',
  },
}

export default function MissionPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="px-6 py-24 md:px-12 md:py-32 lg:px-24">
        <div className="max-w-4xl mx-auto">
          {/* Opening Proverbs */}
          <div className="space-y-8 mb-20">
            <p className="text-2xl md:text-3xl font-light text-gray-700 italic leading-relaxed border-l-4 border-amber-600 pl-6">
              "Settle for nothing. Answer for everything."
            </p>
            <p className="text-2xl md:text-3xl font-light text-gray-700 italic leading-relaxed border-l-4 border-amber-600 pl-6">
              "Standards are not negotiable. Excellence is not optional."
            </p>
            <p className="text-xl text-gray-600 font-medium tracking-wide">
              "This is not a philosophy we hang on the wall. It is the reason OCC exists."
            </p>
          </div>

          {/* Vision */}
          <div className="mb-20">
            <span className="text-sm tracking-[0.3em] text-amber-600 uppercase font-semibold">
              Vision
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mt-4 mb-6 leading-tight">
              To inspire and elevate Cambodia's coffee culture through knowledge, craftsmanship, and education.
            </h1>
          </div>

          {/* Mission */}
          <div className="mb-20">
            <span className="text-sm tracking-[0.3em] text-amber-600 uppercase font-semibold">
              Mission
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mt-4 mb-6 leading-tight">
              To empower Cambodia's coffee community by supplying exceptionally roasted coffee, sharing practical knowledge, and supporting partners with the tools and training they need to thrive.
            </h2>
          </div>

          {/* Why We Exist */}
          <div className="bg-gray-50 p-8 md:p-12 rounded-2xl">
            <span className="text-sm tracking-[0.3em] text-amber-600 uppercase font-semibold">
              Why We Exist
            </span>
            <p className="text-xl md:text-2xl text-gray-700 mt-4 leading-relaxed">
              Cambodia's coffee market has a problem — not with its origins, but with what happens after. Inconsistent roasts. Undertrained baristas. Suppliers who disappear after the sale. OCC was built to close that gap. Not just as a supplier, but as a partner in every cup that carries our name.
            </p>
          </div>

          {/* SEO Keywords Section (Hidden but beneficial for SEO) */}
          <div className="sr-only" aria-hidden="true">
            <p>specialty coffee supplier Cambodia | coffee roaster Phnom Penh | Cambodia coffee culture | Origins Coffee Crafter</p>
          </div>
        </div>
      </section>
    </main>
  )
}