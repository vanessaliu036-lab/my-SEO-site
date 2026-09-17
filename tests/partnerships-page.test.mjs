import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const read = (path) => fs.readFileSync(path, "utf8")
const hubPath = "app/(site)/partnerships/page.tsx"
const giftPath = "app/(site)/partnerships/brand-gifting/page.tsx"

test("Partnerships hub retains two distinct, clickable routes", () => {
  assert.equal(fs.existsSync(hubPath), true, "partnerships hub must exist")
  const hub = read(hubPath)
  assert.match(hub, /pageAlternates\("\/partnerships"\)/)
  assert.match(hub, /href:\s*"\/partnerships\/brand-gifting"/)
  assert.match(hub, /href:\s*"\/distribution"/)
  assert.match(hub, /Brand & Gifting/)
  assert.match(hub, /Distribution Partners/)
  assert.doesNotMatch(hub, /title:\s*["'`][^"'`]*coffee supplier/i)
  assert.doesNotMatch(hub, /title:\s*["'`][^"'`]*wholesale/i)
})

test("Dedicated Brand & Gifting page owns gift intent and preserves its own canonical", () => {
  assert.equal(fs.existsSync(giftPath), true, "Brand & Gifting page must exist")
  const source = read(giftPath)
  for (const phrase of [
    "OCC × ARUNERA", "Cambodian coffee gifts", "Cambodian coffee souvenir",
    "premium Cambodian", "hotel", "corporate gifting", "retail", "ARUNERA",
    "Cambodian gift platform", "/solutions/wholesale", "/contact",
  ]) {
    assert.ok(source.toLowerCase().includes(phrase.toLowerCase()), `missing gift context: ${phrase}`)
  }
  assert.match(source, /pageAlternates\("\/partnerships\/brand-gifting"\)/)
  assert.doesNotMatch(source, /title:\s*["'`][^"'`]*coffee supplier/i)
  assert.doesNotMatch(source, /title:\s*["'`][^"'`]*wholesale/i)
})

test("Gift page retains its high-resolution ARUNERA asset and descriptive alt text", () => {
  const source = read(giftPath)
  const imageRoute = "app/images/occ-arunera-cambodian-coffee-gift-partnership.avif/route.ts"
  assert.match(source, /src="\/images\/occ-arunera-cambodian-coffee-gift-partnership\.avif"/)
  assert.match(source, /width=\{1448\}/)
  assert.match(source, /height=\{1086\}/)
  assert.match(source, /alt="OCC and ARUNERA premium Cambodian coffee gift collection"/)
  assert.equal(fs.existsSync(imageRoute), true, "partnership image route must exist")
  const route = read(imageRoute)
  assert.match(route, /image\/avif/)
  assert.match(route, /max-age=31536000/)
})

test("Partnership hub and dedicated gift route are discoverable", () => {
  const navigation = read("components/site/navigation-data.ts")
  const sitemap = read("app/sitemap.ts")
  assert.match(navigation, /PARTNERSHIPS/)
  assert.match(navigation, /\/partnerships/)
  assert.match(sitemap, /\/partnerships/)
  assert.match(sitemap, /\/partnerships\/brand-gifting/)
})
