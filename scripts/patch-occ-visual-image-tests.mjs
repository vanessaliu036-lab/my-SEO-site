import fs from 'node:fs'

const file = 'tests/occ-visual-system.test.mjs'
let source = fs.readFileSync(file, 'utf8')

const oldLocalAssets = `test("homepage and About use local photo-led assets", () => {
  const home = read("components/templates/home-template.tsx")
  const css = read("app/globals.css")

  assert.match(home, /\\/hero-home\\.webp/)
  for (const image of [
    "about-origin.svg",
    "about-fine-robusta.svg",
    "about-ready-to-sell.svg",
    "about-made-for-you.svg",
  ]) {
    assert.match(css, new RegExp(\`\\\\/about\\\\/\${image.replace(".", "\\\\.")}\`))
  }
})`

const newLocalAssets = `test("homepage keeps its dedicated hero while About hero ownership is route-local", () => {
  const home = read("components/templates/home-template.tsx")
  const aboutLayout = read("app/(site)/about/layout.tsx")
  const css = read("app/globals.css")

  assert.match(home, /\\/hero-home\\.webp/)
  assert.match(aboutLayout, /background-image:\\s*url\\("\\/about\\/hero-image"\\)\\s*!important/)
  assert.doesNotMatch(css, /background-image:\\s*url\\(["']?\\/about\\//)
})`

const oldSemantic = `test("About semantic photo surfaces override the legacy low-resolution atlas with cover images", () => {
  const css = read("app/globals.css")

  assert.match(css, /aria-label="Cambodian coffee at origin"/)
  assert.match(css, /aria-label="Cambodian coffee origin and production"/)
  assert.match(css, /background-size:\\s*cover\\s*!important/)
  assert.match(css, /section\\[aria-label="OCC origin and commercial paths"\\]/)
})`

const newSemantic = `test("About semantic photo surfaces are route-owned instead of globally source-locked", () => {
  const about = read("components/templates/about-editorial-template.tsx")
  const aboutLayout = read("app/(site)/about/layout.tsx")
  const css = read("app/globals.css")

  assert.match(aboutLayout, /Cambodian coffee at origin/)
  assert.match(aboutLayout, /\\/about\\/hero-image/)
  assert.match(about, /aria-label="Cambodian coffee origin and production"/)
  assert.match(about, /bg-cover bg-center/)
  assert.match(about, /aria-label="OCC origin and commercial paths"/)
  assert.doesNotMatch(css, /background-image:\\s*url\\(["']?\\/about\\//)
})`

for (const [from, to] of [[oldLocalAssets, newLocalAssets], [oldSemantic, newSemantic]]) {
  if (!source.includes(from)) throw new Error(`Expected legacy test block not found: ${from.slice(0, 80)}`)
  source = source.replace(from, to)
}

fs.writeFileSync(file, source)
console.log('Patched only the two obsolete About image-source assertions; all other visual regression tests preserved.')
