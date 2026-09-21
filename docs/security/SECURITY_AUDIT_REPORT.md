# Vibe Coding Security Audit

**Audit date:** 2026-09-21  
**Repository baseline:** `origin/main` at `9f52edc58f0986cac50b27b17a9980400790609f`  
**Remediation branch:** `codex/vibe-security-audit`  
**Repository visibility:** Public (verified through GitHub API)  
**Production status:** No production credentials were read or changed; no merge or deployment was performed. The fixes in this report are on the remediation branch until the owner reviews and releases them.

## Executive summary

The baseline contained a Next.js version covered by a Critical upstream image-optimizer RCE advisory, a high npm advisory in a transitive dependency, a CMS-controlled JSON-LD script serialization risk, and an on-demand revalidation endpoint that accepted its shared secret in a GET query string. The remediation branch upgrades Next.js and vulnerable transitive packages, removes GET/query-string authentication, validates revalidation slugs, and safely serializes CMS-backed JSON-LD.

Automated checks were added for pull requests and the main branch: CodeQL, Gitleaks, Semgrep, npm audit, dependency review, and a scheduled passive ZAP baseline. Dependabot vulnerability alerts and automated security-fix PRs are enabled in GitHub; Secret Scanning and push protection were already enabled. The new workflows and Dependabot schedule begin from the default branch after the owner integrates this PR.

The audit also confirmed a password hash in public Git history from a removed client-side admin gate. The value is intentionally omitted here. It is unknown whether the associated password was ever active or reused; the owner should rotate it immediately anywhere it may still be used. Removing the old file did not remove the historical commit.

This report does not claim that the system is absolutely secure. Airtable rows, Vercel production environment values, production deployment SHA, and production behavior were not inspected. ZAP could not run locally because the Docker daemon was unavailable; the scheduled GitHub workflow will provide future passive scans after integration.

The deep source review in this task was AI-assisted and evidence-checked against CodeQL, Semgrep, Gitleaks, and npm audit. A separate Codex Security plugin is not present in the active toolset, so no plugin-specific assessment was run.

## Scope, assets, and trust boundaries

| Asset | Location / boundary | Data or security role |
|---|---|---|
| Public website and image optimization | Next.js App Router; `next.config.mjs` | Public pages, server-rendered output, and the `/_next/image` optimizer. |
| Editorial CMS | `lib/airtable.ts` | Server-side Airtable token and base identifier; public article list and article detail content. Airtable records are not exposed for this audit. |
| Contact lead intake | `app/(site)/contact/action.ts`, `lib/contact-lead-delivery.mjs` | Publicly submitted name, email, enquiry type, and message are written to Airtable using server-side credentials. |
| On-demand revalidation | `app/api/revalidate/route.ts` | Shared `REVALIDATE_SECRET` permits invalidating blog and sitemap cache paths. |
| GitHub CI/CD | `.github/workflows`, GitHub Actions tokens | Code/dependency scanners and existing production release safeguards. |
| Hosting and environment variables | Vercel / runtime configuration | Airtable and revalidation credentials; values were not read. The deployed production commit was not verified. |

**Data flow:** anonymous visitor → public Next.js page or contact Server Action → server-side Airtable API; authorized CMS editor → Airtable content tables → public article renderer; Airtable automation → authenticated revalidation POST → Next.js cache. GitHub pull requests → read-only security workflows → scan results. A hosting/release operator remains responsible for integrating and deploying reviewed changes.

Threat actors considered: unauthenticated site visitors, abusive form submitters, a compromised or low-privilege CMS editor, compromised dependency/action publishers, GitHub contributors, and an operator with access to deployment settings. The repository contains no direct SQL client or SQL database configuration; Airtable is the primary data service.

## Confirmed vulnerabilities

### S-01 — Vulnerable Next.js image optimizer dependency

