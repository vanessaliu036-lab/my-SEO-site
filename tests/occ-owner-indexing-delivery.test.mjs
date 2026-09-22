import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

function read(path) {
  return readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
}

const articlePage = read('app/(site)/blog/[slug]/page.tsx')
const blogPage = read('app/(site)/blog/page.tsx')
const sitemapPage = read('app/sitemap.ts')
const airtable = read('lib/airtable.ts')

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

  assert.match(blogPage, /const CORE_FINE_ROBUSTA_OWNERS = \[/)
  assert.match(blogPage, /href=\{guide\.href\}/)

  for (const href of ownerHrefs) {
    assert.match(blogPage, new RegExp(`href:\\s*["']${href.replaceAll('/', '\\/')}["']`))
  }
})


test('sitemap is explicitly backed by the published Airtable corpus', () => {
  assert.match(sitemapPage, /getPublishedPosts/)
  assert.doesNotMatch(sitemapPage, /getAllPosts/)
})

test('Airtable Draft records are excluded from public lists and slug routes', () => {
  assert.match(airtable, /import \{ isIndexableByPublicationPolicy \} from ['"]\.\/publicationPolicy\.mjs['"]/)
  assert.match(airtable, /['"]Status['"]/)
  assert.match(airtable, /function isFrontendRecord\(record: AirtableRecord\)/)
  assert.match(airtable, /if \(!isFrontendRecord\(record\)\) continue/)
  assert.match(airtable, /if \(isFrontendRecord\(direct\)\) return recordToDetail\(direct\)/)
})
