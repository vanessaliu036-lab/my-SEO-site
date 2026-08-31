import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { LEGACY_PUBLISHED_ARTICLE_MANIFEST } from '../lib/legacyPublishedArticles.mjs'

const airtableSource = readFileSync(new URL('../lib/airtable.ts', import.meta.url), 'utf8')

test('frontend permanently reads the working master plus protected indexed corpus', () => {
  assert.match(airtableSource, /['"]OCC_Blog_Posts['"]/)
  assert.match(airtableSource, /['"]OCC_INDEXED_PROTECTED['"]/)
  assert.match(airtableSource, /const PROTECTED_TABLE = ['"]OCC_INDEXED_PROTECTED['"]/)
})

test('the frozen protected manifest remains exactly 387 unique public slugs', () => {
  assert.equal(LEGACY_PUBLISHED_ARTICLE_MANIFEST.length, 387)
  assert.equal(new Set(LEGACY_PUBLISHED_ARTICLE_MANIFEST.map(({ id }) => id)).size, 387)
  assert.equal(new Set(LEGACY_PUBLISHED_ARTICLE_MANIFEST.map(({ slug }) => slug)).size, 387)
})

test('protected corpus bypasses draft/published workflow filtering', () => {
  assert.match(
    airtableSource,
    /if\s*\(\s*!isProtected\(record\)\s*&&\s*!isPublished\(record\)\s*\)\s*return null/
  )
})

test('protected corpus is always indexable and cannot be hidden by SEO Gate', () => {
  assert.match(
    airtableSource,
    /indexable:\s*isProtected\(record\)\s*\|\|/
  )
})

test('Airtable pagination must not truncate either corpus source', () => {
  assert.match(airtableSource, /pageSize:\s*['"]100['"]|pageSize:\s*['"]?100['"]?/)
  assert.match(airtableSource, /attempt <= 3/)
})
