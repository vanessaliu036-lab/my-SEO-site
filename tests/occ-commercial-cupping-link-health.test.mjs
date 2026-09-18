import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const read = (path) => fs.readFileSync(path, "utf8")
const CUPPING_PATH = "/blog/how-to-cup-fine-robusta"
const LEGACY_ALIAS = "/origins/single-origin"

test("commercial cupping links route directly to the canonical cupping guide", () => {
  const wholesale =
    read("app/(site)/solutions/wholesale/page.tsx") +
    "\n" +
    read("app/(site)/solutions/wholesale/WholesaleApprovedLayout.tsx")
  const roasting = read("app/(site)/solutions/roasting-program/page.tsx")

  assert.match(
    wholesale,
    new RegExp(`href=[\\"']${CUPPING_PATH.replaceAll("/", "\\/")}[\\"']`),
    "wholesale must link directly to the canonical Fine Robusta cupping guide",
  )
  assert.match(
    roasting,
    new RegExp(`cupping:\\s*[\\"']${CUPPING_PATH.replaceAll("/", "\\/")}[\\"']`),
    "roasting program must route cupping directly to the canonical Fine Robusta cupping guide",
  )

  for (const [name, source] of [["wholesale", wholesale], ["roasting", roasting]]) {
    assert.doesNotMatch(
      source,
      new RegExp(LEGACY_ALIAS.replaceAll("/", "\\/")),
      `${name} must not route commercial-page links through the legacy single-origin alias`,
    )
  }
})
