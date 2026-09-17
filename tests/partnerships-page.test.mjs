import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const read = (path) => fs.readFileSync(path, "utf8")

test("Brand & Gifting page owns gift intent without stealing supplier intent", () => {
  const pagePath = "app/(site)/brand-gifting/page.tsx"
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

test("Brand & Gifting uses a dedicated high-resolution ARUNERA image with SEO alt text", () => {
  const pagePath = "app/(site)/brand-gifting/page.tsx"
  const source = read(pagePath)
  const imageRoute = "app/images/occ-arunera-cambodian-coffee-gift-partnership.avif/route.ts"

  assert.match(source, /src="\/images\/occ-arunera-cambodian-coffee-gift-partnership\.avif"/)
  assert.match(source, /width=\{1448\}/)
  assert.match(source, /height=\{1086\}/)
  assert.match(source, /alt="OCC and ARUNERA premium Cambodian coffee gift collection"/)
  assert.equal(fs.existsSync(imageRoute), true, "optimized partnership image route must exist")

  const route = read(imageRoute)
  assert.match(route, /image\/avif/)
  assert.match(route, /max-age=31536000/)
})

test("Partnerships is discoverable from navigation and sitemap", () => {
  const navigation = read("components/site/navigation-data.ts")
  const sitemap = read("app/sitemap.ts")
  const hub = read("app/(site)/partnerships/page.tsx")

  assert.match(navigation, /PARTNERSHIPS/)
  assert.match(navigation, /\/partnerships/)
  assert.match(navigation, /Brand & Gifting", href: "\/brand-gifting"/)
  assert.match(hub, /Brand & Gifting/)
  assert.match(hub, /href: "\/brand-gifting"/)
  assert.match(sitemap, /\/partnerships/)
  assert.match(sitemap, /\/brand-gifting/)
})

test("Distribution owns international importer and distributor intent without duplicating Brand & Gift", () => {
  const source = read("app/(site)/distribution/page.tsx")

  assert.match(source, /International Coffee Distribution Partnerships/)
  assert.match(source, /What Partners Can Bring to Market/)
  assert.match(source, /Why Partner With OCC/)
  assert.match(source, /How a Distribution Partnership Works/)
  assert.match(source, /What to Include in Your Enquiry/)
  assert.match(source, /Target country or territory/)
  assert.match(source, /Import and logistics capability/)
  assert.match(source, /Estimated order volume/)
  assert.match(source, /Preferred exclusivity arrangement/)
  assert.match(source, /Discuss an International Distribution Partnership/)
  assert.match(source, /href="\/partnerships"/)
  assert.match(source, /"@type": "BreadcrumbList"/)
  assert.match(source, /pageAlternates\("\/distribution"\)/)
  assert.match(source, /src="\/hero-home\.webp"/)
  assert.doesNotMatch(source, /"@type": "Offer"|"@type": "Service"/)

  const partners = source.indexOf("Who We Work With")
  const products = source.indexOf("What Partners Can Bring to Market")
  const benefits = source.indexOf("Why Partner With OCC")
  const process = source.indexOf("How a Distribution Partnership Works")
  const qualify = source.indexOf("What to Include in Your Enquiry")
  assert.ok(partners >= 0 && partners < products && products < benefits && benefits < process && process < qualify)
})
