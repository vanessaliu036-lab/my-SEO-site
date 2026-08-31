import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"

const root = process.env.OCC_TEST_ROOT || process.cwd()
const exists = (relativePath) => fs.existsSync(path.join(root, relativePath))
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8")

test("OCC uses one five-section route-group architecture", () => {
  for (const required of [
    "app/(site)/layout.tsx",
    "app/(site)/page.tsx",
    "app/(site)/about/page.tsx",
    "app/(site)/solutions/page.tsx",
    "app/(site)/collection/page.tsx",
    "app/(site)/blog/page.tsx",
    "app/(site)/blog/[slug]/page.tsx",
    "app/(site)/contact/page.tsx",
    "app/(admin)/admin/page.tsx",
    "components/site/navigation-data.ts",
    "components/site/site-header.tsx",
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
    "app/coffee",
    "app/vision",
    "app/system",
    "app/signal",
    "app/matter",
    "app/archive",
  ]) {
    assert.equal(exists(forbidden), false, `legacy route source still exists: ${forbidden}`)
  }
})

test("public navigation has exactly five independent top-level sections", () => {
  const nav = read("components/site/navigation-data.ts")
  const ordered = ["ABOUT", "SOLUTIONS", "COLLECTION", "BLOG", "CONTACT"]

  let cursor = -1
  for (const label of ordered) {
    const next = nav.indexOf(`label: \"${label}\"`)
    assert.ok(next > cursor, `${label} missing or out of order`)
    cursor = next
  }

  for (const forbidden of ["HOME", "COFFEE", "INSIGHTS", "CULTURE & ETHICS"]) {
    assert.doesNotMatch(nav, new RegExp(`label:\\s*[\\\"']${forbidden}`))
  }

  for (const child of [
    "Mission",
    "Founder",
    "Manifesto",
    "Sustainability",
    "Wholesale",
    "Roasting Program",
    "Barista Staffing",
    "Equipment Service",
    "Mondulkiri Origin Collection",
    "SOVANN",
    "PREK",
    "ANGKAR",
  ]) {
    assert.match(nav, new RegExp(child))
  }
})

test("root layout owns global document concerns but not public chrome", () => {
  const layout = read("app/layout.tsx")
  assert.doesNotMatch(layout, /PublicSiteChrome/)
  assert.doesNotMatch(layout, /AdminFrontendSwitch/)
  assert.doesNotMatch(layout, /writing-mode:vertical-lr/)
  assert.match(layout, /GoogleAnalytics/)
  assert.match(layout, /Analytics/)
  assert.match(layout, /application\/ld\+json/)
})

test("legacy public routes are permanent redirects only", () => {
  const config = read("next.config.mjs")
  for (const [source, destination] of [
    ["/coffee", "/collection"],
    ["/coffee/single-origin", "/collection"],
    ["/vision", "/about"],
    ["/system", "/about"],
    ["/signal", "/blog"],
    ["/matter", "/blog"],
    ["/archive", "/blog"],
  ]) {
    assert.match(config, new RegExp(`source:\\s*['\"]${source.replaceAll("/", "\\/")}['\"][\\s\\S]{0,120}destination:\\s*['\"]${destination.replaceAll("/", "\\/")}['\"][\\s\\S]{0,80}permanent:\\s*true`))
  }
})
