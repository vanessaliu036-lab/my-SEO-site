import test from 'node:test'
import assert from 'node:assert/strict'
import { isIndexableBySeoGate, resolveAirtableTableNames } from '../lib/publicationPolicy.mjs'

test('explicit SEO deny gates are not indexable', () => {
  assert.equal(isIndexableBySeoGate({ SEO_Gate: 'Do Not Publish' }), false)
  assert.equal(isIndexableBySeoGate({ SEO_Gate: 'Blocked — Duplicate' }), false)
  assert.equal(isIndexableBySeoGate({ SEO_Gate: 'Blocked - Duplicate' }), false)
  assert.equal(isIndexableBySeoGate({ SEO_Gate: 'Rewrite Required' }), false)
})

test('allowed or blank SEO gates remain indexable for backwards compatibility', () => {
  assert.equal(isIndexableBySeoGate({ SEO_Gate: 'Pillar — Owns Keyword' }), true)
  assert.equal(isIndexableBySeoGate({ SEO_Gate: 'Spoke — Unique Intent' }), true)
  assert.equal(isIndexableBySeoGate({}), true)
})

test('Airtable select-like objects are interpreted by their name', () => {
  assert.equal(isIndexableBySeoGate({ SEO_Gate: { name: 'Do Not Publish' } }), false)
  assert.equal(isIndexableBySeoGate({ 'SEO Gate': { name: 'Spoke — Unique Intent' } }), true)
})

test('production always includes both Articles and OCC_Blog_Posts', () => {
  assert.deepEqual(
    resolveAirtableTableNames({ AIRTABLE_TABLE_NAME: 'Articles' }),
    ['Articles', 'OCC_Blog_Posts']
  )
  assert.deepEqual(
    resolveAirtableTableNames({ AIRTABLE_TABLE_NAMES: 'OCC_Blog_Posts' }),
    ['OCC_Blog_Posts', 'Articles']
  )
})
