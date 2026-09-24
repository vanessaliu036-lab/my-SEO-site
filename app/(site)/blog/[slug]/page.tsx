import { notFound } from "next/navigation"
import Link from "next/link"
import { Suspense } from "react"
import type { Metadata } from "next"
import { siteUrl, siteName } from "@/lib/siteConfig"
import { alternatesFromCanonical, seoDescription, seoTitle } from "@/lib/seo"
import { publisherLogoImageObject } from "@/lib/organizationSchema"
import { getPostBySlug, getRecentPosts } from "@/lib/airtable"

// Plain-text / Markdown -> readable HTML with internal links injected
const INTERNAL_LINKS: Record<string, string> = {
  "wholesale coffee": "/solutions/wholesale",
  "wholesale": "/solutions/wholesale",
  "custom roasting": "/solutions/roasting-program",
  "roast profile": "/solutions/roasting-program",
  "roasting program": "/solutions/roasting-program",
  "barista staffing": "/contact",
  "barista": "/contact",
}

const ROBUSTA_PILLAR_HREF = "/fine-robusta-cambodia"
const ROBUSTA_CLUSTER_SLUGS = new Set([
  "what-is-specialty-robusta-coffee-complete-guide",
  "what-makes-fine-robusta",
  "fine-robusta-grading-standards-cqi-certification-for-cambodia",
  "evaluating-fine-robusta-suppliers-key-technical-standards-for-quality-assurance",
  "fine-robusta-vs-arabica-buyer-guide",
  "fine-robusta-post-harvest-quality",
  "robusta-vs-arabica-processing",
  "is-coffee-industry-undervaluing-canephora-quality",
  "cambodian-robusta-vs-vietnamese-robusta",
  "what-makes-mondulkiri-robusta-different",
  "could-mondulkiri-reference-origin-fine-robusta-asia",
  "mondulkiri-coffee-processing-facility",
  "how-to-verify-mondulkiri-coffee-origin",
  "cambodia-coffee-selective-harvesting",
  "farmer-payment-structure-coffee-quality",
  "mondulkiri-coffee-cherry-price",
  "700-tonnes-mondulkiri-coffee-purchase",
  "cambodia-coffee-production-vs-consumption",
  "why-cambodia-imports-coffee",
  "could-cambodia-replace-10-percent-coffee-imports",
  "cambodia-coffee-industry-2030-fine-robusta-scenario",
  "sample-cambodian-coffee-before-buying-lot",
  "roaster-checklist-buying-cambodian-green-coffee",
  "coffee-contract-quality-tolerances-fine-robusta",
  "green-coffee-purchase-contract-checklist-roasters",
  "offer-vs-pre-shipment-vs-arrival-coffee-sample",
  "how-many-green-coffee-samples-before-approving-lot",
  "green-coffee-arrival-inspection-checklist",
  "green-coffee-shipment-fails-arrival-qc",
  "why-great-coffee-sample-fails-commercial-scale",
  "why-green-coffee-moisture-consistency-matters",
  "why-coffee-origins-need-lot-codes-before-blockchain",
  "what-creates-fine-robusta-price-premium",
  "fine-robusta-price-score-traceability-consistency",
  "fine-robusta-consistency-vs-extra-cup-point",
  "fine-robusta-premium-espresso-milk-single-origin",
  "risk-growing-cambodia-fine-robusta-too-fast",
  "navigating-the-cambodian-coffee-market-a-guide-for-international-wholesale-buyers",
  "understanding-technical-specifications-what-wholesale-buyers-need-to-know-about-cambodian-coffee",
  "cambodia-specialty-coffee-wholesale-buyer-checklist",
])
const ROBUSTA_PILLAR_ANCHORS = [
  "Fine Robusta Cambodia guide",
  "Fine Robusta from Cambodia",
  "Cambodia Fine Robusta quality guide",
  "Fine Robusta sourcing in Cambodia",
  "Cambodia Fine Robusta buyer guide",
]

// Keep legacy URLs live, but narrow their visible search target so broad intent
// remains concentrated on the formal owner pages.
const ARTICLE_TITLE_OVERRIDES: Record<string, string> = {
  "what-is-fine-robusta-coffee-a-complete-beginners-guide": "Cambodian Fine Robusta Buyer Guide: Quality, Lots & Sourcing",
  "fine-robusta-coffee-a-flavor-revolution-in-every-cup": "Fine Robusta Flavor Profiles: What Changes the Cup",
  "what-makes-fine-robusta": "What Makes Fine Robusta? Quality Evidence & Evaluation",
  "cambodian-fine-robusta-wholesale-supply": "Cambodian Fine Robusta Wholesale Supply for Buyers",
  "sensory-evaluation-of-fine-robusta-flavour-aroma-body-and-beyond": "Sensory Evaluation of Fine Robusta: Flavor, Aroma & Body",
  "what-makes-coffee-origin-feel-premium": "What Makes a Coffee Origin Feel Premium? Evidence Beyond Processing",
  "how-to-brew-fine-robusta-a-complete-guide-to-unlocking-bold-flavors": "Fine Robusta Brew Variables: Ratio, Temperature & Extraction",
  "fine-robusta-premium-espresso-milk-single-origin": "Espresso & Milk: Matching Coffee Use to Roast and Extraction",
  "what-is-specialty-robusta-coffee-complete-guide": "Specialty Robusta: Category Definitions and Evaluation Context",
  "coffea-canephora-cambodia": "Coffea canephora in Cambodia: Species and Origin Context",
  "uganda-fine-robusta-an-emerging-origin": "Uganda Fine Robusta: An Emerging Origin Case Study",
  "is-cambodian-coffee-grown-in-cambodia": "Is Cambodian Coffee Grown in Cambodia? Evidence and Limits",
  "fine-robusta-grading-standards-cqi-certification-for-cambodia": "CQI Robusta Certification in Cambodia: Reading a Historical Record",
  "how-the-coffee-quality-institute-grades-fine-robusta": "How to Read a Q Robusta Evaluation Record",
  "how-fine-robusta-coffee-is-graded-cup-score-explained": "How to Read a Fine Robusta Cup Score",
  "why-fermentation-changes-coffee-flavor": "Why Fermentation Changes Coffee Flavor: A Mechanism Guide",
  "how-fermentation-affects-coffee-quality": "How Fermentation Affects Coffee Quality: Mechanisms and Controls",
  "specialty-robusta-vs-arabica-honest-comparison": "Robusta vs Arabica Myths: What the Comparison Leaves Out",
  "arabica-vs-fine-robusta-quality-flavor-and-price": "Arabica vs Fine Robusta: Quality Factors Beyond a Score",
  "arabica-vs-fine-robusta-which-coffee-is-better-for-you": "Choosing Coffee by Use: When Arabica or Fine Robusta Fits",
}

