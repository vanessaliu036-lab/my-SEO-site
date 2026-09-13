import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const read = (path) => fs.readFileSync(path, "utf8")
const escaped = (value) => new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))

test("contact form captures a qualified B2B conversation and persists it before success", () => {
  const action = read("app/(site)/contact/action.ts")
  const form = read("app/(site)/contact/ContactForm.tsx")

  for (const field of ["company", "countryMarket", "projectRequirement", "projectStage", "sourcePage"]) {
    assert.match(action, new RegExp(`\\b${field}\\b`), `${field} must be part of the server schema`)
  }

  for (const intent of ["Wholesale & Sourcing", "Roasted Coffee Supply", "Roasting Program", "Distribution Partnership", "Other"]) {
    assert.match(action, escaped(intent), `${intent} must be accepted server-side`)
    assert.match(form, escaped(intent), `${intent} must be offered in the form`)
  }

  for (const label of ["Company", "Work Email", "Country / Market", "What are you exploring?", "Project / Requirement", "Estimated Requirement / Project Stage"]) {
    assert.match(form, escaped(label), `${label} must be visible in the form`)
  }

  assert.match(action, /OCC_B2B_Leads/)
  assert.match(action, /api\.airtable\.com/)
  assert.match(action, /response\.ok/)
  assert.doesNotMatch(action, /console\.log\("\[ContactForm\] New message received:/)
  assert.match(form, /generate_lead/)
})

test("public commercial architecture exposes the four international pathways without deleting local Coffee Marketing", () => {
  const nav = read("components/site/navigation-data.ts")
  const solutions = read("app/(site)/solutions/page.tsx")
  const wholesale = read("app/(site)/solutions/wholesale/page.tsx")
  const roasted = read("app/(site)/solutions/roasted-coffee-supply/page.tsx")
  const roasting = read("app/(site)/solutions/roasting-program/page.tsx")
  const distribution = read("app/(site)/distribution/page.tsx")

  for (const service of ["Wholesale & Sourcing", "Roasted Coffee Supply", "Roasting Program", "Distribution Partnership"]) {
    assert.match(solutions, escaped(service), `${service} must be on Solutions`)
  }

  assert.match(nav, /label: "Wholesale(?: & Sourcing)?", href: "\/solutions\/wholesale"/)
  assert.match(nav, /label: "Roasting Program", href: "\/solutions\/roasting-program"/)
  assert.match(nav, /label: "Coffee Marketing", href: "\/solutions\/coffee-marketing"/)
  assert.equal(fs.existsSync("app/(site)/solutions/coffee-marketing/page.tsx"), true, "local Coffee Marketing page must be preserved")
  assert.equal(fs.existsSync("app/(site)/solutions/roasted-coffee-supply/page.tsx"), true, "roasted coffee supply page must exist")

  for (const legacy of ["Barista Staffing", "Equipment Service"]) {
    assert.doesNotMatch(nav, new RegExp(legacy))
    assert.doesNotMatch(solutions, new RegExp(legacy))
  }

  assert.match(wholesale, /Start a Sourcing Conversation/)
  assert.match(roasted, /Discuss Your Coffee Requirements/)
  assert.match(roasting, /Start a Roasting Brief/)
  assert.match(distribution, /Discuss Your Market/)
})

test("final Origins navigation is preserved while Original remains a separate commercial trust gateway", () => {
  const nav = read("components/site/navigation-data.ts")
  const sitemap = read("app/sitemap.ts")
  const singleOrigin = read("app/(site)/origins/single-origin/page.tsx")

  assert.match(nav, /label: "ORIGINS",\s*href: "\/origins"/)
  for (const child of [
    ["Cambodia & Regions", "/origins/cambodia-regions"],
    ["Farm & Terroir", "/origins/farm-terroir"],
    ["Fine Robusta Cambodia", "/fine-robusta-cambodia"],
  ]) {
    assert.match(nav, new RegExp(`label: "${child[0].replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}", href: "${child[1].replaceAll("/", "\\/")}"`))
  }
  assert.doesNotMatch(nav, /label: "Single Origin"/)
  assert.doesNotMatch(nav, /label: "ORIGINAL"/)

  assert.equal(fs.existsSync("app/(site)/original/page.tsx"), true, "Original commercial trust gateway must exist")
  assert.match(sitemap, /\/original/)
  assert.match(sitemap, /\/origins\/cambodia-regions/)
  assert.doesNotMatch(sitemap, /\/origins\/single-origin/)
  assert.match(singleOrigin, /permanentRedirect\("\/origins"\)/)
})

test("retired Staffing and Equipment routes cannot re-enter public navigation or sitemap", () => {
  const sitemap = read("app/sitemap.ts")
  const config = read("next.config.mjs")
  const nav = read("components/site/navigation-data.ts")

  assert.doesNotMatch(sitemap, /\/solutions\/barista-staffing|\/solutions\/equipment-service/)
  assert.doesNotMatch(nav, /Barista Staffing|Equipment Service/)
  assert.match(config, /source: '\/solutions\/barista-staffing',[\s\S]{0,120}?destination: '\/solutions'/)
  assert.match(config, /source: '\/solutions\/equipment-service',[\s\S]{0,120}?destination: '\/solutions'/)
})

test("About never exposes internal positioning jargon", () => {
  const about = read("components/templates/about-editorial-template.tsx")
  assert.doesNotMatch(about, /Authority wedge/i)
  assert.match(about, /100% Cambodian Origin/)
  assert.match(about, /Core Expertise/)
  assert.match(about, /Supply · Roasting · Market Access/)
})

test("official logo is unified across header footer and structured data", () => {
  const header = read("components/site/site-header.tsx")
  const footer = read("components/site/site-footer.tsx")
  const siteConfig = read("lib/siteConfig.ts")

  assert.match(header, /occ-logo-primary\.png/)
  assert.match(footer, /occ-logo-primary\.png/)
  assert.match(siteConfig, /occ-logo-primary\.png/)
  assert.doesNotMatch(siteConfig, /apple-icon\.png/)
})
