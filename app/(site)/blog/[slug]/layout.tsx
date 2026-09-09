import type { ReactNode } from "react"
import Link from "next/link"
import "./article-editorial.css"

// The OCC article corpus is large and Airtable-backed. Rendering article
// routes on demand prevents Vercel builds from pre-rendering the entire
// corpus while preserving the exact public article UI and URLs.
export const dynamic = "force-dynamic"

type OwnerRoute = {
  href: string
  anchor: string
  description: string
}

const OWNER_ROUTES = {
  cambodia: {
    href: "/fine-robusta-cambodia",
    anchor: "Fine Robusta Cambodia",
    description: "Use the central Fine Robusta Cambodia guide for broad Cambodia origin, quality, sourcing, and buyer intent.",
  },
  grading: {
    href: "/blog/fine-robusta-grading-verify-before-cupping",
    anchor: "Fine Robusta grading guide",
    description: "Use the canonical grading guide for broad Fine Robusta grading, verification, and pre-cupping evaluation intent.",
  },
  fermentation: {
    href: "/blog/fine-robusta-fermentation",
    anchor: "Fine Robusta fermentation",
    description: "Use the canonical fermentation guide for broad Fine Robusta fermentation science, process control, and risk context.",
  },
  brewing: {
    href: "/blog/how-to-brew-cambodian-fine-robusta",
    anchor: "How to brew Fine Robusta",
    description: "Use the canonical brewing guide for broad Fine Robusta brewing ratios, temperature, grind, and extraction intent.",
  },
  comparison: {
    href: "/blog/fine-robusta-vs-arabica-buyer-guide",
    anchor: "Fine Robusta vs Arabica",
    description: "Use the canonical comparison guide for broad Fine Robusta versus Arabica quality, species, and buyer-comparison intent.",
  },
  popularity: {
    href: "/blog/why-is-fine-robusta-coffee-becoming-popular",
    anchor: "Why Fine Robusta is becoming popular",
    description: "Use the canonical adoption guide for broad Fine Robusta popularity, professional attention, and market-visibility intent.",
  },
  canephoraQuality: {
    href: "/blog/is-coffee-industry-undervaluing-canephora-quality",
    anchor: "Canephora quality undervalued",
    description: "Use the formal Canephora quality owner for the broad undervaluation and specialty-quality argument.",
  },
  economics: {
    href: "/blog/the-economic-advantages-of-fine-robusta-cost-benefit-analysis-for-cambodian-coffee-businesses",
    anchor: "Fine Robusta economics in Cambodia",
    description: "Use the formal economics owner for broad Cambodia Fine Robusta cost, value, and business-economics intent.",
  },
  consistency: {
    href: "/blog/fine-robusta-consistency-vs-extra-cup-point",
    anchor: "Fine Robusta consistency",
    description: "Use the formal consistency owner for broad repeatability, lot consistency, and buyer-control intent.",
  },
} satisfies Record<string, OwnerRoute>

const OWNER_ROUTE_BY_SUPPORT_SLUG: Record<string, OwnerRoute> = {
  // Cambodia: keep the wholesale-specific page narrow while routing broad Fine Robusta Cambodia intent to the pillar.
  "cambodian-fine-robusta-wholesale-supply": OWNER_ROUTES.cambodia,
  "sensory-evaluation-of-fine-robusta-flavour-aroma-body-and-beyond": OWNER_ROUTES.cambodia,
  "what-makes-coffee-origin-feel-premium": OWNER_ROUTES.cambodia,
  "fine-robusta-premium-espresso-milk-single-origin": OWNER_ROUTES.cambodia,
  "what-is-specialty-robusta-coffee-complete-guide": OWNER_ROUTES.cambodia,
  "coffea-canephora-cambodia": OWNER_ROUTES.cambodia,
  "uganda-fine-robusta-an-emerging-origin": OWNER_ROUTES.cambodia,
  "is-cambodian-coffee-grown-in-cambodia": OWNER_ROUTES.cambodia,

  // Grading: keep historical CQI, score interpretation, and transition pages as supporting intent.
  "fine-robusta-grading-standards-cqi-certification-for-cambodia": OWNER_ROUTES.grading,
  "how-the-coffee-quality-institute-grades-fine-robusta": OWNER_ROUTES.grading,
  "how-fine-robusta-coffee-is-graded-cup-score-explained": OWNER_ROUTES.grading,

  // Fermentation: mechanism and process-control pages support the broad fermentation owner.
  "why-fermentation-changes-coffee-flavor": OWNER_ROUTES.fermentation,
  "how-fermentation-affects-coffee-quality": OWNER_ROUTES.fermentation,
  "fermentation-control-cambodian-robusta": OWNER_ROUTES.fermentation,
  "cambodia-robusta-fermentation-control": OWNER_ROUTES.fermentation,
  "cambodia-robusta-fermentation-endpoint": OWNER_ROUTES.fermentation,

  // Brewing: older method/science overviews stay narrow and route broad how-to intent upward.
  "how-to-brew-specialty-robusta-coffee": OWNER_ROUTES.brewing,
  "specialty-robusta-brewing-methods": OWNER_ROUTES.brewing,
  "how-to-brew-fine-robusta-a-complete-guide-to-unlocking-bold-flavors": OWNER_ROUTES.brewing,
  "fine-robusta-coffee-the-art-and-science-of-brewing": OWNER_ROUTES.brewing,
  "fine-robusta-coffee-to-water-ratio-explained": OWNER_ROUTES.brewing,

  // Comparison: legacy comparison pages retain myth, price, or consumer-choice sub-intents.
  "specialty-robusta-vs-arabica-honest-comparison": OWNER_ROUTES.comparison,
  "arabica-vs-fine-robusta-quality-flavor-and-price": OWNER_ROUTES.comparison,
  "arabica-vs-fine-robusta-which-coffee-is-better-for-you": OWNER_ROUTES.comparison,

  // Adoption: roaster and foodservice spokes reinforce the formal popularity owner.
  "why-specialty-roasters-reconsider-robusta": OWNER_ROUTES.popularity,
  "why-specialty-roasters-are-starting-to-sell-fine-robusta-as-single-origin-espresso": OWNER_ROUTES.popularity,
  "how-hotels-and-foodservice-are-adopting-fine-robusta": OWNER_ROUTES.popularity,

  // 2026-09-09 owner recovery: use one highly relevant contextual support route per declining family.
  "fine-robusta-own-specialty-category": OWNER_ROUTES.canephoraQuality,
  "what-creates-fine-robusta-price-premium": OWNER_ROUTES.economics,
  "fine-robusta-recipe-card-standard": OWNER_ROUTES.consistency,
}

export default async function BlogPostLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const ownerRoute = OWNER_ROUTE_BY_SUPPORT_SLUG[slug]

  return (
    <div className="occ-article-shell">
      {children}
      {ownerRoute ? (
        <aside className="mx-auto mb-14 mt-[-1rem] max-w-[720px] border-l border-stone-950 bg-stone-50 px-5 py-4">
          <p className="mb-1 text-[10px] uppercase tracking-[0.22em] text-stone-400">Primary topic guide</p>
          <Link
            href={ownerRoute.href}
            className="text-sm font-medium text-stone-950 border-b border-stone-300 hover:border-stone-950 transition-colors"
          >
            {ownerRoute.anchor} →
          </Link>
          <p className="mt-2 text-xs leading-relaxed text-stone-500">{ownerRoute.description}</p>
        </aside>
      ) : null}
    </div>
  )
}
