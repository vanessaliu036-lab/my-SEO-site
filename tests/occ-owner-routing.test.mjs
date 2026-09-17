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

test('Fine Robusta Cambodia support cluster routes true supporting pages to the root owner', () => {
  assert.match(homeTemplate, /href="\/fine-robusta-cambodia"/)
  assert.match(articlePage, /const ROBUSTA_PILLAR_HREF = "\/fine-robusta-cambodia"/)
  assert.match(articlePage, /navigating-the-cambodian-coffee-market-a-guide-for-international-wholesale-buyers/)
})

test('generic Fine Robusta pillar backlink logic excludes formal Owner pages', () => {
  const condition = articlePage.match(/const showRobustaPillarLink =\s*([\s\S]*?)\n\s*const robustaPillarAnchor/)
  assert.ok(condition, 'pillar backlink condition must exist')
  assert.match(condition[1], /ROBUSTA_CLUSTER_SLUGS\.has\(post\.slug\)/)

  const cluster = articlePage.match(/const ROBUSTA_CLUSTER_SLUGS = new Set\(\[([\s\S]*?)\]\)/)
  assert.ok(cluster, 'Fine Robusta supporting cluster must exist')

  for (const ownerSlug of [
    'what-makes-fine-robusta',
    'fine-robusta-vs-arabica-buyer-guide',
    'robusta-vs-arabica-processing',
    'is-coffee-industry-undervaluing-canephora-quality',
    'mondulkiri-coffee-processing-facility',
    'roaster-checklist-buying-cambodian-green-coffee',
    'what-creates-fine-robusta-price-premium',
    'fine-robusta-consistency-vs-extra-cup-point',
    'fine-robusta-premium-espresso-milk-single-origin',
  ]) {
    assert.equal(cluster[1].includes(`"${ownerSlug}"`), false, `${ownerSlug} must not receive the generic Pillar backlink`)
  }

  const anchorPool = articlePage.match(/const ROBUSTA_PILLAR_ANCHORS = \[([\s\S]*?)\n\]/)
  assert.ok(anchorPool, 'Fine Robusta anchor pool must exist')

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

test('true support pages pass contextual authority to their formal owners', () => {
  assert.match(articleLayout, /const OWNER_ROUTE_BY_SUPPORT_SLUG/)

  const expectedSupportSlugs = [
    'fine-robusta-grading-standards-cqi-certification-for-cambodia',
    'how-fermentation-affects-coffee-quality',
    'how-to-brew-specialty-robusta-coffee',
    'arabica-vs-fine-robusta-quality-flavor-and-price',
    'fine-robusta-recipe-card-standard',
  ]

  for (const supportSlug of expectedSupportSlugs) {
    assert.match(articleLayout, new RegExp(supportSlug.replaceAll('-', '\\-')))
  }

  assert.match(articleLayout, /OWNER_ROUTE_BY_SUPPORT_SLUG\[slug\]/)
  assert.match(articleLayout, /Primary topic guide/)
  assert.doesNotMatch(articleLayout, /rel=["']nofollow["']/)
  assert.match(articlePage, /const CONTEXTUAL_OWNER_LINKS/)
})

test('formal owners are never registered as supporting pages in article templates', () => {
  const formalOwners = [
    'coffea-canephora-cambodia',
    'fine-robusta-premium-espresso-milk-single-origin',
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

  const layoutMap = articleLayout.match(/const OWNER_ROUTE_BY_SUPPORT_SLUG[\s\S]*?\n}\n/)
  assert.ok(layoutMap, 'layout support-routing map must exist')
  const contextualMap = articlePage.match(/const CONTEXTUAL_OWNER_LINKS:[\s\S]*?= \{([\s\S]*?)\n\}/)
  assert.ok(contextualMap, 'contextual support-routing map must exist')

  for (const ownerSlug of formalOwners) {
    assert.equal(layoutMap[0].includes(`"${ownerSlug}"`), false, `${ownerSlug} must not be in layout support routing`)
    assert.equal(contextualMap[1].includes(`"${ownerSlug}"`), false, `${ownerSlug} must not be in contextual support routing`)
  }
})

test('Fine Robusta wholesale support intent converges on Wholesale Owner', () => {
  assert.match(articleLayout, /"cambodian-fine-robusta-wholesale-supply"\s*:\s*OWNER_ROUTES\.wholesale/)
  assert.match(articlePage, /"cambodian-fine-robusta-wholesale-supply"[\s\S]{0,180}?href:\s*"\/solutions\/wholesale"/)
})

test('Fine Robusta pillar broad grading anchor targets the formal grading owner', () => {
  const broadAnchor = fineRobustaPillar.match(
    /<Link href="([^"]+)"[^>]*>Fine Robusta grading guide<\/Link>/,
  )

  assert.ok(broadAnchor, 'broad grading anchor must exist on the Fine Robusta pillar')
  assert.equal(broadAnchor[1], '/blog/fine-robusta-grading-verify-before-cupping')
})

test('legacy Mondulkiri owner alias permanently routes into the formal owner', () => {
  const aliasRoute = /source:\s*['"]\/mondulkiri-coffee['"][\s\S]{0,180}?destination:\s*['"]\/blog\/mondulkiri-next-specialty-coffee-origin['"][\s\S]{0,100}?(?:permanent:\s*true|statusCode:\s*301)/
  assert.match(nextConfig, aliasRoute)
  assert.match(
    proxySource,
    /["']\/mondulkiri-coffee["']\s*:\s*["']\/blog\/mondulkiri-next-specialty-coffee-origin["']/,
  )
})

test('legacy Cambodia Robusta owner alias permanently routes into the formal Robusta Cambodia owner', () => {
  const aliasRoute = /source:\s*['"]\/cambodia-robusta-coffee['"][\s\S]{0,180}?destination:\s*['"]\/blog\/cambodia-specialty-robusta-coffee-guide['"][\s\S]{0,100}?(?:permanent:\s*true|statusCode:\s*301)/
  assert.match(nextConfig, aliasRoute)
  assert.match(
    proxySource,
    /["']\/cambodia-robusta-coffee["']\s*:\s*["']\/blog\/cambodia-specialty-robusta-coffee-guide["']/,
  )
})

test('legacy Fine Robusta Buyer Guide alias permanently routes directly to the root owner', () => {
  const aliasRoute = /source:\s*['"]\/blog\/fine-robusta-cambodia-buyers-guide-to-quality-sourcing-and-wholesale-supply['"][\s\S]{0,220}?destination:\s*['"]\/fine-robusta-cambodia['"][\s\S]{0,100}?(?:permanent:\s*true|statusCode:\s*301)/
  assert.match(nextConfig, aliasRoute)
})

test('retired Single Origin is excluded from sitemap while current Origins and Fine Robusta owners remain submitted', () => {
  assert.doesNotMatch(sitemap, /`\$\{siteUrl\}\/origins\/single-origin`/)
  assert.match(sitemap, /`\$\{siteUrl\}\/origins\/cambodia-regions`/)
  assert.match(sitemap, /`\$\{siteUrl\}\/fine-robusta-cambodia`/)
})

test('legacy Standards aliases route directly to the formal Standards Owner, never Grading', () => {
  const aliases = [
    'fine-robusta-coffee-beans-quality-standards-for-b2b-procurement',
    'fine-robusta-coffee-beans-quality-standards-for-b2b-buyers',
    'the-complete-guide-to-fine-robusta-standards-cqi-quality-protocols-explained',
    'cqi-fine-robusta-standard-complete-guide',
  ]

  for (const alias of aliases) {
    const route = new RegExp(`source:\\s*['"]\\/blog\\/${alias}['"][\\s\\S]{0,220}?destination:\\s*['"]\\/blog\\/fine-robusta-standards-350g-defects['"][\\s\\S]{0,100}?(?:permanent:\\s*true|statusCode:\\s*301)`)
    assert.match(nextConfig, route)
  }

  assert.match(
    proxySource,
    /["']\/fine-robusta-standards["']\s*:\s*["']\/blog\/fine-robusta-standards-350g-defects["']/,
  )
  assert.doesNotMatch(
    proxySource,
    /["']\/fine-robusta-standards["']\s*:\s*["']\/blog\/fine-robusta-grading-verify-before-cupping["']/,
  )
})

const AIRTABLE_OWNER_CHECK_KEY =
  process.env.AIRTABLE_API_KEY || process.env.AIRTABLE_PAT || process.env.AIRTABLE_TOKEN
const AIRTABLE_OWNER_CHECK_BASE_ID = process.env.AIRTABLE_BASE_ID
const SUPPLIER_SUPPORT_SLUG =
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
  'Airtable Owner map remains the source of truth for Pillar, Standards, and Supplier families',
  { skip: !AIRTABLE_OWNER_CHECK_KEY || !AIRTABLE_OWNER_CHECK_BASE_ID },
  async () => {
    const ownerRecords = await fetchAirtableOwnerCheckRecords(
      'SEO Keyword Owners',
      'OR({Keyword}="fine robusta cambodia",{Keyword}="fine robusta standards",{Keyword}="cambodia fine robusta supplier")',
    )
    const ownerByKeyword = new Map(
      ownerRecords.map((record) => [record.fields?.Keyword, record.fields?.['Owner URL']]),
    )

    const fineRobustaOwner = ownerPathFromUrl(ownerByKeyword.get('fine robusta cambodia'))
    const standardsOwner = ownerPathFromUrl(ownerByKeyword.get('fine robusta standards'))
    const supplierOwner = ownerPathFromUrl(ownerByKeyword.get('cambodia fine robusta supplier'))

    assert.equal(fineRobustaOwner, '/fine-robusta-cambodia')
    assert.equal(standardsOwner, '/blog/fine-robusta-standards-350g-defects')
    assert.equal(supplierOwner, '/solutions/wholesale')

    const supplierRecords = await fetchAirtableOwnerCheckRecords(
      'OCC_Blog_Posts',
      `{slug}="${SUPPLIER_SUPPORT_SLUG}"`,
    )
    assert.equal(supplierRecords.length, 1, 'Supplier procurement support record must be unique')

    const content = supplierRecords[0]?.fields?.Content
    assert.equal(typeof content, 'string')
    assert.ok(
      content.includes(`[Fine Robusta Cambodia buyer guide](${fineRobustaOwner})`),
      'Procurement support must route Fine Robusta Cambodia broad intent to its formal Owner',
    )
    assert.ok(
      content.includes(`[Fine Robusta standards guide](${standardsOwner})`),
      'Procurement support must route Fine Robusta standards broad intent to its formal Owner',
    )
    assert.doesNotMatch(content, /\]\(\/fine-robusta-standards\)/)
  },
)
