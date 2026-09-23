import test from 'node:test'
import assert from 'node:assert/strict'

const { authorizeAdmin } = await import('../lib/admin-basic-auth.mjs')
const expected = { username: 'admin', password: 'A7k9Q2' }
const valid = `Basic ${Buffer.from(`${expected.username}:${expected.password}`).toString('base64')}`

test('only a configured valid credential grants admin access', () => {
  assert.equal(authorizeAdmin(valid, expected), 'authorized')
  assert.equal(authorizeAdmin(valid, { username: '', password: '' }), 'unconfigured')
})

test('missing, malformed and incorrect credentials do not authorize', () => {
  for (const header of [null, '', 'Bearer sample', 'Basic !!bad!!', `Basic ${Buffer.from('occ-staff:bad').toString('base64')}`]) {
    assert.equal(authorizeAdmin(header, expected), 'unauthorized')
  }
})

test('admin access requires exactly six password characters', () => {
  assert.equal(authorizeAdmin(valid, { username: 'admin', password: '12345' }), 'unconfigured')
  assert.equal(authorizeAdmin(valid, { username: 'admin', password: '1234567' }), 'unconfigured')
  assert.equal(authorizeAdmin(valid, expected), 'authorized')
})
