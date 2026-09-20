import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const read = (p) => fs.readFileSync(p, "utf8")
const indexTemplate = "components/templates/solutions-index-template.tsx"
const detailTemplate = "components/templates/solution-detail-template.tsx"
const commercialTemplate = "components/templates/commercial-solution-template.tsx"
const sharedTemplate = "components/templates/occ-commercial-html-layout.tsx"
const sharedCss = "components/templates/occ-commercial-html-layout.css"
const wholesaleTemplate = "app/(site)/solutions/wholesale/WholesaleApprovedLayout.tsx"
const localMarketTemplate = "components/templates/local-market-solution-template.tsx"
const detailPages = ["wholesale", "roasting-program", "coffee-marketing", "equipment-service"]
const wholesale = read("app/(site)/solutions/wholesale/page.tsx") + "\n" + read(wholesaleTemplate)
const roasting = read("app/(site)/solutions/roasting-program/page.tsx")

test("SOLUTIONS index and detail pages retain OCC editorial navigation conventions", () => {
  for (const p of [indexTemplate, detailTemplate, localMarketTemplate, sharedTemplate, sharedCss, wholesaleTemplate]) assert.equal(fs.existsSync(p), true)
  const index = read("app/(site)/solutions/page.tsx")
  const indexUi = read(indexTemplate)
  assert.match(index, /SolutionsIndexTemplate/)
  assert.doesNotMatch(index, /border-dashed|Equipment Service|\/solutions\/equipment-service/)
  assert.doesNotMatch(indexUi, /Equipment Service|\bEquipment\b/)
  for (const slug of detailPages) {
    const source = read(`app/(site)/solutions/${slug}/page.tsx`)
    assert.doesNotMatch(source, /<nav className=|sticky top-0/)
  }
})

test("Wholesale and Roasting use the same exact HTML template; other routes retain their own", () => {
  const marketing = read("app/(site)/solutions/coffee-marketing/page.tsx")
  const equipment = read("app/(site)/solutions/equipment-service/page.tsx")
  const commercial = read(commercialTemplate)
  const shared = read(sharedTemplate)
  const local = read(localMarketTemplate)
  assert.match(wholesale, /WholesaleApprovedLayout|OccCommercialHtmlLayout/)
  assert.match(roasting, /OccCommercialHtmlLayout/)
  assert.doesNotMatch(roasting, /CommercialSolutionTemplate|SolutionDetailTemplate/)
  assert.doesNotMatch(wholesale, /WholesaleEditorialTemplate|CommercialSolutionTemplate|SolutionDetailTemplate/)
  assert.match(marketing, /LocalMarketSolutionTemplate/)
  assert.match(equipment, /SolutionDetailTemplate/)
  for (const token of [/className="hero"/, /className="split-section"/, /className="media-grid"/, /className="feature-band"/, /className="b2b-cta"/]) assert.match(shared, token)
  for (const token of [/highlightCards/, /processSteps/, /comparison/, /sticky top-28/, /MotionReveal/]) assert.match(commercial, token)
  for (const token of [/highlightCards/, /processSteps/, /supportCards/, /sticky top-28/, /MotionReveal/]) assert.match(local, token)
})

test("commercial headings and intent remain separate on the two shared-layout pages", () => {
  for (const token of [/WHOLESALE COFFEE SUPPLY/, /Cambodian Fine Robusta/, /Roasted Coffee/, /\/solutions\/roasting-program/]) assert.match(wholesale, token)
  assert.doesNotMatch(wholesale, /green[ -]?coffee|distribution supply|\bdistributor(?:s)?\b|\bimporter(?:s)?\b/i)
  for (const token of [/The Roast Starts With the Market/, /Roasting Supplier/, /Custom Roasting/, /Roast Profile/, /\/solutions\/wholesale/, /Made-for-You/]) assert.match(roasting, token)
  for (const source of [wholesale, roasting]) assert.doesNotMatch(source, /Who This Is For|Who This Program Is For|Barista Staffing|Equipment Service|\/solutions\/barista-staffing|\/solutions\/equipment-service/)
})

test("mobile hierarchy and buyer links remain explicit", () => {
  const css = read(sharedCss)
  const shared = read(sharedTemplate)
  for (const token of [/font-size:clamp\(58px,6vw,88px\)/, /grid-template-columns:minmax\(0,1\.02fr\) minmax\(360px,\.98fr\)/, /grid-template-columns:\.7fr 1\.3fr/, /grid-template-columns:1fr 1\.2fr/, /@media\(max-width:720px\)/]) assert.match(css, token)
  assert.match(shared, /heroCtaHref|ctaHref/)
  for (const token of [/Fine Robusta/, /Roasting Program/, /coffee-buyer-specification-template/, /Discuss Wholesale Supply/, /\/contact/]) assert.match(wholesale, token)
  for (const token of [/\/solutions\/wholesale/, /Fine Robusta/, /Develop Your Roast Profile/, /Discuss Wholesale Supply/, /\/contact/]) assert.match(roasting, token)
})

