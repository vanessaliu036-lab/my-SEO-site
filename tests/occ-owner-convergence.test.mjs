import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

function read(path) {
  return readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
}

const sitemap = read('app/sitemap.ts')
const articlePage = read('app/(site)/blog/[slug]/page.tsx')
const nextConfig = read('next.config.mjs')
const singleOriginPage = read('app/(site)/origins/single-origin/page.tsx')

test('sitemap publishes the current Origins owner and excludes the retired Single Origin route', () => {
  assert.match(sitemap, /`\$\{siteUrl\}\/origins\/cambodia-regions`/)
  assert.doesNotMatch(sitemap, /`\$\{siteUrl\}\/origins\/single-origin`/)
  assert.match(singleOriginPage, /permanentRedirect\(["']\/fine-robusta-cambodia["']\)/)
})

test('the indexed Fine Robusta beginner guide passes broad authority to the formal root owner', () => {
  const beginnerSlug = 'what-is-fine-robusta-coffee-a-complete-beginners-guide'
  const clusterMatch = articlePage.match(/const ROBUSTA_CLUSTER_SLUGS = new Set\(\[([\s\S]*?)\]\)/)
  assert.ok(clusterMatch, 'Fine Robusta support cluster must exist')
  assert.match(clusterMatch[1], new RegExp(`"${beginnerSlug}"`))

  const contextualMap = articlePage.match(/const CONTEXTUAL_OWNER_LINKS:[\s\S]*?= \{([\s\S]*?)\n\}/)
  assert.ok(contextualMap, 'contextual owner-link map must exist')
  const beginnerRoute = new RegExp(
    `"${beginnerSlug}"[\\s\\S]{0,320}?href:\\s*ROBUSTA_PILLAR_HREF[\\s\\S]{0,220}?Fine Robusta Cambodia guide`,
  )
  assert.match(contextualMap[1], beginnerRoute)
})

test('legacy broad Fine Robusta article redirects directly to the formal owner', () => {
  const route = /source:\s*['"]\/blog\/the-rise-of-fine-robusta-a-game-changer-for-wholesale-coffee-buyers-in-cambodia['"][\s\S]{0,220}?destination:\s*['"]\/fine-robusta-cambodia['"][\s\S]{0,100}?(?:permanent:\s*true|statusCode:\s*301)/
  assert.match(nextConfig, route)
  assert.doesNotMatch(
    nextConfig,
    /source:\s*['"]\/blog\/the-rise-of-fine-robusta-a-game-changer-for-wholesale-coffee-buyers-in-cambodia['"][\s\S]{0,220}?destination:\s*['"]\/blog\/what-is-fine-robusta-coffee-a-complete-beginners-guide['"]/, 
  )
})
