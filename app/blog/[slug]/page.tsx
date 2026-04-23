import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { siteUrl, siteName } from "@/lib/siteConfig"
import { alternatesFromCanonical } from "@/lib/seo"
import { publisherLogoImageObject } from "@/lib/organizationSchema"
import { getAllPosts, getPostBySlug } from "@/lib/airtable"

// Plain-text / Markdown -> readable HTML with internal links injected
const INTERNAL_LINKS: Record<string, string> = {
  "specialty coffee": "/solutions/wholesale",
  "wholesale coffee": "/solutions/wholesale",
  "wholesale": "/solutions/wholesale",
  "custom roasting": "/solutions/roasting-program",
  "roast profile": "/solutions/roasting-program",
  "roasting program": "/solutions/roasting-program",
  "barista staffing": "/solutions/barista-staffing",
  "barista": "/solutions/barista-staffing",
  "equipment service": "/solutions/equipment-service",
  "equipment": "/solutions/equipment-service",
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
  return addInternalLinks(escaped)
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[(.*?)\]\((https?:\/\/[^)]+|\/[^)]+)\)/g, (_match, label, href) => {
      return `<a href="${href}" class="border-b border-stone-300 text-stone-950 transition-colors hover:border-stone-950">${label}</a>`
    })
    .replace(/\[([^\]]+)\]/g, (_match, label) => {
      return `<a href="/contact" class="border-b border-stone-300 text-stone-950 transition-colors hover:border-stone-950">${label}</a>`
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

function formatContent(raw: string, title: string): string {
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

    html.push(`<p>${renderInlineMarkdown(line)}</p>`)
  }

  return html.join("")
}

function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

export const revalidate = 3600

