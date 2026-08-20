import Link from "next/link"
import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { ArrowUpRight } from "lucide-react"
import { siteUrl, siteName, ogImage } from "@/lib/siteConfig"
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
  const canonical = page <= 1 ? `${siteUrl}/blog` : `${siteUrl}/blog?page=${page}`
  return {
    title: page <= 1 ? titleBase : `${titleBase} — Page ${page}`,
    description:
      "Insights on specialty coffee sourcing, Cambodia origins, and precision roasting from Origin Coffee Cambodia.",
    alternates: alternatesFromCanonical(canonical),
    openGraph: {
      title: page <= 1 ? titleBase : `${titleBase} — Page ${page}`,
      description:
        "Insights on specialty coffee sourcing, Cambodia origins, and precision roasting from Origin Coffee Cambodia.",
      url: canonical,
      siteName,
      locale: "en_US",
      type: "website",
      images: [{ url: ogImage, width: 180, height: 180, alt: siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title: page <= 1 ? titleBase : `${titleBase} — Page ${page}`,
      description:
        "Insights on specialty coffee sourcing, Cambodia origins, and precision roasting from Origin Coffee Cambodia.",
      images: [ogImage],
    },
  }
}

export const revalidate = 30

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

  if (posts.length > 0 && page > totalPages) redirect(`/blog?page=${totalPages}`)
  if (page < 1) redirect("/blog")

  const start = (page - 1) * POSTS_PER_PAGE
  const pagePosts = posts.slice(start, start + POSTS_PER_PAGE)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className="min-h-screen overflow-x-hidden bg-[#f6f3ea] text-[#182019]">
        <section className="relative border-b border-black/10">
          <div className="pointer-events-none absolute inset-0 hidden grid-cols-12 divide-x divide-black/[0.06] md:grid" aria-hidden="true">
            {Array.from({ length: 12 }).map((_, index) => <div key={index} />)}
          </div>
          <div className="relative mx-auto grid min-h-[58svh] w-full max-w-[1680px] grid-cols-1 items-end gap-10 px-6 pb-16 pt-28 sm:px-8 md:grid-cols-12 md:px-12 lg:px-16 lg:pb-20 lg:pt-32">
            <div className="md:col-span-3 md:pb-3">
              <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-black/36">Field Notes &amp; Craft</p>
              <p className="mt-6 max-w-xs text-[15px] leading-7 text-black/52">Origin intelligence from the OCC team.</p>
            </div>
            <div className="md:col-span-7 md:col-start-4">
              <h1 className="font-[var(--font-display)] text-[clamp(5rem,10vw,10rem)] font-normal leading-[0.78] tracking-[-0.065em]">THE SIGNAL.</h1>
            </div>
            <div className="md:col-span-2 md:pb-3">
              <div className="border-t border-black/10 pt-5 text-[10px] uppercase leading-6 tracking-[0.18em] text-black/38">
                <p>Journal / OCC</p>
                <p>Page {page} / {totalPages}</p>
                <p>{posts.length} Articles</p>
              </div>
            </div>
          </div>
          <div className="relative mx-auto flex w-full max-w-[1680px] items-center justify-between border-t border-black/10 px-6 py-5 text-[9px] uppercase tracking-[0.2em] text-black/34 sm:px-8 md:px-12 lg:px-16">
            <span>Origin Coffee Cambodia</span>
            <span className="hidden sm:block">Research · Buyers · Origins</span>
            <span>04 / Blog</span>
          </div>
        </section>

        <div className="mx-auto w-full max-w-[1680px] px-6 sm:px-8 md:px-12 lg:px-16">
          {posts.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-sm uppercase tracking-[0.18em] text-black/35">Articles coming soon.</p>
            </div>
          ) : (
            <>
              <section className="border-b border-black/10 py-14 lg:py-20" aria-label="Journal articles">
                <div className="border-t border-black/10">
                  {pagePosts.map((post, index) => (
                    <article key={post.id} className="group border-b border-black/10">
                      <Link href={`/blog/${post.slug}`} className="grid grid-cols-1 gap-5 py-8 transition-colors hover:bg-white/30 md:grid-cols-12 md:items-start md:gap-6 lg:py-10">
                        <div className="md:col-span-1">
                          <span className="text-[9px] tracking-[0.2em] text-black/30">{String(start + index + 1).padStart(3, "0")}</span>
                        </div>
                        <div className="md:col-span-6">
                          {post.category && <span className="mb-3 block text-[9px] uppercase tracking-[0.22em] text-black/35">{post.category}</span>}
                          <h2 className="max-w-4xl font-[var(--font-display)] text-3xl font-normal leading-[1.02] tracking-[-0.035em] transition-transform duration-300 group-hover:translate-x-2 sm:text-4xl lg:text-[2.8rem]">
                            {post.title}
                          </h2>
                        </div>
                        <div className="md:col-span-3">
                          {post.summary && <p className="max-w-md text-sm leading-7 text-black/50">{post.summary}</p>}
                        </div>
                        <div className="flex items-end justify-between gap-4 md:col-span-2 md:min-h-[110px] md:flex-col md:items-end">
                          <div className="text-[9px] uppercase leading-5 tracking-[0.16em] text-black/34 md:text-right">
                            {post.publish_date && (
                              <time dateTime={post.publish_date}>
                                {new Date(post.publish_date).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}
                              </time>
                            )}
                            {post.author && post.author !== "OCC Team" && <p>{post.author}</p>}
                          </div>
                          <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              </section>

              {totalPages > 1 && (
                <nav className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 py-10" aria-label="Blog pagination">
                  {page > 1 ? (
                    <Link href={page === 2 ? "/blog" : `/blog?page=${page - 1}`} className="text-[10px] font-medium uppercase tracking-[0.18em] text-black/55 transition-colors hover:text-black">← Previous</Link>
                  ) : <span className="text-[10px] uppercase tracking-[0.18em] text-black/20">← Previous</span>}
                  <span className="text-[10px] uppercase tracking-[0.18em] text-black/35">Page {page} / {totalPages}</span>
                  {page < totalPages ? (
                    <Link href={`/blog?page=${page + 1}`} className="text-[10px] font-medium uppercase tracking-[0.18em] text-black/55 transition-colors hover:text-black">Next →</Link>
                  ) : <span className="text-[10px] uppercase tracking-[0.18em] text-black/20">Next →</span>}
                </nav>
              )}
            </>
          )}

          <footer className="flex flex-col gap-4 py-9 text-[9px] uppercase tracking-[0.19em] text-black/34 sm:flex-row sm:justify-between">
            <span>Origin Coffee Cambodia · OCC</span>
            <span>Journal / The Signal</span>
          </footer>
        </div>
      </main>
    </>
  )
}
