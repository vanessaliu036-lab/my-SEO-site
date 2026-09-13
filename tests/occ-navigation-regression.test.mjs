import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const read = (path) => fs.readFileSync(path, "utf8")

test("OCC navigation follows the approved conversion sequence while preserving evidence routes", () => {
  const nav = read("components/site/navigation-data.ts")
  const header = read("components/site/site-header.tsx")
  const mobile = read("components/site/mobile-menu.tsx")

  let cursor = -1
  for (const label of ["ABOUT", "SOLUTIONS", "ORIGINAL", "BLOG", "CONTACT"]) {
    const next = nav.indexOf(`label: \"${label}\"`)
    assert.ok(next > cursor, `${label} missing or out of order`)
    cursor = next
  }

  for (const forbidden of ["HOME", "COFFEE", "INSIGHTS", "CULTURE & ETHICS", "DISTRIBUTION", "ORIGINS"]) {
    assert.doesNotMatch(nav, new RegExp(`label:\\s*[\"']${forbidden}`))
  }

  assert.match(nav, /label: "ORIGINAL",\s*href: "\/original"/)
  assert.match(nav, /label: "Wholesale & Sourcing", href: "\/solutions\/wholesale"/)
  assert.match(nav, /label: "Roasted Coffee Supply", href: "\/solutions\/roasted-coffee-supply"/)
  assert.match(nav, /label: "Roasting Program", href: "\/solutions\/roasting-program"/)
  assert.match(nav, /label: "Distribution Partnership", href: "\/distribution"/)
  assert.match(nav, /label: "Origin Evidence", href: "\/origins"/)
  assert.match(nav, /label: "Fine Robusta Cambodia", href: "\/fine-robusta-cambodia"/)
  assert.match(nav, /label: "Farm & Terroir", href: "\/origins\/farm-terroir"/)
  assert.doesNotMatch(nav, /Barista Staffing|Equipment Service/)
  assert.doesNotMatch(nav, /\/solutions\/(barista-staffing|equipment-service)/)

  assert.match(header, /siteNavigation\.map/)
  assert.match(mobile, /siteNavigation\.map/)
})
