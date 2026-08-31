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
const navigation = read('components/site/navigation-data.ts')
const sitemap = read('app/sitemap.ts')
const blogPage = read('app/(site)/blog/page.tsx')
const blogLayout = read('app/(site)/blog/layout.tsx')
const articleLayout = read('app/(site)/blog/[slug]/layout.tsx')
const contactPage = read('app/(site)/contact/page.tsx')
const contactForm = read('app/(site)/contact/ContactForm.tsx')
const contactAction = read('app/(site)/contact/action.ts')

test('OCC identifies itself as an independent information and research platform', () => {
  assert.match(siteConfig, /independent coffee information and research platform/i)
  assert.doesNotMatch(siteConfig, /B2B coffee supplier/i)
  assert.doesNotMatch(rootLayout, /contactType\s*:\s*["']sales["']/i)
  assert.doesNotMatch(rootLayout, /Cambodia Coffee Supplier|Wholesale Coffee Beans Cambodia|Specialty Coffee B2B/i)
})

test('homepage is editorial and research-led rather than a wholesale acquisition page', () => {
  const publicHome = `${homePage}\n${homeContent}\n${homeTemplate}`
  assert.doesNotMatch(publicHome, /B2B coffee company|Explore Wholesale|commercial pathways|connect quality-focused Cambodian canephora with buyers/i)
  assert.doesNotMatch(homePage, /Cambodia Coffee Supplier|Wholesale Coffee Beans Cambodia|Specialty Coffee B2B/i)
  assert.match(publicHome, /research/i)
})

test('commercial solutions and product collection are removed from navigation and sitemap', () => {
  assert.doesNotMatch(navigation, /SOLUTIONS|COLLECTION|\/solutions|\/collection/)
  assert.doesNotMatch(sitemap, /\/solutions|\/collection/)
})

test('blog index uses research and standards language rather than buyer acquisition language', () => {
  const blogSurface = `${blogPage}\n${blogLayout}`
  assert.doesNotMatch(blogSurface, /buyer education|specialty coffee sourcing|Research · Buyers · Origins/i)
  assert.match(blogSurface, /research/i)
  assert.match(blogSurface, /standards/i)
})

test('article shell does not inject commercial money-pillar supplier or exporter guides', () => {
  assert.doesNotMatch(articleLayout, /MONEY_PILLARS|Related buyer guide|supplier buyer guide|exporter buyer guide/i)
})

test('contact surface is general editorial contact, not a sales-service lead form', () => {
  const contact = `${contactPage}\n${contactForm}\n${contactAction}`
  assert.doesNotMatch(contact, /contactType\s*:\s*["']sales["']|Wholesale|Roasting Program|Barista Staffing|Equipment Service/i)
  assert.match(contact, /General Enquiry|Editorial Question/i)
})

test('legacy solution URLs permanently redirect to the research journal', () => {
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

test('restored collection pages stay excluded from research navigation and sitemap', () => {
  assert.doesNotMatch(navigation, /COLLECTION|\/collection/)
  assert.doesNotMatch(sitemap, /\/collection/)
})
