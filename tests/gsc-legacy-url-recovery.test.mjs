import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve } from "node:path"

const root = resolve(import.meta.dirname, "..")
const nextConfig = readFileSync(resolve(root, "next.config.mjs"), "utf8")

const expectedLegacyRecoveries = [
  "/blog/understanding-technical-specifications-what-wholesale-buyers-need-to-know-about-cambodian-coffee",
  "/blog/understanding-technical-specifications-what-wholesale-buyers-need-to-know-about-cambodian-coffee-internal-dup-qgs9",
  "/blog/beyond-arabica-why-fine-robusta-deserves-a-place-in-your-specialty-coffee-portfolio-in-phnom-penh",
  "/blog/beyond-arabica-why-fine-robusta-deserves-a-place-in-your-specialty-coffee-portfolio-in-phnom-penh-internal-dup-ci50",
  "/blog/from-net-importer-to-emerging-exporter-unpacking-cambodias-specialty-coffee-supply-constraints-and-growth-trajectory",
  "/blog/cambodia-coffee-supply-constraints-export-readiness",
  "/blog/how-fine-robusta-coffee-files-cup-score-explained",
  "/blog/how-fine-robusta-coffee-is-graded-cup-score-explained",
]

test("GSC-visible dead aliases and their recovery targets remain in redirect config", () => {
  for (const value of expectedLegacyRecoveries) {
    assert.equal(nextConfig.includes(value), true, "missing legacy recovery route: " + value)
  }
})
