import type { ReactNode } from "react"
import { OccHorizontalFrame } from "@/components/ui/occ-horizontal-frame"

export default function VisionLayout({ children }: { children: ReactNode }) {
  return <OccHorizontalFrame variant="editorial">{children}</OccHorizontalFrame>
}
