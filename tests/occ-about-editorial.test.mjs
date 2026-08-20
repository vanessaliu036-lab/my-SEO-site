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
  assert.match(template, /ABOUT/)
  assert.match(template, /ORIGIN\./)
  assert.match(template, /OCC BUILDS INFRASTRUCTURE\./)
})

test("ABOUT preserves its existing visible brand copy while changing presentation", () => {
  const template = read(templatePath)

  assert.match(template, /Full traceability from farm to cup, documenting every step of our coffee's journey from Mondulkiri, Ratanakiri, and Kampot to your espresso machine\./)
  assert.match(template, /Building a skilled barista army through comprehensive education programs that elevate service standards across Cambodia's café industry\./)
  assert.match(template, /Long-term relationships with farmers, café owners, and hospitality businesses built on trust, consistency, and shared growth\./)
  assert.match(template, /Partnering with cafés, hotels, restaurants, and coffee enthusiasts across Cambodia/)
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
  assert.equal(fs.existsSync(templatePath), true, "editorial ABOUT template must exist")
  const template = read(templatePath)

  assert.match(template, /framer-motion/)
  assert.match(template, /useReducedMotion/)
  assert.match(template, /0\.22, 1, 0\.36, 1/)
  assert.match(template, /whileInView/)
})
