import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"
import { createHash } from "node:crypto"

const pagePath = "app/(site)/solutions/roasting-program/page.tsx"
const layoutPath = "app/(site)/solutions/roasting-program/layout.tsx"
const templatePath = "components/templates/commercial-solution-template.tsx"
const sharedLayoutPath = "app/(site)/layout.tsx"

const photoPaths = [
  "/images/roasting/roaster-evaluation.png",
  "/images/roasting/coffee-beans-reference.png",
]

test("roasting preserves its approved content, shared header and footer, and one scoped backdrop", () => {
  const page = fs.readFileSync(pagePath, "utf8")
  const layout = fs.readFileSync(layoutPath, "utf8")
  const siteLayout = fs.readFileSync(sharedLayoutPath, "utf8")
  assert.match(page, /CommercialSolutionTemplate/)
  assert.match(page, /CUSTOM ROASTING PROGRAM/)
  assert.match(page, /Your Market\. Your Customer\. Your Roast Profile\./)
  assert.match(page, /From Market to Production Profile/)
  assert.match(page, /Choose Our Profile\. Or Build Yours\./)
  assert.match(siteLayout, /SiteShell/)
  assert.match(layout, /roasting-program-page/)
  assert.match(layout, /occ-roasting-program-background\.webp/)
  assert.match(layout, /linear-gradient/)
  assert.match(layout, /#2F3B2D/i)
  assert.match(layout, /background-size:\s*cover/)
  assert.equal((layout.match(/url\(['"]?\/images\//g) || []).length, 1, "keep a single route-scoped background")
  assert.doesNotMatch(layout, /SiteHeader|SiteFooter|<footer|<header/)
})

test("roasting displays two distinct, locally hosted photographs from the approved OCC Drive set", () => {
  const page = fs.readFileSync(pagePath, "utf8")
  const template = fs.readFileSync(templatePath, "utf8")
  assert.match(page, /heroPhotos=\{/)
  assert.match(template, /heroPhotos\?\:/)
  assert.match(template, /heroPhotos\.map\(/)
  for (const url of photoPaths) {
    assert.ok(page.includes(url), `roasting must reference ${url}`)
    assert.equal(fs.existsSync(`public${url}`), true, `missing OCC Drive image: ${url}`)
  }
  assert.match(page, /alt: "[^"]+"/)
  const digests = photoPaths.map((url) => createHash("sha256").update(fs.readFileSync(`public${url}`)).digest("hex"))
  assert.notEqual(digests[0], digests[1], "roasting photographs must not duplicate one another")
  assert.doesNotMatch(fs.readFileSync("app/(site)/solutions/wholesale/page.tsx", "utf8"), /\/images\/roasting\//)
})
