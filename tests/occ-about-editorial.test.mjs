import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const read = (path) => fs.readFileSync(path, "utf8")
const templatePath = "components/templates/about-editorial-template.tsx"

test("ABOUT uses the approved editorial template instead of the old demo hero", () => {
  const about = read("app/(site)/about/page.tsx")
  assert.equal(fs.existsSync(templatePath), true, "editorial ABOUT template must exist")
  const template = read(templatePath)

  assert.match(about, /AboutEditorialTemplate/)
  assert.doesNotMatch(about, /MinimalistHero/)
  assert.doesNotMatch(about, /const aboutNav/)
  assert.match(template, /<h1/)
  assert.match(template, /One origin/)
  assert.match(template, /Cambodia/)
  assert.match(template, /How would you like to work with OCC/)
  assert.match(template, /next\/image/)
  assert.match(template, /occ-about-hero-left\.webp/)
})

test("ABOUT preserves its existing visible brand copy while changing presentation", () => {
  const template = read(templatePath)

  assert.match(template, /A Cambodian coffee supplier with one origin to protect/)
  assert.match(template, /A Premium Cambodian Coffee Brand/)
  assert.match(template, /One origin\. Clear principles/)
  assert.match(template, /Cambodian coffee for international markets/)
  assert.match(template, /Ready-to-Sell/)
  assert.match(template, /Made-for-You/)
})

test("ABOUT preserves SEO semantics and only links into the five-section architecture", () => {
  const about = read("app/(site)/about/page.tsx")

  assert.match(about, /About Origin Coffee Cambodia \| Fine Robusta & B2B Coffee/)
  assert.match(about, /"@type": "AboutPage"/)
  assert.match(about, /"@type": "BreadcrumbList"/)
  assert.match(about, /\/about\/mission/)
  assert.match(about, /\/about\/founder/)
  assert.match(about, /\/about\/manifesto/)
  assert.match(about, /\/about\/sustainability/)
  assert.doesNotMatch(about, /href="\/vision"/)
  assert.doesNotMatch(about, /href="\/system"/)
})

test("ABOUT editorial layout is responsive and reduced-motion aware", () => {
  assert.equal(fs.existsSync(templatePath), true, "editorial ABOUT template must exist")
  const template = read(templatePath)
  const styles = read("components/templates/about-editorial-template.module.css")

  assert.match(styles, /@media \(max-width: 680px\)/)
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/)
  assert.match(styles, /grid-template-columns/)
  assert.match(template, /aria-labelledby/)
})
