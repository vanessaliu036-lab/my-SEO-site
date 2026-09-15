import test from 'node:test'
import assert from 'node:assert/strict'

// 2026-09-15: canonical Airtable targets repaired; keep this guard blocking future regressions.
const AIRTABLE_KEY =
  process.env.AIRTABLE_API_KEY || process.env.AIRTABLE_PAT || process.env.AIRTABLE_TOKEN
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
const SUPPLIER_OWNER_SLUG =
  'evaluating-cambodian-coffee-suppliers-a-procurement-manager-s-guide-to-quality-and-traceability'
const ETHICAL_SOURCING_SUPPORT_PATH =
  '/blog/the-definitive-guide-to-evaluating-cambodian-coffee-suppliers-quality-ethics-and-technical-standards-for-b2b-buyers'

async function fetchRecords(tableName, formula) {
  const url = new URL(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(tableName)}`,
  )
  url.searchParams.set('filterByFormula', formula)

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${AIRTABLE_KEY}` },
    cache: 'no-store',
  })

  assert.equal(
    response.ok,
    true,
    `Airtable supplier-owner route check failed for ${tableName}: ${response.status} ${response.statusText}`,
  )

  const payload = await response.json()
  return Array.isArray(payload.records) ? payload.records : []
}

function ownerPath(ownerUrl) {
  assert.equal(typeof ownerUrl, 'string')
  const pathname = new URL(ownerUrl).pathname.replace(/\/+$/, '')
  return pathname || '/'
}

test(
  'Supplier Owner internal guides route directly to canonical owners or approved support pages',
  { skip: !AIRTABLE_KEY || !AIRTABLE_BASE_ID },
  async () => {
    const ownerRecords = await fetchRecords(
      'SEO Keyword Owners',
      'OR({Keyword}="coffee processing quality cherry",{Keyword}="mondulkiri coffee")',
    )
    const ownerByKeyword = new Map(
      ownerRecords.map((record) => [record.fields?.Keyword, record.fields?.['Owner URL']]),
    )

    const processingOwner = ownerPath(ownerByKeyword.get('coffee processing quality cherry'))
    const mondulkiriOwner = ownerPath(ownerByKeyword.get('mondulkiri coffee'))

    assert.equal(processingOwner, '/blog/good-coffee-cherries-need-processing')
    assert.equal(mondulkiriOwner, '/blog/mondulkiri-next-specialty-coffee-origin')

    const supplierRecords = await fetchRecords(
      'OCC_Blog_Posts',
      `{slug}="${SUPPLIER_OWNER_SLUG}"`,
    )
    assert.equal(supplierRecords.length, 1, 'Supplier Owner record must be unique')

    const content = supplierRecords[0]?.fields?.Content
    assert.equal(typeof content, 'string')

    assert.ok(
      content.includes(`[Mondulkiri origin profile](${mondulkiriOwner})`),
      'Supplier Owner must link directly to the canonical Mondulkiri Owner, not its legacy alias',
    )
    assert.ok(
      content.includes(`[coffee processing and quality-control guide](${processingOwner})`),
      'Supplier Owner must route processing intent to the formal processing Owner',
    )
    assert.ok(
      content.includes(`[farmer impact and sourcing guide](${ETHICAL_SOURCING_SUPPORT_PATH})`),
      'Supplier Owner must route farmer-impact intent to the approved ethical-sourcing support page',
    )

    for (const forbiddenTarget of [
      '/mondulkiri-coffee',
      '/coffee-processing-quality',
      '/farmer-impact-sourcing',
    ]) {
      assert.equal(
        content.includes(`](${forbiddenTarget})`),
        false,
        `Supplier Owner must not link to legacy or broken target ${forbiddenTarget}`,
      )
    }
  },
)
