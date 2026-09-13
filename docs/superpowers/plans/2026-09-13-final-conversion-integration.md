# OCC Final Conversion Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate the approved OCC conversion pre-flight into the latest main without regressing the newer Origins, Farm & Terroir, Coffee Marketing, logo/footer, or commercial-page work.

**Architecture:** Start from the latest production-aligned main commit and selectively replay only approved conversion changes. Current main is authoritative for Origins navigation/content and Coffee Marketing; PR #44 is authoritative for Contact lead capture, Roasted Coffee Supply, Distribution conversion, Original Commercial Trust Gateway, mobile conversion CTA, and requirement-led commercial routing. Every integration step is guarded by regression tests and a final diff against the current main baseline.

**Tech Stack:** Next.js 16, React 19, TypeScript, Zod, React Hook Form, Airtable REST API, Vercel, Node test runner.

**Spec:** `docs/superpowers/plans/2026-09-13-occ-conversion-preflight.md` plus the approved 2026-09-13 Origins/Commercial architecture now present on `main`.

## Global Constraints

- Never merge an integration branch that is behind current `main`.
- Preserve current `ORIGINS` navigation and its children: Cambodia & Regions / Farm & Terroir / Fine Robusta Cambodia.
- Preserve `/solutions/coffee-marketing` as the Cambodia-local marketing page; do not let PR #44 delete or repurpose it.
- International commercial paths: Wholesale & Sourcing, Roasted Coffee Supply, Roasting Program, Distribution Partnership.
- `/origins/single-origin` permanently redirects to `/origins` and must not appear in navigation, sitemap, or new internal links.
- Equipment Service stays retired from public navigation/sitemap and redirects to `/solutions`.
- Contact must only display success after an Airtable `OCC_B2B_Leads` write succeeds.
- About copy must use customer-facing brand language; never expose internal phrases such as `Authority wedge`.
- Official frontend/schema logo must resolve to one valid OCC logo asset; no broken image response and no schema fallback to `apple-icon.png`.
- Do not modify unrelated blog corpus, SEO owners, Fine Robusta owner route, or current Farm/Origins content except explicit stale-route/copy corrections.

---

### Task 1: Add final integration regression gates

**Files:**
- Modify: `tests/occ-conversion-preflight.test.mjs`
- Modify: `tests/occ-navigation-regression.test.mjs`
- Modify: `tests/production-deploy-safety.test.mjs`

**Interfaces:**
- Consumes: current main route/config files.
- Produces: tests that fail if approved current-main architecture is replaced by PR #44 legacy navigation or stale routes.

- [ ] Add assertions for ORIGINS top-level navigation and three current children.
- [ ] Assert `/origins/single-origin` and `/solutions/equipment-service` are absent from sitemap.
- [ ] Assert `/origins/cambodia-regions` and `/solutions/roasted-coffee-supply` are present in sitemap.
- [ ] Assert Contact schema contains Company, Work Email, Country / Market, four commercial service paths, Project / Requirement, and optional Project Stage.
- [ ] Assert About template does not expose `Authority wedge`.
- [ ] Run `npm test` and confirm the new assertions fail before implementation.

### Task 2: Integrate Contact commercial entry point and real lead capture

**Files:**
- Modify: `app/(site)/contact/ContactForm.tsx`
- Modify: `app/(site)/contact/action.ts`
- Modify: `app/(site)/contact/page.tsx`

**Interfaces:**
- Consumes: existing Airtable environment names `AIRTABLE_API_KEY || AIRTABLE_PAT || AIRTABLE_TOKEN`, `AIRTABLE_BASE_ID`.
- Produces: `submitContactForm(data): Promise<{success:true}|{success:false,error:string}>` that writes `OCC_B2B_Leads` before returning success.

- [ ] Replay PR #44 Contact field/schema changes onto current main.
- [ ] Preserve generate_lead only after server action success.
- [ ] Keep services exactly: Wholesale & Sourcing / Roasted Coffee Supply / Roasting Program / Distribution Partnership / Other.
- [ ] Update Contact metadata to the final four-path architecture.
- [ ] Run Contact/conversion tests.

### Task 3: Integrate commercial conversion routes without replacing current local-market work

**Files:**
- Create: `app/(site)/solutions/roasted-coffee-supply/page.tsx`
- Modify: `app/(site)/solutions/page.tsx`
- Modify: `app/(site)/solutions/wholesale/page.tsx`
- Modify: `app/(site)/solutions/roasting-program/page.tsx`
- Modify: `app/(site)/distribution/page.tsx`
- Create/Modify: `app/(site)/original/page.tsx`
- Modify: `components/templates/solutions-index-template.tsx`
- Modify: `components/site/mobile-conversion-cta.tsx`
- Modify: `components/site/site-shell.tsx`

**Interfaces:**
- Consumes: current main Wholesale/Roasting content and current `/solutions/coffee-marketing`.
- Produces: four international commercial paths while preserving Coffee Marketing as a local Cambodia page.

