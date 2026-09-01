import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const read = (path) => fs.readFileSync(path, "utf8")
const templatePath = "components/templates/about-institutional-template.tsx"
const pages = ["mission", "founder", "manifesto", "sustainability"]

test("ABOUT child pages share one institutional editorial template", () => {
  assert.equal(fs.existsSync(templatePath), true, "institutional ABOUT template must exist")
  const template = read(templatePath)
  assert.match(template, /framer-motion/)
  assert.match(template, /useReducedMotion/)
  assert.match(template, /whileInView/)
  assert.match(template, /0\.22, 1, 0\.36, 1/)

  for (const page of pages) {
    const source = read(`app/(site)/about/${page}/page.tsx`)
    assert.match(source, /AboutInstitutionalTemplate/)
    assert.doesNotMatch(source, /<nav className=/)
    assert.doesNotMatch(source, /fixed -bottom-10 -left-10/)
  }
})

test("ABOUT child pages retain their existing SEO schema types", () => {
  const mission = read("app/(site)/about/mission/page.tsx")
  const founder = read("app/(site)/about/founder/page.tsx")
  const manifesto = read("app/(site)/about/manifesto/page.tsx")
  const sustainability = read("app/(site)/about/sustainability/page.tsx")

  assert.match(mission, /"@type": "AboutPage"/)
  assert.match(mission, /"@type": "BreadcrumbList"/)
  assert.match(founder, /"@type": "FAQPage"/)
  assert.match(founder, /"@type": "BreadcrumbList"/)
  assert.match(manifesto, /"@type": "Article"/)
  assert.match(manifesto, /"@type": "FAQPage"/)
  assert.match(sustainability, /"@type": "ItemList"/)
  assert.match(sustainability, /"@type": "FAQPage"/)
  assert.match(sustainability, /"@type": "BreadcrumbList"/)
})