function displayTitleForPost(slug: string, title: string): string {
  return ARTICLE_TITLE_OVERRIDES[slug] || title
}

const SEO_CONTENT_EXPANSIONS: Record<string, {
  label: string
  title: string
  intro: string
  points: string[]
  links: Array<{ href: string; label: string }>
}> = {
  "cambodia-coffee-production-vs-consumption": {
    label: "2026 context",
    title: "How to read Cambodia’s production and consumption gap",
    intro:
      "Production, domestic consumption, imports, and export potential answer different questions. For Cambodia, the useful buyer interpretation is not a single headline number, but whether local production can be identified, processed consistently, and matched to a repeatable commercial use.",
    points: [
      "Separate farm-level production estimates from roasted-coffee retail demand and imported coffee products.",
      "Treat annual production figures as time-bound estimates; methodology, harvest conditions, and reporting coverage can change the total materially.",
      "For buyers, the practical question is how much traceable coffee is available by origin, process, quality specification, and delivery window—not national production alone.",
      "Import dependence does not mean local coffee lacks value. It means Cambodia’s domestic market and its origin-based specialty supply should be evaluated as separate layers.",
    ],
    links: [
      { href: "/origins", label: "Explore Cambodia coffee origins" },
      { href: "/solutions/wholesale", label: "Wholesale & sourcing for buyers" },
    ],
  },
  "cambodia-coffee-industry-guide-2026-from-colonial-roots-to-global-recognition": {
    label: "Buyer perspective",
    title: "What matters now in Cambodia’s coffee industry",
    intro:
      "For professional buyers, Cambodia’s opportunity is less about competing on commodity scale and more about building verifiable origin, processing discipline, roast fit, and repeatable supply around specific coffees.",
    points: [
      "Mondulkiri and Ratanakiri should be treated as origin contexts, not automatic quality grades.",
      "Fine Robusta claims are strongest when tied to an identifiable sample, lot, process, evaluation context, and current availability.",
      "Growth in cafés and consumer interest does not automatically translate into export-ready supply; quality control, lot identity, logistics, and documentation remain separate requirements.",
      "OCC’s commercial role is to connect origin evidence with sourcing, wholesale supply, roast development, and buyer communication rather than treating editorial visibility as proof of inventory.",
    ],
    links: [
      { href: "/fine-robusta-cambodia", label: "Fine Robusta Cambodia pillar" },
      { href: "/solutions/roasting-program", label: "Custom roasting in Cambodia" },
      { href: "/solutions/wholesale", label: "Cambodian coffee wholesale" },
    ],
  },
  "the-origins-of-q-coffee-and-the-coffee-quality-institute": {
    label: "Evaluation context",
    title: "How to use CQI and Q Coffee references responsibly",
    intro:
      "CQI and Q-program records are useful evidence when they are read in context. A historic score or certification can document what was evaluated at a specific time, but it should not be stretched into a permanent quality claim for an origin, producer, or future commercial lot.",
    points: [
      "Check the evaluation date, program or protocol, sample identity, and any available lot information before comparing scores.",
      "Distinguish a certified or evaluated sample from the coffee that is currently being offered for sale.",
      "Use sensory scores together with physical condition, processing, traceability, storage, and sample representativeness.",
      "For Cambodian Fine Robusta, historical CQI evidence is best used as proof of demonstrated potential—not as a blanket claim that every Cambodian Robusta meets the same level.",
    ],
    links: [
      { href: "/blog/fine-robusta-grading-verify-before-cupping", label: "Fine Robusta grading & verification guide" },
      { href: "/fine-robusta-cambodia", label: "Fine Robusta Cambodia" },
    ],
  },
  "best-cambodian-coffee-to-buy-2026": {
    label: "Selection guide",
    title: "How to choose Cambodian coffee by use, not hype",
    intro:
      "The best Cambodian coffee depends on what you want to do with it. A gift buyer, filter-coffee drinker, espresso bar, hotel, and wholesale buyer do not need the same roast, format, evidence, or supply conditions.",
    points: [
      "For filter brewing, prioritize roast freshness, origin clarity, and tasting information that is specific to the coffee you are buying.",
      "For espresso and milk drinks, evaluate body, sweetness, roast development, extraction behavior, and whether the coffee performs consistently in service.",
      "For gifts, packaging and story matter, but origin and product claims should still be clear enough to understand what is actually inside.",
      "For professional sourcing, move beyond tasting notes to lot identity, process, sample representativeness, quality specifications, availability, and repeatability.",
    ],
    links: [
      { href: "/origins", label: "Cambodia coffee origins" },
      { href: "/fine-robusta-cambodia", label: "Understand Fine Robusta Cambodia" },
      { href: "/solutions/wholesale", label: "Wholesale sourcing" },
    ],
  },
  "what-cambodian-coffee-should-you-try-first": {
    label: "Start here",
    title: "A simple first-cup decision framework",
    intro:
      "Instead of asking for one universal ‘best’ Cambodian coffee, start with brew method and flavor preference. That produces a more useful first choice and keeps origin, roast, and quality claims in the right context.",
    points: [
      "Choose filter first if you want to compare aroma, acidity, sweetness, and processing character with less influence from milk.",
      "Choose espresso if you want to understand body, concentration, crema, and how the coffee performs under pressure.",
      "Choose a named Cambodian origin when traceability matters more than a broad national label.",
      "Choose Fine Robusta when you specifically want to explore quality-focused Canephora; do not assume every Cambodian Robusta represents that category.",
    ],
    links: [
      { href: "/fine-robusta-cambodia", label: "Fine Robusta Cambodia guide" },
      { href: "/origins/cambodia-regions", label: "Cambodia coffee regions" },
    ],
  },
  "specialty-robusta-espresso-blend-guide": {
    label: "Espresso application",
    title: "What Fine Robusta can contribute to an espresso blend",
    intro:
      "Robusta in espresso should be evaluated by function rather than stereotype. Quality-focused Canephora can contribute body, crema, intensity, and flavor structure, but the useful percentage depends on the coffee, roast, grinder, recipe, milk format, and target cup.",
    points: [
      "Evaluate the Robusta component separately before blending so defects or roast problems are not hidden by the blend.",
      "Use blend percentage as a development variable, not a universal recipe; small changes can materially affect body, bitterness, sweetness, and finish.",
      "Cup and dial in the final roasted blend under the actual service recipe, especially when milk drinks are the main use.",
      "For commercial programs, consistency between lots matters as much as the first successful blend trial.",
    ],
    links: [
      { href: "/fine-robusta-cambodia", label: "Fine Robusta Cambodia" },
      { href: "/solutions/roasting-program", label: "Roast profile development" },
      { href: "/solutions/wholesale", label: "Coffee supply for businesses" },
    ],
  },
  "cambodia-barista-training-infrastructure-certification": {
    label: "Industry application",
    title: "Training is infrastructure, not only certification",
    intro:
      "For Cambodia’s coffee sector, barista development is most useful when certification, practical service skills, sensory calibration, equipment discipline, and café operating standards reinforce one another.",
    points: [
      "A certificate can document training, but it does not replace repeated practice on the equipment and recipes used in a real café.",
      "Sensory vocabulary is more valuable when staff can connect it to grind, dose, yield, water, milk, and roast variables.",
      "For hospitality teams, consistency across shifts is usually a more commercial outcome than isolated technical knowledge.",
      "For buyers and coffee brands, training becomes part of quality assurance when product specifications and service recipes are taught together.",
    ],
    links: [
      { href: "/solutions/roasting-program", label: "Roast profile & service development" },
      { href: "/partnerships", label: "OCC partnerships" },
      { href: "/contact", label: "Discuss a professional coffee program" },
    ],
  },
  "when-ratanakiri-farmers-transform-cambodia-coffee-production-through-2027-sustainability-protocols": {
    label: "Evidence check",
    title: "How to read sustainability plans through 2027",
    intro:
      "Multi-year sustainability programs should be read as a combination of completed actions, current implementation, and future targets. Keeping those categories separate makes the article more useful to buyers and avoids turning planned outcomes into present-tense claims.",
    points: [
      "Label completed infrastructure, farmer support, or training separately from targets that are still scheduled for future seasons.",
      "Tie sustainability claims to the geography, participating farms, implementing organization, and reporting period where those details are available.",
      "For coffee quality, connect sustainability work to measurable production variables such as harvest selection, processing control, drying, storage, and traceability.",
      "For buyers, the commercial test remains whether improvements can be verified in representative samples and repeated lots.",
    ],
    links: [
      { href: "/origins/cambodia-regions", label: "Cambodia coffee regions" },
      { href: "/origins/farm-terroir", label: "Farm & terroir context" },
      { href: "/solutions/wholesale", label: "Wholesale sourcing" },
    ],
  },  "what-is-fine-robusta-coffee-a-complete-beginners-guide": {
    label: "Definition",
    title: "Fine Robusta: the category, the evidence, and the limit of the claim",
    intro:
      "Fine Robusta is most useful when it describes a quality-focused Canephora coffee that can be evaluated as a specific sample or lot. It should not be used as a shortcut for every Robusta from a country, region, or producer.",
    points: [
      "Separate species from quality: Coffea canephora is the species context; Fine Robusta is a quality claim that needs evidence.",
      "Treat origin as context, not proof. Cambodia or Mondulkiri can explain where a coffee comes from without guaranteeing its cup quality.",
      "Look for sample identity, process, physical condition, sensory evaluation, traceability, and repeatability before treating a claim as commercially useful.",
      "For buyers, the strongest Fine Robusta claim is the one that still holds when the offered lot, shipment, and repeat order are checked.",
    ],
    links: [
      { href: "/fine-robusta-cambodia", label: "Primary Fine Robusta Cambodia guide" },
      { href: "/blog/fine-robusta-grading-verify-before-cupping", label: "Grading & verification" },
    ],
  },
  "fine-robusta-coffee-a-flavor-revolution-in-every-cup": {
    label: "Flavor",
    title: "Why Fine Robusta flavor changes from lot to lot",
    intro:
      "There is no single Fine Robusta flavor profile. Variety, ripeness, fermentation, drying, storage, roast development, water, and extraction can all shift what appears in the cup.",
    points: [
      "Processing can change fruit expression, fermentation character, clarity, and perceived sweetness, but it cannot compensate for poor raw material.",
      "Roasting changes how acidity, bitterness, body, aromatics, and roast-derived flavors are expressed; tasting notes should be read in that context.",
      "Espresso, filter, and milk drinks reveal different parts of the same coffee, so flavor claims should name the brewing context where possible.",
      "A flavor description is strongest when it belongs to an identifiable sample or lot rather than to Robusta as a species.",
    ],
    links: [
      { href: "/fine-robusta-cambodia", label: "Fine Robusta Cambodia" },
      { href: "/blog/fine-robusta-fermentation", label: "Fine Robusta fermentation" },
      { href: "/blog/how-to-brew-cambodian-fine-robusta", label: "Brewing guide" },
    ],
  },
  "fine-robusta-grading-standards-cqi-certification-for-cambodia": {
    label: "Grading context",
    title: "What a grading record can—and cannot—prove",
    intro:
      "A grading or certification record is useful evidence for the sample that was evaluated under the stated protocol. It should not be expanded into a permanent claim for every harvest, every commercial lot, or every coffee from the same origin.",
    points: [
      "Verify the sample identity, evaluation date, protocol, evaluator context, and any linked lot or producer information.",
      "Keep sensory evaluation separate from physical preparation, moisture, defects, storage, and shipment condition; buyers need both.",
      "Historical CQI or Q Robusta records can establish demonstrated quality potential, but current commercial coffee still requires current verification.",
      "When standards or programs change, describe the historical record in the terminology that applied at the time instead of retrofitting a newer framework.",
    ],
    links: [
      { href: "/blog/fine-robusta-grading-verify-before-cupping", label: "Primary grading guide" },
      { href: "/fine-robusta-cambodia", label: "Fine Robusta Cambodia" },
    ],
  },
  "mondulkiri-next-specialty-coffee-origin": {
    label: "Origin",
    title: "What Mondulkiri can credibly claim as a coffee origin",
    intro:
      "Mondulkiri is one of Cambodia’s clearest contemporary coffee-origin stories, but its value is strongest when geography, farm conditions, processing, sample evidence, and commercial availability are kept separate rather than collapsed into one premium claim.",
    points: [
      "Use altitude, climate, farm observations, and processing infrastructure as origin context—not as automatic proof of a flavor profile or score.",
      "Distinguish province-wide storytelling from evidence tied to a named farm, producer, processor, or lot.",
      "A strong origin proposition needs repeatable post-harvest control and sample traceability, not only an attractive terroir narrative.",
      "For buyers, Mondulkiri becomes commercially meaningful when origin evidence connects to representative samples, specifications, volume, timing, and repeatability.",
    ],
    links: [
      { href: "/origins/cambodia-regions", label: "Cambodia coffee regions" },
      { href: "/origins/farm-terroir", label: "Farm & terroir" },
      { href: "/fine-robusta-cambodia", label: "Fine Robusta Cambodia" },
    ],
  },
  "cambodia-specialty-coffee-wholesale-buyer-checklist": {
    label: "Buyer checklist",
    title: "The minimum evidence to request before approving a lot",
    intro:
      "A wholesale decision should move from story to verification. Before approving Cambodian specialty coffee or Fine Robusta, buyers should confirm that the sample, specification, commercial lot, and delivery conditions refer to the same product.",
    points: [
      "Request origin, producer or processor where verified, harvest period, process, lot code, and sample identity.",
      "Confirm physical specifications such as moisture, defects, preparation, packaging, and storage condition where relevant.",
      "Ask whether the offer sample represents the actual commercial lot and how pre-shipment or arrival quality will be checked.",
      "Confirm available quantity, lead time, documentation, payment terms, and what happens if the received coffee falls outside agreed tolerances.",
    ],
    links: [
      { href: "/solutions/wholesale", label: "Wholesale & sourcing" },
      { href: "/resources/coffee-buyer-specification-template", label: "Buyer specification template" },
      { href: "/contact", label: "Request buyer information" },
    ],
  },
  "why-cambodia-imports-coffee": {
    label: "Market structure",
    title: "Why imports and local origin coffee can grow at the same time",
    intro:
      "Coffee imports do not automatically mean domestic production is failing. Cambodia can simultaneously import coffee for volume, price, blends, or established supply chains while developing a smaller origin-led segment based on identifiable Cambodian coffee.",
    points: [
      "Separate total beverage demand from the much smaller segment that specifically requires Cambodia-origin coffee.",
      "Imported coffee can fill consistency, price, volume, or product-format needs that local specialty lots are not designed to replace.",
      "Local value creation can still increase through better processing, roasting, hospitality use, retail products, and origin-led B2B supply.",
      "The realistic opportunity is targeted substitution where Cambodian coffee has a clear product fit—not assuming all imports are interchangeable with local production.",
    ],
    links: [
      { href: "/blog/cambodia-coffee-production-vs-consumption", label: "Production vs consumption" },
      { href: "/solutions/wholesale", label: "Cambodian coffee supply" },
    ],
  },
  "could-cambodia-replace-10-percent-coffee-imports": {
    label: "Scenario analysis",
    title: "What a 10% import-substitution scenario would actually require",
    intro:
      "Replacing a share of coffee imports is a scenario, not a forecast. The useful question is what production, processing, quality control, roast capacity, buyer demand, and logistics would have to be true for a defined share of imported coffee to be replaced by Cambodian supply.",
    points: [
      "Define the import category first: green coffee, roasted coffee, soluble coffee, or finished consumer products are not interchangeable.",
      "Convert the target percentage into an approximate volume before judging whether domestic production and processing could support it.",
      "Separate commodity substitution from premium origin substitution; the economics, quality requirements, and buyers are different.",
      "Measure success through repeat purchase, lot consistency, usable commercial volume, and buyer retention rather than a headline substitution percentage alone.",
    ],
    links: [
      { href: "/blog/why-cambodia-imports-coffee", label: "Why Cambodia imports coffee" },
      { href: "/blog/cambodia-coffee-production-vs-consumption", label: "Production vs consumption" },
      { href: "/solutions/wholesale", label: "Wholesale sourcing" },
    ],
  },
  "cambodia-coffee-industry-2030-fine-robusta-scenario": {
    label: "2030 scenario",
    title: "What would need to be true for a stronger Fine Robusta sector by 2030",
    intro:
      "A 2030 Fine Robusta scenario is most useful as a set of conditions to test rather than a prediction. Cambodia would need progress across farm practice, post-harvest processing, quality evaluation, lot identity, roasting, buyer development, and repeat commercial demand.",
    points: [
      "Farm-level quality improvement must connect to post-harvest controls that can be documented and repeated.",
      "More evaluation data is useful only when samples can be traced to the commercial lots buyers can actually purchase.",
      "Domestic roasters, cafés, hotels, and exporters can create demand signals that reward quality before export volume becomes large.",
      "International growth depends on credible buyer experience—samples, specifications, logistics, consistency, and repeat orders—not origin storytelling alone.",
    ],
    links: [
      { href: "/fine-robusta-cambodia", label: "Fine Robusta Cambodia pillar" },
      { href: "/partnerships", label: "OCC partnerships" },
      { href: "/solutions/wholesale", label: "Wholesale & sourcing" },
    ],
  },


}

