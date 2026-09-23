# OCC staff demo — setup and release gate

Scope: restore the historical admin dashboard **for UX review only** and provide an interactive synthetic B2B lead form lab. Do not interpret any dashboard amounts, contacts or counts as OCC business data. This patch does not read or write Airtable, create a mailbox, or configure DNS.

## Sign-in

`/admin` and `/admin/leads` use server-side HTTP Basic authentication through the Next.js `proxy.ts` matcher. Configure `OCC_ADMIN_USER` and `OCC_ADMIN_PASSWORD` as encrypted **server-only** environment variables for the selected Vercel environment. Use a new unique 16+ character password; never reuse the password/hash from the historical removed admin login. Do not set a `NEXT_PUBLIC_` prefix, commit secrets, or paste credentials into chat. With either variable absent or password too short, the entire admin returns 503 and no demo content. Invalid credentials return 401 with the browser's sign-in prompt. HTTPS is required. Browser Basic auth may cache credentials; this prototype has no reliable logout/multi-user session management. Before any production activation, add Vercel Firewall rate limiting for `/admin/*`, review access and clear browser credentials if sharing devices.

## Demo workflow

From the site footer use **Staff login** → `/admin`; choose **B2B lead form lab**. Three synthetic `.test` addresses represent hotel, overseas distributor and café workflows. Choose a sample, edit fields, press **Save sample edits** to update local React state, or **Reset demo data**. Refreshing clears edits. No sample record is created in `OCC_B2B_Leads` and none is sent to analytics or email. The existing public Contact form → Airtable implementation is intentionally untouched.

## Release gate

- Test an unauthenticated request to `/admin` and `/admin/leads`: 401; with unset credentials: 503; valid credentials: 200.
- Verify Contact/Wholesale/other public routes remain unaffected and their forms still submit to the existing Airtable leads table.
- Run `node --test tests/admin-*.test.mjs`, `npm test`, `npx tsc --noEmit`, and the project build/release checks in CI.
- Preview first. Do not merge/deploy production until the owner confirms the credential and firewall configuration and verifies the rest of the active release candidate (including pending security fixes). Production deployment remains owner-controlled.

Separate future work: Cloudflare Turnstile site/secret issuance, server-side verification and distributed rate limits on the public Contact action require their own tested change and platform configuration. The mailbox-dependent SPF/DKIM/DMARC and email syncing remain postponed until the mailbox is active.
