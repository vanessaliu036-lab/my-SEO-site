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
