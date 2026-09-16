import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const read = (file) => fs.readFileSync(file, "utf8")

const routes = [
  "app/images/distribution-partnership.avif/route.ts",
  "app/images/about-origin-current.avif/route.ts",
  "app/images/about-quality-current.avif/route.ts",
]

test("legacy About image override and fallback pipeline is removed", () => {
  assert.equal(fs.existsSync("app/about-image-overrides.css"), false)
  assert.equal(fs.existsSync("components/site/about-image-fallback.tsx"), false)
  assert.equal(fs.existsSync("public/distribution-hero.webp"), false)
  assert.equal(fs.existsSync("public/about/about-why-occ.jpg"), false)

  const rootLayout = read("app/layout.tsx")
  const siteLayout = read("app/(site)/layout.tsx")

  assert.doesNotMatch(rootLayout, /about-image-overrides\.css/)
  assert.doesNotMatch(siteLayout, /AboutImageFallback/)
})

test("About and Distribution use route-backed current-generation AVIF assets", () => {
  const aboutTemplate = read("components/templates/about-editorial-template.tsx")
  const distributionPage = read("app/(site)/distribution/page.tsx")

  assert.doesNotMatch(aboutTemplate, /distribution-hero\.webp|about-why-occ\.jpg/)
  assert.doesNotMatch(distributionPage, /distribution-hero\.webp/)
  assert.match(distributionPage, /\/images\/distribution-partnership\.avif/)
  assert.match(aboutTemplate, /\/images\/about-origin-current\.avif/)
  assert.match(aboutTemplate, /\/images\/about-quality-current\.avif/)

  for (const route of routes) {
    assert.equal(fs.existsSync(route), true, `current image route must exist: ${route}`)
    const source = read(route)
    assert.match(source, /Content-Type": "image\/avif"/)
    assert.match(source, /Cache-Control": "public, max-age=31536000, immutable"/)
  }
})

test("new image sources contain materially more detail than the retired low-resolution fallbacks", () => {
  const sets = [
    ["lib/assets/distribution-current-chunk-1.ts", "lib/assets/distribution-current-chunk-2.ts", "lib/assets/distribution-current-chunk-3.ts", "lib/assets/distribution-current-chunk-4.ts", "lib/assets/distribution-current-chunk-5.ts"],
    ["lib/assets/about-origin-current-chunk-1.ts", "lib/assets/about-origin-current-chunk-2.ts", "lib/assets/about-origin-current-chunk-3.ts", "lib/assets/about-origin-current-chunk-4.ts", "lib/assets/about-origin-current-chunk-5.ts"],
    ["lib/assets/about-quality-current-chunk-1.ts", "lib/assets/about-quality-current-chunk-2.ts"],
  ]

  const minimumSourceText = [80_000, 95_000, 22_000]
  sets.forEach((files, index) => {
    const size = files.reduce((sum, file) => {
      assert.equal(fs.existsSync(file), true, `image byte chunk must exist: ${file}`)
      return sum + fs.statSync(file).size
    }, 0)
    assert.ok(size > minimumSourceText[index], `current-generation image source set is unexpectedly small: ${size}`)
  })
})
