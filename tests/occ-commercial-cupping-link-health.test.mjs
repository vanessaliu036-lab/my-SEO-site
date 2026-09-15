import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const read = (path) => fs.readFileSync(path, "utf8")
const CUPPING_PATH = "/blog/how-to-cup-fine-robusta"
const LEGACY_ALIAS = "/origins/single-origin"

const commercialPages = [
  "app/(site)/solutions/wholesale/page.tsx",
  "app/(site)/solutions/roasting-program/page.tsx",
]

test("commercial cupping links route directly to the canonical cupping guide", () => {
  for (const page of commercialPages) {
    const source = read(page)
    assert.match(
      source,
      new RegExp(`cupping:\\s*[\"']${CUPPING_PATH.replaceAll("/", "\\/")}[\"']`),
      `${page} must route cupping directly to the canonical Fine Robusta cupping guide`,
    )
    assert.doesNotMatch(
      source,
      new RegExp(LEGACY_ALIAS.replaceAll("/", "\\/")),
      `${page} must not route commercial-page links through the legacy single-origin alias`,
    )
  }
})
