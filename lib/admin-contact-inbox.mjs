const LEADS_BASE_ID = 'appJCcT41WRfKpWk2'
const LEADS_TABLE_ID = 'tbl7OE9ML6ksQ27qy'
const ACCOUNT_TABLE_ID = 'tblIr777MquGF8a2y'
const CONTACT_TABLE_ID = 'tblytQsOnuD5GBPHm'
const QUOTE_TABLE_ID = 'tblGl4xXxyUBlk9He'

const FIELDS = {
  title: 'fldvAZ4y6ZEqWbyq5',
  name: 'fldHHRfTCecsvyg5b',
  company: 'fldCkWbuV4lFt5Mbq',
  email: 'fldbLSnIyiApGAw7Q',
  phone: 'fld7D4yMzhagDsac0',
  jobTitle: 'fldgeHRZwYOrG0mf7',
  country: 'fldCEEsTN9XD3ddK4',
  interest: 'fldq91HTSYa3rxLBC',
  message: 'fldomWJyClrC2dFH8',
  stage: 'fldsOyCEEoIGPSQPb',
  source: 'fldcUFGqwGNHEQ9SH',
  status: 'fldyfWd2DzMJSUtxB',
  createdAt: 'fldJTzqH6dFgUtlmy',
  priority: 'flda7ZyX0xciKGhdN',
  readStatus: 'fldZxno6lrUVyq0F1',
  conversionStatus: 'fldRkeLPYNy4eCpeG',
  landingPage: 'fldJHVMy9vt8r4Mwu',
  lastTouchPage: 'fldAvM2AeJ32onisf',
  sourceMedium: 'fldA5l9MZquBNWk5E',
  utmCampaign: 'fldOkPloT4e4CZ2Px',
  kpiExclude: 'fldKEJcmjmG3yUHLs',
  accountLink: 'fldrmb4TxTm1Nfm6r',
  contactLink: 'fldOcoYNkiC8mv2iB',
  quoteLink: 'flduCVdoarj8GzZ00',
}

const ACCOUNT_FIELDS = {
  name: 'fldAZOhn3Xm9tem6d',
  country: 'fldZY7V2V39bFbgHq',
  status: 'fldarbGUWkb8q9i9S',
  source: 'fldqUNnDbdaMLiOG7',
  notes: 'fldCXyBGZZ7FRoGlH',
}
const CONTACT_FIELDS = {
  name: 'fldk4y17EwoT6CbUD',
  company: 'fldofVTGheypzdQBa',
  email: 'fldSVxzGrvW2H0x0u',
  phone: 'fldDYCpYwhQfcjEcg',
  country: 'fldVhjWzdjZjSCUC9',
  role: 'fldJ3yaDK0TfoM05N',
  status: 'fld0Yhy3USPHASI4V',
  source: 'fldbu1YweKjw1vX5y',
}
const QUOTE_FIELDS = {
  quote: 'fldJJydiVmzTRvnXl',
  company: 'fldkZHQ8PQin2ZcRI',
  name: 'fldgu8m83xPmZVyWB',
  email: 'fldYdegT3OhOHYJSa',
  interest: 'fldFYcwwTDS0JSkrr',
  requirement: 'fld8EafEY3MDewKl8',
  stage: 'fldUcEWkAjgL4fSam',
  status: 'fld9I5lu5NZuGMwVv',
  source: 'fld2fqTuFKm8izM0S',
}

function text(value, fallback = '') {
  if (typeof value === 'string' && value.trim()) return value.trim()
  if (typeof value === 'number') return String(value)
  if (value && typeof value === 'object' && typeof value.name === 'string') return value.name.trim()
  return fallback
}

function credential(env) {
  const token = env.AIRTABLE_TOKEN || env.AIRTABLE_API_KEY || env.AIRTABLE_PAT
  if (!token || env.AIRTABLE_BASE_ID !== LEADS_BASE_ID) throw new Error('Contact inbox is not configured')
  return token
}

