import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

function read(path) {
  return readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
}

const articlePage = read('app/(site)/blog/[slug]/page.tsx')
const articleLayout = read('app/(site)/blog/[slug]/layout.tsx')
const homeTemplate = read('components/templates/home-template.tsx')
const nextConfig = read('next.config.mjs')
const proxySource = read('proxy.ts')
const sitemap = read('app/sitemap.ts')
const fineRobustaPillar = read('app/(site)/fine-robusta-cambodia/page.tsx')

test('Fine Robusta Cambodia support cluster routes to the root Fine Robusta owner', () => {
  assert.match(homeTemplate, /href="\/fine-robusta-cambodia"/)
  assert.match(articlePage, /const ROBUSTA_PILLAR_HREF = "\/fine-robusta-cambodia"/)
  assert.match(articlePage, /navigating-the-cambodian-coffee-market-a-guide-for-international-wholesale-buyers/)
})

test('Robusta Cambodia formal owner is excluded from Fine Robusta pillar backlink logic', () => {
  const condition = articlePage.match(/const showRobustaPillarLink =\s*([\s\S]*?)\n\s*const robustaPillarAnchor/)
  assert.ok(condition, 'pillar backlink condition must exist')
  assert.match(condition[1], /ROBUSTA_CLUSTER_SLUGS\.has\(post\.slug\)/)
  assert.doesNotMatch(condition[1], /post\.slug === ROBUSTA_PILLAR_SLUG/)

  const anchorPool = articlePage.match(/const ROBUSTA_PILLAR_ANCHORS = \[([\s\S]*?)\n\]/)
  assert.ok(anchorPool, 'Fine Robusta anchor pool must exist')

  for (const forbidden of [
    'Robusta Cambodia',
    'Cambodia Robusta guide',
    'Cambodian Robusta',
    'Cambodia Robusta sourcing guide',
  ]) {
    assert.doesNotMatch(anchorPool[1], new RegExp(`"${forbidden}"`))
  }

  for (const approved of [
    'Fine Robusta Cambodia guide',
    'Fine Robusta from Cambodia',
    'Cambodia Fine Robusta quality guide',
    'Fine Robusta sourcing in Cambodia',
    'Cambodia Fine Robusta buyer guide',
  ]) {
    assert.match(anchorPool[1], new RegExp(`"${approved}"`))
  }
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

test('Fine Robusta pillar broad grading anchor targets the formal grading owner', () => {
  const broadAnchor = fineRobustaPillar.match(
    /<Link href="([^"]+)"[^>]*>Fine Robusta grading guide<\/Link>/,
  )

  assert.ok(broadAnchor, 'broad grading anchor must exist on the Fine Robusta pillar')
  assert.equal(broadAnchor[1], '/blog/fine-robusta-grading-verify-before-cupping')
})

test('2026-09-09 declining owner families receive targeted contextual support routes', () => {
  const expectedRoutes = [
    ['fine-robusta-own-specialty-category', '/blog/is-coffee-industry-undervaluing-canephora-quality'],
    ['what-creates-fine-robusta-price-premium', '/blog/the-economic-advantages-of-fine-robusta-cost-benefit-analysis-for-cambodian-coffee-businesses'],
    ['fine-robusta-recipe-card-standard', '/blog/fine-robusta-consistency-vs-extra-cup-point'],
  ]

  for (const [supportSlug, ownerHref] of expectedRoutes) {
    assert.match(articleLayout, new RegExp(supportSlug.replaceAll('-', '\\-')))
    assert.match(articleLayout, new RegExp(ownerHref.replaceAll('/', '\\/').replaceAll('-', '\\-')))
  }
})

