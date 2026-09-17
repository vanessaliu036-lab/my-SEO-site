import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { auditEditorialImages } from '../scripts/audit-editorial-images.mjs'

function fixture(files) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'occ-images-'))
  for (const [name, content] of Object.entries(files)) {
    const dest = path.join(root, name)
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    fs.writeFileSync(dest, content)
  }
  return root
}

test('reports an image referenced by two different routes', () => {
  const root = fixture({
    'app/(site)/page.tsx': '<img src="/photos/a.webp" />',
    'app/(site)/about/page.tsx': '<img src="/photos/a.webp" />',
    'public/photos/a.webp': 'A image',
  })
  const results = auditEditorialImages(root)
  assert.equal(results.crossRouteDuplicates.length, 1)
  assert.equal(results.crossRouteDuplicates[0].image, '/photos/a.webp')
  assert.deepEqual(results.crossRouteDuplicates[0].routes, ['/', '/about'])
})

test('detects two names containing the identical photograph across routes', () => {
  const root = fixture({
    'app/(site)/page.tsx': '<img src="/photos/a.webp" />',
    'app/(site)/about/page.tsx': '<img src="/photos/b.webp" />',
    'public/photos/a.webp': 'same image bytes',
    'public/photos/b.webp': 'same image bytes',
  })
  const results = auditEditorialImages(root)
  assert.equal(results.duplicateBytes.length, 1)
  assert.deepEqual(results.duplicateBytes[0].routes, ['/', '/about'])
})

test('flags global image overrides rather than treating them as page-owned', () => {
  const root = fixture({
    'app/(site)/page.tsx': '<img src="/photos/a.webp" />',
    'public/photos/a.webp': 'image',
    'app/layout.tsx': 'import "./about-image-overrides.css"',
    'app/about-image-overrides.css': 'div { background-image: url("/photos/a.webp") !important; }',
  })
  const results = auditEditorialImages(root)
  assert.ok(results.globalImageOverrides.some((x) => x.file === 'app/about-image-overrides.css'))
  assert.equal(results.globalImageOverrides.some((x) => x.file === 'app/layout.tsx'), true)
})

test('does not flag brand logos reused in two routes', () => {
  const root = fixture({
    'app/(site)/page.tsx': '<img src="/occ-logo-primary-local.svg" />',
    'app/(site)/about/page.tsx': '<img src="/occ-logo-primary-local.svg" />',
    'public/occ-logo-primary-local.svg': '<svg></svg>',
  })
  const results = auditEditorialImages(root)
  assert.equal(results.crossRouteDuplicates.length, 0)
  assert.equal(results.duplicateBytes.length, 0)
})

test('treats an app route handler that serves an image URL as an existing asset', () => {
  const root = fixture({
    'app/(site)/brand/page.tsx': '<img src="/images/gift.avif" />',
    'app/images/gift.avif/route.ts': 'export function GET() { return new Response() }',
  })
  const results = auditEditorialImages(root)
  assert.deepEqual(results.missingImages, [])
})
