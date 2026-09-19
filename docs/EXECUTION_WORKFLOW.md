# OCC action-first execution workflow

## Purpose
Prevent repeated diagnosis-only reports being presented as completed implementation. Every request to fix, execute, or deploy must produce an actual action and verifiable result, or state the specific blocker without claiming completion.

## Mandatory sequence
1. **Establish target and baseline.** Identify exact page, issue, current production deployment and approved source commit. Record user-supplied metrics as observations, not established causes.
2. **Inspect actual implementation.** Read relevant source, recent changes, analytics instrumentation and errors. Do not repeat previously completed discovery or propose speculative fixes.
3. **Make the smallest defensible change.** Create an isolated branch from current main; change implementation, not just a diagnosis document. Preserve article count, SEO owners, canonical URLs, approved copy and layout unless explicitly requested.
4. **Verify before reporting.** Run available tests/build and check affected routes and mobile/desktop. If verification cannot run, record exactly what is unverified; do not say fixed.
5. **Publish through authorized process.** Confirm exact tested SHA and release target; follow current user authorization and repository release controls. Never treat a documentation-only commit as a production fix or silently replace a newer approved production version.
6. **Verify production.** Check deployment state, exact SHA, HTTP response and relevant page behavior. A successful deployment alone does not prove GA4 engagement has improved; measure after sufficient traffic.
7. **Report results only.** Include changed paths, commit/PR, tests and results, deployment ID/URL/SHA, remaining issues. Distinguish `investigated`, `implemented`, `tested`, `deployed`, and `measured` statuses. Do not say `completed` unless the requested action is completed.

## Explicit anti-stall rules
- After the user says execute, do not respond with another plan as the deliverable. Perform the next available concrete tool action.
- Never promise work in the background or imply a later action will occur without an actual scheduled task.
- If a blocker exists, name the exact permission, tool, missing input or failing check and deliver any independently executable part first.
- Do not use an arbitrary engagement-time target or artificial timer to inflate GA4. Prioritize legitimate navigation, actual conversions, and 404 reduction.
- When a user explicitly authorizes deployment, that resolves the approval question for this request, but does not waive build verification, version integrity or technical permissions.

## Current engagement incident
GA4 observations: homepage title groups 24–30 seconds, Blog 26 seconds, Research Journal 16 seconds, Wholesale 35 seconds, Fine Robusta 60 seconds. Root cause not yet proven. The prior diagnosis-only commit `f4048de` was not a fix. The next engineering change must inspect actual code, implement and verify a targeted improvement before deployment. Track 404 traffic and qualified form submissions separately.
