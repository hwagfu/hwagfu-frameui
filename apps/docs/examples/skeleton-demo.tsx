import { Skeleton } from "@hwagfu/frameui/skeleton"

export default function SkeletonDemo() {
  return (
    <div className="flex items-center gap-4">
      <Skeleton className="h-[120px] w-[84px] rounded-md" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-52" />
        <Skeleton className="h-3 w-40" />
        <Skeleton className="h-3 w-28" />
      </div>
    </div>
  )
}
