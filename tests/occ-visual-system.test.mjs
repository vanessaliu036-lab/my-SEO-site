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

test("global header keeps one compact approved OCC logo size across public pages", () => {
  const header = read("components/site/site-header.tsx")

  assert.match(header, /src="\/occ-logo-primary-local\.svg"/)
  assert.match(header, /h-\[42px\][^\n]*sm:h-\[48px\][^\n]*lg:h-\[52px\]/)
  assert.match(header, /h-\[72px\][^\n]*sm:h-20/)
})

test("global footer uses the same compact approved OCC logo size as the header", () => {
  const footer = read("components/site/site-footer.tsx")

  assert.match(footer, /src="\/occ-logo-primary-local\.svg"/)
  assert.match(footer, /h-\[42px\][^\n]*sm:h-\[48px\][^\n]*lg:h-\[52px\]/)
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
  const partnershipsHref = navigation.indexOf('label: "PARTNERSHIPS",\n    href: "/partnerships"')
  const brandGifting = navigation.indexOf('{ label: "Brand & Gifting", href: "/brand-gifting" }')
  const distribution = navigation.indexOf('{ label: "Distribution Partners", href: "/distribution" }')
  const blog = navigation.indexOf('{ label: "BLOG", href: "/blog" }')
  const contact = navigation.indexOf('{ label: "CONTACT", href: "/contact" }')

  assert.ok(
    partnerships >= 0 &&
      partnershipsHref === partnerships &&
      brandGifting > partnershipsHref &&
      distribution > brandGifting &&
      blog > distribution &&
      contact > blog,
  )
  assert.doesNotMatch(footer, /const utilityItems/)
  assert.doesNotMatch(footer, /const standaloneItems/)
  assert.match(footer, /siteNavigation\.map/)
  assert.match(footer, /aria-label="Footer navigation"/)
})

test("partnerships menu keeps parent and Brand & Gifting URLs distinct", () => {
  const navigation = read("components/site/navigation-data.ts")
  const brandGiftingPage = read("app/(site)/brand-gifting/page.tsx")

  assert.match(navigation, /label: "PARTNERSHIPS",\s*href: "\/partnerships"/)
  assert.match(navigation, /Brand & Gifting", href: "\/brand-gifting"/)
  assert.match(brandGiftingPage, /pageAlternates\("\/brand-gifting"\)/)
})

test("distribution hero uses a valid public asset and the global header keeps a compact scale", () => {
  const distribution = read("app/(site)/distribution/page.tsx")
  const header = read("components/site/site-header.tsx")

  assert.match(distribution, /src="\/distribution-hero\.webp"/)
  assert.doesNotMatch(distribution, /src="\/about\/occ-about-atlas\.avif"/)
  assert.match(header, /h-\[72px\][^\n]*sm:h-20/)
  assert.match(header, /h-\[42px\][^\n]*sm:h-\[48px\][^\n]*lg:h-\[52px\]/)
})

test("homepage and About use local photo-led assets", () => {
  const home = read("components/templates/home-template.tsx")
  const css = read("app/(site)/about/about-images.css")

  assert.match(home, /\/hero-home\.webp/)
  for (const image of [
    "about-origin.svg",
    "about-fine-robusta.svg",
    "occ-about-atlas.avif",
    "about-made-for-you.svg",
  ]) {
    assert.match(css, new RegExp(`\\/about\\/${image.replace(".", "\\.")}`))
  }
})

test("About semantic photo surfaces retain scoped cover-image fallbacks", () => {
  const css = read("app/(site)/about/about-images.css")
  const layout = read("app/(site)/about/layout.tsx")

  assert.match(layout, /import "\.\/about-images\.css"/)
  assert.match(css, /aria-label="Cambodian coffee at origin"/)
  assert.match(css, /aria-label="Cambodian coffee origin and production"/)
  assert.match(css, /background-size:\s*cover\s*!important/)
  assert.match(css, /section\[aria-label="OCC origin and commercial paths"\]/)
})

test("approved About hero uses dedicated high-resolution route assets", () => {
  const about = read("components/templates/about-editorial-template.tsx")

  assert.match(about, /const heroImage = "\/about\/occ-about-green-hero\.webp"/)
  assert.match(about, /const whyOccImage = "\/about\/occ-about-intro\.webp"/)
  assert.match(about, /aria-label="One origin\. Cambodia\."/)
  assert.match(about, /One origin\.\s*<br \/>Cambodia\./)
  assert.match(about, /100% Cambodia Origin/)
})

test("approved About content keeps explicit editorial sections without the legacy empty rail", () => {
  const about = read("components/templates/about-editorial-template.tsx")

  assert.match(about, /id="why-occ"/)
  assert.match(about, /aria-label="OCC origin and commercial paths"/)
  assert.match(about, /aria-labelledby="work-with-occ-title"/)
  assert.match(about, /aria-labelledby="about-explore-title"/)
  assert.doesNotMatch(about, /md:col-span-3/)
  assert.doesNotMatch(about, /md:col-start-5/)
})

test("approved About visual entrances point to the intended origin and commercial paths", () => {
  const about = read("components/templates/about-editorial-template.tsx")

  for (const href of ["/origins", "/fine-robusta-cambodia", "/solutions/wholesale", "/solutions/roasting-program"]) {
    assert.match(about, new RegExp(`href: "${href.replaceAll("/", "\\/")}"`))
  }
  assert.match(about, /galleryPanels\.map\([\s\S]*?<Link/)
  assert.match(about, /href="\/solutions\/wholesale"/)
  assert.match(about, /href="\/solutions\/roasting-program"/)
})
