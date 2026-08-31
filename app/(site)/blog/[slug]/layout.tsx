import type { ReactNode } from "react"
import "./article-editorial.css"

// The OCC article corpus is large and Airtable-backed. Rendering article
// routes on demand prevents Vercel builds from pre-rendering the entire
// corpus while preserving the exact public article UI and URLs.
export const dynamic = "force-dynamic"

export default function BlogPostLayout({ children }: { children: ReactNode }) {
  return <div className="occ-article-shell">{children}</div>
}
