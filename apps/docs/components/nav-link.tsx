"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@hwagfu/frameui/utils"

/**
 * Link that knows whether it is the current page. The only client code of the
 * docs navigation — everything around it is server-rendered.
 */
export function NavLink({
  href,
  children,
  className,
  exact = false,
}: {
  href: string
  children: React.ReactNode
  className?: string
  exact?: boolean
}) {
  const pathname = usePathname()
  const active = exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      data-active={active || undefined}
      className={cn(
        "rounded-xs no-underline transition-colors duration-150 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        className
      )}
    >
      {children}
    </Link>
  )
}
