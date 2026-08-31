import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const read = (path) => fs.readFileSync(path, "utf8")
const indexTemplate = "components/templates/solutions-index-template.tsx"
const detailTemplate = "components/templates/solution-detail-template.tsx"
const detailPages = ["wholesale", "roasting-program", "barista-staffing", "equipment-service"]

test("SOLUTIONS index and detail pages share the OCC editorial template system", () => {
  assert.equal(fs.existsSync(indexTemplate), true, "solutions index template must exist")
  assert.equal(fs.existsSync(detailTemplate), true, "solution detail template must exist")

  const index = read("app/(site)/solutions/page.tsx")
  assert.match(index, /SolutionsIndexTemplate/)
  assert.doesNotMatch(index, /border-dashed/)

  for (const slug of detailPages) {
    const source = read(`app/(site)/solutions/${slug}/page.tsx`)
    assert.match(source, /SolutionDetailTemplate/)
    assert.doesNotMatch(source, /<nav className=/)
    assert.doesNotMatch(source, /sticky top-0/)
  }
})

test("solution detail template keeps semantic content server-rendered and delegates only reveal motion", () => {
  const template = read(detailTemplate)
  const reveal = read("components/ui/motion-reveal.tsx")

  assert.doesNotMatch(template, /^"use client"/)
  assert.match(template, /MotionReveal/)
  assert.match(reveal, /useReducedMotion/)
  assert.match(reveal, /0\.22, 1, 0\.36, 1/)
})

test("solution pages preserve Service FAQ Breadcrumb schemas and internal-link logic", () => {
  for (const slug of detailPages) {
    const source = read(`app/(site)/solutions/${slug}/page.tsx`)
    assert.match(source, /"@type": "Service"/)
    assert.match(source, /"@type": "FAQPage"/)
    assert.match(source, /"@type": "BreadcrumbList"/)
    assert.match(source, /renderWithLinks/)
  }

  const index = read("app/(site)/solutions/page.tsx")
  assert.match(index, /"@type": "CollectionPage"/)
})
