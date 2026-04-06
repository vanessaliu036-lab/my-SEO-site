import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { siteUrl, siteName } from "@/lib/siteConfig"
import { alternatesFromCanonical } from "@/lib/seo"
import { publisherLogoImageObject } from "@/lib/organizationSchema"

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY || process.env.AIRTABLE_PAT
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
const TABLE = "OCC_Blog_Posts"

function pickField(fields: Record<string, unknown>, keys: string[], fallback = ""): string {
  for (const key of keys) {
    const value = fields[key]
    if (typeof value === "string" && value.trim() !== "") return value
    if (typeof value === "object" && value !== null && "name" in value) {
      const name = String((value as { name: unknown }).name ?? "").trim()
      if (name !== "") return name
    }
  }
  return fallback
}

function getStatus(fields: Record<string, unknown>): string {
  const raw = fields.status ?? fields.Status ?? ""
  if (typeof raw === "object" && raw !== null && "name" in raw) {
    return String((raw as { name: unknown }).name ?? "").trim().toLowerCase()
  }
  return String(raw).trim().toLowerCase()
}

async function getAllPosts() {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) return []
  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${TABLE}?sort[0][field]=publish_date&sort[0][direction]=desc&maxRecords=100`,
      { headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` }, next: { revalidate: 60 } }
    )
    if (!res.ok) return []
    const data = await res.json()
    if (!data.records || !Array.isArray(data.records)) return []
    return data.records
      .filter((r: { fields: Record<string, unknown> }) => {
        const status = getStatus(r.fields)
        return status === "published" || status === ""
      })
      .map((r: { id: string; fields: Record<string, unknown> }) => ({
        id: r.id,
        title: pickField(r.fields, ["title", "Title"], "Untitled"),
        slug: pickField(r.fields, ["slug", "Slug"]),
        summary: pickField(r.fields, ["summary", "Summary"]),
        category: pickField(r.fields, ["Category", "category"]),
        publish_date: pickField(r.fields, ["publish_date", "Publish Date", "Last Modified"]),
      }))
      .filter((p: { slug: string }) => p.slug)
  } catch {
    return []
  }
}

async function getPostBySlug(slug: string) {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) return null
  try {
    const safe = slug.replace(/'/g, "\\'")
    const query = new URLSearchParams({
      filterByFormula: `OR({slug}='${safe}',{Slug}='${safe}')`,
      maxRecords: "1",
    })
    const res = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${TABLE}?${query}`,
      { headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` }, next: { revalidate: 60 } }
    )
    if (!res.ok) return null
    const data = await res.json()
    if (!data.records || data.records.length === 0) return null
    const r = data.records[0]
    const status = getStatus(r.fields)
    if (status !== "published" && status !== "") return null
    return {
      id: r.id,
      title: pickField(r.fields, ["title", "Title"], "Untitled"),
      slug: pickField(r.fields, ["slug", "Slug"]),
      content: pickField(r.fields, ["Content", "content"]),
      summary: pickField(r.fields, ["summary", "Summary"]),
      author: pickField(r.fields, ["author", "Author"], "OCC Team"),
      publish_date: pickField(r.fields, ["publish_date", "Publish Date", "Last Modified"]),
      featured_image_url: pickField(r.fields, ["featured_image_url", "Featured Image URL"]),
      category: pickField(r.fields, ["Category", "category"]),
      excerpt: pickField(r.fields, ["Excerpt", "excerpt"]),
      keywords: pickField(r.fields, ["Keywords", "keywords"]),
    }
  } catch {
    return null
  }
}

// Plain-text → readable HTML with internal links injected
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
    return `<a href="${href}" class="border-b border-dashed border-gray-400 hover:border-gray-900 transition-colors">${match}</a>`
  })
}

function isHeading(line: string): boolean {
  return line.length < 65 && !/[.,:;?!]$/.test(line) && line === line.trim()
}

function formatContent(raw: string, title: string): string {
  if (!raw) return ""
  const lines = raw.split("\n").map((l) => l.trim()).filter((l) => l)
  const start = lines[0]?.toLowerCase() === title.toLowerCase() ? 1 : 0
  const body = lines.slice(start)
  return body
    .map((line) => {
      if (isHeading(line)) {
        return `<h2>${line}</h2>`
      }
      return `<p>${addInternalLinks(line)}</p>`
    })
    .join("")
}

function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

