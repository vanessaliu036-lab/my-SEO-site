# OCC Responsive Chrome Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a production-safe OCC responsive navigation/footer system that preserves the current polished About desktop layout while making desktop, tablet, and mobile hierarchy deliberate and consistent.

**Architecture:** Keep one canonical `siteNavigation` data source. Desktop header and mobile drawer consume that source directly; footer renders grouped child-navigation plus standalone primary items without demoting the standalone items to utility styling. Preserve the current About template’s responsive split hero and linked four-panel entry grid.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 3, Node `node:test`, Vercel.

**Spec:** `docs/superpowers/specs/2026-09-15-occ-responsive-chrome-design.md`

## Global Constraints
- Primary order: ABOUT → ORIGINS → SOLUTIONS → PARTNERSHIPS → DISTRIBUTION → BLOG → CONTACT.
- No slug, canonical, redirect, SEO owner, or content-copy changes.
- Desktop breakpoint remains `lg` (`>=1024px`) for full horizontal navigation.
- Mobile/tablet use the drawer below `lg`.
- About four visual entry routes remain unchanged.

---

### Task 1: Guard navigation hierarchy and footer treatment

**Files:**
- Modify: `tests/occ-visual-system.test.mjs`
- Modify: `components/site/navigation-data.ts`
- Modify: `components/site/site-footer.tsx`

**Interfaces:**
- Consumes: `siteNavigation: readonly SiteNavItem[]`
- Produces: canonical ordered navigation consumed by header, mobile drawer, and footer.

- [ ] **Step 1: Write failing regression assertions**

Add source-level assertions that the standalone primary order is PARTNERSHIPS, DISTRIBUTION, BLOG, CONTACT and that `site-footer.tsx` does not derive/render them through `utilityItems` with `text-[10px]` utility styling. Assert the footer contains a standalone-primary navigation block using normal readable text sizing.

- [ ] **Step 2: Verify the test fails on the current branch state**

Run: `node --test tests/occ-visual-system.test.mjs`
Expected: FAIL because navigation currently orders BLOG/CONTACT before DISTRIBUTION and footer uses `utilityItems`.

- [ ] **Step 3: Implement minimal navigation/footer correction**

Update `siteNavigation` to:
`ABOUT, ORIGINS, SOLUTIONS, PARTNERSHIPS, DISTRIBUTION, BLOG, CONTACT`.

Replace footer `utilityItems` treatment with a `standaloneItems` primary navigation section. On mobile/tablet it stacks vertically with normal `text-sm`/readable spacing; on desktop it uses a compact multi-column/row layout while retaining primary visual weight. Keep copyright in a separate secondary row.

- [ ] **Step 4: Re-run targeted test**

Run: `node --test tests/occ-visual-system.test.mjs`
Expected: PASS.

### Task 2: Verify responsive chrome and About desktop/mobile contract

**Files:**
- Verify: `components/site/site-header.tsx`
- Verify: `components/site/mobile-menu.tsx`
- Verify: `components/templates/about-editorial-template.tsx`
- Modify if required: `tests/occ-visual-system.test.mjs`

**Interfaces:**
- Header uses full nav at `lg:flex`, drawer button below `lg`.
- About retains split hero and four linked gallery panels.

- [ ] **Step 1: Assert desktop/mobile responsive contract**

Ensure tests check header heights/logo scaling, `lg:flex` desktop nav, `lg:hidden` mobile trigger, About `lg:grid-cols-[0.92fr_1.08fr]`, bounded desktop hero height, and linked gallery panels.

- [ ] **Step 2: Run targeted test**

Run: `node --test tests/occ-visual-system.test.mjs`
Expected: PASS on the polished current main-derived code; if any assertion fails, make only the minimal responsive class correction.

### Task 3: Full verification and production deployment

**Files:**
- No additional product files unless verification exposes a defect.

- [ ] **Step 1: Run full repository test suite**

Run: `npm test`
Expected: all tests pass.

- [ ] **Step 2: Run production build**

Run: `npm run build`
Expected: build exits 0 with production deploy guards passing.

- [ ] **Step 3: Merge branch to `main`**

Fast-forward or merge only after preview/build verification succeeds.

- [ ] **Step 4: Verify Vercel production deployment**

Confirm latest deployment targets `production`, state `READY`, and aliases include `origincafekh.com`.

- [ ] **Step 5: Verify live `/about` markup**

Confirm live production contains the updated primary order and no footer utility treatment for PARTNERSHIPS / DISTRIBUTION / BLOG / CONTACT. Confirm About split hero and four linked entry routes remain present.