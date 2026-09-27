import { cva } from "class-variance-authority"

/**
 * Sidebar row: gold text on the nested surface when hovered, and bold gold
 * when it is the current page — FrameON's active state.
 */
export const sidebarMenuButtonVariants = cva(
  "peer/menu-button group/menu-button flex w-full cursor-pointer items-center gap-3 overflow-hidden rounded-md border-0 bg-transparent p-2 text-left font-sans text-subtitle text-sidebar-foreground no-underline transition-[width,height,padding,color,background-color] duration-150 outline-none group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sidebar-ring active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:font-bold data-active:text-sidebar-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate",
  {
    variants: {
      variant: {
        default: "",
        outline:
          "bg-background shadow-[0_0_0_1px_var(--sidebar-border)] hover:shadow-[0_0_0_1px_var(--sidebar-accent-foreground)]",
      },
      size: {
        default: "h-9",
        sm: "h-8 text-caption",
        lg: "h-12 group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
