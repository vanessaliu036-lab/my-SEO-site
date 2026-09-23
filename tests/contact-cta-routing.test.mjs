import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const source = (relative) => readFileSync(new URL(`../${relative}`, import.meta.url), 'utf8')

test('commercial discussion CTAs route into the Contact form', () => {
  const origins = source('app/(site)/origins/page.tsx')
  const roasting = source('app/(site)/solutions/roasting-program/page.tsx')
  const finalCta = source('components/site/site-final-cta.tsx')

  assert.match(origins, /href="\/contact"[^>]*>Discuss wholesale supply/)
  assert.match(roasting, /href="\/contact">Discuss Wholesale Supply/)
  assert.doesNotMatch(finalCta, /primaryHref:\s*"(?!\/contact)/)
})

test('Contact publishes the service mailbox and Phnom Penh Telegram channel', () => {
  const form = source('app/(site)/contact/ContactForm.tsx')
  const page = source('app/(site)/contact/page.tsx')
  assert.match(form, /service@origincafekh\.com/)
  assert.match(form, /https:\/\/t\.me\/\+85514360479/)
  assert.match(page, /telephone:\s*"\+85514360479"/)
})