test('formal owners are not routed down to weaker support pages', () => {
  const forbiddenOwnerKeys = [
    'cambodia-specialty-robusta-coffee-guide',
    'fine-robusta-grading-verify-before-cupping',
    'fine-robusta-fermentation',
    'how-to-brew-cambodian-fine-robusta',
    'fine-robusta-vs-arabica-buyer-guide',
    'why-is-fine-robusta-coffee-becoming-popular',
    'is-coffee-industry-undervaluing-canephora-quality',
    'the-economic-advantages-of-fine-robusta-cost-benefit-analysis-for-cambodian-coffee-businesses',
    'fine-robusta-consistency-vs-extra-cup-point',
  ]

  const mapMatch = articleLayout.match(/const OWNER_ROUTE_BY_SUPPORT_SLUG[\s\S]*?\n}\n/)
  assert.ok(mapMatch, 'owner routing map must exist')
  for (const ownerSlug of forbiddenOwnerKeys) {
    assert.doesNotMatch(mapMatch[0], new RegExp(`^[\\s]*["']?${ownerSlug}["']?\\s*:`, 'm'))
  }
})

test('legacy Mondulkiri owner alias permanently routes into the formal owner', () => {
  const aliasRoute = /source:\s*['"]\/mondulkiri-coffee['"][\s\S]{0,180}?destination:\s*['"]\/blog\/mondulkiri-next-specialty-coffee-origin['"][\s\S]{0,100}?(?:permanent:\s*true|statusCode:\s*301)/
  assert.match(nextConfig, aliasRoute)
  assert.doesNotMatch(nextConfig, /source:\s*['"]\/blog\/mondulkiri-next-specialty-coffee-origin['"][\s\S]{0,180}?destination:\s*['"]\/mondulkiri-coffee\/?['"]/)
})

test('legacy Mondulkiri alias is also intercepted by edge proxy before stale cached 404s', () => {
  assert.match(
    proxySource,
    /["']\/mondulkiri-coffee["']\s*:\s*["']\/blog\/mondulkiri-next-specialty-coffee-origin["']/,
  )
  assert.match(proxySource, /NextResponse\.redirect\(url, 301\)/)
})

test('legacy Cambodia Robusta owner alias permanently routes into the formal Robusta Cambodia owner', () => {
  const aliasRoute = /source:\s*['"]\/cambodia-robusta-coffee['"][\s\S]{0,180}?destination:\s*['"]\/blog\/cambodia-specialty-robusta-coffee-guide['"][\s\S]{0,100}?(?:permanent:\s*true|statusCode:\s*301)/
  assert.match(nextConfig, aliasRoute)
  assert.doesNotMatch(nextConfig, /source:\s*['"]\/blog\/cambodia-specialty-robusta-coffee-guide['"][\s\S]{0,180}?destination:\s*['"]\/cambodia-robusta-coffee\/?['"]/)
})

test('legacy Cambodia Robusta alias is also intercepted by edge proxy before stale cached 404s', () => {
  assert.match(
    proxySource,
    /["']\/cambodia-robusta-coffee["']\s*:\s*["']\/blog\/cambodia-specialty-robusta-coffee-guide["']/,
  )
  assert.match(proxySource, /NextResponse\.redirect\(url, 301\)/)
})

test('legacy Fine Robusta Buyer Guide alias permanently routes directly to the root owner', () => {
  const aliasRoute = /source:\s*['"]\/blog\/fine-robusta-cambodia-buyers-guide-to-quality-sourcing-and-wholesale-supply['"][\s\S]{0,220}?destination:\s*['"]\/fine-robusta-cambodia['"][\s\S]{0,100}?(?:permanent:\s*true|statusCode:\s*301)/
  assert.match(nextConfig, aliasRoute)
  assert.doesNotMatch(nextConfig, /source:\s*['"]\/blog\/fine-robusta-cambodia-buyers-guide-to-quality-sourcing-and-wholesale-supply['"][\s\S]{0,220}?destination:\s*['"]\/blog\/cambodian-fine-robusta-wholesale-supply['"]/)
})

test('retired Single Origin is excluded from sitemap while current Origins and Fine Robusta owners remain submitted', () => {
  assert.doesNotMatch(sitemap, /`\$\{siteUrl\}\/origins\/single-origin`/)
  assert.match(sitemap, /`\$\{siteUrl\}\/origins\/cambodia-regions`/)
  assert.match(sitemap, /`\$\{siteUrl\}\/fine-robusta-cambodia`/)
})

test('legacy CQI aliases route directly to the formal grading owner', () => {
  const aliases = [
    'fine-robusta-coffee-beans-quality-standards-for-b2b-procurement',
    'fine-robusta-coffee-beans-quality-standards-for-b2b-buyers',
    'the-complete-guide-to-fine-robusta-standards-cqi-quality-protocols-explained',
    'cqi-fine-robusta-standard-complete-guide',
  ]

  for (const alias of aliases) {
    const route = new RegExp(`source:\\s*['"]\\/blog\\/${alias}['"][\\s\\S]{0,220}?destination:\\s*['"]\\/blog\\/fine-robusta-grading-verify-before-cupping['"][\\s\\S]{0,100}?(?:permanent:\\s*true|statusCode:\\s*301)`)
    assert.match(nextConfig, route)
  }
})

const AIRTABLE_OWNER_CHECK_KEY =
  process.env.AIRTABLE_API_KEY || process.env.AIRTABLE_PAT || process.env.AIRTABLE_TOKEN
const AIRTABLE_OWNER_CHECK_BASE_ID = process.env.AIRTABLE_BASE_ID
const SUPPLIER_OWNER_SLUG =
  'evaluating-cambodian-coffee-suppliers-a-procurement-manager-s-guide-to-quality-and-traceability'

async function fetchAirtableOwnerCheckRecords(tableName, formula) {
  const url = new URL(
    `https://api.airtable.com/v0/${AIRTABLE_OWNER_CHECK_BASE_ID}/${encodeURIComponent(tableName)}`,
  )
  url.searchParams.set('filterByFormula', formula)

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${AIRTABLE_OWNER_CHECK_KEY}` },
    cache: 'no-store',
  })

  assert.equal(
    response.ok,
    true,
    `Airtable owner regression read failed for ${tableName}: ${response.status} ${response.statusText}`,
  )

  const payload = await response.json()
  return Array.isArray(payload.records) ? payload.records : []
}

function ownerPathFromUrl(ownerUrl) {
  assert.equal(typeof ownerUrl, 'string')
  const pathname = new URL(ownerUrl).pathname.replace(/\/+$/, '')
  return pathname || '/'
}

test(
  'Supplier Owner broad anchors match the canonical Airtable Owner map',
  { skip: !AIRTABLE_OWNER_CHECK_KEY || !AIRTABLE_OWNER_CHECK_BASE_ID },
  async () => {
    const ownerRecords = await fetchAirtableOwnerCheckRecords(
      'SEO Keyword Owners',
      'OR({Keyword}="fine robusta cambodia",{Keyword}="fine robusta standards")',
    )
    const ownerByKeyword = new Map(
      ownerRecords.map((record) => [record.fields?.Keyword, record.fields?.['Owner URL']]),
    )

    const fineRobustaOwner = ownerPathFromUrl(ownerByKeyword.get('fine robusta cambodia'))
    const standardsOwner = ownerPathFromUrl(ownerByKeyword.get('fine robusta standards'))

    assert.equal(fineRobustaOwner, '/fine-robusta-cambodia')
    assert.equal(standardsOwner, '/blog/fine-robusta-standards-350g-defects')

    const supplierRecords = await fetchAirtableOwnerCheckRecords(
      'OCC_Blog_Posts',
      `{slug}="${SUPPLIER_OWNER_SLUG}"`,
    )
    assert.equal(supplierRecords.length, 1, 'Supplier Owner record must be unique')

    const content = supplierRecords[0]?.fields?.Content
    assert.equal(typeof content, 'string')
    assert.ok(
      content.includes(`[Fine Robusta Cambodia buyer guide](${fineRobustaOwner})`),
      'Supplier Owner must route the Fine Robusta Cambodia broad anchor to its formal Owner',
    )
    assert.ok(
      content.includes(`[Fine Robusta standards guide](${standardsOwner})`),
      'Supplier Owner must route the Fine Robusta standards broad anchor to its formal Owner',
    )
    assert.doesNotMatch(
      content,
      /\/blog\/what-is-fine-robusta-coffee-a-complete-beginners-guide/,
    )
    assert.doesNotMatch(content, /\]\(\/fine-robusta-standards\)/)
  },
)
