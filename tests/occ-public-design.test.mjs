import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const read = (path) => fs.readFileSync(path, "utf8")

test("retained ABOUT and COLLECTION pages preserve their SEO semantics after route grouping", () => {
  const about = read("app/(site)/about/page.tsx")
  const collection = read("app/(site)/collection/page.tsx")

  assert.match(about, /AboutPage/)
  assert.match(about, /About Origin \| Origin Coffee Cambodia - OCC Coffee Roaster/)
  assert.match(collection, /CollectionPage/)
  for (const slug of ["sovann", "prek", "angkar"]) {
    assert.match(collection, new RegExp(`slug: "${slug}"`))
  }
})

test("shared site shell owns chrome while blog keeps non-visual schema and pillar helpers", () => {
  const siteLayout = read("app/(site)/layout.tsx")
  const siteShell = read("components/site/site-shell.tsx")
  const blogLayout = read("app/(site)/blog/layout.tsx")
  const postLayout = read("app/(site)/blog/[slug]/layout.tsx")

  assert.match(siteLayout, /SiteShell/)
  assert.match(siteShell, /SiteHeader/)
  assert.match(blogLayout, /"@type": "Blog"/)
  assert.doesNotMatch(blogLayout, /OccHorizontalFrame/)
  assert.match(postLayout, /MONEY_PILLARS/)
  assert.match(postLayout, /Related buyer guide/)
})

test("retained service, article, and contact SEO/function logic remains in place", () => {
  const wholesale = read("app/(site)/solutions/wholesale/page.tsx")
  const article = read("app/(site)/blog/[slug]/page.tsx")
  const contact = read("app/(site)/contact/page.tsx")
  const contactAction = read("app/(site)/contact/action.ts")

  assert.match(wholesale, /"@type": "FAQPage"/)
  assert.match(wholesale, /"@type": "Service"/)
  assert.match(wholesale, /"@type": "BreadcrumbList"/)
  assert.match(article, /Article/)
  assert.match(article, /BreadcrumbList/)
  assert.match(contact, /ContactForm/)
  assert.match(contactAction, /"use server"/)
})

test("approved reusable product and motion primitives remain available for the visual redesign phase", () => {
  const packageStage = read("components/ui/collection-package-stage.tsx")
  const bag = read("components/ui/coffee-bag-visual.tsx")
  const reveal = read("components/ui/alternating-reveal-section.tsx")

  assert.match(packageStage, /framer-motion/)
  assert.match(packageStage, /CoffeeBagVisual/)
  assert.match(bag, /FINE ROBUSTA/)
  assert.match(reveal, /whileInView/)
  assert.match(reveal, /useReducedMotion/)
})
