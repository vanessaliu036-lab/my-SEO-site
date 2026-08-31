import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

function read(path) {
  return readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
}

const siteConfig = read('lib/siteConfig.ts')
const rootLayout = read('app/layout.tsx')
const homePage = read('app/(site)/page.tsx')
const homeContent = read('lib/homeContent.ts')
const homeTemplate = read('components/templates/home-template.tsx')
const navigation = read('components/Navigation.tsx')
const sitemap = read('app/sitemap.ts')
const blogPage = read('app/(site)/blog/page.tsx')
const blogLayout = read('app/(site)/blog/layout.tsx')
const articleLayout = read('app/(site)/blog/[slug]/layout.tsx')
const contactPage = read('app/(site)/contact/page.tsx')
const contactForm = read('app/(site)/contact/ContactForm.tsx')
const contactAction = read('app/(site)/contact/action.ts')

test('OCC keeps its current evidence-led metadata foundation', () => {
  assert.match(siteConfig, /independent coffee information and research platform/i)
  assert.doesNotMatch(rootLayout, /AdminFrontendSwitch/)
})

test('homepage remains research-led while the historical public shell is restored separately', () => {
  const publicHome = `${homePage}\n${homeContent}\n${homeTemplate}`
  assert.match(publicHome, /research/i)
})

test('public navigation restores the pre-admin OCC sections without exposing admin access', () => {
  for (const label of ['ABOUT', 'SOLUTIONS', 'COLLECTION']) assert.match(navigation, new RegExp(label))
  for (const label of ['Blog', 'Contact']) assert.match(navigation, new RegExp(label))
  assert.doesNotMatch(navigation, /\/admin|Staff Access/i)
  // Current sitemap strategy is intentionally left unchanged by this UI restore.
  assert.doesNotMatch(sitemap, /\/solutions|\/collection/)
})

test('blog index restores the verified pre-admin presentation while retaining live Airtable pagination', () => {
  assert.match(blogPage, /Field Notes &amp; Craft/)
  assert.match(blogPage, /The Signal\./)
  assert.match(blogPage, /getAllPosts/)
  assert.match(blogPage, /POSTS_PER_PAGE/)
  assert.match(blogPage, /totalPages/)
  assert.match(blogPage, /redirect/)
  assert.match(blogLayout, /"@type": "Blog"/)
})

test('article shell does not inject commercial money-pillar supplier or exporter guides', () => {
  assert.doesNotMatch(articleLayout, /MONEY_PILLARS|Related buyer guide|supplier buyer guide|exporter buyer guide/i)
})

test('contact surface remains general editorial contact', () => {
  const contact = `${contactPage}\n${contactForm}\n${contactAction}`
  assert.doesNotMatch(contact, /contactType\s*:\s*["']sales["']/i)
  assert.match(contact, /General Enquiry|Editorial Question/i)
})

test('legacy solution URLs retain their current safe redirects during the visual restore', () => {
  for (const path of [
    'app/(site)/solutions/page.tsx',
    'app/(site)/solutions/wholesale/page.tsx',
    'app/(site)/solutions/roasting-program/page.tsx',
    'app/(site)/solutions/barista-staffing/page.tsx',
    'app/(site)/solutions/equipment-service/page.tsx',
  ]) {
    const source = read(path)
    assert.match(source, /permanentRedirect\(["']\/blog["']\)/)
  }
})
