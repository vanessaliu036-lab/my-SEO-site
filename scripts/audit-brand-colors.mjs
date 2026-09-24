import fs from "node:fs"
import path from "node:path"

const root = process.cwd()
const scanRoots = [
  "app/globals.css",
  "app/(site)",
  "components/site",
  "components/templates",
  "components/ui",
]
const sourceExtension = /\.(?:css|jsx?|tsx?)$/i
const allowedHex = new Set(["#292424", "#393235", "#984650", "#843B45", "#685F5B", "#D8CEC5", "#E9E1DA", "#F2EDE7", "#F7F4F0"])
const allowedRgb = new Set(["41,36,36", "152,70,80", "104,95,91", "242,237,231", "247,244,240"])
const nonBrandUtility = /(?:bg|text|border|from|via|to)-(?:red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d+/g
const failures = []

function walk(target) {
  if (!fs.existsSync(target)) return []
  const stat = fs.statSync(target)
  if (stat.isFile()) return sourceExtension.test(target) ? [target] : []
  return fs.readdirSync(target, { withFileTypes: true }).flatMap((entry) => {
    const next = path.join(target, entry.name)
    return entry.isDirectory() ? walk(next) : sourceExtension.test(entry.name) ? [next] : []
  })
}

for (const file of scanRoots.flatMap((entry) => walk(path.join(root, entry)))) {
  const relative = path.relative(root, file)
  const content = fs.readFileSync(file, "utf8")

  for (const match of content.matchAll(/#[0-9a-f]{6}\b/gi)) {
    const color = match[0].toUpperCase()
    if (!allowedHex.has(color)) failures.push(`${relative}: non-brand color ${match[0]}`)
  }

  for (const match of content.matchAll(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/gi)) {
    const rgb = `${match[1]},${match[2]},${match[3]}`
    if (!allowedRgb.has(rgb)) failures.push(`${relative}: non-brand rgb(${rgb})`)
  }

  for (const match of content.matchAll(nonBrandUtility)) {
    failures.push(`${relative}: non-brand Tailwind utility ${match[0]}`)
  }
}

if (failures.length) {
  console.error([...new Set(failures)].join("\n"))
  process.exitCode = 1
} else {
  console.log("Brand color gate passed: public website sources use only the OCC semantic palette.")
}
