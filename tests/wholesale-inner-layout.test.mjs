import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const pagePath = "app/(site)/solutions/wholesale/page.tsx"
const templatePath = "components/templates/wholesale-editorial-template.tsx"
const shellPath = "components/site/site-shell.tsx"

const page = fs.readFileSync(pagePath, "utf8")
const shell = fs.readFileSync(shellPath, "utf8")

test("wholesale page swaps only its inner layout to the approved editorial reference", () => {
  assert.match(page, /WholesaleEditorialTemplate/)
  assert.doesNotMatch(page, /CommercialSolutionTemplate/)
  assert.equal(fs.existsSync(templatePath), true)
})

test("global OCC header and footer remain owned by SiteShell", () => {
  assert.match(shell, /<SiteHeader\s*\/>/)
  assert.match(shell, /<SiteFooter\s*\/>/)
  assert.doesNotMatch(page, /SiteHeader|SiteFooter/)
})

test("wholesale current copy and information architecture remain present", () => {
  for (const text of [
    "WHOLESALE COFFEE SUPPLY",
    "Cambodia-origin coffee supply for distributors, importers, retailers, hospitality, cafés, and B2B partners",
    "Built for Commercial Supply",
    "From Origin to Market",
    "The Product Direction Is Already Defined",
    "Origin, Quality and Traceability Stay Connected",
    "Commercial Terms Stay Explicit",
    "Ready-to-Sell Remains Distinct From Custom Development",
    "From Sample to Supply",
    "Choose Our Profile. Or Build Yours.",
    "Discuss Wholesale Supply",
  ]) {
    assert.match(page, new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")))
  }
})

test("editorial template follows the supplied inner-page composition without recreating site chrome", () => {
  const template = fs.readFileSync(templatePath, "utf8")
  assert.match(template, /data-wholesale-layout="reference-editorial"/)
  assert.match(template, /grid-cols-1[^\n]*lg:grid-cols-\[1\.02fr_0\.98fr\]/)
  assert.match(template, /highlightCards\.map/)
  assert.match(template, /sections\.map/)
  assert.match(template, /processSteps\.map/)
  assert.match(template, /comparison\.map/)
  assert.match(template, /faqs\.map/)
  assert.match(template, /relatedLinks\.map/)
  assert.doesNotMatch(template, /SiteHeader|SiteFooter/)
})
