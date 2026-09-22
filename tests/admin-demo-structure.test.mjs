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
  assert.match(proxy, /\/admin\/:path\*/)
})

test('dashboard and form lab are explicitly demo-only and never write to Airtable', () => {
  assert.match(source('app/admin/layout.tsx'), /DEMO DATA/)
  assert.match(source('app/admin/leads/LeadFormLab.tsx'), /SYNTHETIC/)
  assert.doesNotMatch(source('app/admin/leads/LeadFormLab.tsx'), /persistContactLead|api\.airtable\.com|AIRTABLE_TOKEN/)
})

test('staff login sits in the footer and admin is excluded from robots indexing', () => {
  assert.match(source('components/site/site-footer.tsx'), /href="\/admin"/)
  assert.match(source('app/robots.ts'), /'\/admin\/'/)
})
