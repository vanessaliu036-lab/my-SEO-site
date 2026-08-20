import type { ReactNode } from "react"
import { OccHorizontalFrame } from "@/components/ui/occ-horizontal-frame"

export default function ArchiveLayout({ children }: { children: ReactNode }) {
  return <OccHorizontalFrame variant="editorial">{children}</OccHorizontalFrame>
}
