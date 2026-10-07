import type * as React from "react"

import { renderElement, type useRender } from "../lib/render"
import { cn } from "../lib/utils"

type RankNumberProps = Omit<React.ComponentProps<"span">, "children"> & {
  rank: number
  /** `sm` for list rows, `lg` for the big numbers under Top 10 posters. */
  size?: "sm" | "lg"
  /** Gold instead of grey. Defaults to the podium: ranks 1–3. */
  highlight?: boolean
}

/** A ranking number, gold for the top three. */
function RankNumber({ rank, size = "sm", highlight = rank <= 3, className, ...props }: RankNumberProps) {
  return (
    <span
      data-slot="rank-number"
      data-highlight={highlight || undefined}
      className={cn(
        "shrink-0 font-sans font-extrabold tabular-nums",
        size === "sm" ? "w-[26px] text-base" : "text-[34px] leading-[0.82] tracking-[-0.03em] sm:text-[46px]",
        highlight ? "text-brand" : "text-tertiary",
        className
      )}
      {...props}
    >
      {rank}
    </span>
  )
}

/** Ranking as a list — "Top 10 tuần này". Put it in a `Card` for FrameON's panel look. */
function RankList({ className, ...props }: React.ComponentProps<"ol">) {
  return <ol data-slot="rank-list" className={cn("m-0 list-none p-0 font-sans", className)} {...props} />
}

/**
 * One row: number, then whatever you put after it (`RankListMedia`,
 * `RankListContent`). Make the row a link with `render={<Link href="…" />}`.
 */
function RankListItem({
  rank,
  render,
  className,
  children,
  ...props
}: useRender.ComponentProps<"div"> & { rank: number }) {
  return (
    <li data-slot="rank-list-item" className="border-b border-border last:border-b-0">
      {renderElement(
        "div",
        render,
        {
          ...props,
          className: cn(
            "flex items-center gap-4 px-4 py-2 no-underline transition-colors duration-150 outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring [a&]:hover:bg-card-nested",
            className
          ),
          children: (
            <>
              <RankNumber rank={rank} />
              {children}
            </>
          ),
        },
        { slot: "rank-list-row" }
      )}
    </li>
  )
}

/** Small poster thumbnail (30×44). Holds a `PosterArt` or an `<img>`. */
function RankListMedia({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="rank-list-media"
      className={cn(
        "relative h-11 w-7.5 shrink-0 overflow-hidden rounded-xs bg-card [&>img]:size-full [&>img]:object-cover",
        className
      )}
      {...props}
    />
  )
}

function RankListContent({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="rank-list-content" className={cn("min-w-0 flex-1", className)} {...props} />
}

function RankListTitle({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="rank-list-title"
      className={cn("block truncate text-caption font-medium text-foreground", className)}
      {...props}
    />
  )
}

function RankListDescription({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="rank-list-description"
      className={cn("block truncate text-micro text-tertiary", className)}
      {...props}
    />
  )
}

export {
  RankList,
  RankListContent,
  RankListDescription,
  RankListItem,
  RankListMedia,
  RankListTitle,
  RankNumber,
  type RankNumberProps,
}
