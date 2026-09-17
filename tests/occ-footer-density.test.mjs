import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const footer = fs.readFileSync("components/site/site-footer.tsx", "utf8")
const cta = fs.readFileSync("components/site/site-final-cta.tsx", "utf8")

test("footer navigation avoids artificially tall empty rows", () => {
  assert.doesNotMatch(footer, /lg:min-h-\[180px\]/, "Do not force 180px navigation cells regardless of content")
  assert.doesNotMatch(footer, /lg:py-20/, "Avoid oversized footer outer padding")
  assert.doesNotMatch(footer, /lg:pb-16/, "Avoid oversized footer navigation bottom padding")
})

test("final CTA uses available width instead of reserving a three-column empty rail", () => {
  assert.doesNotMatch(cta, /md:col-start-5/, "CTA should not start at column five")
  assert.doesNotMatch(cta, /md:col-span-3/, "CTA label should not occupy three empty columns")
  assert.doesNotMatch(cta, /lg:py-28/, "CTA vertical spacing should be proportionate")
})
