import Link from "next/link"
import type { Metadata } from "next"
import { siteUrl } from "@/lib/siteConfig"
import { getAllPosts } from "@/lib/airtable"

export const metadata: Metadata = {
  title: "Blog | Arunéra Coffee Cambodia",
  description: "Insights on specialty coffee sourcing, Cambodia origins, and precision roasting from Origin Coffee Crafter.",
  alternates: { canonical: `${siteUrl}/blog` },
}

export const dynamic = "force-dynamic"

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
  ],
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="min-h-screen bg-white font-sans">
        <div className="max-w-5xl mx-auto px-6 py-20">

          {/* Header */}
          <header className="mb-16 border-b border-gray-200 pb-12">
            <span className="text-[10px] tracking-[0.5em] text-gray-400 uppercase italic mb-4 block">
              Field Notes &amp; Craft
            </span>
            <h1 className="text-5xl font-bold text-gray-900 tracking-tighter mb-4 uppercase">
              The Signal.
            </h1>
            <p className="text-sm text-gray-500 tracking-widest uppercase font-light">
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
            <ul className="divide-y divide-gray-100">
              {posts.map((post) => (
                <li key={post.id} className="py-10 group">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="flex items-start justify-between gap-8">
                      <div className="flex-1 min-w-0">
                        {post.category && (
                          <span className="text-[10px] tracking-[0.3em] text-gray-400 uppercase mb-3 block">
                            {post.category}
                          </span>
                        )}
                        <h2 className="text-xl font-bold text-gray-900 tracking-tight mb-3 group-hover:underline underline-offset-4 uppercase">
                          {post.title}
                        </h2>
                        {post.summary && (
                          <p className="text-sm text-gray-500 font-light leading-relaxed max-w-2xl">
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
          )}

        </div>
      </main>
    </>
  )
}
