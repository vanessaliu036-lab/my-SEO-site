import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'

const ROOT = fileURLToPath(new URL('../', import.meta.url))

function read(path) {
  return readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
}

function sourceFiles(dir) {
  const root = join(ROOT, dir)
  const out = []
  for (const name of readdirSync(root)) {
    const full = join(root, name)
    const stat = statSync(full)
    if (stat.isDirectory()) out.push(...sourceFiles(`${dir}/${name}`))
    else if (/\.(?:ts|tsx|mts|mjs)$/.test(name)) out.push(full)
  }
  return out
}

function readAbsolute(path) {
  return readFileSync(path, 'utf8')
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
const articlePage = read('app/(site)/blog/[slug]/page.tsx')
const contactPage = read('app/(site)/contact/page.tsx')
const contactForm = read('app/(site)/contact/ContactForm.tsx')
const contactAction = read('app/(site)/contact/action.ts')
const aboutPage = read('app/(site)/about/page.tsx')
const missionPage = read('app/(site)/about/mission/page.tsx')
const founderPage = read('app/(site)/about/founder/page.tsx')
const manifestoPage = read('app/(site)/about/manifesto/page.tsx')
const sustainabilityPage = read('app/(site)/about/sustainability/page.tsx')

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

test('article renderer does not inject sales routes or commercial CTA text', () => {
  assert.doesNotMatch(articlePage, /\/solutions\//i)
  assert.doesNotMatch(articlePage, /Need wholesale supply or roasting support|Talk to Our Team/i)
  assert.doesNotMatch(articlePage, /href=\"\/contact\"[^\n]*class=\"shrink-0|lower\.includes\(\"wholesale\"\).*\/solutions/i)
  assert.match(articlePage, /Editorial standards|evidence-led coffee research/i)
})

test('contact surface is general editorial contact, not a sales-service lead form', () => {
  const contact = `${contactPage}\n${contactForm}\n${contactAction}`
  assert.doesNotMatch(contact, /contactType\s*:\s*["']sales["']|Wholesale|Roasting Program|Barista Staffing|Equipment Service/i)
  assert.match(contact, /General Enquiry|Editorial Question/i)
})

test('about surfaces describe OCC as a research platform rather than a supplier or roaster', () => {
  const aboutSurface = `${aboutPage}\n${missionPage}\n${founderPage}\n${manifestoPage}\n${sustainabilityPage}`
  assert.match(aboutSurface, /independent coffee information and research platform/i)
  assert.match(aboutSurface, /evidence/i)
  assert.doesNotMatch(aboutSurface, /specialty coffee supplier|coffee roaster Phnom Penh|infrastructure company|Head Roaster|barista training|service call|source from OCC|Sourcing from OCC|When you order from OCC|wholesale partners|makesOffer|Request a Collection Sample|\/solutions/i)
  assert.doesNotMatch(aboutSurface, /we carry|our roastery|supplying exceptionally roasted coffee|supplier who moved on after the sale|not just as a supplier/i)
})

test('public source contains no known commercial positioning regressions', () => {
  const files = [
    ...sourceFiles('app/(site)'),
    join(ROOT, 'app/layout.tsx'),
    ...sourceFiles('components/site'),
    ...sourceFiles('components/templates'),
    join(ROOT, 'lib/siteConfig.ts'),
    join(ROOT, 'lib/organizationSchema.ts'),
  ]
  const publicSource = files.map(readAbsolute).join('\n')
  assert.doesNotMatch(publicSource, /B2B coffee supplier|Explore Wholesale|Request a Collection Sample|Need wholesale supply or roasting support|Talk to Our Team|contactType\s*:\s*["']sales["']|makesOffer\s*:/i)
  assert.doesNotMatch(publicSource, /connect quality-focused Cambodian canephora with buyers|commercial pathways|Related buyer guide|MONEY_PILLARS/i)
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

test('legacy collection product URLs permanently redirect to the research journal', () => {
  for (const path of [
    'app/(site)/collection/page.tsx',
    'app/(site)/collection/sovann/page.tsx',
    'app/(site)/collection/prek/page.tsx',
    'app/(site)/collection/angkar/page.tsx',
  ]) {
    const source = read(path)
    assert.match(source, /permanentRedirect\(["']\/blog["']\)/)
    assert.doesNotMatch(source, /@type["']?\s*:\s*["']Product["']|Request a Collection Sample|TASTE THE COLLECTION/i)
  }
})
