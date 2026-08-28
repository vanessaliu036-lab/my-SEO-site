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
