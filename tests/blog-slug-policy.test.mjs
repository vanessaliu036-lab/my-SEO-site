import test from 'node:test'
import assert from 'node:assert/strict'
import { canonicalBlogSlug, matchesBlogSlug } from '../lib/blogSlugPolicy.mjs'

test('canonicalBlogSlug normalizes legacy stored blog paths', () => {
  assert.equal(canonicalBlogSlug('coffee-gifts-for-him-her-specialty-guide'), 'coffee-gifts-for-him-her-specialty-guide')
  assert.equal(canonicalBlogSlug('blog/coffee-gifts-for-him-her-specialty-guide'), 'coffee-gifts-for-him-her-specialty-guide')
  assert.equal(canonicalBlogSlug('/blog/coffee-gifts-for-him-her-specialty-guide'), 'coffee-gifts-for-him-her-specialty-guide')
})

test('matchesBlogSlug compares canonical values case-insensitively', () => {
  assert.equal(matchesBlogSlug('blog/Fine-Robusta-Drying', 'fine-robusta-drying'), true)
  assert.equal(matchesBlogSlug('/blog/is-robusta-naturally-bitter', 'is-robusta-naturally-bitter'), true)
  assert.equal(matchesBlogSlug('different-post', 'fine-robusta-drying'), false)
})
