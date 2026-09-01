import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"

const root = process.env.OCC_TEST_ROOT || process.cwd()
const exists = (relativePath) => fs.existsSync(path.join(root, relativePath))
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8")

test("OCC keeps the grouped public routes and has no admin route", () => {
  for (const required of [
    "app/(site)/layout.tsx",
    "app/(site)/page.tsx",
    "app/(site)/about/page.tsx",
    "app/(site)/solutions/page.tsx",
    "app/(site)/collection/page.tsx",
    "app/(site)/blog/page.tsx",
    "app/(site)/blog/[slug]/page.tsx",
    "app/(site)/contact/page.tsx",
    "components/Navigation.tsx",
    "components/SiteSidebar.tsx",
    "components/site/site-shell.tsx",
  ]) {
    assert.equal(exists(required), true, `missing ${required}`)
  }

  for (const forbidden of [
    "app/about",
    "app/solutions",
    "app/collection",
    "app/blog",
    "app/contact",
    "app/admin",
    "app/(admin)/admin",
  ]) {
    assert.equal(exists(forbidden), false, `forbidden route source still exists: ${forbidden}`)
  }
})

test("restored public navigation contains the original five sections with no admin access", () => {
  const nav = read("components/Navigation.tsx")
  for (const label of ["ABOUT", "SOLUTIONS", "COLLECTION", "Blog", "Contact"]) {
    assert.match(nav, new RegExp(label))
  }
  for (const child of [
    "Mission", "Founder", "Manifesto", "Sustainability", "Wholesale", "Roasting Program",
    "Barista Staffing", "Equipment Service", "Mondulkiri Origin Collection", "SOVANN", "PREK", "ANGKAR",
  ]) {
    assert.match(nav, new RegExp(child))
  }
  assert.doesNotMatch(nav, /\/admin|Staff Access/i)
})

test("root layout owns global document concerns but not public chrome", () => {
  const layout = read("app/layout.tsx")
  assert.doesNotMatch(layout, /AdminFrontendSwitch/)
  assert.match(layout, /GoogleAnalytics/)
  assert.match(layout, /Analytics/)
  assert.match(layout, /application\/ld\+json/)
})
