import { Button } from "@hwagfu/frameui/button"
import { Spinner } from "@hwagfu/frameui/spinner"

export default function SpinnerDemo() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Spinner />
      <Spinner className="size-6 text-brand" />
      <Spinner className="size-8 text-primary" />
      <Button disabled>
        <Spinner data-icon="inline-start" />
        Đang tải
      </Button>
    </div>
  )
}
