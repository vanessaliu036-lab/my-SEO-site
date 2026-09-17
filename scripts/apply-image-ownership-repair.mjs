import fs from 'node:fs'

function read(path) {
  return fs.readFileSync(path, 'utf8')
}

function write(path, content) {
  fs.writeFileSync(path, content)
}

function replaceExact(path, from, to) {
  const content = read(path)
  if (!content.includes(from)) throw new Error(`Expected text not found in ${path}: ${from.slice(0, 120)}`)
  write(path, content.replace(from, to))
}

// 1) Route-owned sources: Home keeps hero-home; Wholesale receives an approved unique photo.
replaceExact(
  'components/templates/wholesale-editorial-template.tsx',
  '<img src="/hero-home.webp" alt="Cambodia-origin coffee prepared for professional wholesale supply" className="h-full w-full object-cover" />',
  '<img src="/images/occ-wholesale-hero.webp" alt="Cambodia-origin coffee prepared for professional wholesale supply" className="h-full w-full object-cover" />',
)

// 2) About no longer borrows Wholesale-owned origin/fine-Robusta artwork or Home hero.
replaceExact('components/templates/about-editorial-template.tsx', 'const heroImage = "/hero-home.webp"', 'const heroImage = "/about/about-why-occ.jpg"')
replaceExact('components/templates/about-editorial-template.tsx', 'image: "/about/about-origin.svg",', 'image: "/about/about-why-occ.jpg",')
replaceExact('components/templates/about-editorial-template.tsx', 'image: "/about/about-fine-robusta.svg",', 'image: "/distribution-hero.webp",')
replaceExact('components/templates/about-editorial-template.tsx', 'image: "/about/about-made-for-you.svg",', 'image: "/about/about-ready-to-sell.svg",')

// 3) Distribution owns the atlas; Brand & Gifting takes an otherwise-unused gifting/product visual.
replaceExact('app/(site)/brand-gifting/page.tsx', 'src="/about/occ-about-atlas.avif"', 'src="/about/about-made-for-you.svg"')

// 4) Remove the global About source lock. Source ownership now lives in page/template code.
replaceExact('app/layout.tsx', 'import "./about-image-overrides.css";\n', '')
if (fs.existsSync('app/about-image-overrides.css')) fs.unlinkSync('app/about-image-overrides.css')

const globalsPath = 'app/globals.css'
let globals = read(globalsPath)
const marker = '/* About uses independent local source photographs instead of magnifying the old 4-up sprite. */'
const mediaMarker = '@media (max-width: 1023px) {'
const start = globals.indexOf(marker)
const mediaStart = globals.indexOf(mediaMarker, start)
if (start === -1 || mediaStart === -1) throw new Error('Could not locate the legacy About global image-source override block')
globals = globals.slice(0, start) + globals.slice(mediaStart)
const mobileNeedle = `  section[aria-label="OCC origin and commercial paths"] > a > div:last-child {\n    padding: 1rem !important;\n  }\n`
const mobileReplacement = `${mobileNeedle}\n  section[aria-label="OCC origin and commercial paths"] > a:nth-child(3) > div:first-child {\n    background-size: contain !important;\n    background-position: center !important;\n    background-repeat: no-repeat !important;\n  }\n`
if (!globals.includes(mobileNeedle)) throw new Error('Could not locate About mobile gallery styling anchor')
globals = globals.replace(mobileNeedle, mobileReplacement)
write(globalsPath, globals)

// 5) The brand partnership image is served by a force-static Next route, so it is not a missing asset.
const auditPath = 'scripts/audit-editorial-images.mjs'
const oldMissingCheck = `      const file = path.join(root, 'public', image.replace(/^\\//, ''))\n      if (!fs.existsSync(file)) {\n        missingImages.push({ route, image })\n        continue\n      }\n      const hash = crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')\n`
const newMissingCheck = `      const file = path.join(root, 'public', image.replace(/^\\//, ''))\n      const routeAssetBase = path.join(root, 'app', image.replace(/^\\//, ''))\n      const routeServesAsset = ['route.ts', 'route.tsx', 'route.js', 'route.jsx'].some((name) =>\n        fs.existsSync(path.join(routeAssetBase, name)),\n      )\n      if (!fs.existsSync(file)) {\n        if (routeServesAsset) continue\n        missingImages.push({ route, image })\n        continue\n      }\n      const hash = crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')\n`
replaceExact(auditPath, oldMissingCheck, newMissingCheck)

