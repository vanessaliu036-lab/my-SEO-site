# OCC staff demo — setup and release gate

Scope: retain the historical operations dashboard **for UX review only** and provide a protected, read-only Contact inbox backed by the existing `OCC_B2B_Leads` Airtable table. Do not interpret the operations dashboard amounts, contacts or counts as OCC business data.

## Sign-in

`/admin` and `/admin/leads` use server-side HTTP Basic authentication through the Next.js `proxy.ts` matcher. Configure `OCC_ADMIN_USER` and `OCC_ADMIN_PASSWORD` as encrypted **server-only** environment variables for the selected Vercel environment. The current owner-approved testing policy requires an exact six-character password. The credential must stay in Vercel and the local password manager; do not commit it or paste it into documentation. With either variable absent or the password not exactly six characters, the entire admin returns 503 and no staff content. Invalid credentials return 401 with the browser's sign-in prompt. HTTPS is required. Browser Basic auth may cache credentials; this prototype has no reliable logout/multi-user session management. Add Vercel Firewall rate limiting for `/admin/*`, review access and clear browser credentials if sharing devices.

## Contact inbox

From the site footer use **Staff login** → `/admin`; choose **Contact inbox**. The inbox reads the latest 100 records from `OCC_B2B_Leads` without exposing Airtable credentials to the browser and provides a mailto reply action. The public Contact form remains the only writer.

Successful Contact submissions can also notify `service@origincafekh.com` through Resend. Configure encrypted server-only `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and `CONTACT_NOTIFICATION_EMAIL=service@origincafekh.com`. The sending domain must be verified with the provider. Airtable remains the system of record, so a temporary notification failure never asks the visitor to submit the same enquiry twice.

## Release gate

- Test an unauthenticated request to `/admin` and `/admin/leads`: 401; with unset credentials: 503; valid credentials: 200.
- Verify Contact/Wholesale/other public routes remain unaffected and their forms still submit to the existing Airtable leads table.
- Run `node --test tests/admin-*.test.mjs`, `npm test`, `npx tsc --noEmit`, and the project build/release checks in CI.
- Preview first. Do not merge/deploy production until the owner confirms the credential and firewall configuration and verifies the rest of the active release candidate (including pending security fixes). Production deployment remains owner-controlled.

Separate future work: Cloudflare Turnstile site/secret issuance, server-side verification and distributed rate limits on the public Contact action require their own tested change and platform configuration. The mailbox-dependent SPF/DKIM/DMARC and email syncing remain postponed until the mailbox is active.
