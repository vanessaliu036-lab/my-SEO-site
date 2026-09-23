import test from 'node:test'
import assert from 'node:assert/strict'
import { persistContactLead } from '../lib/contact-lead-delivery.mjs'

const sample = {
  name: 'OCC QA',
  company: 'QA Hotel',
  email: 'qa@example.test',
  country: 'Cambodia',
  service: 'Wholesale / Sourcing',
  projectStage: 'Ready to order',
  message: 'Synthetic smoke test',
}
const env = { AIRTABLE_TOKEN: 'test-server-only-token', AIRTABLE_BASE_ID: 'appJCcT41WRfKpWk2' }

test('fails closed when the Airtable credential is not configured', async () => {
  let called = false
  const delivered = await persistContactLead(sample, { env: { AIRTABLE_BASE_ID: env.AIRTABLE_BASE_ID }, fetchImpl: async () => { called = true; throw Error('unexpected fetch') } })
  assert.equal(delivered, false)
  assert.equal(called, false)
})

test('only returns success after a complete commercial lead is persisted', async () => {
  let endpoint, request
  const delivered = await persistContactLead(sample, {
    env,
    now: () => new Date('2026-09-23T10:30:00.000Z'),
    fetchImpl: async (url, options) => {
      endpoint = url
      request = options
      return { ok: true, json: async () => ({ records: [{ id: 'recABC12345678901' }] }) }
    },
  })
  assert.equal(delivered, true)
  assert.equal(endpoint, 'https://api.airtable.com/v0/appJCcT41WRfKpWk2/tbl7OE9ML6ksQ27qy')
  const fields = JSON.parse(request.body).records[0].fields
  assert.equal(fields.fldHHRfTCecsvyg5b, sample.name)
  assert.equal(fields.fldCkWbuV4lFt5Mbq, sample.company)
  assert.equal(fields.fldbLSnIyiApGAw7Q, sample.email)
  assert.equal(fields.fldCEEsTN9XD3ddK4, sample.country)
  assert.equal(fields.fldq91HTSYa3rxLBC, 'Wholesale & Sourcing')
  assert.equal(fields.fldsOyCEEoIGPSQPb, sample.projectStage)
  assert.equal(fields.fldZxno6lrUVyq0F1, 'Unread')
  assert.equal(fields.fldRkeLPYNy4eCpeG, 'Not Converted')
  assert.equal(fields.fldcUFGqwGNHEQ9SH, '/contact')
})

test('all four Contact intents map to supported Airtable choices', async () => {
  const expected = {
    'Wholesale / Sourcing': 'Wholesale & Sourcing',
    'Roasting / Solutions': 'Roasting Program',
    'Partnership / Distribution': 'Distribution Partnership',
    'Other / General': 'Other',
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
    assert.equal(result, true)
    assert.equal(body.records[0].fields.fldq91HTSYa3rxLBC, choice)
  }
})

test('never claims success for rejected or unconfirmed Airtable writes', async () => {
  for (const response of [
    { ok: false, status: 403 },
    { ok: true, json: async () => ({ records: [] }) },
    { ok: true, json: async () => ({ records: [{}] }) },
  ]) {
    assert.equal(await persistContactLead(sample, { env, fetchImpl: async () => response }), false)
  }
})

test('the contact server action gates success on confirmed persistence and does not log PII', async () => {
  const { readFileSync } = await import('node:fs')
  const source = readFileSync(new URL('../app/(site)/contact/action.ts', import.meta.url), 'utf8')
  assert.match(source, /await persistContactLead\\(parsed\\.data\\)/)
  assert.match(source, /if \\(!persisted\\)[\\s\\S]*success: false/)
  assert.doesNotMatch(source, /console\\.log|New message received/)
})
