import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const read = (path) => fs.readFileSync(path, "utf8")

test("OCC public navigation keeps the original five independent top-level groups", () => {
  const nav = read("components/ui/public-top-nav.tsx")
  const home = read("app/HomePageClient.tsx")

  for (const label of ["ABOUT", "SOLUTIONS", "COLLECTION", "BLOG", "CONTACT"]) {
    assert.match(nav, new RegExp(label))
    assert.match(home, new RegExp(label, "i"))
  }

  for (const forbidden of ["HOME", "COFFEE", "INSIGHTS", "CULTURE & ETHICS"]) {
    assert.doesNotMatch(nav, new RegExp(`label: \\"${forbidden}\\"`))
  }

  assert.match(nav, /Mission/)
  assert.match(nav, /Founder/)
  assert.match(nav, /Manifesto/)
  assert.match(nav, /Sustainability/)
  assert.match(nav, /Wholesale/)
  assert.match(nav, /Roasting Program/)
  assert.match(nav, /Barista Staffing/)
  assert.match(nav, /Equipment Service/)
  assert.match(nav, /Mondulkiri Origin Collection/)
  assert.match(nav, /SOVANN/)
  assert.match(nav, /PREK/)
  assert.match(nav, /ANGKAR/)
})