const CONTEXTUAL_OWNER_LINKS: Record<string, { href: string; anchor: string; lead: string }> = {
  "what-is-fine-robusta-coffee-a-complete-beginners-guide": {
    href: ROBUSTA_PILLAR_HREF,
    anchor: "Fine Robusta Cambodia guide",
    lead: "For the primary Cambodia Fine Robusta definition and origin context, start with the",
  },
  "fine-robusta-coffee-a-flavor-revolution-in-every-cup": {
    href: ROBUSTA_PILLAR_HREF,
    anchor: "Fine Robusta Cambodia guide",
    lead: "For the central Cambodia origin and quality framework, start with the",
  },
  "what-makes-fine-robusta": {
    href: ROBUSTA_PILLAR_HREF,
    anchor: "Fine Robusta Cambodia guide",
    lead: "For OCC’s primary Cambodia Fine Robusta owner page, start with the",
  },
  "cambodian-fine-robusta-wholesale-supply": {
    href: ROBUSTA_PILLAR_HREF,
    anchor: "Fine Robusta Cambodia guide",
    lead: "For the broad origin and quality context, start with the",
  },
  "sensory-evaluation-of-fine-robusta-flavour-aroma-body-and-beyond": {
    href: ROBUSTA_PILLAR_HREF,
    anchor: "Fine Robusta Cambodia guide",
    lead: "For the central origin and quality context, see the",
  },
  "what-makes-coffee-origin-feel-premium": {
    href: ROBUSTA_PILLAR_HREF,
    anchor: "Fine Robusta Cambodia guide",
    lead: "For the Cambodia-specific quality context, see the",
  },
  "fine-robusta-premium-espresso-milk-single-origin": {
    href: ROBUSTA_PILLAR_HREF,
    anchor: "Fine Robusta Cambodia guide",
    lead: "For the broader origin and quality context, see the",
  },
  "what-is-specialty-robusta-coffee-complete-guide": {
    href: ROBUSTA_PILLAR_HREF,
    anchor: "Fine Robusta Cambodia guide",
    lead: "For the Cambodia-specific Fine Robusta context, see the",
  },
  "coffea-canephora-cambodia": {
    href: ROBUSTA_PILLAR_HREF,
    anchor: "Fine Robusta Cambodia guide",
    lead: "For the Cambodia origin and quality context, see the",
  },
  "uganda-fine-robusta-an-emerging-origin": {
    href: ROBUSTA_PILLAR_HREF,
    anchor: "Fine Robusta Cambodia guide",
    lead: "For the Cambodia-specific comparison point, see the",
  },
  "is-cambodian-coffee-grown-in-cambodia": {
    href: ROBUSTA_PILLAR_HREF,
    anchor: "Fine Robusta Cambodia guide",
    lead: "For the broader Fine Robusta origin guide, see the",
  },
  "fine-robusta-grading-standards-cqi-certification-for-cambodia": {
    href: "/blog/fine-robusta-grading-verify-before-cupping",
    anchor: "Fine Robusta grading guide",
    lead: "For the broad grading and verification framework, see the",
  },
  "how-the-coffee-quality-institute-grades-fine-robusta": {
    href: "/blog/fine-robusta-grading-verify-before-cupping",
    anchor: "Fine Robusta grading guide",
    lead: "For the broad grading and verification framework, see the",
  },
  "how-fine-robusta-coffee-is-graded-cup-score-explained": {
    href: "/blog/fine-robusta-grading-verify-before-cupping",
    anchor: "Fine Robusta grading guide",
    lead: "For the broad grading and verification framework, see the",
  },
  // Keep the mechanism article's scientific intent while passing broad fermentation
  // authority to the formal owner in the first rendered paragraph.
  "why-fermentation-changes-coffee-flavor": {
    href: "/blog/fine-robusta-fermentation",
    anchor: "Fine Robusta fermentation guide",
    lead: "For the broader process-control and quality context, see the",
  },
  "how-fermentation-affects-coffee-quality": {
    href: "/blog/fine-robusta-fermentation",
    anchor: "Fine Robusta fermentation guide",
    lead: "For the broader process-control and quality context, see the",
  },
  "how-to-brew-fine-robusta-a-complete-guide-to-unlocking-bold-flavors": {
    href: "/blog/how-to-brew-cambodian-fine-robusta",
    anchor: "How to brew Fine Robusta",
    lead: "For the canonical brewing method guide, see",
  },
  "specialty-robusta-vs-arabica-honest-comparison": {
    href: "/blog/fine-robusta-vs-arabica-buyer-guide",
    anchor: "Fine Robusta vs Arabica buyer guide",
    lead: "For the broad buyer comparison, see the",
  },
  "arabica-vs-fine-robusta-quality-flavor-and-price": {
    href: "/blog/fine-robusta-vs-arabica-buyer-guide",
    anchor: "Fine Robusta vs Arabica buyer guide",
    lead: "For the broad buyer comparison, see the",
  },
  "arabica-vs-fine-robusta-which-coffee-is-better-for-you": {
    href: "/blog/fine-robusta-vs-arabica-buyer-guide",
    anchor: "Fine Robusta vs Arabica buyer guide",
    lead: "For the broad buyer comparison, see the",
  },
}

