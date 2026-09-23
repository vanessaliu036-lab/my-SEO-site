import { createHash, timingSafeEqual } from 'node:crypto'

function equal(a, b) {
  const left = createHash('sha256').update(a).digest()
  const right = createHash('sha256').update(b).digest()
  return timingSafeEqual(left, right)
}

export function authorizeAdmin(header, credentials) {
  const username = credentials?.username
  const password = credentials?.password
  if (typeof username !== 'string' || !username.trim() || username.includes(':') || typeof password !== 'string' || password.length !== 6) {
    return 'unconfigured'
  }
  if (typeof header !== 'string' || !header.startsWith('Basic ')) return 'unauthorized'
  const encoded = header.slice(6)
  if (encoded.length > 4096 || !/^[A-Za-z0-9+/]+={0,2}$/.test(encoded)) return 'unauthorized'
  const buffer = Buffer.from(encoded, 'base64')
  if (buffer.toString('base64') !== encoded) return 'unauthorized'
  const pair = buffer.toString('utf8')
  const split = pair.indexOf(':')
  if (split < 0) return 'unauthorized'
  const suppliedUsername = pair.slice(0, split)
  const suppliedPassword = pair.slice(split + 1)
  return equal(suppliedUsername, username) && equal(suppliedPassword, password) ? 'authorized' : 'unauthorized'
}
