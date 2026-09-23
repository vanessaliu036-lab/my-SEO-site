import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const read = (path) => readFileSync(new URL("../" + path, import.meta.url), "utf8")

test("contact schema stays in a client-safe module boundary", () => {
  const form = read("app/(site)/contact/ContactForm.tsx")
  const action = read("app/(site)/contact/action.ts")
  const schema = read("app/(site)/contact/schema.ts")

  assert.match(form, /contactSchema,?\\s*type ContactFormData,?[\\s\\S]*from "\\.\\/schema"/)
  assert.doesNotMatch(form, /contactSchema,?\\s*type ContactFormData,?[\\s\\S]*from "\\.\\/action"/)
  assert.match(action, /import \\{ contactSchema, type ContactFormData \\} from "\\.\\/schema"/)
  assert.doesNotMatch(action, /export const contactSchema/)
  assert.match(schema, /export const contactSchema = z\\.object/)
})
