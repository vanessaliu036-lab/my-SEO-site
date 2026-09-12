import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

function read(path) {
  return readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
}

const nextConfig = read('next.config.mjs')
const proxySource = read('proxy.ts')

test('legacy /coffee/single-origin permanently consolidates into the Single Origin owner', () => {
  const frameworkRoute = /source:\s*['"]\/coffee\/single-origin['"][\s\S]{0,180}?destination:\s*['"]\/origins\/single-origin['"][\s\S]{0,100}?(?:permanent:\s*true|statusCode:\s*301)/

  assert.match(nextConfig, frameworkRoute)
  assert.match(
    proxySource,
    /["']\/coffee\/single-origin["']\s*:\s*["']\/origins\/single-origin["']/,
  )
  assert.match(proxySource, /NextResponse\.redirect\(url, 301\)/)
})
