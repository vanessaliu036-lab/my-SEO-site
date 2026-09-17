import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const templatePath = "components/templates/about-editorial-template.tsx"
const layoutPath = "app/layout.tsx"
const globalsPath = "app/globals.css"
const cssPath = "app/about-image-overrides.css"
const publicSiteLayoutPath = "app/(site)/layout.tsx"
const mobileFallbackPath = "components/site/about-image-fallback.tsx"
const whyOccJpegPath = "public/about/about-why-occ.jpg"

test("ABOUT image sources are route-owned rather than globally overridden", () => {
  const template = fs.readFileSync(templatePath, "utf8")
  const layout = fs.readFileSync(layoutPath, "utf8")
  const globals = fs.readFileSync(globalsPath, "utf8")

  assert.equal(fs.existsSync(cssPath), false, "legacy global About image-source lock must be removed")
  assert.doesNotMatch(layout, /about-image-overrides\.css/)
  assert.doesNotMatch(globals, /background-image:\s*url\(["']?\/about\//)
  assert.match(template, /const heroImage = "\/about\/about-why-occ\.jpg"/)
  assert.match(template, /const whyOccImage = "\/distribution-hero\.webp"/)
  assert.doesNotMatch(template, /image: "\/about\/about-origin\.svg"/)
  assert.doesNotMatch(template, /image: "\/about\/about-fine-robusta\.svg"/)
  assert.doesNotMatch(template, /image: "\/about\/about-made-for-you\.svg"/)
})

test("ABOUT Why OCC keeps its directly decodable JPEG safety net on mobile Safari", () => {
  const publicSiteLayout = fs.readFileSync(publicSiteLayoutPath, "utf8")
  const fallback = fs.readFileSync(mobileFallbackPath, "utf8")

  assert.match(publicSiteLayout, /import \{ AboutImageFallback \}/)
  assert.match(publicSiteLayout, /<AboutImageFallback \/>/)
  assert.match(fallback, /usePathname/)
  assert.match(fallback, /Cambodian coffee origin and production/)
  assert.match(fallback, /const WHY_OCC_SOURCE = "\/about\/about-why-occ\.jpg"/)
  assert.match(fallback, /lg:hidden/)

  assert.equal(fs.existsSync(whyOccJpegPath), true)
  const jpeg = fs.readFileSync(whyOccJpegPath)
  assert.ok(jpeg.length > 3_000)
  assert.equal(jpeg[0], 0xff)
  assert.equal(jpeg[1], 0xd8)
  assert.equal(jpeg[jpeg.length - 2], 0xff)
  assert.equal(jpeg[jpeg.length - 1], 0xd9)
  assert.match(fallback, /element\.style\.position = "relative"/)
  assert.match(fallback, /createPortal\(/)
})

test("ABOUT Ready-to-Sell keeps the full product composition visible on mobile", () => {
  const globals = fs.readFileSync(globalsPath, "utf8")
  assert.match(
    globals,
    /@media \(max-width: 1023px\)[\s\S]*?OCC origin and commercial paths"\] > a:nth-child\(3\) > div:first-child[\s\S]*?background-size:\s*contain\s*!important[\s\S]*?background-position:\s*center\s*!important/,
  )
})
