import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const footer = fs.readFileSync("components/site/site-footer.tsx", "utf8")

test("desktop footer has no forced 180px empty navigation row", () => {
  assert.doesNotMatch(footer, /lg:min-h-\[180px\]/)
  assert.match(footer, /index\s*>=\s*4\s*\?\s*"lg:col-span-2 lg:py-4"/)
})

test("footer keeps the six approved links in shared navigation and intact brand", () => {
  assert.match(footer, /siteNavigation\.map\(\(item, index\)/)
  assert.match(footer, /aria-label="Footer navigation"/)
  assert.match(footer, /src="\/occ-logo-primary-local\.svg"/)
  assert.match(footer, /Start an enquiry/)
  assert.match(footer, /lg:grid-cols-4/)
})

test("footer reduces excess desktop outer space but keeps mobile spacing", () => {
  assert.match(footer, /px-5 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-12/)
  assert.match(footer, /pb-10 lg:grid-cols-\[0\.9fr_2\.1fr\] lg:gap-12 lg:pb-8/)
  assert.match(footer, /sm:grid-cols-2 lg:grid-cols-4/)
})

test("footer carries the requested 2024 Lumora Studio KH credit", () => {
  assert.match(footer, /© 2024 Origin Coffee Cambodia/)
  assert.match(footer, /href="https:\/\/lumora-studiokh\.vercel\.app\/"/)
  assert.match(footer, />Lumora Studio KH<\/a>/)
  assert.match(footer, /target="_blank" rel="noopener noreferrer"/)
})
