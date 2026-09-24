import { NextResponse } from "next/server"

export function GET(request: Request) {
  return NextResponse.redirect(new URL("/images/occ-roasting-program-background.webp", request.url), 307)
}
