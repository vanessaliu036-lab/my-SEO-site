import test from 'node:test'
import assert from 'node:assert/strict'

const { sendContactNotification } = await import('../lib/contact-notification.mjs')
const enquiry = {
  name: 'Buyer <A>',
  company: 'QA Hotel',
  email: 'buyer@example.test',
  country: 'Cambodia',
  service: 'Wholesale / Sourcing',
  projectStage: 'Ready to order',
  message: 'Please send <details>.',
}

test('contact notification carries commercial qualification fields and safe reply-to', async () => {
  let payload
  const result = await sendContactNotification(enquiry, {
    env: {
      RESEND_API_KEY: 're_test',
      CONTACT_FROM_EMAIL: 'OCC Website <website@origincafekh.com>',
      CONTACT_NOTIFICATION_EMAIL: 'service@origincafekh.com',
    },
    fetchImpl: async (_url, options) => {
      assert.equal(options.headers.Authorization, 'Bearer re_test')
      payload = JSON.parse(options.body)
      return { ok: true }
    },
  })
  assert.equal(result.sent, true)
  assert.deepEqual(payload.to, ['service@origincafekh.com'])
  assert.equal(payload.reply_to, 'buyer@example.test')
  assert.match(payload.html, /QA Hotel/)
  assert.match(payload.html, /Ready to order/)
  assert.match(payload.html, /Buyer &lt;A&gt;/)
  assert.doesNotMatch(payload.html, /<details>/)
})

test('contact notification remains non-blocking when mail credentials are absent', async () => {
  const result = await sendContactNotification(enquiry, { env: {} })
  assert.deepEqual(result, { sent: false, reason: 'unconfigured' })
})
