// Server-only reader for the contact leads already persisted by the public form.
const LEADS_BASE_ID = 'appJCcT41WRfKpWk2'
const LEADS_TABLE_ID = 'tbl7OE9ML6ksQ27qy'

const FIELDS = {
  title: 'fldvAZ4y6ZEqWbyq5',
  name: 'fldHHRfTCecsvyg5b',
  email: 'fldbLSnIyiApGAw7Q',
  interest: 'fldq91HTSYa3rxLBC',
  message: 'fldomWJyClrC2dFH8',
  source: 'fldcUFGqwGNHEQ9SH',
  status: 'fldyfWd2DzMJSUtxB',
  createdAt: 'fldJTzqH6dFgUtlmy',
}

function text(value, fallback = '') {
  if (typeof value === 'string' && value.trim()) return value.trim()
  if (typeof value === 'number') return String(value)
  if (value && typeof value === 'object' && typeof value.name === 'string') return value.name.trim()
  return fallback
}

export async function fetchContactLeads({ env = process.env, fetchImpl = fetch, limit = 100 } = {}) {
  const token = env.AIRTABLE_TOKEN || env.AIRTABLE_API_KEY || env.AIRTABLE_PAT
  if (!token || env.AIRTABLE_BASE_ID !== LEADS_BASE_ID) {
    throw new Error('Contact inbox is not configured')
  }

  const safeLimit = Math.max(1, Math.min(Number(limit) || 100, 100))
  const params = new URLSearchParams({
    maxRecords: String(safeLimit),
    pageSize: String(safeLimit),
    returnFieldsByFieldId: 'true',
    'sort[0][field]': FIELDS.createdAt,
    'sort[0][direction]': 'desc',
  })
  for (const field of Object.values(FIELDS)) params.append('fields[]', field)

  const response = await fetchImpl(
    `https://api.airtable.com/v0/${LEADS_BASE_ID}/${LEADS_TABLE_ID}?${params}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
      signal: AbortSignal.timeout(10000),
    },
  )
  if (!response.ok) throw new Error(`Contact inbox request failed (${response.status})`)

  const payload = await response.json()
  return (Array.isArray(payload.records) ? payload.records : []).map((record) => {
    const fields = record?.fields || {}
    return {
      id: text(record?.id),
      title: text(fields[FIELDS.title], 'Contact enquiry'),
      name: text(fields[FIELDS.name], 'Unknown contact'),
      email: text(fields[FIELDS.email]),
      interest: text(fields[FIELDS.interest], 'General enquiry'),
      message: text(fields[FIELDS.message]),
      source: text(fields[FIELDS.source], '/contact'),
      status: text(fields[FIELDS.status], 'New'),
      createdAt: text(fields[FIELDS.createdAt]),
    }
  })
}

