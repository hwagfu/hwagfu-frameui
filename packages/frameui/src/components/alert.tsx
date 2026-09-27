import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils"

const alertVariants = cva(
  "group/alert relative grid w-full gap-0.5 rounded-md border border-border bg-card-nested px-4 py-3 text-left font-sans text-subtitle text-foreground has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-20 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-3 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg:not([class*='size-'])]:size-[17px]",
  {
    variants: {
      variant: {
        default: "*:[svg]:text-muted-foreground",
        destructive:
          "border-destructive/40 text-destructive *:data-[slot=alert-description]:text-destructive/85 *:[svg]:text-destructive",
        success: "*:[svg]:text-success",
        warning: "border-brand/40 *:[svg]:text-brand",
        info: "*:[svg]:text-info",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      data-variant={variant ?? "default"}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "font-medium group-has-[>svg]/alert:col-start-2 [&_a]:text-brand [&_a]:underline-offset-4 [&_a]:hover:underline",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "font-sans text-caption text-balance text-muted-foreground group-has-[>svg]/alert:col-start-2 md:text-pretty [&_a]:text-brand [&_a]:underline-offset-4 [&_a]:hover:underline [&_p:not(:last-child)]:mb-3",
        className
      )}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("absolute top-1/2 right-3 -translate-y-1/2", className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, AlertAction, alertVariants }
