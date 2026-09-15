import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const templatePath = "components/templates/local-market-solution-template.tsx"
const template = fs.readFileSync(templatePath, "utf8")

test("coffee marketing template uses the approved About green palette", () => {
  assert.match(template, /bg-\[#2f3b2d\] text-\[#f3f1ea\]/)
  assert.doesNotMatch(template, /<div className="bg-\[#f6f3ea\] text-\[#182019\]">/)
  assert.match(template, /border-white\/15/)
  assert.match(template, /text-white\/7[0268]/)
})
