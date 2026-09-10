import assert from "node:assert/strict"
import { existsSync, readFileSync } from "node:fs"
import { execFileSync } from "node:child_process"
import { test } from "node:test"
import { resolve } from "node:path"

const root = resolve(import.meta.dirname, "..")
const guard = resolve(root, "scripts/verify-production-deploy.mjs")

function runGuard(environment) {
  try {
    execFileSync(process.execPath, [guard], {
      cwd: root,
      env: { ...process.env, ...environment },
      encoding: "utf8",
      stdio: "pipe",
    })
    return { status: 0, output: "" }
  } catch (error) {
    return {
      status: error.status ?? 1,
      output: `${error.stdout ?? ""}${error.stderr ?? ""}`,
    }
  }
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
  const result = runGuard({ ...validProductionGitEnv, VERCEL_GIT_COMMIT_REF: "codex/seo-production-fixes" })
  assert.notEqual(result.status, 0)
  assert.match(result.output, /main/i)
})

test("production deploy guard rejects a missing Vercel source ref", () => {
  const result = runGuard({ ...validProductionGitEnv, VERCEL_GIT_COMMIT_REF: "" })
  assert.notEqual(result.status, 0)
  assert.match(result.output, /source|main/i)
})

test("production deploy guard rejects a non-GitHub production source", () => {
  const result = runGuard({ ...validProductionGitEnv, VERCEL_GIT_PROVIDER: "" })
  assert.notEqual(result.status, 0)
  assert.match(result.output, /github|provider/i)
})

test("production deploy guard rejects the wrong GitHub repository owner", () => {
  const result = runGuard({ ...validProductionGitEnv, VERCEL_GIT_REPO_OWNER: "other-owner" })
  assert.notEqual(result.status, 0)
  assert.match(result.output, /owner|vanessaliu036-lab/i)
})

test("production deploy guard rejects the wrong GitHub repository", () => {
  const result = runGuard({ ...validProductionGitEnv, VERCEL_GIT_REPO_SLUG: "workspace-copy" })
  assert.notEqual(result.status, 0)
  assert.match(result.output, /repo|my-SEO-site/i)
})

test("production deploy guard rejects a missing Git commit SHA", () => {
  const result = runGuard({ ...validProductionGitEnv, VERCEL_GIT_COMMIT_SHA: "" })
  assert.notEqual(result.status, 0)
  assert.match(result.output, /sha|commit/i)
})

test("production deploy guard rejects an invalid Git commit SHA", () => {
  const result = runGuard({ ...validProductionGitEnv, VERCEL_GIT_COMMIT_SHA: "not-a-git-sha" })
  assert.notEqual(result.status, 0)
  assert.match(result.output, /sha|commit/i)
})

test("production deploy guard allows only the canonical GitHub main source", () => {
  const result = runGuard(validProductionGitEnv)
  assert.equal(result.status, 0, result.output)
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
  assert.match(roasting, /title="CUSTOM COFFEE ROASTING PROGRAM"/)
})
