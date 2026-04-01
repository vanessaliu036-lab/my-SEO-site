import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { siteUrl, siteName } from "@/lib/siteConfig"
import { getPostBySlug, getAllPosts } from "@/lib/airtable"

// ISR: regenerate this page in the background at most once per hour.
// For instant updates, POST to /api/revalidate with the correct secret.
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
    title: `${post.title} | Arunéra Coffee Cambodia`,
    description: post.summary || post.excerpt,
    keywords: post.keywords,
    alternates: { canonical: `${siteUrl}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.summary || post.excerpt,
      url: `${siteUrl}/blog/${post.slug}`,
      siteName: "Arunéra Coffee Cambodia",
      type: "article",
      publishedTime: post.publish_date,
      authors: [post.author],
    },
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.filter((p) => p.slug).map((p) => ({ slug: p.slug }))
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) notFound()

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.summary || post.excerpt,
    author: { "@type": "Person", name: post.author },
    datePublished: post.publish_date,
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
    },
    url: `${siteUrl}/blog/${post.slug}`,
    ...(post.featured_image_url && { image: post.featured_image_url }),
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <article className="min-h-screen bg-white font-sans">
        <div className="max-w-3xl mx-auto px-6 py-20">

          {/* Back */}
          <nav aria-label="Breadcrumb" className="mb-12">
            <Link
              href="/blog"
              className="text-[11px] tracking-[0.2em] text-gray-400 hover:text-gray-900 uppercase transition-colors flex items-center gap-2"
            >
              <span aria-hidden="true">←</span> All Articles
            </Link>
          </nav>

          {/* Header */}
          <header className="mb-12 pb-12 border-b border-gray-200">
            {post.category && (
              <span className="text-[10px] tracking-[0.4em] text-gray-400 uppercase mb-4 block">
                {post.category}
              </span>
            )}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tighter leading-tight mb-6 uppercase">
              {post.title}
            </h1>
            {post.summary && (
              <p className="text-base text-gray-500 font-light leading-relaxed italic border-l-2 border-gray-900 pl-4">
                {post.summary}
              </p>
            )}
            <div className="flex items-center gap-4 mt-6 text-[11px] tracking-widest text-gray-400 uppercase">
              {post.publish_date && (
                <time dateTime={post.publish_date}>
                  {new Date(post.publish_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              )}
              {post.author && <span>— {post.author}</span>}
            </div>
          </header>

          {/* Content */}
          {post.content ? (
            <div
              className="prose prose-gray max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-headings:uppercase prose-p:text-gray-600 prose-p:font-light prose-p:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          ) : (
            <p className="text-gray-400 text-sm italic">Content coming soon.</p>
          )}

        </div>
      </article>
    </>
  )
}
