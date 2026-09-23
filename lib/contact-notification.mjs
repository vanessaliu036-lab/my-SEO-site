const RESEND_ENDPOINT = 'https://api.resend.com/emails'
const DEFAULT_RECIPIENT = 'service@origincafekh.com'

function cleanSubject(value) {
  return String(value || '').replace(/[\r\n]+/g, ' ').trim().slice(0, 120)
}

function escapeHtml(value) {
  return String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

export async function sendContactNotification(data, { env = process.env, fetchImpl = fetch } = {}) {
  const apiKey = env.RESEND_API_KEY
  const from = env.CONTACT_FROM_EMAIL
  const to = env.CONTACT_NOTIFICATION_EMAIL || DEFAULT_RECIPIENT
  if (!apiKey || !from) return { sent: false, reason: 'unconfigured' }

  const name = cleanSubject(data.name) || 'Website visitor'
  const service = cleanSubject(data.service) || 'General enquiry'
  const message = String(data.message || '(no message)').slice(0, 4000)
  const replyTo = String(data.email || '').trim()

  try {
    const response = await fetchImpl(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: replyTo,
        subject: `New OCC contact: ${service} — ${name}`,
        text: `Name: ${name}\nEmail: ${replyTo}\nEnquiry: ${service}\n\n${message}`,
        html: `<h1>New OCC website enquiry</h1><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(replyTo)}</p><p><strong>Enquiry:</strong> ${escapeHtml(service)}</p><p><strong>Message:</strong></p><p>${escapeHtml(message).replaceAll('\n', '<br>')}</p>`,
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(10000),
    })
    return response.ok ? { sent: true } : { sent: false, reason: 'provider-error' }
  } catch {
    return { sent: false, reason: 'provider-error' }
  }
}

