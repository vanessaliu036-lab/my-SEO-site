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

test("global header keeps one approved OCC logo size across public pages", () => {
  const header = read("components/site/site-header.tsx")

  assert.match(header, /src="\/occ-logo-primary-local\.svg"/)
  assert.match(header, /h-\[52px\][^\n]*sm:h-\[58px\][^\n]*lg:h-\[64px\]/)
  assert.match(header, /h-\[88px\][^\n]*sm:h-24/)
})

test("responsive chrome keeps desktop navigation distinct from the mobile drawer", () => {
  const header = read("components/site/site-header.tsx")
  const mobileMenu = read("components/site/mobile-menu.tsx")

  assert.match(header, /lg:flex/)
  assert.match(header, /lg:hidden/)
  assert.match(mobileMenu, /siteNavigation\.map/)
  assert.match(mobileMenu, /text-3xl/)
})

test("standalone primary navigation keeps approved order and is not demoted to footer utilities", () => {
  const navigation = read("components/site/navigation-data.ts")
  const footer = read("components/site/site-footer.tsx")

  const partnerships = navigation.indexOf('{ label: "PARTNERSHIPS", href: "/partnerships" }')
  const distribution = navigation.indexOf('{ label: "DISTRIBUTION", href: "/distribution" }')
  const blog = navigation.indexOf('{ label: "BLOG", href: "/blog" }')
  const contact = navigation.indexOf('{ label: "CONTACT", href: "/contact" }')

  assert.ok(partnerships >= 0 && distribution > partnerships && blog > distribution && contact > blog)
  assert.doesNotMatch(footer, /const utilityItems/)
  assert.match(footer, /const standaloneItems/)
  assert.match(footer, /standaloneItems\.map/)
})

test("homepage and About keep photo-led assets with no baked-in text dependency", () => {
  const home = read("components/templates/home-template.tsx")
  const about = read("components/templates/about-editorial-template.tsx")
  assert.match(home, /\/hero-home\.webp/)
  assert.match(about, /\/about\/occ-about-atlas\.avif/)
})

test("About desktop hero uses a split readable composition instead of centered copy over the full atlas", () => {
  const about = read("components/templates/about-editorial-template.tsx")

  assert.match(about, /lg:grid-cols-\[0\.92fr_1\.08fr\]/)
  assert.match(about, /backgroundSize: "400% auto"/)
  assert.match(about, /backgroundPosition: "0% 50%"/)
  assert.match(about, /One origin\./)
  assert.match(about, /Cambodia\./)
})

test("About desktop polish keeps bounded hero height and compact four-card entry rhythm", () => {
  const about = read("components/templates/about-editorial-template.tsx")

  assert.match(about, /lg:min-h-\[680px\][^\n]*xl:min-h-\[700px\]/)
  assert.match(about, /lg:aspect-square[^\n]*xl:aspect-\[5\/4\]/)
  assert.match(about, /group-hover:scale-\[1\.025\]/)
  assert.match(about, /lg:py-28/)
})

test("About four visual entrances are real links to approved owner pages", () => {
  const about = read("components/templates/about-editorial-template.tsx")

  for (const [label, href] of [
    ["ONE ORIGIN", "/origins"],
    ["FINE ROBUSTA", "/fine-robusta-cambodia"],
    ["READY-TO-SELL", "/solutions/wholesale"],
    ["MADE-FOR-YOU", "/solutions/roasting-program"],
  ]) {
    assert.match(about, new RegExp(`label: "${label}"[\\s\\S]*?href: "${href.replaceAll("/", "\\/")}"`))
  }

  assert.match(about, /galleryPanels\.map\([\s\S]*?<Link/)
})
