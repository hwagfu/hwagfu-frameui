import type { Metadata } from "next"
import Link from "next/link"

import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@hwagfu/frameui/card"

import { RuntimeBadge } from "@/components/runtime-badge"
import { docs, docsByGroup } from "@/lib/registry"

export const metadata: Metadata = { title: "Component" }

const strip = (text: string) => text.replace(/`/g, "")

export default function ComponentsPage() {
  const counts = {
    server: docs.filter((d) => d.runtime === "server").length,
    island: docs.filter((d) => d.runtime === "island").length,
    client: docs.filter((d) => d.runtime === "client").length,
  }

  return (
    <div className="flex flex-col gap-10">
      <header className="flex max-w-3xl flex-col gap-3">
        <h1 className="m-0 text-display text-heading">Component</h1>
        <p className="m-0 text-link text-muted-foreground">
          {docs.length} component — toàn bộ danh mục của shadcn/ui (Base UI) — được may lại theo phong cách FrameON.
          {` ${counts.server} component không gửi JavaScript nào, ${counts.island} là đảo client quanh một primitive, chỉ ${counts.client} cần client toàn phần.`}
        </p>
      </header>
      {docsByGroup.map(({ group, items }) => (
        <section key={group} className="flex flex-col gap-4">
          <h2 className="m-0 text-h2 text-heading">{group}</h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((doc) => (
              <Link
                key={doc.slug}
                href={`/docs/components/${doc.slug}`}
                className="group rounded-md no-underline outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <Card className="h-full shadow-none transition-colors duration-150 group-hover:border-tertiary">
                  <CardHeader>
                    <CardTitle className="text-link font-bold transition-colors group-hover:text-brand">
                      {doc.name}
                    </CardTitle>
                    <CardAction>
                      <RuntimeBadge runtime={doc.runtime} />
                    </CardAction>
                    <CardDescription className="line-clamp-2">{strip(doc.description)}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
