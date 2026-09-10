import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'

const source = fs.readFileSync('lib/airtable.ts', 'utf8')
const blogPage = fs.readFileSync('app/(site)/blog/page.tsx', 'utf8')

function sectionBetween(text, startMarker, endMarker) {
  const start = text.indexOf(startMarker)
  const end = text.indexOf(endMarker, start + startMarker.length)
  assert.notEqual(start, -1, `missing start marker: ${startMarker}`)
  assert.notEqual(end, -1, `missing end marker: ${endMarker}`)
  return text.slice(start, end)
}

test('frontend corpus loads both authoritative Airtable tables without workflow-status filtering', () => {
  assert.match(source, /OCC_Blog_Posts/)
  assert.match(source, /OCC_INDEXED_PROTECTED/)
  assert.match(source, /async function loadAllPosts\(\)[\s\S]*for \(const tableName of AIRTABLE_TABLE_NAMES\)[\s\S]*fetchTableRecords\(tableName\)/)
  assert.match(source, /maxRecords\?: number/)
  assert.match(source, /return maxRecords \? all\.slice\(0, maxRecords\) : all/)
  assert.doesNotMatch(source, /publishedStatusForTable|isPublishedRecord/)
  assert.doesNotMatch(source, /filterByFormula[^\n]*status|\{status\}=/i)
})

test('canonical Airtable corpus follows every pagination offset instead of stopping after one page', () => {
  const fetchSection = sectionBetween(
    source,
    'async function fetchTableRecords(',
    'export interface BlogPost'
  )

  assert.match(fetchSection, /let offset: string \| undefined/)
  assert.match(fetchSection, /if \(offset\) params\.set\('offset', offset\)/)
  assert.match(
    fetchSection,
    /offset = typeof data\.offset === 'string' && data\.offset \? data\.offset : undefined/
  )
  assert.match(fetchSection, /\} while \(offset && \(!maxRecords \|\| all\.length < maxRecords\)\)/)
})

test('canonical loadAllPosts never applies a maxRecords cap', () => {
  const canonicalSection = sectionBetween(
    source,
    'async function loadAllPosts()',
    'const getAllPostsCached'
  )

  assert.match(canonicalSection, /for \(const tableName of AIRTABLE_TABLE_NAMES\)/)
  assert.match(canonicalSection, /fetchTableRecords\(tableName\)/)
  assert.doesNotMatch(canonicalSection, /fetchTableRecords\(tableName\s*,/)
  assert.doesNotMatch(canonicalSection, /maxRecords/)
})

test('true public identity is deduplicated only by stable slug', () => {
  assert.match(source, /const seenSlug = new Set<string>\(\)/)
  assert.match(source, /const identity = item\.slug\.toLowerCase\(\)/)
  assert.match(source, /seenSlug\.has\(identity\)/)
})

test('Research Journal pagination derives from the complete canonical getAllPosts result', () => {
  assert.match(blogPage, /import \{ getAllPosts \} from "@\/lib\/airtable"/)
  assert.match(blogPage, /const posts = await getAllPosts\(\)/)
  assert.match(
    blogPage,
    /const totalPages = Math\.max\(1, Math\.ceil\(posts\.length \/ POSTS_PER_PAGE\)\)/
  )
  assert.doesNotMatch(blogPage, /const posts = \(await getAllPosts\(\)\)\.(slice|filter)/)
})
