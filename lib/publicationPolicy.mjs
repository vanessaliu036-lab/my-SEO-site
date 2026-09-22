const NON_INDEXABLE_GATES = new Set([
  'do not publish',
  'blocked duplicate',
  'rewrite required',
])

function asFieldValue(value) {
  if (typeof value === 'string') return value
  if (value && typeof value === 'object') {
    for (const key of ['name', 'value', 'text']) {
      if (typeof value[key] === 'string') return value[key]
    }
  }
  return ''
}

function asGateName(value) {
  return asFieldValue(value)
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

export function getPublicationStatus(fields = {}) {
  return asFieldValue(
    fields.Status ??
      fields.status ??
      fields['Publication Status'] ??
      fields.publication_status ??
      fields.publicationStatus ??
      ''
  )
}

export function isPublishedByStatus(fields = {}) {
  return normalizeGate(getPublicationStatus(fields)) === 'published'
}

export function isIndexableByPublicationPolicy(fields = {}) {
  return isPublishedByStatus(fields) && isIndexableBySeoGate(fields)
}
