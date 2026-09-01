import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { canonicalBlogSlug, matchesBlogSlug } from '../lib/blogSlugPolicy.mjs'

test('canonicalBlogSlug normalizes legacy stored blog paths', () => {
  assert.equal(canonicalBlogSlug('coffee-gifts-for-him-her-specialty-guide'), 'coffee-gifts-for-him-her-specialty-guide')
  assert.equal(canonicalBlogSlug('blog/coffee-gifts-for-him-her-specialty-guide'), 'coffee-gifts-for-him-her-specialty-guide')
  assert.equal(canonicalBlogSlug('/blog/coffee-gifts-for-him-her-specialty-guide'), 'coffee-gifts-for-him-her-specialty-guide')
})

test('matchesBlogSlug compares canonical values case-insensitively', () => {
  assert.equal(matchesBlogSlug('blog/Fine-Robusta-Drying', 'fine-robusta-drying'), true)
  assert.equal(matchesBlogSlug('/blog/is-robusta-naturally-bitter', 'is-robusta-naturally-bitter'), true)
  assert.equal(matchesBlogSlug('different-post', 'fine-robusta-drying'), false)
})

test('Fine Robusta Cambodia formal owner remains a first-class indexed route', () => {
  const here = dirname(fileURLToPath(import.meta.url))
  const root = resolve(here, '..')
  const owner = readFileSync(resolve(root, 'app/(site)/fine-robusta-cambodia/page.tsx'), 'utf8')
  const sitemap = readFileSync(resolve(root, 'app/sitemap.ts'), 'utf8')
  const home = readFileSync(resolve(root, 'components/templates/home-template.tsx'), 'utf8')

  assert.match(owner, /pageAlternates\("\/fine-robusta-cambodia"\)/)
  assert.match(owner, /const ownerUrl = `\$\{siteUrl\}\$\{ownerPath\}`/)
  assert.match(sitemap, /`\$\{siteUrl\}\/fine-robusta-cambodia`/)
  assert.match(home, /href="\/fine-robusta-cambodia"/)
})
