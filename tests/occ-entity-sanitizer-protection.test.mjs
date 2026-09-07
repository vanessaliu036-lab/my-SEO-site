import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const airtable = readFileSync(new URL('../lib/airtable.ts', import.meta.url), 'utf8')

test('entity sanitizer is scoped to unprotected OCC_Blog_Posts records', () => {
  assert.match(airtable, /function shouldSanitizeOccEntityText\(record: AirtableRecord\): boolean/)
  assert.match(airtable, /record\.tableName !== 'OCC_Blog_Posts'/)
  assert.match(airtable, /record\.fields\['OCC_INDEXED_PROTECTED'\]/)
  assert.match(airtable, /shouldSanitizeOccEntityText\(record\)/)
})

test('entity sanitizer removes unsupported OCC internal evidence claims from eligible records', () => {
  assert.match(airtable, /OCC maintains two independent quality libraries/)
  assert.match(airtable, /The 70\/30 blind test\. In internal blind cupping sessions, OCC has consistently observed/)
  assert.match(airtable, /OCC's hand-picked, cupping-verified Fine Robusta lots from Cambodia/)
  assert.match(airtable, /Quality comparisons between arabica and canephora should rely on documented, species-appropriate sensory and physical evaluation/)
  assert.match(airtable, /Blind comparative cupping can help test sensory differences without relying on an undocumented OCC internal percentage claim/)
  assert.match(airtable, /Explore OCC's Cambodia Fine Robusta sourcing and quality resources/)
})
