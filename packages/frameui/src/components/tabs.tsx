import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils"

function Tabs({ className, orientation = "horizontal", ...props }: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn("group/tabs flex gap-4 data-horizontal:flex-col", className)}
      {...props}
    />
  )
}

/**
 * `default` — segmented control on the slate surface.
 * `line` — FrameON's tab bar: a hairline underneath, the active tab bold
 * and gold with a 2px gold underline.
 */
const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center text-muted-foreground group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col",
  {
    variants: {
      variant: {
        default:
          "justify-center gap-1 rounded-md bg-muted p-1 group-data-horizontal/tabs:h-10",
        line: "no-scrollbar justify-start gap-5 overflow-x-auto group-data-horizontal/tabs:w-full group-data-horizontal/tabs:border-b group-data-horizontal/tabs:border-border group-data-vertical/tabs:items-stretch group-data-vertical/tabs:gap-1 group-data-vertical/tabs:border-l group-data-vertical/tabs:border-border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function TabsList({
  className,
  variant = "default",
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 border-0 bg-transparent font-sans text-subtitle font-medium whitespace-nowrap text-muted-foreground transition-colors duration-150 outline-none hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        // segmented
        "group-data-[variant=default]/tabs-list:h-full group-data-[variant=default]/tabs-list:flex-1 group-data-[variant=default]/tabs-list:rounded-sm group-data-[variant=default]/tabs-list:px-3 group-data-[variant=default]/tabs-list:data-active:bg-card-nested group-data-[variant=default]/tabs-list:data-active:text-brand group-data-[variant=default]/tabs-list:data-active:shadow-raised",
        // FrameON underline tabs
        "group-data-[variant=line]/tabs-list:border-transparent group-data-[variant=line]/tabs-list:px-1 group-data-[variant=line]/tabs-list:py-3 group-data-[variant=line]/tabs-list:data-active:font-bold group-data-[variant=line]/tabs-list:data-active:text-brand",
        "group-data-horizontal/tabs:group-data-[variant=line]/tabs-list:-mb-px group-data-horizontal/tabs:group-data-[variant=line]/tabs-list:border-b-2 group-data-horizontal/tabs:group-data-[variant=line]/tabs-list:data-active:border-brand",
        "group-data-vertical/tabs:group-data-[variant=line]/tabs-list:-ml-px group-data-vertical/tabs:group-data-[variant=line]/tabs-list:border-l-2 group-data-vertical/tabs:group-data-[variant=line]/tabs-list:px-3 group-data-vertical/tabs:group-data-[variant=line]/tabs-list:py-2 group-data-vertical/tabs:group-data-[variant=line]/tabs-list:data-active:border-brand",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn(
        "flex-1 rounded-xs font-sans text-subtitle text-foreground outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        className
      )}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
