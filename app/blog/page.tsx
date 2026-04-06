import Link from "next/link"
import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { siteUrl } from "@/lib/siteConfig"

const POSTS_PER_PAGE = 5

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
        author: pickField(r.fields, ["author", "Author"], "OCC Team"),
        publish_date: pickField(r.fields, ["publish_date", "Publish Date", "Last Modified"]),
        category: pickField(r.fields, ["Category", "category"]),
      }))
      .filter((p: { slug: string }) => p.slug)
  } catch {
    return []
  }
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}): Promise<Metadata> {
  const { page: pageStr } = await searchParams
  const page = Math.max(1, parseInt(pageStr || "1", 10) || 1)
  const titleBase = "Blog | Origin Coffee Cambodia"
  const canonical =
    page <= 1 ? `${siteUrl}/blog` : `${siteUrl}/blog?page=${page}`
  return {
    title: page <= 1 ? titleBase : `${titleBase} — Page ${page}`,
    description:
      "Insights on specialty coffee sourcing, Cambodia origins, and precision roasting from Origin Coffee Cambodia.",
    alternates: { canonical },
  }
}

export const revalidate = 3600

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
  ],
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page: pageStr } = await searchParams
  const pageRaw = parseInt(pageStr || "1", 10)
  const page = Number.isFinite(pageRaw) && pageRaw >= 1 ? pageRaw : 1

  const posts = await getAllPosts()
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE))

  if (posts.length > 0 && page > totalPages) {
    redirect(`/blog?page=${totalPages}`)
  }
  if (page < 1) {
    redirect("/blog")
  }

  const start = (page - 1) * POSTS_PER_PAGE
  const pagePosts = posts.slice(start, start + POSTS_PER_PAGE)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="min-h-screen bg-white font-sans overflow-x-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-20">

          {/* Header */}
          <header className="mb-10 md:mb-16 border-b border-gray-200 pb-8 md:pb-12">
            <span className="text-[10px] tracking-[0.5em] text-gray-400 uppercase italic mb-4 block">
              Field Notes &amp; Craft
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tighter mb-4 uppercase">
              The Signal.
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 tracking-widest uppercase font-light leading-relaxed">
              Origin intelligence from the OCC team.
            </p>
          </header>

          {posts.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-gray-400 text-sm tracking-widest uppercase">
                Articles coming soon.
              </p>
            </div>
          ) : (
            <>
            <ul className="divide-y divide-gray-100">
              {pagePosts.map((post: { id: string; slug: string; title: string; category: string; summary: string; publish_date: string; author: string }) => (
                <li key={post.id} className="py-8 md:py-10 group">
                  <Link href={`/blog/${post.slug}`} className="block active:opacity-90">
                    <div className="flex items-start justify-between gap-4 sm:gap-8">
                      <div className="flex-1 min-w-0">
                        {post.category && (
                          <span className="text-[10px] tracking-[0.3em] text-gray-400 uppercase mb-3 block">
                            {post.category}
                          </span>
                        )}
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight mb-3 group-hover:underline underline-offset-4 uppercase break-words">
                          {post.title}
                        </h2>
                        {post.summary && (
                          <p className="text-sm text-gray-500 font-light leading-relaxed max-w-2xl [text-wrap:pretty]">
                            {post.summary}
                          </p>
                        )}
                        <div className="flex items-center gap-4 mt-4">
                          {post.publish_date && (
                            <time
                              dateTime={post.publish_date}
                              className="text-[11px] tracking-widest text-gray-400 uppercase"
                            >
                              {new Date(post.publish_date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </time>
                          )}
                          {post.author && post.author !== "OCC Team" && (
                            <span className="text-[11px] tracking-widest text-gray-400 uppercase">
                              — {post.author}
                            </span>
                          )}
                        </div>
                      </div>
                      <span
                        className="text-gray-300 text-xl flex-shrink-0 group-hover:text-gray-900 transition-colors mt-1"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>

            {totalPages > 1 && (
              <nav
                className="mt-12 md:mt-16 flex flex-wrap items-center justify-center gap-3 border-t border-gray-100 pt-10 md:pt-12"
                aria-label="Blog pagination"
              >
                {page > 1 ? (
                  <Link
                    href={page === 2 ? "/blog" : `/blog?page=${page - 1}`}
                    className="min-h-[44px] inline-flex items-center justify-center text-xs tracking-widest uppercase text-gray-600 border border-gray-200 px-5 py-2.5 hover:border-gray-900 hover:text-gray-900 transition-colors"
                  >
                    ← Previous
                  </Link>
                ) : (
                  <span className="min-h-[44px] inline-flex items-center justify-center text-xs tracking-widest uppercase text-gray-300 border border-gray-100 px-5 py-2.5 cursor-not-allowed">
                    ← Previous
                  </span>
                )}
                <span className="text-[11px] tracking-widest text-gray-400 px-2">
                  Page {page} / {totalPages}
                </span>
                {page < totalPages ? (
                  <Link
                    href={`/blog?page=${page + 1}`}
                    className="min-h-[44px] inline-flex items-center justify-center text-xs tracking-widest uppercase text-gray-600 border border-gray-200 px-5 py-2.5 hover:border-gray-900 hover:text-gray-900 transition-colors"
                  >
                    Next →
                  </Link>
                ) : (
                  <span className="min-h-[44px] inline-flex items-center justify-center text-xs tracking-widest uppercase text-gray-300 border border-gray-100 px-5 py-2.5 cursor-not-allowed">
                    Next →
                  </span>
                )}
              </nav>
            )}
            </>
          )}

        </div>
      </main>
    </>
  )
}
