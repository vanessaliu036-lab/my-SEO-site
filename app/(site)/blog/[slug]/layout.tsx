import type { Metadata } from "next"
import type { ReactNode } from "react"
import { getPostBySlug } from "@/lib/airtable"
import "./article-editorial.css"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post || post.indexable) return {}

  return {
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
      },
    },
  }
}

export default function BlogPostLayout({ children }: { children: ReactNode }) {
  return <div className="occ-article-shell">{children}</div>
}