function robustaAnchorForSlug(slug: string): string {
  const hash = Array.from(slug).reduce((sum, char) => sum + char.charCodeAt(0), 0)
  return ROBUSTA_PILLAR_ANCHORS[hash % ROBUSTA_PILLAR_ANCHORS.length]
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function normalizeEditorialCaps(text: string): string {
  const acronyms = new Set([
    "ASEAN",
    "EU",
    "F&B",
    "ISO",
    "MASL",
    "QC",
    "ROI",
    "SCA",
    "USDA",
  ])
  const letters = text.replace(/[^A-Za-z]/g, "")
  const upperLetters = text.replace(/[^A-Z]/g, "")
  if (!letters || upperLetters.length / letters.length < 0.78) return text

  return text.toLowerCase().replace(/[a-z0-9&]+(?:[-'][a-z0-9&]+)*/gi, (word) => {
    const upper = word.toUpperCase()
    if (acronyms.has(upper)) return upper
    if (/^\d/.test(word)) return word
    return word.charAt(0).toUpperCase() + word.slice(1)
  })
}

function stripMarkdown(text: string): string {
  return text
    .replace(/^#{1,6}\s+/, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .trim()
}

function renderInlineMarkdown(text: string): string {
  const escaped = escapeHtml(normalizeEditorialCaps(text))
  const markdownLinks: Array<{ label: string; href: string }> = []
  const protectedText = escaped.replace(
    /\[(.*?)\]\((https?:\/\/[^)]+|\/[^)]*)\)/g,
    (_match, label, href) => {
      markdownLinks.push({ label, href })
      return `\x01${markdownLinks.length - 1}\x01`
    }
  )

  const rendered = addInternalLinks(protectedText)
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]/g, (_match, label) => {
      return `<a href="/contact" class="border-b border-stone-300 text-stone-950 transition-colors hover:border-stone-950">${label}</a>`
    })

  return rendered.replace(/\x01(\d+)\x01/g, (_match, index) => {
    const { label, href } = markdownLinks[Number(index)]
    const renderedLabel = label.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    return `<a href="${href}" class="border-b border-stone-300 text-stone-950 transition-colors hover:border-stone-950">${renderedLabel}</a>`
  })
}

