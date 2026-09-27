import type * as React from "react"
import { Toaster as Sonner, type ToasterProps } from "sonner"

import {
  CircleAlertIcon,
  CircleCheckIcon,
  CircleXIcon,
  InfoIcon,
  Loader2Icon,
  XIcon,
} from "../lib/icons"

/**
 * FrameON toasts on top of sonner: nested surface, floating shadow, a
 * coloured status icon, 14px between stacked toasts, 4s by default.
 *
 * This wrapper is a Server Component — only sonner's own `<Toaster>` is a
 * client island. Call `toast()` from `sonner` anywhere.
 */
function Toaster({ toastOptions, style, ...props }: ToasterProps) {
  return (
    <Sonner
      theme="dark"
      position="bottom-right"
      gap={14}
      duration={4000}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-[17px] text-success" />,
        info: <InfoIcon className="size-[17px] text-info" />,
        warning: <CircleAlertIcon className="size-[17px] text-brand" />,
        error: <CircleXIcon className="size-[17px] text-destructive" />,
        loading: <Loader2Icon className="size-[17px] animate-spin text-muted-foreground" />,
        close: <XIcon className="size-3.5" />,
      }}
      style={
        {
          "--width": "min(92vw, 22.5rem)",
          "--normal-bg": "var(--card-nested)",
          "--normal-text": "var(--foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius-md)",
          ...style,
        } as React.CSSProperties
      }
      toastOptions={{
        ...toastOptions,
        classNames: {
          toast:
            "group/toast items-start! gap-3! rounded-md! border! border-border! bg-card-nested! px-4! py-3! font-sans! text-subtitle! text-foreground! shadow-floating!",
          title: "font-medium!",
          description: "mt-0.5! font-sans! text-caption! text-muted-foreground!",
          icon: "mt-px! self-start!",
          actionButton:
            "h-8! rounded-md! bg-primary! px-3! font-sans! text-caption! text-primary-foreground! hover:opacity-80!",
          cancelButton:
            "h-8! rounded-md! bg-secondary! px-3! font-sans! text-caption! text-secondary-foreground!",
          closeButton:
            "border-border! bg-card-nested! text-tertiary! hover:text-heading!",
          ...toastOptions?.classNames,
        },
      }}
      {...props}
    />
  )
}

export { Toaster, type ToasterProps }
