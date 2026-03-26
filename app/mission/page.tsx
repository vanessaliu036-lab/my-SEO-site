// app/about/mission/page.tsx
import type { Metadata } from 'next';

// ============================================
// SEO & GEO Metadata
// ============================================
export const metadata: Metadata = {
  title: 'OCC — Mission: Vision, Mission, and Why We Exist',
  description:
    'OCC exists to empower Cambodia\'s coffee community through exceptional roasting, knowledge, and training. Learn our vision, mission, and purpose.',
  alternates: {
    canonical: '/about/mission',
  },
  openGraph: {
    title: 'OCC — Mission: Vision, Mission, and Why We Exist',
    description:
      'OCC exists to empower Cambodia\'s coffee community through exceptional roasting, knowledge, and training.',
    url: 'https://www.occ.com/about/mission',
    siteName: 'OCC Coffee',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OCC — Mission: Vision, Mission, and Why We Exist',
    description:
      'OCC exists to empower Cambodia\'s coffee community through exceptional roasting, knowledge, and training.',
  },
  keywords:
    'specialty coffee supplier Cambodia, coffee roaster Phnom Penh, Cambodia coffee culture, OCC coffee, coffee mission',
};

// ============================================
// JSON-LD Structured Data
// ============================================
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'OCC Coffee',
      url: 'https://www.occ.com',
      logo: 'https://www.occ.com/logo.png',
      sameAs: ['https://www.instagram.com/occ', 'https://www.facebook.com/occ'],
      description:
        'Specialty coffee roaster based in Phnom Penh, Cambodia. Empowering Cambodia\'s coffee community through knowledge, craftsmanship, and education.',
    },
    {
      '@type': 'AboutPage',
      name: 'Mission — Vision, Mission, and Why We Exist',
      url: 'https://www.occ.com/about/mission',
      isPartOf: {
        '@type': 'WebSite',
        name: 'OCC Coffee',
        url: 'https://www.occ.com',
      },
      mainEntity: {
        '@type': 'Organization',
        name: 'OCC Coffee',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.occ.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'About',
          item: 'https://www.occ.com/about',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Mission',
          item: 'https://www.occ.com/about/mission',
        },
      ],
    },
  ],
};

