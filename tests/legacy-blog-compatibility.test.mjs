import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const airtableSource = readFileSync(new URL('../lib/airtable.ts', import.meta.url), 'utf8')

test('OCC public blog reads only the consolidated OCC_Blog_Posts master table', () => {
  assert.match(
    airtableSource,
    /PUBLIC_BLOG_TABLES\s*=\s*\[\s*['"]OCC_Blog_Posts['"]\s*\]/,
  )
  assert.doesNotMatch(airtableSource, /PUBLIC_BLOG_TABLES[^\n]*['"]Articles['"]/)
})

test('Airtable pagination does not truncate the consolidated article corpus', () => {
  assert.match(airtableSource, /pageSize:\s*['"]100['"]/)
  assert.doesNotMatch(airtableSource, /maxRecords:\s*['"]1000['"]/)
})

test('blog list fetches projected metadata instead of all article bodies', () => {
  assert.match(airtableSource, /function listFieldsForTable/)
  assert.match(airtableSource, /params\.append\(['"]fields\[\]['"]/)
})
