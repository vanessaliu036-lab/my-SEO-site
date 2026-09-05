import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, "..")

const files = {
  wholesale: "app/(site)/solutions/wholesale/page.tsx",
  roasting: "app/(site)/solutions/roasting-program/page.tsx",
  staffing: "app/(site)/solutions/barista-staffing/page.tsx",
  equipment: "app/(site)/solutions/equipment-service/page.tsx",
}

const source = Object.fromEntries(
  Object.entries(files).map(([key, rel]) => [key, fs.readFileSync(path.join(root, rel), "utf8")]),
)

const forbiddenByPage = {
  wholesale: [
    /minimum order/i,
    /volume discounts/i,
    /weekly or bi-weekly delivery/i,
    /sourced directly from cambodian farms/i,
    /every batch is traceable/i,
    /dedicated account manager/i,
    /service major provincial cities/i,
    /no middlemen/i,
  ],
  roasting: [
    /minimum production batch/i,
    /2-3 weeks/i,
    /every batch is cupped before release/i,
    /batch consistency guarantee/i,
    /white-label packaging available/i,
    /we develop, test, and lock roast profiles/i,
  ],
  staffing: [
    /occ places trained baristas/i,
    /trained in-house/i,
    /sca-aligned training before placement/i,
    /replacement guarantee/i,
    /first 30 days/i,
    /we can match based on language requirements/i,
  ],
  equipment: [
    /occ's equipment service covers/i,
    /maintenance contracts/i,
    /occ's technicians/i,
    /same-day response/i,
    /common wear parts are stocked/i,
    /la marzocco|synesso|nuova simonelli|mahlkonig|mazzer/i,
  ],
}

test("solutions pages do not publish unverified Service or Offer schema", () => {
  for (const [key, text] of Object.entries(source)) {
    assert.doesNotMatch(text, /"@type"\s*:\s*"Service"/, `${key} still publishes Service schema`)
    assert.doesNotMatch(text, /"@type"\s*:\s*"Offer"/, `${key} still publishes Offer schema`)
  }
})

test("solutions pages remove hard operational claims without evidence", () => {
  for (const [key, patterns] of Object.entries(forbiddenByPage)) {
    for (const pattern of patterns) {
      assert.doesNotMatch(source[key], pattern, `${key} still contains ${pattern}`)
    }
  }
})

test("solutions pages keep stable canonical routes", () => {
  assert.match(source.wholesale, /pageAlternates\("\/solutions\/wholesale"\)/)
  assert.match(source.roasting, /pageAlternates\("\/solutions\/roasting-program"\)/)
  assert.match(source.staffing, /pageAlternates\("\/solutions\/barista-staffing"\)/)
  assert.match(source.equipment, /pageAlternates\("\/solutions\/equipment-service"\)/)
})

test("solutions CTAs are inquiry-led rather than transaction-led", () => {
  for (const [key, text] of Object.entries(source)) {
    assert.doesNotMatch(text, /ctaLabel="Request a quote"/i, `${key} still uses transaction-led CTA`)
    assert.match(text, /ctaLabel="(?:Discuss your requirements|Ask about this area|Talk to our team)"/i)
  }
})

test("solutions hub keeps B2B commercial intent without unsupported operating promises", () => {
  const indexPage = fs.readFileSync(path.join(root, "app/(site)/solutions/page.tsx"), "utf8")
  const indexTemplate = fs.readFileSync(path.join(root, "components/templates/solutions-index-template.tsx"), "utf8")
  const detailTemplate = fs.readFileSync(path.join(root, "components/templates/solution-detail-template.tsx"), "utf8")
  const combined = `${indexPage}\n${indexTemplate}\n${detailTemplate}`

  for (const pattern of [
    /B2B Coffee Infrastructure/i,
    /Direct-origin beans, flexible delivery, account management/i,
    /Custom profiles, white-label, and batch consistency/i,
    /Trained baristas for venues, offices, and events/i,
    /Installation, maintenance, and emergency repair/i,
    /one operating ecosystem/i,
    /Four programs built for operators who need supply, craft, people, and uptime in one ecosystem/i,
    /Request a quote/i,
    /combine supply, roasting, staffing, and equipment support around your operation/i,
  ]) {
    assert.doesNotMatch(combined, pattern, `solutions hub still contains unsupported operating-positioning phrase ${pattern}`)
  }

  assert.match(indexPage, /B2B/i)
  assert.match(indexPage, /sourcing/i)
  assert.match(indexPage, /enquir/i)
  assert.match(indexPage, /evidence-led/i)
  assert.match(indexTemplate, /B2B coffee solution areas/i)
  assert.match(indexTemplate, /due diligence/i)
  assert.match(detailTemplate, /Coffee Authority &amp; B2B Solutions/)
  assert.match(indexPage, /pageAlternates\("\/solutions"\)/)
  assert.match(indexPage, /"@type": "CollectionPage"/)
})
