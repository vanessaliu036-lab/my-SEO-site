import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getAllPosts } from "@/lib/airtable"
import {
  displayNameForTag,
  postMatchesVisibleTag,
} from "@/lib/blogTags"
import { siteName, siteUrl } from "@/lib/siteConfig"

export const revalidate = 300
const POSTS_PER_PAGE = 24

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>
}): Promise<Metadata> {
  const { tag } = await params
  const posts = await getAllPosts()
  const matching = posts.filter((post) => postMatchesVisibleTag(post, tag))
  if (!matching.length) return {}

  const label = displayNameForTag(matching, tag)
  const url = `${siteUrl}/blog/tag/${tag}`

  return {
    title: `${label} Articles | OCC Journal`,
    description: `Browse OCC Journal articles tagged ${label}.`,
    robots: { index: false, follow: true },
    alternates: { canonical: url },
    openGraph: {
      title: `${label} Articles | OCC Journal`,
      description: `Browse OCC Journal articles tagged ${label}.`,
      url,
      siteName,
      type: "website",
    },
  }
}

export default async function BlogTagPage({
  params,
  searchParams,
}: {
  params: Promise<{ tag: string }>
  searchParams: Promise<{ page?: string }>
}) {
  const { tag } = await params
  const { page: pageString } = await searchParams
  const page = Math.max(1, Number.parseInt(pageString || "1", 10) || 1)

  const posts = await getAllPosts()
  const matching = posts.filter((post) => postMatchesVisibleTag(post, tag))
  if (!matching.length) notFound()

  const label = displayNameForTag(matching, tag)
  const totalPages = Math.max(1, Math.ceil(matching.length / POSTS_PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const pagePosts = matching.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

  return (
    <>
      <section className="border-b border-occ-primary/15 bg-occ-background text-occ-primary">
        <div className="mx-auto w-full max-w-[1360px] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <Link
            href="/blog"
            className="mb-5 inline-flex text-[10px] font-semibold uppercase tracking-[0.22em] text-occ-burgundy transition-opacity hover:opacity-60"
          >
            OCC Journal / Tag
          </Link>
          <h1 className="max-w-[980px] font-[var(--font-display)] text-[clamp(3.6rem,7vw,7rem)] font-normal leading-[0.88] tracking-[-0.05em] text-occ-primary">
            {label}
          </h1>
          <p className="mt-6 text-sm uppercase tracking-[0.14em] text-occ-primary/45">
            {matching.length} {matching.length === 1 ? "article" : "articles"}
          </p>
        </div>
      </section>

      <section className="bg-occ-background text-occ-primary">
        <div className="mx-auto w-full max-w-[1360px] px-5 py-6 sm:px-8 lg:px-12">
          <div className="divide-y divide-occ-primary/16 border-t border-occ-primary/16">
            {pagePosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug.replace(/^blog\//, "")}`}
                className="group grid gap-4 py-7 transition-colors hover:bg-white/40 sm:grid-cols-[150px_minmax(0,1fr)_130px] sm:gap-8 sm:px-2 sm:py-9"
              >
                <time
                  dateTime={post.publish_date || undefined}
                  className="text-[12px] tracking-[0.02em] text-occ-primary/50"
                >
                  {post.publish_date
                    ? new Date(post.publish_date).toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "OCC Journal"}
                </time>

                <div className="min-w-0">
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-occ-burgundy">
                    {post.category || "OCC Journal"}
                  </span>
                  <h2 className="mt-2 max-w-[900px] text-[clamp(1.5rem,2.7vw,2.3rem)] font-semibold leading-[1.03] tracking-[-0.035em] text-occ-primary group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
                    {post.title}
                  </h2>
                  {post.summary && !/<\/?[a-z][\s\S]*>/i.test(post.summary) ? (
                    <p className="mt-4 max-w-[820px] text-sm leading-7 text-occ-primary/58 sm:text-[15px]">
                      {post.summary}
                    </p>
                  ) : null}
                </div>

                <div className="text-left text-[11px] uppercase tracking-[0.12em] text-occ-primary/45 sm:text-right">
                  <span className="block">OCC Journal</span>
                  <span className="mt-1 block">Read →</span>
                </div>
              </Link>
            ))}
          </div>

          {totalPages > 1 ? (
            <nav className="flex items-center justify-center gap-3 border-t border-occ-primary/16 py-10" aria-label="Tag pagination">
              {currentPage > 1 ? (
                <Link
                  href={currentPage === 2 ? `/blog/tag/${tag}` : `/blog/tag/${tag}?page=${currentPage - 1}`}
                  className="inline-flex min-h-10 items-center px-3 text-sm text-occ-primary/60 hover:text-occ-burgundy"
                >
                  ←
                </Link>
              ) : <span className="px-3 text-occ-primary/20">←</span>}

              <span className="text-[11px] uppercase tracking-[0.16em] text-occ-primary/45">
                {currentPage} / {totalPages}
              </span>

              {currentPage < totalPages ? (
                <Link
                  href={`/blog/tag/${tag}?page=${currentPage + 1}`}
                  className="inline-flex min-h-10 items-center px-3 text-sm text-occ-primary/60 hover:text-occ-burgundy"
                >
                  →
                </Link>
              ) : <span className="px-3 text-occ-primary/20">→</span>}
            </nav>
          ) : null}
        </div>
      </section>
    </>
  )
}
