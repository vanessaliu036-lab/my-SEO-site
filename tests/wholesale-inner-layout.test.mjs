import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const pagePath = "app/(site)/solutions/wholesale/page.tsx"
const templatePath = "components/templates/wholesale-editorial-template.tsx"
const shellPath = "components/site/site-shell.tsx"
const resourcePath = "app/(site)/resources/coffee-buyer-specification-template/page.tsx"
const sitemapPath = "app/sitemap.ts"

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
  assert.match(template, /const leadSection = sections\[0\]/)
  assert.match(template, /const supportingSections = sections\.slice\(1\)/)
  assert.match(template, /supportingSections\.map/)
  assert.match(template, /processSteps\.map/)
  assert.match(template, /comparison\.map/)
  assert.match(template, /faqs\.map/)
  assert.match(template, /relatedLinks\.map/)
  assert.doesNotMatch(template, /SiteHeader|SiteFooter/)
})

test("coffee buyer specification template has its own Next.js route and SEO metadata", () => {
  assert.equal(fs.existsSync(resourcePath), true, "missing buyer specification route causes production 404")
  const resource = fs.readFileSync(resourcePath, "utf8")
  assert.match(resource, /Coffee Buyer Specification Template/)
  assert.match(resource, /pageAlternates\("\/resources\/coffee-buyer-specification-template"\)/)
  assert.match(resource, /Coffee format/)
  assert.match(resource, /Lot identity/)
  assert.match(resource, /Approval process/)
  assert.match(resource, /\/contact/)
})

test("buyer specification resource appears in sitemap and links from wholesale without changing layout", () => {
  const sitemap = fs.readFileSync(sitemapPath, "utf8")
  assert.match(sitemap, /\/resources\/coffee-buyer-specification-template/)
  assert.match(page, /href: "\/resources\/coffee-buyer-specification-template"/)
  assert.match(page, /WholesaleEditorialTemplate/)
})

test("sample-to-supply section presents a direct buyer specification CTA without changing global navigation", () => {
  const template = fs.readFileSync(templatePath, "utf8")
  const start = template.indexOf('aria-labelledby="wholesale-process-title"')
  const end = template.indexOf('aria-labelledby="commercial-requirements-title"')
  assert.ok(start >= 0 && end > start, "expected existing sample-to-supply section")
  const processSection = template.slice(start, end)
  assert.match(processSection, /Preparing a sourcing inquiry\?/)
  assert.match(processSection, /href="\/resources\/coffee-buyer-specification-template"/)
  assert.match(processSection, /Use the Coffee Buyer Specification Template/)
  assert.ok(processSection.indexOf("Preparing a sourcing inquiry?") < processSection.indexOf("processSteps.map"), "buyer CTA must be visible before the process grid")
  assert.doesNotMatch(shell, /coffee-buyer-specification-template/, "do not add this tool to global navigation")
})
