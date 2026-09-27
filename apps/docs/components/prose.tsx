import { cn } from "@hwagfu/frameui/utils"

/** Small typographic helpers for the guide pages. */

export function PageHeader({ title, lead }: { title: string; lead: React.ReactNode }) {
  return (
    <header className="flex flex-col gap-3">
      <h1 className="m-0 text-display text-heading">{title}</h1>
      <p className="m-0 text-link text-muted-foreground">{lead}</p>
    </header>
  )
}

export function H2({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="m-0 mt-4 scroll-mt-24 text-h2 text-heading">
      {children}
    </h2>
  )
}

export function P({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("m-0 text-subtitle leading-6 text-foreground", className)}>{children}</p>
}

export function Code({ children }: { children: React.ReactNode }) {
  return <code className="rounded-xs bg-muted px-1.5 py-0.5 font-mono text-code text-brand-muted">{children}</code>
}

export function List({ children }: { children: React.ReactNode }) {
  return (
    <ul className="m-0 flex list-disc flex-col gap-2 pl-5 text-subtitle leading-6 text-foreground marker:text-brand">
      {children}
    </ul>
  )
}

export function Article({ children }: { children: React.ReactNode }) {
  return <article className="mx-auto flex max-w-3xl flex-col gap-5">{children}</article>
}