// ============================================
// Page Component
// ============================================
export default function MissionPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="relative bg-white">
        {/* 導航回退 (預留) - absolute top-8 left-8 */}
        <div className="absolute top-8 left-8 z-10">
          {/* 導航組件可在此插入 */}
        </div>

        <div className="max-w-6xl mx-auto pt-32 pb-24 px-6">
          {/* ============================================
              章節標題模組 (The Authority Header)
              ============================================ */}
          <div className="border-b border-gray-300 pb-12 mb-24">
            <span className="text-gray-500 tracking-widest text-xs uppercase mb-4 block">
              About / 01
            </span>
            <h1 className="text-5xl font-bold text-gray-900 tracking-tighter">
              MISSION
            </h1>
            <p className="text-gray-600 text-sm tracking-wide mt-4">
              VISION, MISSION, AND WHY WE EXIST.
            </p>
          </div>

          {/* ============================================
              引言區塊 - 使用 border-l-4 強調權威
              ============================================ */}
          <div className="border-l-4 border-gray-900 pl-8 mb-24">
            <p className="text-gray-700 text-xl italic mb-6 leading-relaxed">
              “Settle for nothing. Answer for everything.”
            </p>
            <p className="text-gray-700 text-xl italic mb-6 leading-relaxed">
              “Standards are not negotiable. Excellence is not optional.”
            </p>
            <p className="text-gray-900 font-semibold text-lg mt-8 tracking-tight">
              This is not a philosophy we hang on the wall. It is the reason OCC exists.
            </p>
          </div>

          {/* ============================================
              非對稱網格區塊
              左側 (col-span-5): 理論/問題描述
              右側 (col-span-7): 解決方案/實體內容
              ============================================ */}

          {/* Vision - 非對稱網格 */}
          <div className="grid grid-cols-12 gap-x-12 gap-y-8 mb-24">
            <div className="col-span-12 md:col-span-5">
              <div className="relative inline-block">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight border-l-4 border-gray-900 pl-4">
                  Vision
                </h2>
                {/* 幾何重疊裝飾 */}
                <div className="absolute -top-2 -right-6 w-8 h-8 border border-gray-200 -z-10"></div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-7">
              <p className="text-gray-600 text-base leading-relaxed">
                To inspire and elevate Cambodia's coffee culture through
                knowledge, craftsmanship, and education.
              </p>
            </div>
          </div>

          {/* Mission - 非對稱網格 */}
          <div className="grid grid-cols-12 gap-x-12 gap-y-8 mb-24">
            <div className="col-span-12 md:col-span-5">
              <div className="relative inline-block">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight border-l-4 border-gray-900 pl-4">
                  Mission
                </h2>
                <div className="absolute -top-2 -right-6 w-8 h-8 border border-gray-200 -z-10"></div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-7">
              <p className="text-gray-600 text-base leading-relaxed">
                To empower Cambodia's coffee community by supplying exceptionally
                roasted coffee, sharing practical knowledge, and supporting
                partners with the tools and training they need to thrive.
              </p>
            </div>
          </div>

          {/* Why We Exist - 非對稱網格 */}
          <div className="grid grid-cols-12 gap-x-12 gap-y-8 mb-24">
            <div className="col-span-12 md:col-span-5">
              <div className="relative inline-block">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight border-l-4 border-gray-900 pl-4">
                  Why We Exist
                </h2>
                <div className="absolute -top-2 -right-6 w-8 h-8 border border-gray-200 -z-10"></div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-7">
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                Cambodia's coffee market has a problem — not with its origins, but
                with what happens after. Inconsistent roasts. Undertrained
                baristas. Suppliers who disappear after the sale.
              </p>
              <p className="text-gray-900 font-medium text-base leading-relaxed">
                OCC was built to close that gap. Not just as a supplier, but as a
                partner in every cup that carries our name.
              </p>
            </div>
          </div>

          {/* ============================================
              技術規格卡片 (Technical Grid)
              SEO 關鍵詞展示區
              ============================================ */}
          <div className="mt-32 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                'Specialty Coffee Supplier Cambodia',
                'Coffee Roaster Phnom Penh',
                'Cambodia Coffee Culture',
                'Ethical Sourcing',
                'Barista Training',
              ].map((item) => (
                <div
                  key={item}
                  className="border border-gray-300 p-4 text-[10px] font-bold tracking-widest uppercase text-gray-500 hover:text-gray-900 hover:border-gray-900 transition-all duration-300 text-center flex items-center justify-center min-h-[80px] group"
                >
                  <span className="group-hover:pl-1 transition-all duration-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ============================================
              強調內容塊 (The Solution Box)
              幾何重疊裝飾 + 交互反饋
              ============================================ */}
          <section className="relative mt-32 bg-white p-12 shadow-sm border border-gray-100 group hover:bg-gray-50 transition-colors duration-300">
            {/* 幾何重疊裝飾 */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border border-gray-300 -z-10"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 border border-gray-200 -z-10"></div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight italic">
              The Partner Protocol
            </h2>
            <p className="text-gray-600 text-sm leading-loose max-w-2xl">
              We don't just supply coffee. We supply certainty. Every bag, every
              roast, every interaction follows a single principle:{' '}
              <span className="text-gray-900 font-bold underline">
                consistency is not optional
              </span>
              . From farm to cup, from training to after-sales support — we
              answer for everything.
            </p>

            {/* 交互反饋裝飾 */}
            <div className="mt-8 pt-4 border-t border-gray-200 group-hover:border-gray-400 transition-colors duration-300">
              <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 group-hover:text-gray-600 transition-colors duration-300">
                OCC — Zero-Compromise Coffee Infrastructure
              </span>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}