function addInternalLinks(text: string): string {
  const entries = Object.entries(INTERNAL_LINKS).sort(([a], [b]) => b.length - a.length)
  const replacements: Array<{ href: string; match: string }> = []
  let result = text
  for (const [kw, href] of entries) {
    const re = new RegExp(`\\b(${kw})\\b`, "gi")
    result = result.replace(re, (match) => {
      replacements.push({ href, match })
      return `\x00${replacements.length - 1}\x00`
    })
  }
  return result.replace(/\x00(\d+)\x00/g, (_, i) => {
    const { href, match } = replacements[Number(i)]
    return `<a href="${href}" class="border-b border-stone-300 text-stone-950 transition-colors hover:border-stone-950">${match}</a>`
  })
}

function isTableSeparator(line: string): boolean {
  return /^\|?[\s:-]+\|[\s|:-]+$/.test(line)
}

function isPromptNote(line: string): boolean {
  return /^(SEO compliance|GEO COMPLIANCE|Structural requirements|\*?WORD COUNT):/i.test(line)
}

function placeholderHref(label: string): string {
  const lower = label.toLowerCase()
  if (lower.includes("wholesale")) return "/solutions/wholesale"
  if (lower.includes("processing") || lower.includes("roast")) return "/solutions/roasting-program"
  if (lower.includes("checklist") || lower.includes("sourcing")) return "/contact"
  return "/blog"
}

