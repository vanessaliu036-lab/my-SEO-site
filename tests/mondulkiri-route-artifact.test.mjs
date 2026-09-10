import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'

const routeUrl = new URL('../app/mondulkiri-coffee/page.tsx', import.meta.url)

test('Mondulkiri legacy alias has an explicit App Router redirect artifact', () => {
  assert.equal(
    existsSync(routeUrl),
    true,
    'Critical legacy alias must have a concrete route artifact so a stale cached 404 cannot remain the only path representation.'
  )

  const source = readFileSync(routeUrl, 'utf8')
  assert.match(source, /permanentRedirect\(['"]\/blog\/mondulkiri-next-specialty-coffee-origin['"]\)/)
  assert.match(source, /dynamic\s*=\s*['"]force-dynamic['"]/)
  assert.match(source, /revalidate\s*=\s*0/)
})
