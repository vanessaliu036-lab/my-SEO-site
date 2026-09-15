import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

function read(path) {
  return readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
}

const sitemap = read('app/sitemap.ts')
const articleLayout = read('app/(site)/blog/[slug]/layout.tsx')
const nextConfig = read('next.config.mjs')
const singleOriginPage = read('app/(site)/origins/single-origin/page.tsx')

test('sitemap publishes the current Origins owner and excludes the retired Single Origin route', () => {
  assert.match(sitemap, /`\$\{siteUrl\}\/origins\/cambodia-regions`/)
  assert.doesNotMatch(sitemap, /`\$\{siteUrl\}\/origins\/single-origin`/)
  assert.match(singleOriginPage, /permanentRedirect\(["']\/fine-robusta-cambodia["']\)/)
})

test('the indexed Fine Robusta beginner guide passes broad authority to the formal root owner', () => {
  const beginnerSlug = 'what-is-fine-robusta-coffee-a-complete-beginners-guide'
  const ownerMap = articleLayout.match(/const OWNER_ROUTE_BY_SUPPORT_SLUG:[\s\S]*?= \{([\s\S]*?)\n\}/)
  assert.ok(ownerMap, 'support-to-owner routing map must exist')
  assert.match(
    ownerMap[1],
    new RegExp(`"${beginnerSlug}"\\s*:\\s*OWNER_ROUTES\\.cambodia`),
  )
})

test('legacy broad Fine Robusta article redirects directly to the formal owner', () => {
  const route = /source:\s*['"]\/blog\/the-rise-of-fine-robusta-a-game-changer-for-wholesale-coffee-buyers-in-cambodia['"][\s\S]{0,220}?destination:\s*['"]\/fine-robusta-cambodia['"][\s\S]{0,100}?(?:permanent:\s*true|statusCode:\s*301)/
  assert.match(nextConfig, route)
  assert.doesNotMatch(
    nextConfig,
    /source:\s*['"]\/blog\/the-rise-of-fine-robusta-a-game-changer-for-wholesale-coffee-buyers-in-cambodia['"][\s\S]{0,220}?destination:\s*['"]\/blog\/what-is-fine-robusta-coffee-a-complete-beginners-guide['"]/, 
  )
})