function renderInternalPlaceholder(line: string): string | null {
  const match = line.match(/^\[INTERNAL LINK:\s*(.+?)\]$/i)
  if (!match) return null
  const label = normalizeEditorialCaps(match[1].trim())
  return `<aside class="article-link-note"><span>Further reading</span><a href="${placeholderHref(label)}">${escapeHtml(label)}</a></aside>`
}

function renderTable(lines: string[]): string {
  const rows = lines
    .filter((line) => !isTableSeparator(line))
    .map((line) =>
      line
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map((cell) => renderInlineMarkdown(cell.trim()))
    )
    .filter((row) => row.some(Boolean))

  if (!rows.length) return ""

  const [head, ...body] = rows
  const thead = `<thead><tr>${head.map((cell) => `<th>${cell}</th>`).join("")}</tr></thead>`
  const tbody = `<tbody>${body
    .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`)
    .join("")}</tbody>`
  return `<div class="article-table-wrap"><table>${thead}${tbody}</table></div>`
}

function renderList(lines: string[], ordered: boolean): string {
  const items = lines
    .map((line) => line.replace(ordered ? /^\d+\.\s+/ : /^[-*]\s+/, ""))
    .map((line) => `<li>${renderInlineMarkdown(line)}</li>`)
    .join("")
  return ordered ? `<ol>${items}</ol>` : `<ul>${items}</ul>`
}

function formatContent(raw: string, title: string, slug?: string): string {
  if (!raw) return ""
  const lines = raw
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !/^```/.test(line) && !isPromptNote(line))

  const html: string[] = []

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i]
    const plain = stripMarkdown(line).toLowerCase()

    if ((line.startsWith("# ") || plain === title.toLowerCase()) && html.length === 0) {
      continue
    }

    if (/^\*\*Meta Description:\*\*/i.test(line) || /^Meta Description:/i.test(line)) {
      continue
    }

    const placeholder = renderInternalPlaceholder(line)
    if (placeholder) {
      html.push(placeholder)
      continue
    }

    if (/^\|.+\|$/.test(line)) {
      const tableLines = [line]
      while (i + 1 < lines.length && /^\|.+\|$/.test(lines[i + 1])) {
        tableLines.push(lines[i + 1])
        i += 1
      }
      html.push(renderTable(tableLines))
      continue
    }

    if (/^[-*]\s+/.test(line)) {
      const listLines = [line]
      while (i + 1 < lines.length && /^[-*]\s+/.test(lines[i + 1])) {
        listLines.push(lines[i + 1])
        i += 1
      }
      html.push(renderList(listLines, false))
      continue
    }

    if (/^\d+\.\s+/.test(line)) {
      const listLines = [line]
      while (i + 1 < lines.length && /^\d+\.\s+/.test(lines[i + 1])) {
        listLines.push(lines[i + 1])
        i += 1
      }
      html.push(renderList(listLines, true))
      continue
    }

    if (/^###\s+/.test(line)) {
      html.push(`<h3>${renderInlineMarkdown(line.replace(/^###\s+/, ""))}</h3>`)
      continue
    }

    if (/^##\s+/.test(line)) {
      html.push(`<h2>${renderInlineMarkdown(line.replace(/^##\s+/, ""))}</h2>`)
      continue
    }

    if (/^#\s+/.test(line)) {
      html.push(`<h2>${renderInlineMarkdown(line.replace(/^#\s+/, ""))}</h2>`)
      continue
    }

    const renderedParagraph = renderInlineMarkdown(line)
    const contextualOwner = slug ? CONTEXTUAL_OWNER_LINKS[slug] : undefined
    if (contextualOwner && !html.some((entry) => entry.startsWith("<p>"))) {
      html.push(
        `<p>${renderedParagraph} ${contextualOwner.lead} <a href="${contextualOwner.href}" class="border-b border-stone-300 text-stone-950 transition-colors hover:border-stone-950">${contextualOwner.anchor}</a>.</p>`,
      )
    } else {
      html.push(`<p>${renderedParagraph}</p>`)
    }
  }

  return html.join("")
}

function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

