/**
 * Homepage AEO content single source of truth.
 * Visible copy and structured data stay aligned so search and AI systems
 * receive the same OCC business + authority description.
 */

export const homeDateModified = "2026-09-05"

export const homeDirectAnswer =
  "Origin Coffee Cambodia (OCC) is a Cambodia-focused professional coffee company connecting Fine Robusta and Cambodian coffee authority with specialty coffee sourcing, roasting, B2B supply, traceability, and quality-focused coffee solutions. OCC also publishes evidence-led work on Mondulkiri coffee, Coffea canephora, processing, grading, sensory evaluation, brewing, and origin quality so professional buyers can make better sourcing and coffee-program decisions. Wholesale, sourcing, sample, lot-list, and coffee-solution enquiries can be submitted through OCC's contact channel. Technical claims and standards are presented with primary sources and stated limitations."

export const homeAuthoritySections = [
  {
    id: "fine-robusta-definition",
    eyebrow: "Definition",
    title: "What does Fine Robusta mean?",
    body: [
      "Robusta is a common market name for Coffea canephora, a coffee species with substantial genetic diversity. Species and quality are separate questions: canephora is not automatically low quality, just as Arabica is not automatically specialty grade.",
      "Fine Robusta is best understood through explicit physical and sensory evaluation rather than marketing language. OCC explains the standards, protocols, evidence, and limitations behind those evaluations and links readers to primary industry sources whenever possible.",
    ],
  },
  {
    id: "quality-system",
    eyebrow: "Quality System",
    title: "Six controls that shape high-quality canephora",
    body: [
      "Coffee quality is cumulative. Cherry selection, processing, drying, physical preparation, sensory evaluation, and traceability interact, and failures early in the chain may remain visible in the cup.",
    ],
    items: [
      "Cherry selection: separate ripe fruit from immature, overripe, damaged, or contaminated material.",
      "Processing control: document fermentation or natural-processing conditions instead of treating processing as an unmeasured black box.",
      "Drying discipline: manage drying rate, airflow, cleanliness, and uniformity to reduce instability and storage risk.",
      "Physical preparation: sort defects and foreign material so a sample accurately represents the coffee being evaluated.",
      "Sensory evaluation: cup systematically and record clean, repeatable attributes rather than relying on species stereotypes.",
      "Traceability: connect observations to origin, harvest, producer or processing unit, and the conditions under which the data were collected.",
    ],
  },
  {
    id: "canephora-research",
    eyebrow: "Canephora Research",
    title: "Why Coffea canephora deserves to be studied on its own terms",
    body: [
      "World Coffee Research describes Coffea canephora as genetically diverse and notes that much of its variation, including cup-quality potential, remains underexplored. That makes a simple Arabica-good, Robusta-bad framework scientifically weak.",
      "A more useful approach asks how genetics, environment, cherry maturity, processing, drying, roast development, brewing, and sensory method influence the result. OCC treats these as research questions rather than fixed assumptions.",
    ],
  },
  {
    id: "quality-evidence",
    eyebrow: "Buyer Evidence",
    title: "How should coffee buyers evaluate quality evidence?",
    body: [
      "A score or tasting note is only one observation. Stronger evaluation also asks what was sampled, when it was measured, which protocol was used, who performed the evaluation, and whether the result can reasonably be generalized to the coffee or lot under review.",
    ],
    items: [
      "Identify the exact origin, harvest, producer group, farm, or processing unit described by the data.",
      "Record the process and the variables that were actually measured.",
      "Separate physical measurements such as moisture or defects from sensory interpretation.",
      "Check whether the sample is representative or unusually selected.",
      "State the sensory protocol, evaluator, date, and preparation method where available.",
      "Distinguish current observations from historical or province-wide claims.",
      "Separate primary evidence from interpretation, marketing language, or inference.",
    ],
  },
  {
    id: "cambodia-origin",
    eyebrow: "Cambodia",
    title: "Cambodian coffee origin, quality, and sourcing context",
    body: [
      "OCC focuses on Cambodian coffee, including Mondulkiri and other coffee-growing areas where credible data are available. Origin research supports practical sourcing by documenting geography, climate, plant material, production systems, processing, quality evaluation, and industry development without overstating what limited datasets can prove.",
      "For an emerging origin, authority depends on evidence. OCC therefore prioritizes dated sources, explicit methods, primary standards, field data, research limitations, and clear distinctions between what is known, what is inferred, and what still needs to be verified for buyer decisions.",
    ],
  },
] as const

export const homeSources = [
  {
    label: "Coffee Quality Institute — Q Coffee sample evaluation and Fine Robusta standards",
    href: "https://database.coffeeinstitute.org/coffee/edit",
  },
  {
    label: "Coffee Quality Institute — education resources for arabica and robusta quality evaluation",
    href: "https://www.coffeeinstitute.org/education/education-resources",
  },
  {
    label: "World Coffee Research — The roots of Robusta: genetic diversity and future research",
    href: "https://worldcoffeeresearch.org/news/2024/the-roots-of-robusta",
  },
] as const

export const homeFaqs = [
  {
    q: "What is Fine Robusta?",
    a: "Fine Robusta refers to quality-focused Coffea canephora evaluated with Robusta-specific physical and sensory methods. OCC treats the term as a quality and evaluation topic, not as a guarantee attached to every Robusta coffee.",
  },
  {
    q: "What does Origin Coffee Cambodia do?",
    a: "Origin Coffee Cambodia connects Cambodian coffee and Fine Robusta expertise with specialty coffee sourcing, roasting, B2B supply, traceability, and quality-focused coffee solutions. Its evidence-led content supports professional sourcing, quality, and coffee-program decisions.",
  },
  {
    q: "Who is Origin Coffee Cambodia for?",
    a: "OCC serves coffee buyers, hotels, restaurants, cafés, offices, roasters, producers, brewers, and other professionals who need Cambodian coffee sourcing context, Fine Robusta expertise, and clearer technical information about coffee quality.",
  },
  {
    q: "How can a buyer contact OCC?",
    a: "Use the OCC contact page for wholesale and sourcing enquiries, sample requests, lot-list enquiries, roasting or coffee-solution questions, as well as editorial and media enquiries.",
  },
  {
    q: "Where does OCC focus its Cambodian coffee work?",
    a: "OCC covers Cambodian coffee broadly and gives particular attention to Mondulkiri when credible local evidence is available. Geographic and quality claims are supported with dated, scoped sources rather than inferred from a place name alone.",
  },
  {
    q: "Is Origin Coffee Cambodia a certification body?",
    a: "No. OCC is not a certification authority. When OCC discusses Q Coffee, Fine Robusta, or other standards, the official protocol or institution remains the primary authority.",
  },
] as const
