import { revalidatePath } from "next/cache"
import type { NextRequest } from "next/server"

/**
 * On-demand ISR revalidation endpoint.
 *
 * Trigger from Airtable Automations:
 *   Method: POST
 *   URL:    https://occ.coffee/api/revalidate
 *   Body:   { "secret": "<REVALIDATE_SECRET>", "slug": "optional-post-slug" }
 *
 * Setup:
 *   1. Set env var REVALIDATE_SECRET to a random string (e.g. openssl rand -hex 32)
 *   2. In Vercel → Settings → Environment Variables, add REVALIDATE_SECRET
 *   3. In Airtable Automations, add a "Send a POST request" action pointing here
 *      whenever a record's status changes to "Published"
 *
 * Behaviour:
 *   - If `slug` is provided → revalidates /blog/<slug> only
 *   - If no `slug`          → revalidates /blog (index) + all post paths
 */
export async function POST(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET

  if (!secret) {
    return Response.json({ error: "REVALIDATE_SECRET env var not set" }, { status: 500 })
  }

  let body: { secret?: string; slug?: string }
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  if (body.secret !== secret) {
    return Response.json({ error: "Invalid secret" }, { status: 401 })
  }

  if (body.slug) {
    revalidatePath(`/blog/${body.slug}`)
    return Response.json({ revalidated: true, path: `/blog/${body.slug}` })
  }

  // No slug → revalidate the index and all dynamic post routes
  revalidatePath("/blog")
  revalidatePath("/blog/[slug]", "page")
  revalidatePath("/sitemap.xml")
  return Response.json({ revalidated: true, path: "/blog, /blog/[slug], /sitemap.xml" })
}
