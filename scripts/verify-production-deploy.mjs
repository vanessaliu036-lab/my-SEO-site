const isVercelProduction = process.env.VERCEL === "1" && process.env.VERCEL_ENV === "production"

if (isVercelProduction) {
  const sourceRef = process.env.VERCEL_GIT_COMMIT_REF?.trim()

  if (sourceRef !== "main") {
    console.error(
      `Blocked production deployment: expected VERCEL_GIT_COMMIT_REF=main, received ${sourceRef || "missing"}.`,
    )
    process.exit(1)
  }
}
