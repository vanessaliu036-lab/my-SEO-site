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
  "Cambodian Fine Robusta": "/fine-robusta-cambodia",
  "Cambodia Fine Robusta": "/fine-robusta-cambodia",
  "processing transparency": "/blog/fine-robusta-processing-transparency",
  "Mondulkiri coffee": "/origins",
  "supplier evaluation": "/blog/evaluating-cambodian-coffee-suppliers-a-procurement-manager-s-guide-to-quality-and-traceability",
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

const ROBUSTA_PILLAR_EXCLUDED_SLUGS = new Set([
  "cambodia-specialty-robusta-coffee-guide",
  "fine-robusta-grading-verify-before-cupping",
  "fine-robusta-fermentation",
  "how-to-brew-cambodian-fine-robusta",
  "fine-robusta-vs-arabica-buyer-guide",
  "why-is-fine-robusta-coffee-becoming-popular",
  "is-coffee-industry-undervaluing-canephora-quality",
  "the-economic-advantages-of-fine-robusta-cost-benefit-analysis-for-cambodian-coffee-businesses",
  "fine-robusta-consistency-vs-extra-cup-point",
  "evaluating-cambodian-coffee-suppliers-a-procurement-manager-s-guide-to-quality-and-traceability",
  "mondulkiri-next-specialty-coffee-origin",
  "what-cambodian-coffee-should-you-try-first",
  "ratanakiri-coffee-cambodias-other-highland-origin",
  "best-cambodian-coffee-beans-robusta-quality-guide",
  "cambodia-robusta-growing-regions",
])

const ROBUSTA_SUPPORT_SLUG_PATTERN =
  /(?:fine-robusta|specialty-robusta|cambodian-(?:coffee|robusta)|cambodia-(?:coffee|robusta)|mondulkiri|canephora)/i

function shouldLinkToRobustaPillar(slug: string): boolean {
  if (ROBUSTA_PILLAR_EXCLUDED_SLUGS.has(slug)) return false
  return ROBUSTA_CLUSTER_SLUGS.has(slug) || ROBUSTA_SUPPORT_SLUG_PATTERN.test(slug)
}

const ROBUSTA_TOPIC_OWNER_LABELS: Record<string, string> = {
  "fine-robusta-grading-verify-before-cupping": "Grading & verification",
  "fine-robusta-fermentation": "Fermentation & process control",
  "how-to-brew-cambodian-fine-robusta": "Brewing",
  "evaluating-cambodian-coffee-suppliers-a-procurement-manager-s-guide-to-quality-and-traceability": "Buyer & sourcing",
  "mondulkiri-next-specialty-coffee-origin": "Mondulkiri origin",
}

const CAMBODIA_COFFEE_PILLAR_SLUG = "what-cambodian-coffee-should-you-try-first"
const CAMBODIA_COFFEE_PILLAR_HREF = `/blog/${CAMBODIA_COFFEE_PILLAR_SLUG}`

const CAMBODIA_COFFEE_TOPIC_GUIDES = [
  {
    label: "Mondulkiri",
    href: "/blog/mondulkiri-next-specialty-coffee-origin",
    title: "Mondulkiri coffee origin",
    description: "The strongest geographic anchor in OCC’s current Cambodia coffee knowledge graph.",
  },
  {
    label: "Ratanakiri",
    href: "/blog/ratanakiri-coffee-cambodias-other-highland-origin",
    title: "Ratanakiri coffee origin",
    description: "A second highland-region guide that broadens the country story beyond a single province.",
  },
  {
    label: "Buying",
    href: "/blog/best-cambodian-coffee-beans-robusta-quality-guide",
    title: "Best Cambodian coffee to buy",
    description: "Product-discovery guidance for first-time buyers without turning local café search into the same intent.",
  },
  {
    label: "Buyer / Sourcing",
    href: "/blog/evaluating-cambodian-coffee-suppliers-a-procurement-manager-s-guide-to-quality-and-traceability",
    title: "Cambodian coffee buyer verification",
    description: "Due diligence, traceability and supplier-evaluation context before commercial supply moves to Wholesale.",
  },
  {
    label: "Quality",
    href: "/fine-robusta-cambodia",
    title: "Fine Robusta Cambodia",
    description: "The technical quality pillar for Cambodia Fine Robusta, evidence, evaluation and specialist buyer context.",
  },
]

