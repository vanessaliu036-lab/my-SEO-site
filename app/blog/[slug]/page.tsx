import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { Marked, type Renderer, type Tokens } from "marked"
import { siteUrl, siteName } from "@/lib/siteConfig"
import { alternatesFromCanonical } from "@/lib/seo"
import { publisherLogoImageObject } from "@/lib/organizationSchema"
import { getAllPosts, getPostBySlug } from "@/lib/airtable"

// 後台填的關鍵字 → 站內路徑。出現在文章本文時自動替換成連結。
const INTERNAL_LINKS: Record<string, string> = {
  "specialty coffee": "/solutions/wholesale",
  "wholesale coffee": "/solutions/wholesale",
  "wholesale": "/solutions/wholesale",
  "custom roasting": "/solutions/roasting-program",
  "roast profile": "/solutions/roasting-program",
  "roasting program": "/solutions/roasting-program",
  "barista staffing": "/solutions/barista-staffing",
  "barista": "/solutions/barista-staffing",
  "equipment service": "/solutions/equipment-service",
  "equipment": "/solutions/equipment-service",
}

const INTERNAL_LINK_ENTRIES = Object.entries(INTERNAL_LINKS).sort(
  ([a], [b]) => b.length - a.length
)

function addInternalLinks(text: string): string {
  const replacements: Array<{ href: string; match: string }> = []
  let result = text
  for (const [kw, href] of INTERNAL_LINK_ENTRIES) {
    const re = new RegExp(`\\b(${kw})\\b`, "gi")
    result = result.replace(re, (match) => {
      replacements.push({ href, match })
      return `\x00${replacements.length - 1}\x00`
    })
  }
  return result.replace(/\x00(\d+)\x00/g, (_, i) => {
    const { href, match } = replacements[Number(i)]
    return `<a href="${href}" class="border-b border-dashed border-gray-400 hover:border-gray-900 transition-colors">${match}</a>`
  })
}

/** 走過 marked 產生的 HTML：只在純文字節點上注入內部連結，
 *  並跳過 <a>/<code>/<pre> 內部以避免巢狀連結與破壞程式碼。 */
function injectInternalLinksHtml(html: string): string {
  let skipDepth = 0
  return html.replace(
    /(<(\/?)(a|code|pre)\b[^>]*>)|(<[^>]+>)|([^<]+)/gi,
    (match, sensitiveTag, slash, _name, otherTag, text) => {
      if (sensitiveTag) {
        if (slash === "/") skipDepth = Math.max(0, skipDepth - 1)
        else if (!sensitiveTag.endsWith("/>")) skipDepth += 1
        return sensitiveTag
      }
      if (otherTag) return otherTag
      if (text !== undefined) {
        if (skipDepth > 0) return text
        return addInternalLinks(text)
      }
      return match
    }
  )
}

/** 以隔離的 marked instance 渲染，避免與其他模組共用全域 renderer。
 *  H1 一律降級成 H2：頁面 header 已經有一個 <h1>{title}</h1>，
 *  作者若在 markdown 開頭也寫 # 標題，避免雙 H1 影響 SEO。 */
const markdown = new Marked({
  gfm: true,
  breaks: false,
})
markdown.use({
  renderer: {
    heading(this: Renderer, { tokens, depth }: Tokens.Heading) {
      const level = depth === 1 ? 2 : depth
      const inline = this.parser.parseInline(tokens)
      return `<h${level}>${inline}</h${level}>\n`
    },
  },
})

function formatContent(raw: string): string {
  if (!raw) return ""
  const html = markdown.parse(raw, { async: false }) as string
  return injectInternalLinksHtml(html)
}

function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

export const revalidate = 3600

