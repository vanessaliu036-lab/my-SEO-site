/**
 * Validate the shared-secret request body for the on-demand revalidation endpoint.
 * @param {unknown} body
 * @param {string | undefined} expectedSecret
 * @returns {{ ok: true, slug: string } | { ok: false, status: 400 | 401 }}
 */
export function validateRevalidationPayload(body, expectedSecret) {
  if (!expectedSecret || !body || typeof body !== 'object' || Array.isArray(body)) {
    return { ok: false, status: 401 }
  }

  const payload = /** @type {{ secret?: unknown, slug?: unknown }} */ (body)
  if (typeof payload.secret !== 'string' || payload.secret.length === 0 || payload.secret !== expectedSecret) {
    return { ok: false, status: 401 }
  }

  if (payload.slug === undefined || payload.slug === '') return { ok: true, slug: '' }
  if (typeof payload.slug !== 'string') return { ok: false, status: 400 }

  const slug = payload.slug.trim()
  if (!slug) return { ok: true, slug: '' }
  if (slug.length > 200 || !/^[a-z0-9]+(?:[-_][a-z0-9]+)*$/i.test(slug)) {
    return { ok: false, status: 400 }
  }

  return { ok: true, slug }
}
