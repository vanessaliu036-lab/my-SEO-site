import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/** Legacy `?page=` pagination → `/blog/p/:n`. Host www redirect lives in `next.config.mjs`. */
export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

  if (pathname !== "/blog") {
    return NextResponse.next()
  }

  const p = searchParams.get("page")
  if (p === null || p === "") {
    return NextResponse.next()
  }

  const n = parseInt(p, 10)
  if (!Number.isFinite(n) || n < 1) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  url.searchParams.delete("page")
  if (n <= 1) {
    return NextResponse.redirect(url, 301)
  }
  url.pathname = `/blog/p/${n}`
  return NextResponse.redirect(url, 301)
}

export const config = {
  matcher: ["/blog"],
}
