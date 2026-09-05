import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'

const source = fs.readFileSync('lib/airtable.ts', 'utf8')

test('frontend corpus loads both authoritative Airtable tables without workflow-status filtering', () => {
  assert.match(source, /OCC_Blog_Posts/)
  assert.match(source, /OCC_INDEXED_PROTECTED/)
  assert.match(source, /async function loadAllPosts\(\)[\s\S]*for \(const tableName of AIRTABLE_TABLE_NAMES\)[\s\S]*fetchTableRecords\(tableName\)/)
  assert.match(source, /maxRecords\?: number/)
  assert.match(source, /return maxRecords \? all\.slice\(0, maxRecords\) : all/)
  assert.doesNotMatch(source, /publishedStatusForTable|isPublishedRecord/)
  assert.doesNotMatch(source, /filterByFormula[^\n]*status|\{status\}=/i)
})

test('true public identity is deduplicated only by stable slug', () => {
  assert.match(source, /const seenSlug = new Set<string>\(\)/)
  assert.match(source, /const identity = item\.slug\.toLowerCase\(\)/)
  assert.match(source, /seenSlug\.has\(identity\)/)
})
