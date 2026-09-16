import test from "node:test"
import assert from "node:assert/strict"
import crypto from "node:crypto"
import fs from "node:fs"

const templatePath = "components/templates/about-editorial-template.tsx"
const originChunks = [1, 2, 3, 4, 5].map((n) => `lib/assets/about-origin-current-chunk-${n}.ts`)
const qualityChunks = [1, 2].map((n) => `lib/assets/about-quality-current-chunk-${n}.ts`)

const sourceHash = (files) => {
  const hash = crypto.createHash("sha256")
  files.forEach((file) => hash.update(fs.readFileSync(file)))
  return hash.digest("hex")
}

test("ABOUT hero and Why OCC use direct current-generation routes", () => {
  const template = fs.readFileSync(templatePath, "utf8")

  assert.match(template, /const heroImage = "\/images\/about-origin-current\.avif"/)
  assert.match(template, /const whyOccImage = "\/images\/about-quality-current\.avif"/)
  assert.doesNotMatch(template, /distribution-hero\.webp|hero-home\.webp|about-why-occ\.jpg/)

  for (const file of [...originChunks, ...qualityChunks]) {
    assert.equal(fs.existsSync(file), true, `current About image source must exist: ${file}`)
  }
  assert.notEqual(sourceHash(originChunks), sourceHash(qualityChunks), "About hero and Why OCC must use different source images")
})

test("ABOUT no longer depends on CSS overrides or a client fallback", () => {
  assert.equal(fs.existsSync("app/about-image-overrides.css"), false)
  assert.equal(fs.existsSync("components/site/about-image-fallback.tsx"), false)
})

test("ABOUT Ready-to-Sell keeps the full product composition visible on mobile without an override stylesheet", () => {
  const template = fs.readFileSync(templatePath, "utf8")
  assert.match(template, /data-about-panel=\{panel\.label\}/)
  assert.match(template, /panel\.label === "READY-TO-SELL" \? "bg-contain" : "bg-cover"/)
})
