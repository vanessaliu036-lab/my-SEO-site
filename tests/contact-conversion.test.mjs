import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const page = fs.readFileSync("app/(site)/contact/page.tsx", "utf8")
const form = fs.readFileSync("app/(site)/contact/ContactForm.tsx", "utf8")
const action = fs.readFileSync("app/(site)/contact/action.ts", "utf8")
const combined = `${page}\n${form}\n${action}`

test("Contact aligns with the three OCC commercial paths", () => {
  assert.match(combined, /START A PROJECT\s*WITH OCC|Start a Project with OCC/i)
  assert.match(combined, /READY-TO-SELL|Ready-to-Sell/)
  assert.match(combined, /MADE-FOR-YOU|Made-for-You/)
  assert.match(combined, /CAMBODIAN MARKET|Cambodian Market/)
  assert.match(combined, /Wholesale/)
  assert.match(combined, /Custom Roasting/)
  assert.match(combined, /Coffee Marketing/)
})

test("Contact form reduces enquiry choices and captures company context", () => {
  for (const option of ["Wholesale", "Custom Roasting", "Coffee Marketing", "Other Enquiry"]) {
    assert.match(combined, new RegExp(option))
  }
  for (const legacy of ["Sample Request", "Lot List", "Roasting / Solutions", "Editorial / Source Correction", "Media / Interview"]) {
    assert.doesNotMatch(form, new RegExp(legacy.replaceAll("/", "\\/")))
  }
  assert.match(combined, /Company \/ Brand|company/i)
  assert.match(action, /company/)
})

test("Contact adapts project context and uses conversation-led conversion", () => {
  assert.match(form, /PROJECT_CONTEXT|projectContext|contextPlaceholder/)
  assert.match(form, /Start the Conversation/)
  assert.match(form, /ENQUIRY RECEIVED|Enquiry Received/)
  assert.match(form, /Explore Wholesale Supply/)
  assert.match(form, /Explore Roast Development/)
  assert.match(form, /Explore Coffee Marketing/)
  assert.match(form, /generate_lead/)
})

test("Contact metadata reflects current commercial architecture", () => {
  assert.match(page, /Contact OCC \| Wholesale, Custom Roasting & Coffee Marketing/)
  assert.match(page, /wholesale coffee supply/i)
  assert.match(page, /custom roast profile development/i)
  assert.match(page, /coffee marketing/i)
})
