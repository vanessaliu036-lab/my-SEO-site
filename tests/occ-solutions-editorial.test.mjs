import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const read = (path) => fs.readFileSync(path, "utf8")
const indexTemplate = "components/templates/solutions-index-template.tsx"
const detailTemplate = "components/templates/solution-detail-template.tsx"
const commercialTemplate = "components/templates/commercial-solution-template.tsx"
const wholesaleTemplate = "components/templates/wholesale-editorial-template.tsx"
const localMarketTemplate = "components/templates/local-market-solution-template.tsx"
const detailPages = ["wholesale", "roasting-program", "coffee-marketing", "equipment-service"]

test("SOLUTIONS index and detail pages keep the OCC editorial system", () => {
  assert.equal(fs.existsSync(indexTemplate), true, "solutions index template must exist")
  assert.equal(fs.existsSync(detailTemplate), true, "legacy solution detail template must exist")
  assert.equal(fs.existsSync(localMarketTemplate), true, "local market solution template must exist")

  const index = read("app/(site)/solutions/page.tsx")
  const indexUi = read(indexTemplate)
  assert.match(index, /SolutionsIndexTemplate/)
  assert.doesNotMatch(index, /border-dashed/)
  assert.doesNotMatch(index, /Equipment Service/)
  assert.doesNotMatch(index, /\/solutions\/equipment-service/)
  assert.doesNotMatch(indexUi, /Equipment Service/)
  assert.doesNotMatch(indexUi, /\bEquipment\b/)

  for (const slug of detailPages) {
    const source = read(`app/(site)/solutions/${slug}/page.tsx`)
    assert.doesNotMatch(source, /<nav className=/)
    assert.doesNotMatch(source, /sticky top-0/)
  }
})

test("commercial and local-market solution pages use dedicated editorial templates", () => {
  assert.equal(fs.existsSync(commercialTemplate), true, "commercial solution template must exist")
  assert.equal(fs.existsSync(wholesaleTemplate), true, "wholesale editorial template must exist")
  assert.equal(fs.existsSync(localMarketTemplate), true, "local market solution template must exist")
  const wholesale = read("app/(site)/solutions/wholesale/page.tsx")
  const roasting = read("app/(site)/solutions/roasting-program/page.tsx")
  const marketing = read("app/(site)/solutions/coffee-marketing/page.tsx")
  const equipment = read("app/(site)/solutions/equipment-service/page.tsx")
  const commercial = read(commercialTemplate)
  const wholesaleUi = read(wholesaleTemplate)
  const local = read(localMarketTemplate)

  assert.match(wholesale, /WholesaleEditorialTemplate/)
  assert.match(roasting, /CommercialSolutionTemplate/)
  assert.doesNotMatch(wholesale, /SolutionDetailTemplate/)
  assert.doesNotMatch(roasting, /SolutionDetailTemplate/)
  assert.match(marketing, /LocalMarketSolutionTemplate/)
  assert.doesNotMatch(marketing, /SolutionDetailTemplate/)
  assert.match(equipment, /SolutionDetailTemplate/)

  assert.match(wholesaleUi, /highlightCards/)
  assert.match(wholesaleUi, /processSteps/)
  assert.match(wholesaleUi, /comparison/)
  assert.match(wholesaleUi, /MotionReveal/)
  assert.match(commercial, /highlightCards/)
  assert.match(commercial, /processSteps/)
  assert.match(commercial, /comparison/)
  assert.match(commercial, /sticky top-28/)
  assert.match(commercial, /MotionReveal/)

  assert.match(local, /highlightCards/)
  assert.match(local, /processSteps/)
  assert.match(local, /supportCards/)
  assert.match(local, /sticky top-28/)
  assert.match(local, /MotionReveal/)
})

