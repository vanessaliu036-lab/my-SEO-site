import crypto from "node:crypto"
import fs from "node:fs"
import path from "node:path"
import sharp from "sharp"

const root = process.cwd()
const publicRoot = path.join(root, "public")
const rasterExtension = /\.(?:avif|jpe?g|png|webp)$/i
const sourceExtension = /\.(?:css|jsx?|tsx?)$/i
const imageLiteral = /\/(?:[\w.-]+\/)*[\w.-]+\.(?:avif|jpe?g|png|webp)(?:\?[^\s"'`)]*)?/gi
const exemptIdentity = /\/(?:apple-icon|icon(?:-dark|-light)?(?:-32x32)?|occ-logo(?:-[\w-]+)?|placeholder(?:-[\w-]+)?)\.(?:png|jpe?g|webp)$/i
const minimumShortEdge = 900

function walk(folder, matcher) {
  if (!fs.existsSync(folder)) return []
  return fs.readdirSync(folder, { withFileTypes: true }).flatMap((entry) => {
    const next = path.join(folder, entry.name)
    if (entry.isDirectory()) return walk(next, matcher)
    return entry.isFile() && matcher.test(entry.name) ? [next] : []
  })
}

function publicPath(file) {
  return `/${path.relative(publicRoot, file).replaceAll(path.sep, "/")}`
}

function bitDifference(left, right) {
  let value = left ^ right
  let count = 0
  while (value) {
    value &= value - 1n
    count += 1
  }
  return count
}

async function differenceHash(file) {
  const { data } = await sharp(file)
    .flatten({ background: "#ffffff" })
    .greyscale()
    .resize(9, 8, { fit: "fill" })
    .raw()
    .toBuffer({ resolveWithObject: true })
  let hash = 0n
  for (let row = 0; row < 8; row += 1) {
    for (let column = 0; column < 8; column += 1) {
      hash <<= 1n
      const offset = row * 9 + column
      if (data[offset] > data[offset + 1]) hash |= 1n
    }
  }
  return hash
}

const referencedImages = new Set()
for (const file of [
  ...walk(path.join(root, "app"), sourceExtension),
  ...walk(path.join(root, "components"), sourceExtension),
]) {
  const content = fs.readFileSync(file, "utf8")
  for (const match of content.matchAll(imageLiteral)) {
    referencedImages.add(match[0].split("?")[0].split("#")[0])
  }
}

const files = walk(publicRoot, rasterExtension)
  .filter((file) => !exemptIdentity.test(publicPath(file)))
  .sort()
const exactGroups = new Map()
const imageRecords = []
const failures = []

for (const file of files) {
  const image = publicPath(file)
  const bytes = fs.readFileSync(file)
  const exactHash = crypto.createHash("sha256").update(bytes).digest("hex")
  if (!exactGroups.has(exactHash)) exactGroups.set(exactHash, [])
  exactGroups.get(exactHash).push(image)

  try {
    const metadata = await sharp(bytes, { animated: false }).metadata()
    const width = metadata.width || 0
    const height = metadata.height || 0
    if (referencedImages.has(image) && Math.min(width, height) < minimumShortEdge) {
      failures.push(`LOW_RESOLUTION ${image}: ${width}x${height}; short edge must be at least ${minimumShortEdge}px`)
    }
    imageRecords.push({ image, file, width, height, perceptualHash: await differenceHash(file) })
  } catch (error) {
    failures.push(`UNREADABLE ${image}: ${error instanceof Error ? error.message : String(error)}`)
  }
}

for (const images of exactGroups.values()) {
  if (images.length > 1) failures.push(`EXACT_DUPLICATE ${images.join(", ")}`)
}

for (let left = 0; left < imageRecords.length; left += 1) {
  for (let right = left + 1; right < imageRecords.length; right += 1) {
    const first = imageRecords[left]
    const second = imageRecords[right]
    const distance = bitDifference(first.perceptualHash, second.perceptualHash)
    if (distance <= 2) {
      failures.push(`VISUAL_DUPLICATE distance=${distance} ${first.image}, ${second.image}`)
    }
  }
}

if (failures.length) {
  console.error(failures.join("\n"))
  process.exitCode = 1
} else {
  console.log(`Image quality gate passed for ${imageRecords.length} raster editorial assets; no broken, low-resolution, exact-duplicate, or near-identical files found.`)
}
