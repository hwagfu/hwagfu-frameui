"use client"

import * as React from "react"
import { createPortal } from "react-dom"

import { cn } from "../lib/utils"

type FilmPeekProps = {
  /**
   * Panel content per film, keyed by the `data-peek` value of its card. Build
   * it on the server (with `FilmPeekMedia`, `FilmPeekActions`…): only the
   * hovered one is ever mounted.
   */
  panels: Record<string, React.ReactNode>
  /** How long (ms) the pointer rests on a card before it opens — long enough to sweep across a rail without popping. */
  openDelay?: number
  /** How long (ms) after leaving before it closes — time to move from the card onto the panel. */
  closeDelay?: number
  /** Panel width in px. */
  width?: number
  className?: string
}

/** Gap kept from the window edges. */
const EDGE = 12

const clamp = (value: number, low: number, high: number) => Math.min(Math.max(value, low), high)

/**
 * Quick look when the pointer rests on a film card. One layer for the whole
 * page: it catches the events bubbling up from every element with a
 * `data-peek` attribute, so the cards themselves stay plain Server Components
 * and none of them carries client code.
 *
 * The panel is portalled to <body> because film rails scroll horizontally
 * (`overflow-x: auto`) — inside one it would be cut off.
 */
function FilmPeek({ panels, openDelay = 420, closeDelay = 140, width = 340, className }: FilmPeekProps) {
  const [anchor, setAnchor] = React.useState<{ id: string; rect: DOMRect } | null>(null)
  const panelRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    // Only a real mouse "rests" on something. On touch screens a tap just opens the film.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return

    let openTimer: ReturnType<typeof setTimeout> | undefined
    let closeTimer: ReturnType<typeof setTimeout> | undefined
    let current: Element | null = null

    const clearOpen = () => clearTimeout(openTimer)
    const keep = () => clearTimeout(closeTimer)
    const closeSoon = () => {
      keep()
      closeTimer = setTimeout(() => {
        current = null
        setAnchor(null)
      }, closeDelay)
    }
    const closeNow = () => {
      clearOpen()
      keep()
      current = null
      setAnchor(null)
    }

    // `pointerover` bubbles up from every child, so this one handler covers entering and leaving.
    const onOver = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null
      const card = target?.closest<HTMLElement>("[data-peek]")
      if (card) {
        keep()
        if (card === current) return
        clearOpen()
        openTimer = setTimeout(() => {
          const id = card.dataset.peek
          if (!id) return
          current = card
          setAnchor({ id, rect: card.getBoundingClientRect() })
        }, openDelay)
        return
      }
      if (target?.closest("[data-peek-panel]")) {
        clearOpen()
        keep()
        return
      }
      clearOpen()
      if (current) closeSoon()
    }

    // A press outside closes it — but not one on the panel itself. Removing the
    // panel on `pointerdown` would take its <a> away before the browser fires
    // `click`, and the press would land on nothing.
    const onDown = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null
      if (target?.closest("[data-peek-panel]")) return
      closeNow()
    }

    // Close on `click`, after the link inside has received it. Only a link
    // closes the panel; a button (add to list…) leaves it open.
    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null
      if (target?.closest("[data-peek-panel]") && target.closest("a[href]")) closeNow()
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeNow()
    }

    document.addEventListener("pointerover", onOver)
    document.addEventListener("pointerdown", onDown)
    document.addEventListener("click", onClick)
    document.addEventListener("keydown", onKey)
    // The panel is anchored in window coordinates, so any scroll (page or rail) would leave it behind.
    window.addEventListener("scroll", closeNow, true)
    window.addEventListener("resize", closeNow)
    return () => {
      clearOpen()
      keep()
      document.removeEventListener("pointerover", onOver)
      document.removeEventListener("pointerdown", onDown)
      document.removeEventListener("click", onClick)
      document.removeEventListener("keydown", onKey)
      window.removeEventListener("scroll", closeNow, true)
      window.removeEventListener("resize", closeNow)
    }
  }, [openDelay, closeDelay])

  // The real height is only known once rendered. Written straight to the DOM
  // rather than through state to skip a second render; a layout effect runs
  // before paint, so the panel never flashes at a stale position.
  React.useLayoutEffect(() => {
    const el = panelRef.current
    if (!el || !anchor) return
    const height = el.offsetHeight
    el.style.left = `${clamp(anchor.rect.left + anchor.rect.width / 2 - width / 2, EDGE, window.innerWidth - width - EDGE)}px`
    el.style.top = `${clamp(anchor.rect.top + anchor.rect.height / 2 - height / 2, EDGE, window.innerHeight - height - EDGE)}px`
    el.style.visibility = "visible"
  }, [anchor, width])

  // On the server `anchor` is always empty, so `document` is never touched.
  if (!anchor) return null
  const content = panels[anchor.id]
  if (content == null) return null

  return createPortal(
    <div
      // Remount per film: the pop animation replays and the position starts
      // over instead of keeping the previous card's coordinates.
      key={anchor.id}
      ref={panelRef}
      data-slot="film-peek"
      data-peek-panel
      style={{ width, visibility: "hidden" }}
      className={cn(
        "fixed z-50 animate-pop overflow-hidden rounded-lg border border-border bg-card font-sans text-card-foreground shadow-floating motion-reduce:animate-none",
        className
      )}
    >
      {content}
    </div>,
    document.body
  )
}

export { FilmPeek, type FilmPeekProps }
