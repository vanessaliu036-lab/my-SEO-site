import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

test('About route uses a dedicated Mondulkiri banner and not the homepage hero', () => {
  const layout = readFileSync(path.join(root, 'app/(site)/about/layout.tsx'), 'utf8')
  assert.match(layout, /\/about\/hero-image/)
  assert.doesNotMatch(layout, /hero-home\.webp/)
})

test('image route embeds a valid AVIF payload', () => {
  const route = readFileSync(path.join(root, 'app/(site)/about/hero-image/route.ts'), 'utf8')
  const match = route.match(/const ABOUT_HERO_BASE64 = "([A-Za-z0-9+/=]+)"/)
  assert.ok(match, 'route should contain one inline AVIF payload')
  const banner = Buffer.from(match[1], 'base64')
  assert.equal(banner.toString('ascii', 4, 8), 'ftyp')
  assert.equal(banner.toString('ascii', 8, 12), 'avif')
  assert.equal(banner.length, 26599)
})

test('image route is immutable and served as AVIF', () => {
  const route = readFileSync(path.join(root, 'app/(site)/about/hero-image/route.ts'), 'utf8')
  assert.match(route, /Content-Type": "image\/avif"/)
  assert.match(route, /max-age=31536000, immutable/)
})
