const baseUrl = new URL(process.env.OCC_AUDIT_BASE_URL || "http://127.0.0.1:3100")
const concurrency = Number(process.env.OCC_AUDIT_CONCURRENCY || 4)
const timeoutMs = Number(process.env.OCC_AUDIT_TIMEOUT_MS || 30000)
const identityAsset = /\/(?:occ-logo|icon|apple-icon|favicon|placeholder)[^/?]*(?:\.|\?)/i

async function fetchWithTimeout(url, attempts = 2) {
  let lastError
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeoutMs)
    try {
      return await fetch(url, { redirect: "follow", signal: controller.signal })
    } catch (error) {
      lastError = error
      if (attempt === attempts) throw error
    } finally {
      clearTimeout(timer)
    }
  }
  throw lastError
}

function localUrl(value) {
  const decoded = value.replaceAll("&amp;", "&")
  const url = new URL(decoded, baseUrl)
  if (url.origin !== baseUrl.origin) return null
  return url
}

function imageIdentity(url) {
  if (url.pathname === "/_next/image") {
    const source = url.searchParams.get("url")
    return source ? decodeURIComponent(source) : url.pathname
  }
  return url.pathname
}

function imageUrls(html) {
  const urls = []
  for (const tag of html.match(/<img\b[^>]*>/gi) || []) {
    const src = tag.match(/\bsrc=["']([^"']+)["']/i)?.[1]
    if (src) urls.push(src)
  }
  for (const match of html.matchAll(/\bstyle=["'][^"']*url\(["']?([^"')]+)["']?\)/gi)) urls.push(match[1])
  return urls
}

const sitemap = await fetchWithTimeout(new URL("/sitemap.xml", baseUrl))
if (!sitemap.ok) throw new Error(`sitemap returned ${sitemap.status}`)
const sitemapXml = await sitemap.text()
const sitemapRoutes = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => {
  const productionUrl = new URL(match[1])
  return new URL(`${productionUrl.pathname}${productionUrl.search}`, baseUrl)
})
const articleRoutes = sitemapRoutes.filter((route) => route.pathname.startsWith("/blog/"))
const nonArticleRoutes = sitemapRoutes.filter((route) => !route.pathname.startsWith("/blog/"))
const articleSampleSize = Math.min(6, articleRoutes.length)
const articleSample = Array.from({ length: articleSampleSize }, (_, index) => {
  const offset = Math.round((index * (articleRoutes.length - 1)) / Math.max(articleSampleSize - 1, 1))
  return articleRoutes[offset]
})
const routes = [...nonArticleRoutes, ...articleSample]

const failures = []
const imageChecks = new Map()
let cursor = 0
let pagesChecked = 0

async function worker() {
  while (cursor < routes.length) {
    const route = routes[cursor]
    cursor += 1
    try {
      const response = await fetchWithTimeout(route)
      if (!response.ok) {
        failures.push(`PAGE ${route.pathname}: HTTP ${response.status}`)
        continue
      }
      pagesChecked += 1
      const html = await response.text()
      const pageImages = imageUrls(html).map(localUrl).filter(Boolean)
      const counts = new Map()
      for (const image of pageImages) {
        const identity = imageIdentity(image)
        if (!identityAsset.test(identity)) counts.set(identity, (counts.get(identity) || 0) + 1)
        if (!imageChecks.has(image.href)) imageChecks.set(image.href, image)
      }
      for (const [image, count] of counts) {
        if (count > 1) failures.push(`REPEATED_IMAGE ${route.pathname}: ${image} appears ${count} times`)
      }
    } catch (error) {
      failures.push(`PAGE ${route.pathname}: ${error instanceof Error ? error.message : String(error)}`)
    }
  }
}

await Promise.all(Array.from({ length: concurrency }, () => worker()))

for (const image of imageChecks.values()) {
  try {
    const response = await fetchWithTimeout(image)
    if (!response.ok) failures.push(`IMAGE ${image.pathname}: HTTP ${response.status}`)
  } catch (error) {
    failures.push(`IMAGE ${image.pathname}: ${error instanceof Error ? error.message : String(error)}`)
  }
}

if (failures.length) {
  console.error([...new Set(failures)].join("\n"))
  process.exitCode = 1
} else {
  console.log(`Rendered site audit passed: validated ${sitemapRoutes.length} sitemap entries; rendered all ${nonArticleRoutes.length} non-article pages plus ${articleSample.length} evenly distributed article pages; ${imageChecks.size} unique image requests succeeded with no repeated editorial image per page.`)
}
