import test from 'node:test'
import assert from 'node:assert/strict'

const AIRTABLE_KEY =
  process.env.AIRTABLE_API_KEY || process.env.AIRTABLE_PAT || process.env.AIRTABLE_TOKEN
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
const MONDULKIRI_OWNER_SLUG = 'mondulkiri-next-specialty-coffee-origin'

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
    `Airtable Mondulkiri owner route check failed for ${tableName}: ${response.status} ${response.statusText}`,
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
  'Mondulkiri Owner routes directly to canonical Robusta Cambodia and Mondulkiri owners',
  { skip: !AIRTABLE_KEY || !AIRTABLE_BASE_ID },
  async () => {
    const ownerRecords = await fetchRecords(
      'SEO Keyword Owners',
      'OR({Keyword}="robusta cambodia",{Keyword}="mondulkiri coffee")',
    )
    const ownerByKeyword = new Map(
      ownerRecords.map((record) => [record.fields?.Keyword, record.fields?.['Owner URL']]),
    )

    const robustaCambodiaOwner = ownerPath(ownerByKeyword.get('robusta cambodia'))
    const mondulkiriOwner = ownerPath(ownerByKeyword.get('mondulkiri coffee'))

    assert.equal(robustaCambodiaOwner, '/blog/cambodia-specialty-robusta-coffee-guide')
    assert.equal(mondulkiriOwner, '/blog/mondulkiri-next-specialty-coffee-origin')

    const articleRecords = await fetchRecords(
      'OCC_Blog_Posts',
      `{slug}="${MONDULKIRI_OWNER_SLUG}"`,
    )
    assert.equal(articleRecords.length, 1, 'Mondulkiri Owner record must be unique')

    const content = articleRecords[0]?.fields?.Content
    assert.equal(typeof content, 'string')

    assert.ok(
      content.includes(`[Cambodia origin and coffee discovery](${robustaCambodiaOwner})`),
      'Mondulkiri Owner must route Robusta Cambodia discovery directly to the formal Owner',
    )
    assert.ok(
      content.includes(`[Mondulkiri coffee](${mondulkiriOwner})`),
      'Mondulkiri Owner routing block must use the formal Mondulkiri Owner path',
    )

    for (const forbiddenTarget of [
      '/cambodia-robusta-coffee',
      '/cambodia-robusta-coffee/',
      '/mondulkiri-coffee',
      '/mondulkiri-coffee/',
    ]) {
      assert.equal(
        content.includes(`](${forbiddenTarget})`),
        false,
        `Mondulkiri Owner must not link to legacy alias ${forbiddenTarget}`,
      )
    }
  },
)
