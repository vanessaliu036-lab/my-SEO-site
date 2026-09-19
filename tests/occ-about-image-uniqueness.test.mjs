import test from "node:test"
import assert from "node:assert/strict"
import crypto from "node:crypto"
import fs from "node:fs"
import path from "node:path"

const cssPath = "app/(site)/about/about-images.css"
const layoutPath = "app/(site)/about/layout.tsx"
const publicSiteLayoutPath = "app/(site)/layout.tsx"
const mobileFallbackPath = "components/site/about-image-fallback.tsx"

const sha256 = (filePath) =>
  crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex")

test("ABOUT major visual slots use six independent image sources and hashes", () => {
  assert.equal(
    fs.existsSync(cssPath),
    true,
    "ABOUT must define a dedicated image-source override file so visual-slot sources can be audited",
  )

  const css = fs.readFileSync(cssPath, "utf8")
  const layout = fs.readFileSync(layoutPath, "utf8")

  assert.match(
    layout,
    /import "\.\/about-images\.css"/,
    "ABOUT image overrides must be owned by the About route layout",
  )

  assert.match(css, /aria-label="Cambodian coffee at origin"/)
  assert.match(css, /aria-label="Cambodian coffee origin and production"/)
  for (let index = 1; index <= 4; index += 1) {
    assert.match(
      css,
      new RegExp(`OCC origin and commercial paths"\\] > a:nth-child\\(${index}\\)`),
      `gallery slot ${index} must have an explicit audited image source`,
    )
  }

  const sourceOnlyCss = css.split("/* Mobile safety net keeps the Why OCC photo source unique to that visual slot. */")[0]
  const imageSources = [...sourceOnlyCss.matchAll(/background-image:\s*url\(["']?([^"')]+)["']?\)\s*!important;/g)].map(
    (match) => match[1],
  )

  assert.equal(imageSources.length, 6, "ABOUT must expose exactly six major visual-slot image sources")
  assert.equal(
    new Set(imageSources).size,
    imageSources.length,
    `ABOUT repeats an image path: ${imageSources.join(", ")}`,
  )

  const sourceHashes = imageSources.map((source) => {
    const cleanSource = source.split("?")[0].split("#")[0]
    const publicPath = path.join("public", cleanSource.replace(/^\/+/, ""))
    assert.equal(fs.existsSync(publicPath), true, `ABOUT image source does not exist: ${source}`)
    return sha256(publicPath)
  })

  assert.equal(
    new Set(sourceHashes).size,
    sourceHashes.length,
    "ABOUT repeats identical source bytes under different image paths; a different crop or filename does not count as a new source image",
  )
})

test("ABOUT Why OCC keeps one unique photo source across responsive layouts", () => {
  const css = fs.readFileSync(cssPath, "utf8")
  const publicSiteLayout = fs.readFileSync(publicSiteLayoutPath, "utf8")
  const fallback = fs.readFileSync(mobileFallbackPath, "utf8")

  assert.match(publicSiteLayout, /import \{ AboutImageFallback \}/)
  assert.match(publicSiteLayout, /<AboutImageFallback \/>/)
  assert.match(fallback, /usePathname/)
  assert.match(fallback, /Cambodian coffee origin and production/)
  assert.match(fallback, /const WHY_OCC_SOURCE = "\/about\/occ-about-intro\.webp"/)
  assert.match(fallback, /lg:hidden/)

  assert.match(
    css,
    /\/\* Mobile safety net keeps the Why OCC photo source unique to that visual slot\. \*\/[\s\S]*?@media \(max-width: 1023px\)[\s\S]*?Cambodian coffee origin and production[\s\S]*?occ-about-intro\.webp/,
    "Why OCC must keep the same unique photo source on mobile as a no-JS safety net",
  )
  assert.match(fallback, /element\.style\.position = "relative"/)
  assert.match(fallback, /\}, \[pathname\]\)/)
  assert.match(fallback, /createPortal\(/)
})

test("ABOUT Ready-to-Sell keeps the full product composition visible on mobile", () => {
  const css = fs.readFileSync(cssPath, "utf8")

  assert.match(
    css,
    /@media \(max-width: 1023px\)[\s\S]*?OCC origin and commercial paths"\] > a:nth-child\(3\) > div:first-child[\s\S]*?background-size:\s*contain\s*!important[\s\S]*?background-position:\s*center\s*!important/,
    "Ready-to-Sell must use contain on mobile so the complete product image is not cropped away",
  )
})
