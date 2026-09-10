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
  assert.match(template, /About/)
  assert.match(template, /Origin\./)
  assert.match(template, /Supply · Quality · Evidence/)
})

test("ABOUT uses the current evidence-led brand copy without retired operating claims", () => {
  const template = read(templatePath)

  assert.match(template, /professional coffee company connecting Cambodian coffee and Fine Robusta authority/)
  assert.match(template, /verifiable origin information, clear standards, and evidence/)
  assert.doesNotMatch(template, /Full traceability from farm to cup|skilled barista army/)
  assert.doesNotMatch(template, /Mondulkiri, Ratanakiri, and Kampot to your espresso machine/)
})

test("ABOUT preserves SEO semantics and only links into the five-section architecture", () => {
  const about = read("app/(site)/about/page.tsx")

  assert.match(about, /About OCC \| Fine Robusta, Coffee Sourcing & B2B Solutions/)
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
