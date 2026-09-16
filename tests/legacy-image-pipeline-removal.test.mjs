import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const read = (file) => fs.readFileSync(file, "utf8")

test("legacy About image override and fallback pipeline is removed", () => {
  assert.equal(fs.existsSync("app/about-image-overrides.css"), false)
  assert.equal(fs.existsSync("components/site/about-image-fallback.tsx"), false)

  const rootLayout = read("app/layout.tsx")
  const siteLayout = read("app/(site)/layout.tsx")

  assert.doesNotMatch(rootLayout, /about-image-overrides\.css/)
  assert.doesNotMatch(siteLayout, /AboutImageFallback/)
})

test("About and Distribution use direct current-generation image assets", () => {
  const aboutTemplate = read("components/templates/about-editorial-template.tsx")
  const distributionPage = read("app/(site)/distribution/page.tsx")

  assert.doesNotMatch(aboutTemplate, /distribution-hero\.webp|about-why-occ\.jpg/)
  assert.doesNotMatch(distributionPage, /distribution-hero\.webp/)
  assert.match(distributionPage, /\/images\/distribution-partnership\.webp/)
  assert.equal(fs.existsSync("public/images/distribution-partnership.webp"), true)
})
