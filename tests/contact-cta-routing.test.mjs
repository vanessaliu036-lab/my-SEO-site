import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const source = (relative) => readFileSync(new URL('../' + relative, import.meta.url), 'utf8')

test('commercial discussion CTAs route into the Contact form', () => {
  const origins = source('app/(site)/origins/page.tsx')
  const roasting = source('app/(site)/solutions/roasting-program/page.tsx')
  const finalCta = source('components/site/site-final-cta.tsx')
  assert.match(origins, /href="\/contact"[^>]*>Discuss wholesale supply/)
  assert.match(roasting, /href="\/contact">Discuss Wholesale Supply/)
  assert.doesNotMatch(finalCta, /primaryHref:\s*"(?!\/contact)/)
})

test('Contact captures the six commercial inbox fields', () => {
  const form = source('app/(site)/contact/ContactForm.tsx')
  const schema = source('app/(site)/contact/schema.ts')
  for (const field of ['name', 'company', 'email', 'country', 'service', 'projectStage']) {
    assert.match(form, new RegExp('register\\("' + field + '"\\)'))
  }
  assert.match(schema, /"Distribution \/ Partnership"/)
  assert.match(schema, /"Ready to order"/)
})

test('admin dashboard exposes working Order Inbox and Contact Inquiries workflows', () => {
  const dashboard = source('app/admin/AdminDashboard.tsx')
  const page = source('app/admin/page.tsx')
  assert.match(dashboard, /"Order Inbox"/)
  assert.match(dashboard, /"Contact Inquiries"/)
  assert.match(dashboard, /Create B2B Account/)
  assert.match(dashboard, /Create B2B Contact/)
  assert.match(dashboard, /Create Quote/)
  assert.doesNotMatch(dashboard, />\+ New</)
  assert.match(page, /fetchOrderInbox/)
  assert.match(page, /fetchContactLeads/)
})

test('Contact message field remains a long-form project requirement field', () => {
  const form = source('app/(site)/contact/ContactForm.tsx')
  assert.match(form, /id="message-help"/)
  assert.match(form, /rows=\{6\}/)
  assert.match(form, /maxLength=\{2000\}/)
  assert.match(form, /message\.length\} \/ 2000/)
})
