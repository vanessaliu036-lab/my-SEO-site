import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

function read(path) {
  return readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
}

const sovannPage = read('app/(site)/collection/sovann/page.tsx')
const prekPage = read('app/(site)/collection/prek/page.tsx')

test('SOVANN and PREK keep Product entities while internal SEO strategy stays private', () => {
  for (const source of [sovannPage, prekPage]) {
    assert.match(source, /"@type": "Product"/)
  }

  assert.doesNotMatch(sovannPage, /SEO Cluster|keyword territory|const keywordTerritory/i)
})

test('SOVANN and PREK avoid unsupported operating, sourcing, traceability, and live-inventory claims', () => {
  const productClaims = `${sovannPage}\n${prekPage}`

  assert.doesNotMatch(
    productClaims,
    /Shop SOVANN|Shop PREK|OCC refines the profile|For OCC, this means|Fresh regional sourcing|Shorter supply chains|clear origin relationships|maintain traceability|careful sourcing|controlled resting/i,
  )
})
