import { LogOut, Menu } from "lucide-react"

import { Badge } from "@hwagfu/frameui/badge"
import { Button } from "@hwagfu/frameui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@hwagfu/frameui/sheet"

import { logout } from "@/app/login/actions"

import { DocsNav } from "./docs-nav"
import { Wordmark } from "./logo"
import { NavLink } from "./nav-link"

const topLinkClass =
  "inline-flex items-center border-b-2 border-transparent px-3 py-5 text-subtitle text-foreground hover:border-brand hover:text-brand data-active:border-brand data-active:text-brand"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-4 px-4 lg:px-8">
        <Sheet>
          <SheetTrigger
            render={<Button variant="ghost" size="icon-sm" className="rounded-md lg:hidden" aria-label="Mở menu" />}
          >
            <Menu />
          </SheetTrigger>
          <SheetContent side="left" className="w-72 overflow-y-auto">
            <SheetHeader>
              <SheetTitle>
                <Wordmark />
              </SheetTitle>
            </SheetHeader>
            <div className="px-6">
              <DocsNav />
            </div>
          </SheetContent>
        </Sheet>
        <Wordmark />
        <Badge variant="secondary" className="hidden sm:inline-flex">
          v0.1 · web
        </Badge>
        <nav aria-label="Chính" className="ml-4 hidden items-center gap-1 md:flex">
          <NavLink href="/docs" exact className={topLinkClass}>
            Tài liệu
          </NavLink>
          <NavLink href="/docs/components" className={topLinkClass}>
            Component
          </NavLink>
          <NavLink href="/docs/theming" className={topLinkClass}>
            Theme
          </NavLink>
        </nav>
        <div className="flex-1" />
        <Button
          variant="golden"
          size="sm"
          className="rounded-full"
          nativeButton={false}
          render={<a href="/docs/access" />}
        >
          Bắt đầu
        </Button>
        <form action={logout}>
          <Button type="submit" variant="ghost" size="icon-sm" aria-label="Đăng xuất" title="Đăng xuất">
            <LogOut />
          </Button>
        </form>
      </div>
    </header>
  )
}
