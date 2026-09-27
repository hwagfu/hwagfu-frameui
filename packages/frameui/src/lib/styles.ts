/**
 * Class strings shared across components, so FrameON's recurring looks are
 * written once: the gold focus outline, the field surface, the "pop" entrance
 * of floating panels and the menu row.
 */

/** FrameON's keyboard focus: a 2px gold outline offset by 2px. */
export const focusRing =
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"

/**
 * FrameON field surface — translucent fill, soft gray border, and on focus a
 * gold border with a gold glow. `ring-1` draws the second pixel of the focused
 * border outside the box, so focusing never shifts the layout.
 */
export const fieldSurface =
  "rounded-md border border-input bg-field text-foreground transition-[border-color,box-shadow] duration-150 outline-none " +
  "focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring focus-visible:shadow-focus " +
  "aria-invalid:border-brand disabled:cursor-not-allowed disabled:opacity-50"

/** Enter/exit of floating panels: FrameON "pop" — 0.94 → 1 with a fade, 180ms. */
export const popIn =
  "origin-(--transform-origin) duration-180 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-94 " +
  "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-94"

/** Menu panel (Dropdown, Context menu, Menubar, Select, Combobox). */
export const menuContent =
  "z-50 max-h-(--available-height) min-w-45 overflow-x-hidden overflow-y-auto rounded-md border border-border bg-popover py-2 " +
  "text-popover-foreground shadow-floating outline-none " +
  popIn

/**
 * Menu row: 16px side padding, 12px vertical — FrameON's roomy, touch-friendly
 * rows. Highlight is the nested surface with gold text.
 */
export const menuItem =
  "relative flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left text-subtitle text-foreground outline-none select-none " +
  "focus:bg-accent focus:text-accent-foreground data-highlighted:bg-accent data-highlighted:text-accent-foreground " +
  "data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:text-tertiary " +
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"

/** Small uppercase heading inside a menu or panel. */
export const menuLabel = "px-4 pt-2 pb-1 text-micro font-medium tracking-[0.1px] text-tertiary uppercase"

/** Hairline between groups of a menu. */
export const menuSeparator = "my-2 h-px bg-border"

/** Dimmed page behind modal surfaces. */
export const overlay =
  "fixed inset-0 isolate z-50 bg-black/50 duration-180 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0"
