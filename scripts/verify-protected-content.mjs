import fs from "node:fs"
import path from "node:path"

const manifestPath = path.resolve(process.env.OCC_CONTENT_MANIFEST || "release/protected-content.json")

function fail(message) {
  console.error(`Blocked content preservation gate: ${message}`)
  process.exitCode = 1
}

if (!fs.existsSync(manifestPath)) {
  fail(`manifest missing: ${manifestPath}`)
} else {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"))
  for (const entry of manifest.routes || []) {
    const files = (entry.files || []).map((file) => path.resolve(file))
    for (const file of files) if (!fs.existsSync(file)) fail(`${entry.route}: protected source missing ${path.relative(process.cwd(), file)}`)
    const combined = files.filter((file) => fs.existsSync(file)).map((file) => fs.readFileSync(file, "utf8")).join("\n")
    for (const required of entry.required || []) {
      if (!combined.includes(required)) fail(`${entry.route}: protected content disappeared: ${required}`)
    }
  }
}

if (!process.exitCode) console.log("Protected-content manifest verified.")