export const revalidate = 3600

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
  return posts.filter((p: { slug: string }) => p.slug).map((p: { slug: string }) => ({ slug: p.slug }))
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [post, allPosts] = await Promise.all([getPostBySlug(slug), getAllPosts()])

  if (!post) notFound()

  const related = allPosts.filter((p: { slug: string }) => p.slug !== post.slug).slice(0, 3)
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

      <div className="min-h-screen bg-white overflow-x-hidden">
        {/* Reading progress bar */}
        <div className="fixed top-0 left-0 right-0 h-[2px] bg-gray-100 z-50">
          <div className="h-full bg-gray-900 w-0" style={{ transition: "width 0.1s" }} id="reading-progress" />
        </div>

        {/* Breadcrumb nav */}
        <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-dashed border-gray-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-[10px] sm:text-[11px] tracking-wider text-gray-400 uppercase min-w-0">
            <Link href="/" className="hover:text-gray-900 transition-colors shrink-0">Home</Link>
            <span className="shrink-0">/</span>
            <Link href="/blog" className="hover:text-gray-900 transition-colors shrink-0">Blog</Link>
            <span className="shrink-0">/</span>
            <span className="text-gray-700 truncate min-w-0">{post.title}</span>
          </div>
        </nav>

        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-16">
          {/* Header */}
          <header className="mb-10 md:mb-12">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              {post.category && (
                <span className="text-[10px] tracking-[0.4em] text-white bg-gray-900 px-2 py-1 uppercase">
                  {post.category}
                </span>
              )}
              <span className="text-[11px] text-gray-400 tracking-wider">{mins} min read</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tighter leading-[1.15] mb-6 [text-wrap:balance]">
              {post.title}
            </h1>

            {(post.summary || post.excerpt) && (
              <p className="article-summary text-base sm:text-lg text-gray-500 font-light leading-relaxed border-l-2 border-gray-900 pl-4 sm:pl-5 mb-6 [text-wrap:pretty]">
                {post.summary || post.excerpt}
              </p>
            )}

            <div className="flex items-center gap-4 text-[11px] tracking-widest text-gray-400 uppercase border-t border-dashed border-gray-200 pt-5">
              {post.publish_date && (
                <time dateTime={post.publish_date}>
                  {new Date(post.publish_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              )}
              <span>—</span>
              <span>{post.author}</span>
            </div>
          </header>

          {/* Article content */}
          {formattedContent ? (
            <div
              className="
                [&>h2]:text-lg sm:[&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:tracking-tight
                [&>h2]:uppercase [&>h2]:mt-8 sm:[&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:pb-2
                [&>h2]:border-b [&>h2]:border-dashed [&>h2]:border-gray-200
                [&>p]:text-gray-700 [&>p]:leading-[1.85] sm:[&>p]:leading-[1.9] [&>p]:text-[16px] sm:[&>p]:text-[17px] [&>p]:mb-5 [&>p]:break-words
              "
              dangerouslySetInnerHTML={{ __html: formattedContent }}
            />
          ) : (
            <p className="text-gray-400 text-sm italic">Content coming soon.</p>
          )}

          {/* Keywords */}
          {keywordList.length > 0 && (
            <div className="mt-14 pt-8 border-t border-dashed border-gray-200">
              <p className="text-[10px] tracking-[0.3em] text-gray-400 uppercase mb-3">Topics</p>
              <div className="flex flex-wrap gap-2">
                {keywordList.map((kw) => (
                  <span key={kw} className="text-xs text-gray-600 border border-dashed border-gray-300 px-3 py-1">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 bg-gray-950 text-white p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-1">Origin Coffee Cambodia</p>
              <p className="font-bold tracking-tight">Need wholesale supply or roasting support?</p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 text-xs tracking-wider border border-white px-5 py-2.5 hover:bg-white hover:text-gray-900 transition-colors uppercase"
            >
              Talk to Our Team →
            </Link>
          </div>
        </article>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16 md:pb-20">
            <div className="border-t border-dashed border-gray-200 pt-12">
              <p className="text-[10px] tracking-[0.4em] text-gray-400 uppercase mb-8">More Articles</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {related.map((r: { slug: string; title: string; category: string; publish_date: string; summary: string }) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="group block border border-dashed border-gray-200 p-5 hover:border-gray-800 transition-all hover:-translate-y-0.5"
                  >
                    {r.category && (
                      <span className="text-[9px] tracking-[0.3em] text-gray-400 uppercase block mb-2">
                        {r.category}
                      </span>
                    )}
                    <h3 className="text-sm font-bold text-gray-900 leading-snug mb-2 group-hover:underline underline-offset-2">
                      {r.title}
                    </h3>
                    {r.summary && (
                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{r.summary}</p>
                    )}
                    <span className="inline-block mt-3 text-[10px] tracking-wider text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all">
                      Read →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Back link */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-12">
          <Link
            href="/blog"
            className="text-[11px] tracking-[0.2em] text-gray-400 hover:text-gray-900 uppercase transition-colors flex items-center gap-2"
          >
            ← All Articles
          </Link>
        </div>
      </div>
    </>
  )
}