test("commercial headings are declarative and route supplier vs roasting intent cleanly", () => {
  const wholesale = read("app/(site)/solutions/wholesale/page.tsx")
  const roasting = read("app/(site)/solutions/roasting-program/page.tsx")

  assert.match(wholesale, /From Origin to Market/)
  assert.match(wholesale, /Ready-to-Sell/)
  assert.match(wholesale, /Coffee Supplier/)
  assert.match(wholesale, /Fine Robusta Supplier/)
  assert.match(wholesale, /Wholesale Supplier/)
  assert.match(wholesale, /\/solutions\/roasting-program/)

  assert.match(roasting, /The Roast Starts With the Market/)
  assert.match(roasting, /Made-for-You/)
  assert.match(roasting, /Roasting Supplier/)
  assert.match(roasting, /Custom Roasting/)
  assert.match(roasting, /Roast Profile/)
  assert.match(roasting, /\/solutions\/wholesale/)

  for (const source of [wholesale, roasting]) {
    assert.doesNotMatch(source, /Who This Is For|Who This Program Is For/)
    assert.doesNotMatch(source, /Barista Staffing|Equipment Service/)
    assert.doesNotMatch(source, /\/solutions\/barista-staffing|\/solutions\/equipment-service/)
  }
})

test("commercial mobile hierarchy and internal links are explicit", () => {
  const wholesale = read("app/(site)/solutions/wholesale/page.tsx")
  const roasting = read("app/(site)/solutions/roasting-program/page.tsx")
  const template = read(commercialTemplate)

  assert.match(template, /text-\[11px\].*font-semibold.*tracking-\[0\.22em\]/)
  assert.match(template, /w-10 h-px bg-\[#a8542a\]/)
  assert.match(template, /text-\[clamp\(2\.1rem,7\.5vw,3\.2rem\)\]/)
  assert.match(template, /max-w-\[13ch\]/)
  assert.match(template, /max-w-\[34rem\]/)
  assert.match(template, /relatedLinksTitle/)
  assert.match(template, /relatedLinks/)
  assert.match(template, /nextPath/)

  assert.match(wholesale, /relatedLinksTitle="Related References"/)
  assert.match(wholesale, /Fine Robusta Cambodia/)
  assert.match(wholesale, /Custom Roasting Program/)
  assert.match(wholesale, /nextPath=/)
  assert.match(wholesale, /Develop Your Roast Profile/)

  assert.match(roasting, /relatedLinksTitle="Related Paths"/)
  assert.match(roasting, /Wholesale Coffee Supply/)
  assert.match(roasting, /Fine Robusta Cambodia/)
  assert.match(roasting, /nextPath=/)
  assert.match(roasting, /Discuss Wholesale Supply/)
})

test("coffee marketing page matches OCC editorial hierarchy and keeps explicit internal paths", () => {
  const page = read("app/(site)/solutions/coffee-marketing/page.tsx")
  const template = read(localMarketTemplate)

  assert.match(page, /COFFEE MARKETING/)
  assert.match(page, /CAMBODIAN MARKET|LocalMarketSolutionTemplate/)
  assert.match(page, /A Beautiful Café Needs a Memorable Product/)
  assert.match(page, /A Signature Drink Creates a Reason to Return/)
  assert.match(page, /From Menu Review to Signature Launch/)
  assert.match(page, /Design Your Signature Drink/)
  assert.match(page, /pageAlternates\("\/solutions\/coffee-marketing"\)/)
  assert.match(page, /\/solutions\/wholesale/)
  assert.match(page, /\/solutions\/roasting-program/)
  assert.match(page, /\/fine-robusta-cambodia/)

  assert.match(template, /text-\[11px\].*font-semibold.*tracking-\[0\.22em\]/)
  assert.match(template, /text-\[clamp\(2\.1rem,7\.5vw,3\.2rem\)\]/)
  assert.match(template, /max-w-\[13ch\]/)
  assert.match(template, /max-w-\[34rem\]/)
})

test("legacy barista staffing URL 301s to the Coffee Marketing owner", () => {
  const proxy = read("proxy.ts")
  const navigation = read("components/site/navigation-data.ts")
  const sitemap = read("app/sitemap.ts")

  assert.match(proxy, /"\/solutions\/barista-staffing"\s*:\s*\n?\s*"\/solutions\/coffee-marketing"/)
  assert.match(proxy, /NextResponse\.redirect\(url, 301\)/)
  assert.doesNotMatch(navigation, /\/solutions\/barista-staffing/)
  assert.match(navigation, /\/solutions\/coffee-marketing/)
  assert.doesNotMatch(sitemap, /\/solutions\/barista-staffing/)
  assert.match(sitemap, /\/solutions\/coffee-marketing/)
})

test("equipment service route is preserved for SEO but removed from public solution entry points", () => {
  assert.equal(fs.existsSync("app/(site)/solutions/equipment-service/page.tsx"), true)
  const index = read("app/(site)/solutions/page.tsx")
  const indexUi = read(indexTemplate)
  const wholesale = read("app/(site)/solutions/wholesale/page.tsx")
  assert.doesNotMatch(index, /\/solutions\/equipment-service/)
  assert.doesNotMatch(indexUi, /\/solutions\/equipment-service/)
  assert.doesNotMatch(wholesale, /\/solutions\/equipment-service/)
})

test("blog body auto-linking does not expose the hidden equipment service route", () => {
  const blogDetail = read("app/(site)/blog/[slug]/page.tsx")
  assert.doesNotMatch(blogDetail, /["']equipment service["']\s*:\s*["']\/solutions\/equipment-service["']/i)
  assert.doesNotMatch(blogDetail, /["']equipment["']\s*:\s*["']\/solutions\/equipment-service["']/i)
})

test("solution templates keep semantic content server-rendered and use restrained reveal motion", () => {
  const legacy = read(detailTemplate)
  const commercial = read(commercialTemplate)
  const wholesale = read(wholesaleTemplate)
  const local = read(localMarketTemplate)
  const reveal = read("components/ui/motion-reveal.tsx")

  assert.doesNotMatch(legacy, /^"use client"/)
  assert.doesNotMatch(commercial, /^"use client"/)
  assert.doesNotMatch(wholesale, /^"use client"/)
  assert.doesNotMatch(local, /^"use client"/)
  assert.match(legacy, /MotionReveal/)
  assert.match(commercial, /MotionReveal/)
  assert.match(wholesale, /MotionReveal/)
  assert.match(local, /MotionReveal/)
  assert.match(reveal, /useReducedMotion/)
  assert.match(reveal, /0\.22, 1, 0\.36, 1/)
})

test("solution pages preserve schemas and explicit internal-link logic without unverified Service schema", () => {
  for (const slug of detailPages) {
    const source = read(`app/(site)/solutions/${slug}/page.tsx`)
    assert.doesNotMatch(source, /"@type"\s*:\s*"Service"/)
    assert.doesNotMatch(source, /"@type"\s*:\s*"Offer"/)
    assert.match(source, /"@type": "FAQPage"/)
    assert.match(source, /"@type": "BreadcrumbList"/)
  }

  const marketing = read("app/(site)/solutions/coffee-marketing/page.tsx")
  const equipment = read("app/(site)/solutions/equipment-service/page.tsx")
  assert.match(marketing, /relatedLinks=/)
  assert.match(marketing, /\/solutions\/wholesale/)
  assert.match(marketing, /\/solutions\/roasting-program/)
  assert.match(equipment, /renderWithLinks/)

  const index = read("app/(site)/solutions/page.tsx")
  assert.match(index, /"@type": "CollectionPage"/)
  assert.match(index, /B2B/i)
  assert.match(index, /evidence-led/i)
})

test("commercial analytics records the wholesale-to-contact funnel and exact 404 paths", () => {
  const analytics = read("components/GoogleAnalytics.tsx")
  const contact = read("app/(site)/contact/ContactForm.tsx")
  const config = read("next.config.mjs")

  for (const eventName of ["occ_404", "wholesale_view", "contact_view", "contact_click", "whatsapp_click", "email_click"]) {
    assert.match(analytics, new RegExp(eventName), `${eventName} analytics event must be present`)
  }
  assert.match(analytics, /page_path/)
  assert.match(contact, /generate_lead/)
  assert.match(contact, /lead_type/)
  assert.match(config, /\/blog\/cambodian-coffee-origin-guide/)
  assert.match(config, /\/blog\/cambodia-coffee/)
})
