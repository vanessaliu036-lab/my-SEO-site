// Server-only delivery. The website must never report success for a log-only enquiry.
const LEADS_BASE_ID = 'appJCcT41WRfKpWk2'
const LEADS_TABLE_ID = 'tbl7OE9ML6ksQ27qy'

const FIELDS = {
  lead: 'fldvAZ4y6ZEqWbyq5',
  name: 'fldHHRfTCecsvyg5b',
  company: 'fldCkWbuV4lFt5Mbq',
  email: 'fldbLSnIyiApGAw7Q',
  phone: 'fld7D4yMzhagDsac0',
  jobTitle: 'fldgeHRZwYOrG0mf7',
  country: 'fldCEEsTN9XD3ddK4',
  interest: 'fldq91HTSYa3rxLBC',
  requirement: 'fldomWJyClrC2dFH8',
  stage: 'fldsOyCEEoIGPSQPb',
  source: 'fldcUFGqwGNHEQ9SH',
  status: 'fldyfWd2DzMJSUtxB',
  submittedAt: 'fldJTzqH6dFgUtlmy',
  priority: 'flda7ZyX0xciKGhdN',
  readStatus: 'fldZxno6lrUVyq0F1',
  conversionStatus: 'fldRkeLPYNy4eCpeG',
  landingPage: 'fldJHVMy9vt8r4Mwu',
  lastTouchPage: 'fldAvM2AeJ32onisf',
  sourceMedium: 'fldA5l9MZquBNWk5E',
  utmCampaign: 'fldOkPloT4e4CZ2Px',
  kpiExclude: 'fldKEJcmjmG3yUHLs',
}

const leadTypes = {
  'Wholesale / Sourcing': 'Wholesale & Sourcing',
  'Sample Request': 'Wholesale & Sourcing',
  'Lot List': 'Wholesale & Sourcing',
  'Roasting / Solutions': 'Roasting Program',
  'Partnership / Distribution': 'Distribution Partnership',
  'Distribution / Partnership': 'Distribution Partnership',
  'Editorial / Source Correction': 'Other',
  'Media / Interview': 'Other',
  'General Enquiry': 'Other',
  'Other / General': 'Other',
}

function shouldExcludeFromKpi(data) {
  const email = String(data.email || '').trim().toLowerCase()
  const company = String(data.company || '').trim().toLowerCase()
  const sourcePage = String(data.sourcePage || '').trim().toLowerCase()

  return (
    data.kpiExclude === true ||
    email.endsWith('@example.test') ||
    company.startsWith('[test]') ||
    sourcePage.startsWith('/qa/')
  )
}

export async function persistContactLead(data, { env = process.env, fetchImpl = fetch, now = () => new Date() } = {}) {
  const token = env.AIRTABLE_TOKEN || env.AIRTABLE_API_KEY || env.AIRTABLE_PAT
  const baseId = env.AIRTABLE_BASE_ID
  const leadType = leadTypes[data.service]
  if (!token || baseId !== LEADS_BASE_ID || !leadType) return false

  const company = String(data.company || '').trim()
  const name = String(data.name || '').trim()

  const fields = {
    [FIELDS.lead]: company ? `${company} — ${name}` : `${name} — ${data.service}`,
    [FIELDS.name]: name,
    [FIELDS.company]: company,
    [FIELDS.email]: data.email,
    [FIELDS.phone]: data.phone,
    [FIELDS.jobTitle]: data.jobTitle || '',
    [FIELDS.country]: data.country,
    [FIELDS.interest]: leadType,
    [FIELDS.requirement]: data.message || '(no project details)',
    [FIELDS.source]: data.sourcePage || '/contact',
    [FIELDS.landingPage]: data.landingPage || '/contact',
    [FIELDS.lastTouchPage]: data.lastTouchPage || '',
    [FIELDS.sourceMedium]: data.sourceMedium || '(unknown)',
    [FIELDS.utmCampaign]: data.utmCampaign || '',
    [FIELDS.kpiExclude]: shouldExcludeFromKpi(data),
    [FIELDS.status]: 'New',
    [FIELDS.submittedAt]: now().toISOString(),
    [FIELDS.priority]: 'Normal',
    [FIELDS.readStatus]: 'Unread',
    [FIELDS.conversionStatus]: 'Not Converted',
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
    return false
  }
}
