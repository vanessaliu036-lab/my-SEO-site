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
const blogPage = read('app/(site)/blog/page.tsx')
const blogLayout = read('app/(site)/blog/layout.tsx')
const articleLayout = read('app/(site)/blog/[slug]/layout.tsx')
const articlePage = read('app/(site)/blog/[slug]/page.tsx')
const fineRobustaOwner = read('app/(site)/fine-robusta-cambodia/page.tsx')
const contactPage = read('app/(site)/contact/page.tsx')
const contactForm = read('app/(site)/contact/ContactForm.tsx')
const contactAction = read('app/(site)/contact/action.ts')
const aboutPage = read('app/(site)/about/page.tsx')
const missionPage = read('app/(site)/about/mission/page.tsx')
const founderPage = read('app/(site)/about/founder/page.tsx')
const manifestoPage = read('app/(site)/about/manifesto/page.tsx')
const sustainabilityPage = read('app/(site)/about/sustainability/page.tsx')
const aboutEditorialTemplate = read('components/templates/about-editorial-template.tsx')
const coffeeBagVisual = read('components/ui/coffee-bag-visual.tsx')

test('OCC keeps its current evidence-led metadata foundation', () => {
  assert.match(siteConfig, /independent coffee information and research platform/i)
  assert.doesNotMatch(rootLayout, /AdminFrontendSwitch/)
})

test('homepage remains research-led while the historical public shell is restored separately', () => {
  const publicHome = `${homePage}\n${homeContent}\n${homeTemplate}`
  assert.match(publicHome, /research/i)
})

test('homepage metadata separates the organization logo from the social sharing image', () => {
  assert.match(siteConfig, /NEXT_PUBLIC_OG_IMAGE \|\| `\$\{siteUrl\}\/hero-home\.webp`/)
  assert.match(rootLayout, /images:\s*\[\{\s*url:\s*ogImage/)
  assert.doesNotMatch(rootLayout, /width:\s*180|height:\s*180/)
  assert.match(homePage, /images:\s*\[\{\s*url:\s*ogImage/)
  assert.match(homePage, /const homeTitle = "Origin Coffee Cambodia \| Fine Robusta & Mondulkiri Research"/)
  assert.match(homePage, /title:\s*seoTitle\(homeTitle\)/)
  assert.doesNotMatch(homePage, /images:\s*\[\{\s*url:\s*siteLogoUrl/)
})

test('blog social metadata uses the actual hero image dimensions', () => {
  assert.match(
    blogPage,
    /images:\s*\[\{\s*url:\s*ogImage,\s*width:\s*1672,\s*height:\s*941,\s*alt:\s*siteName\s*\}\]/,
  )
  assert.doesNotMatch(blogPage, /width:\s*180|height:\s*180/)
})

test('homepage hero uses a semantic local image instead of a CSS-only remote background', () => {
  assert.match(homeTemplate, /import Image from "next\/image"/)
  assert.match(homeTemplate, /src="\/hero-home\.webp"/)
  assert.match(homeTemplate, /alt="Origin Coffee Cambodia hero image"/)
  assert.match(homeTemplate, /\bfill\b/)
  assert.doesNotMatch(homeTemplate, /images\.unsplash\.com\/photo-1447933601403-0c6688de566e/)
  assert.doesNotMatch(homePage, /images\.unsplash\.com\/photo-1447933601403-0c6688de566e/)
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

test('About surfaces describe the same research-platform entity as the site foundation', () => {
  const aboutSurfaces = `${aboutPage}\n${missionPage}\n${founderPage}\n${manifestoPage}\n${sustainabilityPage}`
  assert.match(aboutPage, /independent coffee information and research platform/i)
  assert.match(missionPage, /research|evidence|technical editorial/i)
  assert.match(founderPage, /editorial philosophy|research philosophy|evidence/i)
  assert.match(manifestoPage, /research|evidence|technical editorial/i)
  assert.match(sustainabilityPage, /evidence|documentation|traceability claims/i)
  assert.doesNotMatch(
    aboutSurfaces,
    /specialty coffee infrastructure company|coffee supplier Cambodia|coffee roaster Phnom Penh|we pay above market|free enrollment|placement within businesses/i,
  )
})

test('About structured data does not invent a founder identity or unverified operating facts', () => {
  const aboutSurfaces = `${aboutPage}\n${missionPage}\n${founderPage}\n${manifestoPage}\n${sustainabilityPage}`
  assert.doesNotMatch(aboutPage, /foundingDate|"founder"\s*:|OCC Founder|Founder & Head Roaster/)
  assert.doesNotMatch(founderPage, /"@type": "Person"|jobTitle|OCC Founder|Founder & Head Roaster/)
  assert.doesNotMatch(
    sustainabilityPage,
    /direct trade|GPS coordinates|farm coordinates|above Fair Trade|above market rate|payment within 30 days|annual farm visits|chemical-free cultivation/i,
  )
  assert.doesNotMatch(
    aboutSurfaces,
    /complete record.*coordinates|every batch.*cupping score|full traceability from farm to cup/i,
  )
})

test('shared About shell stays research-led and avoids unsupported operating claims', () => {
  const sharedAboutShell = `${aboutEditorialTemplate}\n${navigation}`
  assert.match(sharedAboutShell, /research|evidence/i)
  assert.doesNotMatch(
    sharedAboutShell,
    /\binfrastructure\b|2020|100%|full traceability from farm to cup|professional training|barista army|partnering with cafés|specialty coffee supply chain|supply chain optimization/i,
  )
})

test('About coffee-bag visual uses an editorial context instead of presenting unverified lot claims', () => {
  assert.match(aboutEditorialTemplate, /<CoffeeBagVisual[^>]*context="editorial"/s)
  assert.match(coffeeBagVisual, /context\?:\s*"product"\s*\|\s*"editorial"/)
  assert.match(coffeeBagVisual, /Editorial Research/i)
  assert.match(coffeeBagVisual, /Cambodia Research/i)
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
