import fs from 'node:fs'

const file = 'tests/occ-visual-system.test.mjs'
let source = fs.readFileSync(file, 'utf8')

function replaceNamedTest(name, replacement) {
  const marker = `test("${name}", () => {`
  const start = source.indexOf(marker)
  if (start === -1) throw new Error(`Legacy test not found: ${name}`)

  const nextTest = source.indexOf('\ntest("', start + marker.length)
  const end = nextTest === -1 ? source.length : nextTest + 1
  source = `${source.slice(0, start)}${replacement}\n\n${source.slice(end)}`
}

replaceNamedTest(
  'homepage and About use local photo-led assets',
  `test("homepage keeps its dedicated hero while About hero ownership is route-local", () => {
  const home = read("components/templates/home-template.tsx")
  const aboutLayout = read("app/(site)/about/layout.tsx")
  const css = read("app/globals.css")

  assert.match(home, /\\/hero-home\\.webp/)
  assert.match(aboutLayout, /background-image:\\s*url\\("\\/about\\/hero-image"\\)\\s*!important/)
  assert.doesNotMatch(css, /background-image:\\s*url\\(["']?\\/about\\//)
})`,
)

replaceNamedTest(
  'About semantic photo surfaces override the legacy low-resolution atlas with cover images',
  `test("About semantic photo surfaces are route-owned instead of globally source-locked", () => {
  const about = read("components/templates/about-editorial-template.tsx")
  const aboutLayout = read("app/(site)/about/layout.tsx")
  const css = read("app/globals.css")

  assert.match(aboutLayout, /Cambodian coffee at origin/)
  assert.match(aboutLayout, /\\/about\\/hero-image/)
  assert.match(about, /aria-label="Cambodian coffee origin and production"/)
  assert.match(about, /bg-cover bg-center/)
  assert.match(about, /aria-label="OCC origin and commercial paths"/)
  assert.doesNotMatch(css, /background-image:\\s*url\\(["']?\\/about\\//)
})`,
)

fs.writeFileSync(file, source)
console.log('Patched only the two obsolete About image-source assertions; all other visual regression tests preserved.')