const CAMBODIA_COFFEE_TOPIC_OWNER_LABELS: Record<string, string> = {
  "mondulkiri-next-specialty-coffee-origin": "Mondulkiri origin",
  "ratanakiri-coffee-cambodias-other-highland-origin": "Ratanakiri origin",
  "best-cambodian-coffee-beans-robusta-quality-guide": "product buying",
  "evaluating-cambodian-coffee-suppliers-a-procurement-manager-s-guide-to-quality-and-traceability": "buyer verification",
}

const CAMBODIA_REGIONS_HREF = "/origins/cambodia-regions"
const CAMBODIA_ROBUSTA_HREF = "/blog/cambodia-specialty-robusta-coffee-guide"
const CAMBODIA_ROBUSTA_REGIONS_OWNER_SLUG = "cambodia-robusta-growing-regions"

const CAMBODIA_GEOGRAPHY_SUPPORT_SLUGS = new Set([
  "where-is-coffee-grown-in-cambodia",
  "is-cambodian-coffee-grown-in-cambodia",
  "does-cambodia-grow-coffee-mondulkiri-origin",
  "cambodia-coffee-regions",
])

const REGIONAL_SPECIALIST_LABELS: Record<string, string> = {
  "mondulkiri-next-specialty-coffee-origin": "Mondulkiri",
  "ratanakiri-coffee-cambodias-other-highland-origin": "Ratanakiri",
}

