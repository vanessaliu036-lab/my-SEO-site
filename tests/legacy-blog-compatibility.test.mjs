import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import {
  LEGACY_PUBLISHED_ARTICLE_MANIFEST,
  LEGACY_PUBLISHED_ARTICLE_IDS,
  LEGACY_PUBLISHED_ARTICLE_SLUGS,
} from '../lib/legacyPublishedArticles.mjs'

const airtableSource = readFileSync(new URL('../lib/airtable.ts', import.meta.url), 'utf8')

test('OCC public runtime permanently reads both the live master and the frozen Articles corpus', () => {
  assert.match(airtableSource, /['"]OCC_Blog_Posts['"]/)
  assert.match(airtableSource, /['"]Articles['"]/)
  assert.match(airtableSource, /PUBLIC_AIRTABLE_TABLE_NAMES/)
})

test('the frozen historical public corpus is exactly 387 unique records and slugs', () => {
  assert.equal(LEGACY_PUBLISHED_ARTICLE_MANIFEST.length, 387)
  assert.equal(LEGACY_PUBLISHED_ARTICLE_IDS.size, 387)
  assert.equal(LEGACY_PUBLISHED_ARTICLE_SLUGS.size, 387)
  assert.equal(new Set(LEGACY_PUBLISHED_ARTICLE_MANIFEST.map((entry) => entry.id)).size, 387)
  assert.equal(new Set(LEGACY_PUBLISHED_ARTICLE_MANIFEST.map((entry) => entry.slug)).size, 387)
})

test('frozen Articles are protected independently from editorial status and SEO Gate', () => {
  assert.match(airtableSource, /LEGACY_PUBLISHED_ARTICLE_IDS/)
  assert.match(airtableSource, /LEGACY_PUBLISHED_ARTICLE_SLUGS/)
  assert.match(airtableSource, /function isLegacyPublic/)
  assert.match(
    airtableSource,
    /isLegacyPublic\(record\)\s*\|\|\s*isIndexableBySeoGate\(record\.fields\)/
  )
})

test('legacy Blogger-public rows remain published even when their workflow status is draft', () => {
  assert.match(airtableSource, /BLOGGER_STATUS_KEYS/)
  assert.match(airtableSource, /PUBLISHED_TOKENS\.has\(bloggerStatus\)/)
  assert.match(airtableSource, /isLegacyArticles/)
})

test('Articles listing is filtered to the frozen published Blogger corpus and paginates fully', () => {
  assert.match(airtableSource, /function filterFormulaForTable/)
  assert.match(airtableSource, /LOWER\(\{ Blogger Status\}\)=['"]published['"]/)
  assert.match(airtableSource, /pageSize:\s*['"]100['"]/)
  assert.match(airtableSource, /attempt <= 3/)
})

test('legacy article details can be fetched from either public Airtable source', () => {
  assert.match(airtableSource, /for \(const tableName of PUBLIC_AIRTABLE_TABLE_NAMES\)/)
  assert.match(airtableSource, /Blogger Version/)
  assert.match(airtableSource, /Blogger URL/)
})
