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
} satisfies Record<string, OwnerRoute>

const OWNER_ROUTE_BY_SUPPORT_SLUG: Record<string, OwnerRoute> = {
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

  // Comparison: legacy comparison pages retain myth, price, or consumer-choice sub-intents.
  "specialty-robusta-vs-arabica-honest-comparison": OWNER_ROUTES.comparison,
  "arabica-vs-fine-robusta-quality-flavor-and-price": OWNER_ROUTES.comparison,
  "arabica-vs-fine-robusta-which-coffee-is-better-for-you": OWNER_ROUTES.comparison,

  // Adoption: roaster and foodservice spokes reinforce the formal popularity owner.
  "why-specialty-roasters-reconsider-robusta": OWNER_ROUTES.popularity,
  "why-specialty-roasters-are-starting-to-sell-fine-robusta-as-single-origin-espresso": OWNER_ROUTES.popularity,
  "how-hotels-and-foodservice-are-adopting-fine-robusta": OWNER_ROUTES.popularity,
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
