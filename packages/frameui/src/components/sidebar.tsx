import * as React from "react"

import { renderElement, type useRender } from "../lib/render"
import { cn } from "../lib/utils"
import { Input } from "./input"
import { Separator } from "./separator"
import { Skeleton } from "./skeleton"
import { sidebarMenuButtonVariants } from "./_sidebar-styles"

// Stateful parts (provider, collapse, trigger, tooltip buttons) are a client
// island; everything below stays on the server.
export {
  Sidebar,
  SidebarMenuButton,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "./_sidebar-client"

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        "relative flex w-full flex-1 flex-col bg-background md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-lg md:peer-data-[variant=inset]:border md:peer-data-[variant=inset]:border-border md:peer-data-[variant=inset]:shadow-elevated md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className
      )}
      {...props}
    />
  )
}

function SidebarInput({ className, ...props }: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn("h-9 w-full text-subtitle", className)}
      {...props}
    />
  )
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
}

function SidebarSeparator({ className, ...props }: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn("mx-2 w-auto bg-sidebar-border", className)}
      {...props}
    />
  )
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        "no-scrollbar flex min-h-0 flex-1 flex-col gap-0 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  )
}

/** FrameON menu label: small, uppercase, muted blue-gray. */
function SidebarGroupLabel({ className, render, ...props }: useRender.ComponentProps<"div">) {
  return renderElement(
    "div",
    render,
    {
      ...props,
      className: cn(
        "flex h-8 shrink-0 items-center rounded-md px-2 font-sans text-micro font-medium tracking-[0.1px] text-tertiary uppercase outline-hidden transition-[margin,opacity] duration-200 ease-linear group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 focus-visible:outline-2 focus-visible:outline-sidebar-ring [&>svg]:size-4 [&>svg]:shrink-0",
        className
      ),
    },
    { slot: "sidebar-group-label", sidebar: "group-label" }
  )
}

function SidebarGroupAction({ className, render, ...props }: useRender.ComponentProps<"button">) {
  return renderElement(
    "button",
    render,
    {
      ...props,
      className: cn(
        "absolute top-3.5 right-3 flex aspect-square w-5 cursor-pointer items-center justify-center rounded-sm border-0 bg-transparent p-0 text-muted-foreground outline-hidden transition-colors group-data-[collapsible=icon]:hidden after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-2 focus-visible:outline-sidebar-ring md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0",
        className
      ),
    },
    { slot: "sidebar-group-action", sidebar: "group-action" }
  )
}

function SidebarGroupContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn("w-full font-sans text-subtitle", className)}
      {...props}
    />
  )
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn("m-0 flex w-full min-w-0 list-none flex-col gap-0.5 p-0", className)}
      {...props}
    />
  )
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  )
}

function SidebarMenuAction({
  className,
  render,
  showOnHover = false,
  ...props
}: useRender.ComponentProps<"button"> & {
  showOnHover?: boolean
}) {
  return renderElement(
    "button",
    render,
    {
      ...props,
      className: cn(
        "absolute top-2 right-1 flex aspect-square w-5 cursor-pointer items-center justify-center rounded-sm border-0 bg-transparent p-0 text-muted-foreground outline-hidden transition-colors group-data-[collapsible=icon]:hidden peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=default]/menu-button:top-2 peer-data-[size=lg]/menu-button:top-3.5 peer-data-[size=sm]/menu-button:top-1.5 after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-2 focus-visible:outline-sidebar-ring md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0",
        showOnHover &&
          "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 peer-data-active/menu-button:text-sidebar-accent-foreground aria-expanded:opacity-100 md:opacity-0",
        className
      ),
    },
    { slot: "sidebar-menu-action", sidebar: "menu-action" }
  )
}

function SidebarMenuBadge({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        "pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-sm bg-muted px-1 font-sans text-micro font-medium text-muted-foreground tabular-nums select-none group-data-[collapsible=icon]:hidden peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=default]/menu-button:top-2 peer-data-[size=lg]/menu-button:top-3.5 peer-data-[size=sm]/menu-button:top-1.5 peer-data-active/menu-button:bg-brand/12 peer-data-active/menu-button:text-brand",
        className
      )}
      {...props}
    />
  )
}

/**
 * Loading row. The text bar width (50–90%) is derived from `useId`, so the
 * server and the client agree on it — no hydration mismatch.
 */
function SidebarMenuSkeleton({
  className,
  showIcon = false,
  style,
  ...props
}: React.ComponentProps<"div"> & {
  showIcon?: boolean
}) {
  const id = React.useId()
  let hash = 0
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) | 0
  const width = `${50 + (Math.abs(hash) % 41)}%`

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn("flex h-9 items-center gap-3 rounded-md px-2", className)}
      style={style}
      {...props}
    >
      {showIcon && <Skeleton className="size-4 rounded-sm" data-sidebar="menu-skeleton-icon" />}
      <Skeleton
        className="h-4 max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        style={{ "--skeleton-width": width } as React.CSSProperties}
      />
    </div>
  )
}

function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        "mx-3.5 my-0 flex min-w-0 translate-x-px list-none flex-col gap-0.5 border-l border-sidebar-border px-2.5 py-0.5 group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuSubItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn("group/menu-sub-item relative", className)}
      {...props}
    />
  )
}

function SidebarMenuSubButton({
  render,
  size = "md",
  isActive = false,
  className,
  ...props
}: useRender.ComponentProps<"a"> & {
  size?: "sm" | "md"
  isActive?: boolean
}) {
  return renderElement(
    "a",
    render,
    {
      ...props,
      className: cn(
        "flex h-8 min-w-0 -translate-x-px cursor-pointer items-center gap-2 overflow-hidden rounded-md px-2 font-sans text-muted-foreground no-underline outline-hidden transition-colors duration-150 group-data-[collapsible=icon]:hidden hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sidebar-ring active:bg-sidebar-accent disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[size=md]:text-subtitle data-[size=sm]:text-caption data-active:font-bold data-active:text-sidebar-accent-foreground [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
        className
      ),
    },
    { slot: "sidebar-menu-sub-button", sidebar: "menu-sub-button", size, active: isActive }
  )
}

export {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
  sidebarMenuButtonVariants,
}
