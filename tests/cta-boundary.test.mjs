import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { persistContactLead } from '../lib/contact-lead-delivery.mjs'

const contactDir = new URL('../app/(site)/contact/', import.meta.url)
const fixture = { name: 'OCC QA', email: 'qa@example.test', service: 'Sample Request' }

test('contact delivery accepts the existing server-side AIRTABLE_PAT credential', async () => {
  let requests = 0
  const saved = await persistContactLead(fixture, {
    env: { AIRTABLE_PAT: 'sentinel-test-pat', AIRTABLE_BASE_ID: 'appJCcT41WRfKpWk2' },
    fetchImpl: async (_url, options) => {
      requests += 1
      assert.equal(options.headers.Authorization, 'Bearer sentinel-test-pat')
      return { ok: true, json: async () => ({ records: [{ id: 'recABC12345678901' }] }) }
    },
  })
  assert.equal(saved, true)
  assert.equal(requests, 1)
})

test('contact server action exports only async server functions; validation schema is shared', () => {
  const action = readFileSync(new URL('action.ts', contactDir), 'utf8')
  const client = readFileSync(new URL('ContactForm.tsx', contactDir), 'utf8')
  assert.doesNotMatch(action, /export\s+(?:const|let|var)\s+contactSchema\b/)
  assert.match(action, /import\s+\{\s*contactSchema\s*\}\s+from\s+["']\.\/schema["']/)
  assert.ok(existsSync(new URL('schema.ts', contactDir)))
  assert.match(client, /import\s+\{\s*contactSchema\s*,\s*type\s+ContactFormData\s*\}\s+from\s+["']\.\/schema["']/)
  assert.match(client, /import\s+\{\s*submitContactForm\s*\}\s+from\s+["']\.\/action["']/)
})