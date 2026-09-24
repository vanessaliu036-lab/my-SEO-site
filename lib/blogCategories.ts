import type { BlogPost } from "@/lib/airtable"

export type BlogCategorySlug =
  | "fine-robusta"
  | "processing"
  | "brewing-roasting"
  | "origin-producers"
  | "quality-grading"
  | "buyer-market"

export type BlogCategory = {
  slug: BlogCategorySlug
  title: string
  kicker: string
  description: string
  image: string
  imageAlt: string
  meta: string
  terms: string[]
}

export const blogCategories: BlogCategory[] = [
  {
    slug: "fine-robusta",
    title: "Fine Robusta",
    kicker: "Quality · Varieties · Research",
    description:
      "Fine Robusta quality, canephora varieties, sensory evidence and Cambodia-specific research.",
    image: "/about/occ-about-green-hero.webp",
    imageAlt: "Fine Robusta coffee research and origin",
    meta: "Fine Robusta · Canephora · Cambodia",
    terms: ["fine robusta", "robusta", "canephora"],
  },
  {
    slug: "processing",
    title: "Processing",
    kicker: "Roasting · Equipment · Production",
    description:
      "Processing systems, fermentation control, drying, production discipline and commercial roast execution.",
    image: "/images/occ-roasting-program-background.webp",
    imageAlt: "Commercial coffee roasting and processing equipment",
    meta: "Processing · Fermentation · Production",
    terms: [
      "processing",
      "fermentation",
      "washed",
      "natural process",
      "honey process",
      "drying",
      "anaerobic",
      "thermal shock",
      "barrel",
    ],
  },
  {
    slug: "brewing-roasting",
    title: "Brewing & Roasting",
    kicker: "Methods · Recipes · Sensory",
    description:
      "Roast development, brewing methods, extraction and practical sensory applications for Cambodian coffee.",
    image: "/images/roasting/occ-roasting-profile-cupping.webp",
    imageAlt: "Coffee brewing, cupping and roast evaluation",
    meta: "Brewing · Roasting · Extraction",
    terms: ["brew", "brewing", "roast", "roasting", "espresso", "extraction", "pour over", "filter coffee"],
  },
  {
    slug: "origin-producers",
    title: "Origin & Producers",
    kicker: "Mondulkiri · Terroir · People",
    description:
      "Cambodian coffee origins, Mondulkiri, farms, producers, geography and the evidence behind place.",
    image: "/images/partnerships/occ-partnerships-origin-collaboration.webp",
    imageAlt: "Coffee origin and producer collaboration",
    meta: "Origin · Mondulkiri · Producers",
    terms: ["mondulkiri", "producer", "producers", "farm", "farmer", "terroir", "single origin", "origin coffee"],
  },
  {
    slug: "quality-grading",
    title: "Quality & Grading",
    kicker: "Standards · Cup Profile · Defects",
    description:
      "Grading, sensory evaluation, defects, cup quality and evidence used to verify professional coffee standards.",
    image: "/images/roasting/occ-roasting-bean-evaluation.webp",
    imageAlt: "Coffee bean quality evaluation and grading",
    meta: "Quality · Grading · Sensory",
    terms: ["grading", "quality", "sensory", "defect", "cup score", "cupping", "cqi", "standard", "moisture"],
  },
  {
    slug: "buyer-market",
    title: "Buyer & Market",
    kicker: "Sourcing · Partnerships · Trade",
    description:
      "Commercial sourcing, procurement, wholesale, hospitality, distribution and market intelligence for coffee buyers.",
    image: "/distribution-hero.webp",
    imageAlt: "Commercial coffee distribution and market activity",
    meta: "Sourcing · B2B · Market",
    terms: [
      "buyer",
      "market",
      "sourcing",
      "supplier",
      "wholesale",
      "procurement",
      "b2b",
      "hotel",
      "café",
      "cafe",
      "distribution",
      "export",
      "trade",
    ],
  },
]

export function getBlogCategory(slug: string): BlogCategory | undefined {
  return blogCategories.find((category) => category.slug === slug)
}

export function postMatchesBlogCategory(post: BlogPost, category: BlogCategory): boolean {
  const haystack = [post.category, post.title, post.summary].filter(Boolean).join(" ").toLowerCase()
  return category.terms.some((term) => haystack.includes(term.toLowerCase()))
}
