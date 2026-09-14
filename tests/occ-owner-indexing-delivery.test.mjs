import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

function read(path) {
  return readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
}

const articlePage = read('app/(site)/blog/[slug]/page.tsx')
const blogPage = read('app/(site)/blog/page.tsx')

test('article critical render does not wait for recent-post recommendations', () => {
  assert.doesNotMatch(
    articlePage,
    /Promise\.all\(\[getPostBySlug\(slug\),\s*getRecentPosts\(\)\]\)/,
    'critical article content must not be coupled to the non-critical recent-post fetch',
  )
  assert.match(articlePage, /const post = await getPostBySlug\(slug\)/)
  assert.match(articlePage, /async function RelatedArticles/)
})

test('Blog hub exposes direct crawl paths to the Fine Robusta formal owners', () => {
  const ownerHrefs = [
    '/fine-robusta-cambodia',
    '/blog/fine-robusta-grading-verify-before-cupping',
    '/blog/fine-robusta-fermentation',
    '/blog/how-to-brew-cambodian-fine-robusta',
    '/blog/fine-robusta-vs-arabica-buyer-guide',
  ]

  for (const href of ownerHrefs) {
    assert.match(blogPage, new RegExp(`href=["']${href.replaceAll('/', '\\/')}["']`))
  }
})
