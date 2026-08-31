import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const proxySource = fs.readFileSync(path.join(here, '..', 'proxy.ts'), 'utf8')

const FORMAL_OWNER_PATHS = [
  '/blog/specialty-robusta-vs-arabica-honest-comparison',
  '/blog/mondulkiri-coffee-processing-facility',
  '/blog/is-coffee-industry-undervaluing-canephora-quality',
  '/blog/why-fermentation-changes-coffee-flavor',
  '/blog/why-specialty-roasters-reconsider-robusta',
  '/blog/robusta-vs-arabica-processing',
  '/blog/why-consumers-think-robusta-cheap',
  '/blog/experimental-processing-does-not-mean-better-coffee',
  '/blog/what-makes-mondulkiri-valuable-international-roasters',
  '/blog/coffee-cofermentation-infusion-inoculation-disclosure',
  '/blog/why-fine-robusta-matters-more-espresso',
  '/fine-robusta-cambodia',
  '/blog/different-not-better-robusta-positioning',
  '/blog/what-creates-fine-robusta-price-premium',
  '/blog/beyond-arabica-why-fine-robusta-deserves-a-place-in-your-specialty-coffee-portfolio-in-phnom-penh-internal-dup-ci50',
  '/blog/fine-robusta-own-specialty-category',
  '/blog/100-percent-fine-robusta-espresso',
  '/blog/good-coffee-cherries-need-processing',
  '/blog/why-traceability-matters-new-coffee-origin',
  '/blog/fine-robusta-premium-espresso-milk-single-origin',
  '/blog/drying-capacity-limits-coffee-growth',
  '/blog/the-economic-advantages-of-fine-robusta-cost-benefit-analysis-for-cambodian-coffee-businesses',
  '/blog/fine-robusta-consistency-vs-extra-cup-point',
  '/blog/fine-robusta-processing-transparency',
  '/blog/what-happens-peak-harvest-coffee-processing',
  '/blog/mondulkiri-next-specialty-coffee-origin',
]

test('formal keyword-owner URLs are never redirect sources or retired paths', () => {
  for (const route of FORMAL_OWNER_PATHS) {
    const escaped = route.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    assert.doesNotMatch(
      proxySource,
      new RegExp(`["']${escaped}["']\\s*:`),
      `${route} must not be a redirect source`,
    )
    assert.doesNotMatch(
      proxySource,
      new RegExp(`["']${escaped}["']\\s*,`),
      `${route} must not be a retired/410 route`,
    )
  }
})
