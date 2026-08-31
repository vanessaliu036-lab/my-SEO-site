import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const nextConfig = readFileSync(new URL('../next.config.mjs', import.meta.url), 'utf8')
const proxy = readFileSync(new URL('../proxy.ts', import.meta.url), 'utf8')

const liveEditorialSlugs = [
  'why-coffee-competitions-are-paying-attention-to-robusta',
  'indigenous-farmers-and-specialty-coffee-the-bunong-model-in-cambodia',
  'shade-grown-coffee-how-forest-canopy-changes-whats-in-your-cup',
  'terroir-in-coffee-what-the-concept-actually-means-and-why-cambodia-is-relevant',
]

test('live OCC sitemap articles are not captured by legacy redirect rules', () => {
  for (const slug of liveEditorialSlugs) {
    assert.doesNotMatch(nextConfig, new RegExp(`['\"]${slug}['\"]`))
    assert.doesNotMatch(proxy, new RegExp(`['\"]/blog/${slug}['\"]\\s*:`))
  }
})

test('legacy blog URL governance never emits explicit 404 responses', () => {
  assert.doesNotMatch(proxy, /status:\s*404\b/)
  assert.match(proxy, /NextResponse\.redirect\(url,\s*301\)/)
})

test('known legacy 404s have deliberate migration handling', () => {
  for (const slug of [
    'the-occ-advantage-why-our-coffee-meets-cambodia-s-toughest-procurement-standards',
    'partnering-with-cambodian-coffee-roasters-a-guide-to-building-strong-b2b-relationships',
    'cambodias-fine-robusta-journey-a-case-study-in-quality-transformation',
    'qualify-cambodia-robusta-exporter',
    'how-a-mondulkiri-honey-process-batch-won-a-2027-eu-direct-trade-contract',
    'cambodia-robusta-supplier-audit-checklist',
    'what-makes-fine-robusta-different-from-farm-to-cup-long-form',
    'what-is-fine-robusta-the-complete-guide-to-the-future-of-specialty-coffee',
    'cambodia-specialty-coffee-wholesale-buyer-checklist',
    'specialty-robusta-vs-arabica-honest-comparison',
    'cambodia-robusta-buyer-due-diligence',
  ]) {
    assert.match(proxy, new RegExp(`['\"]/blog/${slug}['\"]\\s*:`))
  }
  assert.match(proxy, /corporate-coffee-gift-ideas-2025/)
  assert.match(proxy, /status:\s*410/)
})

const ownerRecoveryRedirects = {
  '/blog/mondulkiri-coffee-processing-facility': '/blog/mondulkiri-fine-robusta-processing-capacity',
  '/blog/is-coffee-industry-undervaluing-canephora-quality': '/blog/why-robusta-was-underestimated-and-why-cambodia-can-benefit-from-the-shift',
  '/blog/why-fermentation-changes-coffee-flavor': '/blog/fermented-flavor-cambodia-robusta',
  '/blog/why-specialty-roasters-reconsider-robusta': '/blog/how-specialty-roasters-use-fine-robusta-differently',
  '/blog/robusta-vs-arabica-processing': '/blog/cambodia-robusta-processing-methods-washed-natural-and-honey',
  '/blog/why-consumers-think-robusta-cheap': '/blog/why-robusta-was-underestimated-and-why-cambodia-can-benefit-from-the-shift',
  '/blog/experimental-processing-does-not-mean-better-coffee': '/blog/how-processing-consistency-affects-cambodia-robusta-quality',
  '/blog/what-makes-mondulkiri-valuable-international-roasters': '/blog/cambodia-robusta-for-roasters-flavor-body-processing-and-fit',
  '/blog/coffee-cofermentation-infusion-inoculation-disclosure': '/blog/cambodia-robusta-fermentation-control',
  '/blog/why-fine-robusta-matters-more-espresso': '/blog/fine-robusta-espresso-recipe',
  '/fine-robusta-cambodia': '/blog/cambodia-specialty-robusta-coffee-guide',
  '/blog/different-not-better-robusta-positioning': '/blog/why-cambodia-robusta-should-be-marketed-as-an-origin-not-a-substitute',
  '/blog/what-creates-fine-robusta-price-premium': '/blog/fine-robusta-price-premiums',
  '/blog/beyond-arabica-why-fine-robusta-deserves-a-place-in-your-specialty-coffee-portfolio-in-phnom-penh-internal-dup-ci50': '/blog/beyond-arabica-why-fine-robusta-deserves-a-place-in-your-specialty-coffee-portfolio-in-phnom-penh-internal-dup-unes',
  '/blog/fine-robusta-own-specialty-category': '/blog/what-makes-fine-robusta',
  '/blog/100-percent-fine-robusta-espresso': '/blog/single-origin-cambodian-robusta-espresso',
  '/blog/good-coffee-cherries-need-processing': '/blog/processing-and-drying-where-cambodian-fine-robusta-quality-is-won-or-lost',
  '/blog/why-traceability-matters-new-coffee-origin': '/blog/why-traceable-robusta-is-becoming-more-valuable-to-buyers',
  '/blog/fine-robusta-premium-espresso-milk-single-origin': '/blog/fine-robusta-milk-based-coffee',
  '/blog/drying-capacity-limits-coffee-growth': '/blog/cambodia-robusta-drying-protocols',
  '/blog/the-economic-advantages-of-fine-robusta-cost-benefit-analysis-for-cambodian-coffee-businesses': '/blog/the-roi-of-quality-why-investing-in-premium-specialty-coffee-pays-off-for-cambodian-hotels-restaurants',
  '/blog/fine-robusta-consistency-vs-extra-cup-point': '/blog/why-repeatable-quality-matters-more-than-one-high-scoring-sample',
  '/blog/fine-robusta-processing-transparency': '/blog/how-cambodia-robusta-can-differentiate-through-processing',
  '/blog/what-happens-peak-harvest-coffee-processing': '/blog/cambodian-coffee-harvest-planning',
  // A current owner record was 200 but noindex; send it to the live indexable origin page.
  '/blog/mondulkiri-next-specialty-coffee-origin': '/blog/mondulkiri-coffee-climate',
  // A current owner record was canonicalized to the wrong intent; use the dedicated comparison page.
  '/blog/specialty-robusta-vs-arabica-honest-comparison': '/blog/fine-robusta-vs-arabica-buyer-guide',
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

test('SEO keyword owner URLs have explicit permanent recovery redirects', () => {
  for (const [source, destination] of Object.entries(ownerRecoveryRedirects)) {
    const pattern = new RegExp(
      `${escapeRegExp(source)}['"]\\s*:\\s*['"]${escapeRegExp(destination)}['"]`
    )
    assert.match(proxy, pattern, `${source} must permanently redirect to ${destination}`)
  }
})
