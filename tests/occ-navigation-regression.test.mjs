import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const read = (path) => fs.readFileSync(path, "utf8")

test("OCC public shell uses one unified top navigation with no legacy sidebar or collection entries", () => {
  const shell = read("components/site/site-shell.tsx")
  const header = read("components/site/site-header.tsx")
  const navigationData = read("components/site/navigation-data.ts")

  assert.match(shell, /SiteHeader/)
  assert.doesNotMatch(shell, /SiteSidebar|components\/Navigation/)
  assert.match(header, /siteNavigation/)
  assert.match(header, /sticky|absolute/)

  for (const label of ["ABOUT", "SOLUTIONS", "BLOG", "CONTACT"]) {
    assert.match(navigationData, new RegExp(label))
  }

  assert.doesNotMatch(
    `${shell}\n${header}\n${navigationData}`,
    /SINGLE ORIGIN|Mondulkiri Origin Collection|SOVANN|PREK|ANGKAR|\/collection\/|\/admin|Staff Access/i,
  )
})
