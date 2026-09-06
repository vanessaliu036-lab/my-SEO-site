import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const source = fs.readFileSync("app/(site)/solutions/roasting-program/page.tsx", "utf8")

test("roasting page owns custom roasting intent without changing the shared template", () => {
  assert.match(source, /title: "Custom Coffee Roasting Cambodia \| OCC Roasting Program"/)
  assert.match(source, /pageAlternates\("\/solutions\/roasting-program"\)/)
  assert.match(source, /title="CUSTOM COFFEE ROASTING PROGRAM"/)
  assert.match(source, /Build a Coffee Profile Around Your Business/)
  assert.match(source, /How the Roasting Program Works/)
  assert.match(source, /What We Can Develop/)
  assert.match(source, /Why Roast Development Matters/)
  assert.match(source, /From Roast Profile to Repeatable Coffee Program/)
  assert.match(source, /Cambodia Coffee and Fine Robusta Expertise/)
  assert.match(source, /What to Prepare Before You Contact OCC/)
  assert.match(source, /"Fine Robusta": "\/fine-robusta-cambodia"/)
  assert.match(source, /"Wholesale Coffee Supply": "\/solutions\/wholesale"/)
  assert.match(source, /SolutionDetailTemplate/)
})

test("roasting page keeps the current evidence boundary", () => {
  for (const pattern of [
    /minimum production batch/i,
    /2-3 weeks/i,
    /every batch is cupped before release/i,
    /batch consistency guarantee/i,
    /white-label packaging available/i,
    /we develop, test, and lock roast profiles/i,
    /"@type"\s*:\s*"Service"/,
    /"@type"\s*:\s*"Offer"/,
  ]) {
    assert.doesNotMatch(source, pattern)
  }

  assert.match(source, /renderWithLinks/)
  assert.match(source, /ctaLabel="Discuss your requirements"/)
})
