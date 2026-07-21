/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // SEO cleanup 2026-07-21:
  // 30 deleted blog posts (Airtable purge Apr–May 2026) returning 404 in GSC.
  // 301 → /blog so any external backlinks still pass SEO signal and visitors land on the hub.
  // 2 _next/static/media/*.woff2 404s are build-hash churn — ignored (Google re-crawls after next deploy).
  async redirects() {
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
      'the-rise-of-fine-robusta-a-game-changer-for-wholesale-coffee-buyers-in-cambodia',
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
    return dead.map((slug) => ({
      source: `/blog/${slug}`,
      destination: '/blog',
      permanent: true,
    }))
  },
}

export default nextConfig