- **Severity:** Critical (upstream advisory CVSS 9.5)
- **OWASP:** A03 Software Supply Chain Failures; A02 Security Misconfiguration
- **Baseline evidence:** `package-lock.json` resolved `next` to `16.2.4`, below the fixed `16.3.3`; [Next.js advisory GHSA-2xp9-vwfh-vxw4](https://github.com/vercel/next.js/security/advisories/GHSA-2xp9-vwfh-vxw4) covers versions below `16.3.3` and describes RCE when AVIF files are optimized. `next.config.mjs:3-5` enables AVIF output. No AVIF file is currently tracked in the repository, and the exact production optimizer host/source acceptance path was not verified, so exploit preconditions on the live deployment are not asserted as proven.
- **Exploit condition and impact:** an attacker must reach a vulnerable Next.js image-optimization runtime and cause it to optimize a crafted AVIF input. If those conditions hold, the upstream advisory describes unauthenticated remote code execution and possible confidentiality, integrity, and availability impact.
- **Remediation:** `package.json` and `package-lock.json` now require/resolve Next.js `16.3.3`. `npm audit` reports no remaining advisories.
- **Regression verification:** npm audit; CodeQL and the new CI workflow; keep Next.js at or above the patched line.
- **Release block:** **Yes** for any deployment built from the vulnerable baseline. This branch alone does not patch an already deployed build; owner integration and release are still required.

### S-02 — High and moderate vulnerable transitive packages

- **Severity:** High (plus moderate/low advisories in the same audit result)
- **OWASP:** A03 Software Supply Chain Failures
- **Affected location:** baseline `package-lock.json` resolutions for `browserslist`, `baseline-browser-mapping`, and `postcss-selector-parser`.
- **Evidence:** baseline `npm audit --audit-level=high` reported one High, one Moderate, and one Low vulnerability. The High [Browserslist advisory](https://github.com/advisories/GHSA-c83g-rgw3-j3cx) affected versions through `4.28.6`; the lockfile also contained advisories for [baseline-browser-mapping](https://github.com/advisories/GHSA-w5vr-8v7q-w6rv) and [postcss-selector-parser](https://github.com/advisories/GHSA-w9m9-85wc-3x92). `npm audit fix --ignore-scripts` updated seven lockfile package resolutions without running package install scripts.
- **Exploit condition and impact:** exploitation depends on a vulnerable library path receiving the advisory's malformed or untrusted input. No attacker-controlled build input was confirmed in this application, but deploying with the reported vulnerable versions would retain avoidable supply-chain exposure.
- **Remediation:** updated the lockfile; current versions include Browserslist `4.29.0`, baseline-browser-mapping `2.11.25`, and postcss-selector-parser `6.1.4`.
- **Regression verification:** a fresh `npm audit --audit-level=high` returned `found 0 vulnerabilities`; Dependabot and npm audit CI were added.
- **Release block:** **Yes** until the vulnerable dependency graph is replaced for any release from the baseline. The remediation branch is clear per npm audit.

### S-03 — CMS-controlled JSON-LD was inserted without HTML-safe serialization

- **Severity:** Medium
- **OWASP:** A05 Injection
- **Affected location:** baseline `app/(site)/blog/[slug]/page.tsx:596-597` (article and breadcrumb JSON-LD built from Airtable fields).
- **Evidence:** `JSON.stringify()` does not escape `<`; the result was passed to `dangerouslySetInnerHTML`. If a person able to edit an Airtable article field, or an attacker with that account, supplied a script-closing sequence, a browser could end the JSON-LD script element and parse injected markup. The CSP also permits inline scripts (`next.config.mjs:18`), reducing defense in depth.
- **Exploit condition and impact:** requires write access to a record that the public article renderer serves, or compromise of the CMS/editor account. The result could execute script in a visitor's site origin.
- **Remediation:** added `lib/json-ld-serialization.mjs` and use it for the Airtable-backed article and breadcrumb schemas. It escapes `<`, `>`, `&`, U+2028, and U+2029 before script insertion.
- **Regression verification:** `tests/security-hardening.test.mjs` verifies the serialized value round-trips as JSON and contains no raw HTML angle brackets; Semgrep and CodeQL were rerun.
- **Release block:** **Yes** before releasing the vulnerable implementation; fixed on the remediation branch.

### S-04 — Revalidation secret accepted in a GET query string

- **Severity:** Medium
- **OWASP:** A04 Cryptographic Failures; A07 Authentication Failures
- **Affected location:** baseline `app/api/revalidate/route.ts` accepted `GET ?secret=...`; its comments also documented query-string use.
- **Evidence:** the route read `secret` from `URL.searchParams` and compared it with `REVALIDATE_SECRET`. URL secrets can be retained in browser history, proxy/request logs, and referrer data. Whether an external caller actually used GET is unknown; the repository's Airtable setup comment documents POST.
- **Exploit condition and impact:** any caller using the GET form risks disclosing the shared secret to systems that retain URLs. A disclosed secret allows an unauthenticated party to invalidate blog and sitemap paths.
- **Remediation:** removed the GET handler and query-string fallback; the endpoint now accepts the existing POST JSON format only. Added strict slug type, character, and length validation before calling `revalidatePath`.
- **Regression verification:** security-hardening tests cover authenticated and unauthenticated payloads, accepted/rejected slugs, and the absence of a GET handler/query-secret reader.
- **Release block:** **Conditional.** Confirm there are no existing GET-based callers before release; the documented Airtable automation uses POST and remains compatible. If a GET caller exists, convert it to POST first. If the secret was sent via GET, rotate it through the owner-controlled Vercel/Airtable settings before release.

## Confirmed exposure and pending risks

### R-01 — Password hash in public Git history from removed client-side admin gate

- **Severity:** High if the password remains active or was reused; otherwise Medium historical exposure
- **OWASP:** A04 Cryptographic Failures; A07 Authentication Failures
- **Affected location:** historical `app/admin/AdminPasswordGate.tsx:5`, commit `689d2d5b2fbe24d2735eabc24faf2a3c51f2dc96` (ancestor of the audited public branch). Current `main` no longer contains this component.
- **Evidence:** Gitleaks scanned 1,027 commits and reported a generic secret at this line. Manual inspection, with the value redacted, confirmed it was a SHA-256 digest used by a browser-side password gate. The component compared the digest in client code and stored an unlock flag in `sessionStorage`; this was not server-side authorization. The repository is public, so the historical digest is publicly readable. The digest itself is not reproduced in this report.
- **Exploit condition and impact:** an attacker can attempt offline password guesses against the public digest. If that password is reused elsewhere, the other account or system could be compromised. No active account, production route, or password reuse was verified.
- **Required action:** owner should immediately rotate the associated password anywhere it may still be active or reused, and verify that no production admin/data access relies on the old client-side gate. Removing the file did not remove the public history. Rewriting public Git history is not part of this task and requires a separate owner-approved plan.
- **Regression verification:** repeat full-history Gitleaks after credential handling; current working-tree scan is clean.
- **Release block:** **Conditional.** Block if the password is still active/reused or the old gate protects a live system; otherwise record the owner verification.

### R-02 — Public Airtable tables are served without a publication-status check

- **Severity:** Medium, conditional on data stored in the tables
- **OWASP:** A01 Broken Access Control; A06 Insecure Design
- **Affected location:** `lib/airtable.ts:26-46, 363-365, 437-483`.
- **Evidence:** public list and slug-detail functions query the configured content tables without filtering on a publication status. The repository comments/tests intentionally preserve the full public corpus, including statusless historical records. Airtable data and its access controls were not inspected, so no private or draft record exposure is confirmed.
- **Exploit condition and impact:** if a draft, embargoed, personal, or otherwise private record with a public slug is placed in either configured table, a visitor may be able to retrieve its public fields or detail content.
- **Recommended remediation:** keep only publishable material in these public-corpus tables, or use an explicit publication/access field and add a regression test after the content owner confirms which historical rows must remain public.
- **Regression verification:** add a data-policy test using representative published, draft, and statusless records once the owner confirms the intended publication rule.
- **Release block:** **No finding-based block** while these tables are verified as public-only; block publication of sensitive/draft records until that verification is complete.

### R-03 — Public contact intake has no application-level rate limit

- **Severity:** Medium
- **OWASP:** A06 Insecure Design; A10 Mishandling of Exceptional Conditions
- **Affected location:** `app/(site)/contact/action.ts:6-31, 39-55` and `lib/contact-lead-delivery.mjs`.
- **Evidence:** the Server Action validates fields and Airtable persistence but has no application-level request rate limit or bot control. Name and message are bounded; email has no explicit length bound. No abuse traffic or Airtable quota impact was observed.
- **Exploit condition and impact:** an unauthenticated attacker able to call the public Server Action repeatedly could create spam lead records and consume Airtable capacity. Next/Vercel request limits and firewall rules were not inspected.
- **Recommended remediation:** add a distributed rate limit or Vercel Firewall/WAF rule, then test burst limits, expected legitimate submissions, and a clear retry response. Do not rely solely on in-process memory in serverless instances.
- **Release block:** **No** based on evidence collected; monitor form abuse and prioritize before substantial public traffic or quota pressure.

### R-04 — Content Security Policy allows inline scripts

- **Severity:** Low (defense-in-depth gap)
- **OWASP:** A02 Security Misconfiguration
- **Affected location:** `next.config.mjs:12-22`.
- **Evidence:** the site sets CSP, HSTS, frame, MIME, referrer, and permissions headers; production `script-src` includes `'unsafe-inline'`. This is not a standalone vulnerability, but weakens CSP's ability to contain an HTML/script injection.
- **Recommended remediation:** plan a nonce-based CSP compatible with Next.js and required analytics. Validate rendered pages, metadata JSON-LD, analytics, and caching before tightening policy.
- **Release block:** **No** based on this audit.

### R-05 — Semgrep unsafe-HTML pattern was not exploitable in current call sites; replaced defensively

- **Severity:** Medium pattern risk; not a confirmed vulnerability
- **Affected location:** baseline `app/(site)/solutions/equipment-service/page.tsx:68-89`.
- **Evidence:** Semgrep reported a `dangerouslySetInnerHTML` sink. Manual review found that the current function was called only with static page literals and its link destinations came from a fixed map; no untrusted data flow was found. The pattern would be unsafe if callers later passed CMS/user text.
- **Remediation:** replaced string-to-HTML construction with React text nodes and fixed internal links.
- **Regression verification:** test asserts the renderer splits text into React nodes and contains no `dangerouslySetInnerHTML`; Semgrep final scan returned zero findings.
- **Release block:** **No**, now mitigated on the branch.

## OWASP Top 10:2025 coverage

The categories below follow [OWASP Top 10:2025](https://top10.owasp.org/2025/0x00_2025-Introduction/). “No finding” means no issue was confirmed in the reviewed scope, not that no issue exists.

| Category | Audit result |
|---|---|
| A01 Broken Access Control | R-02 is pending verification against actual Airtable table contents. No current admin route or private authenticated user area was found in the audited source. |
| A02 Security Misconfiguration | R-04: inline-script CSP weakens defense in depth. Core security headers are present. |
| A03 Software Supply Chain Failures | S-01 and S-02 were confirmed at baseline and fixed on this branch; Dependabot and CI checks added. |
| A04 Cryptographic Failures | S-04 query-secret exposure fixed; R-01 historical SHA-256 password digest requires owner validation/possible rotation. No production secret values were inspected. |
| A05 Injection | S-03 JSON-LD injection fixed; R-05 unsafe HTML pattern replaced. No SQL database or SQL query path was found. |
| A06 Insecure Design | R-02 public-table data policy and R-03 form abuse control need owner/platform verification. |
| A07 Authentication Failures | No current site account flow was found. Revalidation uses a shared secret; R-01 is a removed browser-only gate in history. |
| A08 Software or Data Integrity Failures | New GitHub workflows pin action commits and use read-only permissions except CodeQL result upload. Existing production release guard remains in place. |
| A09 Security Logging & Alerting Failures | Contact error handling avoids logging submitted PII or API tokens. GitHub scanners now report in Actions; external runtime alerting was not inspected. |
| A10 Mishandling of Exceptional Conditions | Contact delivery fails closed on failed Airtable writes; revalidation rejects malformed JSON/credentials/slugs. No additional confirmed issue found in reviewed paths. |

## Scanner results and test status

| Check | Result |
|---|---|
| Gitleaks current tracked files | 0 findings after annotating the Airtable Base ID test fixture as a known non-secret identifier; no current API credential was detected. |
| Gitleaks full Git history | 11 alerts across 1,027 commits: 10 were Airtable base/table identifiers (not credentials); 1 was R-01. No secret values are included in this report. |
| npm audit | Baseline: 1 High, 1 Moderate, 1 Low. After lockfile remediation: 0 vulnerabilities. |
| Semgrep Community rules | Final: 121 rules evaluated across 151 tracked files; 0 findings. Earlier findings were the fixed Dependabot cooldown rule and the reviewed/fixed unsafe-HTML pattern. |
| CodeQL security-extended | 105 queries; 134/134 JavaScript/TypeScript files and 5/5 GitHub workflow files scanned. Two low-signal missing-regexp-anchor alerts were confined to test assertions in `tests/occ-research-positioning.test.mjs:79-80`; no production-code alert was returned. |
| Security regression tests | 10 passed, 0 failed. |
| Release-governance tests | 21 passed, 0 failed. |
| TypeScript | `npx tsc --noEmit` passed. |
| YAML and whitespace | All workflow/Dependabot YAML parsed; `git diff --check` passed. |
| Entire existing test suite | 170 passed, 16 failed, 3 skipped. The unmodified baseline at `9f52edc` also had the same 16 failing About/navigation/content/layout assertions (165 passed, 16 failed, 3 skipped); the five added security tests pass. These failures predate this branch and are not security-test failures. |
| OWASP ZAP Baseline | Not run locally: Docker is installed but its daemon is unavailable. A weekly passive ZAP Baseline workflow is configured for `https://origincafekh.com`; it will run after the workflow is present on the default branch or manually dispatched. No active scan was run. |

## GitHub automation and owner actions

- Added CodeQL on pull requests, `main` and `codex/**` pushes, weekly schedule, and manual dispatch; uses `security-extended` queries.
- Added Gitleaks on pull requests, `main` and `codex/**` pushes, weekly schedule, and manual dispatch; current files and changed commit ranges are scanned with redaction.
- Added Semgrep security-audit/OWASP rules and `npm audit --audit-level=high` on pull requests and `main`/`codex/**` pushes.
- Added dependency review for pull requests; high/critical dependency changes fail that job.
- Added a passive weekly/manual ZAP Baseline job; it does not write issues and does not deploy.
- Added weekly Dependabot updates for npm and GitHub Actions, with a seven-day cooldown for normal version updates; security updates are not delayed by that cooldown.
- Updated existing governance workflow actions to immutable commits. New workflows use least-privilege permissions.
- Enabled GitHub Dependabot alerts and automated security-fix PRs. GitHub reports Secret Scanning and push protection are already enabled. Non-provider pattern scanning remains disabled; Gitleaks in CI scans repository files and changed history.
- GitHub currently reports that `main` has no branch-protection rule. Security workflows will run on `codex/**` pushes and pull requests, but GitHub will not require passing results or a PR before updating `main`. Branch-protection settings were not changed because the release procedure must be aligned first. After reviewing the PR and its workflow runs, the owner should require CodeQL, Gitleaks, Semgrep, npm audit, dependency review, and existing governance checks without blocking the designated release task.
- Before any production release, verify whether the old revalidation GET form was used, whether the historical password is active/reused, and that public Airtable tables contain only publishable records. No production credentials or deployment were changed here.

## Limits

This is a repository and source-level audit, not proof of absolute security. The audit did not access Vercel environment variables, Airtable records, production deployment metadata, live authenticated flows, Vercel firewall configuration, or GitHub branch protection. The ZAP production baseline has not yet run. Findings in those areas remain unverified until the owner checks the relevant systems.
