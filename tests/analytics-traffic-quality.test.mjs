import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const source = (relative) =>
  readFileSync(new URL(`../${relative}`, import.meta.url), "utf8")

test("analytics only loads for production human traffic", () => {
  const gate = source("components/AnalyticsGate.tsx")
  assert.match(gate, /origincafekh\.com/)
  assert.match(gate, /navigator\.webdriver === true/)
  assert.match(gate, /occ-analytics-disabled/)
  assert.match(gate, /occ_qa/)
  assert.match(gate, /occ_e2e/)
  assert.match(gate, /production-e2e/)
  assert.match(gate, /productionE2E/)
  assert.match(gate, /hasInternalAnalyticsReferrer/)
  assert.match(gate, /vercel\.com/)
  assert.match(gate, /127\.0\.0\.1/)
  assert.match(gate, /controller\.abort\(\), 3000/)
  assert.match(gate, /\/api\/analytics-eligibility/)
  assert.match(gate, /pathname\.startsWith\("\/admin\/"\)/)
})

test("analytics eligibility uses BotID without blocking the public page", () => {
  const route = source("app/api/analytics-eligibility/route.ts")
  const instrumentation = source("instrumentation-client.ts")
  assert.match(route, /checkBotId/)
  assert.match(route, /allow:\s*!verification\.isBot/)
  assert.match(route, /checkLevel:\s*"deepAnalysis"/)
  assert.match(route, /Cache-Control/)
  assert.match(instrumentation, /path:\s*"\/api\/analytics-eligibility"/)
  assert.match(instrumentation, /checkLevel:\s*"deepAnalysis"/)
})

test("GA4 counts App Router navigation with explicit single page views", () => {
  const ga = source("components/GoogleAnalytics.tsx")
  assert.match(ga, /send_page_view:\s*false/)
  assert.match(ga, /sendEvent\("page_view"/)
  assert.match(ga, /page_title:\s*document\.title/)
})

test("root layout routes analytics providers through the shared gate", () => {
  const layout = source("app/layout.tsx")
  assert.match(layout, /AnalyticsGate/)
  assert.doesNotMatch(layout, /<Analytics \/>/)
  assert.doesNotMatch(layout, /id="microsoft-clarity"/)
})


test("B2B lead attribution is captured without sending company or market PII to GA4", () => {
  const gate = source("components/AnalyticsGate.tsx")
  const form = source("app/(site)/contact/ContactForm.tsx")

  assert.match(gate, /occ-attribution-landing-page/)
  assert.match(gate, /occ-attribution-last-touch-page/)
  assert.match(gate, /occ-attribution-source-medium/)
  assert.match(gate, /occ-attribution-kpi-exclude/)
  assert.match(form, /lead_delivery:\s*"airtable_persisted"/)
  assert.match(form, /sendGenerateLead/)
  assert.match(form, /maxAttempts\s*=\s*10/)
  assert.match(form, /setTimeout\(resolve,\s*200\)/)
  assert.match(form, /traffic_source_medium:/)
  assert.match(form, /landing_page:/)
  assert.doesNotMatch(form, /company:\s*data\.company/)
  assert.doesNotMatch(form, /market:\s*data\.country/)
})
