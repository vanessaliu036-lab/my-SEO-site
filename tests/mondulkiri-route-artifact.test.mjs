import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const proxySource = readFileSync(new URL('../proxy.ts', import.meta.url), 'utf8')

test('Mondulkiri legacy alias is intercepted by the edge proxy before stale 404 cache', () => {
  assert.match(
    proxySource,
    /["']\/mondulkiri-coffee["']\s*:\s*["']\/blog\/mondulkiri-next-specialty-coffee-origin["']/,
    'Critical Mondulkiri alias must be represented in proxy routing, not only next.config redirects.'
  )
  assert.match(proxySource, /NextResponse\.redirect\(url, 301\)/)
})
