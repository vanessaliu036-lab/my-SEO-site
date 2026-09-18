import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const source = fs.readFileSync("app/(site)/solutions/roasting-program/page.tsx", "utf8")

test("roasting page owns custom roasting intent without changing the shared template", () => {
  assert.match(source, /title: "Custom Coffee Roasting Cambodia \| OCC"/)
  assert.match(source, /pageAlternates\("\/solutions\/roasting-program"\)/)
  assert.match(source, /title="CUSTOM ROASTING PROGRAM"/)
  assert.match(source, /Coffee for Your Business\. Choose the Path That Fits\./)
  assert.match(source, /Choose the Path That Fits Your Business/)
  assert.match(source, /Three Steps to a Working Coffee Direction/)
  assert.match(source, /Bring the Product Goal\. We Start There\./)
  assert.match(source, /Cafés/)
  assert.match(source, /Coffee Brands/)
  assert.match(source, /Tell Us What You Need/)
  assert.match(source, /heroSecondaryCta/)
  assert.match(source, /"Fine Robusta": "\/fine-robusta-cambodia"/)
  assert.match(source, /"Wholesale Coffee Supply": "\/solutions\/wholesale"/)
  assert.match(source, /CommercialSolutionTemplate/)
  assert.doesNotMatch(
    source,
    /\n\s+wholesale:\s+"\/solutions\/wholesale"/,
    "short wholesale key must not reprocess the longer Wholesale Coffee Supply anchor",
  )
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
  assert.match(source, /ctaLabel="Tell Us What You Need"/)
})
