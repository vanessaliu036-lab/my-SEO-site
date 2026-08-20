/**
 * Homepage AEO content single source of truth.
 * Visible copy and structured data must stay aligned so search and AI engines
 * can extract the same definitions, lists, FAQs, and source references.
 */

/** Update whenever the homepage authority copy changes. */
export const homeDateModified = "2026-08-12"

/** BLUF: a self-contained answer before the deeper sections. */
export const homeDirectAnswer =
  "Origin Coffee Cambodia (OCC) is a B2B coffee company and knowledge platform focused on Cambodian Fine Robusta, coffee quality, processing, roasting, and origin development. OCC helps roasters, importers, cafés, distributors, and coffee professionals evaluate Coffea canephora through evidence rather than species stereotypes. The site explains how quality is built from cherry selection, processing control, drying, physical preparation, sensory evaluation, storage, roasting, and lot-level traceability. It also connects buyers with Cambodian coffee origin information, including work associated with Mondulkiri, so they can assess flavor, consistency, available volume, and sourcing risk before purchasing. OCC is an independent company, not a certification body. References to Fine Robusta, Q Robusta, or Coffee Quality Institute standards are educational and should be checked against the linked primary industry sources. Buyers should use the page as a starting point, then request lot data and verify claims with the cited sources."

export const homeAuthoritySections = [
  {
    id: "fine-robusta-definition",
    eyebrow: "Definition",
    title: "What does Fine Robusta mean?",
    body: [
      "Robusta is a common market name for Coffea canephora, a coffee species with substantial genetic diversity. Species and quality are separate questions: a bean can be canephora without being high quality, just as an Arabica bean is not automatically specialty grade.",
      "Coffee Quality Institute publishes standards and protocols for evaluating robusta in its Q Coffee System. CQI's current sample-evaluation guidance uses a 100-point system and states that coffee must earn at least 80 points to receive Q certification. The practical lesson for buyers is more important than a label alone: high-quality Robusta depends on clean raw material, controlled processing, physical preparation, sensory evaluation, and repeatable lot information.",
    ],
  },
  {
    id: "quality-system",
    eyebrow: "Quality System",
    title: "Six controls that determine whether Robusta can become a high-quality lot",
    body: [
      "No single processing trick creates Fine Robusta. Quality is cumulative, and failures early in the chain cannot always be repaired later. A useful evaluation starts with the following six controls.",
    ],
    items: [
      "Cherry selection — separate ripe fruit from immature, overripe, damaged, or contaminated material.",
      "Processing control — document fermentation or natural-processing conditions instead of treating the process as an unmeasured black box.",
      "Drying discipline — manage drying rate, airflow, cleanliness, and uniformity to reduce instability and storage risk.",
      "Physical preparation — sort defects and foreign material so the sample represents the intended commercial lot.",
      "Sensory evaluation — cup the coffee systematically and record what is clean, repeatable, and distinctive rather than relying on species stereotypes.",
      "Traceability and repeatability — connect the sample to a real lot, producer or processing unit, harvest information, and a supply volume that buyers can evaluate again.",
    ],
  },
  {
    id: "canephora-opportunity",
    eyebrow: "Canephora",
    title: "Why high-quality Robusta deserves to be evaluated on its own terms",
    body: [
      "World Coffee Research describes Coffea canephora as genetically diverse and notes that much of its variation, including cup-quality potential, remains underexplored. That makes a simple 'Arabica good, Robusta bad' framework scientifically and commercially weak.",
      "For roasters, the more useful question is whether a specific lot is clean, sweet enough for its intended use, structurally balanced, traceable, and consistent. High-quality canephora can offer a different sensory and functional profile from many Arabicas. It does not need to imitate Arabica to be valuable.",
    ],
  },
  {
    id: "buyer-checklist",
    eyebrow: "Buyer Guide",
    title: "Seven questions a buyer should ask before purchasing Fine Robusta",
    body: [
      "A score or tasting note is only one part of procurement. Importers and roasters need evidence that the coffee represented by a sample can be bought, shipped, roasted, and reordered with reasonable confidence.",
    ],
    items: [
      "What is the exact origin, harvest, producer group, farm, or processing unit behind the lot?",
      "Which process was used, and what processing variables were documented?",
      "What physical grading, moisture, storage, and defect information is available?",
      "Was the sample drawn from the commercial lot, and how representative is it of the available volume?",
      "Which sensory protocol or internal QC method was used, by whom, and on what date?",
      "What quantity is available now, and what would make the next harvest comparable rather than merely similar in name?",
      "Which claims come from independent standards or primary data, and which claims are the seller's own interpretation?",
    ],
  },
  {
    id: "cambodia-origin",
    eyebrow: "Cambodia",
    title: "How OCC approaches Cambodian coffee origin development",
    body: [
      "OCC's origin work centers on Cambodian coffee and gives particular editorial and sourcing attention to Mondulkiri. The strategy is not to present Cambodia as a substitute for a large commodity origin. It is to build a clearer association between place, processing, quality control, traceability, and repeatable buyer experience.",
      "For an emerging origin, authority is earned through evidence. That means publishing definitions, explaining methods, linking to primary standards, documenting what is known and unknown, and avoiding unsupported superlatives. The same discipline helps human buyers and AI systems decide when a page is safe to cite.",
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

/**
 * Homepage FAQs. Answers are deliberately self-contained so each question can
 * be extracted as a useful AI-search chunk without relying on surrounding copy.
 */
export const homeFaqs = [
  {
    q: "What is Fine Robusta?",
    a: "Fine Robusta refers to quality-focused Robusta, or Coffea canephora, evaluated with Robusta-specific physical and sensory standards. Coffee Quality Institute publishes Fine Robusta standards and protocols within its Q Coffee System; its current sample-evaluation guidance uses a 100-point system and requires at least 80 points for Q certification. Fine Robusta should therefore be understood as a quality system, not simply a premium-sounding name for any Robusta coffee.",
  },
  {
    q: "What does Origin Coffee Cambodia do?",
    a: "Origin Coffee Cambodia is a B2B coffee company and industry knowledge platform focused on Cambodian Fine Robusta, coffee sourcing, processing, roasting, wholesale supply, and origin development. OCC publishes educational material for buyers and coffee professionals while developing commercial pathways for Cambodian coffee.",
  },
  {
    q: "Who is Origin Coffee Cambodia for?",
    a: "Origin Coffee Cambodia is built for green-coffee buyers, importers, specialty roasters, cafés, distributors, hospitality businesses, and coffee professionals that want clearer information about Cambodian coffee, Fine Robusta quality, processing, traceability, roasting, and sourcing decisions.",
  },
  {
    q: "Where does OCC focus its Cambodian coffee work?",
    a: "Origin Coffee Cambodia gives particular sourcing and editorial attention to Mondulkiri in eastern Cambodia while covering the broader Cambodian coffee industry. OCC treats origin claims as evidence-based information: geography, processing, lot data, quality evaluation, and repeatability should be documented rather than inferred from a place name alone.",
  },
  {
    q: "Is Origin Coffee Cambodia a certification body?",
    a: "No. Origin Coffee Cambodia is an independent coffee company and knowledge platform, not the Coffee Quality Institute and not a certification authority. When OCC discusses Q Robusta, Fine Robusta, or other industry standards, readers should use the linked primary source for the official protocol or certification requirement.",
  },
] as const
