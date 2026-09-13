import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const read = (path) => fs.readFileSync(path, "utf8")

test("About uses public brand positioning instead of internal strategy language", () => {
  const about = read("components/templates/about-editorial-template.tsx")
  const page = read("app/(site)/about/page.tsx")

  for (const forbidden of ["Authority wedge", "Authority Wedge", "B2B Coffee Solutions", "quality authority and professional capability"]) {
    assert.doesNotMatch(`${about}\n${page}`, new RegExp(forbidden, "i"))
  }

  for (const required of ["100% Cambodian Origin", "Core Expertise", "Supply · Roasting · Market Access"]) {
    assert.match(about, new RegExp(required.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")))
  }
})

test("Origins is a public origin hub and does not expose retired architecture language", () => {
  const origins = read("app/(site)/origins/page.tsx")
  assert.doesNotMatch(origins, /former Single Origin role/i)
  assert.doesNotMatch(origins, /owns a different search intent/i)
  assert.match(origins, /traceability/i)
  assert.match(origins, /lot identity/i)
  assert.match(origins, /Cambodia & Regions/)
  assert.match(origins, /Farm & Terroir/)
  assert.match(origins, /Fine Robusta Cambodia/)
})

test("Farm & Terroir hands traceability back to the Origins hub", () => {
  const farm = read("app/(site)/origins/farm-terroir/page.tsx")
  assert.doesNotMatch(farm, /href="\/origins\/single-origin"/)
  assert.doesNotMatch(farm, />Single Origin</)
  assert.match(farm, /href="\/origins"/)
  assert.match(farm, /traceability|lot identity/i)
})