const CAMBODIA_COFFEE_PRIMARY_SUPPORT_SLUGS = new Set([
  "cambodia-coffee-export-without-commodity-model",
  "the-history-of-coffee-growing-in-cambodia",
  "cambodian-coffee-vs-jamaica-blue-mountain",
  "why-coffee-origins-need-lot-codes-before-blockchain",
  "what-if-cambodia-coffee-production-doubled",
  "cambodia-coffee-production-vs-domestic-consumption",
  "can-cambodia-premium-origin-without-arabica",
  "the-future-of-cambodias-coffee-industry-opportunities-challenges-and-a-vision-for-2030",
  "what-mondulkiri-can-learn-emerging-asian-coffee-origins",
  "cambodia-fine-robusta-not-next-vietnam",
  "why-traditional-cambodian-coffee-tastes-buttery-sweet",
  "cambodian-coffee-vs-burundian-coffee",
  "how-cambodia-build-recognizable-coffee-origin",
  "why-cambodia-imports-coffee",
  "specialty-coffee-sourcing-in-emerging-markets-why-cambodia-belongs-on-your-radar",
  "third-wave-coffees-new-frontier-in-2025-the-origins-you-should-be-watching",
  "drying-capacity-limits-coffee-growth",
  "cambodia-coffee-origin-standards-before-growth",
  "emerging-robusta-origins-to-watch-in-the-coming-decade",
  "cambodia-domestic-coffee-market-vs-export",
  "small-coffee-origins-traceability-advantage",
  "cambodia-coffee-competitive-moat",
  "cambodian-coffee-vs-zambian-coffee",
  "cambodias-emerging-specialty-coffee-scene",
  "what-makes-cambodian-coffee-hard-to-copy",
  "cambodia-coffee-southeast-asias-rising-origin-for-b2b-buyers",
  "cambodian-coffee-kampot-pepper",
  "cambodia-small-coffee-production-advantage",
  "cambodia-coffee-southeast-asias-rising",
  "why-education-sells-unknown-coffee-origin",
])

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
  "where-is-coffee-grown-in-cambodia": {
    href: CAMBODIA_REGIONS_HREF,
    anchor: "Cambodia coffee regions guide",
    lead: "For the country-level map of where Cambodian coffee is grown, start with the",
  },
  "is-cambodian-coffee-grown-in-cambodia": {
    href: CAMBODIA_REGIONS_HREF,
    anchor: "Cambodia coffee regions guide",
    lead: "For the country-level origin and growing-region framework, see the",
  },
  "does-cambodia-grow-coffee-mondulkiri-origin": {
    href: CAMBODIA_REGIONS_HREF,
    anchor: "Cambodia coffee regions guide",
    lead: "For the broader country and regional geography, start with the",
  },
  "cambodia-coffee-regions": {
    href: CAMBODIA_REGIONS_HREF,
    anchor: "Cambodia coffee regions guide",
    lead: "For OCC’s canonical country and regional geography, use the",
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
  "robusta-processing-methods-washed-natural-and-honey": {
    href: "/blog/fine-robusta-processing-transparency",
    anchor: "Fine Robusta processing transparency guide",
    lead: "For the broader evidence and disclosure framework, see the",
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
  const sourceLines = raw
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !/^```/.test(line) && !isPromptNote(line))

  const repeatedTitleIndex = sourceLines.findIndex(
    (line) => stripMarkdown(line).toLowerCase() === title.trim().toLowerCase()
  )
  const lines =
    repeatedTitleIndex > 0 && repeatedTitleIndex <= 10
      ? sourceLines.slice(repeatedTitleIndex + 1)
      : sourceLines

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

    if (/^\\?_?Target keyword:/i.test(line)) {
      continue
    }

    if (/^\*\*Published\s+/i.test(line)) {
      html.push(`<aside class="article-context-note">${renderInlineMarkdown(line)}</aside>`)
      continue
    }

    if (/^\*\*Quick Answer(?: \(AI Overview\))?\*\*$/i.test(line)) {
      const next = lines[i + 1]
      if (next && !/^#{1,6}\s+/.test(next) && !/^[-*]\s+/.test(next) && !/^\d+\.\s+/.test(next)) {
        html.push(
          `<aside class="article-key-answer"><span>Quick answer</span><p>${renderInlineMarkdown(next)}</p></aside>`,
        )
        i += 1
      } else {
        html.push(`<aside class="article-key-answer"><span>Quick answer</span></aside>`)
      }
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

function isInternalEditorialNote(text: string): boolean {
  const value = text.trim().replace(/\s+/g, " ")
  return (
    /^updated\s+\d{1,2}\s+[a-z]{3,9}\s+20\d{2}\s+from\s+forum\s+heat\./i.test(value) ||
    /stable slug retained/i.test(value) ||
    /target keyword:/i.test(value) ||
    /internal (?:seo|editorial|content) note/i.test(value)
  )
}

function headerSummaryForPost(post: NonNullable<Awaited<ReturnType<typeof getPostBySlug>>>): string {
  const candidates = [post.summary, post.excerpt].filter(Boolean) as string[]
  const source = candidates.find((text) => !isInternalEditorialNote(text))?.replace(/\s+/g, " ").trim() || ""
  if (!source) return ""
  if (source.length <= 220) return source
  return `${source.slice(0, 217).replace(/\s+\S*$/, "")}...`
}

function metaDescriptionForPost(post: Awaited<ReturnType<typeof getPostBySlug>>): string {
  if (!post) return "Specialty coffee insights from Origin Coffee Cambodia."
  const summary =
    post.summary &&
    !isLowSignalSeoText(post.summary, post.title) &&
    !isInternalEditorialNote(post.summary)
      ? post.summary
      : ""
  const excerpt =
    post.excerpt &&
    !isLowSignalSeoText(post.excerpt, post.title) &&
    !isInternalEditorialNote(post.excerpt)
      ? post.excerpt
      : ""
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
  const headerSummary = headerSummaryForPost(post)
  const isCambodiaCoffeeSupport = CAMBODIA_COFFEE_PRIMARY_SUPPORT_SLUGS.has(post.slug)
  const isCambodiaGeographySupport = CAMBODIA_GEOGRAPHY_SUPPORT_SLUGS.has(post.slug)
  const isCambodiaRobustaRegionsOwner = post.slug === CAMBODIA_ROBUSTA_REGIONS_OWNER_SLUG
  const showRobustaPillarLink =
    shouldLinkToRobustaPillar(post.slug) &&
    !isCambodiaCoffeeSupport &&
    !isCambodiaGeographySupport &&
    !isCambodiaRobustaRegionsOwner
  const robustaPillarAnchor = robustaAnchorForSlug(post.slug)
  const robustaTopicOwnerLabel = ROBUSTA_TOPIC_OWNER_LABELS[post.slug]
  const isCambodiaCoffeePillar = post.slug === CAMBODIA_COFFEE_PILLAR_SLUG
  const cambodiaCoffeeTopicOwnerLabel = CAMBODIA_COFFEE_TOPIC_OWNER_LABELS[post.slug]
  const regionalSpecialistLabel = REGIONAL_SPECIALIST_LABELS[post.slug]

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

      <div className="min-h-screen bg-occ-background text-occ-primary overflow-x-hidden">
        {/* Breadcrumb nav */}
        <nav className="sticky top-0 z-40 bg-occ-background/95 backdrop-blur-sm border-b border-occ-primary/15">
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

            {headerSummary && (
              <p className="article-summary max-w-2xl font-sans text-[13px] sm:text-sm text-stone-600 leading-relaxed border-l border-occ-burgundy/45 pl-4 sm:pl-5 mb-8 [text-wrap:pretty]">
                {headerSummary}
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

          {isCambodiaCoffeePillar && (
            <section className="mx-auto max-w-[720px] mt-12 border-t border-stone-200 pt-10" aria-labelledby="cambodian-coffee-topic-cluster">
              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.24em] text-stone-400">Cambodian Coffee knowledge map</p>
              <h2 id="cambodian-coffee-topic-cluster" className="text-xl font-semibold tracking-tight text-stone-950">
                Explore the five core Cambodian Coffee paths
              </h2>
              <p className="mt-4 text-sm leading-7 text-stone-600">
                Use this page for broad first-time Cambodian coffee discovery, then move into the specialist guide that matches the regional, buying, sourcing, or quality question.
              </p>
              <div className="mt-6 divide-y divide-stone-200 border-y border-stone-200">
                {CAMBODIA_COFFEE_TOPIC_GUIDES.map((topic, index) => (
                  <article key={topic.href} className="grid gap-3 py-5 sm:grid-cols-[42px_1fr_auto] sm:items-start sm:gap-5">
                    <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-stone-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-stone-400">{topic.label}</p>
                      <h3 className="mt-1 text-base font-semibold tracking-tight text-stone-950">{topic.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-stone-600">{topic.description}</p>
                    </div>
                    <Link href={topic.href} className="mt-1 inline-block whitespace-nowrap border-b border-stone-300 text-sm font-medium text-stone-950 hover:border-stone-950">
                      Open guide →
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          )}

          {isCambodiaGeographySupport && (
            <aside className="mx-auto max-w-[720px] mt-10 border-l border-stone-950 bg-stone-50 px-5 py-4">
              <p className="text-[10px] uppercase tracking-[0.22em] text-stone-400 mb-1">Geography guide</p>
              <Link
                href={CAMBODIA_REGIONS_HREF}
                className="text-sm font-medium text-stone-950 border-b border-stone-300 hover:border-stone-950 transition-colors"
              >
                Cambodia coffee regions guide →
              </Link>
              <p className="mt-2 text-xs leading-relaxed text-stone-500">
                This page answers a narrower growing-location or origin-evidence question. Use Cambodia & Regions for the broad country, highlands, and regional-geography framework.
              </p>
            </aside>
          )}

          {isCambodiaRobustaRegionsOwner && (
            <aside className="mx-auto max-w-[720px] mt-10 border-y border-stone-200 py-5">
              <p className="text-[10px] uppercase tracking-[0.22em] text-stone-400 mb-1">Species × geography owner</p>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                <Link
                  href={CAMBODIA_REGIONS_HREF}
                  className="text-sm font-medium text-stone-950 border-b border-stone-300 hover:border-stone-950 transition-colors"
                >
                  Cambodia coffee regions guide →
                </Link>
                <Link
                  href={CAMBODIA_ROBUSTA_HREF}
                  className="text-sm font-medium text-stone-950 border-b border-stone-300 hover:border-stone-950 transition-colors"
                >
                  Robusta Cambodia guide →
                </Link>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-stone-500">
                This article owns the narrow Cambodia Robusta growing-regions question. Country geography and general Cambodia Robusta remain separate owner families.
              </p>
            </aside>
          )}

          {regionalSpecialistLabel && (
            <aside className="mx-auto max-w-[720px] mt-10 border-y border-stone-200 py-5">
              <p className="text-[10px] uppercase tracking-[0.22em] text-stone-400 mb-1">Geography context</p>
              <Link
                href={CAMBODIA_REGIONS_HREF}
                className="text-sm font-medium text-stone-950 border-b border-stone-300 hover:border-stone-950 transition-colors"
              >
                Cambodia coffee regions guide →
              </Link>
              <p className="mt-2 text-xs leading-relaxed text-stone-500">
                {regionalSpecialistLabel} is a province-level origin owner. Use Cambodia & Regions for the broader country, northeastern-highlands, and regional-geography framework.
              </p>
            </aside>
          )}

          {cambodiaCoffeeTopicOwnerLabel && (
            <aside className="mx-auto max-w-[720px] mt-10 border-y border-stone-200 py-5">
              <p className="text-[10px] uppercase tracking-[0.22em] text-stone-400 mb-1">Part of Cambodian Coffee</p>
              <Link
                href={CAMBODIA_COFFEE_PILLAR_HREF}
                className="text-sm font-medium text-stone-950 border-b border-stone-300 hover:border-stone-950 transition-colors"
              >
                Return to the Cambodian Coffee guide →
              </Link>
              <p className="mt-2 text-xs leading-relaxed text-stone-500">
                This is the {cambodiaCoffeeTopicOwnerLabel} guide inside OCC’s Cambodian Coffee discovery cluster. Use the pillar for the broader country-level context before moving into specialist or commercial intent.
              </p>
            </aside>
          )}

          {isCambodiaCoffeeSupport && (
            <aside className="mx-auto max-w-[720px] mt-10 border-l border-stone-950 bg-stone-50 px-5 py-4">
              <p className="text-[10px] uppercase tracking-[0.22em] text-stone-400 mb-1">Country guide</p>
              <Link
                href={CAMBODIA_COFFEE_PILLAR_HREF}
                className="text-sm font-medium text-stone-950 border-b border-stone-300 hover:border-stone-950 transition-colors"
              >
                Cambodian Coffee guide →
              </Link>
              <p className="mt-2 text-xs leading-relaxed text-stone-500">
                This article supports a narrower Cambodia coffee question. Use the Cambodian Coffee pillar for the broader country-level discovery path before moving into regional, quality, or commercial topics.
              </p>
            </aside>
          )}

          {/* Formal topic owners link upward to the Fine Robusta Cambodia pillar. */}
          {robustaTopicOwnerLabel && (
            <aside className="mx-auto max-w-[720px] mt-10 border-y border-stone-200 py-5">
              <p className="text-[10px] uppercase tracking-[0.22em] text-stone-400 mb-1">Part of Fine Robusta Cambodia</p>
              <Link
                href={ROBUSTA_PILLAR_HREF}
                className="text-sm font-medium text-stone-950 border-b border-stone-300 hover:border-stone-950 transition-colors"
              >
                Return to the Fine Robusta Cambodia pillar →
              </Link>
              <p className="mt-2 text-xs leading-relaxed text-stone-500">
                This is the {robustaTopicOwnerLabel} owner within OCC’s Fine Robusta knowledge cluster. Use the pillar for the broader Cambodia origin, quality, sourcing, and commercial context.
              </p>
            </aside>
          )}

          {/* Fine Robusta Cambodia pillar backlink: semantic support cluster only */}
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
              <p className="text-[10px] tracking-[0.24em] text-occ-burgundy uppercase mb-3">Tags</p>
              <div className="flex flex-wrap gap-2">
                {keywordList.map((kw) => (
                  <span key={kw} className="rounded-full border border-occ-burgundy/28 px-3 py-1.5 text-xs text-occ-burgundy">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="article-cta mx-auto max-w-[720px] mt-12 bg-occ-burgundy text-occ-background p-7 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <p className="text-xs tracking-[0.24em] text-occ-background/68 uppercase mb-1">Origin Coffee Cambodia</p>
              <p className="font-bold tracking-tight">Need wholesale supply or roasting support?</p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 rounded-full border border-occ-background/55 px-5 py-2.5 text-xs uppercase tracking-[0.14em] text-occ-background transition-colors hover:bg-occ-background hover:text-occ-burgundy"
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
