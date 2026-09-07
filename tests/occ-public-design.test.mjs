import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const read = (path) => fs.readFileSync(path, "utf8")

test("retained ABOUT and DISTRIBUTION pages preserve public SEO semantics after route cleanup", () => {
  const about = read("app/(site)/about/page.tsx")
  const distribution = read("app/(site)/distribution/page.tsx")

  assert.match(about, /AboutPage/)
  assert.match(about, /About Origin \| Origin Coffee Cambodia - OCC Coffee Roaster/)
  assert.match(distribution, /Distribution Partners \| Cambodian Coffee Brand \| OCC/)
  assert.match(distribution, /pageAlternates\("\/distribution"\)/)
})

test("shared site shell owns one top navigation while blog keeps non-visual schema and pillar helpers", () => {
  const siteLayout = read("app/(site)/layout.tsx")
  const siteShell = read("components/site/site-shell.tsx")
  const siteHeader = read("components/site/site-header.tsx")
  const blogLayout = read("app/(site)/blog/layout.tsx")
  const postLayout = read("app/(site)/blog/[slug]/layout.tsx")

  assert.match(siteLayout, /SiteShell/)
  assert.match(siteShell, /SiteHeader/)
  assert.doesNotMatch(siteShell, /SiteSidebar|components\/Navigation/)
  assert.match(siteHeader, /siteNavigation/)
  assert.match(blogLayout, /"@type": "Blog"/)
  assert.doesNotMatch(blogLayout, /OccHorizontalFrame/)
  assert.doesNotMatch(siteShell, /StaffAccess|\/admin/)
  assert.ok(postLayout.length > 0)
})

test("retained service, article, and contact SEO/function logic remains in place", () => {
  const wholesale = read("app/(site)/solutions/wholesale/page.tsx")
  const article = read("app/(site)/blog/[slug]/page.tsx")
  const contact = read("app/(site)/contact/page.tsx")
  const contactAction = read("app/(site)/contact/action.ts")

  assert.match(wholesale, /permanentRedirect/)
  assert.match(article, /Article/)
  assert.match(article, /BreadcrumbList/)
  assert.match(contact, /ContactForm/)
  assert.match(contactAction, /"use server"/)
})

test("approved reusable motion and coffee visual primitives remain available", () => {
  const bag = read("components/ui/coffee-bag-visual.tsx")
  const reveal = read("components/ui/alternating-reveal-section.tsx")

  assert.match(bag, /FINE ROBUSTA/)
  assert.match(reveal, /whileInView/)
  assert.match(reveal, /useReducedMotion/)
})
