import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const source = readFileSync(
  new URL("../components/GoogleAnalytics.tsx", import.meta.url),
  "utf8",
)

test("GA4 only loads on OCC production hosts", () => {
  assert.match(source, /origincafekh\.com/)
  assert.match(source, /www\.origincafekh\.com/)
  assert.match(source, /PRODUCTION_HOSTS\.has/)
})

test("GA4 excludes admin, internal QA and exposed browser automation", () => {
  assert.match(source, /pathname === "\/admin"/)
  assert.match(source, /occ_qa/)
  assert.match(source, /navigator\.webdriver/)
  assert.match(source, /HeadlessChrome/)
  assert.match(source, /Playwright/)
  assert.match(source, /Puppeteer/)
})

test("Vercel-origin QA sessions stay out of the KPI stream", () => {
  assert.match(source, /referrerHost === "vercel\.com"/)
  assert.match(source, /endsWith\("\.vercel\.app"\)/)
  assert.match(source, /sessionStorage\.setItem\(QA_SESSION_KEY, "1"\)/)
})

test("page_view is emitted only after the traffic-quality guard", () => {
  assert.match(source, /send_page_view:\s*false/)
  assert.match(source, /sendEvent\("page_view"/)
  assert.match(source, /if \(!analyticsEnabled\) return null/)
})
