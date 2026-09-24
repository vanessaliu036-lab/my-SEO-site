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
  meta: string
  terms: string[]
}

export const blogCategories: BlogCategory[] = [
  { slug:"fine-robusta", title:"Fine Robusta", kicker:"Quality · Varieties · Research", description:"Fine Robusta quality, canephora varieties, sensory evidence and Cambodia-specific research.", meta:"Fine Robusta · Canephora · Cambodia", terms:["fine robusta","robusta","canephora"] },
  { slug:"processing", title:"Processing", kicker:"Roasting · Equipment · Production", description:"Processing systems, fermentation control, drying, production discipline and commercial roast execution.", meta:"Processing · Fermentation · Production", terms:["processing","fermentation","washed","natural process","honey process","drying","anaerobic","thermal shock","barrel"] },
  { slug:"brewing-roasting", title:"Brewing & Roasting", kicker:"Methods · Recipes · Sensory", description:"Roast development, brewing methods, extraction and practical sensory applications for Cambodian coffee.", meta:"Brewing · Roasting · Extraction", terms:["brew","brewing","roast","roasting","espresso","extraction","pour over","filter coffee"] },
  { slug:"origin-producers", title:"Origin & Producers", kicker:"Mondulkiri · Terroir · People", description:"Cambodian coffee origins, Mondulkiri, farms, producers, geography and the evidence behind place.", meta:"Origin · Mondulkiri · Producers", terms:["mondulkiri","producer","producers","farm","farmer","terroir","single origin","origin coffee"] },
  { slug:"quality-grading", title:"Quality & Grading", kicker:"Standards · Cup Profile · Defects", description:"Grading, sensory evaluation, defects, cup quality and evidence used to verify professional coffee standards.", meta:"Quality · Grading · Sensory", terms:["grading","quality","sensory","defect","cup score","cupping","cqi","standard","moisture"] },
  { slug:"buyer-market", title:"Buyer & Market", kicker:"Sourcing · Partnerships · Trade", description:"Commercial sourcing, procurement, wholesale, hospitality, distribution and market intelligence for coffee buyers.", meta:"Sourcing · B2B · Market", terms:["buyer","market","sourcing","supplier","wholesale","procurement","b2b","hotel","café","cafe","distribution","export","trade"] },
]

export function getBlogCategory(slug:string): BlogCategory | undefined {
  return blogCategories.find((category)=>category.slug===slug)
}

export function postMatchesBlogCategory(post:BlogPost, category:BlogCategory): boolean {
  const haystack=[post.category,post.title,post.summary].filter(Boolean).join(" ").toLowerCase()
  return category.terms.some((term)=>haystack.includes(term.toLowerCase()))
}
