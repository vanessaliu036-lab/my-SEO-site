import Link from "next/link"
import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { siteUrl } from "@/lib/siteConfig"
import { alternatesFromCanonical } from "@/lib/seo"
import { getAllPosts } from "@/lib/airtable"

const POSTS_PER_PAGE = 5

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
    alternates: alternatesFromCanonical(canonical),
  }
}

export const revalidate = 60

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
      <main className="min-h-screen bg-[#fbfaf7] font-sans overflow-x-hidden">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12 md:py-16">

          <header className="mb-8 md:mb-12 border-b border-stone-200 pb-8 md:pb-10">
            <span className="text-[10px] tracking-[0.26em] text-stone-400 uppercase mb-4 block">
              Field Notes &amp; Craft
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-stone-950 tracking-normal leading-none mb-4">
              The Signal.
            </h1>
            <p className="max-w-xl text-sm sm:text-base text-stone-600 font-normal leading-[1.75]">
              Origin intelligence from the OCC team.
            </p>
          </header>

          {posts.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-stone-400 text-sm tracking-[0.18em] uppercase">
                Articles coming soon.
              </p>
            </div>
          ) : (
            <>
            <ul className="divide-y divide-stone-200">
              {pagePosts.map((post) => (
                <li key={post.id} className="py-8 md:py-11 group">
                  <Link href={`/blog/${post.slug}`} className="block active:opacity-90">
                    <div className="flex items-start justify-between gap-5 sm:gap-10">
                      <div className="flex-1 min-w-0">
                        {post.category && (
                          <span className="text-[10px] tracking-[0.22em] text-stone-400 uppercase mb-3 block">
                            {post.category}
                          </span>
                        )}
                        <h2 className="max-w-4xl font-serif text-2xl sm:text-[1.8rem] md:text-[2.15rem] font-normal text-stone-950 tracking-normal leading-[1.12] mb-4 group-hover:underline underline-offset-4 decoration-[1px] break-words [text-wrap:balance]">
                          {post.title}
                        </h2>
                        {post.summary && (
                          <p className="text-sm sm:text-base text-stone-600 font-normal leading-[1.75] max-w-2xl [text-wrap:pretty]">
                            {post.summary}
                          </p>
                        )}
                        <div className="flex items-center gap-3 mt-5">
                          {post.publish_date && (
                            <time
                              dateTime={post.publish_date}
                              className="text-[10px] tracking-[0.18em] text-stone-400 uppercase"
                            >
                              {new Date(post.publish_date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </time>
                          )}
                          {post.author && post.author !== "OCC Team" && (
                            <span className="text-[10px] tracking-[0.18em] text-stone-400 uppercase">
                              / {post.author}
                            </span>
                          )}
                        </div>
                      </div>
                      <span
                        className="text-stone-300 text-xl flex-shrink-0 group-hover:text-stone-950 transition-colors mt-2"
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
                className="mt-12 md:mt-16 flex flex-wrap items-center justify-center gap-3 border-t border-stone-200 pt-10 md:pt-12"
                aria-label="Blog pagination"
              >
                {page > 1 ? (
                  <Link
                    href={page === 2 ? "/blog" : `/blog?page=${page - 1}`}
                    className="min-h-[44px] inline-flex items-center justify-center text-xs tracking-[0.16em] uppercase text-stone-600 border border-stone-200 px-5 py-2.5 hover:border-stone-950 hover:text-stone-950 transition-colors"
                  >
                    ← Previous
                  </Link>
                ) : (
                  <span className="min-h-[44px] inline-flex items-center justify-center text-xs tracking-[0.16em] uppercase text-stone-300 border border-stone-100 px-5 py-2.5 cursor-not-allowed">
                    ← Previous
                  </span>
                )}
                <span className="text-[11px] tracking-[0.16em] text-stone-400 px-2">
                  Page {page} / {totalPages}
                </span>
                {page < totalPages ? (
                  <Link
                    href={`/blog?page=${page + 1}`}
                    className="min-h-[44px] inline-flex items-center justify-center text-xs tracking-[0.16em] uppercase text-stone-600 border border-stone-200 px-5 py-2.5 hover:border-stone-950 hover:text-stone-950 transition-colors"
                  >
                    Next →
                  </Link>
                ) : (
                  <span className="min-h-[44px] inline-flex items-center justify-center text-xs tracking-[0.16em] uppercase text-stone-300 border border-stone-100 px-5 py-2.5 cursor-not-allowed">
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
