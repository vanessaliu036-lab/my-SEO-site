const isVercelProduction = process.env.VERCEL === "1" && process.env.VERCEL_ENV === "production"

if (isVercelProduction) {
  const expected = {
    provider: "github",
    owner: "vanessaliu036-lab",
    repo: "my-SEO-site",
    ref: "main",
  }

  const actual = {
    provider: process.env.VERCEL_GIT_PROVIDER?.trim().toLowerCase(),
    owner: process.env.VERCEL_GIT_REPO_OWNER?.trim(),
    repo: process.env.VERCEL_GIT_REPO_SLUG?.trim(),
    ref: process.env.VERCEL_GIT_COMMIT_REF?.trim(),
    sha: process.env.VERCEL_GIT_COMMIT_SHA?.trim(),
  }

  const failures = []

  if (actual.provider !== expected.provider) {
    failures.push(`provider=${actual.provider || "missing"}; expected github`)
  }

  if (actual.owner !== expected.owner) {
    failures.push(`owner=${actual.owner || "missing"}; expected ${expected.owner}`)
  }

  if (actual.repo !== expected.repo) {
    failures.push(`repo=${actual.repo || "missing"}; expected ${expected.repo}`)
  }

  if (actual.ref !== expected.ref) {
    failures.push(`ref=${actual.ref || "missing"}; expected main`)
  }

  if (!/^[0-9a-f]{40}$/i.test(actual.sha || "")) {
    failures.push(`commit SHA=${actual.sha || "missing"}; expected a 40-character Git SHA`)
  }

  if (failures.length > 0) {
    console.error(`Blocked production deployment: canonical GitHub source verification failed (${failures.join("; ")}).`)
    process.exit(1)
  }
}
