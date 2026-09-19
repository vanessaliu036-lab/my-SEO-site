import fs from "node:fs"
import path from "node:path"
import { auditEditorialImages } from "./audit-editorial-images.mjs"

const root = process.cwd()
const report = auditEditorialImages(root)

function fail(message) {
  console.error(`Blocked release asset gate: ${message}`)
  process.exitCode = 1
}

for (const item of report.missingImages) fail(`missing image ${item.image} referenced by ${item.route}`)

const localImages = [...new Set(Object.values(report.routes).flat())]
const remoteForbidden = /https?:\/\/(?:drive\.google\.com|docs\.google\.com|[^\s"'()]*googleusercontent\.com)/i

function walk(folder) {
  if (!fs.existsSync(folder)) return []
  return fs.readdirSync(folder, { withFileTypes: true }).flatMap((entry) => {
    const next = path.join(folder, entry.name)
    if (entry.isDirectory()) return walk(next)
    return entry.isFile() && /\.(?:tsx?|jsx?|css|mjs)$/.test(entry.name) ? [next] : []
  })
}

for (const file of [...walk(path.join(root, "app")), ...walk(path.join(root, "components"))]) {
  const content = fs.readFileSync(file, "utf8")
  if (remoteForbidden.test(content)) fail(`private/temporary Google-hosted asset URL found in ${path.relative(root, file)}`)
}

function hasSignature(file, ext) {
  const bytes = fs.readFileSync(file)
  if (ext === ".png") return bytes.length >= 8 && bytes.subarray(0, 8).equals(Buffer.from([0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a]))
  if (ext === ".jpg" || ext === ".jpeg") return bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff
  if (ext === ".webp") return bytes.length >= 12 && bytes.subarray(0,4).toString() === "RIFF" && bytes.subarray(8,12).toString() === "WEBP"
  if (ext === ".avif") {
    const head = bytes.subarray(0, 48).toString("latin1")
    return head.includes("ftyp") && /(avif|avis|mif1|msf1)/.test(head)
  }
  if (ext === ".svg") return /<svg\b/i.test(bytes.toString("utf8", 0, Math.min(bytes.length, 4096)))
  return true
}

let checked = 0
for (const image of localImages) {
  const file = path.join(root, "public", image.replace(/^\//, ""))
  if (!fs.existsSync(file)) continue
  const ext = path.extname(file).toLowerCase()
  if (!hasSignature(file, ext)) fail(`invalid or undecodable-looking ${ext} signature: ${image}`)
  checked += 1
}

const baseUrl = String(process.env.OCC_RELEASE_BASE_URL || "").replace(/\/$/, "")
if (baseUrl) {
  for (const image of localImages) {
    const response = await fetch(`${baseUrl}${image}`, { redirect: "follow", cache: "no-store" })
    const contentType = response.headers.get("content-type") || ""
    if (!response.ok) fail(`preview asset HTTP ${response.status}: ${image}`)
    if (!contentType.toLowerCase().startsWith("image/")) fail(`preview asset Content-Type is ${contentType || "missing"}: ${image}`)
  }
}

if (!process.exitCode) console.log(`Static asset gate passed for ${checked} committed editorial assets${baseUrl ? " plus preview HTTP checks" : ""}.`)
