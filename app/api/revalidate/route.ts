import { revalidatePath } from "next/cache"
import type { NextRequest } from "next/server"
import { validateRevalidationPayload } from "@/lib/revalidation-payload.mjs"

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
 *      Header: Content-Type: application/json
 *      Body: { "secret": "<REVALIDATE_SECRET>", "slug": "{{record.slug}}" }
 *
 * Never send the secret in a URL. Query strings can be retained in browser history,
 * request logs, and referrer data.
 */

async function readBody(req: NextRequest): Promise<unknown> {
  const contentType = req.headers.get("content-type") || ""
  if (req.method === "POST" && contentType.includes("application/json")) {
    try {
      return await req.json()
    } catch {
      return {}
    }
  }
  return {}
}

async function handle(req: NextRequest) {
  const expected = process.env.REVALIDATE_SECRET
  if (!expected) {
    return Response.json(
      { error: "REVALIDATE_SECRET env var not set" },
      { status: 500 }
    )
  }

  const payload = validateRevalidationPayload(await readBody(req), expected)
  if (!payload.ok && payload.status === 401) {
    return Response.json({ error: "Invalid secret" }, { status: 401 })
  }
  if (!payload.ok) {
    return Response.json({ error: "Invalid slug" }, { status: 400 })
  }

  const slug = payload.slug
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
