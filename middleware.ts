/**
 * MIDDLEWARE - SECURITY & ROUTING
 *
 * NOTE: As of CVE-2025-29927, middleware should NOT be used for authorization.
 * Authorization is handled in the Data Access Layer (DAL).
 *
 * This middleware is used for:
 * - Cookie management (Supabase session refresh)
 * - Basic redirect logic (convenience only)
 * - Security headers (additional layer)
 * - Rate limiting (future)
 *
 * NEVER rely on middleware for security decisions!
 */

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // 1. Session Management (Cookie refresh only)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  // 2. Protected Routes Redirect (convenience only, NOT security!)
  // Real authorization happens in DAL via verifySession()
  if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // 3. Add security headers to response
  // These supplement the headers in next.config.js
  response.headers.set('X-Robots-Tag', 'noindex, nofollow') // Don't index dashboard

  // 4. CSRF Token Validation (future)
  // if (request.method === 'POST' || request.method === 'PUT' || request.method === 'DELETE') {
  //   const csrfToken = request.headers.get('x-csrf-token')
  //   const expectedToken = request.cookies.get('csrf-token')?.value
  //   if (!csrfToken || csrfToken !== expectedToken) {
  //     return new NextResponse('Invalid CSRF token', { status: 403 })
  //   }
  // }

  return response
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
}
