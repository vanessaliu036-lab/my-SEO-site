import type { Metadata } from "next"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { getAllPosts } from "@/lib/airtable"
import { getBlogCategory, postMatchesBlogCategory } from "@/lib/blogCategories"
import { alternatesFromCanonical } from "@/lib/seo"
import { siteName, siteUrl } from "@/lib/siteConfig"

const POSTS_PER_PAGE = 12

export const revalidate = 300

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>
  searchParams: Promise<{ page?: string }>
}): Promise<Metadata> {
  const { category: slug } = await params
  const category = getBlogCategory(slug)
  if (!category) return {}

  const { page: pageString } = await searchParams
  const page = Math.max(1, Number.parseInt(pageString || "1", 10) || 1)
  const canonical =
    page === 1
      ? `${siteUrl}/blog/category/${category.slug}`
      : `${siteUrl}/blog/category/${category.slug}?page=${page}`

  return {
    title: `${category.title} | OCC Journal`,
    description: category.description,
    alternates: alternatesFromCanonical(canonical),
    openGraph: {
      title: `${category.title} | OCC Journal`,
      description: category.description,
      url: canonical,
      siteName,
      locale: "en_US",
      type: "website",
    },
  }
}

export default async function BlogCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>
  searchParams: Promise<{ page?: string }>
}) {
  const { category: slug } = await params
  const category = getBlogCategory(slug)
  if (!category) notFound()

  const { page: pageString } = await searchParams
  const parsedPage = Number.parseInt(pageString || "1", 10)
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1

  const allPosts = await getAllPosts()
  const posts = allPosts.filter((post) => postMatchesBlogCategory(post, category))
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE))

  if (posts.length > 0 && page > totalPages) {
    redirect(`/blog/category/${category.slug}?page=${totalPages}`)
  }

  const pagePosts = posts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE)
  const categoryUrl = `${siteUrl}/blog/category/${category.slug}`
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: category.title, item: categoryUrl },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="bg-occ-background text-occ-primary">
        <div className="mx-auto grid w-full max-w-[1360px] gap-10 border-b border-occ-primary/16 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:px-12 lg:py-20">
          <div>
            <Link
              href="/blog"
              className="mb-5 inline-flex text-[10px] font-semibold uppercase tracking-[0.22em] text-occ-burgundy transition-opacity hover:opacity-60"
            >
              Journal / Category
            </Link>
            <h1 className="max-w-[620px] font-[var(--font-display)] text-[clamp(4.7rem,9vw,8.8rem)] font-normal leading-[0.82] tracking-[-0.055em] text-occ-primary">
              {category.title}
            </h1>
          </div>
          <p className="max-w-[680px] pb-2 text-lg leading-8 text-occ-primary/60 sm:text-xl lg:text-2xl lg:leading-9">
            {category.description}
          </p>
        </div>
      </section>

      <section className="bg-[#FAF7F2] text-occ-primary">
        <div className="mx-auto w-full max-w-[1360px] px-5 py-4 sm:px-8 lg:px-12">
          {pagePosts.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-sm uppercase tracking-[0.18em] text-occ-primary/45">
                No articles in this category yet.
              </p>
              <Link href="/blog" className="mt-5 inline-flex border-b border-occ-primary pb-1 text-[10px] uppercase tracking-[0.2em]">
                Back to journal
              </Link>
            </div>
          ) : (
            <>
              <div className="divide-y divide-occ-primary/16 border-t border-occ-primary/16">
                {pagePosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group grid gap-4 py-7 transition-colors hover:bg-white/55 sm:grid-cols-[150px_minmax(0,1fr)_130px] sm:gap-8 sm:px-2 sm:py-9"
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
                        {post.category || category.title}
                      </span>
                      <h2 className="mt-2 max-w-[880px] text-[clamp(1.55rem,2.8vw,2.35rem)] font-semibold leading-[1.03] tracking-[-0.035em] text-occ-primary group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
                        {post.title}
                      </h2>
                      {post.summary ? (
                        <p className="mt-4 max-w-[820px] text-sm leading-7 text-occ-primary/58 sm:text-[15px]">
                          {post.summary}
                        </p>
                      ) : null}
                    </div>

                    <div className="text-left text-[11px] uppercase tracking-[0.12em] text-occ-primary/45 sm:text-right">
                      <span className="block">OCC Journal</span>
                      <span className="mt-1 block">Research</span>
                    </div>
                  </Link>
                ))}
              </div>

              {totalPages > 1 ? (
                <nav className="flex items-center justify-center gap-3 border-t border-occ-primary/16 py-10" aria-label="Category pagination">
                  {page > 1 ? (
                    <Link
                      href={page === 2 ? `/blog/category/${category.slug}` : `/blog/category/${category.slug}?page=${page - 1}`}
                      className="inline-flex min-h-10 items-center px-3 text-sm text-occ-primary/60 hover:text-occ-primary"
                    >
                      ←
                    </Link>
                  ) : (
                    <span className="inline-flex min-h-10 items-center px-3 text-sm text-occ-primary/20">←</span>
                  )}

                  {Array.from({ length: totalPages }, (_, index) => index + 1)
                    .filter((number) => Math.abs(number - page) <= 2 || number === 1 || number === totalPages)
                    .map((number, index, visible) => {
                      const previous = visible[index - 1]
                      const showGap = previous && number - previous > 1
                      return (
                        <span key={number} className="flex items-center gap-3">
                          {showGap ? <span className="text-occ-primary/30">…</span> : null}
                          <Link
                            href={number === 1 ? `/blog/category/${category.slug}` : `/blog/category/${category.slug}?page=${number}`}
                            aria-current={number === page ? "page" : undefined}
                            className={`grid size-8 place-items-center rounded-full text-[11px] ${
                              number === page
                                ? "bg-occ-primary text-occ-background"
                                : "text-occ-primary/60 hover:text-occ-primary"
                            }`}
                          >
                            {number}
                          </Link>
                        </span>
                      )
                    })}

                  {page < totalPages ? (
                    <Link
                      href={`/blog/category/${category.slug}?page=${page + 1}`}
                      className="inline-flex min-h-10 items-center px-3 text-sm text-occ-primary/60 hover:text-occ-primary"
                    >
                      →
                    </Link>
                  ) : (
                    <span className="inline-flex min-h-10 items-center px-3 text-sm text-occ-primary/20">→</span>
                  )}
                </nav>
              ) : null}
            </>
          )}
        </div>
      </section>
    </>
  )
}
