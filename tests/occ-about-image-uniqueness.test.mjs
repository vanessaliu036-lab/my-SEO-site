import test from "node:test"
import assert from "node:assert/strict"
import crypto from "node:crypto"
import fs from "node:fs"
import path from "node:path"

const cssPath = "app/about-image-overrides.css"
const layoutPath = "app/layout.tsx"
const publicSiteLayoutPath = "app/(site)/layout.tsx"
const mobileFallbackPath = "components/site/about-image-fallback.tsx"
const whyOccRoutePath = "app/images/about-why-occ.jpg/route.ts"
const whyOccChunkPaths = [1, 2, 3, 4, 5].map((index) => `lib/assets/about-why-occ-jpeg-chunk-${index}.ts`)

const sha256 = (filePath) =>
  crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex")

const extractChunk = (source) => {
  const match = source.match(/=\s*"([A-Za-z0-9+/=]+)"\s*$/m)
  assert.ok(match, "JPEG asset chunk must export one base64 string")
  return match[1]
}

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
    /import "\.\/globals\.css";\s*import "\.\/about-image-overrides\.css";/,
    "ABOUT image overrides must load after globals.css so they are the effective image sources",
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

  const imageSources = [...css.matchAll(/background-image:\s*url\(["']?([^"')]+)["']?\)\s*!important;/g)].map(
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

test("ABOUT Why OCC mobile fallback serves a real JPEG route for iOS Safari", () => {
  const publicSiteLayout = fs.readFileSync(publicSiteLayoutPath, "utf8")
  const fallback = fs.readFileSync(mobileFallbackPath, "utf8")

  assert.match(publicSiteLayout, /import \{ AboutImageFallback \}/)
  assert.match(publicSiteLayout, /<AboutImageFallback \/>/)
  assert.match(fallback, /usePathname/)
  assert.match(fallback, /Cambodian coffee origin and production/)
  assert.match(fallback, /const WHY_OCC_SOURCE = "\/images\/about-why-occ\.jpg"/)

  assert.equal(fs.existsSync(whyOccRoutePath), true, "Why OCC JPEG route must exist")
  const route = fs.readFileSync(whyOccRoutePath, "utf8")
  assert.match(route, /"Content-Type": "image\/jpeg"/)
  assert.match(route, /Buffer\.from\(/)

  for (const chunkPath of whyOccChunkPaths) {
    assert.equal(fs.existsSync(chunkPath), true, `Why OCC JPEG chunk is missing: ${chunkPath}`)
  }
  const base64 = whyOccChunkPaths.map((chunkPath) => extractChunk(fs.readFileSync(chunkPath, "utf8"))).join("")
  const jpeg = Buffer.from(base64, "base64")
  assert.ok(jpeg.length > 10_000, "Why OCC JPEG must not be an empty placeholder")
  assert.equal(jpeg[0], 0xff, "Why OCC asset must start with JPEG SOI marker")
  assert.equal(jpeg[1], 0xd8, "Why OCC asset must start with JPEG SOI marker")
  assert.equal(jpeg[jpeg.length - 2], 0xff, "Why OCC asset must end with JPEG EOI marker")
  assert.equal(jpeg[jpeg.length - 1], 0xd9, "Why OCC asset must end with JPEG EOI marker")

  assert.match(fallback, /element\.style\.position = "relative"/)
  assert.match(fallback, /\}, \[pathname\]\)/)
  assert.match(fallback, /createPortal\(/)
  assert.match(fallback, /<img[\s\S]*?src=\{WHY_OCC_SOURCE\}[\s\S]*?object-cover/)
})
