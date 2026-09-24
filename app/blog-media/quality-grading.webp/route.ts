import { NextResponse } from "next/server"

export function GET(request: Request) {
  return NextResponse.redirect(new URL("/images/roasting/occ-roasting-bean-evaluation.webp", request.url), 307)
}
