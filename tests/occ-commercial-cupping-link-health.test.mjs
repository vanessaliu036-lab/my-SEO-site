import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const read = (path) => fs.readFileSync(path, "utf8")
const CUPPING_PATH = "/blog/how-to-cup-fine-robusta"
const LEGACY_ALIAS = "/origins/single-origin"

test("both commercial pages link directly to the canonical Fine Robusta cupping guide", () => {
  const pages = {
    wholesale: read("app/(site)/solutions/wholesale/page.tsx") + "\n" + read("app/(site)/solutions/wholesale/WholesaleApprovedLayout.tsx"),
    roasting: read("app/(site)/solutions/roasting-program/page.tsx"),
  }
  for (const [name, source] of Object.entries(pages)) {
    assert.ok(source.includes(`href="${CUPPING_PATH}"`), `${name} needs its canonical cupping link`)
    assert.ok(!source.includes(LEGACY_ALIAS), `${name} must not use the legacy single-origin alias`)
  }
})
