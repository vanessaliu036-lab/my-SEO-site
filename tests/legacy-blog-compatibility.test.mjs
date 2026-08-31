import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import {
  LEGACY_PUBLISHED_ARTICLE_MANIFEST,
  LEGACY_PUBLISHED_ARTICLE_IDS,
  LEGACY_PUBLISHED_ARTICLE_SLUGS,
} from '../lib/legacyPublishedArticles.mjs'

const airtableSource = readFileSync(new URL('../lib/airtable.ts', import.meta.url), 'utf8')

test('OCC public blog preserves both legacy Articles and moderated OCC_Blog_Posts sources', () => {
  assert.match(airtableSource, /Articles/)
  assert.match(airtableSource, /OCC_Blog_Posts/)
})

test('the 387 historical Blogger-public Articles are frozen by ID and slug', () => {
  assert.equal(LEGACY_PUBLISHED_ARTICLE_MANIFEST.length, 387)
  assert.equal(LEGACY_PUBLISHED_ARTICLE_IDS.size, 387)
  assert.equal(LEGACY_PUBLISHED_ARTICLE_SLUGS.size, 387)
  assert.equal(new Set(LEGACY_PUBLISHED_ARTICLE_MANIFEST.map((entry) => entry.slug)).size, 387)
  assert.match(airtableSource, /LEGACY_PUBLISHED_ARTICLES_FREEZE/)
  assert.match(airtableSource, /LEGACY_PUBLISHED_ARTICLE_IDS\.has\(record\.id\)/)
})

test('legacy Articles can remain public when Blogger Status is Published', () => {
  assert.match(airtableSource, /Blogger Status|Blogger_Status|blogger status/i)
  assert.match(airtableSource, /published/i)
  assert.match(airtableSource, /Blogger Version|Blogger_Version|blogger_version/i)
  assert.match(airtableSource, /isLegacyPublic/)
})

test('Airtable pagination does not truncate the legacy article corpus', () => {
  assert.match(airtableSource, /pageSize:\s*['"]100['"]/)
  assert.doesNotMatch(airtableSource, /maxRecords:\s*['"]1000['"]/)
})

test('blog list fetches project metadata instead of full article bodies', () => {
  assert.match(airtableSource, /function listFieldsForTable/)
  assert.match(airtableSource, /params\.append\(['"]fields\[\]['"]/)
})
