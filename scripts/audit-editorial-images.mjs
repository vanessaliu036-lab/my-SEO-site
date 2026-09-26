/** Static gate for route-owned OCC editorial imagery; content-API images require an additional runtime audit. */
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const imageLiteral = /\/(?:[\w.-]+\/)*[\w.-]+\.(?:avif|jpe?g|png|svg|webp)(?:\?[^\s"'`)]*)?/gi
const sourceImport = /\bfrom\s*["']([^"']+)["']|\bimport\s*["']([^"']+)["']/g
const exemptIdentity = /\/(?:apple-icon|icon(?:-dark|-light)?(?:-32x32)?|occ-logo(?:-[\w-]+)?)\.(?:png|jpe?g|webp|svg)$/i
const normalize = (value) => value.split('?')[0].split('#')[0]

function walk(folder) {
  if (!fs.existsSync(folder)) return []
  return fs.readdirSync(folder, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(folder, entry.name)
    if (entry.isDirectory()) return walk(file)
    return entry.isFile() && /\.(?:tsx?|jsx?)$/.test(entry.name) ? [file] : []
  })
}

function resolveLocalImport(from, specifier, root) {
  const base = specifier.startsWith('@/')
    ? path.join(root, specifier.slice(2))
    : specifier.startsWith('.') ? path.resolve(path.dirname(from), specifier) : null
  if (!base || !base.startsWith(`${root}${path.sep}`)) return null
  for (const candidate of [base, `${base}.tsx`, `${base}.ts`, `${base}.jsx`, `${base}.js`, path.join(base, 'index.tsx')]) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate
  }
  return null
}

function scanImports(file, root, seen, images, counts) {
  if (seen.has(file)) return
  seen.add(file)
  const content = fs.readFileSync(file, 'utf8')
  const relative = path.relative(root, file).replaceAll(path.sep, '/')
  // Metadata and site identity configuration aren't page-visible editorial imagery.
  if (/^(?:lib\/siteConfig\.ts|lib\/seo\.ts)$/.test(relative)) return
  for (const candidate of content.matchAll(imageLiteral)) {
    const image = normalize(candidate[0])
    if (!exemptIdentity.test(image)) {
      images.add(image)
      counts.set(image, (counts.get(image) || 0) + 1)
    }
  }
  for (const match of content.matchAll(sourceImport)) {
    const next = resolveLocalImport(file, match[1] || match[2], root)
    // Shared navigation/footer imagery is brand identity. Never treat them as an editorial owner.
    if (next && !/\/components\/site\/(?:site-header|site-footer|site-shell|mobile-menu)\.(?:tsx?|jsx?)$/.test(next)) {
      scanImports(next, root, seen, images, counts)
    }
  }
}

function routeOf(page, siteRoot) {
  const rel = path.relative(siteRoot, page).replaceAll(path.sep, '/')
  if (rel === 'page.tsx' || rel === 'page.jsx') return '/'
  return `/${rel.replace(/\/page\.(?:tsx|jsx)$/, '').replace(/\/\([^/]+\)/g, '')}`
}

