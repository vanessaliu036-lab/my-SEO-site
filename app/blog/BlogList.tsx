import Link from "next/link"
import type { BlogPost } from "@/lib/airtable"

type BlogListProps = {
  pagePosts: BlogPost[]
  page: number
  totalPages: number
}

export default function BlogList({ pagePosts, page, totalPages }: BlogListProps) {
  return (
    <>
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

      {pagePosts.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-gray-400 text-sm tracking-widest uppercase">Articles coming soon.</p>
        </div>
      ) : (
        <>
          <ul className="divide-y divide-gray-100">
            {pagePosts.map((post) => (
              <li key={post.id} className="py-8 md:py-10 group">
                <Link href={`/blog/${post.slug}`} className="block active:opacity-90">
                  <div className="flex items-start justify-between gap-4 sm:gap-8">
                    <div className="flex-1 min-w-0">
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
                        {post.author && (
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
                  href={page === 2 ? "/blog" : `/blog/p/${page - 1}`}
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
                  href={`/blog/p/${page + 1}`}
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
    </>
  )
}
