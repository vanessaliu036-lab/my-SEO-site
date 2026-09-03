/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // Security headers are intentionally defined at the framework layer so every
  // HTML route receives the same policy on Vercel. The CSP allows only the
  // analytics providers currently used by the site (Google Analytics + Clarity).
  async headers() {
    const contentSecurityPolicy = [
      "default-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms",
      "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://*.google-analytics.com https://www.clarity.ms https://*.clarity.ms https://vitals.vercel-insights.com",
      "img-src 'self' data: blob: https:",
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self' data:",
      "upgrade-insecure-requests",
    ].join('; ')

    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: contentSecurityPolicy },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },

  // Permanent redirects preserve legacy backlinks while the public information
  // architecture is reduced to ABOUT / SOLUTIONS / COLLECTION / BLOG / CONTACT.
  // Historical deleted-blog redirects remain intact below.
  async redirects() {
    const structural = [
      { source: '/coffee', destination: '/collection', permanent: true },
      { source: '/coffee/single-origin', destination: '/collection', permanent: true },
      { source: '/vision', destination: '/about', permanent: true },
      { source: '/system', destination: '/about', permanent: true },
      { source: '/signal', destination: '/blog', permanent: true },
      { source: '/matter', destination: '/blog', permanent: true },
      { source: '/archive', destination: '/blog', permanent: true },
      {
        source: '/blog/fine-robusta-cambodia-buyers-guide-to-quality-sourcing-and-wholesale-supply',
        destination: '/blog/cambodian-fine-robusta-wholesale-supply',
        statusCode: 301,
      },
      {
        source: '/blog/cambodia-specialty-coffee-market-supply-side-dynamics-and-export-capacity',
        destination: '/blog/cambodia-specialty-coffee-market-supply-side-dynamics-export-capacity',
        permanent: true,
      },
      {
        source: '/blog/the-rise-of-fine-robusta-a-game-changer-for-wholesale-coffee-buyers-in-cambodia',
        destination: '/blog/what-is-fine-robusta-coffee-a-complete-beginners-guide',
        permanent: true,
      },
      {
        source: '/blog/cambodia-specialty-coffee-wholesale-buyer-checklist-draft-save-test',
        destination: '/blog/cambodia-specialty-coffee-wholesale-buyer-checklist',
        permanent: true,
      },
      {
        source: '/blog/fine-robusta-coffee-beans-quality-standards-for-b2b-procurement',
        destination: '/blog/fine-robusta-grading-standards-cqi-certification-for-cambodia',
        permanent: true,
      },
      {
        source: '/blog/fine-robusta-coffee-beans-quality-standards-for-b2b-buyers',
        destination: '/blog/fine-robusta-grading-standards-cqi-certification-for-cambodia',
        permanent: true,
      },
      {
        source: '/blog/the-complete-guide-to-fine-robusta-standards-cqi-quality-protocols-explained',
        destination: '/blog/fine-robusta-grading-standards-cqi-certification-for-cambodia',
        permanent: true,
      },
      {
        source: '/blog/cqi-fine-robusta-standard-complete-guide',
        destination: '/blog/fine-robusta-grading-standards-cqi-certification-for-cambodia',
        permanent: true,
      },
    ]
    const dead = [
      'the-coffee-industrys-robusta-reckoning-trends-shaping-the-next-decade',
      'unique-gifts-from-southeast-asia-7-ideas-that-go-beyond-the-ordinary',
      'the-best-coffee-beans-to-bring-home-from-asia-a-country-by-country-guide',
      'why-coffee-competitions-are-paying-attention-to-robusta',
      'indigenous-farmers-and-specialty-coffee-the-bunong-model-in-cambodia',
      'sustainable-coffee-brands-in-asia-worth-supporting-the-2025-guide',
      'third-wave-coffees-new-frontier-in-2025-the-origins-you-should-be-watching',
      'roasting-high-altitude-robusta-profile-development-for-cambodian-beans',
      'cambodia-travel-gift-guide-2025-the-best-take-home-items-right-now',
      'cambodia-business-travel-gifts-what-to-bring-back-for-the-office',
      'wet-processed-vs-natural-robusta-what-the-science-says-about-flavor',
      'cambodias-coffee-culture-ancient-land-new-brew-revolution',
      'phnom-penhs-best-coffee-shops-and-where-to-buy-coffee-souvenirs',
      'cambodias-coffee-export-industry-challenges-opportunities-and-the-occ-model',
      'high-altitude-robusta-vs-commercial-robusta-a-technical-breakdown',
      'the-best-luxury-gift-boxes-from-cambodia-a-curated-guide-for-discerning-givers',
      'the-best-gifts-to-bring-elderly-parents-from-cambodia-that-theyll-actually-love',
      'angkor-wat-must-buy-souvenirs-beyond-the-temple-replicas',
      'how-to-shop-ethically-in-cambodia-a-guide-to-supporting-real-communities',
      'shade-grown-coffee-how-forest-canopy-changes-whats-in-your-cup',
      'rethinking-robusta-in-espresso-the-case-for-high-altitude-single-origin',
      'specialty-coffee-sourcing-in-emerging-markets-why-cambodia-belongs-on-your-radar',
      'what-to-buy-in-cambodia-souvenir-guide',
      'the-best-coffee-gifts-for-travel-lovers-origins-that-tell-a-story',
      'the-premium-robusta-flavor-revolution-why-everything-you-knew-was-wrong',
      'how-specialty-pricing-changes-farmer-economics-the-math-behind-occs-model',
      'what-does-specialty-grade-robusta-actually-mean-a-buyers-guide',
      'terroir-in-coffee-what-the-concept-actually-means-and-why-cambodia-is-relevant',
      'is-cambodian-coffee-good-an-honest-assessment',
    ]
    return [
      ...structural,
      ...dead.map((slug) => ({
        source: `/blog/${slug}`,
        destination: '/blog',
        permanent: true,
      })),
    ]
  },
}

export default nextConfig
