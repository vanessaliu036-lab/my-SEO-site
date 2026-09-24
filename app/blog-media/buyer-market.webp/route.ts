import { NextResponse } from "next/server"

export function GET(request: Request) {
  return NextResponse.redirect(new URL("/distribution-hero.webp", request.url), 307)
}
