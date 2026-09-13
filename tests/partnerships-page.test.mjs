import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const read = (path) => fs.readFileSync(path, "utf8")

test("Partnerships page exists and owns gift intent without stealing supplier intent", () => {
  const pagePath = "app/(site)/partnerships/page.tsx"
  assert.equal(fs.existsSync(pagePath), true, "partnerships page must exist")
  const source = read(pagePath)

  assert.match(source, /OCC × ARUNERA/i)
  assert.match(source, /Cambodian coffee gifts/i)
  assert.match(source, /Cambodian coffee souvenir/i)
  assert.match(source, /premium Cambodian gifts/i)
  assert.match(source, /hotel/i)
  assert.match(source, /corporate gifting/i)
  assert.match(source, /retail/i)
  assert.match(source, /ARUNERA/i)
  assert.match(source, /Cambodian gift platform/i)
  assert.match(source, /\/solutions\/wholesale/)
  assert.match(source, /\/contact/)

  assert.doesNotMatch(source, /title:\s*["'`][^"'`]*coffee supplier/i)
  assert.doesNotMatch(source, /title:\s*["'`][^"'`]*wholesale/i)
})

test("Partnerships is discoverable from navigation and sitemap", () => {
  const navigation = read("components/site/navigation-data.ts")
  const sitemap = read("app/sitemap.ts")

  assert.match(navigation, /PARTNERSHIPS/)
  assert.match(navigation, /\/partnerships/)
  assert.match(sitemap, /\/partnerships/)
})
