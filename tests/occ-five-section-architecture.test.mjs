import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"

const root = process.env.OCC_TEST_ROOT || process.cwd()
const exists = (relativePath) => fs.existsSync(path.join(root, relativePath))
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8")

test("OCC keeps current grouped public routes and has no legacy product collection or admin route", () => {
  for (const required of [
    "app/(site)/layout.tsx",
    "app/(site)/page.tsx",
    "app/(site)/about/page.tsx",
    "app/(site)/solutions/page.tsx",
    "app/(site)/distribution/page.tsx",
    "app/(site)/blog/page.tsx",
    "app/(site)/blog/[slug]/page.tsx",
    "app/(site)/contact/page.tsx",
    "components/site/site-header.tsx",
    "components/site/navigation-data.ts",
    "components/site/site-shell.tsx",
  ]) {
    assert.equal(exists(required), true, `missing ${required}`)
  }

  for (const forbidden of [
    "app/about",
    "app/solutions",
    "app/collection",
    "app/(site)/collection",
    "app/(site)/coffee/single-origin",
    "app/(site)/origins/prek",
    "app/blog",
    "app/contact",
    "app/admin",
    "app/(admin)/admin",
    "components/Navigation.tsx",
    "components/SiteSidebar.tsx",
    "components/ui/collection-package-stage.tsx",
    "components/ui/coffee-bag-visual.tsx",
  ]) {
    assert.equal(exists(forbidden), false, `legacy or forbidden source still exists: ${forbidden}`)
  }
})

test("retired PREK origin URL routes to the current Cambodia origin owner", () => {
  const nextConfig = read("next.config.mjs")
  const sitemap = read("app/sitemap.ts")
  const llms = read("public/llms.txt")
  assert.match(
    nextConfig,
    /source:\s*['"]\/origins\/prek['"][\s\S]{0,160}?destination:\s*['"]\/origins['"][\s\S]{0,80}?permanent:\s*true/,
  )
  assert.doesNotMatch(sitemap, /`\$\{siteUrl\}\/origins\/prek`/)
  assert.doesNotMatch(llms, /SOVANN|PREK|ANGKAR|\/origins\/prek/)
  assert.match(llms, /\/origins\/single-origin/)
  assert.match(llms, /\/origins\/farm-terroir/)
})

test("public navigation exposes the current origin architecture with no legacy product access", () => {
  const header = read("components/site/site-header.tsx")
  const nav = read("components/site/navigation-data.ts")
  const shell = read("components/site/site-shell.tsx")

  for (const label of ["ABOUT", "SOLUTIONS", "ORIGINS", "BLOG", "CONTACT"]) {
    assert.match(nav, new RegExp(label))
  }
  for (const child of [
    "Mission", "Founder", "Manifesto", "Sustainability", "Wholesale", "Roasting Program",
    "Barista Staffing", "Equipment Service", "Single Origin", "Fine Robusta Cambodia", "Farm & Terroir",
  ]) {
    assert.match(nav, new RegExp(child))
  }
  assert.match(header, /siteNavigation/)
  assert.doesNotMatch(`${header}\n${nav}\n${shell}`, /SOVANN|PREK|ANGKAR|\/collection\/|\/admin|Staff Access/i)
  assert.doesNotMatch(shell, /SiteSidebar|components\/Navigation/)
})

test("root layout owns global document concerns but not public chrome", () => {
  const layout = read("app/layout.tsx")
  assert.doesNotMatch(layout, /AdminFrontendSwitch/)
  assert.match(layout, /GoogleAnalytics/)
  assert.match(layout, /Analytics/)
  assert.match(layout, /application\/ld\+json/)
})
