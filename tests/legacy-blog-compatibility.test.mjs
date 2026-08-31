import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import {
  LEGACY_PUBLISHED_ARTICLE_MANIFEST,
  LEGACY_PUBLISHED_ARTICLE_IDS,
  LEGACY_PUBLISHED_ARTICLE_SLUGS,
} from '../lib/legacyPublishedArticles.mjs'

const airtableSource = readFileSync(new URL('../lib/airtable.ts', import.meta.url), 'utf8')

test('OCC public runtime reads only the consolidated OCC_Blog_Posts master table', () => {
  assert.match(airtableSource, /const PUBLIC_BLOG_TABLES\s*=\s*\[\s*['"]OCC_Blog_Posts['"]\s*\]/)
  assert.doesNotMatch(airtableSource, /PUBLIC_AIRTABLE_TABLE_NAMES/)
})

test('the 387 historical Blogger-public Articles remain frozen as recovery evidence', () => {
  assert.equal(LEGACY_PUBLISHED_ARTICLE_MANIFEST.length, 387)
  assert.equal(LEGACY_PUBLISHED_ARTICLE_IDS.size, 387)
  assert.equal(LEGACY_PUBLISHED_ARTICLE_SLUGS.size, 387)
  assert.equal(new Set(LEGACY_PUBLISHED_ARTICLE_MANIFEST.map((entry) => entry.slug)).size, 387)
})

test('migrated historically public master records override a later SEO deny gate', () => {
  assert.match(airtableSource, /Legacy Indexed/)
  assert.match(airtableSource, /isLegacyIndexed/)
})

test('Airtable pagination does not truncate the consolidated article corpus and retries transient failures', () => {
  assert.match(airtableSource, /pageSize:\s*['"]100['"]/)
  assert.doesNotMatch(airtableSource, /maxRecords:\s*['"]1000['"]/)
  assert.match(airtableSource, /attempt <= 3/)
})

test('blog list fetches projected metadata instead of full article bodies', () => {
  assert.match(airtableSource, /function listFieldsForTable/)
  assert.match(airtableSource, /params\.append\(['"]fields\[\]['"]/)
})
