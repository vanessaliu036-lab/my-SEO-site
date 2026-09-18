import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const read = (path) => fs.readFileSync(path, "utf8")
const templatePath = "components/templates/about-editorial-template.tsx"
const stylePath = "components/templates/about-editorial-template.module.css"

test("About opens with OCC identity before services", () => {
  const source = read(templatePath)

  assert.match(source, /One origin\.<br \/>Cambodia\./)
  assert.match(source, /100% Cambodia origin/i)
  assert.match(source, /Fine Robusta specialist/i)
  assert.match(source, /Small batches/i)
  assert.match(source, /Origin clarity/i)
  assert.match(source, /Quality focus/i)
})

test("About explains OCC differentiation in buyer-readable language", () => {
  const source = read(templatePath)

  for (const phrase of [
    "One origin",
    "Small batches",
    "Origin clarity",
    "Quality focus",
    "Cambodian Fine Robusta expertise",
    "A Premium Cambodian Coffee Brand",
  ]) {
    assert.match(source, new RegExp(phrase, "i"), `${phrase} must be present`)
  }
})

test("About routes overseas buyers into the two approved commercial paths", () => {
  const source = read(templatePath)

  assert.match(source, /How would you like to work with OCC\?/i)
  assert.match(source, /Ready-to-Sell/i)
  assert.match(source, /Choose our profile/i)
  assert.match(source, /Made-for-You/i)
  assert.match(source, /Build yours/i)
  assert.match(source, /href="\/solutions"/)
  assert.match(source, /\/solutions\/roasting-program/)
  assert.match(source, /distributors/i)
  assert.match(source, /importers/i)
  assert.match(source, /retailers/i)
  assert.match(source, /hospitality/i)
  assert.match(source, /custom roasting/i)
  assert.match(source, /repeatable production profile/i)
})

test("About closes with international market direction without service sprawl", () => {
  const source = read(templatePath)

  assert.match(source, /international distributors/i)
  assert.match(source, /importers/i)
  assert.match(source, /retailers/i)
  assert.match(source, /hospitality partners/i)
  assert.doesNotMatch(source, /Barista Staffing|Equipment Service/)
})

test("About uses the approved editorial photo-led visual system without replacing shared site chrome", () => {
  const source = read(templatePath)
  const css = read(stylePath)

  assert.match(css, /#fcfaf8/i)
  assert.match(css, /#282724/i)
  assert.match(css, /#f3f0ec/i)
  assert.match(source, /\/about\/occ-about-hero-left\.webp/)
  assert.match(source, /\/about\/occ-about-hero-right\.webp/)
  assert.match(source, /\/about\/occ-about-origin\.webp/)
  assert.match(source, /\/about\/occ-about-fine-robusta\.webp/)
  assert.match(source, /\/about\/occ-about-solutions\.webp/)
  assert.match(source, /\/about\/occ-about-intro\.webp/)
  assert.doesNotMatch(source, /occ-about-atlas\.avif/)
  assert.doesNotMatch(source, /about-origin\.svg|about-fine-robusta\.svg|about-ready-to-sell\.svg|about-made-for-you\.svg/)
  assert.doesNotMatch(source, /occ-logo-primary-local\.svg/)
})