# OCC Conversion Pre-flight Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the OCC redesign commercially launch-ready for its first effective B2B inquiry without changing protected SEO URLs or expanding the information architecture unnecessarily.

**Architecture:** Preserve existing indexed content and owner routes, but separate the commercial funnel from the SEO depth layer. Use a durable Airtable lead inbox as the success boundary for contact submissions, align public navigation and Solutions around four approved commercial pathways, introduce `/original` as a commercial trust gateway while keeping `/origins` as SEO/evidence depth, and add a restrained mobile conversion entry on high-intent pages.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS, Zod, React Hook Form, Airtable Web API, Node test runner, Vercel Preview.

**Spec:** `OCC_Web_Design_Standard_Approved_2026-09-08.md` plus the 2026-09-13 Conversion Pre-flight requirements supplied in chat.

## Global Constraints

- Do not delete, rename, redirect, noindex, or unpublish protected/indexed content routes as part of this pre-flight.
- Keep `/origins` and existing Fine Robusta owner routes intact as the SEO/evidence depth layer.
- `ORIGINAL` is the commercial trust gateway; it must not duplicate the SEO-owner role of `/origins`.
- Public commercial service set is exactly: Wholesale & Sourcing, Roasted Coffee Supply, Roasting Program, Distribution Partnership.
- Hidden legacy service routes may remain available for SEO/history but must not be public conversion entry points.
- No unverified inventory, MOQ, capacity, producer, sustainability, certification, traceability, or logistics claims.
- Contact success is only reported after the lead is durably persisted.
- Primary conversion language stays compact: Start a Conversation / Explore Solutions / See Origin Proof.

---

### Task 1: Commercial lead capture must be durable

**Files:**
- Modify: `app/(site)/contact/action.ts`
- Modify: `app/(site)/contact/ContactForm.tsx`
- Create: `tests/occ-conversion-preflight.test.mjs`
- Existing Airtable table: `OCC_B2B_Leads`

**Interfaces:**
- Consumes: `AIRTABLE_TOKEN` or `AIRTABLE_API_KEY`, `AIRTABLE_BASE_ID`.
- Produces: `submitContactForm(data)` that returns success only after Airtable accepts a record.

- [ ] Write a failing regression test that requires Company, Work Email, Country / Market, approved exploration choices, Project / Requirement, optional project stage, source page, Airtable persistence, and no console-only success path.
- [ ] Verify the test fails on the current implementation.
- [ ] Extend the Zod schema and UI fields without adding procurement-friction fields such as mandatory MOQ or budget.
- [ ] Persist submissions to `OCC_B2B_Leads` with status `New` and submitted timestamp; return an error when credentials or Airtable persistence fail.
- [ ] Verify the regression test passes.

### Task 2: Align navigation and Solutions with the approved commercial model

**Files:**
- Modify: `components/site/navigation-data.ts`
- Modify: `app/(site)/solutions/page.tsx`
- Modify: `components/templates/solutions-index-template.tsx`
- Modify: `app/(site)/solutions/wholesale/page.tsx`
- Modify: `app/(site)/solutions/roasting-program/page.tsx`
- Create: `app/(site)/solutions/roasted-coffee-supply/page.tsx`
- Modify: `tests/occ-navigation-regression.test.mjs`
- Modify/Create checks in: `tests/occ-conversion-preflight.test.mjs`

**Interfaces:**
- Produces public paths: `/solutions/wholesale`, `/solutions/roasted-coffee-supply`, `/solutions/roasting-program`, `/distribution`.

- [ ] Update tests first so legacy Staffing/Equipment entry points fail and all four approved services are required.
- [ ] Verify tests fail before implementation.
- [ ] Change navigation and Solutions hub copy/cards/schema to the four approved pathways.
- [ ] Remove public/internal conversion links to legacy Staffing/Equipment while retaining their routes.
- [ ] Give each solution a specific next-step CTA: Start a Sourcing Conversation, Discuss Your Coffee Requirements, Start a Roasting Brief, Discuss Your Market.
- [ ] Verify navigation and conversion tests pass.

### Task 3: Separate ORIGINAL commercial trust from ORIGINS SEO depth

**Files:**
- Create: `app/(site)/original/page.tsx`
- Modify: `components/site/navigation-data.ts`
- Modify: `tests/occ-navigation-regression.test.mjs`
- Modify: `tests/occ-conversion-preflight.test.mjs`

**Interfaces:**
- `/original` consumes existing evidence routes and directs to `/solutions` or `/contact`.
- `/origins` remains unchanged as indexed SEO/evidence depth.

- [ ] Write failing tests that require an ORIGINAL gateway and preserve `/origins` references.
- [ ] Verify red state.
- [ ] Build the gateway around Origin Information, Processing Information, Lot / Specification Discussion, Quality Evaluation, Traceability Records, and Availability Confirmation, with explicit evidence boundaries.
- [ ] Route buyer confidence to Start a Conversation and SEO depth to existing Origins/Fine Robusta pages.
- [ ] Verify tests pass.

### Task 4: Add a restrained mobile conversion entry

**Files:**
- Create: `components/site/mobile-conversion-cta.tsx`
- Modify: `components/site/site-shell.tsx`
- Modify: `tests/occ-conversion-preflight.test.mjs`

**Interfaces:**
- Shows `Start a Conversation →` on high-intent/mobile routes only; hidden on Contact and About institutional pages.

- [ ] Write a failing static regression test for the shared mobile CTA and route allowlist.
- [ ] Verify red state.
- [ ] Implement the small fixed CTA for Blog, Solutions, Original, Origins, Fine Robusta, and Distribution routes.
- [ ] Verify green state.

### Task 5: Pre-flight verification and preview handoff

**Files:**
- No protected-content mutations.

- [ ] Run full `npm test` equivalent through Vercel Preview/prebuild.
- [ ] Confirm Preview build reaches READY.
- [ ] Inspect preview routes for Home/Solutions/Original/Contact and mobile conversion behavior.
- [ ] Confirm no legacy service is exposed through public navigation/Solutions/related-service conversion links.
- [ ] Confirm Contact cannot show success without lead persistence.
- [ ] Confirm protected `/origins`, `/fine-robusta-cambodia`, blog corpus, canonicals, and existing legacy routes remain intact.
- [ ] Create a PR for review; do not merge to production as part of pre-flight unless explicitly requested.
