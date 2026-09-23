# OCC Deployment SOP

## Branches
OCC uses exactly two active delivery branches:
- `release/occ-current`: the only development, test, Preview, and acceptance branch.
- `main`: production only.

Do not create feature, fix, diagnostic, clean, deploy, or temporary branches for normal OCC work.

## Release cycle
1. Make every approved website/admin change directly on `release/occ-current`.
2. Each completed change is committed on the same branch.
3. Accumulate at least 5 commits ahead of `main` before a normal production release.
4. Use the single `release/occ-current` Preview for QA and owner acceptance.
5. After Vanessa approves the batch, merge `release/occ-current` into `main` once.
6. Let `main` create one Production deployment.
7. After Production is verified, sync `release/occ-current` to the new `main` baseline and begin the next batch.

## Deployment rules
- Vercel Git deployments are enabled only for `release/occ-current` and `main`.
- Production must originate from GitHub `main`.
- No manual `APPROVED_RELEASE_SHA` synchronization is required.
- Release/content/brand/image audits are QA checks, not Vercel prebuild blockers.
- Do not create a new branch to diagnose a failed build. Fix the issue on `release/occ-current`.
- Do not push intermediate fixes to `main`.

## Emergency
For an actual production outage, fix on `release/occ-current`, verify the minimal change, obtain explicit owner approval, then merge once to `main`. Do not create an emergency branch.
