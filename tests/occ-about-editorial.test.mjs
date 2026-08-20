import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const read = (path) => fs.readFileSync(path, "utf8")

test("ABOUT uses the approved editorial template instead of the old demo hero", () => {
  const about = read("app/(site)/about/page.tsx")
  const template = read("components/templates/about-editorial-template.tsx")

  assert.match(about, /AboutEditorialTemplate/)
  assert.doesNotMatch(about, /MinimalistHero/)
  assert.doesNotMatch(about, /const aboutNav/)
  assert.match(template, /<h1/)
  assert.match(template, /ABOUT/)
  assert.match(template, /ORIGIN\./)
  assert.match(template, /OCC BUILDS INFRASTRUCTURE\./)
})

test("ABOUT preserves SEO semantics and only links into the five-section architecture", () => {
  const about = read("app/(site)/about/page.tsx")

  assert.match(about, /About Origin \| Origin Coffee Cambodia - OCC Coffee Roaster/)
  assert.match(about, /"@type": "AboutPage"/)
  assert.match(about, /"@type": "BreadcrumbList"/)
  assert.match(about, /\/about\/mission/)
  assert.match(about, /\/about\/founder/)
  assert.match(about, /\/about\/manifesto/)
  assert.match(about, /\/about\/sustainability/)
  assert.doesNotMatch(about, /href="\/vision"/)
  assert.doesNotMatch(about, /href="\/system"/)
})

test("ABOUT editorial motion is restrained and reduced-motion aware", () => {
  const template = read("components/templates/about-editorial-template.tsx")

  assert.match(template, /framer-motion/)
  assert.match(template, /useReducedMotion/)
  assert.match(template, /0\.22, 1, 0\.36, 1/)
  assert.match(template, /whileInView/)
})
