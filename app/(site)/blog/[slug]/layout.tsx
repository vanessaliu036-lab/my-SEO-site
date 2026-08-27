import Link from "next/link"
import type { Metadata } from "next"
import type { ReactNode } from "react"
import { getPostBySlug } from "@/lib/airtable"
import "./article-editorial.css"

type PillarConfig = {
  slug: string
  label: string
  anchors: string[]
  clusters: Set<string>
}

const MONEY_PILLARS: PillarConfig[] = [
  {
    slug: "what-is-fine-robusta-coffee-a-complete-beginners-guide",
    label: "Fine Robusta Cambodia",
    anchors: [
      "Fine Robusta Cambodia buyer guide",
      "Cambodian Fine Robusta sourcing guide",
      "Fine Robusta from Cambodia",
    ],
    clusters: new Set([
      "what-makes-fine-robusta",
      "fine-robusta-grading-standards-cqi-certification-for-cambodia",
      "evaluating-fine-robusta-suppliers-key-technical-standards-for-quality-assurance",
      "what-creates-fine-robusta-price-premium",
      "fine-robusta-price-score-traceability-consistency",
      "fine-robusta-consistency-vs-extra-cup-point",
      "fine-robusta-premium-espresso-milk-single-origin",
      "why-fine-robusta-matters-more-espresso",
      "what-makes-roaster-pay-more-fine-robusta",
      "risk-growing-cambodia-fine-robusta-too-fast",
      "cambodia-coffee-industry-2030-fine-robusta-scenario",
    ]),
  },
  {
    slug: "evaluating-cambodian-coffee-suppliers-a-procurement-manager-s-guide-to-quality-and-traceability",
    label: "Cambodia Coffee Supplier",
    anchors: [
      "Cambodia coffee supplier guide",
      "How to evaluate a Cambodia coffee supplier",
      "Cambodian coffee supplier buyer guide",
    ],
    clusters: new Set([
      "evaluating-coffee-suppliers-a-procurement-manager-s-guide-to-quality-and-consistency-in-cambodia",
      "the-definitive-guide-to-evaluating-cambodian-coffee-suppliers-quality-ethics-and-technical-standards-for-b2b-buyers",
      "evaluating-cambodian-coffee-suppliers-a-technical-standard-checklist-for-b2b-buyers",
      "evaluating-cambodian-coffee-suppliers-key-technical-standards-for-b2b-procurement",
      "beyond-price-comprehensive-supplier-evaluation-for-cambodian-coffee-imports",
      "beyond-the-bean-evaluating-supplier-reliability-for-cambodian-specialty-coffee-imports",
      "cambodia-specialty-coffee-wholesale-buyer-checklist",
      "b2b-coffee-sourcing-in-cambodia-minimum-order-pricing-lead-times-explained",
      "navigating-cambodia-s-b2b-coffee-bean-market-a-procurement-manager-s-guide-to-quality-sourcing",
      "origins-coffee-crafter-your-partner-for-sustainable-cambodian-coffee-wholesale",
    ]),
  },
  {
    slug: "roaster-checklist-buying-cambodian-green-coffee",
    label: "Cambodia Green Coffee Beans",
    anchors: [
      "Cambodia green coffee beans sourcing guide",
      "Buying Cambodian green coffee",
      "Cambodia green coffee buyer guide",
    ],
    clusters: new Set([
      "sample-cambodian-coffee-before-buying-lot",
      "offer-vs-pre-shipment-vs-arrival-coffee-sample",
      "how-many-green-coffee-samples-before-approving-lot",
      "what-makes-green-coffee-sample-trustworthy",
      "why-great-coffee-sample-fails-commercial-scale",
      "green-coffee-arrival-inspection-checklist",
      "green-coffee-shipment-fails-arrival-qc",
      "why-traceability-matters-new-coffee-origin",
      "why-coffee-origins-need-lot-codes-before-blockchain",
      "why-green-coffee-moisture-consistency-matters",
    ]),
  },
  {
    slug: "cambodia-specialty-coffee-market-supply-side-dynamics-export-capacity",
    label: "Cambodia Coffee Exporter",
    anchors: [
      "Cambodia coffee exporter buyer guide",
      "Exporting green coffee from Cambodia",
      "Cambodia coffee export guide",
    ],
    clusters: new Set([
      "green-coffee-purchase-contract-checklist-roasters",
      "coffee-contract-quality-tolerances-fine-robusta",
      "lot-substitution-green-coffee-contract-risks",
      "green-coffee-quality-claims-allowance-replacement-rejection",
      "cambodian-coffee-export-consistency",
      "navigating-logistics-ensuring-seamless-coffee-imports-from-cambodia-to-your-business",
      "cambodia-coffee-target-roasters-importers-cafes-first",
      "navigating-the-cambodian-coffee-market-a-guide-for-international-wholesale-buyers",
      "from-farm-to-roaster-the-supply-chain-of-specialty-cambodian-coffee-for-b2b-partners",
      "building-sustainable-coffee-supply-chains-a-guide-for-cambodian-wholesale-buyers",
    ]),
  },
  {
    slug: "mondulkiri-next-specialty-coffee-origin",
    label: "Mondulkiri Coffee",
    anchors: [
      "Mondulkiri coffee buyer guide",
      "Mondulkiri Fine Robusta origin guide",
      "Cambodia's Mondulkiri coffee guide",
    ],
    clusters: new Set([
      "700-tonnes-mondulkiri-coffee-purchase",
      "how-to-verify-mondulkiri-coffee-origin",
      "365-farmers-mondulkiri-coffee-origin",
      "what-makes-mondulkiri-valuable-international-roasters",
      "mondulkiri-robusta-sourcing-geographic-and-climatic-data",
      "what-makes-mondulkiri-robusta-different",
      "could-mondulkiri-reference-origin-fine-robusta-asia",
      "mondulkiri-coffee-processing-facility",
      "mondulkiri-coffee-cherry-price",
      "cambodia-coffee-production-vs-consumption",
      "why-cambodia-imports-coffee",
      "why-cambodia-coffee-consumption-outgrows-farming",
    ]),
  },
]

function pillarForCluster(slug: string): PillarConfig | null {
  return MONEY_PILLARS.find((pillar) => pillar.clusters.has(slug)) ?? null
}

function anchorForSlug(slug: string, anchors: string[]): string {
  const hash = Array.from(slug).reduce((sum, char) => sum + char.charCodeAt(0), 0)
  return anchors[hash % anchors.length]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post || post.indexable) return {}

  return {
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
      },
    },
  }
}

export default async function BlogPostLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const pillar = pillarForCluster(slug)

  return (
    <div className="occ-article-shell">
      {children}
      {pillar && (
        <aside
          className="mx-auto mb-16 mt-4 max-w-[720px] border-l border-stone-950 bg-stone-50 px-5 py-4"
          aria-label={`${pillar.label} related buyer guide`}
        >
          <p className="mb-1 text-[10px] uppercase tracking-[0.22em] text-stone-400">
            Related buyer guide
          </p>
          <Link
            href={`/blog/${pillar.slug}`}
            className="text-sm font-medium text-stone-950 border-b border-stone-300 hover:border-stone-950 transition-colors"
          >
            {anchorForSlug(slug, pillar.anchors)} →
          </Link>
        </aside>
      )}
    </div>
  )
}