function plainTextExcerpt(content: string, title: string): string {
  const excerpt = content
    .split("\n")
    .map((line) => stripMarkdown(line.trim()))
    .filter((line) => {
      if (!line || isPromptNote(line)) return false
      if (/^Meta Description:/i.test(line)) return false
      if (/^\[INTERNAL LINK:/i.test(line)) return false
      return line.toLowerCase() !== title.toLowerCase()
    })
    .join(" ")
    .replace(/\s+/g, " ")
    .trim()

  if (excerpt.length <= 155) return excerpt
  return `${excerpt.slice(0, 152).replace(/\s+\S*$/, "")}...`
}

function isLowSignalSeoText(text: string, title = ""): boolean {
  const value = text.trim().replace(/\s+/g, " ")
  if (!value) return true
  const lower = value.toLowerCase()
  const titleLower = title.trim().replace(/\s+/g, " ").toLowerCase()
  if (lower === "occ") return true
  if (lower === "origin coffee cambodia") return true
  if (/^meta description[:\s-]/i.test(value)) return true
  if (titleLower && lower === titleLower) return true
  if (value.length < 30) return true
  return false
}

function metaDescriptionForPost(post: Awaited<ReturnType<typeof getPostBySlug>>): string {
  if (!post) return "Specialty coffee insights from Origin Coffee Cambodia."
  const summary = post.summary && !isLowSignalSeoText(post.summary, post.title) ? post.summary : ""
  const excerpt = post.excerpt && !isLowSignalSeoText(post.excerpt, post.title) ? post.excerpt : ""
  return seoDescription(
    summary ||
    excerpt ||
    plainTextExcerpt(post.content, post.title) ||
    "Specialty coffee insights from Origin Coffee Cambodia."
  )
}

export const revalidate = 60

/** 列表未預建的 slug 仍可開文（與 canonical corpus 規則一致）。 */
export const dynamicParams = true

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: "Post not found" }
  const description = metaDescriptionForPost(post)
  const displayTitle = displayTitleForPost(post.slug, post.title)

  return {
    title: seoTitle(displayTitle),
    description,
    keywords: post.keywords,
    alternates: alternatesFromCanonical(`${siteUrl}/blog/${post.slug}`),
    openGraph: {
      title: displayTitle,
      description,
      url: `${siteUrl}/blog/${post.slug}`,
      siteName,
      type: "article",
      publishedTime: post.publish_date,
      authors: [post.author],
      ...(post.featured_image_url && { images: [post.featured_image_url] }),
    },
  }
}

export async function generateStaticParams() {
  return []
}

