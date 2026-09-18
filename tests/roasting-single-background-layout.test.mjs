import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const read = (path) => fs.readFileSync(path, "utf8")
const page = read("app/(site)/solutions/roasting-program/page.tsx")
const layout = read("app/(site)/solutions/roasting-program/layout.tsx")
const shared = read("components/templates/occ-commercial-html-layout.tsx")
const siteLayout = read("app/(site)/layout.tsx")

test("roasting retains approved long copy under the user-supplied shared HTML layout", () => {
  for (const heading of ["CUSTOM ROASTING PROGRAM", "Your Market. Your Customer. Your Roast Profile.", "From Market to Production Profile", "Choose Our Profile. Or Build Yours."]) {
    assert.ok(page.includes(heading), `approved copy missing: ${heading}`)
  }
  assert.match(page, /OccCommercialHtmlLayout/)
  assert.doesNotMatch(page, /CommercialSolutionTemplate/)
  assert.match(siteLayout, /SiteShell/)
  assert.match(shared, /className="hero"/)
  assert.match(shared, /className="split-section"/)
  assert.match(shared, /className="feature-band"/)
  assert.match(shared, /className="b2b-cta"/)
})

test("roasting removes the duplicate gallery and CSS override; preserves global chrome", () => {
  assert.doesNotMatch(layout, /roasting-photo-gallery|occ-roasting-program-background|<Image\b|<(?:header|footer|nav)\b/)
  assert.doesNotMatch(page, /<(?:header|footer|nav)\b/)
  assert.match(page, /\/images\/roasting\/roaster-evaluation\.png/)
  assert.match(page, /\/images\/roasting\/coffee-beans-reference\.png/)
  for (const path of ["public/images/roasting/roaster-evaluation.png", "public/images/roasting/coffee-beans-reference.png"]) {
    assert.equal(fs.existsSync(path), true, `missing official photo: ${path}`)
  }
})