test("coffee marketing retains editorial hierarchy and appropriate internal links", () => {
  const page = read("app/(site)/solutions/coffee-marketing/page.tsx")
  const template = read(localMarketTemplate)
  for (const token of [/COFFEE MARKETING/, /CAMBODIAN MARKET|LocalMarketSolutionTemplate/, /A Beautiful Café Needs a Memorable Product/, /A Signature Drink Creates a Reason to Return/, /From Menu Review to Signature Launch/, /Design Your Signature Drink/, /pageAlternates\("\/solutions\/coffee-marketing"\)/, /\/solutions\/wholesale/, /\/solutions\/roasting-program/, /\/fine-robusta-cambodia/]) assert.match(page, token)
  for (const token of [/text-\[11px\].*font-semibold.*tracking-\[0\.22em\]/, /text-\[clamp\(2\.1rem,7\.5vw,3\.2rem\)\]/, /max-w-\[13ch\]/, /max-w-\[34rem\]/]) assert.match(template, token)
})

test("legacy staffing URL 301 redirects to Coffee Marketing", () => {
  const proxy = read("proxy.ts"), nav = read("components/site/navigation-data.ts"), sitemap = read("app/sitemap.ts")
  assert.match(proxy, /"\/solutions\/barista-staffing"\s*:\s*\n?\s*"\/solutions\/coffee-marketing"/)
  assert.match(proxy, /NextResponse\.redirect\(url, 301\)/)
  assert.doesNotMatch(nav, /\/solutions\/barista-staffing/)
  assert.match(nav, /\/solutions\/coffee-marketing/)
  assert.doesNotMatch(sitemap, /\/solutions\/barista-staffing/)
  assert.match(sitemap, /\/solutions\/coffee-marketing/)
})

test("equipment route remains preserved for SEO but hidden from active solution entry points", () => {
  assert.equal(fs.existsSync("app/(site)/solutions/equipment-service/page.tsx"), true)
  assert.doesNotMatch(read("app/(site)/solutions/page.tsx") + read(indexTemplate) + wholesale, /\/solutions\/equipment-service/)
})

test("blog auto-linking does not expose hidden equipment service", () => {
  const body = read("app/(site)/blog/[slug]/page.tsx")
  assert.doesNotMatch(body, /["']equipment service["']\s*:\s*["']\/solutions\/equipment-service["']/i)
  assert.doesNotMatch(body, /["']equipment["']\s*:\s*["']\/solutions\/equipment-service["']/i)
})

test("templates remain server-rendered and other pages keep reduced-motion reveal", () => {
  for (const path of [detailTemplate, commercialTemplate, sharedTemplate, wholesaleTemplate, localMarketTemplate]) assert.doesNotMatch(read(path), /^"use client"/)
  for (const path of [detailTemplate, commercialTemplate, localMarketTemplate]) assert.match(read(path), /MotionReveal/)
  assert.match(read(sharedTemplate), /occ-commercial-html/)
  const reveal = read("components/ui/motion-reveal.tsx")
  assert.match(reveal, /useReducedMotion/)
  assert.match(reveal, /0\.22, 1, 0\.36, 1/)
})

test("solution pages retain schemas, stable canonicals and link hygiene without unverified Offer", () => {
  for (const slug of detailPages) {
    const source = read(`app/(site)/solutions/${slug}/page.tsx`)
    assert.doesNotMatch(source, /"@type"\s*:\s*"Service"|"@type"\s*:\s*"Offer"/)
    assert.match(source, /"@type": "FAQPage"/)
    assert.match(source, /"@type": "BreadcrumbList"/)
  }
  const marketing = read("app/(site)/solutions/coffee-marketing/page.tsx")
  const equipment = read("app/(site)/solutions/equipment-service/page.tsx")
  assert.match(marketing, /relatedLinks=|\/solutions\/wholesale/)
  assert.match(marketing, /\/solutions\/roasting-program/)
  assert.match(equipment, /renderWithLinks/)
  const index = read("app/(site)/solutions/page.tsx")
  assert.match(index, /"@type": "CollectionPage"/)
  assert.match(index, /B2B/i)
  assert.match(index, /evidence-led/i)
})

test("commercial analytics retain wholesale-to-contact conversion events", () => {
  const analytics = read("components/GoogleAnalytics.tsx"), contact = read("app/(site)/contact/ContactForm.tsx"), config = read("next.config.mjs")
  for (const event of ["occ_404", "wholesale_view", "contact_view", "contact_click", "whatsapp_click", "email_click"]) assert.match(analytics, new RegExp(event))
  assert.match(analytics, /page_path/)
  assert.match(contact, /generate_lead/)
  assert.match(contact, /lead_type/)
  assert.match(config, /\/blog\/cambodian-coffee-origin-guide|\/blog\/cambodia-coffee/)
})
