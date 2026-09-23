import test from 'node:test'
import assert from 'node:assert/strict'

const { fetchContactLeads } = await import('../lib/admin-contact-inbox.mjs')

test('admin contact inbox reads the protected Airtable leads table newest first', async () => {
  let requestedUrl = ''
  const records = await fetchContactLeads({
    env: { AIRTABLE_PAT: 'test-token', AIRTABLE_BASE_ID: 'appJCcT41WRfKpWk2' },
    fetchImpl: async (url, options) => {
      requestedUrl = String(url)
      assert.equal(options.headers.Authorization, 'Bearer test-token')
      return {
        ok: true,
        json: async () => ({ records: [{
          id: 'recABC12345678901',
          fields: {
            fldvAZ4y6ZEqWbyq5: 'Buyer — Sample Request',
            fldHHRfTCecsvyg5b: 'Buyer',
            fldbLSnIyiApGAw7Q: 'buyer@example.test',
            fldq91HTSYa3rxLBC: 'Wholesale & Sourcing',
            fldomWJyClrC2dFH8: 'Sample request',
            fldcUFGqwGNHEQ9SH: '/contact',
            fldyfWd2DzMJSUtxB: 'New',
            fldJTzqH6dFgUtlmy: '2026-09-23T08:00:00.000Z',
          },
        }] }),
      }
    },
  })

  assert.match(requestedUrl, /tbl7OE9ML6ksQ27qy/)
  assert.match(requestedUrl, /sort%5B0%5D%5Bdirection%5D=desc/)
  assert.equal(records[0].email, 'buyer@example.test')
  assert.equal(records[0].message, 'Sample request')
})

test('admin contact inbox fails closed without the production Airtable scope', async () => {
  await assert.rejects(() => fetchContactLeads({ env: {} }), /not configured/i)
})

