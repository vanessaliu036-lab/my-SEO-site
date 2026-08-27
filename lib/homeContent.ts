/**
 * Homepage AEO content single source of truth.
 * Visible copy and structured data stay aligned so search and AI systems
 * receive the same evidence-led description of OCC.
 */

export const homeDateModified = "2026-08-27"

export const homeDirectAnswer =
  "Origin Coffee Cambodia (OCC) is an independent coffee information and research platform focused on Cambodian coffee, Fine Robusta, Coffea canephora, processing, roasting, sensory evaluation, quality standards, and origin research. OCC publishes evidence-led explanations for coffee professionals, researchers, producers, roasters, brewers, students, and readers who need clearer information about how coffee quality is measured and how origin claims should be interpreted. OCC does not currently sell coffee or operate as an e-commerce platform. References to Fine Robusta, Q Coffee, Coffee Quality Institute standards, scientific studies, and production data are presented for education and should be checked against the cited primary sources and stated limitations."

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
    eyebrow: "Evidence",
    title: "How should green-coffee quality evidence be evaluated?",
    body: [
      "A score or tasting note is only one observation. Stronger evaluation also asks what was sampled, when it was measured, which protocol was used, who performed the evaluation, and whether the result can reasonably be generalized.",
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
    title: "How OCC approaches Cambodian coffee origin research",
    body: [
      "OCC focuses editorial attention on Cambodian coffee, including Mondulkiri and other coffee-growing areas where credible data are available. The aim is to document geography, climate, plant material, production systems, processing, quality evaluation, and industry development without overstating what limited datasets can prove.",
      "For an emerging origin, authority depends on evidence. OCC therefore prioritizes dated sources, explicit methods, primary standards, field data, research limitations, and clear distinctions between what is known, what is inferred, and what still needs to be studied.",
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
    a: "Origin Coffee Cambodia is an independent coffee information and research platform. It publishes evidence-led material about Cambodian coffee, Fine Robusta, Coffea canephora, processing, roasting, sensory evaluation, quality standards, and origin systems.",
  },
  {
    q: "Who is Origin Coffee Cambodia for?",
    a: "OCC is written for coffee professionals, researchers, producers, roasters, brewers, students, educators, and readers who need clearer technical information about Cambodian coffee and canephora quality.",
  },
  {
    q: "Where does OCC focus its Cambodian coffee research?",
    a: "OCC covers Cambodian coffee broadly and gives particular attention to Mondulkiri when credible local evidence is available. Geographic claims are treated as research claims that should be supported by dated, scoped sources rather than inferred from a place name alone.",
  },
  {
    q: "Is Origin Coffee Cambodia a certification body?",
    a: "No. OCC is an independent information and research platform, not a certification authority. When OCC discusses Q Coffee, Fine Robusta, or other standards, the official protocol or institution remains the primary authority.",
  },
] as const
