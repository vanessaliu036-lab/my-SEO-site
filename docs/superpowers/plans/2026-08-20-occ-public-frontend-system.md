# OCC Public Frontend System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign all OCC public pages into one horizontal editorial system with consistent motion while preserving every existing SEO/indexing/content invariant.

**Architecture:** Replace the legacy public sidebar with one route-aware public top navigation shell, then build small presentation primitives for heroes, wide bands, package visuals, and viewport reveals. Route files keep ownership of metadata, JSON-LD, H1/H2 copy, Airtable data, internal links, and form/server behavior; only their presentation layer is migrated.

**Tech Stack:** Next.js 16, React 19, TypeScript 5, Tailwind CSS 3.4, shadcn aliases, lucide-react, framer-motion.

**Spec:** `docs/superpowers/specs/2026-08-20-occ-public-frontend-design-system-design.md`

## Global Constraints

- Public URLs and route paths do not change.
- Metadata, canonical/alternate logic, robots directives, JSON-LD semantic data, sitemap behavior, Airtable routing/data, and contact backend remain unchanged.
- Existing H1 text and one-H1-per-page behavior remain unchanged.
- Desktop public navigation always exposes HOME, ABOUT, COFFEE, COLLECTION, INSIGHTS, SOLUTIONS, CULTURE & ETHICS.
- Desktop layout is horizontal/landscape; mobile collapses vertically.
- Motion uses `[0.22, 1, 0.36, 1]`, restrained 0.55–0.75 s reveals, 150–300 ms hover transitions, and reduced-motion support.
- `/admin` remains visually and functionally unchanged.
- Production `main` is not updated until preview/build/regression checks pass and the user explicitly approves production promotion.

---

### Task 1: Shared Public Chrome and Motion Foundation

**Files:**
- Create: `components/PublicSiteChrome.tsx`
- Create: `components/ui/public-top-nav.tsx`
- Create: `components/ui/motion-reveal.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Modify: `package.json`
- Test: `tests/occ-public-design.test.mjs`

**Interfaces:**
- Produces: `PublicSiteChrome({ children }: { children: React.ReactNode })`
- Produces: `PublicTopNav()` with seven top-level categories and mobile menu.
- Produces: `MotionReveal({ children, direction, className })` for one-shot viewport reveals with reduced-motion support.

- [ ] **Step 1: Write the failing structural test**

```js
import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const read = (path) => fs.readFileSync(path, "utf8")

