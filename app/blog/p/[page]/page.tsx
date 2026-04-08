import Link from "next/link"
import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { siteUrl } from "@/lib/siteConfig"
import { alternatesFromCanonical } from "@/lib/seo"
import { getAllPosts } from "@/lib/airtable"
import BlogList from "../../BlogList"

const POSTS_PER_PAGE = 5

const TITLE_BASE = "Blog | Origin Coffee Cambodia"

export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>
}): Promise<Metadata> {
  const { page: pageStr } = await params
  const pageNum = parseInt(pageStr, 10)
  if (!Number.isFinite(pageNum) || pageNum < 2) {
    return { title: TITLE_BASE }
  }
  const canonical = `${siteUrl}/blog/p/${pageNum}`
  return {
    title: `${TITLE_BASE} — Page ${pageNum}`,
    description:
      "Insights on specialty coffee sourcing, Cambodia origins, and precision roasting from Origin Coffee Cambodia.",
    alternates: alternatesFromCanonical(canonical),
  }
}

const breadcrumbSchema = (pageNum: number) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
    { "@type": "ListItem", position: 3, name: `Page ${pageNum}`, item: `${siteUrl}/blog/p/${pageNum}` },
  ],
})

export default async function BlogPagedPage({
  params,
}: {
  params: Promise<{ page: string }>
}) {
  const { page: pageStr } = await params
  const pageRaw = parseInt(pageStr, 10)
  if (!Number.isFinite(pageRaw)) {
    notFound()
  }
  if (pageRaw < 1) {
    notFound()
  }
  if (pageRaw === 1) {
    redirect("/blog")
  }

  const posts = await getAllPosts()
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE))

  if (posts.length > 0 && pageRaw > totalPages) {
    redirect(totalPages <= 1 ? "/blog" : `/blog/p/${totalPages}`)
  }

  const start = (pageRaw - 1) * POSTS_PER_PAGE
  const pagePosts = posts.slice(start, start + POSTS_PER_PAGE)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(pageRaw)) }}
      />
      <main className="min-h-screen bg-white font-sans overflow-x-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-20">
          <nav className="mb-8 text-[11px] tracking-widest text-gray-400 uppercase">
            <Link href="/blog" className="hover:text-gray-900 transition-colors">
              ← Blog
            </Link>
          </nav>
          <BlogList pagePosts={pagePosts} page={pageRaw} totalPages={totalPages} />
        </div>
      </main>
    </>
  )
}
