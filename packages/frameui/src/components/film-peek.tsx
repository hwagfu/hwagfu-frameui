import type * as React from "react"

import { StarIcon } from "../lib/icons"
import { renderElement, type useRender } from "../lib/render"
import { cn } from "../lib/utils"

// The hover layer is the only client part; the panel's pieces below render on
// the server and reach it as ready-made `panels`.
export { FilmPeek, type FilmPeekProps } from "./_film-peek-client"

/** 16:9 artwork at the top of the panel. Holds a `PosterArt ratio="wide"` or an `<img>`; link it with `render`. */
function FilmPeekMedia({ className, render, ...props }: useRender.ComponentProps<"div">) {
  return renderElement(
    "div",
    render,
    {
      ...props,
      className: cn(
        "relative block aspect-video overflow-hidden bg-card no-underline outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring [&>img]:absolute [&>img]:inset-0 [&>img]:size-full [&>img]:object-cover",
        className
      ),
    },
    { slot: "film-peek-media" }
  )
}

function FilmPeekBody({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="film-peek-body" className={cn("p-4", className)} {...props} />
}

/** Row of round buttons: watch (golden), add to list, details. */
function FilmPeekActions({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="film-peek-actions" className={cn("flex items-center gap-2", className)} {...props} />
}

/** Wraps the title and tagline; link it to the film page with `render`. */
function FilmPeekHeader({ className, render, ...props }: useRender.ComponentProps<"div">) {
  return renderElement(
    "div",
    render,
    {
      ...props,
      className: cn(
        "mt-3 block min-w-0 rounded-xs no-underline outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        className
      ),
    },
    { slot: "film-peek-header" }
  )
}

function FilmPeekTitle({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="film-peek-title"
      className={cn("block truncate text-subtitle font-bold text-heading", className)}
      {...props}
    />
  )
}

/** Tagline or original title under the name. */
function FilmPeekDescription({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="film-peek-description"
      className={cn("block truncate text-caption text-tertiary", className)}
      {...props}
    />
  )
}

/** Small facts in a row: rating, `AgeChip`, year, length or episodes. */
function FilmPeekMeta({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="film-peek-meta"
      className={cn("mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-micro text-muted-foreground", className)}
      {...props}
    />
  )
}

/** Gold star and score, for `FilmPeekMeta`. */
function FilmPeekRating({
  value,
  className,
  ...props
}: Omit<React.ComponentProps<"span">, "children"> & { value: number }) {
  return (
    <span
      data-slot="film-peek-rating"
      className={cn("inline-flex items-center gap-[3px] font-bold text-brand", className)}
      {...props}
    >
      <StarIcon className="size-[11px] fill-brand" />
      {value.toFixed(1)}
    </span>
  )
}

/** Synopsis, cut to two lines. */
function FilmPeekSynopsis({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="film-peek-synopsis"
      className={cn("m-0 mt-2 line-clamp-2 text-caption text-pretty text-muted-foreground", className)}
      {...props}
    />
  )
}

/** Last line: genres, joined with " · ". */
function FilmPeekGenres({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="film-peek-genres" className={cn("mt-2 truncate text-micro text-tertiary", className)} {...props} />
  )
}

export {
  FilmPeekActions,
  FilmPeekBody,
  FilmPeekDescription,
  FilmPeekGenres,
  FilmPeekHeader,
  FilmPeekMedia,
  FilmPeekMeta,
  FilmPeekRating,
  FilmPeekSynopsis,
  FilmPeekTitle,
}
