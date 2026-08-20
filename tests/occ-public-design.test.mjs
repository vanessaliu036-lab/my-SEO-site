import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const read = (path) => fs.readFileSync(path, "utf8")

test("public chrome exposes all seven OCC categories and removes legacy sidebar from root layout", () => {
  const nav = read("components/ui/public-top-nav.tsx")
  const layout = read("app/layout.tsx")

  for (const label of [
    "HOME",
    "ABOUT",
    "COFFEE",
    "COLLECTION",
    "INSIGHTS",
    "SOLUTIONS",
    "CULTURE & ETHICS",
  ]) {
    assert.match(nav, new RegExp(label.replace("&", "\\&")))
  }

  assert.doesNotMatch(layout, /SiteSidebar/)
  assert.match(layout, /PublicSiteChrome/)
})
