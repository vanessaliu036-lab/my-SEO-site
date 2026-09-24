import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const source = (relative) =>
  readFileSync(new URL(`../${relative}`, import.meta.url), "utf8")

test("contact submissions are protected by Vercel BotID", () => {
  const pkg = JSON.parse(source("package.json"))
  const nextConfig = source("next.config.mjs")
  const instrumentation = source("instrumentation-client.ts")
  const action = source("app/(site)/contact/action.ts")

  assert.equal(pkg.dependencies.botid, "^1.5.11")
  assert.match(nextConfig, /withBotId/)
  assert.match(instrumentation, /path:\s*"\/contact"/)
  assert.match(instrumentation, /method:\s*"POST"/)
  assert.match(instrumentation, /checkLevel:\s*"basic"/)
  assert.match(action, /checkBotId/)
  assert.match(action, /verification\.isBot/)
})

test("contact submissions have server-side throttling and a honeypot", () => {
  const action = source("app/(site)/contact/action.ts")
  const schema = source("app/(site)/contact/schema.ts")
  const form = source("app/(site)/contact/ContactForm.tsx")

  assert.match(action, /RATE_LIMITS/)
  assert.match(action, /x-forwarded-for/)
  assert.match(action, /hashRateKey/)
  assert.match(action, /ip:\$\{hashRateKey\(clientAddress\)\}/)
  assert.match(action, /email:\$\{hashRateKey\(normalizedEmail\)\}/)
  assert.match(schema, /website:\s*z\.string/)
  assert.match(form, /register\("website"\)/)
  assert.match(form, /tabIndex=\{-1\}/)
})


test("approved Contact form keeps four intents and no project-stage questionnaire", () => {
  const schema = source("app/(site)/contact/schema.ts")
  const form = source("app/(site)/contact/ContactForm.tsx")

  assert.match(schema, /jobTitle:/)
  assert.match(schema, /Phone number is required/)
  assert.match(schema, /Message is required/)
  assert.match(form, /register\("jobTitle"\)/)
  assert.match(form, /Founder, Manager, Purchasing Manager/)
  assert.doesNotMatch(form, /Project Stage/)
  assert.doesNotMatch(form, /register\("projectStage"\)/)
  assert.match(form, /"Wholesale"/)
  assert.match(form, /"Roasting"/)
  assert.match(form, /"Hotel \/ Partner"/)
  assert.match(form, /"Other"/)
})
