import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const pagePath = "app/(site)/solutions/roasting-program/page.tsx"
const layoutPath = "app/(site)/solutions/roasting-program/layout.tsx"

test("roasting keeps its current content template and adds only one scoped background image", () => {
  const page = fs.readFileSync(pagePath, "utf8")
  assert.match(page, /CommercialSolutionTemplate/)
  assert.doesNotMatch(page, /heroImage=|highlightImage=|sectionImage=|processImage=/)

  assert.equal(fs.existsSync(layoutPath), true, "roasting route layout must exist")
  const layout = fs.readFileSync(layoutPath, "utf8")

  assert.match(layout, /roasting-program-page/)
  assert.match(layout, /occ-roasting-program-background\.webp/)
  assert.match(layout, /linear-gradient/)
  assert.match(layout, /#2F3B2D/i)
  assert.match(layout, /background-size:\s*cover/)
  assert.match(layout, /section > div\.grid\[class\*="bg-\[#202820\]"\]/)
  assert.equal((layout.match(/url\(['"]?\/images\//g) || []).length, 1, "roasting layout must reference exactly one image")
  assert.doesNotMatch(layout, /SiteHeader|SiteFooter|<footer|<header/)
})
