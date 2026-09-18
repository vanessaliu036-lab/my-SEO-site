import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8")
const files = {
  wholesale: "app/(site)/solutions/wholesale/page.tsx",
  roasting: "app/(site)/solutions/roasting-program/page.tsx",
  marketing: "app/(site)/solutions/coffee-marketing/page.tsx",
  equipment: "app/(site)/solutions/equipment-service/page.tsx",
}
const source = Object.fromEntries(Object.entries(files).map(([key, relative]) => [key, read(relative)]))
source.wholesale += "\n" + read("app/(site)/solutions/wholesale/WholesaleApprovedLayout.tsx")
const forbiddenByPage = {
  wholesale: [/minimum order/i, /volume discounts/i, /weekly or bi-weekly delivery/i, /sourced directly from cambodian farms/i, /every batch is traceable/i, /dedicated account manager/i, /service major provincial cities/i, /no middlemen/i],
  roasting: [/minimum production batch/i, /2-3 weeks/i, /every batch is cupped before release/i, /batch consistency guarantee/i, /white-label packaging available/i, /we develop, test, and lock roast profiles/i],
  marketing: [/occ places trained baristas/i, /trained in-house/i, /sca-aligned training before placement/i, /replacement guarantee/i, /first 30 days/i, /we can match based on language requirements/i],
  equipment: [/occ's equipment service covers/i, /maintenance contracts/i, /occ's technicians/i, /same-day response/i, /common wear parts are stocked/i, /la marzocco|synesso|nuova simonelli|mahlkonig|mazzer/i],
}

test("solutions pages do not publish unverified Service or Offer schema", () => {
  for (const [key, text] of Object.entries(source)) {
    assert.doesNotMatch(text, /"@type"\s*:\s*"Service"/, `${key} still publishes Service schema`)
    assert.doesNotMatch(text, /"@type"\s*:\s*"Offer"/, `${key} still publishes Offer schema`)
  }
})

test("solutions pages remove hard operational claims without evidence", () => {
  for (const [key, patterns] of Object.entries(forbiddenByPage)) {
    for (const pattern of patterns) assert.doesNotMatch(source[key], pattern, `${key} still contains ${pattern}`)
  }
})

test("solutions pages keep stable canonical routes", () => {
  assert.match(source.wholesale, /pageAlternates\("\/solutions\/wholesale"\)/)
  assert.match(source.roasting, /pageAlternates\("\/solutions\/roasting-program"\)/)
  assert.match(source.marketing, /pageAlternates\("\/solutions\/coffee-marketing"\)/)
  assert.match(source.equipment, /pageAlternates\("\/solutions\/equipment-service"\)/)
})

test("solutions CTAs are inquiry-led rather than transaction-led", () => {
  for (const [key, text] of Object.entries(source)) {
    assert.doesNotMatch(text, /ctaLabel="Request a quote"/i, `${key} still uses transaction-led CTA`)
    if (key === "wholesale" || key === "roasting") {
      assert.match(text, /ctaHref="\/contact"/)
      assert.match(text, /ctaLabel="(?:Discuss Wholesale Supply|Develop Your Roast Profile)"/)
    } else {
      assert.match(text, /ctaLabel="(?:Discuss your requirements|Ask about this area|Talk to our team|Develop Your Roast Profile|Discuss Wholesale Supply|Design Your Signature Drink)"/i)
    }
  }
})

test("solutions hub aligns with the three current commercial paths without unsupported operating promises", () => {
  const indexPage = read("app/(site)/solutions/page.tsx")
  const indexTemplate = read("components/templates/solutions-index-template.tsx")
  const detailTemplate = read("components/templates/solution-detail-template.tsx")
  const combined = `${indexPage}\n${indexTemplate}\n${detailTemplate}`
  for (const pattern of [/B2B Coffee Infrastructure/i, /Direct-origin beans, flexible delivery, account management/i, /Custom profiles, white-label, and batch consistency/i, /Trained baristas for venues, offices, and events/i, /Installation, maintenance, and emergency repair/i, /one operating ecosystem/i, /Four programs built for operators who need supply, craft, people, and uptime in one ecosystem/i, /Request a quote/i, /combine supply, roasting, staffing, and equipment support around your operation/i]) {
    assert.doesNotMatch(combined, pattern, `solutions hub contains unsupported phrase ${pattern}`)
  }
  for (const pattern of [/B2B/i, /sourcing/i, /enquir|marketing/i, /evidence-led/i, /Ready-to-Sell/i, /Made-for-You/i, /Cambodian Market/i, /pageAlternates\("\/solutions"\)/, /"@type": "CollectionPage"/]) assert.match(indexPage, pattern)
  assert.match(indexTemplate, /Three Clear Commercial Paths/)
  assert.match(indexTemplate, /Wholesale · Custom Roasting · Coffee Marketing/)
  assert.doesNotMatch(indexTemplate, /Staffing/i)
  assert.match(detailTemplate, /Coffee Authority &amp; B2B Solutions/)
})
