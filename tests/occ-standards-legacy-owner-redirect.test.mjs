import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const proxySource = readFileSync(new URL('../proxy.ts', import.meta.url), 'utf8')

// Regression for the 2026-09-21 formal keyword-owner mismatch.
test('legacy Fine Robusta standards URL redirects permanently to the assigned Standards Owner', () => {
  const route = proxySource.match(/["']\/fine-robusta-standards["']\s*:\s*["']([^"']+)["']/)
  assert.ok(route, 'the legacy Standards alias must be retained')
  assert.equal(route[1], '/blog/fine-robusta-standards-350g-defects')
  assert.match(proxySource, /NextResponse\.redirect\(url, 301\)/)
})
