import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const read = (path) => fs.readFileSync(path, "utf8")

test("OCC public shell restores the verified pre-admin navigation and exposes no admin entry", () => {
  const nav = read("components/Navigation.tsx")
  const sidebar = read("components/SiteSidebar.tsx")
  const shell = read("components/site/site-shell.tsx")

  let cursor = -1
  for (const label of ["ABOUT", "SOLUTIONS", "COLLECTION"]) {
    const next = nav.indexOf(label)
    assert.ok(next > cursor, `${label} missing or out of order`)
    cursor = next
  }
  for (const label of ["Blog", "Contact"]) assert.match(nav, new RegExp(label))
  assert.match(sidebar, /Navigation/)
  assert.match(shell, /SiteSidebar/)
  assert.doesNotMatch(`${nav}\n${sidebar}\n${shell}`, /\/admin|Staff Access/i)
})
