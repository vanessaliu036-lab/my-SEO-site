import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const read = (path) => fs.readFileSync(path, "utf8")
const contactCss = "app/(site)/contact/contact-editorial.css"

test("BLOG index restores the verified pre-admin journal UI while preserving pagination and Airtable data", () => {
  const page = read("app/(site)/blog/page.tsx")
  assert.match(page, /bg-white/)
  assert.match(page, /max-w-5xl/)
  assert.match(page, /Field Notes &amp; Craft/)
  assert.match(page, /The Signal\./)
  assert.match(page, /getAllPosts/)
  assert.match(page, /POSTS_PER_PAGE/)
  assert.match(page, /totalPages/)
  assert.match(page, /redirect/)
  assert.match(page, /"@type": "BreadcrumbList"/)
})

test("CONTACT uses its existing editorial shell without changing ContactForm behavior", () => {
  const page = read("app/(site)/contact/page.tsx")
  const form = read("app/(site)/contact/ContactForm.tsx")

  assert.equal(fs.existsSync(contactCss), true, "contact editorial stylesheet must exist")
  assert.match(page, /contact-editorial\.css/)
  assert.match(page, /occ-contact-shell/)
  assert.match(page, /<ContactForm/)
  assert.match(form, /useForm<ContactFormData>/)
  assert.match(form, /submitContactForm/)
  assert.match(form, /zodResolver/)
  assert.match(form, /isSuccess/)
})

test("CONTACT editorial CSS retains its current behavior", () => {
  const css = read(contactCss)
  assert.match(css, /display:\s*none/)
  assert.match(css, /#f6f3ea/)
  assert.match(css, /#182019/)
  assert.match(css, /var\(--font-display\)/)
})
