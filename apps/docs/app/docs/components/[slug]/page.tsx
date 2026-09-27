import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react"

import { Badge } from "@hwagfu/frameui/badge"
import { Button } from "@hwagfu/frameui/button"
import { Separator } from "@hwagfu/frameui/separator"

import { CodeBlock } from "@/components/code-block"
import { ComponentPreview } from "@/components/component-preview"
import { InlineMarkdown } from "@/components/inline-markdown"
import { PropsTable } from "@/components/props-table"
import { RuntimeBadge, runtimeInfo } from "@/components/runtime-badge"
import { docs, getDoc, getNeighbours } from "@/lib/registry"

export function generateStaticParams() {
  return docs.map((doc) => ({ slug: doc.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const doc = getDoc(slug)
  return doc ? { title: doc.name, description: doc.description.replace(/`/g, "") } : {}
}

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = getDoc(slug)
  if (!doc) notFound()
  const { prev, next } = getNeighbours(slug)

  return (
    <article className="mx-auto flex max-w-3xl flex-col gap-10">
      <header className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-caption text-tertiary">
          <Link href="/docs/components" className="text-tertiary no-underline hover:text-brand">
            Component
          </Link>
          <span>/</span>
          <span>{doc.group}</span>
        </div>
        <h1 className="m-0 text-display text-heading">{doc.name}</h1>
        <p className="m-0 text-link text-muted-foreground">
          <InlineMarkdown text={doc.description} />
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <RuntimeBadge runtime={doc.runtime} />
          {doc.primitive ? (
            <Badge variant="outline" render={<a href={doc.primitive.href} target="_blank" rel="noreferrer" />}>
              {doc.primitive.label} <ExternalLink />
            </Badge>
          ) : null}
          {doc.shadcn ? (
            <Badge
              variant="outline"
              render={
                <a href={`https://ui.shadcn.com/docs/components/base/${doc.shadcn}`} target="_blank" rel="noreferrer" />
              }
            >
              API shadcn <ExternalLink />
            </Badge>
          ) : null}
          {doc.uses?.map((dep) => (
            <Badge key={dep} variant="secondary">
              {dep}
            </Badge>
          ))}
        </div>
        <p className="m-0 text-caption text-tertiary">{runtimeInfo[doc.runtime].hint}</p>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="m-0 text-h2 text-heading">Import</h2>
        <CodeBlock code={doc.imports} />
      </section>

      <section className="flex flex-col gap-10">
        <h2 className="m-0 text-h2 text-heading">Ví dụ</h2>
        {doc.examples.map((example) => (
          <ComponentPreview key={example.file} example={example} />
        ))}
      </section>

      {doc.api?.length ? (
        <section className="flex flex-col gap-6">
          <h2 className="m-0 text-h2 text-heading">API</h2>
          {doc.api.map((part) => (
            <PropsTable key={part.name} part={part} />
          ))}
        </section>
      ) : null}

      {doc.notes?.length ? (
        <section className="flex flex-col gap-3">
          <h2 className="m-0 text-h2 text-heading">Ghi chú</h2>
          <ul className="m-0 flex list-disc flex-col gap-2 pl-5 text-subtitle text-muted-foreground marker:text-brand">
            {doc.notes.map((note) => (
              <li key={note}>
                <InlineMarkdown text={note} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <Separator />
      <nav aria-label="Component kế tiếp" className="flex items-center justify-between gap-4">
        {prev ? (
          <Button variant="secondary" nativeButton={false} render={<Link href={`/docs/components/${prev.slug}`} />}>
            <ArrowLeft data-icon="inline-start" /> {prev.name}
          </Button>
        ) : (
          <span />
        )}
        {next ? (
          <Button variant="secondary" nativeButton={false} render={<Link href={`/docs/components/${next.slug}`} />}>
            {next.name} <ArrowRight data-icon="inline-end" />
          </Button>
        ) : null}
      </nav>
    </article>
  )
}
