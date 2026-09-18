import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"
import { createHash } from "node:crypto"

const pagePath = "app/(site)/solutions/roasting-program/page.tsx"
const layoutPath = "app/(site)/solutions/roasting-program/layout.tsx"
const sharedLayoutPath = "app/(site)/layout.tsx"
const photoPaths = [
  "/images/roasting/roaster-evaluation.png",
  "/images/roasting/coffee-beans-reference.png",
]

test("roasting retains all approved content and the global SiteShell", () => {
  const page = fs.readFileSync(pagePath, "utf8")
  const layout = fs.readFileSync(layoutPath, "utf8")
  const siteLayout = fs.readFileSync(sharedLayoutPath, "utf8")
  for (const heading of ["CUSTOM ROASTING PROGRAM", "Your Market. Your Customer. Your Roast Profile.", "From Market to Production Profile", "Choose Our Profile. Or Build Yours."]) {
    assert.ok(page.includes(heading), `approved copy missing: ${heading}`)
  }
  assert.match(page, /CommercialSolutionTemplate/)
  assert.match(siteLayout, /SiteShell/)
  assert.match(layout, /roasting-program-page/)
  assert.match(layout, /occ-roasting-program-background\.webp/)
  assert.match(layout, /linear-gradient/)
  assert.match(layout, /#2F3B2D/i)
  assert.match(layout, /background-size:\s*cover/)
  assert.equal((layout.match(/url\(['"]?\/images\//g) || []).length, 1, "keep only one route-scoped CSS background")
  assert.doesNotMatch(layout, /SiteHeader|SiteFooter|<footer|<header/)
})

test("roasting integrates two different photos from approved OCC Drive using local owned assets and alt text", () => {
  const layout = fs.readFileSync(layoutPath, "utf8")
  assert.match(layout, /roasting-photo-gallery/)
  assert.equal((layout.match(/<Image\b/g) || []).length, 2)
  for (const url of photoPaths) {
    assert.ok(layout.includes(url), `roasting layout must render ${url}`)
    assert.equal(fs.existsSync(`public${url}`), true, `missing OCC Drive image: ${url}`)
  }
  assert.equal((layout.match(/\balt="[^"]+"/g) || []).length, 2)
  const digests = photoPaths.map((url) => createHash("sha256").update(fs.readFileSync(`public${url}`)).digest("hex"))
  assert.notEqual(digests[0], digests[1], "image content must not be duplicated")
  assert.doesNotMatch(fs.readFileSync("app/(site)/solutions/wholesale/page.tsx", "utf8"), /\/images\/roasting\//)
})
