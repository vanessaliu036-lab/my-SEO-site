import test from "node:test"
import assert from "node:assert/strict"
import crypto from "node:crypto"
import fs from "node:fs"

const templatePath = "components/templates/about-editorial-template.tsx"
const originAsset = "public/images/about-origin-current.webp"
const qualityAsset = "public/images/about-quality-current.webp"

const sha256 = (filePath) =>
  crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex")

test("ABOUT hero and Why OCC use direct current-generation assets", () => {
  const template = fs.readFileSync(templatePath, "utf8")

  assert.match(template, /const heroImage = "\/images\/about-origin-current\.webp"/)
  assert.match(template, /const whyOccImage = "\/images\/about-quality-current\.webp"/)
  assert.doesNotMatch(template, /distribution-hero\.webp|hero-home\.webp|about-why-occ\.jpg/)

  assert.equal(fs.existsSync(originAsset), true, "current About origin image must exist")
  assert.equal(fs.existsSync(qualityAsset), true, "current About quality image must exist")
  assert.ok(fs.statSync(originAsset).size > 200_000, "About origin image must retain high-detail source quality")
  assert.ok(fs.statSync(qualityAsset).size > 70_000, "About quality image must retain high-detail source quality")
  assert.notEqual(sha256(originAsset), sha256(qualityAsset), "About hero and Why OCC must use different source images")
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
