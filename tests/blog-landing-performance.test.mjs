import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const source = fs.readFileSync("app/(site)/blog/page.tsx", "utf8")

test("blog landing avoids a full-corpus Airtable read", () => {
  assert.match(source, /getRecentPosts/)
  assert.match(source, /const isLandingPage = page === 1/)
  assert.doesNotMatch(source, /BLOG_CORPUS_POSTS|BLOG_TOTAL_PAGES/)
  assert.match(source, /const hasMorePosts = isLandingPage \? posts\.length > POSTS_PER_PAGE : page < totalPages/)
  assert.match(
    source,
    /const posts = isLandingPage \? await getRecentPosts\(\) : await getAllPosts\(\)/
  )
  assert.match(source, /Page 1/)
  assert.match(source, /href="\/blog\?page=2"/)
})
