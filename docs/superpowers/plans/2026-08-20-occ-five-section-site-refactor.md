# OCC Five-Section Site Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the existing Next.js App Router site so every retained public route belongs to exactly one of five public sections—ABOUT, SOLUTIONS, COLLECTION, BLOG, CONTACT—behind one shared site shell, while preserving retained URLs and SEO behavior.

**Architecture:** Use Next.js route groups `(site)` and `(admin)` so URLs do not change. Move retained route trees into `(site)`, move `/admin` into `(admin)`, remove obsolete public route trees, and add permanent redirects for removed routes. Replace competing navigation/shell components with one `components/site` system and keep Blog schema/pillar-link helper layouts only as non-visual SEO helpers.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 3.4, lucide-react, existing Vercel Git deployment.

**Spec:** `docs/superpowers/specs/2026-08-20-occ-five-section-site-architecture.md`

## Global Constraints

- Public top-level navigation is exactly `ABOUT / SOLUTIONS / COLLECTION / BLOG / CONTACT` in that order.
- OCC logo links to `/`; `HOME` is not a navigation item.
- `/admin` is outside the public route group and exposed only through a subordinate `STAFF ACCESS ↗` link.
- Retained public URLs do not change.
- `/coffee`, `/coffee/single-origin`, `/vision`, `/system`, `/signal`, `/matter`, `/archive` become permanent redirects only.
- Existing historical blog redirects remain intact.
- Retained metadata, canonical URLs, JSON-LD, Airtable fetching, blog slugs, article body content, and pillar/cluster internal-link logic are preserved.
- No public route may render `PublicSiteChrome`, `SiteSidebar`, `Navigation`, `AdminFrontendSwitch`, `OccHorizontalFrame`, or a persistent right-side OCC ornament after the refactor.

---

### Task 1: Lock the five-section architecture with regression tests

**Files:**
- Create: `tests/occ-five-section-architecture.test.mjs`
- Modify: `tests/occ-navigation-regression.test.mjs`
- Modify: `tests/occ-public-design.test.mjs`

**Interfaces:**
- Consumes: filesystem paths and source files only.
- Produces: structural assertions used by later tasks.

- [ ] **Step 1: Add a failing architecture test**

The test must assert:

```js
const topLevel = ["ABOUT", "SOLUTIONS", "COLLECTION", "BLOG", "CONTACT"]
```

It must require `app/(site)/layout.tsx`, `app/(site)/page.tsx`, retained route-group paths, `app/(admin)/admin/page.tsx`, and `components/site/navigation-data.ts`.

It must reject top-level source directories `app/about`, `app/solutions`, `app/collection`, `app/blog`, `app/contact`, `app/admin`, `app/coffee`, `app/vision`, `app/system`, `app/signal`, `app/matter`, and `app/archive`.

It must assert that navigation data excludes `HOME`, `COFFEE`, `INSIGHTS`, and `CULTURE & ETHICS`.

It must assert that `app/layout.tsx` does not import `PublicSiteChrome` or `AdminFrontendSwitch`.

It must assert that `next.config.mjs` includes the seven approved permanent legacy redirects.

- [ ] **Step 2: Run the test and verify RED**

Run:

```bash
node --test tests/occ-five-section-architecture.test.mjs
```

Expected: FAIL because route groups and the new site component directory do not yet exist.

- [ ] **Step 3: Remove stale seven-category expectations from the older tests**

Update old regression tests so they do not require `HOME / COFFEE / INSIGHTS / CULTURE & ETHICS` or route-family `OccHorizontalFrame` wrappers.

- [ ] **Step 4: Commit the red test**

```bash
git add tests
git commit -m "test: lock five-section OCC architecture"
```

---

### Task 2: Create the single navigation source and public site shell

