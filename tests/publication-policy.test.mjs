import test from 'node:test'
import assert from 'node:assert/strict'
import { isIndexableBySeoGate, isPublishedByStatus } from '../lib/publicationPolicy.mjs'

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


test('only Airtable records with Published status are public', () => {
  assert.equal(isPublishedByStatus({ Status: 'Published' }), true)
  assert.equal(isPublishedByStatus({ Status: { name: 'Published' } }), true)
  assert.equal(isPublishedByStatus({ Status: 'published' }), true)
  assert.equal(isPublishedByStatus({ Status: 'Draft' }), false)
  assert.equal(isPublishedByStatus({ Status: { name: 'Draft' } }), false)
  assert.equal(isPublishedByStatus({}), false)
})
