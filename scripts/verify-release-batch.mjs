import fs from "node:fs"
import path from "node:path"

const manifestPath = path.resolve(process.env.OCC_RELEASE_MANIFEST || "release/occ-release-manifest.json")

function fail(message) {
  console.error(`Blocked release: ${message}`)
  process.exit(1)
}

if (!fs.existsSync(manifestPath)) fail(`release manifest missing: ${manifestPath}`)

let manifest
try {
  manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"))
} catch (error) {
  fail(`release manifest is invalid JSON: ${error.message}`)
}

for (const field of ["approvedVersion", "approvedBy", "approvedAt"]) {
  if (!String(manifest[field] || "").trim()) fail(`release manifest missing ${field}`)
}
if (!Array.isArray(manifest.routesIncluded) || manifest.routesIncluded.length === 0) fail("release manifest requires routesIncluded")
if (!Array.isArray(manifest.approvedChanges)) fail("release manifest requires approvedChanges")

const approved = manifest.approvedChanges.filter((item) => item && item.ownerApproved === true)
const mode = manifest.releaseMode || "normal"

if (mode === "normal" && approved.length < 5) {
  fail(`normal release has only ${approved.length} owner-approved changes; minimum is 5`)
}
if (mode === "p0-emergency" && !String(manifest.emergencyReason || "").trim()) {
  fail("P0 emergency release requires emergencyReason")
}
if (!["normal", "p0-emergency"].includes(mode)) fail(`unsupported releaseMode: ${mode}`)

const isPreview = process.env.VERCEL === "1" && process.env.VERCEL_ENV === "preview"
if (isPreview) {
  const ref = process.env.VERCEL_GIT_COMMIT_REF?.trim()
  if (ref !== "release/occ-current") fail(`preview must come from release/occ-current; got ${ref || "missing"}`)
}

console.log(`Release batch verified: ${manifest.approvedVersion}; mode=${mode}; approved changes=${approved.length}`)
