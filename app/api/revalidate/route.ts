import { revalidatePath } from "next/cache"
import type { NextRequest } from "next/server"

/**
 * On-demand ISR revalidation endpoint.
 *
 * Production URL: https://origincafekh.com/api/revalidate
 *
 * Trigger from Airtable Automations when Status changes to Publish/Published,
 * OR run manually after editing Airtable to push immediately.
 *
 * Usage:
 *   POST  { "secret": "<REVALIDATE_SECRET>", "slug": "optional-post-slug" }
 *   GET   ?secret=<REVALIDATE_SECRET>&slug=<optional-post-slug>   (browser / cron / curl)
 *
 * Behaviour:
 *   - slug provided → revalidates /blog/<slug>
 *   - no slug       → revalidates /blog, all /blog/[slug] pages, and /sitemap.xml
 *
 * Setup:
 *   1. Set env var REVALIDATE_SECRET on Vercel (and .env.local for dev)
 *   2. In Airtable Automations add a "Send a POST request" action on the Articles
 *      and OCC_Blog_Posts tables, fired when Status becomes one of {Publish, Published}.
 *      URL:  https://origincafekh.com/api/revalidate
 *      Body: { "secret": "<REVALIDATE_SECRET>", "slug": "{{record.slug}}" }
 */

type Parsed = { secret?: string; slug?: string }

async function readBody(req: NextRequest): Promise<Parsed> {
  // Try JSON first, then fall back to query string (lets GET / curl work).
  const contentType = req.headers.get("content-type") || ""
  if (req.method === "POST" && contentType.includes("application/json")) {
    try {
      const j = (await req.json()) as Parsed
      return j && typeof j === "object" ? j : {}
    } catch {
      return {}
    }
  }
  const url = new URL(req.url)
  return {
    secret: url.searchParams.get("secret") ?? undefined,
    slug: url.searchParams.get("slug") ?? undefined,
  }
}

async function handle(req: NextRequest) {
  const expected = process.env.REVALIDATE_SECRET
  if (!expected) {
    return Response.json(
      { error: "REVALIDATE_SECRET env var not set" },
      { status: 500 }
    )
  }

  const body = await readBody(req)
  if (!body.secret || body.secret !== expected) {
    return Response.json({ error: "Invalid secret" }, { status: 401 })
  }

  const slug = (body.slug || "").trim()
  if (slug) {
    revalidatePath(`/blog/${slug}`)
    return Response.json({ revalidated: true, path: `/blog/${slug}` })
  }

  revalidatePath("/blog")
  revalidatePath("/blog/[slug]", "page")
  revalidatePath("/sitemap.xml")
  return Response.json({
    revalidated: true,
    paths: ["/blog", "/blog/[slug]", "/sitemap.xml"],
  })
}

export async function POST(req: NextRequest) {
  return handle(req)
}

export async function GET(req: NextRequest) {
  return handle(req)
}
