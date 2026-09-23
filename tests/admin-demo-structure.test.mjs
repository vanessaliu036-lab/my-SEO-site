import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const source = (relative) => {
  try { return readFileSync(new URL(`../${relative}`, import.meta.url), 'utf8') } catch { return '' }
}

test('admin requests are guarded server-side and fail closed when not configured', () => {
  const proxy = source('proxy.ts')
  assert.match(proxy, /authorizeAdmin\(/)
  assert.match(proxy, /status:\s*503/)
  assert.match(proxy, /status:\s*401/)
  assert.match(proxy, /WWW-Authenticate/)
  assert.match(proxy, /pathname === "\/admin" \|\| pathname\.startsWith\("\/admin\/"\)/)
  assert.match(proxy, /LEGACY_BLOG_REDIRECTS/)
})

test('operations dashboard stays clearly separated from the live read-only contact inbox', () => {
  assert.match(source('app/admin/layout.tsx'), /CONTACT INBOX LIVE/)
  assert.match(source('app/admin/layout.tsx'), /Operations demo/)
  assert.match(source('app/admin/leads/page.tsx'), /fetchContactLeads/)
  assert.doesNotMatch(source('app/admin/leads/page.tsx'), /persistContactLead/)
})

test('staff login sits in the footer and admin is excluded from robots indexing', () => {
  assert.match(source('components/site/site-footer.tsx'), /href="\/admin"/)
  assert.match(source('app/robots.ts'), /'\/admin\/'/)
})
