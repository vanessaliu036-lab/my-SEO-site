const BASE_ID = 'appJCcT41WRfKpWk2'
const TABLE_ID = 'tblzvYB8iNP1c2V7U'

const FIELDS = {
  title: 'fldRU4UifcDLzLjFP',
  externalId: 'fldnsqYhAGxD3H82S',
  source: 'fldUI92l8jtpE6x12',
  customer: 'fldIsOdgs7o3JgFYG',
  company: 'flds9phzJ7hd702Mi',
  email: 'fld4K6Rp9eMRWf0j4',
  country: 'fld6dXk5gQqOpmHwr',
  type: 'fldfgN3fO1kOnjyoC',
  items: 'fldyESKySzs1bFbuf',
  amount: 'fldpYlCcFkWF9BWOA',
  currency: 'fld4SioqjseLqwgIP',
  payment: 'fldCzBUqz6De6gGrH',
  priority: 'fldkGXp0ICUqVmYJY',
  readStatus: 'fldVQqb4cduULtxOg',
  inboxStatus: 'fldR3iuIBTkuy3pcu',
  formalOrderId: 'fldFQIZQNupx8hqEe',
  receivedAt: 'fldkqWvzfmQbZuuDy',
  sourceUrl: 'flddQTkWMW5dKLwfV',
  notes: 'fldxJvwHQaSVwnTy8',
}

function token(env) {
  return env.AIRTABLE_TOKEN || env.AIRTABLE_API_KEY || env.AIRTABLE_PAT
}

function value(input, fallback = '') {
  if (typeof input === 'string') return input.trim() || fallback
  if (typeof input === 'number') return input
  if (input && typeof input === 'object' && typeof input.name === 'string') return input.name
  return fallback
}

function configured(env) {
  const apiToken = token(env)
  if (!apiToken || env.AIRTABLE_BASE_ID !== BASE_ID) throw new Error('Order inbox is not configured')
  return apiToken
}

export async function fetchOrderInbox({ env = process.env, fetchImpl = fetch, limit = 100 } = {}) {
  const apiToken = configured(env)
  const safeLimit = Math.max(1, Math.min(Number(limit) || 100, 100))
  const params = new URLSearchParams({
    maxRecords: String(safeLimit),
    pageSize: String(safeLimit),
    returnFieldsByFieldId: 'true',
    'sort[0][field]': FIELDS.receivedAt,
    'sort[0][direction]': 'desc',
  })
  for (const field of Object.values(FIELDS)) params.append('fields[]', field)

  const response = await fetchImpl('https://api.airtable.com/v0/' + BASE_ID + '/' + TABLE_ID + '?' + params, {
    headers: { Authorization: 'Bearer ' + apiToken },
    cache: 'no-store',
    signal: AbortSignal.timeout(10000),
  })
  if (!response.ok) throw new Error('Order inbox request failed (' + response.status + ')')
  const payload = await response.json()

  return (Array.isArray(payload.records) ? payload.records : []).map((record) => {
    const fields = record?.fields || {}
    return {
      id: value(record?.id),
      title: value(fields[FIELDS.title], 'Order enquiry'),
      externalId: value(fields[FIELDS.externalId]),
      source: value(fields[FIELDS.source], 'Other'),
      customer: value(fields[FIELDS.customer], 'Unknown customer'),
      company: value(fields[FIELDS.company]),
      email: value(fields[FIELDS.email]),
      country: value(fields[FIELDS.country]),
      type: value(fields[FIELDS.type], 'Other'),
      items: value(fields[FIELDS.items]),
      amount: Number(fields[FIELDS.amount] || 0),
      currency: value(fields[FIELDS.currency], 'USD'),
      payment: value(fields[FIELDS.payment], 'Unknown'),
      priority: value(fields[FIELDS.priority], 'Normal'),
      readStatus: value(fields[FIELDS.readStatus], 'Unread'),
      inboxStatus: value(fields[FIELDS.inboxStatus], 'New'),
      formalOrderId: value(fields[FIELDS.formalOrderId]),
      receivedAt: value(fields[FIELDS.receivedAt]),
      sourceUrl: value(fields[FIELDS.sourceUrl]),
      notes: value(fields[FIELDS.notes]),
    }
  })
}

export async function updateOrderInboxEntry(recordId, patch, { env = process.env, fetchImpl = fetch } = {}) {
  if (!/^rec[A-Za-z0-9]{14}$/.test(String(recordId || ''))) throw new Error('Invalid order inbox record')
  const apiToken = configured(env)
  const fields = {}

  if (patch.readStatus && ['Unread', 'Read'].includes(patch.readStatus)) fields[FIELDS.readStatus] = patch.readStatus
  if (patch.priority && ['Urgent', 'High', 'Normal', 'Low'].includes(patch.priority)) fields[FIELDS.priority] = patch.priority
  if (patch.inboxStatus && ['New', 'Reviewing', 'Converted', 'Closed'].includes(patch.inboxStatus)) fields[FIELDS.inboxStatus] = patch.inboxStatus
  if (typeof patch.formalOrderId === 'string') fields[FIELDS.formalOrderId] = patch.formalOrderId.slice(0, 120)
  if (!Object.keys(fields).length) return false

  const response = await fetchImpl('https://api.airtable.com/v0/' + BASE_ID + '/' + TABLE_ID + '/' + recordId, {
    method: 'PATCH',
    headers: { Authorization: 'Bearer ' + apiToken, 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields, typecast: false }),
    cache: 'no-store',
    signal: AbortSignal.timeout(10000),
  })
  return response.ok
}
