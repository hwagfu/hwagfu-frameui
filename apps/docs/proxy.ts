import { NextResponse, type NextRequest } from "next/server"

import { SESSION_COOKIE, verifyRegistryToken, verifySessionToken } from "@/lib/auth"

/** Every page of the docs requires a signed-in session. */
export function proxy(request: NextRequest) {
  if (verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value)) {
    return NextResponse.next()
  }

  const { pathname, search } = request.nextUrl

  // shadcn registry: the CLI authenticates with the install token instead, and
  // gets a JSON error rather than a redirect to the HTML login page.
  if (pathname.startsWith("/r/")) {
    if (verifyRegistryToken(request.headers.get("authorization"))) return NextResponse.next()
    return NextResponse.json(
      { error: "Thiếu hoặc sai token FrameUI. Xem mục “Cài bằng shadcn CLI” trong trang docs." },
      { status: 401 }
    )
  }

  const login = new URL("/login", request.url)
  if (pathname !== "/") login.searchParams.set("next", `${pathname}${search}`)
  return NextResponse.redirect(login)
}

export const config = {
  // Everything except the login page itself, build assets, icons and crawler files.
  matcher: ["/((?!login|_next/static|_next/image|favicon.ico|icon.svg|apple-icon.png|robots.txt).*)"],
}