async function RelatedArticles({ currentSlug }: { currentSlug: string }) {
  const recentPosts = await getRecentPosts()
  const related = recentPosts.filter((post) => post.slug !== currentSlug).slice(0, 3)

  if (!related.length) return null

  return (
    <section className="max-w-5xl mx-auto px-5 sm:px-8 pb-16 md:pb-20">
      <div className="mx-auto max-w-[720px] border-t border-stone-200 pt-12">
        <p className="text-[10px] tracking-[0.24em] text-stone-400 uppercase mb-8">More Articles</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {related.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block border-t border-stone-200 pt-5 transition-all hover:-translate-y-0.5"
            >
              {post.category && (
                <span className="text-[9px] tracking-[0.22em] text-stone-400 uppercase block mb-2">
                  {post.category}
                </span>
              )}
              <h3 className="text-sm font-semibold text-stone-950 leading-snug mb-2 group-hover:underline underline-offset-2">
                {post.title}
              </h3>
              {post.summary && (
                <p className="text-xs text-stone-500 leading-relaxed line-clamp-2">{post.summary}</p>
              )}
              <span className="inline-block mt-3 text-[10px] tracking-[0.14em] text-stone-400 group-hover:text-stone-950 group-hover:translate-x-1 transition-all">
                Read →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) notFound()

  const displayTitle = displayTitleForPost(post.slug, post.title)
  const mins = readingTime(post.content)
  const keywordList = post.keywords
    ? post.keywords.split(",").map((k) => k.trim()).filter(Boolean)
    : []
  const formattedContent = formatContent(post.content, post.title, post.slug)
  const showRobustaPillarLink = ROBUSTA_CLUSTER_SLUGS.has(post.slug)
  const robustaPillarAnchor = robustaAnchorForSlug(post.slug)

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: displayTitle,
    description: metaDescriptionForPost(post),
    keywords: post.keywords,
    wordCount: post.content.split(/\s+/).length,
    author: { "@type": "Person", name: post.author },
    datePublished: post.publish_date,
    dateModified: post.modified_date || post.publish_date,
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
      logo: publisherLogoImageObject(),
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/blog/${post.slug}` },
    url: `${siteUrl}/blog/${post.slug}`,
    ...(post.featured_image_url && { image: post.featured_image_url }),
    speakableSpecification: {
      "@type": "SpeakableSpecification",
      cssSelector: ["article h1", "article h2", ".article-summary"],
    },
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: displayTitle, item: `${siteUrl}/blog/${post.slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="min-h-screen bg-white text-stone-950 overflow-x-hidden">
        {/* Breadcrumb nav */}
        <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-stone-200">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-3 flex items-center gap-2 text-[10px] sm:text-[11px] tracking-[0.16em] text-stone-400 uppercase min-w-0">
            <Link href="/" className="hover:text-stone-950 transition-colors shrink-0">Home</Link>
            <span className="shrink-0">/</span>
            <Link href="/blog" className="hover:text-stone-950 transition-colors shrink-0">Blog</Link>
            <span className="shrink-0">/</span>
            <span className="text-stone-700 truncate min-w-0">{displayTitle}</span>
          </div>
        </nav>

        <article className="max-w-5xl mx-auto px-5 sm:px-8 py-10 md:py-16">
          {/* Header */}
          <header className="mx-auto max-w-[680px] mb-10 md:mb-12">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              {post.category && (
                <span className="text-[10px] tracking-[0.26em] text-stone-600 border border-stone-300 px-2.5 py-1 uppercase">
                  {post.category}
                </span>
              )}
              <span className="text-[11px] text-stone-400 tracking-[0.18em] uppercase">{mins} min read</span>
            </div>

            <h1 className="font-sans text-[18.5px] font-semibold text-stone-950 tracking-tight leading-[1.35] mb-5 [text-wrap:balance]">
              {displayTitle}
            </h1>

            {(post.summary || post.excerpt) && (
              <p className="article-summary max-w-2xl font-sans text-[13px] sm:text-sm text-stone-600 leading-relaxed border-l border-stone-950 pl-4 sm:pl-5 mb-8 [text-wrap:pretty]">
                {post.summary || post.excerpt}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-3 text-[11px] tracking-[0.18em] text-stone-400 uppercase border-t border-stone-200 pt-5">
              {post.publish_date && (
                <time dateTime={post.publish_date}>
                  {new Date(post.publish_date).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              )}
              <span>/</span>
              <span>{post.author}</span>
            </div>
          </header>

          {/* Article content */}
          {formattedContent ? (
            <div
              className="
                mx-auto max-w-[720px]
                [&>h2]:font-sans [&>h2]:text-[1.2rem] sm:[&>h2]:text-[1.35rem] [&>h2]:font-semibold [&>h2]:text-stone-950 [&>h2]:tracking-tight
                [&>h2]:leading-[1.2] [&>h2]:mt-12 sm:[&>h2]:mt-14 [&>h2]:mb-4 [&>h2]:pt-7
                [&>h2]:border-t [&>h2]:border-stone-200
                [&>h3]:font-sans [&>h3]:text-[0.95rem] sm:[&>h3]:text-base [&>h3]:font-semibold [&>h3]:text-stone-900
                [&>h3]:tracking-normal [&>h3]:leading-snug [&>h3]:mt-10 [&>h3]:mb-4
                [&>p]:font-sans [&>p]:text-stone-700 [&>p]:leading-relaxed sm:[&>p]:leading-[1.8] [&>p]:text-[15px] sm:[&>p]:text-base [&>p]:mb-6 [&>p]:break-words
                [&_strong]:font-semibold [&_strong]:text-stone-950
                [&>ul]:my-7 [&>ul]:space-y-3 [&>ul]:pl-6 [&>ul]:list-disc
                [&>ol]:my-7 [&>ol]:space-y-3 [&>ol]:pl-6 [&>ol]:list-decimal
                [&_li]:font-sans [&_li]:text-[15px] sm:[&_li]:text-base [&_li]:leading-[1.75] [&_li]:text-stone-700 [&_li]:pl-1
                [&_.article-link-note]:my-8 [&_.article-link-note]:border-l [&_.article-link-note]:border-stone-950 [&_.article-link-note]:bg-white/60 [&_.article-link-note]:px-5 [&_.article-link-note]:py-4
                [&_.article-link-note_span]:block [&_.article-link-note_span]:font-sans [&_.article-link-note_span]:text-[10px] [&_.article-link-note_span]:uppercase [&_.article-link-note_span]:tracking-[0.22em] [&_.article-link-note_span]:text-stone-400 [&_.article-link-note_span]:mb-1
                [&_.article-link-note_a]:font-sans [&_.article-link-note_a]:text-sm [&_.article-link-note_a]:font-medium [&_.article-link-note_a]:text-stone-950 [&_.article-link-note_a]:border-b [&_.article-link-note_a]:border-stone-300 [&_.article-link-note_a]:hover:border-stone-950
                [&_.article-table-wrap]:my-10 [&_.article-table-wrap]:overflow-x-auto [&_.article-table-wrap]:border-y [&_.article-table-wrap]:border-stone-200
                [&_table]:w-full [&_table]:min-w-[620px] [&_table]:border-collapse
                [&_th]:py-4 [&_th]:pr-6 [&_th]:text-left [&_th]:font-sans [&_th]:text-[11px] [&_th]:font-semibold [&_th]:uppercase [&_th]:tracking-[0.16em] [&_th]:text-stone-500
                [&_td]:border-t [&_td]:border-stone-200 [&_td]:py-4 [&_td]:pr-6 [&_td]:font-sans [&_td]:text-[13px] sm:[&_td]:text-sm [&_td]:leading-relaxed [&_td]:text-stone-700
              "
              dangerouslySetInnerHTML={{ __html: formattedContent }}
            />
          ) : (
            <p className="mx-auto max-w-[720px] text-stone-400 text-sm italic">Content coming soon.</p>
          )}

          {SEO_CONTENT_EXPANSIONS[post.slug] ? (
            <section className="mx-auto mt-12 max-w-[720px] border-y border-stone-200 bg-stone-50 px-5 py-7 sm:px-6">
              <p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-stone-400">
                {SEO_CONTENT_EXPANSIONS[post.slug].label}
              </p>
              <h2 className="text-lg font-semibold leading-snug tracking-tight text-stone-950 sm:text-xl">
                {SEO_CONTENT_EXPANSIONS[post.slug].title}
              </h2>
              <p className="mt-4 text-[15px] leading-[1.8] text-stone-700">
                {SEO_CONTENT_EXPANSIONS[post.slug].intro}
              </p>
              <ul className="mt-5 list-disc space-y-2 pl-5">
                {SEO_CONTENT_EXPANSIONS[post.slug].points.map((point) => (
                  <li key={point} className="text-[15px] leading-[1.75] text-stone-700">{point}</li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
                {SEO_CONTENT_EXPANSIONS[post.slug].links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-stone-950 border-b border-stone-300 hover:border-stone-950 transition-colors"
                  >
                    {link.label} →
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {/* Fine Robusta Cambodia pillar backlink: supporting cluster only */}
          {showRobustaPillarLink && (
            <aside className="mx-auto max-w-[720px] mt-10 border-l border-stone-950 bg-stone-50 px-5 py-4">
              <p className="text-[10px] uppercase tracking-[0.22em] text-stone-400 mb-1">Core guide</p>
              <Link
                href={ROBUSTA_PILLAR_HREF}
                className="text-sm font-medium text-stone-950 border-b border-stone-300 hover:border-stone-950 transition-colors"
              >
                {robustaPillarAnchor} →
              </Link>
              <p className="mt-2 text-xs leading-relaxed text-stone-500">
                Use the central Fine Robusta Cambodia guide for origin, quality, sourcing and buyer context before comparing supporting topics.
              </p>
            </aside>
          )}

          {/* Keywords */}
          {keywordList.length > 0 && (
            <div className="mx-auto max-w-[720px] mt-16 pt-8 border-t border-stone-200">
              <p className="text-[10px] tracking-[0.24em] text-stone-400 uppercase mb-3">Topics</p>
              <div className="flex flex-wrap gap-2">
                {keywordList.map((kw) => (
                  <span key={kw} className="text-xs text-stone-600 border border-stone-300 px-3 py-1">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mx-auto max-w-[720px] mt-12 bg-stone-950 text-white p-7 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <p className="text-xs tracking-[0.24em] text-stone-400 uppercase mb-1">Origin Coffee Cambodia</p>
              <p className="font-bold tracking-tight">Need wholesale supply or roasting support?</p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 text-xs tracking-[0.14em] border border-white px-5 py-2.5 hover:bg-white hover:text-stone-950 transition-colors uppercase"
            >
              Talk to Our Team →
            </Link>
          </div>
        </article>

        <Suspense fallback={null}>
          <RelatedArticles currentSlug={post.slug} />
        </Suspense>

        {/* Back link */}
        <div className="max-w-5xl mx-auto px-5 sm:px-8 pb-12">
          <Link
            href="/blog"
            className="mx-auto max-w-[720px] text-[11px] tracking-[0.18em] text-stone-400 hover:text-stone-950 uppercase transition-colors flex items-center gap-2"
          >
            ← All Articles
          </Link>
        </div>
      </div>
    </>
  )
}
