import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { hostname, pathname, search } = request.nextUrl;

  if (hostname === "www.origincafekh.com") {
    const url = new URL(`https://origincafekh.com${pathname}${search}`);
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
