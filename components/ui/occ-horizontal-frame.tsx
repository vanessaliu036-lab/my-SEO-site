import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type OccHorizontalFrameProps = {
  children: ReactNode
  className?: string
  variant?: "editorial" | "service" | "collection" | "origin" | "contact"
}

export function OccHorizontalFrame({
  children,
  className,
  variant = "editorial",
}: OccHorizontalFrameProps) {
  return (
    <div
      className={cn("occ-horizontal-frame min-h-screen bg-[#f6f3ea] text-[#182019]", `occ-horizontal-${variant}`, className)}
      data-occ-frame={variant}
    >
      {children}
    </div>
  )
}