// 6) Replace the obsolete test that required a global !important source override.
write(
  'tests/occ-about-image-uniqueness.test.mjs',
  `import test from "node:test"\nimport assert from "node:assert/strict"\nimport fs from "node:fs"\n\nconst templatePath = "components/templates/about-editorial-template.tsx"\nconst layoutPath = "app/layout.tsx"\nconst globalsPath = "app/globals.css"\nconst cssPath = "app/about-image-overrides.css"\nconst publicSiteLayoutPath = "app/(site)/layout.tsx"\nconst mobileFallbackPath = "components/site/about-image-fallback.tsx"\nconst whyOccJpegPath = "public/about/about-why-occ.jpg"\n\ntest("ABOUT image sources are route-owned rather than globally overridden", () => {\n  const template = fs.readFileSync(templatePath, "utf8")\n  const layout = fs.readFileSync(layoutPath, "utf8")\n  const globals = fs.readFileSync(globalsPath, "utf8")\n\n  assert.equal(fs.existsSync(cssPath), false, "legacy global About image-source lock must be removed")\n  assert.doesNotMatch(layout, /about-image-overrides\\.css/)\n  assert.doesNotMatch(globals, /background-image:\\s*url\\(["']?\\/about\\//)\n  assert.match(template, /const heroImage = "\\/about\\/about-why-occ\\.jpg"/)\n  assert.match(template, /const whyOccImage = "\\/distribution-hero\\.webp"/)\n  assert.doesNotMatch(template, /image: "\\/about\\/about-origin\\.svg"/)\n  assert.doesNotMatch(template, /image: "\\/about\\/about-fine-robusta\\.svg"/)\n  assert.doesNotMatch(template, /image: "\\/about\\/about-made-for-you\\.svg"/)\n})\n\ntest("ABOUT Why OCC keeps its directly decodable JPEG safety net on mobile Safari", () => {\n  const publicSiteLayout = fs.readFileSync(publicSiteLayoutPath, "utf8")\n  const fallback = fs.readFileSync(mobileFallbackPath, "utf8")\n\n  assert.match(publicSiteLayout, /import \\{ AboutImageFallback \\}/)\n  assert.match(publicSiteLayout, /<AboutImageFallback \\/>/)\n  assert.match(fallback, /usePathname/)\n  assert.match(fallback, /Cambodian coffee origin and production/)\n  assert.match(fallback, /const WHY_OCC_SOURCE = "\\/about\\/about-why-occ\\.jpg"/)\n  assert.match(fallback, /lg:hidden/)\n\n  assert.equal(fs.existsSync(whyOccJpegPath), true)\n  const jpeg = fs.readFileSync(whyOccJpegPath)\n  assert.ok(jpeg.length > 3_000)\n  assert.equal(jpeg[0], 0xff)\n  assert.equal(jpeg[1], 0xd8)\n  assert.equal(jpeg[jpeg.length - 2], 0xff)\n  assert.equal(jpeg[jpeg.length - 1], 0xd9)\n  assert.match(fallback, /element\\.style\\.position = "relative"/)\n  assert.match(fallback, /createPortal\\(/)\n})\n\ntest("ABOUT Ready-to-Sell keeps the full product composition visible on mobile", () => {\n  const globals = fs.readFileSync(globalsPath, "utf8")\n  assert.match(\n    globals,\n    /@media \\(max-width: 1023px\\)[\\s\\S]*?OCC origin and commercial paths"\\] > a:nth-child\\(3\\) > div:first-child[\\s\\S]*?background-size:\\s*contain\\s*!important[\\s\\S]*?background-position:\\s*center\\s*!important/,\n  )\n})\n`,
)

console.log('Applied route-owned editorial image repair.')
