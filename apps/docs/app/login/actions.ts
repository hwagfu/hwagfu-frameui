"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import {
  checkCredentials,
  createSessionToken,
  safeNextPath,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
} from "@/lib/auth"

export async function login(formData: FormData) {
  const username = String(formData.get("username") ?? "")
  const password = String(formData.get("password") ?? "")
  const next = safeNextPath(formData.get("next"))

  if (!checkCredentials(username, password)) {
    // Slow down guessing.
    await new Promise((resolve) => setTimeout(resolve, 800))
    const query = new URLSearchParams({ error: "1" })
    if (next !== "/") query.set("next", next)
    redirect(`/login?${query}`)
  }

  const jar = await cookies()
  jar.set(SESSION_COOKIE, createSessionToken(username), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  })
  redirect(next)
}

export async function logout() {
  const jar = await cookies()
  jar.delete(SESSION_COOKIE)
  redirect("/login")
}
