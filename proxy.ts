import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { authorizeAdmin } from '@/lib/admin-basic-auth.mjs'

export function proxy(request: NextRequest) {
  const result = authorizeAdmin(request.headers.get('authorization'), {
    username: process.env.OCC_ADMIN_USER,
    password: process.env.OCC_ADMIN_PASSWORD,
  })

  if (result === 'unconfigured') {
    return new NextResponse('Staff access has not been configured.', {
      status: 503,
      headers: { 'Cache-Control': 'no-store' },
    })
  }
  if (result !== 'authorized') {
    return new NextResponse('Staff sign-in required.', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="OCC Staff Access", charset="UTF-8"',
        'Cache-Control': 'no-store',
      },
    })
  }
  const response = NextResponse.next()
  response.headers.set('Cache-Control', 'private, no-store')
  response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive')
  return response
}

export const config = { matcher: ['/admin/:path*'] }
