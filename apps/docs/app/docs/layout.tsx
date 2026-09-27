import { DocsNav } from "@/components/docs-nav"
import { SiteHeader } from "@/components/site-header"

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <div className="mx-auto flex max-w-[1440px] gap-10 px-4 lg:px-8">
        <aside className="sticky top-16 hidden h-[calc(100dvh-4rem)] w-56 shrink-0 overflow-y-auto pt-8 no-scrollbar lg:block">
          <DocsNav />
        </aside>
        <main className="min-w-0 flex-1 pt-8 pb-24">{children}</main>
      </div>
    </>
  )
}
