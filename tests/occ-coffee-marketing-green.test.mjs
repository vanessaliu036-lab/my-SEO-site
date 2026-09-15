import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const read = (path) => fs.readFileSync(path, "utf8")
const localMarket = read("components/templates/local-market-solution-template.tsx")
const about = read("components/templates/about-editorial-template.tsx")
const origins = read("app/(site)/origins/page.tsx")

test("coffee marketing template uses the approved About green palette", () => {
  assert.match(localMarket, /bg-\[#2f3b2d\] text-\[#f3f1ea\]/)
  assert.doesNotMatch(localMarket, /<div className="bg-\[#f6f3ea\] text-\[#182019\]">/)
  assert.match(localMarket, /border-white\/15/)
  assert.match(localMarket, /text-white\/7[0268]/)
})

test("About and Origins use the same approved dark green for dark visual surfaces", () => {
  assert.doesNotMatch(about, /bg-\[#5c6f58\]/)
  assert.match(about, /id="why-occ" className="relative overflow-hidden bg-\[#2f3b2d\]/)
  assert.doesNotMatch(origins, /bg-\[#202820\]/)
  assert.match(origins, /bg-\[#2f3b2d\]/)
})

test("product-led About gallery image keeps the complete product visible", () => {
  assert.match(about, /label: "READY-TO-SELL"[\s\S]*?fit: "contain"/)
  assert.match(about, /backgroundSize: panel\.fit \?\? "cover"/)
  assert.match(about, /panel\.fit === "contain" \? "" : "group-hover:scale-\[1\.025\]"/)
})
