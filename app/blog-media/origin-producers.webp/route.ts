import { NextResponse } from "next/server"

export function GET(request: Request) {
  return NextResponse.redirect(new URL("/images/partnerships/occ-partnerships-origin-collaboration.webp", request.url), 307)
}
