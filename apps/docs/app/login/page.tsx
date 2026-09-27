import type { Metadata } from "next"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { CircleAlert, Lock } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@hwagfu/frameui/alert"
import { Button } from "@hwagfu/frameui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@hwagfu/frameui/card"
import { Field, FieldGroup, FieldLabel } from "@hwagfu/frameui/field"
import { Input } from "@hwagfu/frameui/input"

import { LogoMark } from "@/components/logo"
import { getAuthConfig, safeNextPath, SESSION_COOKIE, verifySessionToken } from "@/lib/auth"
import { login } from "./actions"

export const metadata: Metadata = { title: "Đăng nhập" }

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>
}) {
  const { next: rawNext, error } = await searchParams
  const next = safeNextPath(rawNext)

  const jar = await cookies()
  if (verifySessionToken(jar.get(SESSION_COOKIE)?.value)) redirect(next)

  const configured = getAuthConfig() !== null

  return (
    <main className="flex min-h-dvh items-center justify-center px-4 py-16">
      <div className="flex w-full max-w-sm flex-col items-center gap-6">
        <div className="flex items-center gap-2">
          <LogoMark size={32} />
          <span className="text-h3 text-heading">
            Frame<span className="text-brand">UI</span>
          </span>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="size-4 text-brand" /> Đăng nhập
            </CardTitle>
            <CardDescription>Tài liệu FrameUI chỉ dành cho thành viên đồ án.</CardDescription>
          </CardHeader>
          <CardContent>
            {!configured ? (
              <Alert variant="warning">
                <CircleAlert />
                <AlertTitle>Chưa cấu hình tài khoản</AlertTitle>
                <AlertDescription>
                  Đặt DOCS_USERNAME, DOCS_PASSWORD và DOCS_SESSION_SECRET (≥ 32 ký tự) trong biến môi trường
                  rồi khởi động lại.
                </AlertDescription>
              </Alert>
            ) : (
              <form action={login}>
                <input type="hidden" name="next" value={next} />
                <FieldGroup className="gap-4">
                  {error ? (
                    <Alert variant="destructive">
                      <CircleAlert />
                      <AlertTitle>Sai tên đăng nhập hoặc mật khẩu</AlertTitle>
                    </Alert>
                  ) : null}
                  <Field>
                    <FieldLabel htmlFor="username">Tên đăng nhập</FieldLabel>
                    <Input
                      id="username"
                      name="username"
                      autoComplete="username"
                      required
                      autoFocus
                      aria-invalid={error ? true : undefined}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      aria-invalid={error ? true : undefined}
                    />
                  </Field>
                  <Button type="submit" variant="golden" className="mt-2 w-full">
                    Đăng nhập
                  </Button>
                </FieldGroup>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
