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

test("production deploy guard rejects a non-main Vercel source", () => {
  assert.equal(existsSync(guard), true)
  const result = runGuard({ VERCEL: "1", VERCEL_ENV: "production", VERCEL_GIT_COMMIT_REF: "codex/seo-production-fixes" })
  assert.notEqual(result.status, 0)
  assert.match(result.output, /main/i)
})

test("production deploy guard rejects a missing Vercel source ref", () => {
  const result = runGuard({ VERCEL: "1", VERCEL_ENV: "production", VERCEL_GIT_COMMIT_REF: "" })
  assert.notEqual(result.status, 0)
  assert.match(result.output, /source|main/i)
})

test("production deploy guard allows the main Vercel source", () => {
  const result = runGuard({ VERCEL: "1", VERCEL_ENV: "production", VERCEL_GIT_COMMIT_REF: "main" })
  assert.equal(result.status, 0, result.output)
})

test("production source keeps approved pages and unified top navigation", () => {
  const shell = readFileSync(resolve(root, "components/site/site-shell.tsx"), "utf8")
  const header = readFileSync(resolve(root, "components/site/site-header.tsx"), "utf8")
  const navigationData = readFileSync(resolve(root, "components/site/navigation-data.ts"), "utf8")
  const mission = readFileSync(resolve(root, "app/(site)/about/mission/page.tsx"), "utf8")
  const manifesto = readFileSync(resolve(root, "app/(site)/about/manifesto/page.tsx"), "utf8")
  const roasting = readFileSync(resolve(root, "app/(site)/solutions/roasting-program/page.tsx"), "utf8")

  assert.doesNotMatch(`${shell}\n${header}\n${navigationData}`, /SiteSidebar|components\/Navigation|SINGLE ORIGIN|\/collection\//i)
  assert.match(header, /siteNavigation/)
  assert.match(mission, /title="OCC MISSION"/)
  assert.match(manifesto, /title="MANIFESTO"/)
  assert.match(roasting, /title="CUSTOM COFFEE ROASTING PROGRAM"/)
})