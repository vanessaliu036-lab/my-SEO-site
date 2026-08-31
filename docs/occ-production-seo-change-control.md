# OCC / my-seo-site Production SEO Change-Control Policy

## Status

This policy is mandatory and has highest priority for all OCC SEO, AEO, GEO, technical SEO, content-engineering, automation, agent, Codex, CI/CD, and deployment work that can affect the production website.

Production website:

- Repository: `vanessaliu036-lab/my-SEO-site`
- Vercel project: `my-seo-site`
- Production domain: `origincafekh.com`

## 1. Production is read-only by default

All SEO-related tasks must treat production as **READ ONLY** unless Vanessa gives explicit approval for the specific production change.

Allowed without production approval:

- Crawl
- Audit
- Rank tracking
- Indexing checks
- 404 checks
- Sitemap checks
- Canonical checks
- Structured-data checks
- SEO/AEO/GEO analysis
- Local testing
- Preview testing
- Reporting and recommendations

Not allowed without Vanessa's explicit approval:

- Editing production code
- Editing production SEO logic
- Editing metadata implementation
- Editing canonical logic
- Editing robots.txt
- Editing sitemap generation
- Editing redirects or routes
- Editing JSON-LD / Schema implementation
- Editing production environment variables
- Changing build or Vercel configuration
- Merging or pushing production-impacting changes
- Production deployment

## 2. “Test” never means “deploy”

Instructions such as:

- test locally
- test first
- check it
- verify it
- QA it
- preview it
- try the SEO change

must always mean:

**LOCAL / PREVIEW ONLY. NO PRODUCTION CHANGE.**

A successful test does not grant permission to deploy.

## 3. Explicit production approval is mandatory

Before any SEO-related change can affect production, Vanessa must explicitly approve that specific change.

Examples of valid approval include:

- `確認，上正式站`
- `可以部署 Production`
- another equally explicit instruction authorizing that specific production change

Past approval, general approval, or approval for another task must not be reused.

## 4. Airtable content work is separate from website code

Authorization to write, rewrite, optimize, categorize, or QA OCC articles in Airtable does **not** authorize modification of `my-seo-site` code or deployment configuration.

Airtable is the content source of truth for article-content changes.

Article-content authorization does not automatically authorize:

- Next.js code changes
- layout changes
- rendering changes
- route changes
- sitemap changes
- canonical changes
- Vercel changes
- production deployment

## 5. Do not create competing website versions

There is one canonical website baseline:

**the version currently running in production.**

Do not maintain long-lived A/B/C website versions, agent-specific site copies, SEO versions, recovery versions, or independent workspaces that later compete for production.

Every production-impacting test must begin from the **current production commit/version**, not from an older branch, stale clone, previous task state, or another agent's copy.

## 6. Preview must equal “current production + this task only”

For any production-impacting test, the candidate shown for approval must contain only:

`CURRENT PRODUCTION BASE + THIS TASK'S APPROVED CHANGES`

It must not contain:

- unrelated edits
- previous-task residue
- another agent's changes
- old UI files
- unapproved SEO fixes
- hidden merges
- stale code

Vanessa must review the exact candidate intended for production.

## 7. Approval locks the candidate

After Vanessa approves a candidate for production, that candidate is locked.

Between approval and production, do not:

- add another change
- merge another branch
- rebase onto unrelated work
- pull in another agent's edits
- modify files
- run auto-formatting that changes additional files
- rebuild from a different source tree

The production result must correspond to the exact approved candidate.

## 8. Dirty-workspace production deployments are prohibited

A production deployment must never be created from a dirty working tree.

Required before production deployment:

- `git status` clean
- no uncommitted changes
- no unrelated files
- no task residue

If deployment metadata would show `gitDirty=1`, production deployment is prohibited.

## 9. Scope gate before production

Before asking for Vanessa's approval, report the exact scope:

- files changed
- reason for each change
- pages/routes affected
- whether article count changes
- whether URLs/slugs change
- whether UI changes
- whether indexed pages may be affected
- whether deployment is required

If the final diff contains anything outside the approved scope, stop.

## 10. No automatic production deployment at task completion

Task completion means only that implementation or testing is complete.

Required flow:

`CURRENT PRODUCTION`
→ `LOCAL / PREVIEW TEST`
→ `QA`
→ `REPORT EXACT CHANGE SCOPE`
→ `WAIT FOR VANESSA APPROVAL`
→ `LOCK APPROVED CANDIDATE`
→ `PRODUCTION DEPLOY`
→ `VERIFY PRODUCTION VERSION`

Forbidden flow:

`TASK COMPLETE → AUTO DEPLOY PRODUCTION`

## 11. Production integrity checks

For OCC content/SEO operations, monitor at minimum:

- Airtable article count
- frontend article count
- sitemap URL count
- unexpected 404s
- missing article URLs
- unexpected deletions
- canonical anomalies
- sudden indexed-page loss

The frontend article count and Airtable article count must remain aligned according to the OCC publishing rules.

A count drop or unexplained URL disappearance is a critical incident and must be reported before further production work.

## 12. Vanessa has final production authority

No agent, automation, SEO recommendation, CI/CD process, Codex task, or deployment routine may override this policy.

Without Vanessa's explicit approval for the specific production change:

**NO PRODUCTION SEO CHANGE**

**NO PRODUCTION CODE CHANGE**

**NO PRODUCTION DEPLOYMENT**

## Permanent execution instruction

> LOCAL / PREVIEW ONLY — NO PRODUCTION CHANGE WITHOUT VANESSA APPROVAL.

This instruction is the default for every OCC / `my-seo-site` SEO-related task.