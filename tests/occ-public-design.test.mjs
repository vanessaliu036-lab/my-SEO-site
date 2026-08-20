import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const read = (path) => fs.readFileSync(path, "utf8")

test("public chrome exposes all seven OCC categories and removes legacy sidebar from root layout", () => {
  const nav = read("components/ui/public-top-nav.tsx")
  const layout = read("app/layout.tsx")

  for (const label of [
    "HOME",
    "ABOUT",
    "COFFEE",
    "COLLECTION",
    "INSIGHTS",
    "SOLUTIONS",
    "CULTURE & ETHICS",
  ]) {
    assert.match(nav, new RegExp(label.replace("&", "\\&")))
  }

  assert.doesNotMatch(layout, /SiteSidebar/)
  assert.match(layout, /PublicSiteChrome/)
})

test("about uses the reusable minimalist hero with a coffee package and preserves SEO semantics", () => {
  const hero = read("components/ui/minimalist-hero.tsx")
  const bag = read("components/ui/coffee-bag-visual.tsx")
  const about = read("app/about/page.tsx")

  assert.match(hero, /framer-motion/)
  assert.match(hero, /@\/lib\/utils/)
  assert.match(bag, /FINE ROBUSTA/)
  assert.match(about, /MinimalistHero/)
  assert.match(about, /CoffeeBagVisual/)
  assert.match(about, /ABOUT/)
  assert.match(about, /ORIGIN\./)
  assert.match(about, /About Origin \| Origin Coffee Cambodia - OCC Coffee Roaster/)
  assert.match(about, /AboutPage/)
})

test("collection uses the approved overlapping three-package composition without changing routes or schema", () => {
  const page = read("app/collection/page.tsx")
  const stage = read("components/ui/collection-package-stage.tsx")

  assert.match(page, /CollectionPackageStage/)
  assert.match(page, /THREE EXPRESSIONS/)
  assert.match(page, /CollectionPage/)
  for (const slug of ["sovann", "prek", "angkar"]) {
    assert.match(page, new RegExp(`slug: "${slug}"`))
  }
  assert.match(stage, /framer-motion/)
  assert.match(stage, /CoffeeBagVisual/)
  assert.match(stage, /\/collection\/\$\{item\.slug\}/)
})

test("origin page exposes four source-backed features and alternating motion while preserving JSON-LD", () => {
  const page = read("app/coffee/single-origin/page.tsx")
  const feature = read("components/ui/origin-feature-strip.tsx")
  const reveal = read("components/ui/alternating-reveal-section.tsx")

  for (const label of ["ALTITUDE", "TERROIR", "ORIGIN", "TRACEABILITY"]) {
    assert.match(page, new RegExp(label))
  }
  assert.match(feature, /lucide-react/)
  assert.match(reveal, /whileInView/)
  assert.match(reveal, /amount:\s*0\.25/)
  assert.match(reveal, /useReducedMotion/)
  assert.match(page, /ItemList/)
  assert.match(page, /FAQPage/)
  assert.match(page, /BreadcrumbList/)
  assert.match(page, /Terroir Architecture\./)
})

test("route families share one OCC horizontal frame while page-level SEO logic remains owned by each route", () => {
  const frame = read("components/ui/occ-horizontal-frame.tsx")
  assert.match(frame, /occ-horizontal-frame/)

  for (const layoutPath of [
    "app/about/layout.tsx",
    "app/solutions/layout.tsx",
    "app/collection/layout.tsx",
    "app/coffee/layout.tsx",
    "app/contact/layout.tsx",
    "app/vision/layout.tsx",
    "app/system/layout.tsx",
    "app/signal/layout.tsx",
    "app/matter/layout.tsx",
    "app/archive/layout.tsx",
  ]) {
    assert.match(read(layoutPath), /OccHorizontalFrame/)
  }

  const blogLayout = read("app/blog/layout.tsx")
  assert.match(blogLayout, /OccHorizontalFrame/)
  assert.match(blogLayout, /"@type": "Blog"/)

  const wholesale = read("app/solutions/wholesale/page.tsx")
  assert.match(wholesale, /"@type": "FAQPage"/)
  assert.match(wholesale, /"@type": "Service"/)
  assert.match(wholesale, /"@type": "BreadcrumbList"/)

  const article = read("app/blog/[slug]/page.tsx")
  assert.match(article, /ROBUSTA_PILLAR_SLUG/)
  assert.match(article, /Article/)
  assert.match(article, /BreadcrumbList/)

  const contact = read("app/contact/page.tsx")
  assert.match(contact, /ContactForm/)

  const signal = read("app/signal/page.tsx")
  assert.match(signal, /index:\s*false/)
})
