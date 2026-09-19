# OCC AGENT RULES — MANDATORY

Applies to GPT, Codex and other agents working on the OCC website, repository, SEO, images, CMS, assets or release. **GitHub Issue #75 is the canonical P0 release-governance record and takes precedence over older, conflicting branch/release instructions.** This file incorporates the owner's 2026-09-19 strict-scope amendment. A rule recorded here does not itself approve a design, a release SHA, a merge, a preview or a production deployment.

## 0. Mandatory first-response governance check

Before proposing changes or performing any repository, GitHub, Vercel, Airtable, Drive, CMS or site action, read this complete file, Issue #75 and its latest comments, the relevant release manifest and current Git/CI/deployment evidence. The first response of every NEW OCC work conversation must begin with the following acknowledgement, substituting a verified version identifier:

```text
OCC GOVERNANCE CHECK — READ
Governance source: GitHub Issue #75 / AGENTS.md (when present)
Governance version: <exact Issue #75 updated_at or AGENTS.md blob/commit SHA>
Current production policy: main = last approved production only
Current work policy: one controlled release line only
Release threshold: >= 5 owner-approved changes before normal Vercel release
Approved release identity: exact APPROVED_RELEASE_SHA required
Image policy: no cross-page editorial image reuse; same bytes under another filename also prohibited
Content policy: existing approved content cannot be removed without explicit owner instruction
Design policy: approved HTML is source of truth; migrate, do not reinterpret
Deployment policy: no preview/production merely to inspect iterative visual changes
Status: READY TO WORK UNDER GOVERNANCE
```

Never invent the version or claim READY if mandatory evidence has not been read. This check applies even to a 'small fix', single image, urgent task, deploy-only instruction or read-only repository request. An explicitly declared P0 emergency can waive only the five-change threshold, not this check or exact approved SHA. If evidence is missing, report BLOCKED and the precise gap.

## 1. Strict scope lock — entire website unchanged by default

**The owner's CURRENT instruction is the entire permitted change scope.** Continue optimizing the same owner-approved Codex version. Unmentioned pages, components, text, images, metadata, URLs, SEO owners, behaviors and design are frozen. 'Optimize', 'improve' or 'fix' never grants permission for opportunistic refactors, redesigns, cleanups or other-page fixes.

Before touching files, write down: (a) the exact owner instruction; (b) permitted routes, sections and elements; (c) permitted text/images/SEO metadata/behavior; (d) last owner-approved visual/content reference; (e) expected files and unavoidable local dependencies; (f) explicit exclusions. Do not call the current live site the design reference if it is known to differ from the owner's approved version.

Interpret scope literally:
- 'Replace the Hero image': change only that Hero image, its asset reference and strictly necessary local sizing. Preserve Hero copy, navigation, footer, other images/routes and global styling.
- 'Change page X SEO Title': change that exact Title only; preserve H1, body, slug, canonical, other metadata and other pages.
- 'Fix section Y mobile spacing': change only section Y's relevant mobile rules. Desktop, other breakpoints and sections remain unchanged.
- 'About uses the new layout': replace only the specified About layout and its minimum necessary About-local integration. Preserve all unmentioned About content and all other pages. Never infer permission to change the homepage, Solutions, global navigation or unrelated copy.

If the task can be done without editing shared components, configuration or site-wide CSS, do not edit them. If an unavoidable shared dependency has out-of-scope effects, identify the exact impacted routes/behaviors and obtain an explicit scope expansion BEFORE editing. Problems found outside scope become separate proposed tasks, not incidental changes in this commit. A known bug is not implicit authorization.

## 2. Approved design and content preservation

Owner-supplied HTML/layout is the **source of truth**, not a mood board. Migration may map existing OCC copy into approved slots, use approved route-owned images and connect framework-required existing routes/metadata, but may not reinterpret spacing, section order, components or visuals. Compare desktop and mobile against the actual approved reference; material mismatches block release.

Preserve existing approved visible content by default, including Guide, brand introduction, icon blocks, copy, CTAs, images and SEO sections. Removing, hiding, truncating, rewording or moving approved content requires an explicit instruction covering that content, even during a layout change. For each affected route, inspect a before/after content diff and the protected-content manifest. Preserve SEO owner URLs, canonical, H1, schema and internal links outside the authorized scope.

## 3. Git working line and source control

- `main` is the last **approved production release only**, not a working branch. Never edit, commit, merge, rebase or push `main` as part of routine work.
- The one normal controlled working/release line is `release/occ-current`; approved scoped changes accumulate there. Do **not** follow the older 'one new codex branch per minor fix' rule: Issue #75 supersedes it. No duplicate fix/final/deploy/integration/backup branches. An emergency P0 branch requires an explicit emergency reason.
- If using a local worktree, keep it isolated, do not reuse another task's worktree, and do not merge/push `main` from an implementation task. Check current ref and any active work before writing.
- No force-push, destructive hard reset, deleting another task's branch/worktree, or overwriting user work without explicit approval. Never publish a dirty or uncommitted build source.
- GitHub documentation changes must be committed only within an authorized, scope-clean batch. Do not merge/push `main` or trigger a standalone deployment to activate this file. A branch commit is **not** a production release.

