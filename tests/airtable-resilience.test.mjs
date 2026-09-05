import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const source = fs.readFileSync("lib/airtable.ts", "utf8")
const articlePage = fs.readFileSync("app/(site)/blog/[slug]/page.tsx", "utf8")

test("Airtable keeps per-process request pacing", () => {
  assert.match(source, /AIRTABLE_MIN_REQUEST_INTERVAL_MS\s*=\s*260/)
  assert.match(source, /airtableRequestChain/)
  assert.match(source, /nextAirtableRequestAt/)
})

test("transient Airtable failures are retried with bounded backoff", () => {
  assert.match(source, /AIRTABLE_MAX_ATTEMPTS\s*=\s*3/)
  assert.match(source, /429/)
  assert.match(source, /500/)
  assert.match(source, /502/)
  assert.match(source, /503/)
  assert.match(source, /504/)
  assert.match(source, /2\s*\*\s*attempt|2\s*\*\*\s*attempt/)
})

test("failed table fetches cannot silently become an empty or partial corpus", () => {
  assert.match(source, /throw new Error\(`Airtable list failed/)
  assert.doesNotMatch(source, /console\.error\(`Airtable list failed[\s\S]*?break/)
})

test("OCC corpus remains the two-table union with stable-slug deduplication", () => {
  assert.match(source, /OCC_Blog_Posts/)
  assert.match(source, /OCC_INDEXED_PROTECTED/)
  assert.match(source, /seenSlug/)
  assert.match(source, /item\.slug\.toLowerCase\(\)/)
})

test("article detail uses a direct slug lookup before the full-corpus fallback", () => {
  assert.match(source, /fetchRecordBySlug/)
  assert.match(source, /filterByFormula/)
  assert.match(source, /for \(const tableName of AIRTABLE_TABLE_NAMES\)/)
  assert.match(source, /getAllPosts\(\)/)
  assert.match(source, /fetchRecordById/)
})

test("article recommendations use a bounded recent-post query instead of scanning the full corpus", () => {
  assert.match(source, /getRecentPosts/)
  assert.match(source, /maxRecords/)
  assert.match(articlePage, /getRecentPosts/)
  assert.doesNotMatch(articlePage, /getAllPosts/)
})

test("shared corpus and detail caches use a five-minute resilience window", () => {
  assert.match(source, /AIRTABLE_CACHE_SECONDS\s*=\s*300/)
  assert.match(source, /revalidate:\s*AIRTABLE_CACHE_SECONDS/)
  assert.match(source, /unstable_cache/)
})
