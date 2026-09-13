import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const read = (path) => fs.readFileSync(path, "utf8")

test("OCC navigation is sourced from one six-section data file", () => {
  const nav = read("components/site/navigation-data.ts")
  const header = read("components/site/site-header.tsx")
  const mobile = read("components/site/mobile-menu.tsx")

  let cursor = -1
  for (const label of ["ABOUT", "ORIGINS", "SOLUTIONS", "BLOG", "CONTACT", "DISTRIBUTION"]) {
    const next = nav.indexOf(`label: "${label}"`)
    assert.ok(next > cursor, `${label} missing or out of order`)
    cursor = next
  }

  for (const forbidden of ["HOME", "COFFEE", "INSIGHTS", "CULTURE & ETHICS", "ORIGINAL"]) {
    assert.doesNotMatch(nav, new RegExp(`label:\\s*[\"']${forbidden}`))
  }

  assert.match(nav, /label: "DISTRIBUTION", href: "\/distribution"/)
  assert.match(nav, /label: "ORIGINS",\s*href: "\/origins"/)
  assert.match(nav, /label: "Cambodia & Regions", href: "\/origins\/cambodia-regions"/)
  assert.match(nav, /label: "Fine Robusta Cambodia", href: "\/fine-robusta-cambodia"/)
  assert.match(nav, /label: "Farm & Terroir", href: "\/origins\/farm-terroir"/)
  assert.doesNotMatch(nav, /Single Origin/)
  assert.doesNotMatch(nav, /Mondulkiri Origin Collection/)
  assert.doesNotMatch(nav, /Equipment Service/)
  assert.doesNotMatch(nav, /Barista Staffing/)
  assert.doesNotMatch(nav, /\/solutions\/equipment-service/)
  assert.doesNotMatch(nav, /\/solutions\/barista-staffing/)

  assert.match(nav, /label: "Wholesale", href: "\/solutions\/wholesale"/)
  assert.match(nav, /label: "Roasting Program", href: "\/solutions\/roasting-program"/)
  assert.match(nav, /label: "Coffee Marketing", href: "\/solutions\/coffee-marketing"/)

  assert.match(header, /siteNavigation\.map/)
  assert.match(mobile, /siteNavigation\.map/)
})
