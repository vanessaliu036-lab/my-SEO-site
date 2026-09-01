import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const read = (path) => fs.readFileSync(path, "utf8")
const cssPath = "app/(site)/collection/collection-product.css"

test("collection product pages share one visual skin without rewriting SEO-rich product sources", () => {
  const layout = read("app/(site)/collection/layout.tsx")
  assert.equal(fs.existsSync(cssPath), true, "collection product stylesheet must exist")
  assert.match(layout, /collection-product\.css/)
  assert.match(layout, /occ-collection-shell/)

  for (const slug of ["sovann", "prek", "angkar"]) {
    const page = read(`app/(site)/collection/${slug}/page.tsx`)
    assert.match(page, /"@type": "Product"/)
    assert.match(page, /"@type": "FAQPage"/)
    assert.match(page, /"@type": "BreadcrumbList"/)
  }
})

test("shared product skin creates central package heroes and unified OCC typography", () => {
  const css = read(cssPath)
  assert.match(css, /\.occ-sovann/)
  assert.match(css, /\.occ-prek/)
  assert.match(css, /\.occ-angkar/)
  assert.match(css, /header::before/)
  assert.match(css, /header::after/)
  assert.match(css, /var\(--font-display\)/)
  assert.match(css, /#f6f3ea/)
  assert.match(css, /\.panel[^{]*\{[^}]*display:\s*none/s)
})
