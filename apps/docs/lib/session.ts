import "server-only"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { SESSION_COOKIE, verifySessionToken } from "./auth"

/**
 * Re-checks the session inside a page that shows secrets. The proxy already
 * guards every route; this keeps the page safe even if a matcher change ever
 * stops the proxy from running on it. Reading cookies also makes the page
 * render per request, so secrets are never baked into a static file.
 */
export async function requireSession(from: string) {
  const jar = await cookies()
  if (!verifySessionToken(jar.get(SESSION_COOKIE)?.value)) {
    redirect(`/login?next=${encodeURIComponent(from)}`)
  }
}
