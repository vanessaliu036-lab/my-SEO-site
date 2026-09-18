import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const pagePath = "app/(site)/solutions/wholesale/page.tsx"
const componentPath = "app/(site)/solutions/wholesale/WholesaleApprovedLayout.tsx"
const cssPath = "app/(site)/solutions/wholesale/wholesale-approved.css"
const shellPath = "components/site/site-shell.tsx"
const resourcePath = "app/(site)/resources/coffee-buyer-specification-template/page.tsx"
const sitemapPath = "app/sitemap.ts"

const page = fs.readFileSync(pagePath, "utf8")
const shell = fs.readFileSync(shellPath, "utf8")

test("wholesale page uses the approved standalone inner layout", () => {
  assert.match(page, /WholesaleApprovedLayout/)
  assert.doesNotMatch(page, /WholesaleEditorialTemplate|CommercialSolutionTemplate/)
  assert.equal(fs.existsSync(componentPath), true)
  assert.equal(fs.existsSync(cssPath), true)
})

test("global OCC navigation and footer remain owned by SiteShell", () => {
  assert.match(shell, /<SiteHeader\s*\/>/)
  assert.match(shell, /<SiteFooter\s*\/>/)
  assert.doesNotMatch(page, /SiteHeader|SiteFooter/)
  const component = fs.readFileSync(componentPath, "utf8")
  assert.doesNotMatch(component, /<(header|footer|nav)\b/i)
})

test("approved wholesale scope excludes green coffee and distribution acquisition", () => {
  const component = fs.readFileSync(componentPath, "utf8")
  const combined = page + "\n" + component
  assert.doesNotMatch(combined, /green[ -]?coffee/i)
  assert.doesNotMatch(combined, /distribution supply|\bdistributor(?:s)?\b|\bimporter(?:s)?\b/i)
  assert.match(combined, /Cambodian Fine Robusta/)
  assert.match(combined, /Roasted Coffee/)
})

test("source options are exactly Fine Robusta and Roasted Coffee", () => {
  const component = fs.readFileSync(componentPath, "utf8")
  const start = component.indexOf('id="needs"')
  const end = component.indexOf('id="why-occ"')
  assert.ok(start >= 0 && end > start)
  const options = component.slice(start, end)
  assert.equal((options.match(/className="intent-card"/g) || []).length, 2)
  assert.match(options, /01 \/ Fine Robusta/)
  assert.match(options, /02 \/ Roasted coffee/)
})

test("buyer process uses sequence numbers without repeated category labels", () => {
  const component = fs.readFileSync(componentPath, "utf8")
  assert.equal((component.match(/className="evidence-card"/g) || []).length, 6)
  for (const n of ["01","02","03","04","05","06"]) {
    assert.ok(component.includes('className="evidence-no">' + n + '<'))
  }
  assert.doesNotMatch(component, />\d{2}\s*\/\s*(?:FAQ|Buyer Process|Evidence)</)
})

test("buyer specification resource stays visible without entering global navigation", () => {
  assert.equal(fs.existsSync(resourcePath), true)
  const sitemap = fs.readFileSync(sitemapPath, "utf8")
  const component = fs.readFileSync(componentPath, "utf8")
  assert.match(component, /Preparing a sourcing inquiry\?/)
  assert.match(component, /href="\/resources\/coffee-buyer-specification-template"/)
  assert.match(sitemap, /\/resources\/coffee-buyer-specification-template/)
  assert.doesNotMatch(shell, /coffee-buyer-specification-template/)
})

test("FAQ schema matches the six visible wholesale questions", () => {
  const component = fs.readFileSync(componentPath, "utf8")
  assert.equal((page.match(/\{ q: "/g) || []).length, 6)
  for (const question of [
    "Where can I buy Cambodian coffee beans wholesale?",
    "Can I request a Cambodian Fine Robusta sample?",
    "Does OCC offer wholesale roasted coffee for cafés and hotels?",
    "What are your MOQ, wholesale prices and lead times?",
    "Can OCC create a custom roast or private-label product?",
    "Which countries can you ship to?",
  ]) {
    assert.ok(page.includes(question), "schema copy missing: " + question)
    assert.ok(component.includes(question), "visible FAQ missing: " + question)
  }
})