function mapLead(record) {
  const fields = record?.fields || {}
  return {
    id: text(record?.id),
    title: text(fields[FIELDS.title], 'Contact enquiry'),
    name: text(fields[FIELDS.name], 'Unknown contact'),
    company: text(fields[FIELDS.company]),
    email: text(fields[FIELDS.email]),
    phone: text(fields[FIELDS.phone]),
    jobTitle: text(fields[FIELDS.jobTitle]),
    country: text(fields[FIELDS.country]),
    interest: text(fields[FIELDS.interest], 'Other'),
    message: text(fields[FIELDS.message]),
    stage: text(fields[FIELDS.stage]),
    source: text(fields[FIELDS.source], '/contact'),
    status: text(fields[FIELDS.status], 'New'),
    createdAt: text(fields[FIELDS.createdAt]),
    priority: text(fields[FIELDS.priority], 'Normal'),
    readStatus: text(fields[FIELDS.readStatus], 'Unread'),
    conversionStatus: text(fields[FIELDS.conversionStatus], 'Not Converted'),
    landingPage: text(fields[FIELDS.landingPage], '/contact'),
    lastTouchPage: text(fields[FIELDS.lastTouchPage]),
    sourceMedium: text(fields[FIELDS.sourceMedium], '(unknown)'),
    utmCampaign: text(fields[FIELDS.utmCampaign]),
    kpiExclude: fields[FIELDS.kpiExclude] === true,
    accountLinks: Array.isArray(fields[FIELDS.accountLink]) ? fields[FIELDS.accountLink] : [],
    contactLinks: Array.isArray(fields[FIELDS.contactLink]) ? fields[FIELDS.contactLink] : [],
    quoteLinks: Array.isArray(fields[FIELDS.quoteLink]) ? fields[FIELDS.quoteLink] : [],
  }
}

async function request(url, options, env, fetchImpl) {
  const token = credential(env)
  return fetchImpl(url, {
    ...options,
    headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json', ...(options?.headers || {}) },
    cache: 'no-store',
    signal: AbortSignal.timeout(10000),
  })
}

export async function fetchContactLeads({ env = process.env, fetchImpl = fetch, limit = 100 } = {}) {
  credential(env)
  const safeLimit = Math.max(1, Math.min(Number(limit) || 100, 100))
  const params = new URLSearchParams({
    maxRecords: String(safeLimit),
    pageSize: String(safeLimit),
    returnFieldsByFieldId: 'true',
    'sort[0][field]': FIELDS.createdAt,
    'sort[0][direction]': 'desc',
  })
  for (const field of Object.values(FIELDS)) params.append('fields[]', field)

  const response = await request(
    'https://api.airtable.com/v0/' + LEADS_BASE_ID + '/' + LEADS_TABLE_ID + '?' + params,
    { headers: {} },
    env,
    fetchImpl,
  )
  if (!response.ok) throw new Error('Contact inbox request failed (' + response.status + ')')
  const payload = await response.json()
  return (Array.isArray(payload.records) ? payload.records : []).map(mapLead)
}

async function fetchLead(recordId, { env, fetchImpl }) {
  const response = await request(
    'https://api.airtable.com/v0/' + LEADS_BASE_ID + '/' + LEADS_TABLE_ID + '/' + recordId + '?returnFieldsByFieldId=true',
    { headers: {} },
    env,
    fetchImpl,
  )
  if (!response.ok) throw new Error('Contact lead could not be loaded')
  return mapLead(await response.json())
}

export async function updateContactLead(recordId, patch, { env = process.env, fetchImpl = fetch } = {}) {
  if (!/^rec[A-Za-z0-9]{14}$/.test(String(recordId || ''))) throw new Error('Invalid contact lead')
  const fields = {}
  if (patch.readStatus && ['Unread', 'Read'].includes(patch.readStatus)) fields[FIELDS.readStatus] = patch.readStatus
  if (patch.priority && ['Urgent', 'High', 'Normal', 'Low'].includes(patch.priority)) fields[FIELDS.priority] = patch.priority
  if (patch.status && ['New', 'Qualified', 'In Discussion', 'Closed / Not Fit'].includes(patch.status)) fields[FIELDS.status] = patch.status
  if (!Object.keys(fields).length) return false

  const response = await request(
    'https://api.airtable.com/v0/' + LEADS_BASE_ID + '/' + LEADS_TABLE_ID + '/' + recordId,
    { method: 'PATCH', body: JSON.stringify({ fields, typecast: false }) },
    env,
    fetchImpl,
  )
  return response.ok
}