## 4. Mandatory pre-commit Scope Lock + complete diff gate

1. Confirm the exact baseline/ref and compare **every changed filename and the complete line-level diff** against the scope lock and approved reference.
2. Remove unrelated edits; verify all unmentioned copy, sections, CTAs, images, layouts, routes, SEO owner assignments, canonical and metadata remain identical. Inspect shared imports/styles for unintended cross-route changes.
3. One commit contains only one explicitly approved scope or a tightly coupled unit that the owner explicitly approved. Do not combine incidental repairs. Multiple independently approved scope-clean commits may accumulate in the one controlled batch.
4. Run the relevant local validation for the affected scope; distinguish PASS, FAIL, BLOCKED and NOT RUN. Do not claim unit-test success establishes visual, production or SEO correctness.
5. **Immediately after every commit** report: this-round commit count; cumulative candidate commits; separately the independently owner-approved change count; exact SHA; changed paths; tests/results; remaining blockers; deploy eligibility. A commit, checkbox, manifest boolean or self-authored approval is **not** an independently approved change.

## 5. Normal OCC release — immutable identity and technical gates

Normal release is forbidden until at least **five independently evidenced owner-approved changes** have accumulated. A declared P0 emergency is the only threshold exception. Use the release manifest at `release/occ-release-manifest.json` and the applicable checks in `scripts/verify-release-batch.mjs`, `scripts/verify-production-deploy.mjs`, `scripts/verify-protected-content.mjs`, `scripts/audit-editorial-images.mjs`, `scripts/verify-static-assets.mjs`, and `.github/workflows/occ-release-governance.yml` when present. The existence of a script or a self-asserted manifest field is not evidence that its check passed or that approval was given.

Required sequence: scope-clean local work and commits → five owner-approved changes (or explicit P0 exception) → content preservation and route manifest → whole-site editorial image ownership → broken/static assets → desktop/mobile visual regression against approved HTML → SEO/canonical/link checks → clean build from immutable commit → at most one controlled preview → owner approval of the **exact candidate SHA** → record `APPROVED_RELEASE_SHA` and approver/approved version/routes/time → authorized single production release → verify live SHA and smoke-test public routes/content/assets.

Release must hard-fail when `VERCEL_GIT_COMMIT_SHA !== APPROVED_RELEASE_SHA`. Do not promote a branch name, 'latest main', or arbitrary build. No preview/production simply to inspect iterative design; avoid automatic preview builds for non-release pushes wherever configurable. Only a designated release task may integrate approved work after other work is idle and gates are satisfied. Review candidate commits, fetch current `origin/main`, test combined result, then carry out **one** approved release; `OCC_RELEASE=1` is a deliberate local override for the final release commit/push only, never routine permission to bypass gates.

Before deploying, compare **both** (1) the last owner-approved visual/content version and (2) the last approved production commit. Confirm the release diff is exactly the accumulated approved scopes; the known-wrong live version does not become the design source of truth. Report: previous production SHA, approved design/version, release-candidate SHA, exact approved release SHA, and PASS/FAIL equality. Unknown SHA = UNVERIFIED and deployment blocked. Never say 'local/GitHub/preview aligned' as proof of approval. Verify clean source, no unapproved changes and no dirty Git build.

## 6. Asset, SEO and incident protections

Editorial images must be unique to each public route **by path and underlying bytes**; a renamed duplicate is still reuse. Only identity assets such as approved logos/icons may be exempted. Verify committed paths and filename case, file existence, decodability, preview HTTP 200 and correct image Content-Type; prohibit temporary/private Drive URLs in production. Broken images block release.

During an SEO stability window, avoid unauthorized churn in owner URLs, canonical, H1, schema, primary copy and internal links. SEO reports must record the verified production SHA, deployment events during the measurement window, and distinguish ranking/query movement from crawl/indexing and site-version changes.

Issue #75 remains **P0 STOP-SHIP** until its full executable dry run and production evidence meet the issue's Definition of Done. A passing unit-test subset, an unverified ownerApproved field, a draft PR or an ERROR Vercel deployment does not lift STOP-SHIP. Do not repair unrelated discovered problems merely to make a release checklist look green; surface them as separately scoped work. Never silently bypass a failed gate.

## 7. Owner authorization and completion reporting

When the owner explicitly says **「允許部署」** for a specified approved scope, proceed with its commit, testing and controlled-release procedure without repeatedly asking for the *same* permission. That authorization does not approve other work, waive required independent change approvals, override a failed gate, select an unapproved SHA or grant blanket future release rights. Keep investigating and fixing **in-scope** failures; when a real blocker remains, accurately report missing evidence, what was attempted and what is still blocked. Never claim a commit, merge, preview, deployment or live-site verification that did not actually happen.

For every round distinguish: COMPLETED / VERIFIED / BLOCKED / NOT RUN; exact branch and SHA; round vs cumulative commits; independently approved change count; affected paths; pass/fail for diff, tests, visual/content/SEO/asset gates; deployment YES/NO/PENDING; actual production SHA or UNVERIFIED. **Documentation-only changes, including this AGENTS.md update, do not authorize an independent production deployment.**
