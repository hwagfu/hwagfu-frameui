import { guides } from "@/lib/nav"
import { docsByGroup } from "@/lib/registry"
import { NavLink } from "./nav-link"

const linkClass =
  "flex items-center gap-2 py-1.5 text-subtitle text-muted-foreground hover:text-brand data-active:font-bold data-active:text-brand"

const headingClass = "mb-2 text-micro font-medium tracking-[0.1px] text-tertiary uppercase"

/** Docs navigation tree. Server-rendered; only each link's active state is client. */
export function DocsNav() {
  return (
    <nav aria-label="Tài liệu" className="flex flex-col gap-7 pb-10">
      <div className="flex flex-col">
        <div className={headingClass}>Bắt đầu</div>
        {guides.map((g) => (
          <NavLink key={g.href} href={g.href} exact={g.exact} className={linkClass}>
            {g.title}
          </NavLink>
        ))}
      </div>
      {docsByGroup.map(({ group, items }) => (
        <div key={group} className="flex flex-col">
          <div className={headingClass}>
            {group} <span className="text-tertiary/70">· {items.length}</span>
          </div>
          {items.map((doc) => (
            <NavLink key={doc.slug} href={`/docs/components/${doc.slug}`} className={linkClass}>
              {doc.name}
            </NavLink>
          ))}
        </div>
      ))}
    </nav>
  )
}
