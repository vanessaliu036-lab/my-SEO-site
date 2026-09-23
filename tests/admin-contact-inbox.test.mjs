import test from 'node:test'
import assert from 'node:assert/strict'

const { fetchContactLeads, updateContactLead, convertContactLead } = await import('../lib/admin-contact-inbox.mjs')
const { fetchOrderInbox, updateOrderInboxEntry } = await import('../lib/admin-order-inbox.mjs')

const env = { AIRTABLE_PAT: 'test-token', AIRTABLE_BASE_ID: 'appJCcT41WRfKpWk2' }

test('admin contact inbox exposes Company, Work Email, Country, Intent and Project Stage', async () => {
  const records = await fetchContactLeads({
    env,
    fetchImpl: async () => ({
      ok: true,
      json: async () => ({ records: [{
        id: 'recABC12345678901',
        fields: {
          fldvAZ4y6ZEqWbyq5: 'QA Hotel — Buyer',
          fldHHRfTCecsvyg5b: 'Buyer',
          fldCkWbuV4lFt5Mbq: 'QA Hotel',
          fldbLSnIyiApGAw7Q: 'buyer@example.test',
          fldCEEsTN9XD3ddK4: 'Cambodia',
          fldq91HTSYa3rxLBC: 'Wholesale & Sourcing',
          fldomWJyClrC2dFH8: 'Need 20kg',
          fldsOyCEEoIGPSQPb: 'Ready to order',
          fldcUFGqwGNHEQ9SH: '/contact',
          fldyfWd2DzMJSUtxB: 'New',
          fldJTzqH6dFgUtlmy: '2026-09-23T08:00:00.000Z',
          flda7ZyX0xciKGhdN: 'High',
          fldZxno6lrUVyq0F1: 'Unread',
          fldRkeLPYNy4eCpeG: 'Not Converted',
        },
      }] }),
    }),
  })
  assert.equal(records[0].company, 'QA Hotel')
  assert.equal(records[0].email, 'buyer@example.test')
  assert.equal(records[0].country, 'Cambodia')
  assert.equal(records[0].interest, 'Wholesale & Sourcing')
  assert.equal(records[0].stage, 'Ready to order')
  assert.equal(records[0].readStatus, 'Unread')
})

test('contact inbox mutations are restricted to known workflow values', async () => {
  let body
  const ok = await updateContactLead('recABC12345678901', { priority: 'Urgent', readStatus: 'Read' }, {
    env,
    fetchImpl: async (_url, options) => { body = JSON.parse(options.body); return { ok: true } },
  })
  assert.equal(ok, true)
  assert.equal(body.fields.flda7ZyX0xciKGhdN, 'Urgent')
  assert.equal(body.fields.fldZxno6lrUVyq0F1, 'Read')
})

test('qualified contact lead can create a B2B Account without duplicate conversion', async () => {
  let postCount = 0
  const leadPayload = {
    id: 'recABC12345678901',
    fields: {
      fldHHRfTCecsvyg5b: 'Buyer',
      fldCkWbuV4lFt5Mbq: 'QA Hotel',
      fldbLSnIyiApGAw7Q: 'buyer@example.test',
      fldCEEsTN9XD3ddK4: 'Cambodia',
      fldq91HTSYa3rxLBC: 'Wholesale & Sourcing',
      fldomWJyClrC2dFH8: 'Need 20kg',
      fldsOyCEEoIGPSQPb: 'Ready to order',
    },
  }
  const result = await convertContactLead('recABC12345678901', 'account', {
    env,
    fetchImpl: async (url, options) => {
      if (options?.method === 'POST') {
        postCount += 1
        assert.match(String(url), /tblIr777MquGF8a2y/)
        return { ok: true, json: async () => ({ id: 'recNEWACCOUNT00001' }) }
      }
      if (options?.method === 'PATCH') return { ok: true, json: async () => ({}) }
      return { ok: true, json: async () => leadPayload }
    },
  })
  assert.equal(result.created, true)
  assert.equal(postCount, 1)
})

test('order inbox reads normalized multi-platform records newest first', async () => {
  let requested = ''
  const rows = await fetchOrderInbox({
    env,
    fetchImpl: async (url, options) => {
      requested = String(url)
      assert.equal(options.headers.Authorization, 'Bearer test-token')
      return { ok: true, json: async () => ({ records: [{
        id: 'recORDER123456789',
        fields: {
          fldRU4UifcDLzLjFP: 'Website wholesale inquiry',
          fldUI92l8jtpE6x12: 'Website',
          fldIsOdgs7o3JgFYG: 'Buyer',
          flds9phzJ7hd702Mi: 'QA Hotel',
          fldyESKySzs1bFbuf: '20kg',
          fldkGXp0ICUqVmYJY: 'Urgent',
          fldVQqb4cduULtxOg: 'Unread',
          fldR3iuIBTkuy3pcu: 'New',
          fldkqWvzfmQbZuuDy: '2026-09-23T10:00:00.000Z',
        },
      }] }) }
    },
  })
  assert.match(requested, /tblzvYB8iNP1c2V7U/)
  assert.match(requested, /sort%5B0%5D%5Bdirection%5D=desc/)
  assert.equal(rows[0].source, 'Website')
  assert.equal(rows[0].priority, 'Urgent')
  assert.equal(rows[0].readStatus, 'Unread')
})

test('order inbox can mark read, prioritize and mark converted', async () => {
  let body
  const ok = await updateOrderInboxEntry('recORDER123456789', {
    readStatus: 'Read',
    priority: 'High',
    inboxStatus: 'Converted',
  }, {
    env,
    fetchImpl: async (_url, options) => { body = JSON.parse(options.body); return { ok: true } },
  })
  assert.equal(ok, true)
  assert.equal(body.fields.fldVQqb4cduULtxOg, 'Read')
  assert.equal(body.fields.fldkGXp0ICUqVmYJY, 'High')
  assert.equal(body.fields.fldR3iuIBTkuy3pcu, 'Converted')
})
