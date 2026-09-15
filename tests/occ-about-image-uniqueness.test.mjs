import test from "node:test"
import assert from "node:assert/strict"
import crypto from "node:crypto"
import fs from "node:fs"
import path from "node:path"

const cssPath = "app/about-image-overrides.css"
const layoutPath = "app/layout.tsx"

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
