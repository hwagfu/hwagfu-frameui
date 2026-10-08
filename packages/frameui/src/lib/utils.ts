import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * tailwind-merge has to know the FrameON scales declared in `theme.css`.
 *
 * The risky one is `text-*`: FrameON uses `--text-*` for **font sizes**
 * (`text-caption`, `text-button`…) while text colours share the same prefix
 * (`text-muted-foreground`, `text-brand`…). Without the list below
 * tailwind-merge files both under "text colour" and
 * `cn("text-caption", "text-brand")` silently drops the size.
 *
 * Add a token to `theme.css` → add it here too.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "display",
        "h1",
        "h2",
        "h3",
        "subtitle",
        "link",
        "control",
        "button",
        "caption",
        "micro",
        "code",
      ],
      shadow: ["raised", "elevated", "floating", "glow", "focus"],
      animate: [
        "pop",
        "brand-spin",
        "brand-pulse",
        "brand-blink",
        "brand-tumble",
        "framex-band",
        "framex-band-once",
        "framex-sweep",
        "framex-sweep-once",
        "framex-flare",
        "framex-flare-big",
        "framex-flare-once",
        "framex-breathe",
        "framex-gather",
        "framex-gather-breathe",
        "framex-x-glow",
        "logo-draw",
        "logo-land",
        "frameon-play",
        "frameon-glow",
        "frameon-rise",
        "frameon-on",
        "framex-track",
        "framex-ring",
        "framex-shake",
        "framex-gloss",
        "framex-gloss-text",
        "framex-ember",
        "framex-ember-glint",
      ],
    },
  },
})

/**
 * Joins class names (`clsx`) and resolves Tailwind conflicts
 * (`tailwind-merge`), so a `className` passed last really wins.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
