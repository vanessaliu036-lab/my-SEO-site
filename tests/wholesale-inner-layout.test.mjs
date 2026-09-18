import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const pagePath = "app/(site)/solutions/wholesale/page.tsx"
const componentPath = "app/(site)/solutions/wholesale/WholesaleApprovedLayout.tsx"
const shellPath = "components/site/site-shell.tsx"
const sharedPath = "components/templates/occ-commercial-html-layout.tsx"
const resourcePath = "app/(site)/resources/coffee-buyer-specification-template/page.tsx"
const sitemapPath = "app/sitemap.ts"
const read = (path) => fs.readFileSync(path, "utf8")
const page = read(pagePath)
const component = read(componentPath)
const shell = read(shellPath)

test("wholesale page renders shared OCC HTML layout and keeps a scoped data component", () => {
  assert.match(page, /WholesaleApprovedLayout/)
  assert.match(component, /OccCommercialHtmlLayout/)
  assert.equal(fs.existsSync(sharedPath), true)
  assert.doesNotMatch(page, /WholesaleEditorialTemplate|CommercialSolutionTemplate/)
})

test("global OCC header and footer remain owned by SiteShell", () => {
  assert.match(shell, /<SiteHeader\s*\/>/)
  assert.match(shell, /<SiteFooter\s*\/>/)
  assert.doesNotMatch(page + component, /SiteHeader|SiteFooter|<(header|footer|nav)\b/)
})

test("approved wholesale scope excludes green coffee and distribution acquisition", () => {
  const combined = page + "\n" + component
  assert.doesNotMatch(combined, /green[ -]?coffee/i)
  assert.doesNotMatch(combined, /distribution supply|\bdistributor(?:s)?\b|\bimporter(?:s)?\b/i)
  assert.match(combined, /Cambodian Fine Robusta/)
  assert.match(combined, /Roasted Coffee/)
})

test("two product options are exactly Fine Robusta and Roasted Coffee", () => {
  const options = component.slice(component.indexOf("const options = ["), component.indexOf("const steps = ["))
  assert.equal((options.match(/title: "/g) || []).length, 2)
  assert.match(options, /title: "Cambodian Fine Robusta"/)
  assert.match(options, /title: "Roasted Coffee"/)
})

test("buyer process has six unique numbered steps without repeated category labels", () => {
  const steps = component.slice(component.indexOf("const steps = ["), component.indexOf("const buyerTerms = ["))
  assert.equal((steps.match(/title: "/g) || []).length, 6)
  assert.match(component, /String\(index \+ 1\)\.padStart\(2, "0"\)/)
  assert.doesNotMatch(component, />\d{2}\s*\/\s*(?:FAQ|Buyer Process|Evidence)</)
})

test("buyer specification resource remains visible without entering global navigation", () => {
  assert.equal(fs.existsSync(resourcePath), true)
  assert.match(read(sitemapPath), /\/resources\/coffee-buyer-specification-template/)
  assert.match(component, /Preparing a sourcing inquiry\?/)
  assert.match(component, /href="\/resources\/coffee-buyer-specification-template"/)
  assert.doesNotMatch(shell, /coffee-buyer-specification-template/)
})

test("FAQ schema and six visible questions agree", () => {
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