/** 未在 build 預先列出的 slug 仍可 on-demand 產生，避免新文章 404。 */
export const dynamicParams = true

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: "Post not found" }

  return {
    title: `${post.title} | OCC — Origin Coffee Cambodia`,
    description: post.summary || undefined,
    alternates: alternatesFromCanonical(`${siteUrl}/blog/${post.slug}`),
    openGraph: {
      title: post.title,
      description: post.summary || undefined,
      url: `${siteUrl}/blog/${post.slug}`,
      siteName,
      type: "article",
      publishedTime: post.publish_date,
      authors: [post.author],
    },
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.filter((p: { slug: string }) => p.slug).map((p: { slug: string }) => ({ slug: p.slug }))
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [post, allPosts] = await Promise.all([getPostBySlug(slug), getAllPosts()])

  if (!post) notFound()

  const related = allPosts.filter((p: { slug: string }) => p.slug !== post.slug).slice(0, 3)
  const mins = readingTime(post.content)
  const formattedContent = formatContent(post.content)

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.summary || undefined,
    wordCount: post.content.split(/\s+/).length,
    author: { "@type": "Person", name: post.author },
    datePublished: post.publish_date,
    dateModified: post.publish_date,
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
      logo: publisherLogoImageObject(),
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/blog/${post.slug}` },
    url: `${siteUrl}/blog/${post.slug}`,
    speakableSpecification: {
      "@type": "SpeakableSpecification",
      cssSelector: ["article h1", "article h2", ".article-summary"],
    },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="min-h-screen bg-white overflow-x-hidden">
        {/* Reading progress bar */}
        <div className="fixed top-0 left-0 right-0 h-[2px] bg-gray-100 z-50">
          <div className="h-full bg-gray-900 w-0" style={{ transition: "width 0.1s" }} id="reading-progress" />
        </div>

        {/* Breadcrumb nav */}
        <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-dashed border-gray-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-[10px] sm:text-[11px] tracking-wider text-gray-400 uppercase min-w-0">
            <Link href="/" className="hover:text-gray-900 transition-colors shrink-0">Home</Link>
            <span className="shrink-0">/</span>
            <Link href="/blog" className="hover:text-gray-900 transition-colors shrink-0">Blog</Link>
            <span className="shrink-0">/</span>
            <span className="text-gray-700 truncate min-w-0">{post.title}</span>
          </div>
        </nav>

        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-16">
          {/* Header */}
          <header className="mb-10 md:mb-12">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="text-[11px] text-gray-400 tracking-wider">{mins} min read</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tighter leading-[1.15] mb-6 [text-wrap:balance]">
              {post.title}
            </h1>

            {post.summary && (
              <p className="article-summary text-base sm:text-lg text-gray-500 font-light leading-relaxed border-l-2 border-gray-900 pl-4 sm:pl-5 mb-6 [text-wrap:pretty]">
                {post.summary}
              </p>
            )}

            <div className="flex items-center gap-4 text-[11px] tracking-widest text-gray-400 uppercase border-t border-dashed border-gray-200 pt-5">
              {post.publish_date && (
                <time dateTime={post.publish_date}>
                  {new Date(post.publish_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              )}
              <span>—</span>
              <span>{post.author}</span>
            </div>
          </header>

          {/* Article content (rendered from Markdown) */}
          {formattedContent ? (
            <div
              className="
                prose prose-gray max-w-none
                prose-headings:text-gray-900 prose-headings:tracking-tight
                prose-h2:text-lg sm:prose-h2:text-xl prose-h2:font-bold prose-h2:uppercase
                prose-h2:mt-10 sm:prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-2
                prose-h2:border-b prose-h2:border-dashed prose-h2:border-gray-200
                prose-h3:text-base sm:prose-h3:text-lg prose-h3:font-bold prose-h3:mt-8 prose-h3:mb-3
                prose-h4:text-sm prose-h4:font-bold prose-h4:uppercase prose-h4:tracking-wider prose-h4:mt-6 prose-h4:mb-2
                prose-p:text-gray-700 prose-p:leading-[1.85] sm:prose-p:leading-[1.9]
                prose-p:text-[16px] sm:prose-p:text-[17px] prose-p:mb-5 prose-p:break-words
                prose-li:text-gray-700 prose-li:leading-[1.8] prose-li:my-1
                prose-ul:my-5 prose-ol:my-5 prose-ul:pl-6 prose-ol:pl-6
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-em:text-gray-800
                prose-a:text-gray-900 prose-a:no-underline prose-a:border-b prose-a:border-dashed
                prose-a:border-gray-400 hover:prose-a:border-gray-900
                prose-blockquote:border-l-2 prose-blockquote:border-l-gray-900
                prose-blockquote:pl-5 prose-blockquote:italic prose-blockquote:font-light
                prose-blockquote:text-gray-600 prose-blockquote:my-6
                prose-code:text-gray-900 prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5
                prose-code:rounded prose-code:text-[0.9em] prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-gray-950 prose-pre:text-gray-100 prose-pre:rounded-none prose-pre:p-5
                prose-hr:border-dashed prose-hr:border-gray-200 prose-hr:my-10
                prose-table:text-sm prose-th:bg-gray-50 prose-th:text-gray-900
                prose-th:font-bold prose-th:text-left prose-th:p-3
                prose-td:p-3 prose-td:border-t prose-td:border-gray-200
                prose-img:rounded prose-img:my-6
              "
              dangerouslySetInnerHTML={{ __html: formattedContent }}
            />
          ) : (
            <p className="text-gray-400 text-sm italic">Content coming soon.</p>
          )}

          {/* CTA */}
          <div className="mt-12 bg-gray-950 text-white p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-1">Origin Coffee Cambodia</p>
              <p className="font-bold tracking-tight">Need wholesale supply or roasting support?</p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 text-xs tracking-wider border border-white px-5 py-2.5 hover:bg-white hover:text-gray-900 transition-colors uppercase"
            >
              Talk to Our Team →
            </Link>
          </div>
        </article>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16 md:pb-20">
            <div className="border-t border-dashed border-gray-200 pt-12">
              <p className="text-[10px] tracking-[0.4em] text-gray-400 uppercase mb-8">More Articles</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="group block border border-dashed border-gray-200 p-5 hover:border-gray-800 transition-all hover:-translate-y-0.5"
                  >
                    <h3 className="text-sm font-bold text-gray-900 leading-snug mb-2 group-hover:underline underline-offset-2">
                      {r.title}
                    </h3>
                    {r.summary && (
                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{r.summary}</p>
                    )}
                    <span className="inline-block mt-3 text-[10px] tracking-wider text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all">
                      Read →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Back link */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-12">
          <Link
            href="/blog"
            className="text-[11px] tracking-[0.2em] text-gray-400 hover:text-gray-900 uppercase transition-colors flex items-center gap-2"
          >
            ← All Articles
          </Link>
        </div>
      </div>
    </>
  )
}
