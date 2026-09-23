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
  assert.match(gate, /\/api\/analytics-eligibility/)
  assert.match(gate, /pathname\.startsWith\("\/admin\/"\)/)
})

test("analytics eligibility uses BotID without blocking the public page", () => {
  const route = source("app/api/analytics-eligibility/route.ts")
  const instrumentation = source("instrumentation-client.ts")
  assert.match(route, /checkBotId/)
  assert.match(route, /allow:\s*!verification\.isBot/)
  assert.match(route, /Cache-Control/)
  assert.match(instrumentation, /path:\s*"\/api\/analytics-eligibility"/)
  assert.match(instrumentation, /checkLevel:\s*"basic"/)
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
