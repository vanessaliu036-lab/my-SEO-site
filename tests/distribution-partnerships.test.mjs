import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const source = fs.readFileSync("app/(site)/distribution/page.tsx", "utf8")

test("distribution page has a qualified international importer and distributor funnel", () => {
  for (const heading of [
    "International Coffee Distribution Partnerships",
    "Who We Work With",
    "What Partners Can Bring to Market",
    "Why Partner With OCC",
    "How a Distribution Partnership Works",
    "What to Include in Your Enquiry",
    "Discuss an International Distribution Partnership",
  ]) assert.match(source, new RegExp(heading))

  for (const qualification of [
    "Target country or territory",
    "Current distribution channels",
    "Import and logistics capability",
    "Product categories of interest",
    "Estimated order volume",
    "Retail or hospitality network",
    "Preferred exclusivity arrangement",
    "Proposed launch timeline",
  ]) assert.match(source, new RegExp(qualification))

  const positions = [
    "Who We Work With",
    "What Partners Can Bring to Market",
    "Why Partner With OCC",
    "How a Distribution Partnership Works",
    "What to Include in Your Enquiry",
  ].map((heading) => source.indexOf(heading))
  assert.ok(positions.every((position) => position >= 0))
  assert.deepEqual(positions, [...positions].sort((a, b) => a - b))
})

test("distribution retains approved URL and hero visual while avoiding unsupported schema", () => {
  assert.match(source, /pageAlternates\("\/distribution"\)/)
  assert.match(source, /src="\/hero-home\.webp"/)
  assert.match(source, /"@type": "WebPage"/)
  assert.match(source, /"@type": "BreadcrumbList"/)
  assert.match(source, /href="\/partnerships"/)
  assert.doesNotMatch(source, /"@type": "Service"|"@type": "Offer"/)
})
