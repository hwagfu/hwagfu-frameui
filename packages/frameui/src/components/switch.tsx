import { Switch as SwitchPrimitive } from "@base-ui/react/switch"

import { cn } from "../lib/utils"

/** FrameON switch: 40×22 slate track, purple when on, white 16px thumb. */
function Switch({
  className,
  size = "default",
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 cursor-pointer items-center rounded-full border border-tertiary bg-muted p-0.5 transition-colors duration-150 outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-invalid:border-brand data-[size=default]:h-[22px] data-[size=default]:w-10 data-[size=sm]:h-[18px] data-[size=sm]:w-8 data-checked:border-primary data-checked:bg-primary data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block rounded-full bg-heading shadow-raised transition-transform duration-150 group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-checked:translate-x-[18px] group-data-[size=sm]/switch:data-checked:translate-x-[14px] rtl:group-data-[size=default]/switch:data-checked:-translate-x-[18px] rtl:group-data-[size=sm]/switch:data-checked:-translate-x-[14px]"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
