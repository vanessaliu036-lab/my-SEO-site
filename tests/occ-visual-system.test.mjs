import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"

const read = (path) => fs.readFileSync(path, "utf8")

const walkTextFiles = (root) => {
  const stat = fs.statSync(root)
  if (stat.isFile()) return [root]

  return fs.readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(root, entry.name)
    if (entry.isDirectory()) return walkTextFiles(fullPath)
    return /\.(?:css|tsx?|jsx?|mjs)$/.test(entry.name) ? [fullPath] : []
  })
}

test("OCC global visual system keeps only title, subtitle and body font roles", () => {
  const layout = read("app/layout.tsx")
  assert.match(layout, /--occ-font-title:/)
  assert.match(layout, /--occ-font-subtitle:/)
  assert.match(layout, /--occ-font-body:/)
  assert.match(layout, /occ-typography-system/)
})

test("OCC public site loads only Cormorant Garamond and Inter", () => {
  const sourceFiles = [
    ...walkTextFiles("app"),
    ...walkTextFiles("components"),
    ...walkTextFiles("styles"),
    "tailwind.config.ts",
  ]
  const source = sourceFiles.map((file) => `\n/* ${file} */\n${read(file)}`).join("\n")
  const fontImports = [...source.matchAll(/import\s*\{([^}]+)\}\s*from\s*["']next\/font\/(?:google|local)["']/g)]

  assert.equal(fontImports.length, 1, "public site should have exactly one next/font import")
  assert.match(fontImports[0][1], /\bInter\b/)
  assert.match(fontImports[0][1], /\bCormorant_Garamond\b/)
  assert.doesNotMatch(source, /\b(?:Geist|Bebas|Barlow)\b/i)
})

test("OCC typography maps every public text role to the two approved fonts", () => {
  const layout = read("app/layout.tsx")
  const css = read("app/globals.css")

  assert.match(layout, /--occ-font-title:\s*var\(--font-display\)/)
  assert.match(layout, /--occ-font-subtitle:\s*var\(--font-sans\)/)
  assert.match(layout, /--occ-font-body:\s*var\(--font-sans\)/)
  assert.match(css, /body[\s\S]*font-family:\s*var\(--font-sans\)/)
  assert.match(css, /h1[\s\S]*font-family:\s*var\(--font-display\)/)
})

test("shared OCC chrome uses the transparent official logo without background tiles", () => {
  const header = read("components/site/site-header.tsx")
  const footer = read("components/site/site-footer.tsx")
  const logo = read("public/occ-logo-primary-local.svg")
  assert.doesNotMatch(header, /bg-\[#FAF8F3\]/)
  assert.doesNotMatch(footer, /bg-\[#FAF8F3\]/)
  assert.doesNotMatch(logo, /<rect\b/)
})

test("global header keeps one approved OCC logo size across public pages", () => {
  const header = read("components/site/site-header.tsx")

  assert.match(header, /src="\/occ-logo-primary-local\.svg"/)
  assert.match(header, /h-\[52px\][^\n]*sm:h-\[58px\][^\n]*lg:h-\[64px\]/)
  assert.match(header, /h-\[88px\][^\n]*sm:h-24/)
})

test("global footer uses the same approved OCC logo size as the header", () => {
  const footer = read("components/site/site-footer.tsx")

  assert.match(footer, /src="\/occ-logo-primary-local\.svg"/)
  assert.match(footer, /h-\[52px\][^\n]*sm:h-\[58px\][^\n]*lg:h-\[64px\]/)
})

test("responsive chrome keeps desktop navigation distinct from the mobile drawer", () => {
  const header = read("components/site/site-header.tsx")
  const mobileMenu = read("components/site/mobile-menu.tsx")

  assert.match(header, /lg:flex/)
  assert.match(header, /lg:hidden/)
  assert.match(mobileMenu, /siteNavigation\.map/)
  assert.match(mobileMenu, /text-3xl/)
  assert.match(mobileMenu, /src="\/occ-logo-primary-local\.svg"/)
  assert.doesNotMatch(mobileMenu, />\s*OCC\s*</)
})

test("primary footer navigation keeps approved order and one shared menu treatment", () => {
  const navigation = read("components/site/navigation-data.ts")
  const footer = read("components/site/site-footer.tsx")

  const partnerships = navigation.indexOf('label: "PARTNERSHIPS"')
  const brandGifting = navigation.indexOf('{ label: "Brand & Gifting", href: "/partnerships" }')
  const distribution = navigation.indexOf('{ label: "Distribution Partners", href: "/distribution" }')
  const blog = navigation.indexOf('{ label: "BLOG", href: "/blog" }')
  const contact = navigation.indexOf('{ label: "CONTACT", href: "/contact" }')

  assert.ok(
    partnerships >= 0 &&
      brandGifting > partnerships &&
      distribution > brandGifting &&
      blog > distribution &&
      contact > blog,
  )
  assert.doesNotMatch(footer, /const utilityItems/)
  assert.doesNotMatch(footer, /const standaloneItems/)
  assert.match(footer, /siteNavigation\.map/)
  assert.match(footer, /aria-label="Footer navigation"/)
})

test("distribution hero uses a valid public asset and the global header keeps a compact scale", () => {
  const distribution = read("app/(site)/distribution/page.tsx")
  const header = read("components/site/site-header.tsx")

  assert.match(distribution, /src="\\/hero-home\\.webp"/)
  assert.doesNotMatch(distribution, /src="\\/distribution-hero\\.webp"/)
  assert.match(header, /h-\\[72px\\][^\\n]*sm:h-20/)
  assert.match(header, /h-\\[42px\\][^\\n]*sm:h-\\[48px\\][^\\n]*lg:h-\\[52px\\]/)
})

test("homepage and About use local photo-led assets", () => {
  const home = read("components/templates/home-template.tsx")
  const css = read("app/globals.css")

  assert.match(home, /\/hero-home\.webp/)
  for (const image of [
    "about-origin.svg",
    "about-fine-robusta.svg",
    "about-ready-to-sell.svg",
    "about-made-for-you.svg",
  ]) {
    assert.match(css, new RegExp(`\\/about\\/${image.replace(".", "\\.")}`))
  }
})

test("About semantic photo surfaces override the legacy low-resolution atlas with cover images", () => {
  const css = read("app/globals.css")

  assert.match(css, /aria-label="Cambodian coffee at origin"/)
  assert.match(css, /aria-label="Cambodian coffee origin and production"/)
  assert.match(css, /background-size:\s*cover\s*!important/)
  assert.match(css, /section\[aria-label="OCC origin and commercial paths"\]/)
})

test("About mobile gallery uses a compact two-column card grid", () => {
  const css = read("app/globals.css")

  assert.match(css, /@media \(max-width: 1023px\)[\s\S]*?grid-template-columns:\s*repeat\(2, minmax\(0, 1fr\)\)\s*!important/)
  assert.match(css, /@media \(max-width: 1023px\)[\s\S]*?aspect-ratio:\s*3\s*\/\s*4\s*!important/)
})

test("About desktop hero follows the approved full-bleed centered reference", () => {
  const about = read("components/templates/about-editorial-template.tsx")
  const hero = about.split('<section id="why-occ"')[0]

  assert.match(hero, /aria-label="Cambodian coffee at origin"/)
  assert.match(hero, /min-h-\[620px\]/)
  assert.match(hero, /text-center/)
  assert.match(hero, /One origin\. Cambodia\./)
  assert.doesNotMatch(hero, /lg:grid-cols-\[0\.92fr_1\.08fr\]/)
})

test("About removes the empty left rail from its editorial sections", () => {
  const about = read("components/templates/about-editorial-template.tsx")

  assert.doesNotMatch(about, /md:col-span-3/)
  assert.doesNotMatch(about, /md:col-start-5/)
  assert.match(about, /max-w-\[1180px\]/)
})

test("About desktop polish keeps compact four-card entry rhythm", () => {
  const about = read("components/templates/about-editorial-template.tsx")

  assert.match(about, /group-hover:scale-\[1\.025\]/)
  assert.match(about, /lg:py-28/)
})

test("About four visual entrances are real links to approved owner pages", () => {
  const about = read("components/templates/about-editorial-template.tsx")

  for (const [label, href] of [
    ["ONE ORIGIN", "/origins"],
    ["FINE ROBUSTA", "/fine-robusta-cambodia"],
    ["READY-TO-SELL", "/solutions/wholesale"],
    ["MADE-FOR-YOU", "/solutions/roasting-program"],
  ]) {
    assert.match(about, new RegExp(`label: "${label}"[\\s\\S]*?href: "${href.replaceAll("/", "\\/")}"`))
  }

  assert.match(about, /galleryPanels\.map\([\s\S]*?<Link/)
})
