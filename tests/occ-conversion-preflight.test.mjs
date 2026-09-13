import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const read = (path) => fs.readFileSync(path, "utf8")

test("contact form captures a qualified B2B conversation and persists it before success", () => {
  const action = read("app/(site)/contact/action.ts")
  const form = read("app/(site)/contact/ContactForm.tsx")

  for (const field of ["company", "countryMarket", "projectRequirement", "projectStage", "sourcePage"]) {
    assert.match(action, new RegExp(`\\b${field}\\b`), `${field} must be part of the server schema`)
  }

  for (const intent of ["Wholesale & Sourcing", "Roasted Coffee Supply", "Roasting Program", "Distribution Partnership", "Other"]) {
    assert.match(action, new RegExp(intent.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")), `${intent} must be accepted server-side`)
    assert.match(form, new RegExp(intent.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")), `${intent} must be offered in the form`)
  }

  for (const label of ["Company", "Work Email", "Country / Market", "What are you exploring?", "Project / Requirement", "Estimated Requirement / Project Stage"]) {
    assert.match(form, new RegExp(label.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")), `${label} must be visible in the form`)
  }

  assert.match(action, /OCC_B2B_Leads/)
  assert.match(action, /api\.airtable\.com/)
  assert.match(action, /response\.ok/)
  assert.doesNotMatch(action, /console\.log\("\[ContactForm\] New message received:/)
  assert.match(form, /generate_lead/)
})

test("homepage uses the approved three-intent conversion vocabulary while retaining the Fine Robusta owner backlink", () => {
  const home = read("components/templates/home-template.tsx")
  for (const cta of ["Start a Conversation", "Explore Solutions", "See Origin Proof"]) assert.match(home, new RegExp(cta))
  assert.match(home, /href="\/contact"/)
  assert.match(home, /href="\/solutions"/)
  assert.match(home, /href="\/original"/)
  assert.match(home, /href="\/fine-robusta-cambodia"/)
  assert.doesNotMatch(home, />Start an Enquiry</)
})

test("public conversion architecture exposes only the four approved commercial pathways", () => {
  const nav = read("components/site/navigation-data.ts")
  const solutions = read("app/(site)/solutions/page.tsx")
  const wholesale = read("app/(site)/solutions/wholesale/page.tsx")
  const roasted = read("app/(site)/solutions/roasted-coffee-supply/page.tsx")
  const roasting = read("app/(site)/solutions/roasting-program/page.tsx")
  const distribution = read("app/(site)/distribution/page.tsx")

  for (const service of ["Wholesale & Sourcing", "Roasted Coffee Supply", "Roasting Program", "Distribution Partnership"]) {
    assert.match(nav, new RegExp(service.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")), `${service} must be in navigation`)
    assert.match(solutions, new RegExp(service.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")), `${service} must be on Solutions`)
  }

  for (const legacy of ["Barista Staffing", "Equipment Service"]) {
    assert.doesNotMatch(nav, new RegExp(legacy))
    assert.doesNotMatch(solutions, new RegExp(legacy))
    assert.doesNotMatch(wholesale, new RegExp(legacy))
    assert.doesNotMatch(roasting, new RegExp(legacy))
  }

  assert.equal(fs.existsSync("app/(site)/solutions/roasted-coffee-supply/page.tsx"), true, "roasted coffee supply page must exist")
  assert.match(wholesale, /Start a Sourcing Conversation/)
  assert.match(roasted, /Discuss Your Coffee Requirements/)
  assert.match(roasting, /Start a Roasting Brief/)
  assert.match(distribution, /Discuss Your Market/)
})

test("legacy Staffing and Equipment routes cannot re-enter the public conversion funnel", () => {
  const sitemap = read("app/sitemap.ts")
  const config = read("next.config.mjs")
  const staffingLayout = read("app/(site)/solutions/barista-staffing/layout.tsx")
  const equipmentLayout = read("app/(site)/solutions/equipment-service/layout.tsx")

  assert.doesNotMatch(sitemap, /\/solutions\/barista-staffing|\/solutions\/equipment-service/)
  assert.match(staffingLayout, /index: false/)
  assert.match(equipmentLayout, /index: false/)
  assert.match(config, /source: '\/solutions\/barista-staffing',[\s\S]{0,100}?destination: '\/solutions'/)
  assert.match(config, /source: '\/solutions\/equipment-service',[\s\S]{0,100}?destination: '\/solutions'/)
})

test("ORIGINAL is a commercial trust gateway while ORIGINS remains the evidence depth layer", () => {
  const nav = read("components/site/navigation-data.ts")
  const sitemap = read("app/sitemap.ts")
  assert.equal(fs.existsSync("app/(site)/original/page.tsx"), true, "Original gateway route must exist")
  const original = read("app/(site)/original/page.tsx")

  assert.match(nav, /label: "ORIGINAL",\s*href: "\/original"/)
  assert.doesNotMatch(nav, /label: "DISTRIBUTION", href: "\/distribution"/)
  assert.match(original, /Origin Information/)
  assert.match(original, /Processing Information/)
  assert.match(original, /Lot \/ Specification Discussion/)
  assert.match(original, /Quality Evaluation/)
  assert.match(original, /Traceability Records/)
  assert.match(original, /Availability Confirmation/)
  assert.match(original, /\/origins/)
  assert.match(original, /\/fine-robusta-cambodia/)
  assert.match(original, /\/contact/)
  assert.match(sitemap, /\/original/)
  assert.match(sitemap, /\/origins/)
})

test("high-intent mobile pages have a restrained shared Start a Conversation entry", () => {
  assert.equal(fs.existsSync("components/site/mobile-conversion-cta.tsx"), true, "mobile conversion CTA component must exist")
  const cta = read("components/site/mobile-conversion-cta.tsx")
  const shell = read("components/site/site-shell.tsx")

  assert.match(cta, /Start a Conversation/)
  for (const route of ["/blog", "/solutions", "/original", "/origins", "/fine-robusta-cambodia", "/distribution"]) {
    assert.match(cta, new RegExp(route.replaceAll("/", "\\/")), `${route} must be on the mobile CTA allowlist`)
  }
  assert.match(cta, /usePathname/)
  assert.match(shell, /MobileConversionCta/)
})
