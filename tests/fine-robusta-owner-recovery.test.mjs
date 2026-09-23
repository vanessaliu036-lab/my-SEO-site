import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { test } from "node:test"
import { resolve } from "node:path"

const root = resolve(import.meta.dirname, "..")
const nextConfig = readFileSync(resolve(root, "next.config.mjs"), "utf8")
const blogPage = readFileSync(resolve(root, "app/(site)/blog/[slug]/page.tsx"), "utf8")
const blogLayout = readFileSync(resolve(root, "app/(site)/blog/[slug]/layout.tsx"), "utf8")
const sitemap = readFileSync(resolve(root, "app/sitemap.ts"), "utf8")

test("Fine Robusta owner is present in sitemap and legacy owner-like URLs consolidate directly", () => {
  assert.match(sitemap, /fine-robusta-cambodia/)
  assert.match(nextConfig, /source:\s*'\/origins\/single-origin'[\s\S]*destination:\s*'\/fine-robusta-cambodia'/)
  assert.match(nextConfig, /source:\s*'\/origins\/cambodia-coffee'[\s\S]*destination:\s*'\/origins'/)
  assert.match(nextConfig, /source:\s*'\/cambodia-robusta-coffee'[\s\S]*destination:\s*'\/fine-robusta-cambodia'/)
  assert.match(nextConfig, /source:\s*'\/coffee\/single-origin'[\s\S]*destination:\s*'\/fine-robusta-cambodia'/)
})

test("highest-cannibalization Fine Robusta articles narrow intent and link to the owner early", () => {
  for (const slug of [
    "what-is-fine-robusta-coffee-a-complete-beginners-guide",
    "fine-robusta-coffee-a-flavor-revolution-in-every-cup",
    "what-makes-fine-robusta",
  ]) {
    assert.match(blogPage, new RegExp(slug))
    assert.match(blogLayout, new RegExp(slug))
  }
  assert.match(blogPage, /For the primary Cambodia Fine Robusta definition/)
  assert.match(blogPage, /Fine Robusta Flavor Profiles: What Changes the Cup/)
})
