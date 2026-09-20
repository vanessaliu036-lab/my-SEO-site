// Server-only delivery. The website must never report success for a log-only enquiry.
const LEADS_BASE_ID = 'appJCcT41WRfKpWk2'
const LEADS_TABLE_ID = 'tbl7OE9ML6ksQ27qy'

const leadTypes = {
  'Wholesale / Sourcing': 'Wholesale & Sourcing',
  'Sample Request': 'Wholesale & Sourcing',
  'Lot List': 'Wholesale & Sourcing',
  'Roasting / Solutions': 'Roasting Program',
  'Editorial / Source Correction': 'Other',
  'Media / Interview': 'Other',
  'General Enquiry': 'Other',
}

export async function persistContactLead(data, { env = process.env, fetchImpl = fetch, now = () => new Date() } = {}) {
  const token = env.AIRTABLE_TOKEN || env.AIRTABLE_API_KEY
  const baseId = env.AIRTABLE_BASE_ID
  const leadType = leadTypes[data.service]
  if (!token || baseId !== LEADS_BASE_ID || !leadType) return false

  const fields = {
    fldvAZ4y6ZEqWbyq5: `${data.name} — ${data.service}`,
    fldHHRfTCecsvyg5b: data.name,
    fldbLSnIyiApGAw7Q: data.email,
    fldq91HTSYa3rxLBC: leadType,
    fldomWJyClrC2dFH8: `Enquiry type: ${data.service}\n${data.message || '(no message)'}`,
    fldcUFGqwGNHEQ9SH: '/contact',
    fldyfWd2DzMJSUtxB: 'New',
    fldJTzqH6dFgUtlmy: now().toISOString(),
  }

  try {
    const response = await fetchImpl(`https://api.airtable.com/v0/${baseId}/${LEADS_TABLE_ID}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ records: [{ fields }], typecast: false }),
      cache: 'no-store',
      signal: AbortSignal.timeout(10000),
    })
    if (!response.ok) return false
    const result = await response.json()
    return result.records?.length === 1 && /^rec[A-Za-z0-9]{14}$/.test(result.records[0]?.id || '')
  } catch {
    // Never include submitted PII or API credentials in function logs or user-visible errors.
    return false
  }
}
