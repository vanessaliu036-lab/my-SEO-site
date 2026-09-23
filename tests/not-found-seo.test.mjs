import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { test } from "node:test"
import { resolve } from "node:path"

const root = resolve(import.meta.dirname, "..")
const rootLayout = readFileSync(resolve(root, "app/layout.tsx"), "utf8")
const homePage = readFileSync(resolve(root, "app/(site)/page.tsx"), "utf8")
const root404 = readFileSync(resolve(root, "app/not-found.tsx"), "utf8")
const site404 = readFileSync(resolve(root, "app/(site)/not-found.tsx"), "utf8")

test("root layout does not publish a homepage canonical for every route", () => {
  assert.doesNotMatch(rootLayout, /pageAlternates\("\/"\)/)
  assert.doesNotMatch(rootLayout, /alternates\s*:/)
  assert.match(homePage, /alternates:\s*pageAlternates\("\/"\)/)
})

test("404 pages stay noindex follow without declaring a canonical", () => {
  for (const source of [root404, site404]) {
    assert.match(source, /index:\s*false/)
    assert.match(source, /follow:\s*true/)
    assert.doesNotMatch(source, /canonical|pageAlternates|alternatesFromCanonical/)
  }
})
