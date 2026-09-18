# OCC Partnerships copy recovery — 2026-09-18

**Status: audit only / NOT a recovered code change / NOT approved for merge or production.**

## What happened

A prior work session reported local commit `ac9efea` (`feat: rewrite partnerships page copy`) on `codex/partnerships-copy-20260917`, with a clean local worktree, **not pushed** to GitHub and not deployed. As checked on 2026-09-18, the remote Git reference `refs/heads/codex/partnerships-copy-20260917` returns 404 and GitHub cannot resolve commit `ac9efea`. This environment does not mount the original Codex worktree; it cannot honestly recover the commit's bytes or establish its exact diff.

The current `main` baseline at investigation was `1f285acda66bc283b50091848ddf1e7c4e5d83e0`. Its `app/(site)/partnerships/page.tsx` is a short, clickable **two-path hub** with `/brand-gifting` and `/distribution`; it does **not** contain the approved September 17 long-form partnership copy. Existing `app/(site)/brand-gifting/page.tsx` holds the independent long-form OCC × ARUNERA gifting page. Do not confuse that existing page with the missing `/partnerships` edit.

Related Draft PR #56 changes `/brand-gifting`, not `/partnerships`; it is **not** a replacement for the missing local commit and should not be merged to solve this incident.

## Known approved copy identity (for comparison only, NOT a reconstructed full file)

The user-supplied September 17 `/partnerships` document starts with:

- SEO title: `Cambodian Coffee Partnerships | OCC × ARUNERA`
- Meta description: `Build meaningful coffee partnerships with OCC and ARUNERA through Cambodian coffee gifts, hotel experiences, retail products and corporate gifting.`
- H1: `Cambodian Coffee Partnerships Built to Be Remembered`
- Opening: `Origin Coffee Cambodia works with selected partners to bring Cambodian coffee into new formats, markets and experiences.`
- Subsequent opening: `Together with ARUNERA, we turn Cambodia-origin coffee into premium gifts and product experiences for hotels, retailers, travel businesses, corporate occasions and people looking for something meaningful to take home.`
- Primary CTA: `Discuss a Partnership`; secondary CTA: `Explore Distribution`.
- Next section: `Why Cambodian Coffee Partnerships?` / `A coffee origin can become more than a product.`
- Reported cooperation stages: 01 Understand opportunity; 02 Define coffee direction; 03 Shape product experience; 04 Review commercial requirements; 05 Prepare partnership.
- Intended enquiry information: company/organisation, country/city/market, partnership type, channels, audience, products/formats, estimated volume or project size, launch timing, and gifting/retail/hospitality/distribution interest.

This is an **incomplete identification excerpt**. Do not paste it as a supposedly recovered full page or silently substitute the older Brand & Gifting SEO brief for the later user-approved copy.

A separate dated September 17 SEO brief in the user's document library suggests a different earlier title (`Cambodian Coffee Gifts & Brand Partnerships | OCC`) and a more gifting-focused structure. That brief is useful comparison evidence but is NOT proof of the final `ac9efea` contents. Preserve the later user-approved copy when the original commit is obtained.

## Recovery steps in ORIGINAL Codex workspace

1. Identify the actual source repo and checkout: `pwd; git rev-parse --show-toplevel; git status --short --branch; git worktree list; git branch -a --contains ac9efea`.
2. Confirm object availability: `git cat-file -t ac9efea && git show --stat --oneline ac9efea`.
3. Extract exact change: `git show ac9efea -- 'app/(site)/partnerships/page.tsx'`; optionally `git format-patch -1 ac9efea --stdout > partnerships-copy-20260917.patch`. Preserve the original patch or exact file before changing worktrees.
4. On an isolated branch based on the then-current `origin/main`, reconcile **only** the approved `/partnerships` copy. Preserve the existing clickable hub links to `/brand-gifting` and `/distribution`; do not overwrite independent pages or change canonical URLs, menu structure, global layout, image ownership, or the blog corpus. Resolve the SEO intent difference explicitly in review rather than silently duplicating the `/brand-gifting` owner.
5. Compare every section, title, description, H1, CTA, internal link, and enquiry-field requirement against the original patch and the supplied copy. Document any incompatible hub-vs-long-form requirement in the PR.
6. Run `npm run test:seo-publishing` and `npm run build` if these scripts are still defined, plus `/partnerships` desktop/mobile visual and link smoke tests, and verify the contact CTA destination. Record actual results, not previous session's claimed test count.
7. Push the reconciled feature branch and open a **Draft PR** against the current `main`. Verify head/base SHA and Vercel preview build, inspect visual/CTA behavior. Do not merge or deploy to production through Codex; use the separately controlled release flow only after explicit approval.

## Gate

**Do not merge this audit PR.** Its sole purpose is to preserve a traceable investigation and the precise recovery checklist while the source `ac9efea` is inaccessible. The site code and production deployment remain unchanged by this branch.
