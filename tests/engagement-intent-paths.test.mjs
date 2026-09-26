import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const source = (relative) =>
  readFileSync(new URL(`../${relative}`, import.meta.url), "utf8")

test("homepage exposes three clear next-step intent paths", () => {
  const home = source("components/templates/home-template.tsx")

  assert.match(home, /Choose your path/)
  assert.match(home, /href="\/origins"/)
  assert.match(home, /href="\/solutions\/wholesale"/)
  assert.match(home, /href="\/fine-robusta-cambodia"/)
})

test("Contact exposes above-fold intent shortcuts and keeps the approved four enquiry types", () => {
  const contact = source("app/(site)/contact/ContactForm.tsx")
  const styles = source("app/(site)/contact/contact-editorial.css")

  assert.match(contact, /occ-contact-intent-shortcuts/)
  assert.match(contact, /chooseIntent/)
  assert.match(contact, /Wholesale \/ Sourcing/)
  assert.match(contact, /Roasting \/ Solutions/)
  assert.match(contact, /Partnership \/ Distribution/)
  assert.match(contact, /Other \/ General/)
  assert.match(styles, /\.occ-contact-intent-shortcut/)
  assert.match(styles, /min-height:\s*420px/)
})

test("journal articles bridge research traffic into core OCC owner pages", () => {
  const article = source("app/(site)/blog/[slug]/page.tsx")

  assert.match(article, /Continue by intent/)
  assert.match(article, /href: "\/origins"/)
  assert.match(article, /href: "\/fine-robusta-cambodia"/)
  assert.match(article, /href: "\/solutions\/wholesale"/)
})

test("Origins provides region to quality to wholesale navigation without removing contact", () => {
  const origins = source("app/(site)/origins/page.tsx")

  assert.match(origins, /href="\/origins\/cambodia-regions"/)
  assert.match(origins, /href="\/fine-robusta-cambodia"/)
  assert.match(origins, /href="\/solutions\/wholesale"/)
  assert.match(origins, /href="\/contact"[^>]*>Discuss wholesale supply/)
})

test("GA4 records qualified navigation and first Contact interaction while keeping generate_lead canonical", () => {
  const ga = source("components/GoogleAnalytics.tsx")
  const contact = source("app/(site)/contact/ContactForm.tsx")

  assert.match(ga, /sendEvent\("solution_click"/)
  assert.match(ga, /sendEvent\("wholesale_click"/)
  assert.match(ga, /sendEvent\("contact_click"/)
  assert.match(contact, /"contact_start"/)
  assert.match(contact, /"contact_intent_select"/)
  assert.match(contact, /"generate_lead"/)
  assert.doesNotMatch(contact, /"contact_submit"/)
})