export function auditEditorialImages(projectRoot = process.cwd()) {
  const root = path.resolve(projectRoot)
  const siteRoot = path.join(root, 'app', '(site)')
  const imagesToRoutes = new Map()
  const missingImages = []
  const hashToImages = new Map()
  const globalImageOverrides = []
  const sameRouteDuplicates = []
  const routes = {}
  const rewrittenPages = new Map([
    ['/about/mission', 'public/occ-pages/mission.html'],
    ['/solutions/roasting-program', 'public/occ-pages/roasting-program.html'],
    ['/origins/cambodia-regions', 'public/occ-pages/cambodia-regions.html'],
    ['/partnerships', 'public/occ-pages/partnerships.html'],
  ])

  for (const page of walk(siteRoot).filter((file) => /\/page\.(?:tsx|jsx)$/.test(file))) {
    const route = routeOf(page, siteRoot)
    if (rewrittenPages.has(route)) continue
    const images = new Set()
    const counts = new Map()
    scanImports(page, root, new Set(), images, counts)
    for (const [image, count] of counts) {
      if (count > 1) sameRouteDuplicates.push({ route, image, count })
    }
    routes[route] = [...images].sort()
    for (const image of images) {
      if (!imagesToRoutes.has(image)) imagesToRoutes.set(image, new Set())
      imagesToRoutes.get(image).add(route)
      const file = path.join(root, 'public', image.replace(/^\//, ''))
      const routeAssetBase = path.join(root, 'app', image.replace(/^\//, ''))
      const routeServesAsset = ['route.ts', 'route.tsx', 'route.js', 'route.jsx'].some((name) =>
        fs.existsSync(path.join(routeAssetBase, name)),
      )
      if (!fs.existsSync(file)) {
        if (routeServesAsset) continue
        missingImages.push({ route, image })
        continue
      }
      const hash = crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')
      if (!hashToImages.has(hash)) hashToImages.set(hash, new Map())
      if (!hashToImages.get(hash).has(image)) hashToImages.get(hash).set(image, new Set())
      hashToImages.get(hash).get(image).add(route)
    }
  }

  // These static editorial pages are served before the App Router via next.config rewrites.
  for (const [route, relative] of rewrittenPages) {
    const file = path.join(root, relative)
    if (!fs.existsSync(file)) continue
    const content = fs.readFileSync(file, 'utf8')
    const images = new Set()
    const counts = new Map()
    for (const match of content.matchAll(/src=["'](?:https?:\/\/origincafekh\.com)?(\/[^"']+\.(?:avif|jpe?g|png|svg|webp))(?:\?[^"']*)?["']/gi)) {
      const image = normalize(match[1])
      if (!exemptIdentity.test(image)) {
        images.add(image)
        counts.set(image, (counts.get(image) || 0) + 1)
      }
    }
    for (const [image, count] of counts) {
      if (count > 1) sameRouteDuplicates.push({ route, image, count })
    }
    routes[route] = [...images].sort()
    for (const image of images) {
      if (!imagesToRoutes.has(image)) imagesToRoutes.set(image, new Set())
      imagesToRoutes.get(image).add(route)
      const asset = path.join(root, 'public', image.replace(/^\//, ''))
      if (!fs.existsSync(asset)) {
        missingImages.push({ route, image })
        continue
      }
      const hash = crypto.createHash('sha256').update(fs.readFileSync(asset)).digest('hex')
      if (!hashToImages.has(hash)) hashToImages.set(hash, new Map())
      if (!hashToImages.get(hash).has(image)) hashToImages.get(hash).set(image, new Set())
      hashToImages.get(hash).get(image).add(route)
    }
  }

  // Image sources in the global stylesheet can override page ownership without editing the route.
  for (const relative of ['app/globals.css', 'app/about-image-overrides.css']) {
    const file = path.join(root, relative)
    if (!fs.existsSync(file)) continue
    const images = [...new Set([...fs.readFileSync(file, 'utf8').matchAll(imageLiteral)].map((x) => normalize(x[0])))].filter((x) => !exemptIdentity.test(x))
    if (images.length) globalImageOverrides.push({ file: relative, images })
  }
  const globalLayout = path.join(root, 'app/layout.tsx')
  if (fs.existsSync(globalLayout) && /import\s*["']\.\/about-image-overrides\.css["']/.test(fs.readFileSync(globalLayout, 'utf8'))) {
    globalImageOverrides.push({ file: 'app/layout.tsx', images: ['global About image override import'] })
  }

  const crossRouteDuplicates = [...imagesToRoutes].filter(([, owners]) => owners.size > 1).map(([image, owners]) => ({ image, routes: [...owners].sort() }))
  const duplicateBytes = [...hashToImages].flatMap(([hash, paths]) => {
    const owners = new Set([...paths.values()].flatMap((value) => [...value]))
    return paths.size > 1 && owners.size > 1 ? [{ hash, images: [...paths.keys()].sort(), routes: [...owners].sort() }] : []
  })
  return { routes, crossRouteDuplicates, sameRouteDuplicates, duplicateBytes, globalImageOverrides, missingImages }
}

export function formatFindings(report) {
  const lines = []
  for (const item of report.crossRouteDuplicates) lines.push(`CROSS_ROUTE ${item.image}: ${item.routes.join(', ')}`)
  for (const item of report.sameRouteDuplicates) lines.push(`SAME_ROUTE ${item.route} uses ${item.image} ${item.count} times`)
  for (const item of report.duplicateBytes) lines.push(`SAME_BYTES ${item.images.join(', ')}: ${item.routes.join(', ')}`)
  for (const item of report.globalImageOverrides) lines.push(`GLOBAL_OVERRIDE ${item.file}: ${item.images.join(', ')}`)
  for (const item of report.missingImages) lines.push(`MISSING ${item.route}: ${item.image}`)
  return lines.join('\n') || 'Static editorial image audit passed; dynamic/CMS images still require browser verification.'
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const findings = auditEditorialImages()
  console.log(formatFindings(findings))
  if (findings.crossRouteDuplicates.length || findings.sameRouteDuplicates.length || findings.duplicateBytes.length || findings.globalImageOverrides.length || findings.missingImages.length) process.exitCode = 1
}
