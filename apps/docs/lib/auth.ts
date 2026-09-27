import { createHmac, timingSafeEqual } from "node:crypto"

/**
 * Docs access control.
 *
 * One account, configured through environment variables (set them in the
 * Vercel project, or in `apps/docs/.env.local` for local dev):
 *
 *   DOCS_USERNAME        login name
 *   DOCS_PASSWORD        password
 *   DOCS_SESSION_SECRET  ≥ 32 random characters, signs the session cookie
 *
 * The session is a stateless cookie: `base64url(payload).base64url(hmac)`.
 * Changing the username or the secret signs everyone out.
 *
 * No `server-only` import on purpose: `proxy.ts` uses this module too, and
 * `server-only` throws outside the React Server Components environment.
 */

export const SESSION_COOKIE = "frameui_session"
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 days, in seconds

type AuthConfig = { username: string; password: string; secret: string }
type SessionPayload = { u: string; exp: number }

export function getAuthConfig(): AuthConfig | null {
  const username = process.env.DOCS_USERNAME
  const password = process.env.DOCS_PASSWORD
  const secret = process.env.DOCS_SESSION_SECRET
  if (!username || !password || !secret || secret.length < 32) return null
  return { username, password, secret }
}

const hmac = (secret: string, value: string) => createHmac("sha256", secret).update(value).digest()

/** Constant-time string comparison (both sides hashed, so lengths always match). */
function safeEqual(secret: string, a: string, b: string) {
  return timingSafeEqual(hmac(secret, a), hmac(secret, b))
}

export function checkCredentials(username: string, password: string) {
  const config = getAuthConfig()
  if (!config) return false
  // Evaluate both so the response time does not reveal which one was wrong.
  const userOk = safeEqual(config.secret, username, config.username)
  const passOk = safeEqual(config.secret, password, config.password)
  return userOk && passOk
}

export function createSessionToken(username: string) {
  const config = getAuthConfig()
  if (!config) throw new Error("Docs auth is not configured")
  const payload: SessionPayload = { u: username, exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE }
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url")
  const signature = hmac(config.secret, body).toString("base64url")
  return `${body}.${signature}`
}

export function verifySessionToken(token: string | undefined): boolean {
  const config = getAuthConfig()
  if (!config || !token) return false

  const [body, signature] = token.split(".")
  if (!body || !signature) return false

  const expected = hmac(config.secret, body)
  const given = Buffer.from(signature, "base64url")
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return false

  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as SessionPayload
    return payload.u === config.username && payload.exp > Math.floor(Date.now() / 1000)
  } catch {
    return false
  }
}

/** Only same-site relative paths are accepted as a post-login destination. */
export function safeNextPath(value: unknown): string {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) {
    return "/"
  }
  return value
}
