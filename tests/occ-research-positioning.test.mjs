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
const navigationData = read('components/site/navigation-data.ts')
const sitemap = read('app/sitemap.ts')
const nextConfig = read('next.config.mjs')
const singleOriginPage = read('app/(site)/coffee/single-origin/page.tsx')
const legacyCollectionPage = read('app/(site)/collection/page.tsx')
const blogPage = read('app/(site)/blog/page.tsx')
const blogLayout = read('app/(site)/blog/layout.tsx')
const articleLayout = read('app/(site)/blog/[slug]/layout.tsx')
const articlePage = read('app/(site)/blog/[slug]/page.tsx')
const fineRobustaOwner = read('app/(site)/fine-robusta-cambodia/page.tsx')
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

test('homepage metadata separates the organization logo from the social sharing image', () => {
  assert.match(siteConfig, /socialImage:\s*`\$\{siteUrl\}\/hero-home\.webp`/)
  assert.match(rootLayout, /images:\s*\[siteConfig\.socialImage\]/)
  assert.match(homePage, /images:\s*\[\{\s*url:\s*siteConfig\.socialImage/)
  assert.match(homePage, /title:\s*"Origin Coffee Cambodia \| Fine Robusta & Mondulkiri Research"/)
  assert.doesNotMatch(homePage, /images:\s*\[\{\s*url:\s*siteConfig\.logo/)
})

test('homepage hero uses a semantic local image instead of a CSS-only remote background', () => {
  assert.match(homeTemplate, /import Image from "next\/image"/)
  assert.match(homeTemplate, /src="\/hero-home\.webp"/)
  assert.match(homeTemplate, /alt="Mondulkiri coffee landscape in Cambodia"/)
  assert.match(homeTemplate, /\bfill\b/)
  assert.doesNotMatch(homeTemplate, /images\.unsplash\.com\/photo-1447933601403-0c6688de566e/)
})

test('public navigation uses SINGLE ORIGIN without exposing admin access', () => {
  assert.match(navigation, /SINGLE ORIGIN/)
  assert.match(navigation, /href="\/coffee\/single-origin"/)
  assert.match(navigationData, /label: "SINGLE ORIGIN"/)
  assert.match(navigationData, /href: "\/coffee\/single-origin"/)
  for (const label of ['ABOUT', 'SOLUTIONS']) assert.match(navigation, new RegExp(label))
  for (const label of ['Blog', 'Contact']) assert.match(navigation, new RegExp(label))
  assert.doesNotMatch(navigation, /\/admin|Staff Access/i)
})

test('sitemap emits strategic routes while preserving the Airtable blog corpus expansion', () => {
  for (const path of [
    '/coffee/single-origin',
    '/collection/sovann',
    '/collection/prek',
    '/collection/angkar',
    '/solutions',
    '/solutions/wholesale',
    '/solutions/roasting-program',
    '/solutions/barista-staffing',
    '/solutions/equipment-service',
  ]) {
    assert.match(sitemap, new RegExp(path.replaceAll('/', '\\/')))
  }
  assert.doesNotMatch(sitemap, /\$\{siteUrl\}\/collection`/)
  assert.match(sitemap, /const posts = await getAllPosts\(\)/)
  assert.match(sitemap, /\.\.\.blogEntries/)
})

test('single-origin is the canonical structural destination without a redirect chain', () => {
  assert.match(nextConfig, /source: '\/collection', destination: '\/coffee\/single-origin'/)
  assert.match(nextConfig, /source: '\/coffee', destination: '\/coffee\/single-origin'/)
  assert.doesNotMatch(nextConfig, /source: '\/coffee\/single-origin', destination:/)
})

test('single-origin owns its page implementation instead of depending on the legacy collection route', () => {
  assert.doesNotMatch(singleOriginPage, /from "\.\.\/\.\.\/collection\/page"/)
  assert.match(singleOriginPage, /Mondulkiri Origin Collection/)
  assert.match(legacyCollectionPage, /from "\.\.\/coffee\/single-origin\/page"/)
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

test('Fine Robusta Cambodia keeps one root owner and cluster authority points to it', () => {
  assert.match(fineRobustaOwner, /const ownerPath = "\/fine-robusta-cambodia"/)
  assert.match(fineRobustaOwner, /pageAlternates\("\/fine-robusta-cambodia"\)/)
  assert.match(sitemap, /\/fine-robusta-cambodia/)
  assert.match(articlePage, /const ROBUSTA_PILLAR_HREF = "\/fine-robusta-cambodia"/)
  assert.match(articlePage, /ROBUSTA_CLUSTER_SLUGS\.has\(post\.slug\) \|\| post\.slug === ROBUSTA_PILLAR_SLUG/)
  assert.doesNotMatch(articlePage, /const ROBUSTA_PILLAR_HREF = `\/blog\/\$\{ROBUSTA_PILLAR_SLUG\}`/)
})

test('article shell does not inject commercial money-pillar supplier or exporter guides', () => {
  assert.doesNotMatch(articleLayout, /MONEY_PILLARS|Related buyer guide|supplier buyer guide|exporter buyer guide/i)
})

test('contact surface remains general editorial contact', () => {
  const contact = `${contactPage}\n${contactForm}\n${contactAction}`
  assert.doesNotMatch(contact, /contactType\s*:\s*["']sales["']/i)
  assert.match(contact, /General Enquiry|Editorial Question/i)
})

// Solutions is now a real published section (see "repair: restore full repository
// tree after isolated Solutions restore"), not a redirect-to-blog stub. This test
// asserted the earlier stub-era policy and is stale; skipped rather than rewritten
// since the current Solutions section's intended content is out of scope here.
test.skip('legacy solution URLs retain their current safe redirects during the visual restore', () => {
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
