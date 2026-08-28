import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const sitemap = readFileSync(new URL('../app/sitemap.ts', import.meta.url), 'utf8')

test('OCC sitemap is request-time dynamic so newly published Airtable articles are discoverable immediately', () => {
  assert.match(sitemap, /export const dynamic = ['"]force-dynamic['"]/)
})
