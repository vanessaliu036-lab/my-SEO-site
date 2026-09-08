import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

function read(path) {
  return readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
}

const articlePage = read('app/(site)/blog/[slug]/page.tsx')
const articleLayout = read('app/(site)/blog/[slug]/layout.tsx')
const homeTemplate = read('components/templates/home-template.tsx')
const wholesalePage = read('app/(site)/solutions/wholesale/page.tsx')

test('known wrong-page families route broad intent to the Fine Robusta Cambodia owner', () => {
  const expectedSupportSlugs = [
    'sensory-evaluation-of-fine-robusta-flavour-aroma-body-and-beyond',
    'what-makes-coffee-origin-feel-premium',
    'how-to-brew-fine-robusta-a-complete-guide-to-unlocking-bold-flavors',
    'fine-robusta-premium-espresso-milk-single-origin',
    'what-is-specialty-robusta-coffee-complete-guide',
    'coffea-canephora-cambodia',
    'uganda-fine-robusta-an-emerging-origin',
    'is-cambodian-coffee-grown-in-cambodia',
  ]

  for (const slug of expectedSupportSlugs) {
    assert.match(articleLayout, new RegExp(slug.replaceAll('-', '\\-')))
  }

  assert.match(articleLayout, /href: "\/fine-robusta-cambodia"/)
})

test('legacy pages use narrow display titles so they do not compete with broad owners', () => {
  assert.match(articlePage, /const ARTICLE_TITLE_OVERRIDES/)
  assert.match(articlePage, /Fine Robusta Brew Variables: Ratio, Temperature & Extraction/)
  assert.match(articlePage, /Sensory Evaluation of Fine Robusta: Flavor, Aroma & Body/)
  assert.match(articlePage, /Specialty Robusta: Category Definitions and Evaluation Context/)
  assert.match(articlePage, /Choosing Coffee by Use: When Arabica or Fine Robusta Fits/)
})

test('homepage and wholesale page give the Cambodia Fine Robusta pillar an explicit broad-intent link', () => {
  assert.match(homeTemplate, /href="\/fine-robusta-cambodia"/)
  assert.match(homeTemplate, /Coffea canephora Cambodia/)
  assert.match(wholesalePage, /"Fine Robusta Cambodia": "\/fine-robusta-cambodia"/)
  assert.match(wholesalePage, /Fine Robusta Cambodia/)
})
