import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'

const source = fs.readFileSync('lib/airtable.ts', 'utf8')

test('frontend corpus loads both authoritative Airtable tables without workflow-status filtering', () => {
  assert.match(source, /OCC_Blog_Posts/)
  assert.match(source, /OCC_INDEXED_PROTECTED/)
  assert.match(source, /params\.set\('pageSize', '100'\)/)
  assert.match(source, /do\s*\{[\s\S]*\}\s*while \(offset\)/)
  assert.doesNotMatch(source, /publishedStatusForTable|isPublishedRecord/)
  assert.doesNotMatch(source, /filterByFormula[^\n]*status|\{status\}=/i)
})

test('true public identity is deduplicated only by stable slug', () => {
  assert.match(source, /const seenSlug = new Set<string>\(\)/)
  assert.match(source, /const identity = item\.slug\.toLowerCase\(\)/)
  assert.match(source, /seenSlug\.has\(identity\)/)
})
