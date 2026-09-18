import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

function chunkValue(n) {
  const source = readFileSync(path.join(root, `app/(site)/about/hero-image/chunks/${n}.ts`), 'utf8')
  const match = source.match(/const chunk = "([A-Za-z0-9+/=]+)"/)
  assert.ok(match, `chunk ${n} should contain base64 data`)
  return match[1]
}

test('About layout uses the dedicated local About hero and not the homepage hero', () => {
  const layout = readFileSync(path.join(root, 'app/(site)/about/layout.tsx'), 'utf8')
  assert.match(layout, /\/about-hero-web\.jpg/)
  assert.doesNotMatch(layout, /\/about\/hero-image/)
  assert.doesNotMatch(layout, /hero-home\.webp/)
})

test('banner chunks reconstruct a valid AVIF file', () => {
  const banner = Buffer.from([1, 2, 3, 4, 5].map(chunkValue).join(''), 'base64')
  assert.equal(banner.toString('ascii', 4, 8), 'ftyp')
  assert.equal(banner.toString('ascii', 8, 12), 'avif')
  assert.equal(banner.length, 26599)
})

test('image route is immutable and served as AVIF', () => {
  const route = readFileSync(path.join(root, 'app/(site)/about/hero-image/route.ts'), 'utf8')
  assert.match(route, /Content-Type": "image\/avif"/)
  assert.match(route, /max-age=31536000, immutable/)
})
