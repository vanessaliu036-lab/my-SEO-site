import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const airtable = readFileSync(new URL('../lib/airtable.ts', import.meta.url), 'utf8')

test('all indexed and frozen OCC records bypass frontend text sanitizers', () => {
  assert.match(airtable, /'OCC_INDEXED_PROTECTED',\s*'Legacy Indexed',\s*'Frozen Corpus'/s)
  assert.match(airtable, /record\.fields\['OCC_INDEXED_PROTECTED'\]/)
  assert.match(airtable, /record\.fields\['Legacy Indexed'\]/)
  assert.match(airtable, /record\.fields\['Frozen Corpus'\]/)
  assert.match(airtable, /record\.tableName !== 'OCC_Blog_Posts'/)
})

test('eligible working content removes editorial-only keyword notes', () => {
  assert.match(airtable, /function sanitizeOccEditorialResidue\(text: string\): string/)
  assert.match(airtable, /Target keyword/i)
})

test('shop insertion directives become a real contact CTA without creating a shop route', () => {
  assert.match(airtable, /link to shop/i)
  assert.match(airtable, /\[Contact OCC\]\(\/contact\)/)
  assert.doesNotMatch(airtable, /\]\(\/shop\)/)
})

test('only normalized-identical adjacent FAQ sections are deduplicated', () => {
  assert.match(airtable, /function dedupeAdjacentFaqSections\(text: string\): string/)
  assert.match(airtable, /normalizeFaqSection/)
  assert.match(airtable, /previousFaqNormalized === currentFaqNormalized/)
})

test('editorial residue sanitizer is gated by the same protection decision as entity cleanup', () => {
  assert.match(airtable, /sanitizeOccEntityText\(sanitizeOccEditorialResidue\(text\)\)/)
  assert.match(airtable, /shouldSanitizeOccEntityText\(record\)/)
})
