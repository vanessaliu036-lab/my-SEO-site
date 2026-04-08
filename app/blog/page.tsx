import type { Metadata } from "next"
import { siteUrl } from "@/lib/siteConfig"
import { alternatesFromCanonical } from "@/lib/seo"
import { getAllPosts } from "@/lib/airtable"
import BlogList from "./BlogList"

const POSTS_PER_PAGE = 5

/** Prevents the index from being treated as dynamic; helps static / CDN deployments. */
export const dynamic = "force-static"
export const revalidate = 3600

const titleBase = "Blog | Origin Coffee Cambodia"

export async function generateMetadata(): Promise<Metadata> {
  const canonical = `${siteUrl}/blog`
  return {
    title: titleBase,
    description:
      "Insights on specialty coffee sourcing, Cambodia origins, and precision roasting from Origin Coffee Cambodia.",
    alternates: alternatesFromCanonical(canonical),
  }
}

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
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE))
  const pagePosts = posts.slice(0, POSTS_PER_PAGE)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className="min-h-screen bg-white font-sans overflow-x-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-20">
          <BlogList pagePosts={pagePosts} page={1} totalPages={totalPages} />
        </div>
      </main>
    </>
  )
}
