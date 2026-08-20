import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const read = (path) => fs.readFileSync(path, "utf8")
const cssPath = "app/(site)/blog/[slug]/article-editorial.css"

test("blog articles use one editorial shell without changing the Airtable rendering pipeline", () => {
  const layout = read("app/(site)/blog/[slug]/layout.tsx")
  const page = read("app/(site)/blog/[slug]/page.tsx")

  assert.equal(fs.existsSync(cssPath), true, "article editorial stylesheet must exist")
  assert.match(layout, /article-editorial\.css/)
  assert.match(layout, /occ-article-shell/)
  assert.match(page, /getPostBySlug/)
  assert.match(page, /formatContent/)
  assert.match(page, /generateMetadata/)
  assert.match(page, /generateStaticParams/)
  assert.match(page, /ROBUSTA_PILLAR_SLUG/)
})

test("article editorial CSS removes duplicate nav and establishes readable wide hierarchy", () => {
  const css = read(cssPath)

  assert.match(css, /top:\s*80px/)
  assert.match(css, /max-width:\s*1680px/)
  assert.match(css, /grid-template-columns:\s*repeat\(12,\s*minmax\(0,\s*1fr\)\)/)
  assert.match(css, /max-width:\s*820px/)
  assert.match(css, /display:\s*none/)
  assert.match(css, /var\(--font-display\)/)
})
