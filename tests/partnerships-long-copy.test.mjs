import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const page = fs.readFileSync("app/(site)/partnerships/page.tsx", "utf8")

test("Partnerships includes the approved long-form introduction and its core sections", () => {
  assert.match(page, /Cambodian Coffee Partnerships Built to Be Remembered/)
  assert.match(page, /Why Cambodian Coffee Partnerships\?/)
  assert.match(page, /A coffee origin can become more than a product\./)
  for (const heading of [
    "Who We Work With", "What We Can Build Together", "OCC × ARUNERA",
    "How a Partnership Works", "What to Include in Your Enquiry",
  ]) assert.ok(page.includes(heading), `Missing ${heading}`)
  for (const audience of ["Hotels & Hospitality", "Retail & Concept Stores", "Travel & Tourism", "Corporate Gifting"]) {
    assert.ok(page.includes(audience), `Missing audience: ${audience}`)
  }
  for (const stage of [
    "Understand the opportunity", "Define the coffee direction", "Shape the product experience",
    "Review commercial requirements", "Prepare the partnership",
  ]) assert.ok(page.includes(stage), `Missing stage: ${stage}`)
  assert.ok(page.length > 11000, "Partnerships should contain meaningful long-form content")
})

test("Partnerships still serves its distinct two-path hub and directs readers to enquiry", () => {
  assert.match(page, /href: "\/brand-gifting"/)
  assert.match(page, /href: "\/distribution"/)
  assert.match(page, /href="\/contact"/)
  assert.match(page, /Discuss a Partnership/)
  assert.match(page, /Explore Distribution/)
  assert.match(page, /pageAlternates\("\/partnerships"\)/)
  assert.match(page, /CollectionPage/)
  assert.doesNotMatch(page, /guaranteed MOQ|guaranteed delivery|exclusive territory|fixed inventory/i)
})
