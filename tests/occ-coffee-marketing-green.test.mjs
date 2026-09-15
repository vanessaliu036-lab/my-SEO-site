import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const read = (path) => fs.readFileSync(path, "utf8")
const localMarket = read("components/templates/local-market-solution-template.tsx")
const origins = read("app/(site)/origins/page.tsx")
const css = read("app/(site)/occ-visual-overrides.css")

test("coffee marketing template uses the approved About green palette", () => {
  assert.match(localMarket, /bg-\[#2f3b2d\] text-\[#f3f1ea\]/)
  assert.doesNotMatch(localMarket, /<div className="bg-\[#f6f3ea\] text-\[#182019\]">/)
  assert.match(localMarket, /border-white\/15/)
  assert.match(localMarket, /text-white\/7[0268]/)
})

test("About and Origins use the same approved dark green for dark visual surfaces", () => {
  assert.match(css, /section#why-occ\s*\{[\s\S]*?background-color:\s*#2f3b2d\s*!important/)
  assert.doesNotMatch(origins, /bg-\[#202820\]/)
  assert.match(origins, /bg-\[#2f3b2d\]/)
})

test("product-led About gallery image keeps the complete product visible", () => {
  assert.match(css, /a:nth-child\(3\) > div:first-child\s*\{[\s\S]*?background-size:\s*contain\s*!important/)
  assert.match(css, /a:nth-child\(3\) > div:first-child\s*\{[\s\S]*?background-color:\s*#2f3b2d\s*!important/)
  assert.match(css, /a:nth-child\(3\):hover > div:first-child\s*\{[\s\S]*?transform:\s*none\s*!important/)
})
