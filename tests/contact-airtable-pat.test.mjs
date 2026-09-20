import test from 'node:test'
import assert from 'node:assert/strict'
import { persistContactLead } from '../lib/contact-lead-delivery.mjs'

const sample = { name: 'Synthetic QA', email: 'qa@example.test', service: 'Sample Request', message: 'Test only' }
const baseId = 'appJCcT41WRfKpWk2'

test('AIRTABLE_PAT-only environment writes and confirms returned record ID', async () => {
  let calls = 0
  const delivered = await persistContactLead(sample, {
    env: { AIRTABLE_PAT: 'pat-only-secret', AIRTABLE_BASE_ID: baseId },
    fetchImpl: async (_url, options) => {
      calls += 1
      assert.equal(options.headers.Authorization, 'Bearer pat-only-secret')
      return { ok: true, json: async () => ({ records: [{ id: 'recABC12345678901' }] }) }
    },
  })
  assert.equal(delivered, true)
  assert.equal(calls, 1)
})

test('PAT-only with incorrect base fails closed without making a request', async () => {
  const delivered = await persistContactLead(sample, {
    env: { AIRTABLE_PAT: 'pat-only-secret', AIRTABLE_BASE_ID: 'wrong' },
    fetchImpl: async () => { throw Error('unexpected request') },
  })
  assert.equal(delivered, false)
})
