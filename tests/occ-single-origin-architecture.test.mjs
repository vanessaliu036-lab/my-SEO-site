import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

function read(path) {
  return readFileSync(new URL(`../${path}`, import.meta.url), "utf8")
}

const singleOriginPage = read("app/(site)/origins/single-origin/page.tsx")
const sitemap = read("app/sitemap.ts")
const nextConfig = read("next.config.mjs")
const proxySource = read("proxy.ts")
const wholesalePage = read("app/(site)/solutions/wholesale/page.tsx")
const roastingPage = read("app/(site)/solutions/roasting-program/page.tsx")

test("Single Origin is an independent Cambodia origin page rather than the Fine Robusta owner", () => {
  assert.doesNotMatch(singleOriginPage, /export \{ default, metadata \} from "\.\.\/\.\.\/fine-robusta-cambodia\/page"/)
  assert.match(singleOriginPage, /const ownerPath = "\/origins\/single-origin"/)
  assert.match(singleOriginPage, /pageAlternates\(ownerPath\)/)
  assert.match(singleOriginPage, />Single-Origin<|>SINGLE-ORIGIN</)
  assert.doesNotMatch(
    `${nextConfig}\n${proxySource}`,
    /source:\s*["']\/origins\/single-origin["'][\s\S]{0,180}?destination:\s*["']\/fine-robusta-cambodia["']/,
  )
  assert.doesNotMatch(
    proxySource,
    /["']\/origins\/single-origin["']\s*:\s*["']\/fine-robusta-cambodia["']/,
  )
})

test("Single Origin guides visitors to the distinct origin, terroir, and Fine Robusta owners", () => {
  assert.match(singleOriginPage, /href="\/origins"/)
  assert.match(singleOriginPage, /href="\/origins\/farm-terroir"/)
  assert.match(singleOriginPage, /href="\/fine-robusta-cambodia"/)
  assert.match(sitemap, /`\$\{siteUrl\}\/origins\/single-origin`/)
})

test("Solutions single-origin links use the live origins route", () => {
  assert.match(wholesalePage, /cupping: "\/origins\/single-origin"/)
  assert.match(roastingPage, /cupping: "\/origins\/single-origin"/)
  assert.doesNotMatch(wholesalePage, /"\/coffee\/single-origin"/)
  assert.doesNotMatch(roastingPage, /"\/coffee\/single-origin"/)
})
