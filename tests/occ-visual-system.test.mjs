import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const read = (path) => fs.readFileSync(path, "utf8")

test("OCC global visual system keeps only title, subtitle and body font roles", () => {
  const layout = read("app/layout.tsx")
  assert.match(layout, /--occ-font-title:/)
  assert.match(layout, /--occ-font-subtitle:/)
  assert.match(layout, /--occ-font-body:/)
  assert.match(layout, /occ-typography-system/)
})

test("shared OCC chrome uses the transparent official logo without background tiles", () => {
  const header = read("components/site/site-header.tsx")
  const footer = read("components/site/site-footer.tsx")
  const logo = read("public/occ-logo-primary-local.svg")
  assert.doesNotMatch(header, /bg-\[#FAF8F3\]/)
  assert.doesNotMatch(footer, /bg-\[#FAF8F3\]/)
  assert.doesNotMatch(logo, /<rect\b/)
})

test("homepage and About keep photo-led assets with no baked-in text dependency", () => {
  const home = read("components/templates/home-template.tsx")
  const about = read("components/templates/about-editorial-template.tsx")
  assert.match(home, /\/hero-home\.webp/)
  assert.match(about, /\/about\/occ-about-atlas\.avif/)
})
