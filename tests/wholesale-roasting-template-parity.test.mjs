import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const read = (path) => fs.readFileSync(path, "utf8")
const wholesale = read("app/(site)/solutions/wholesale/WholesaleApprovedLayout.tsx")
const roasting = read("app/(site)/solutions/roasting-program/page.tsx")
const roastingLayout = read("app/(site)/solutions/roasting-program/layout.tsx")
const siteShell = read("components/site/site-shell.tsx")

const sharedComponent = "components/templates/occ-commercial-html-layout.tsx"
const sharedCss = "components/templates/occ-commercial-html-layout.css"

test("Wholesale and Roasting use exactly one shared template, not two independent compositions", () => {
  assert.ok(fs.existsSync(sharedComponent), "missing shared OCC HTML template")
  assert.ok(fs.existsSync(sharedCss), "missing shared OCC template stylesheet")
  assert.match(wholesale, /OccCommercialHtmlLayout/)
  assert.match(roasting, /OccCommercialHtmlLayout/)
  assert.doesNotMatch(roasting, /CommercialSolutionTemplate/)
  assert.doesNotMatch(wholesale, /WholesaleEditorialTemplate/)
})

test("shared template reproduces the supplied HTML primary order and columns", () => {
  const layout = read(sharedComponent)
  const css = read(sharedCss)
  const ordered = ["className=\"page\"", "className=\"hero\"", "className=\"split-section\"", "className=\"divider\"", "className=\"feature-band\"", "className=\"b2b-cta\""]
  let previous = -1
  for (const token of ordered) {
    const at = layout.indexOf(token)
    assert.ok(at > previous, `template ordering mismatch: ${token}`)
    previous = at
  }
  assert.match(layout, /className="media-grid"/)
  assert.equal((layout.match(/className="media-card"/g) || []).length, 2)
  assert.match(css, /grid-template-columns:\s*1\.02fr\s+\.98fr/)
  assert.match(css, /grid-template-columns:\s*1fr\s+\.9fr/)
  assert.match(css, /grid-template-columns:\s*1fr\s+1\.2fr/)
  assert.match(css, /--max:\s*1450px/)
  assert.match(css, /font-size:\s*92px/)
})

test("the two pages retain the global SiteShell header/footer without copying prototype chrome", () => {
  const layout = read(sharedComponent)
  assert.doesNotMatch(layout, /<(?:header|footer|nav)\b/i)
  assert.doesNotMatch(roastingLayout, /roasting-photo-gallery|occ-roasting-program-background/)
  assert.match(siteShell, /<SiteHeader\s*\/>/)
  assert.match(siteShell, /<SiteFooter\s*\/>/)
})

test("both pages place distinct official OCC photographs in the same 4 image positions", () => {
  const layout = read(sharedComponent)
  assert.match(layout, /heroImage/)
  assert.match(layout, /processImages/)
  assert.match(layout, /featureImage/)
  assert.doesNotMatch(layout, /unsplash/i)
  assert.doesNotMatch(roasting, /unsplash/i)
  assert.doesNotMatch(wholesale, /unsplash/i)
  assert.match(roasting, /\/images\/roasting\//)
  assert.match(wholesale, /\/images\/wholesale\//)
})

test("wholesale keeps its approved two-product scope and buyer evidence", () => {
  assert.match(wholesale, /Cambodian Fine Robusta/)
  assert.match(wholesale, /Roasted Coffee/)
  assert.match(wholesale, /coffee-buyer-specification-template/)
  assert.match(wholesale, /wholesale-faq/)
  assert.doesNotMatch(wholesale, /green[ -]?coffee|distribution supply|\bdistributor\b/i)
})

test("roasting preserves market-led copy, buyer process and 4 FAQs in shared layout", () => {
  assert.match(roasting, /The Roast Starts With the Market/)
  assert.match(roasting, /Your Market\. Your Customer\. Your Roast Profile\./)
  assert.match(roasting, /Market & Application/)
  assert.match(roasting, /Reference Approval/)
  assert.match(roasting, /What does a custom coffee roasting program include\?/)
  assert.match(roasting, /Can Fine Robusta be used in a custom program\?/)
  assert.match(roasting, /\/blog\/how-to-cup-fine-robusta/)
})
