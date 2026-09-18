import test from "node:test"
import assert from "node:assert/strict"
import crypto from "node:crypto"
import fs from "node:fs"
import path from "node:path"

const cssPath = "app/about-image-overrides.css"
const layoutPath = "app/layout.tsx"
const publicSiteLayoutPath = "app/(site)/layout.tsx"
const aboutLayoutPath = "app/(site)/about/layout.tsx"
const heroRoutePath = "app/(site)/about/hero-image/route.ts"
const mobileFallbackPath = "components/site/about-image-fallback.tsx"
const whyOccWebpPath = "public/about/about-why.webp"

const sha256 = (filePath) =>
  crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex")

test("ABOUT major visual slots use one dedicated hero route plus five independent route-owned WebPs", () => {
  assert.equal(fs.existsSync(cssPath), true)

  const css = fs.readFileSync(cssPath, "utf8")
  const layout = fs.readFileSync(layoutPath, "utf8")
  const aboutLayout = fs.readFileSync(aboutLayoutPath, "utf8")
  const heroRoute = fs.readFileSync(heroRoutePath, "utf8")

  assert.match(
    layout,
    /import "\.\/globals\.css";\s*import "\.\/about-image-overrides\.css";/,
    "ABOUT effective image sources must load after globals.css",
  )

  const sourceOnlyCss = css.split("/* Mobile route-owned safety net. */")[0]
  const imageSources = [...sourceOnlyCss.matchAll(/background-image:\s*url\(["']?([^"')]+)["']?\)\s*!important;/g)].map(
    (match) => match[1],
  )

  assert.deepEqual(imageSources, [
    "/about/hero-image",
    "/about/about-why.webp",
    "/about/about-origin.webp",
    "/about/about-fine.webp",
    "/about/about-ready.webp",
    "/about/about-made.webp",
  ])

  assert.match(aboutLayout, /background-image:\s*url\("\/about\/hero-image"\)\s*!important/)
  assert.match(heroRoute, /Content-Type":\s*"image\/avif"/)

  for (const retired of [
    "/hero-home.webp",
    "/distribution-hero.webp",
    "/about/about-origin.svg",
    "/about/about-fine-robusta.svg",
    "/about/occ-about-atlas.avif",
    "/about/about-made-for-you.svg",
    "/about/about-why-occ.jpg",
  ]) {
    assert.equal(imageSources.includes(retired), false, `ABOUT must not reuse retired/cross-route source: ${retired}`)
  }

  const staticSources = imageSources.filter((source) => source.endsWith(".webp"))
  const sourceHashes = staticSources.map((source) => {
    const publicPath = path.join("public", source.replace(/^\/+/, ""))
    assert.equal(fs.existsSync(publicPath), true, `ABOUT image source does not exist: ${source}`)
    const bytes = fs.readFileSync(publicPath)
    assert.ok(bytes.length > 10_000, `ABOUT image source is unexpectedly small: ${source}`)
    assert.equal(bytes.subarray(0, 4).toString("ascii"), "RIFF", `ABOUT image must be a valid WebP RIFF container: ${source}`)
    assert.equal(bytes.subarray(8, 12).toString("ascii"), "WEBP", `ABOUT image must be a valid WebP file: ${source}`)
    return sha256(publicPath)
  })

  assert.equal(new Set(sourceHashes).size, sourceHashes.length, "ABOUT repeats identical source bytes under different paths")
})

test("ABOUT Why OCC mobile fallback uses the same route-owned WebP", () => {
  const css = fs.readFileSync(cssPath, "utf8")
  const publicSiteLayout = fs.readFileSync(publicSiteLayoutPath, "utf8")
  const fallback = fs.readFileSync(mobileFallbackPath, "utf8")

  assert.match(publicSiteLayout, /import \{ AboutImageFallback \}/)
  assert.match(publicSiteLayout, /<AboutImageFallback \/>/)
  assert.match(fallback, /usePathname/)
  assert.match(fallback, /Cambodian coffee origin and production/)
  assert.match(fallback, /const WHY_OCC_SOURCE = "\/about\/about-why\.webp"/)
  assert.match(fallback, /lg:hidden/)

  assert.equal(fs.existsSync(whyOccWebpPath), true)
  const webp = fs.readFileSync(whyOccWebpPath)
  assert.ok(webp.length > 40_000, "Why OCC WebP must retain enough image data for the large visual slot")
  assert.equal(webp.subarray(0, 4).toString("ascii"), "RIFF")
  assert.equal(webp.subarray(8, 12).toString("ascii"), "WEBP")

  assert.match(
    css,
    /\/\* Mobile route-owned safety net\. \*\/[\s\S]*?@media \(max-width: 1023px\)[\s\S]*?Cambodian coffee origin and production[\s\S]*?about-why\.webp/,
  )
  assert.doesNotMatch(css, /about-why-occ\.jpg/)
  assert.doesNotMatch(fallback, /about-why-occ\.jpg/)
  assert.match(fallback, /element\.style\.position = "relative"/)
  assert.match(fallback, /\}, \[pathname\]\)/)
  assert.match(fallback, /createPortal\(/)
})

test("ABOUT Ready-to-Sell keeps the full product composition visible on mobile", () => {
  const css = fs.readFileSync(cssPath, "utf8")

  assert.match(
    css,
    /@media \(max-width: 1023px\)[\s\S]*?OCC origin and commercial paths"\] > a:nth-child\(3\) > div:first-child[\s\S]*?background-size:\s*contain\s*!important[\s\S]*?background-position:\s*center\s*!important/,
  )
})
