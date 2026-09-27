import { NextResponse, type NextRequest } from "next/server"

import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth"

/** Every page of the docs requires a signed-in session. */
export function proxy(request: NextRequest) {
  if (verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value)) {
    return NextResponse.next()
  }

  const { pathname, search } = request.nextUrl
  const login = new URL("/login", request.url)
  if (pathname !== "/") login.searchParams.set("next", `${pathname}${search}`)
  return NextResponse.redirect(login)
}

export const config = {
  // Everything except the login page itself, build assets and crawler files.
  matcher: ["/((?!login|_next/static|_next/image|favicon.ico|robots.txt).*)"],
}
