import { NextResponse } from "next/server"

export function GET(request: Request) {
  return NextResponse.redirect(new URL("/images/roasting/occ-roasting-profile-cupping.webp", request.url), 307)
}
