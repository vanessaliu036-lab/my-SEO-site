import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const read = (file) => fs.readFileSync(file, "utf8")

test("About, Origins, Solutions and Partnerships share one predictable hero", () => {
  const pages = [
    read("components/templates/about-editorial-template.tsx"),
    read("app/(site)/origins/page.tsx"),
    read("components/templates/solutions-index-template.tsx"),
    read("app/(site)/partnerships/page.tsx"),
  ]

  for (const page of pages) {
    assert.match(page, /InnerPageHero/)
  }

  const hero = read("components/site/inner-page-hero.tsx")
  assert.match(hero, /actions\.slice\(0, 2\)/)
  assert.match(hero, /useReducedMotion/)
  assert.match(hero, /data-motion-static/)
})

test("the shared CTA system preserves one primary and one secondary action", () => {
  const css = read("app/globals.css")
  const finalCta = read("components/site/site-final-cta.tsx")

  assert.match(css, /\.occ-cta--primary/)
  assert.match(css, /\.occ-cta--secondary/)
  assert.match(css, /min-height:\s*48px/)
  assert.match(finalCta, /primaryHref/)
  assert.match(finalCta, /secondaryHref/)
})

test("content-heavy commercial pages use icons and alternating section contrast", () => {
  const roasting = read("app/(site)/solutions/roasting-program/page.tsx")
  const partnerships = read("app/(site)/partnerships/page.tsx")
  const css = read("components/templates/occ-commercial-html-layout.css")

  assert.match(roasting, /Coffee|Layers3|Target|Hotel/)
  assert.match(partnerships, /Building2|Store|Plane|Gift|Handshake/)
  assert.match(css, /feature-band[\s\S]*background:/)
})
