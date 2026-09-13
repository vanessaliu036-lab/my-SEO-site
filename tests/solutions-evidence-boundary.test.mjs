import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, "..")
const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8")

const files = {
  wholesale: "app/(site)/solutions/wholesale/page.tsx",
  roasted: "app/(site)/solutions/roasted-coffee-supply/page.tsx",
  roasting: "app/(site)/solutions/roasting-program/page.tsx",
  staffing: "app/(site)/solutions/barista-staffing/page.tsx",
  equipment: "app/(site)/solutions/equipment-service/page.tsx",
}

const source = Object.fromEntries(Object.entries(files).map(([key, rel]) => [key, read(rel)]))

const forbiddenByPage = {
  wholesale: [/volume discounts/i, /weekly or bi-weekly delivery/i, /sourced directly from cambodian farms/i, /every batch is traceable/i, /dedicated account manager/i, /service major provincial cities/i, /no middlemen/i],
  roasted: [/OCC inventory is always available/i, /guaranteed capacity/i, /fixed minimum order/i, /guaranteed delivery/i],
  roasting: [/minimum production batch/i, /2-3 weeks/i, /every batch is cupped before release/i, /batch consistency guarantee/i, /white-label packaging available/i, /we develop, test, and lock roast profiles/i],
  staffing: [/occ places trained baristas/i, /trained in-house/i, /sca-aligned training before placement/i, /replacement guarantee/i, /first 30 days/i, /we can match based on language requirements/i],
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

test("solutions pages keep stable legacy canonicals and define the new roasted-supply canonical", () => {
  assert.match(source.wholesale, /pageAlternates\("\/solutions\/wholesale"\)/)
  assert.match(source.roasted, /pageAlternates\("\/solutions\/roasted-coffee-supply"\)/)
  assert.match(source.roasting, /pageAlternates\("\/solutions\/roasting-program"\)/)
  assert.match(source.staffing, /pageAlternates\("\/solutions\/barista-staffing"\)/)
  assert.match(source.equipment, /pageAlternates\("\/solutions\/equipment-service"\)/)
})

test("active solution CTAs are pathway-specific and inquiry-led", () => {
  assert.match(source.wholesale, /ctaLabel="Start a Sourcing Conversation"/)
  assert.match(source.roasted, /ctaLabel="Discuss Your Coffee Requirements"/)
  assert.match(source.roasting, /ctaLabel="Start a Roasting Brief"/)
  for (const text of [source.wholesale, source.roasted, source.roasting]) {
    assert.doesNotMatch(text, /Request a quote|Buy now|Order now/i)
  }
})

test("legacy solution routes remain preserved but are not part of the active public service model", () => {
  const nav = read("components/site/navigation-data.ts")
  const indexPage = read("app/(site)/solutions/page.tsx")
  for (const legacy of ["Barista Staffing", "Equipment Service", "/solutions/barista-staffing", "/solutions/equipment-service"]) {
    assert.doesNotMatch(nav, new RegExp(legacy.replaceAll("/", "\\/")))
    assert.doesNotMatch(indexPage, new RegExp(legacy.replaceAll("/", "\\/")))
  }
  assert.equal(fs.existsSync(path.join(root, files.staffing)), true)
  assert.equal(fs.existsSync(path.join(root, files.equipment)), true)
})

test("solutions hub communicates a requirements-led B2B path without unsupported operating promises", () => {
  const indexPage = read("app/(site)/solutions/page.tsx")
  const indexTemplate = read("components/templates/solutions-index-template.tsx")
  const detailTemplate = read("components/templates/solution-detail-template.tsx")
  const combined = `${indexPage}\n${indexTemplate}\n${detailTemplate}`

  for (const pattern of [
    /Direct-origin beans, flexible delivery, account management/i,
    /Custom profiles, white-label, and batch consistency/i,
    /Trained baristas for venues, offices, and events/i,
    /Installation, maintenance, and emergency repair/i,
    /Request a quote/i,
  ]) assert.doesNotMatch(combined, pattern)

  assert.match(indexPage, /B2B/i)
  assert.match(indexPage, /sourcing/i)
  assert.match(indexPage, /evidence-led/i)
  assert.match(indexTemplate, /requirement/i)
  assert.match(indexTemplate, /available coffee/i)
  assert.match(indexTemplate, /Start a Conversation/i)
  assert.match(detailTemplate, /Coffee Authority &amp; B2B Solutions/)
  assert.match(indexPage, /pageAlternates\("\/solutions"\)/)
  assert.match(indexPage, /"@type": "CollectionPage"/)
})
