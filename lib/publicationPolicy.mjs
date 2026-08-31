const NON_INDEXABLE_GATES = new Set([
  'do not publish',
  'blocked duplicate',
  'rewrite required',
])

function asGateName(value) {
  if (typeof value === 'string') return value
  if (value && typeof value === 'object' && typeof value.name === 'string') return value.name
  return ''
}

function normalizeGate(value) {
  return asGateName(value)
    .toLowerCase()
    .replace(/[—–-]/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ')
}

export function getSeoGate(fields = {}) {
  return asGateName(fields.SEO_Gate ?? fields['SEO Gate'] ?? fields.seo_gate ?? fields.seoGate ?? '')
}

export function isIndexableBySeoGate(fields = {}) {
  const gate = normalizeGate(getSeoGate(fields))
  if (!gate) return true
  return !NON_INDEXABLE_GATES.has(gate)
}
