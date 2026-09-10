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

test("ABOUT child pages use accurate institutional schemas without retired rich-result markup", () => {
  for (const page of pages) {
    const source = read(`app/(site)/about/${page}/page.tsx`)
    assert.match(source, /"@type": "AboutPage"/)
    assert.match(source, /"@type": "BreadcrumbList"/)
    assert.doesNotMatch(source, /"@type": "(?:FAQPage|Article|ItemList)"/)
  }
})
