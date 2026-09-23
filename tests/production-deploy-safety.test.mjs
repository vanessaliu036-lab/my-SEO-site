import assert from "node:assert/strict"
import { existsSync, readFileSync } from "node:fs"
import { execFileSync } from "node:child_process"
import { test } from "node:test"
import { resolve } from "node:path"

const root = resolve(import.meta.dirname, "..")
const guard = resolve(root, "scripts/verify-production-deploy.mjs")
const corpusGuard = resolve(root, "scripts/verify-production-corpus.mjs")

function runScript(script, environment) {
  try {
    execFileSync(process.execPath, [script], {
      cwd: root,
      env: { ...process.env, ...environment },
      encoding: "utf8",
      stdio: "pipe",
    })
    return { status: 0, output: "" }
  } catch (error) {
    return { status: error.status ?? 1, output: `${error.stdout ?? ""}${error.stderr ?? ""}` }
  }
}
function runGuard(environment) { return runScript(guard, environment) }
function runCorpusGuard(count) {
  return runScript(corpusGuard, {
    NODE_ENV: "test", VERCEL: "1", VERCEL_ENV: "production",
    OCC_TEST_CANONICAL_CORPUS_COUNT: String(count),
  })
}

const validProductionGitEnv = {
  VERCEL: "1",
  VERCEL_ENV: "production",
  VERCEL_GIT_PROVIDER: "github",
  VERCEL_GIT_REPO_OWNER: "vanessaliu036-lab",
  VERCEL_GIT_REPO_SLUG: "my-SEO-site",
  VERCEL_GIT_COMMIT_REF: "main",
  VERCEL_GIT_COMMIT_SHA: "daf1351dca7427043fb534c0bf31b18fe7086bc0",
}

test("production deploy guard rejects a non-main Vercel source", () => {
  assert.equal(existsSync(guard), true)
  const result = runGuard({ ...validProductionGitEnv, VERCEL_GIT_COMMIT_REF: "release/occ-current" })
  assert.notEqual(result.status, 0)
  assert.match(result.output, /main/i)
})
test("production deploy guard rejects a non-GitHub production source", () => {
  assert.notEqual(runGuard({ ...validProductionGitEnv, VERCEL_GIT_PROVIDER: "" }).status, 0)
})
test("production deploy guard rejects the wrong GitHub repository owner", () => {
  assert.notEqual(runGuard({ ...validProductionGitEnv, VERCEL_GIT_REPO_OWNER: "other-owner" }).status, 0)
})
test("production deploy guard rejects the wrong GitHub repository", () => {
  assert.notEqual(runGuard({ ...validProductionGitEnv, VERCEL_GIT_REPO_SLUG: "workspace-copy" }).status, 0)
})
test("production deploy guard rejects a missing or invalid Git commit SHA", () => {
  assert.notEqual(runGuard({ ...validProductionGitEnv, VERCEL_GIT_COMMIT_SHA: "" }).status, 0)
  assert.notEqual(runGuard({ ...validProductionGitEnv, VERCEL_GIT_COMMIT_SHA: "not-a-git-sha" }).status, 0)
})
test("production deploy guard allows GitHub main without a manual approved-SHA environment variable", () => {
  assert.equal(runGuard(validProductionGitEnv).status, 0)
})
test("production corpus guard blocks a Research Journal regression below the verified baseline", () => {
  assert.equal(existsSync(corpusGuard), true)
  const result = runCorpusGuard(1689)
  assert.notEqual(result.status, 0)
  assert.match(result.output, /corpus|1841|baseline/i)
})
test("production corpus guard allows the verified Research Journal baseline", () => {
  assert.equal(runCorpusGuard(1841).status, 0)
})
test("production corpus guard requests only fields shared by both canonical tables", () => {
  const source = readFileSync(corpusGuard, "utf8")
  assert.match(source, /params\.append\("fields\[\]", "title"\)/)
  assert.match(source, /params\.append\("fields\[\]", "slug"\)/)
  assert.doesNotMatch(source, /params\.append\("fields\[\]", "source_title"\)/)
})
test("Vercel prebuild only enforces production source identity; release quality gates run separately", () => {
  const pkg = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"))
  assert.equal(pkg.scripts.prebuild, "node scripts/verify-production-deploy.mjs")
  assert.match(pkg.scripts["release:quality"], /verify-protected-content\.mjs/)
  assert.match(pkg.scripts["release:quality"], /audit-brand-colors\.mjs/)
  assert.match(pkg.scripts["release:quality"], /verify-static-assets\.mjs/)
})
test("production source keeps approved pages and unified top navigation", () => {
  const shell = readFileSync(resolve(root, "components/site/site-shell.tsx"), "utf8")
  const header = readFileSync(resolve(root, "components/site/site-header.tsx"), "utf8")
  const navigationData = readFileSync(resolve(root, "components/site/navigation-data.ts"), "utf8")
  const mission = readFileSync(resolve(root, "app/(site)/about/mission/page.tsx"), "utf8")
  const manifesto = readFileSync(resolve(root, "app/(site)/about/manifesto/page.tsx"), "utf8")
  const roasting = readFileSync(resolve(root, "app/(site)/solutions/roasting-program/page.tsx"), "utf8")
  assert.doesNotMatch(`${shell}\n${header}\n${navigationData}`, /SiteSidebar|components\/Navigation|\/admin|Staff Access/i)
  assert.match(header, /siteNavigation/)
  assert.match(mission, /title="OCC MISSION"/)
  assert.match(manifesto, /title="MANIFESTO"/)
  assert.match(roasting, /title="CUSTOM ROASTING PROGRAM"/)
})
