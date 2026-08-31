import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const airtableSource = readFileSync(new URL('../lib/airtable.ts', import.meta.url), 'utf8')

test('OCC public blog preserves both legacy Articles and moderated OCC_Blog_Posts sources', () => {
  assert.match(airtableSource, /Articles/)
  assert.match(airtableSource, /OCC_Blog_Posts/)
})

test('legacy Articles can remain public when Blogger Status is Published', () => {
  assert.match(airtableSource, /Blogger Status|Blogger_Status|blogger status/i)
  assert.match(airtableSource, /published/i)
})

test('Airtable pagination does not truncate the 1310-row legacy Articles table', () => {
  assert.match(airtableSource, /pageSize:\s*['"]100['"]/)
  assert.doesNotMatch(airtableSource, /maxRecords:\s*['"]1000['"]/)
})
