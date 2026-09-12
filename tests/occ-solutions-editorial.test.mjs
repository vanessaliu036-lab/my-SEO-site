import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const read = (path) => fs.readFileSync(path, "utf8")
const indexTemplate = "components/templates/solutions-index-template.tsx"
const detailTemplate = "components/templates/solution-detail-template.tsx"
const detailPages = ["wholesale", "roasting-program", "barista-staffing", "equipment-service"]

test("SOLUTIONS index and detail pages share the OCC editorial template system", () => {
  assert.equal(fs.existsSync(indexTemplate), true, "solutions index template must exist")
  assert.equal(fs.existsSync(detailTemplate), true, "solution detail template must exist")

  const index = read("app/(site)/solutions/page.tsx")
  assert.match(index, /SolutionsIndexTemplate/)
  assert.doesNotMatch(index, /border-dashed/)
  assert.doesNotMatch(index, /Equipment Service/)
  assert.doesNotMatch(index, /\/solutions\/equipment-service/)

  for (const slug of detailPages) {
    const source = read(`app/(site)/solutions/${slug}/page.tsx`)
    assert.match(source, /SolutionDetailTemplate/)
    assert.doesNotMatch(source, /<nav className=/)
    assert.doesNotMatch(source, /sticky top-0/)
  }
})

test("equipment service route is preserved for SEO but removed from public solution entry points", () => {
  assert.equal(fs.existsSync("app/(site)/solutions/equipment-service/page.tsx"), true)
  const index = read("app/(site)/solutions/page.tsx")
  const wholesale = read("app/(site)/solutions/wholesale/page.tsx")
  assert.doesNotMatch(index, /\/solutions\/equipment-service/)
  assert.doesNotMatch(wholesale, /\/solutions\/equipment-service/)
})

test("solution detail template keeps semantic content server-rendered and delegates only reveal motion", () => {
  const template = read(detailTemplate)
  const reveal = read("components/ui/motion-reveal.tsx")

  assert.doesNotMatch(template, /^"use client"/)
  assert.match(template, /MotionReveal/)
  assert.match(reveal, /useReducedMotion/)
  assert.match(reveal, /0\.22, 1, 0\.36, 1/)
})

test("solution pages preserve FAQ Breadcrumb schemas and internal-link logic without unverified Service schema", () => {
  for (const slug of detailPages) {
    const source = read(`app/(site)/solutions/${slug}/page.tsx`)
    assert.doesNotMatch(source, /"@type"\s*:\s*"Service"/)
    assert.doesNotMatch(source, /"@type"\s*:\s*"Offer"/)
    assert.match(source, /"@type": "FAQPage"/)
    assert.match(source, /"@type": "BreadcrumbList"/)
    assert.match(source, /renderWithLinks/)
  }

  const index = read("app/(site)/solutions/page.tsx")
  assert.match(index, /"@type": "CollectionPage"/)
  assert.match(index, /B2B/i)
  assert.match(index, /evidence-led/i)
})

test("commercial analytics records the wholesale-to-contact funnel and exact 404 paths", () => {
  const analytics = read("components/GoogleAnalytics.tsx")
  const contact = read("app/(site)/contact/ContactForm.tsx")
  const config = read("next.config.mjs")

  for (const eventName of ["occ_404", "wholesale_view", "contact_view", "contact_click", "whatsapp_click", "email_click"]) {
    assert.match(analytics, new RegExp(eventName), `${eventName} analytics event must be present`)
  }
  assert.match(analytics, /page_path/)
  assert.match(contact, /generate_lead/)
  assert.match(contact, /lead_type/)
  assert.match(config, /\/blog\/cambodian-coffee-origin-guide/)
  assert.match(config, /\/blog\/cambodia-coffee/)
})
