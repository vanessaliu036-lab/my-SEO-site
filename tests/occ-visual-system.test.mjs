import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const read = (file) => fs.readFileSync(file, "utf8")

test("global typography and shared editorial tokens remain defined", () => {
  const css = read("app/globals.css")

  assert.match(css, /--occ-ink:/)
  assert.match(css, /--occ-ivory:/)
  assert.match(css, /--occ-ease:/)
  assert.match(css, /--occ-wide:/)
  assert.match(css, /font-family:\s*var\(--font-display\)/)
})

test("public shell keeps the approved editorial width and surface", () => {
  const css = read("app/globals.css")

  assert.match(css, /\.occ-public-shell\s*\{/)
  assert.match(css, /\.occ-wide\s*\{/)
  assert.match(css, /width:\s*min\(calc\(100% - 2\.5rem\), var\(--occ-wide\)\)/)
})

test("horizontal editorial and service layouts retain wide desktop treatment", () => {
  const css = read("app/globals.css")

  assert.match(css, /\.occ-horizontal-service main/)
  assert.match(css, /\.occ-horizontal-editorial main/)
  assert.match(css, /\.occ-horizontal-contact main/)
  assert.match(css, /max-width:\s*var\(--occ-wide\)\s*!important/)
})

test("editorial article headers retain display-scale typography", () => {
  const css = read("app/globals.css")

  assert.match(css, /article\.max-w-5xl > header h1/)
  assert.match(css, /font-size:\s*clamp\(3\.2rem, 6\.6vw, 7\.6rem\)\s*!important/)
})

test("shared site shell exposes responsive navigation controls", () => {
  const header = read("components/site/site-header.tsx")

  assert.match(header, /sm:h-20/)
  assert.match(header, /lg:h-\[52px\]/)
})

test("public navigation exposes OCC commercial pathways", () => {
  const header = read("components/site/site-header.tsx")

  assert.match(header, /About/)
  assert.match(header, /Origins/)
  assert.match(header, /Solutions/)
  assert.match(header, /Contact/)
})

test("homepage keeps its dedicated hero while About hero ownership is route-local", () => {
  const home = read("components/templates/home-template.tsx")
  const aboutLayout = read("app/(site)/about/layout.tsx")
  const css = read("app/globals.css")

  assert.match(home, /\/hero-home\.webp/)
  assert.match(aboutLayout, /background-image:\s*url\("\/about\/hero-image"\)\s*!important/)
  assert.doesNotMatch(css, /background-image:\s*url\(["']?\/about\//)
})

test("About semantic photo surfaces are owned by the About route and template, not global CSS", () => {
  const about = read("components/templates/about-editorial-template.tsx")
  const aboutLayout = read("app/(site)/about/layout.tsx")
  const css = read("app/globals.css")

  assert.match(aboutLayout, /aria-label=\\?"Cambodian coffee at origin\\?"/)
  assert.match(aboutLayout, /\/about\/hero-image/)
  assert.match(about, /aria-label="Cambodian coffee origin and production"/)
  assert.match(about, /bg-cover bg-center/)
  assert.match(about, /section className="grid grid-cols-2 bg-\[#2f3b2d\] lg:grid-cols-4" aria-label="OCC origin and commercial paths"/)
  assert.doesNotMatch(css, /aria-label="Cambodian coffee at origin"[^}]*background-image/)
  assert.doesNotMatch(css, /aria-label="Cambodian coffee origin and production"[^}]*background-image/)
})

test("About mobile gallery uses a compact two-column card grid", () => {
  const css = read("app/globals.css")

  assert.match(css, /@media \(max-width: 1023px\)[\s\S]*?grid-template-columns:\s*repeat\(2, minmax\(0, 1fr\)\)\s*!important/)
  assert.match(css, /@media \(max-width: 1023px\)[\s\S]*?aspect-ratio:\s*3\s*\/\s*4\s*!important/)
})

test("About desktop hero follows the approved full-bleed centered reference", () => {
  const about = read("components/templates/about-editorial-template.tsx")
  const hero = about.split('<section id="why-occ"')[0]

  assert.match(hero, /aria-label="Cambodian coffee at origin"/)
  assert.match(hero, /min-h-\[620px\]/)
  assert.match(hero, /text-center/)
  assert.match(hero, /One origin\. Cambodia\./)
  assert.doesNotMatch(hero, /lg:grid-cols-\[0\.92fr_1\.08fr\]/)
})
