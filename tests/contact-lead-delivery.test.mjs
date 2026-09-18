import test from 'node:test'
import assert from 'node:assert/strict'
import { persistContactLead } from '../lib/contact-lead-delivery.mjs'

const sample = { name: 'OCC QA', email: 'qa@example.test', service: 'Sample Request', message: 'Synthetic smoke test' }
const env = { AIRTABLE_TOKEN: 'test-server-only-token', AIRTABLE_BASE_ID: 'appJCcT41WRfKpWk2' }

test('fails closed when the Airtable credential is not configured', async () => {
  let called = false
  const delivered = await persistContactLead(sample, { env: { AIRTABLE_BASE_ID: env.AIRTABLE_BASE_ID }, fetchImpl: async () => { called = true; throw Error('unexpected fetch') } })
  assert.equal(delivered, false)
  assert.equal(called, false)
})

test('only returns success after Airtable responds with a persisted record id', async () => {
  let endpoint, request
  const delivered = await persistContactLead(sample, {
    env,
    now: () => new Date('2026-09-17T14:30:00.000Z'),
    fetchImpl: async (url, options) => {
      endpoint = url
      request = options
      return { ok: true, json: async () => ({ records: [{ id: 'recABC12345678901' }] }) }
    },
  })
  assert.equal(delivered, true)
  assert.equal(endpoint, 'https://api.airtable.com/v0/appJCcT41WRfKpWk2/tbl7OE9ML6ksQ27qy')
  assert.equal(request.method, 'POST')
  assert.equal(request.headers.Authorization, 'Bearer test-server-only-token')
  const payload = JSON.parse(request.body)
  assert.equal(payload.records.length, 1)
  const fields = payload.records[0].fields
  assert.equal(fields.fldHHRfTCecsvyg5b, sample.name)
  assert.equal(fields.fldbLSnIyiApGAw7Q, sample.email)
  assert.equal(fields.fldq91HTSYa3rxLBC, 'Wholesale & Sourcing')
  assert.match(fields.fldomWJyClrC2dFH8, /Sample Request[\s\S]*Synthetic smoke test/)
  assert.equal(fields.fldcUFGqwGNHEQ9SH, '/contact')
  assert.equal(fields.fldyfWd2DzMJSUtxB, 'New')
  assert.equal(fields.fldJTzqH6dFgUtlmy, '2026-09-17T14:30:00.000Z')
})

test('never claims success for rejected or unconfirmed Airtable writes', async () => {
  for (const response of [
    { ok: false, status: 403 },
    { ok: true, json: async () => ({ records: [] }) },
    { ok: true, json: async () => ({ records: [{}] }) },
  ]) {
    assert.equal(await persistContactLead(sample, { env, fetchImpl: async () => response }), false)
  }
  assert.equal(await persistContactLead(sample, { env, fetchImpl: async () => { throw Error('network failure') } }), false)
})

test('every existing enquiry option maps to a supported Airtable select value', async () => {
  const expected = {
    'Wholesale / Sourcing': 'Wholesale & Sourcing',
    'Sample Request': 'Wholesale & Sourcing',
    'Lot List': 'Wholesale & Sourcing',
    'Roasting / Solutions': 'Roasting Program',
    'Editorial / Source Correction': 'Other',
    'Media / Interview': 'Other',
    'General Enquiry': 'Other',
  }
  for (const [service, choice] of Object.entries(expected)) {
    let body
    const result = await persistContactLead({ ...sample, service }, {
      env,
      fetchImpl: async (_url, options) => {
        body = JSON.parse(options.body)
        return { ok: true, json: async () => ({ records: [{ id: 'recABC12345678901' }] }) }
      },
    })
    assert.equal(result, true, service)
    assert.equal(body.records[0].fields.fldq91HTSYa3rxLBC, choice, service)
  }
})

test('the contact server action gates the success response on confirmed persistence and does not log PII', async () => {
  const { readFileSync } = await import('node:fs')
  const source = readFileSync(new URL('../app/(site)/contact/action.ts', import.meta.url), 'utf8')
  assert.match(source, /await persistContactLead\(parsed\.data\)/)
  assert.match(source, /if \(!persisted\)[\s\S]*success: false/)
  assert.doesNotMatch(source, /console\.log|New message received/)
})
