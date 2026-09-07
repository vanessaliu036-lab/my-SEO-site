import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

function read(path) {
  return readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
}

const articlePage = read('app/(site)/blog/[slug]/page.tsx')
const articleLayout = read('app/(site)/blog/[slug]/layout.tsx')
const homeTemplate = read('components/templates/home-template.tsx')

test('Cambodia broad authority still routes to the root Fine Robusta owner', () => {
  assert.match(homeTemplate, /href="\/fine-robusta-cambodia"/)
  assert.match(articlePage, /const ROBUSTA_PILLAR_HREF = "\/fine-robusta-cambodia"/)
  assert.match(articlePage, /navigating-the-cambodian-coffee-market-a-guide-for-international-wholesale-buyers/)
})

test('wrong-page Fine Robusta families pass contextual authority to their formal owners', () => {
  assert.match(articleLayout, /const OWNER_ROUTE_BY_SUPPORT_SLUG/)

  const expectedRoutes = [
    ['fine-robusta-grading-standards-cqi-certification-for-cambodia', '/blog/fine-robusta-grading-verify-before-cupping'],
    ['why-fermentation-changes-coffee-flavor', '/blog/fine-robusta-fermentation'],
    ['how-to-brew-specialty-robusta-coffee', '/blog/how-to-brew-cambodian-fine-robusta'],
    ['specialty-robusta-vs-arabica-honest-comparison', '/blog/fine-robusta-vs-arabica-buyer-guide'],
    ['why-specialty-roasters-reconsider-robusta', '/blog/why-is-fine-robusta-coffee-becoming-popular'],
  ]

  for (const [supportSlug, ownerHref] of expectedRoutes) {
    assert.match(articleLayout, new RegExp(supportSlug.replaceAll('-', '\\-')))
    assert.match(articleLayout, new RegExp(ownerHref.replaceAll('/', '\\/').replaceAll('-', '\\-')))
  }

  assert.match(articleLayout, /OWNER_ROUTE_BY_SUPPORT_SLUG\[slug\]/)
  assert.match(articleLayout, /Primary topic guide/)
  assert.doesNotMatch(articleLayout, /rel=["']nofollow["']/)
  assert.match(articlePage, /why-fermentation-changes-coffee-flavor/)
  assert.match(articlePage, /Fine Robusta fermentation guide/)
  assert.match(articlePage, /const CONTEXTUAL_OWNER_LINKS/)
})

test('formal owners are not routed down to weaker support pages', () => {
  const forbiddenOwnerKeys = [
    'fine-robusta-grading-verify-before-cupping',
    'fine-robusta-fermentation',
    'how-to-brew-cambodian-fine-robusta',
    'fine-robusta-vs-arabica-buyer-guide',
    'why-is-fine-robusta-coffee-becoming-popular',
  ]

  const mapMatch = articleLayout.match(/const OWNER_ROUTE_BY_SUPPORT_SLUG[\s\S]*?\n}\n/)
  assert.ok(mapMatch, 'owner routing map must exist')
  for (const ownerSlug of forbiddenOwnerKeys) {
    assert.doesNotMatch(mapMatch[0], new RegExp(`^[\\s]*["']?${ownerSlug}["']?\\s*:`, 'm'))
  }
})
