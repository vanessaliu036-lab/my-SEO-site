import type { ReactNode } from "react"
import { OccHorizontalFrame } from "@/components/ui/occ-horizontal-frame"

export default function MatterLayout({ children }: { children: ReactNode }) {
  return <OccHorizontalFrame variant="editorial">{children}</OccHorizontalFrame>
}