**Files:**
- Create: `components/site/navigation-data.ts`
- Create: `components/site/mobile-menu.tsx`
- Create: `components/site/staff-access.tsx`
- Create: `components/site/site-header.tsx`
- Create: `components/site/site-shell.tsx`
- Create: `app/(site)/layout.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Produces: `siteNavigation`, `SiteHeader`, `SiteShell`, `StaffAccess`.
- Consumes: Next `Link`, `usePathname`, lucide `ChevronDown/Menu/X`.

- [ ] **Step 1: Define one navigation data source**

`siteNavigation` contains exactly five entries. ABOUT, SOLUTIONS, COLLECTION contain only the approved children; BLOG and CONTACT contain no children.

- [ ] **Step 2: Implement desktop/mobile header from the same data**

The header uses OCC as `/`, renders exactly the five entries, and renders `STAFF ACCESS ↗` separately as `/admin`. On `/`, the header may use a transparent/dark presentation; other pages use the ivory presentation. Header style selection is based on `usePathname()` only; the hierarchy never changes by route.

- [ ] **Step 3: Implement the site shell**

`SiteShell` renders one header and one public `<main>` wrapper. It must not contain a floating admin button or persistent side ornament.

- [ ] **Step 4: Create `(site)/layout.tsx`**

The layout wraps `children` with `SiteShell` and nothing else.

- [ ] **Step 5: Simplify root layout**

Preserve fonts, metadata, Analytics, Google Analytics, Clarity, and Organization JSON-LD. Remove `PublicSiteChrome`, `AdminFrontendSwitch`, and the fixed right-side OCC ornament.

- [ ] **Step 6: Run architecture test**

Expected: still RED only on route moves/redirects.

- [ ] **Step 7: Commit**

```bash
git add components/site app/layout.tsx 'app/(site)/layout.tsx'
git commit -m "refactor: add single OCC public shell"
```

---

### Task 3: Move retained public route families and admin into route groups

**Files:**
- Move: `app/page.tsx` → `app/(site)/page.tsx`
- Move: `app/about/**` → `app/(site)/about/**`
- Move: `app/solutions/**` → `app/(site)/solutions/**`
- Move: `app/collection/**` → `app/(site)/collection/**`
- Move: `app/blog/**` → `app/(site)/blog/**`
- Move: `app/contact/**` → `app/(site)/contact/**`
- Move: `app/admin/**` → `app/(admin)/admin/**`
- Move/refactor: `app/HomePageClient.tsx` → `components/templates/home-template.tsx`
- Remove visual layouts: `app/(site)/about/layout.tsx`, `app/(site)/solutions/layout.tsx`, `app/(site)/collection/layout.tsx`, `app/(site)/contact/layout.tsx`
- Modify: `app/(site)/blog/layout.tsx`

**Interfaces:**
- Retained URLs remain `/`, `/about/**`, `/solutions/**`, `/collection/**`, `/blog/**`, `/contact`, `/admin`.

- [ ] **Step 1: Move retained route trees without changing blob contents**

Use Git tree moves where possible so nested pages, Contact action/form code, dynamic Blog pages, and Admin components remain byte-identical.

- [ ] **Step 2: Remove duplicate visual route layouts**

Delete the four `OccHorizontalFrame` family layouts after the move.

- [ ] **Step 3: Preserve Blog helper responsibilities without visual chrome**

Keep `app/(site)/blog/layout.tsx`, but change it to render Blog JSON-LD + `BlogScrollToContent` + `{children}` directly. Remove `OccHorizontalFrame` only.

Keep `app/(site)/blog/[slug]/layout.tsx` unchanged because it only injects the existing money-pillar related-guide link and does not create global site chrome.

- [ ] **Step 4: Move the homepage presentation component**

Move the homepage client component to `components/templates/home-template.tsx`, remove its internal desktop/mobile site navigation, and let the new shared header own navigation. Preserve hero copy, CTA links, home authority sections, primary sources, FAQs, and existing home SEO data rendered by `app/(site)/page.tsx`.

Update `app/(site)/page.tsx` to import `@/components/templates/home-template`.

- [ ] **Step 5: Verify route-source imports**

If the Next build reports relative-import failures caused by physical moves, change only those imports to `@/` aliases; do not rewrite page logic.

- [ ] **Step 6: Commit**

```bash
git add app components/templates/home-template.tsx
git commit -m "refactor: group OCC routes into site and admin shells"
```

---

### Task 4: Remove obsolete public route trees and add permanent redirects

**Files:**
- Delete: `app/coffee/**`
- Delete: `app/vision/**`
- Delete: `app/system/**`
- Delete: `app/signal/**`
- Delete: `app/matter/**`
- Delete: `app/archive/**`
- Modify: `next.config.mjs`
- Inspect/modify only if required: `app/sitemap.ts`

**Interfaces:**
- Produces permanent redirects:
  - `/coffee` → `/collection`
  - `/coffee/single-origin` → `/collection`
  - `/vision` → `/about`
  - `/system` → `/about`
  - `/signal` → `/blog`
  - `/matter` → `/blog`
  - `/archive` → `/blog`

- [ ] **Step 1: Replace the old `/coffee` redirect and add all approved legacy redirects**

Keep all existing historical blog redirects exactly as they are.

- [ ] **Step 2: Delete obsolete route trees**

The route source directories must no longer exist.

- [ ] **Step 3: Check sitemap generation**

If `app/sitemap.ts` manually emits any removed legacy path, remove only those entries. Do not change retained article enumeration or sitemap caching behavior.

- [ ] **Step 4: Run architecture test**

Expected: GREEN.

- [ ] **Step 5: Commit**

```bash
git add app next.config.mjs tests
git commit -m "refactor: reduce OCC public routes to five sections"
```

---

### Task 5: Remove dead competing chrome components

**Files:**
- Delete: `components/AdminFrontendSwitch.tsx`
- Delete: `components/Navigation.tsx`
- Delete: `components/PublicSiteChrome.tsx`
- Delete: `components/SiteSidebar.tsx`
- Delete: `components/ui/public-top-nav.tsx`
- Delete: `components/ui/occ-navigation-data.ts`
- Delete: `components/ui/occ-horizontal-frame.tsx`

**Interfaces:**
- Public navigation is now owned only by `components/site/navigation-data.ts` + `components/site/site-header.tsx`.

- [ ] **Step 1: Search for remaining imports**

Before deleting, verify moved retained routes no longer import any listed legacy chrome component.

- [ ] **Step 2: Delete dead components**

Do not delete reusable visual components such as coffee package, reveal, or collection stage components; those remain available for the later visual redesign phase.

- [ ] **Step 3: Run structural tests**

```bash
node --test tests/occ-five-section-architecture.test.mjs tests/occ-navigation-regression.test.mjs tests/occ-public-design.test.mjs
```

Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add components tests
git commit -m "refactor: remove competing OCC navigation chrome"
```

---

### Task 6: Production-build and SEO regression verification

**Files:**
- No planned source changes unless verification exposes a defect.

**Interfaces:**
- Verifies the complete feature branch.

- [ ] **Step 1: Run full production build**

```bash
npm run build
```

Expected: Next.js compile and TypeScript complete successfully and all dynamic/static routes generate without error.

- [ ] **Step 2: Verify retained route list**

Build output must contain `/`, `/about/**`, `/solutions/**`, `/collection/**`, `/blog`, `/blog/[slug]`, `/contact`, `/admin`, `/api/revalidate`, `/robots.txt`, and `/sitemap.xml`.

Build output must not contain standalone `/coffee/single-origin`, `/vision`, `/system`, `/signal`, `/matter`, or `/archive` pages.

- [ ] **Step 3: Verify preview redirects and retained pages**

Check the Vercel preview for:

```text
/                         200
/about                    200
/about/mission            200
/solutions/wholesale      200
/collection               200
/collection/sovann        200
/blog                     200
/blog/cambodia-specialty-robusta-coffee-guide 200
/contact                  200
/admin                    200
/coffee/single-origin     permanent redirect to /collection
/vision                   permanent redirect to /about
/signal                   permanent redirect to /blog
```

- [ ] **Step 4: Verify SEO invariants on the Robusta pillar article**

Confirm its canonical remains `https://origincafekh.com/blog/cambodia-specialty-robusta-coffee-guide`, Article JSON-LD remains present, Breadcrumb JSON-LD remains present, H1 text is unchanged, and article body still contains the existing buyer-guide content.

- [ ] **Step 5: Compare branch against main**

Confirm the diff does not modify `lib/airtable.ts`, `lib/seo.ts`, Contact action behavior, article content data, or robots policy unless a verified build issue required it.

- [ ] **Step 6: Stop at preview**

Do not update `main` until the feature branch is READY and verified. Main integration requires explicit user authorization.
