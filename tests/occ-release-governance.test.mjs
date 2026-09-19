import assert from "node:assert/strict"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { execFileSync } from "node:child_process"
import test from "node:test"

const root = path.resolve(import.meta.dirname, "..")
const batchGuard = path.join(root, "scripts/verify-release-batch.mjs")

function run(manifest) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "occ-release-"))
  const file = path.join(dir, "manifest.json")
  fs.writeFileSync(file, JSON.stringify(manifest))
  try {
    execFileSync(process.execPath, [batchGuard], {
      cwd: root,
      env: { ...process.env, OCC_RELEASE_MANIFEST: file },
      stdio: "pipe",
    })
    return 0
  } catch (error) {
    return error.status || 1
  }
}

const base = {
  approvedVersion: "test",
  releaseMode: "normal",
  approvedBy: "Vanessa",
  approvedAt: "2026-09-19",
  routesIncluded: ["governance-only"],
}

test("normal release rejects fewer than five owner-approved changes", () => {
  assert.notEqual(run({ ...base, approvedChanges: Array.from({ length: 4 }, (_, i) => ({ id: String(i), ownerApproved: true })) }), 0)
})

test("normal release accepts five owner-approved changes", () => {
  assert.equal(run({ ...base, approvedChanges: Array.from({ length: 5 }, (_, i) => ({ id: String(i), ownerApproved: true })) }), 0)
})

test("P0 emergency requires an explicit reason", () => {
  assert.notEqual(run({ ...base, releaseMode: "p0-emergency", approvedChanges: [] }), 0)
  assert.equal(run({ ...base, releaseMode: "p0-emergency", emergencyReason: "Production outage", approvedChanges: [] }), 0)
})
