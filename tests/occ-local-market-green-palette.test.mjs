import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const source = fs.readFileSync("components/templates/local-market-solution-template.tsx", "utf8")

test("local-market solution template uses the approved About green palette", () => {
  assert.match(source, /<div className="bg-\[#2f3b2d\] text-\[#f3f1ea\]">/)
  assert.match(source, /sectionTitleClass = ".*text-\[#f3f1ea\]"/)
  assert.doesNotMatch(source, /<div className="bg-\[#f6f3ea\] text-\[#182019\]">/)
  assert.match(source, /border-white\/14/)
  assert.match(source, /hover:bg-\[#5c6f58\]\/40/)
  assert.match(source, /bg-\[#f3f1ea\].*text-\[#2f3b2d\]/)
  assert.doesNotMatch(source, /\/\d+\/\d+/, "Tailwind opacity modifiers must not be stacked")
})
