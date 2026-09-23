import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { validateRevalidationPayload } from '../lib/revalidation-payload.mjs'
import { serializeJsonLd } from '../lib/json-ld-serialization.mjs'

test('JSON-LD serialization escapes HTML-significant characters and preserves data', () => {
  const value = { headline: '</script><script>bad()</script>', ampersand: 'A & B', count: 2 }
  const serialized = serializeJsonLd(value)

  assert.equal(serialized.includes('<'), false)
  assert.equal(serialized.includes('>'), false)
  assert.deepEqual(JSON.parse(serialized), value)
})

test('revalidation payload requires the configured shared secret', () => {
  assert.deepEqual(validateRevalidationPayload({ secret: 'test-secret', slug: 'sample-post' }, 'test-secret'), {
    ok: true,
    slug: 'sample-post',
  })
  assert.deepEqual(validateRevalidationPayload({ secret: 'wrong-secret' }, 'test-secret'), { ok: false, status: 401 })
  assert.deepEqual(validateRevalidationPayload({ slug: 'sample-post' }, 'test-secret'), { ok: false, status: 401 })
})

test('revalidation accepts canonical slugs and rejects path or query syntax', () => {
  assert.equal(validateRevalidationPayload({ secret: 'test-secret', slug: 'sample_post-2' }, 'test-secret').ok, true)
  for (const slug of ['../admin', 'a/b', 'slug?x=1', '.']) {
    assert.deepEqual(validateRevalidationPayload({ secret: 'test-secret', slug }, 'test-secret'), {
      ok: false,
      status: 400,
    })
  }
  assert.deepEqual(validateRevalidationPayload({ secret: 'test-secret', slug: 'x'.repeat(201) }, 'test-secret'), {
    ok: false,
    status: 400,
  })
})

test('revalidation endpoint exposes only POST and does not read query-string credentials', async () => {
  const source = await readFile(new URL('../app/api/revalidate/route.ts', import.meta.url), 'utf8')
  assert.match(source, /export async function POST\(/)
  assert.doesNotMatch(source, /export async function GET\(/)
  assert.doesNotMatch(source, /searchParams\.get\(['"]secret['"]\)/)
})

test('equipment-service link rendering uses escaped React text nodes', async () => {
  const source = await readFile(new URL('../app/(site)/solutions/equipment-service/page.tsx', import.meta.url), 'utf8')
  const renderer = source.slice(source.indexOf('const renderWithLinks'), source.indexOf('\nexport default'))
  assert.match(renderer, /text\.split\(linkPattern\)/)
  assert.doesNotMatch(renderer, /dangerouslySetInnerHTML/)
})
