import type { Metadata, Viewport } from "next"
import { Be_Vietnam_Pro } from "next/font/google"

import { Toaster as SonnerToaster } from "@hwagfu/frameui/sonner"
import { Toaster as BaseToaster } from "@hwagfu/frameui/toast"

import "./globals.css"

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
})

export const metadata: Metadata = {
  title: { default: "FrameUI — thư viện component của FrameON", template: "%s · FrameUI" },
  description:
    "@hwagfu/frameui: toàn bộ component của shadcn/ui (Base UI) mang phong cách FrameON, ưu tiên Server Component, Tailwind CSS v4.",
}

export const viewport: Viewport = { themeColor: "#191b24", colorScheme: "dark" }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={beVietnam.variable}>
      <body className="min-h-dvh antialiased">
        {children}
        {/* Toast hosts used by the Sonner and Toast demos. */}
        <SonnerToaster />
        <BaseToaster />
      </body>
    </html>
  )
}
