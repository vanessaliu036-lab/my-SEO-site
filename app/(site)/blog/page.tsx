import Link from "next/link"
import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { siteUrl, siteName, ogImage } from "@/lib/siteConfig"
import { alternatesFromCanonical } from "@/lib/seo"
import { getAllPosts, getRecentPosts } from "@/lib/airtable"

const POSTS_PER_PAGE = 5

const CORE_FINE_ROBUSTA_OWNERS = [
  {
    href: "/fine-robusta-cambodia",
    label: "Fine Robusta Cambodia",
    note: "Origin, quality, sourcing and Cambodia-specific context.",
  },
  {
    href: "/blog/fine-robusta-grading-verify-before-cupping",
    label: "Fine Robusta Grading",
    note: "Buyer verification, grading and pre-cupping evidence.",
  },
  {
    href: "/blog/fine-robusta-fermentation",
    label: "Fine Robusta Fermentation",
    note: "Process control, sensory risk and fermentation decisions.",
  },
  {
    href: "/blog/how-to-brew-cambodian-fine-robusta",
    label: "How to Brew Fine Robusta",
    note: "Brewing methods, extraction and evaluation.",
  },
  {
    href: "/blog/fine-robusta-vs-arabica-buyer-guide",
    label: "Fine Robusta vs Arabica",
    note: "Buyer-focused species comparison and use cases.",
  },
] as const

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
    openGraph: {
      title: page <= 1 ? titleBase : `${titleBase} — Page ${page}`,
      description:
        "Insights on specialty coffee sourcing, Cambodia origins, and precision roasting from Origin Coffee Cambodia.",
      url: canonical,
      siteName,
      locale: "en_US",
      type: "website",
      images: [{ url: ogImage, width: 1672, height: 941, alt: siteName }],
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

export const revalidate = 300

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
  const isLandingPage = page === 1

  // Emergency performance guard: the landing page only needs the newest cards.
  // Do not read the full 1,800+ record corpus just to render five articles.
  const posts = isLandingPage ? await getRecentPosts() : await getAllPosts()
  const totalPages = isLandingPage
    ? null
    : Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE))

  if (!isLandingPage && totalPages && posts.length > 0 && page > totalPages) {
    redirect(`/blog?page=${totalPages}`)
  }

  const start = isLandingPage ? 0 : (page - 1) * POSTS_PER_PAGE
  const pagePosts = posts.slice(start, start + POSTS_PER_PAGE)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Keep the Blog surface aligned with the global OCC warm-ivory shell. */}
      <main className="min-h-screen bg-[#f6f3ea] font-sans overflow-x-hidden">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12 md:py-16">

          <header className="mb-8 md:mb-12 border-b border-stone-200 pb-8 md:pb-10">
            <span className="text-[10px] tracking-[0.26em] text-stone-400 uppercase mb-4 block">
              Field Notes &amp; Craft
            </span>
            <h1 className="font-sans text-3xl sm:text-4xl md:text-[3rem] font-semibold text-stone-950 tracking-tight leading-none mb-4">
              The Signal.
            </h1>
            <p className="max-w-xl font-sans text-sm sm:text-base text-stone-500 leading-relaxed">
              Origin intelligence from the OCC team.
            </p>
          </header>

          {page === 1 && (
            <section className="mb-10 md:mb-14 border-b border-stone-200 pb-9 md:pb-11" aria-labelledby="core-fine-robusta-guides">
              <div className="flex flex-col gap-2 mb-6">
                <span className="text-[10px] tracking-[0.24em] text-stone-400 uppercase">Core Fine Robusta Guides</span>
                <h2 id="core-fine-robusta-guides" className="text-lg sm:text-xl font-semibold tracking-tight text-stone-950">
                  Start with the primary topic owners.
                </h2>
                <p className="max-w-2xl text-[13px] sm:text-sm leading-relaxed text-stone-500">
                  These pages carry OCC&apos;s broad Fine Robusta topic ownership. Supporting articles narrow into specific mechanisms, evidence and applications.
                </p>
              </div>
              <div className="grid gap-px bg-stone-200 border border-stone-200 sm:grid-cols-2 lg:grid-cols-5">
                {CORE_FINE_ROBUSTA_OWNERS.map((guide) => (
                  <Link
                    key={guide.href}
                    href={guide.href}
                    className="group bg-[#f6f3ea] p-4 min-h-[132px] flex flex-col justify-between hover:bg-white transition-colors"
                  >
                    <span className="text-[13px] font-semibold leading-snug text-stone-950 group-hover:underline underline-offset-4">
                      {guide.label}
                    </span>
                    <span className="mt-5 text-[11px] leading-relaxed text-stone-500">
                      {guide.note}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

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
                        <h2 className="max-w-4xl font-sans text-[16px] font-semibold text-stone-950 tracking-tight leading-[1.35] mb-3 group-hover:underline underline-offset-4 decoration-[1px] break-words [text-wrap:balance]">
                          {post.title}
                        </h2>
                        {post.summary && (
                          <p className="font-sans text-[13px] sm:text-sm text-stone-500 leading-relaxed max-w-2xl [text-wrap:pretty]">
                            {post.summary}
                          </p>
                        )}
                        <div className="flex items-center gap-3 mt-5">
                          {post.publish_date && (
                            <time
                              dateTime={post.publish_date}
                              className="text-[10px] tracking-[0.18em] text-stone-400 uppercase"
                            >
                              {new Date(post.publish_date).toLocaleDateString("en-GB", {
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

            {isLandingPage ? (
              <nav
                className="mt-12 md:mt-16 flex flex-wrap items-center justify-center gap-3 border-t border-stone-200 pt-10 md:pt-12"
                aria-label="Blog pagination"
              >
                <span className="min-h-[44px] inline-flex items-center justify-center text-xs tracking-[0.16em] uppercase text-stone-300 border border-stone-100 px-5 py-2.5 cursor-not-allowed">
                  ← Previous
                </span>
                <span className="text-[11px] tracking-[0.16em] text-stone-400 px-2">
                  Page 1
                </span>
                {posts.length > POSTS_PER_PAGE ? (
                  <Link
                    href="/blog?page=2"
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
            ) : totalPages && totalPages > 1 ? (
              <nav
                className="mt-12 md:mt-16 flex flex-wrap items-center justify-center gap-3 border-t border-stone-200 pt-10 md:pt-12"
                aria-label="Blog pagination"
              >
                <Link
                  href={page === 2 ? "/blog" : `/blog?page=${page - 1}`}
                  className="min-h-[44px] inline-flex items-center justify-center text-xs tracking-[0.16em] uppercase text-stone-600 border border-stone-200 px-5 py-2.5 hover:border-stone-950 hover:text-stone-950 transition-colors"
                >
                  ← Previous
                </Link>
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
            ) : null}
            </>
          )}

        </div>
      </main>
    </>
  )
}
