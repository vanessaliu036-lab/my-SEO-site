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
const cambodiaRegions = read('app/(site)/origins/cambodia-regions/page.tsx')
const cambodiaRegionsStatic = read('public/occ-pages/cambodia-regions.html')

test('Fine Robusta Cambodia support cluster routes to the root Fine Robusta owner', () => {
  assert.match(homeTemplate, /href="\/fine-robusta-cambodia"/)
  assert.match(articlePage, /const ROBUSTA_PILLAR_HREF = "\/fine-robusta-cambodia"/)
  assert.match(articlePage, /navigating-the-cambodian-coffee-market-a-guide-for-international-wholesale-buyers/)
})

test('Fine Robusta support backlink logic is semantic, owner-safe, and anchor-controlled', () => {
  const condition = articlePage.match(/const showRobustaPillarLink =\s*([\s\S]*?)\n\s*const robustaPillarAnchor/)
  assert.ok(condition, 'pillar backlink condition must exist')
  assert.match(condition[1], /shouldLinkToRobustaPillar\(post\.slug\)/)

  assert.match(articlePage, /const ROBUSTA_SUPPORT_SLUG_PATTERN/)
  for (const family of [
    'fine-robusta',
    'specialty-robusta',
    'cambodian-',
    'cambodia-',
    'mondulkiri',
    'canephora',
  ]) {
    assert.match(articlePage, new RegExp(family))
  }

  const excludedOwners = articlePage.match(/const ROBUSTA_PILLAR_EXCLUDED_SLUGS = new Set\(\[([\s\S]*?)\n\]\)/)
  assert.ok(excludedOwners, 'formal owner exclusion set must exist')
  for (const ownerSlug of [
    'fine-robusta-grading-verify-before-cupping',
    'fine-robusta-fermentation',
    'how-to-brew-cambodian-fine-robusta',
    'fine-robusta-vs-arabica-buyer-guide',
    'why-is-fine-robusta-coffee-becoming-popular',
    'is-coffee-industry-undervaluing-canephora-quality',
    'fine-robusta-consistency-vs-extra-cup-point',
  ]) {
    assert.match(excludedOwners[1], new RegExp(ownerSlug.replaceAll('-', '\\-')))
  }

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


test('Fine Robusta pillar exposes five specialist owner routes', () => {
  const owners = [
    '/blog/fine-robusta-grading-verify-before-cupping',
    '/blog/fine-robusta-fermentation',
    '/blog/how-to-brew-cambodian-fine-robusta',
    '/blog/evaluating-cambodian-coffee-suppliers-a-procurement-manager-s-guide-to-quality-and-traceability',
    '/blog/mondulkiri-next-specialty-coffee-origin',
  ]

  assert.match(fineRobustaPillar, /Fine Robusta knowledge map/)
  assert.match(fineRobustaPillar, /Explore the five core Fine Robusta topics/)
  for (const href of owners) {
    assert.match(fineRobustaPillar, new RegExp(href.replaceAll('/', '\\/').replaceAll('-', '\\-')))
  }
})

test('five specialist owners link back to the Fine Robusta pillar', () => {
  const owners = [
    'fine-robusta-grading-verify-before-cupping',
    'fine-robusta-fermentation',
    'how-to-brew-cambodian-fine-robusta',
    'evaluating-cambodian-coffee-suppliers-a-procurement-manager-s-guide-to-quality-and-traceability',
    'mondulkiri-next-specialty-coffee-origin',
  ]

  assert.match(articlePage, /const ROBUSTA_TOPIC_OWNER_LABELS/)
  assert.match(articlePage, /Part of Fine Robusta Cambodia/)
  assert.match(articlePage, /Return to the Fine Robusta Cambodia pillar/)
  for (const slug of owners) {
    assert.match(articlePage, new RegExp(slug.replaceAll('-', '\\-')))
  }
})


test('Cambodian Coffee discovery pillar exposes five specialist paths', () => {
  assert.match(articlePage, /CAMBODIA_COFFEE_PILLAR_SLUG = "what-cambodian-coffee-should-you-try-first"/)
  assert.match(articlePage, /Cambodian Coffee knowledge map/)
  assert.match(articlePage, /Explore the five core Cambodian Coffee paths/)

  const expected = [
    '/blog/mondulkiri-next-specialty-coffee-origin',
    '/blog/ratanakiri-coffee-cambodias-other-highland-origin',
    '/blog/best-cambodian-coffee-beans-robusta-quality-guide',
    '/blog/evaluating-cambodian-coffee-suppliers-a-procurement-manager-s-guide-to-quality-and-traceability',
    '/fine-robusta-cambodia',
  ]
  for (const href of expected) {
    assert.match(articlePage, new RegExp(href.replaceAll('/', '\\/').replaceAll('-', '\\-')))
  }
})

test('Cambodian Coffee specialist guides route back to the discovery pillar', () => {
  const owners = [
    'mondulkiri-next-specialty-coffee-origin',
    'ratanakiri-coffee-cambodias-other-highland-origin',
    'best-cambodian-coffee-beans-robusta-quality-guide',
    'evaluating-cambodian-coffee-suppliers-a-procurement-manager-s-guide-to-quality-and-traceability',
  ]
  assert.match(articlePage, /const CAMBODIA_COFFEE_TOPIC_OWNER_LABELS/)
  assert.match(articlePage, /Part of Cambodian Coffee/)
  assert.match(articlePage, /Return to the Cambodian Coffee guide/)
  for (const slug of owners) {
    assert.match(articlePage, new RegExp(slug.replaceAll('-', '\\-')))
  }
})

test('Fine Robusta pillar no longer links to the retired Cambodian coffee 404 route', () => {
  assert.doesNotMatch(fineRobustaPillar, /href="\/blog\/cambodia-coffee"/)
  assert.match(fineRobustaPillar, /href="\/blog\/what-cambodian-coffee-should-you-try-first"/)
})


test('broad Cambodian Coffee support pages converge on the discovery pillar', () => {
  assert.match(articlePage, /const CAMBODIA_COFFEE_PRIMARY_SUPPORT_SLUGS = new Set/)
  assert.match(articlePage, /const isCambodiaCoffeeSupport = CAMBODIA_COFFEE_PRIMARY_SUPPORT_SLUGS\.has\(post\.slug\)/)
  assert.match(articlePage, /Country guide/)
  assert.match(articlePage, /Cambodian Coffee guide →/)

  const supportSlugs = [
    'the-history-of-coffee-growing-in-cambodia',
    'why-cambodia-imports-coffee',
    'cambodia-coffee-origin-standards-before-growth',
    'what-makes-cambodian-coffee-hard-to-copy',
  ]
  for (const slug of supportSlugs) {
    assert.match(articlePage, new RegExp(slug.replaceAll('-', '\\-')))
  }
})

test('Cambodian Coffee primary support does not also render the generic Fine Robusta support backlink', () => {
  assert.match(
    articlePage,
    /!isCambodiaCoffeeSupport[\s\S]{0,160}?!isCambodiaGeographySupport[\s\S]{0,160}?!isCambodiaRobustaRegionsOwner/,
  )
})


test('Cambodia Regions pillar routes geography to Mondulkiri and Ratanakiri owners', () => {
  assert.match(cambodiaRegions, /Regional Specialists/)
  assert.match(cambodiaRegions, /Go From Country to Province/)
  assert.match(cambodiaRegions, /"\/blog\/mondulkiri-next-specialty-coffee-origin"/)
  assert.match(cambodiaRegions, /"\/blog\/ratanakiri-coffee-cambodias-other-highland-origin"/)
  assert.match(cambodiaRegions, /<Link href=\{region\.href\}/)
})

test('regional specialist owners expose distinct Cambodia geography context', () => {
  assert.match(articlePage, /const CAMBODIA_REGIONS_HREF = "\/origins\/cambodia-regions"/)
  assert.match(articlePage, /const REGIONAL_SPECIALIST_LABELS/)
  assert.match(articlePage, /Geography context/)
  assert.match(articlePage, /Cambodia coffee regions guide →/)
  assert.match(articlePage, /mondulkiri-next-specialty-coffee-origin/)
  assert.match(articlePage, /ratanakiri-coffee-cambodias-other-highland-origin/)
})


test('production Cambodia Regions rewrite serves the static owner-routing page', () => {
  assert.match(
    nextConfig,
    /source:\s*['"]\/origins\/cambodia-regions['"][\s\S]{0,120}?destination:\s*['"]\/occ-pages\/cambodia-regions\.html['"]/,
  )
  assert.match(cambodiaRegionsStatic, /href="https:\/\/origincafekh\.com\/blog\/mondulkiri-next-specialty-coffee-origin"/)
  assert.match(cambodiaRegionsStatic, /href="https:\/\/origincafekh\.com\/blog\/ratanakiri-coffee-cambodias-other-highland-origin"/)
  assert.match(cambodiaRegionsStatic, /Explore Mondulkiri/)
  assert.match(cambodiaRegionsStatic, /Explore Ratanakiri/)
  assert.doesNotMatch(
    cambodiaRegionsStatic,
    /class="read-more" href="https:\/\/origincafekh\.com\/origins\/cambodia-regions">Explore Cambodia &amp; Regions/,
  )
})


test('Cambodia geography support converges on the Regions pillar instead of discovery or Fine Robusta', () => {
  assert.match(articlePage, /const CAMBODIA_GEOGRAPHY_SUPPORT_SLUGS = new Set/)
  for (const slug of [
    'where-is-coffee-grown-in-cambodia',
    'is-cambodian-coffee-grown-in-cambodia',
    'does-cambodia-grow-coffee-mondulkiri-origin',
    'cambodia-coffee-regions',
  ]) {
    assert.match(articlePage, new RegExp(slug.replaceAll('-', '\\-')))
  }
  assert.match(articlePage, /Geography guide/)
  assert.match(articlePage, /Cambodia coffee regions guide →/)
  assert.match(articlePage, /isCambodiaGeographySupport/)
})

test('Cambodia Robusta growing-regions owner keeps species and geography boundaries separate', () => {
  assert.match(articlePage, /CAMBODIA_ROBUSTA_REGIONS_OWNER_SLUG = "cambodia-robusta-growing-regions"/)
  assert.match(articlePage, /CAMBODIA_ROBUSTA_HREF = "\/blog\/cambodia-specialty-robusta-coffee-guide"/)
  assert.match(articlePage, /Species × geography owner/)
  assert.match(articlePage, /Robusta Cambodia guide →/)
  assert.match(articlePage, /Cambodia coffee regions guide →/)
  const excludedOwners = articlePage.match(/const ROBUSTA_PILLAR_EXCLUDED_SLUGS = new Set\(\[([\s\S]*?)\n\]\)/)
  assert.ok(excludedOwners)
  assert.match(excludedOwners[1], /cambodia-robusta-growing-regions/)
})
