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

test('operations dashboard integrates live Order Inbox and Contact Inquiries behind the protected admin route', () => {
  const layout = source('app/admin/layout.tsx')
  const page = source('app/admin/page.tsx')
  const dashboard = source('app/admin/AdminDashboard.tsx')
  assert.match(layout, /ORDER \+ CONTACT INBOX LIVE/)
  assert.match(page, /fetchOrderInbox/)
  assert.match(page, /fetchContactLeads/)
  assert.match(dashboard, /Order Inbox/)
  assert.match(dashboard, /Contact Inquiries/)
  assert.match(source('app/admin/leads/page.tsx'), /redirect\('\/admin\?view=contact-inquiries'\)/)
  assert.doesNotMatch(source('app/admin/leads/page.tsx'), /persistContactLead/)
})

test('staff login sits in the footer without prefetching protected admin routes', () => {
  const footer = source('components/site/site-footer.tsx')
  const staffAccess = source('components/site/staff-access.tsx')
  assert.match(footer, /href="\/admin"\s+prefetch=\{false\}/)
  assert.match(staffAccess, /href="\/admin"[\s\S]*?prefetch=\{false\}/)
  assert.match(source('app/robots.ts'), /'\/admin\/'/)
})
