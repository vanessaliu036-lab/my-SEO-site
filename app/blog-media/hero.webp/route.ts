import { NextResponse } from "next/server"

export function GET(request: Request) {
  return NextResponse.redirect(new URL("/about/occ-about-green-hero.webp", request.url), 307)
}
