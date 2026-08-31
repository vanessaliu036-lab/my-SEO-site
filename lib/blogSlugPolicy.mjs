export function canonicalBlogSlug(raw = '') {
  let value = String(raw).trim()
  try {
    value = decodeURIComponent(value)
  } catch {
    // Preserve the raw slug if it is not valid URI encoding.
  }

  value = value
    .trim()
    .replace(/^\/+/, '')
    .replace(/^blog\/?/i, '')
    .replace(/^\/+/, '')
    .trim()

  const parts = value.split('/').filter(Boolean)
  return (parts.length ? parts[parts.length - 1] : value).trim().toLowerCase()
}

export function matchesBlogSlug(storedSlug = '', requestedSlug = '') {
  const stored = canonicalBlogSlug(storedSlug)
  const requested = canonicalBlogSlug(requestedSlug)
  return Boolean(stored && requested && stored === requested)
}