test("public chrome exposes all seven OCC categories and removes legacy sidebar from root layout", () => {
  const nav = read("components/ui/public-top-nav.tsx")
  const layout = read("app/layout.tsx")
  for (const label of ["HOME", "ABOUT", "COFFEE", "COLLECTION", "INSIGHTS", "SOLUTIONS", "CULTURE & ETHICS"]) {
    assert.match(nav, new RegExp(label.replace("&", "\\&")))
  }
  assert.doesNotMatch(layout, /SiteSidebar/)
  assert.match(layout, /PublicSiteChrome/)
})
```

- [ ] **Step 2: Run the test and verify RED**

Run: `node --test tests/occ-public-design.test.mjs`
Expected: FAIL because `public-top-nav.tsx` and `PublicSiteChrome.tsx` do not exist and the layout still imports `SiteSidebar`.

- [ ] **Step 3: Implement shared public chrome**

Use `usePathname()` inside `PublicSiteChrome` to return children unchanged for `/` and `/admin*`; all other routes receive `PublicTopNav` and a public content wrapper. Keep the root Organization JSON-LD, analytics, fonts, and Admin switch intact.

- [ ] **Step 4: Add motion dependency and shared visual tokens**

Add `framer-motion` to dependencies. Add CSS variables/classes for `--occ-ink`, `--occ-olive`, `--occ-ivory`, `--occ-lime`, grid lines, wide page max width, and reduced-motion fallbacks.

- [ ] **Step 5: Run test and verify GREEN**

Run: `node --test tests/occ-public-design.test.mjs`
Expected: PASS for shared chrome assertions.

- [ ] **Step 6: Commit**

Commit message: `feat: add OCC public site chrome`

---

### Task 2: About Minimalist Coffee-Bag Hero

**Files:**
- Create: `components/ui/minimalist-hero.tsx`
- Create: `components/ui/coffee-bag-visual.tsx`
- Modify: `app/about/page.tsx`
- Test: `tests/occ-public-design.test.mjs`

**Interfaces:**
- Produces: `MinimalistHero` with the supplied reusable prop contract plus a presentation-safe `visual?: React.ReactNode` override so OCC can render a semantic CSS coffee package instead of a portrait image.
- Produces: `CoffeeBagVisual({ name, subtitle, tone })`.

- [ ] **Step 1: Add failing assertions**

```js
test("about uses the reusable minimalist hero with a coffee package and preserves SEO semantics", () => {
  const hero = read("components/ui/minimalist-hero.tsx")
  const about = read("app/about/page.tsx")
  assert.match(hero, /framer-motion/)
  assert.match(hero, /@\/lib\/utils/)
  assert.match(about, /MinimalistHero/)
  assert.match(about, /CoffeeBagVisual/)
  assert.match(about, /ABOUT/)
  assert.match(about, /ORIGIN\./)
  assert.match(about, /About Origin \| Origin Coffee Cambodia - OCC Coffee Roaster/)
  assert.match(about, /AboutPage/)
})
```

- [ ] **Step 2: Run RED**

Expected: FAIL because the reusable hero and coffee bag visual do not exist and About still uses its legacy hero.

- [ ] **Step 3: Implement hero and migrate only presentation**

Adapt the supplied `MinimalistHero` to OCC typography/colors and reduced-motion behavior. Use existing About copy for `mainText`, preserve `ABOUT ORIGIN.` as the only H1, render the coffee package in the middle, and keep every schema/script/body content block and existing destination intact.

- [ ] **Step 4: Run GREEN**

Expected: About assertions pass.

- [ ] **Step 5: Commit**

Commit message: `feat: redesign OCC about hero`

---

### Task 3: Collection Three-Package Overlap Hero

**Files:**
- Create: `components/ui/collection-package-stage.tsx`
- Modify: `app/collection/page.tsx`
- Test: `tests/occ-public-design.test.mjs`

**Interfaces:**
- Produces: `CollectionPackageStage({ items })` where each item supplies `slug`, `name`, `subtitle`, and tone metadata.

- [ ] **Step 1: Add failing assertions**

```js
test("collection uses the approved overlapping three-package composition without changing routes or schema", () => {
  const page = read("app/collection/page.tsx")
  const stage = read("components/ui/collection-package-stage.tsx")
  for (const slug of ["sovann", "prek", "angkar"]) assert.match(stage, new RegExp(slug, "i"))
  assert.match(page, /CollectionPackageStage/)
  assert.match(page, /THREE EXPRESSIONS/)
  assert.match(page, /CollectionPage/)
  assert.match(page, /\/collection\/\$\{c\.slug\}/)
})
```

- [ ] **Step 2: Run RED**

Expected: FAIL because the stage component does not exist.

- [ ] **Step 3: Implement the overlap stage**

Render PREK left, SOVANN center/front, ANGKAR right. Use semantic links to existing collection routes. Add hover/focus lift and subtle sibling recession. Preserve the existing CollectionPage and Breadcrumb JSON-LD and all explanatory content; restyle subsequent content as wide horizontal bands.

- [ ] **Step 4: Run GREEN**

Expected: Collection assertions pass.

- [ ] **Step 5: Commit**

Commit message: `feat: add OCC collection package stage`

---

### Task 4: Origin Feature Strip and Alternating Scroll Reveals

**Files:**
- Create: `components/ui/origin-feature-strip.tsx`
- Create: `components/ui/alternating-reveal-section.tsx`
- Modify: `app/coffee/single-origin/page.tsx`
- Test: `tests/occ-public-design.test.mjs`

**Interfaces:**
- Produces: `OriginFeatureStrip({ features })` using Lucide icons.
- Produces: `AlternatingRevealSection({ index, children, className })` using Framer Motion `whileInView`, `viewport={{ once: true, amount: 0.25 }}`, desktop 72 px and mobile 24 px translation, and reduced-motion support.

- [ ] **Step 1: Add failing assertions**

```js
test("origin page exposes four source-backed features and alternating motion while preserving JSON-LD", () => {
  const page = read("app/coffee/single-origin/page.tsx")
  const feature = read("components/ui/origin-feature-strip.tsx")
  const reveal = read("components/ui/alternating-reveal-section.tsx")
  for (const label of ["ALTITUDE", "TERROIR", "HARVEST", "TRACEABILITY"]) assert.match(page, new RegExp(label))
  assert.match(feature, /lucide-react/)
  assert.match(reveal, /whileInView/)
  assert.match(reveal, /amount:\s*0\.25/)
  assert.match(page, /ItemList/)
  assert.match(page, /FAQPage/)
  assert.match(page, /BreadcrumbList/)
})
```

- [ ] **Step 2: Run RED**

Expected: FAIL because the motion primitives are absent.

- [ ] **Step 3: Implement feature strip and alternating regional sections**

Derive feature labels/copy only from existing altitude, soil, origin/region, coordinates and provenance-related source text. Do not invent harvest claims. If the existing page does not support a specific harvest fact, use `ORIGIN` as the visible label while retaining the approved harvest/origin concept in the design grouping.

- [ ] **Step 4: Run GREEN**

Expected: Origin assertions pass.

- [ ] **Step 5: Commit**

Commit message: `feat: add OCC origin motion story`

---

### Task 5: Migrate Remaining Public Templates to the Same Horizontal System

**Files:**
- Modify: `app/about/mission/page.tsx`
- Modify: `app/about/founder/page.tsx`
- Modify: `app/about/manifesto/page.tsx`
- Modify: `app/about/sustainability/page.tsx`
- Modify: `app/vision/page.tsx`
- Modify: `app/system/page.tsx`
- Modify: `app/solutions/page.tsx`
- Modify: `app/solutions/wholesale/page.tsx`
- Modify: `app/solutions/roasting-program/page.tsx`
- Modify: `app/solutions/barista-staffing/page.tsx`
- Modify: `app/solutions/equipment-service/page.tsx`
- Modify: `app/collection/sovann/page.tsx`
- Modify: `app/collection/prek/page.tsx`
- Modify: `app/collection/angkar/page.tsx`
- Modify: `app/blog/page.tsx`
- Modify: `app/blog/[slug]/page.tsx`
- Modify: `app/contact/page.tsx`
- Modify: `app/signal/page.tsx`
- Modify: `app/matter/page.tsx`
- Modify: `app/archive/page.tsx`
- Test: `tests/occ-public-design.test.mjs`

**Interfaces:**
- Consumes shared chrome and motion primitives from Tasks 1–4.
- No SEO/data interfaces change.

- [ ] **Step 1: Add representative failing assertions**

Check that representative routes use the new horizontal wrapper classes while retaining their current metadata/schema signatures, article data pipeline, robusta pillar constants, contact action integration, and noindex directives.

- [ ] **Step 2: Run RED**

Expected: FAIL on legacy page wrappers.

- [ ] **Step 3: Migrate institutional/service pages**

Convert hero and sections to 12-column left/right bands; do not rewrite copy or metadata/schema.

- [ ] **Step 4: Migrate collection detail pages**

Use package/origin opposing columns plus specification bands; preserve Product/schema/content.

- [ ] **Step 5: Migrate Blog index and article template**

Keep `generateMetadata`, canonical pagination, Airtable fetches, static params, formatting pipeline, internal-link injection, Robusta cluster/pillar behavior, and Article/Breadcrumb JSON-LD unchanged. Change only wrappers/classes/presentation components.

- [ ] **Step 6: Migrate Contact and special editorial routes**

Keep Contact form action/validation unchanged. Preserve noindex where configured for Signal/Matter/Archive.

- [ ] **Step 7: Run GREEN**

Expected: representative structure/SEO assertions pass.

- [ ] **Step 8: Commit**

Commit message: `feat: unify OCC public page templates`

---

### Task 6: SEO Regression, Build, and Preview Verification

**Files:**
- Test: `tests/occ-public-design.test.mjs`
- No production file changes unless verification identifies a concrete regression.

**Interfaces:** None.

- [ ] **Step 1: Run structural regression suite**

Run: `node --test tests/occ-public-design.test.mjs`
Expected: all tests pass.

- [ ] **Step 2: Run production build**

Run: `npm run build`
Expected: TypeScript compile passes and static generation completes.

- [ ] **Step 3: Verify preview routes**

Check `/about`, `/solutions/wholesale`, `/collection`, `/coffee/single-origin`, `/blog`, one Robusta pillar article, `/contact`, and one noindex editorial route for successful HTTP response.

- [ ] **Step 4: Compare SEO invariants**

For representative routes, confirm title/description/canonical/H1/JSON-LD/robots/internal-link destinations match the pre-redesign state.

- [ ] **Step 5: Verify responsive and motion contract**

Confirm seven desktop categories, mobile full-screen menu, horizontal desktop composition, reduced-motion support, and no `/admin` layout change.

- [ ] **Step 6: Report preview state**

Do not move `main` until the user has reviewed/approved the verified preview.