/** 列表未預建的 slug 仍可開文（與 getAllPosts 規則一致）。 */
export const dynamicParams = true

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: "Post not found" }

  return {
    title: `${post.title} | OCC — Origin Coffee Cambodia`,
    description: post.summary || post.excerpt,
    keywords: post.keywords,
    alternates: alternatesFromCanonical(`${siteUrl}/blog/${post.slug}`),
    openGraph: {
      title: post.title,
      description: post.summary || post.excerpt,
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
  const posts = await getAllPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [post, allPosts] = await Promise.all([getPostBySlug(slug), getAllPosts()])

  if (!post) notFound()

  const related = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3)
  const mins = readingTime(post.content)
  const keywordList = post.keywords
    ? post.keywords.split(",").map((k) => k.trim()).filter(Boolean)
    : []
  const formattedContent = formatContent(post.content, post.title)

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.summary || post.excerpt,
    keywords: post.keywords,
    wordCount: post.content.split(/\s+/).length,
    author: { "@type": "Person", name: post.author },
    datePublished: post.publish_date,
    dateModified: post.publish_date,
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
      { "@type": "ListItem", position: 3, name: post.title, item: `${siteUrl}/blog/${post.slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="min-h-screen bg-[#fbfaf7] text-stone-950 overflow-x-hidden">
        {/* Reading progress bar */}
        <div className="fixed top-0 left-0 right-0 h-[2px] bg-gray-100 z-50">
          <div className="h-full bg-gray-900 w-0" style={{ transition: "width 0.1s" }} id="reading-progress" />
        </div>

        {/* Breadcrumb nav */}
        <nav className="sticky top-0 z-40 bg-[#fbfaf7]/90 backdrop-blur-sm border-b border-stone-200">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-3 flex items-center gap-2 text-[10px] sm:text-[11px] tracking-[0.16em] text-stone-400 uppercase min-w-0">
            <Link href="/" className="hover:text-stone-950 transition-colors shrink-0">Home</Link>
            <span className="shrink-0">/</span>
            <Link href="/blog" className="hover:text-stone-950 transition-colors shrink-0">Blog</Link>
            <span className="shrink-0">/</span>
            <span className="text-stone-700 truncate min-w-0">{post.title}</span>
          </div>
        </nav>

        <article className="max-w-5xl mx-auto px-5 sm:px-8 py-12 md:py-20">
          {/* Header */}
          <header className="mx-auto max-w-[820px] mb-12 md:mb-16">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {post.category && (
                <span className="text-[10px] tracking-[0.26em] text-stone-600 border border-stone-300 px-2.5 py-1 uppercase">
                  {post.category}
                </span>
              )}
              <span className="text-[11px] text-stone-400 tracking-[0.18em] uppercase">{mins} min read</span>
            </div>

            <h1 className="font-serif text-[2.65rem] sm:text-5xl md:text-6xl lg:text-[4.6rem] font-normal text-stone-950 tracking-normal leading-[0.98] mb-7 [text-wrap:balance]">
              {post.title}
            </h1>

            {(post.summary || post.excerpt) && (
              <p className="article-summary max-w-2xl text-lg sm:text-xl text-stone-600 font-light leading-relaxed border-l border-stone-950 pl-4 sm:pl-5 mb-8 [text-wrap:pretty]">
                {post.summary || post.excerpt}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-3 text-[11px] tracking-[0.18em] text-stone-400 uppercase border-t border-stone-200 pt-5">
              {post.publish_date && (
                <time dateTime={post.publish_date}>
                  {new Date(post.publish_date).toLocaleDateString("en-US", {
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
                [&>h2]:font-sans [&>h2]:text-[1.65rem] sm:[&>h2]:text-[2rem] [&>h2]:font-semibold [&>h2]:text-stone-950 [&>h2]:tracking-normal
                [&>h2]:leading-tight [&>h2]:mt-14 sm:[&>h2]:mt-16 [&>h2]:mb-5 [&>h2]:pt-8
                [&>h2]:border-t [&>h2]:border-stone-200
                [&>h3]:font-sans [&>h3]:text-[1.05rem] sm:[&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-stone-900
                [&>h3]:tracking-normal [&>h3]:leading-snug [&>h3]:mt-10 [&>h3]:mb-4
                [&>p]:font-serif [&>p]:text-stone-700 [&>p]:leading-[1.85] sm:[&>p]:leading-[1.9] [&>p]:text-[18px] sm:[&>p]:text-[19px] [&>p]:mb-7 [&>p]:break-words
                [&_strong]:font-semibold [&_strong]:text-stone-950
                [&>ul]:my-7 [&>ul]:space-y-3 [&>ul]:pl-6 [&>ul]:list-disc
                [&>ol]:my-7 [&>ol]:space-y-3 [&>ol]:pl-6 [&>ol]:list-decimal
                [&_li]:font-serif [&_li]:text-[18px] sm:[&_li]:text-[19px] [&_li]:leading-[1.75] [&_li]:text-stone-700 [&_li]:pl-1
                [&_.article-link-note]:my-8 [&_.article-link-note]:border-l [&_.article-link-note]:border-stone-950 [&_.article-link-note]:bg-white/60 [&_.article-link-note]:px-5 [&_.article-link-note]:py-4
                [&_.article-link-note_span]:block [&_.article-link-note_span]:font-sans [&_.article-link-note_span]:text-[10px] [&_.article-link-note_span]:uppercase [&_.article-link-note_span]:tracking-[0.22em] [&_.article-link-note_span]:text-stone-400 [&_.article-link-note_span]:mb-1
                [&_.article-link-note_a]:font-sans [&_.article-link-note_a]:text-sm [&_.article-link-note_a]:font-medium [&_.article-link-note_a]:text-stone-950 [&_.article-link-note_a]:border-b [&_.article-link-note_a]:border-stone-300 [&_.article-link-note_a]:hover:border-stone-950
                [&_.article-table-wrap]:my-10 [&_.article-table-wrap]:overflow-x-auto [&_.article-table-wrap]:border-y [&_.article-table-wrap]:border-stone-200
                [&_table]:w-full [&_table]:min-w-[620px] [&_table]:border-collapse
                [&_th]:py-4 [&_th]:pr-6 [&_th]:text-left [&_th]:font-sans [&_th]:text-[11px] [&_th]:font-semibold [&_th]:uppercase [&_th]:tracking-[0.16em] [&_th]:text-stone-500
                [&_td]:border-t [&_td]:border-stone-200 [&_td]:py-4 [&_td]:pr-6 [&_td]:font-serif [&_td]:text-[17px] [&_td]:leading-relaxed [&_td]:text-stone-700
              "
              dangerouslySetInnerHTML={{ __html: formattedContent }}
            />
          ) : (
            <p className="mx-auto max-w-[720px] text-stone-400 text-sm italic">Content coming soon.</p>
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

        {/* Related articles */}
        {related.length > 0 && (
          <section className="max-w-5xl mx-auto px-5 sm:px-8 pb-16 md:pb-20">
            <div className="mx-auto max-w-[720px] border-t border-stone-200 pt-12">
              <p className="text-[10px] tracking-[0.24em] text-stone-400 uppercase mb-8">More Articles</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="group block border-t border-stone-200 pt-5 transition-all hover:-translate-y-0.5"
                  >
                    {r.category && (
                      <span className="text-[9px] tracking-[0.22em] text-stone-400 uppercase block mb-2">
                        {r.category}
                      </span>
                    )}
                    <h3 className="text-sm font-semibold text-stone-950 leading-snug mb-2 group-hover:underline underline-offset-2">
                      {r.title}
                    </h3>
                    {r.summary && (
                      <p className="text-xs text-stone-500 leading-relaxed line-clamp-2">{r.summary}</p>
                    )}
                    <span className="inline-block mt-3 text-[10px] tracking-[0.14em] text-stone-400 group-hover:text-stone-950 group-hover:translate-x-1 transition-all">
                      Read →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

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