- [ ] Add Roasted Coffee Supply from PR #44.
- [ ] Reconcile Wholesale requirement-led conversion structure with the newer current-main buyer-intent content; never replace current-main content wholesale.
- [ ] Reconcile Roasting Program the same way.
- [ ] Keep Coffee Marketing route/content unchanged and available through its approved local-market entry points.
- [ ] Add Distribution commercial CTA and Original Commercial Trust Gateway.
- [ ] Add low-intrusion mobile conversion CTA without changing unrelated page layouts.
- [ ] Run solutions/conversion regression tests.

### Task 4: Preserve final Origins architecture and remove retired-route residue

**Files:**
- Modify: `app/(site)/origins/farm-terroir/page.tsx`
- Modify: `app/(site)/origins/cambodia-regions/page.tsx` if stale Single Origin wording exists.
- Modify: `app/sitemap.ts`
- Modify: `next.config.mjs` and/or `proxy.ts`
- Preserve: `components/site/navigation-data.ts`

**Interfaces:**
- Consumes: current main `/origins` hub and permanent redirect `/origins/single-origin -> /origins`.
- Produces: no user-facing/sitemap/internal-link references to retired Single Origin page.

- [ ] Change Farm & Terroir final handoff from `/origins/single-origin` to `/origins` traceability/lot-identity language.
- [ ] Remove any equivalent stale Single Origin reference in Cambodia & Regions.
- [ ] Sitemap: add `/origins/cambodia-regions`; remove `/origins/single-origin` and `/solutions/equipment-service`; add `/original` and `/solutions/roasted-coffee-supply`.
- [ ] Retain permanent legacy redirects for Single Origin, Barista Staffing, and Equipment Service.
- [ ] Reject PR #44 navigation patch; current main ORIGINS navigation remains authoritative.
- [ ] Run navigation/SEO publishing tests.

### Task 5: Align the entire About family to the final brand/commercial architecture

**Files:**
- Modify: `app/(site)/about/page.tsx`
- Modify: `components/templates/about-editorial-template.tsx`
- Modify: `app/(site)/about/mission/page.tsx`
- Modify: `app/(site)/about/founder/page.tsx`
- Modify: `app/(site)/about/manifesto/page.tsx`
- Modify: `app/(site)/about/sustainability/page.tsx`

**Interfaces:**
- Consumes: OCC positioning: 100% Cambodian origin + Fine Robusta specialist; current four international commercial paths.
- Produces: customer-facing About copy with no internal SEO/strategy jargon.

- [ ] About facts become: `Cambodia / 100% Cambodian Origin`, `Fine Robusta / Core Expertise`, `Commercial Coffee / Supply · Roasting · Market Access`.
- [ ] Hero/Position copy states the two brand pillars before commercial capability.
- [ ] Mission uses origin → quality → buyer logic and the current commercial-path vocabulary.
- [ ] Founder removes generic legacy `B2B sourcing / roasting solutions` phrasing where it misstates current architecture.
- [ ] Manifesto removes `three clear roles` and `Authority`-style internal framing.
- [ ] Sustainability CTA/description points to current commercial solutions without generic obsolete taxonomy.
- [ ] Update About metadata/schema descriptions consistently.
- [ ] Run full tests.

### Task 6: Unify official OCC logo across frontend and structured data

**Files:**
- Replace invalid asset currently served as `public/occ-logo-primary.jpg` with a valid official asset or add a valid official PNG path.
- Modify: `components/site/site-header.tsx`
- Modify: `components/site/site-footer.tsx`
- Modify: `lib/siteConfig.ts` and/or organization schema source.

**Interfaces:**
- Consumes: official Drive master `OCC_Logo_Primary_1x1_Final.png`.
- Produces: one valid logo URL used by Header, Footer, Organization Schema.

- [ ] Confirm current asset failure is reproduced (200 `image/jpeg` with invalid body).
- [ ] Materialize/download the official Drive PNG without redrawing.
- [ ] Add the exact official file to `public/` with a stable web-safe path.
- [ ] Point Header, Footer, and `siteLogoUrl`/Organization Schema to that one path.
- [ ] Verify the asset response is a valid PNG and visual header/footer no longer breaks.

### Task 7: Final verification and merge-safety gate

**Files:**
- No new feature files; verification only.

**Interfaces:**
- Consumes: completed integration branch.
- Produces: GO/BLOCKED release verdict.

- [ ] Run `npm test`.
- [ ] Run `npx tsc --noEmit`.
- [ ] Run `npm run build`.
- [ ] Verify static generation completes.
- [ ] Create/inspect Vercel Preview and smoke-test Contact, About, Origins, Cambodia & Regions, Farm & Terroir, Solutions, Wholesale, Roasting, Roasted Coffee Supply, Coffee Marketing, Distribution, Original.
- [ ] Submit one test Contact lead and verify a new `OCC_B2B_Leads` record exists before UI success.
- [ ] Compare integration branch against the original latest-main baseline; reject any unrelated regression.
- [ ] Re-read current `main` SHA. If main advanced, stop and rebase/replay onto the new main instead of merging the stale branch.
- [ ] Do not merge/deploy production until the final verdict is GO and the user explicitly authorizes production release.
