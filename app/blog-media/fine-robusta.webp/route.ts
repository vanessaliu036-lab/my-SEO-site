import { NextResponse } from "next/server"

export function GET(request: Request) {
  return NextResponse.redirect(new URL("/images/wholesale/occ-wholesale-origin-harvest.png", request.url), 307)
}