async function createDestination(tableId, fields, { env, fetchImpl }) {
  const response = await request(
    'https://api.airtable.com/v0/' + LEADS_BASE_ID + '/' + tableId,
    { method: 'POST', body: JSON.stringify({ fields, typecast: false }) },
    env,
    fetchImpl,
  )
  if (!response.ok) throw new Error('CRM conversion write failed')
  const created = await response.json()
  if (!/^rec[A-Za-z0-9]{14}$/.test(created?.id || '')) throw new Error('CRM conversion was not confirmed')
  return created.id
}

export async function convertContactLead(recordId, target, { env = process.env, fetchImpl = fetch, now = () => new Date() } = {}) {
  if (!/^rec[A-Za-z0-9]{14}$/.test(String(recordId || ''))) throw new Error('Invalid contact lead')
  if (!['account', 'contact', 'quote'].includes(target)) throw new Error('Unsupported conversion target')

  const lead = await fetchLead(recordId, { env, fetchImpl })
  const existing = target === 'account' ? lead.accountLinks : target === 'contact' ? lead.contactLinks : lead.quoteLinks
  if (existing.length) return { created: false, id: existing[0] }

  const source = '/contact · lead ' + recordId
  let createdId
  let linkField
  let status

  if (target === 'account') {
    createdId = await createDestination(ACCOUNT_TABLE_ID, {
      [ACCOUNT_FIELDS.name]: lead.company || lead.name,
      [ACCOUNT_FIELDS.country]: lead.country,
      [ACCOUNT_FIELDS.status]: 'Prospect',
      [ACCOUNT_FIELDS.source]: source,
      [ACCOUNT_FIELDS.notes]: [lead.interest, lead.stage, lead.message].filter(Boolean).join('\n'),
    }, { env, fetchImpl })
    linkField = FIELDS.accountLink
    status = 'Account Created'
  } else if (target === 'contact') {
    createdId = await createDestination(CONTACT_TABLE_ID, {
      [CONTACT_FIELDS.name]: lead.name,
      [CONTACT_FIELDS.company]: lead.company,
      [CONTACT_FIELDS.email]: lead.email,
      [CONTACT_FIELDS.phone]: lead.phone,
      [CONTACT_FIELDS.country]: lead.country,
      [CONTACT_FIELDS.role]: lead.jobTitle || 'Commercial contact',
      [CONTACT_FIELDS.status]: 'Prospect',
      [CONTACT_FIELDS.source]: source,
    }, { env, fetchImpl })
    linkField = FIELDS.contactLink
    status = 'Contact Created'
  } else {
    createdId = await createDestination(QUOTE_TABLE_ID, {
      [QUOTE_FIELDS.quote]: 'Draft — ' + (lead.company || lead.name) + ' — ' + now().toISOString().slice(0, 10),
      [QUOTE_FIELDS.company]: lead.company,
      [QUOTE_FIELDS.name]: lead.name,
      [QUOTE_FIELDS.email]: lead.email,
      [QUOTE_FIELDS.interest]: lead.interest,
      [QUOTE_FIELDS.requirement]: lead.message,
      [QUOTE_FIELDS.stage]: lead.stage,
      [QUOTE_FIELDS.status]: 'Draft',
      [QUOTE_FIELDS.source]: source,
    }, { env, fetchImpl })
    linkField = FIELDS.quoteLink
    status = 'Quote Created'
  }

  const next = {
    account: target === 'account' ? [createdId] : lead.accountLinks,
    contact: target === 'contact' ? [createdId] : lead.contactLinks,
    quote: target === 'quote' ? [createdId] : lead.quoteLinks,
  }
  if (next.account.length && next.contact.length && next.quote.length) status = 'Fully Converted'

  const response = await request(
    'https://api.airtable.com/v0/' + LEADS_BASE_ID + '/' + LEADS_TABLE_ID + '/' + recordId,
    {
      method: 'PATCH',
      body: JSON.stringify({
        fields: {
          [linkField]: [createdId],
          [FIELDS.readStatus]: 'Read',
          [FIELDS.status]: 'Qualified',
          [FIELDS.conversionStatus]: status,
        },
        typecast: false,
      }),
    },
    env,
    fetchImpl,
  )
  if (!response.ok) throw new Error('Lead conversion link could not be saved')
  return { created: true, id: createdId }
}
