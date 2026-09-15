import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const read = (path) => fs.readFileSync(path, "utf8")
const templatePath = "components/templates/about-editorial-template.tsx"

test("About opens with OCC identity before services", () => {
  const source = read(templatePath)

  assert.match(source, /One origin\. Cambodia\./)
  assert.match(source, /100% Cambodia-origin specialty coffee supplier/i)
  assert.match(source, /Fine Robusta specialist/i)
  assert.match(source, /small batches/i)
  assert.match(source, /origin, quality and roasting/i)
  assert.match(source, /new markets/i)
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
  assert.match(source, /\/solutions\/wholesale/)
  assert.match(source, /\/solutions\/roasting-program/)
  assert.match(source, /Distributor/i)
  assert.match(source, /Importer/i)
  assert.match(source, /Retailer/i)
  assert.match(source, /Hospitality/i)
  assert.match(source, /Custom roasting/i)
  assert.match(source, /Target cup/i)
  assert.match(source, /Roast profile development/i)
  assert.match(source, /Repeatable production profile/i)
})

test("About closes with international market direction without service sprawl", () => {
  const source = read(templatePath)

  assert.match(source, /International distributors/i)
  assert.match(source, /importers/i)
  assert.match(source, /retailers/i)
  assert.match(source, /hospitality partners/i)
  assert.doesNotMatch(source, /Barista Staffing|Equipment Service/)
})

test("About uses the approved sage photo-led visual system without replacing shared site chrome", () => {
  const source = read(templatePath)

  assert.match(source, /#5c6f58/i)
  assert.match(source, /#2f3b2d/i)
  assert.match(source, /#f3f1ea/i)
  assert.match(source, /\/about\/about-origin\.svg/)
  assert.match(source, /\/about\/about-fine-robusta\.svg/)
  assert.match(source, /\/about\/about-ready-to-sell\.svg/)
  assert.match(source, /\/about\/about-made-for-you\.svg/)
  assert.doesNotMatch(source, /occ-about-atlas\.avif/)
  assert.match(source, /data-about-ghost="origin"/)
  assert.match(source, /data-about-ghost="coffee"/)

  for (const label of ["ONE ORIGIN", "FINE ROBUSTA", "READY-TO-SELL", "MADE-FOR-YOU"]) {
    assert.match(source, new RegExp(label, "i"), `${label} gallery label must be present`)
  }

  assert.doesNotMatch(source, /<nav\b/)
  assert.doesNotMatch(source, /occ-logo-primary-local\.svg/)
})
