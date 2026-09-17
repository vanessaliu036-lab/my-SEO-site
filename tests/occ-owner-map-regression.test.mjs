import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

function read(path) {
  return readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
}

const proxy = read('proxy.ts')
const nextConfig = read('next.config.mjs')
const articleLayout = read('app/(site)/blog/[slug]/layout.tsx')
const articlePage = read('app/(site)/blog/[slug]/page.tsx')
const homeTemplate = read('components/templates/home-template.tsx')

const STANDARDS_OWNER = '/blog/fine-robusta-standards-350g-defects'
const GRADING_OWNER = '/blog/fine-robusta-grading-verify-before-cupping'
const WHOLESALE_OWNER = '/solutions/wholesale'

const standardsLegacyAliases = [
  '/blog/fine-robusta-coffee-beans-quality-standards-for-b2b-procurement',
  '/blog/fine-robusta-coffee-beans-quality-standards-for-b2b-buyers',
  '/blog/the-complete-guide-to-fine-robusta-standards-cqi-quality-protocols-explained',
  '/blog/cqi-fine-robusta-standard-complete-guide',
]

function assertRoute(sourceText, source, destination) {
  const sourcePattern = source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const destinationPattern = destination.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  assert.match(
    sourceText,
    new RegExp(`${sourcePattern}[\\s\\S]{0,260}${destinationPattern}`),
    `${source} must route to ${destination}`,
  )
}

test('legacy Fine Robusta standards aliases converge on the formal Standards Owner', () => {
  assertRoute(proxy, '/fine-robusta-standards', STANDARDS_OWNER)
  assert.doesNotMatch(
    proxy,
    new RegExp(`/fine-robusta-standards[\\s\\S]{0,180}${GRADING_OWNER.replaceAll('/', '\\/')}`),
  )

  for (const alias of standardsLegacyAliases) {
    assertRoute(nextConfig, alias, STANDARDS_OWNER)
  }
})

test('homepage is entity-led and hands broad commercial / Fine Robusta intent to the registered owners', () => {
  assert.match(homeTemplate, /<h1[^>]*>\s*Origin Coffee Cambodia\s*<\/h1>/)
  assert.doesNotMatch(homeTemplate, /<h1[^>]*>[\s\S]{0,240}Fine Robusta & Specialty Coffee from Cambodia[\s\S]{0,80}<\/h1>/)
  assert.match(homeTemplate, /href="\/fine-robusta-cambodia"/)
  assert.match(homeTemplate, /href="\/solutions\/wholesale"/)
})

test('generic template routing never treats a formal Owner as supporting content', () => {
  const formalOwnerSlugs = [
    'fine-robusta-premium-espresso-milk-single-origin',
    'coffea-canephora-cambodia',
    'why-fermentation-changes-coffee-flavor',
    'specialty-robusta-vs-arabica-honest-comparison',
    'why-specialty-roasters-reconsider-robusta',
    'fine-robusta-own-specialty-category',
    'what-creates-fine-robusta-price-premium',
    'what-makes-fine-robusta',
    'fine-robusta-vs-arabica-buyer-guide',
    'robusta-vs-arabica-processing',
    'is-coffee-industry-undervaluing-canephora-quality',
    'mondulkiri-coffee-processing-facility',
    'roaster-checklist-buying-cambodian-green-coffee',
    'fine-robusta-consistency-vs-extra-cup-point',
  ]

  const layoutSupportMap = articleLayout.match(/const OWNER_ROUTE_BY_SUPPORT_SLUG:[\s\S]*?= \{([\s\S]*?)\n\}/)
  assert.ok(layoutSupportMap, 'support-to-owner routing map must exist')

  const clusterSet = articlePage.match(/const ROBUSTA_CLUSTER_SLUGS = new Set\(\[([\s\S]*?)\]\)/)
  assert.ok(clusterSet, 'generic Fine Robusta support cluster must exist')

  const contextualMap = articlePage.match(/const CONTEXTUAL_OWNER_LINKS:[\s\S]*?= \{([\s\S]*?)\n\}/)
  assert.ok(contextualMap, 'contextual owner link map must exist')

  for (const slug of formalOwnerSlugs) {
    assert.equal(layoutSupportMap[1].includes(`"${slug}"`), false, `${slug} must not be in generic layout support routing`)
    assert.equal(clusterSet[1].includes(`"${slug}"`), false, `${slug} must not receive the generic Pillar backlink`)
    assert.equal(contextualMap[1].includes(`"${slug}"`), false, `${slug} must not receive an automatic cross-owner contextual link`)
  }
})

test('Fine Robusta wholesale support intent converges on Wholesale Owner', () => {
  assert.match(
    articleLayout,
    /"cambodian-fine-robusta-wholesale-supply"\s*:\s*OWNER_ROUTES\.wholesale/,
  )
  assert.match(articleLayout, new RegExp(`href:\\s*["']${WHOLESALE_OWNER.replaceAll('/', '\\/')}["']`))
  assert.match(
    articlePage,
    /"cambodian-fine-robusta-wholesale-supply"[\s\S]{0,220}href:\s*"\/solutions\/wholesale"/,
  )
})
