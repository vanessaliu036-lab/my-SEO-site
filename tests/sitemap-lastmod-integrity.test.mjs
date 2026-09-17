import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const sitemap = readFileSync(new URL('../app/sitemap.ts', import.meta.url), 'utf8')

test('sitemap does not claim every route changed at generation time', () => {
  assert.doesNotMatch(sitemap, /const now\s*=\s*new Date\(\)/)
  assert.doesNotMatch(sitemap, /lastModified:\s*now/)
  assert.match(sitemap, /`\$\{siteUrl\}\/fine-robusta-cambodia`/)
  assert.match(sitemap, /`\$\{siteUrl\}\/solutions\/wholesale`/)
})

test('undated blog posts do not receive a fabricated sitemap update date', () => {
  assert.doesNotMatch(sitemap, /lastModified:\s*p\.publish_date\s*\?[^\n]*:\s*now/)
})
