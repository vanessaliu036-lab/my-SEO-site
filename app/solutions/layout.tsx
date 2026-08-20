import type { ReactNode } from "react"
import { OccHorizontalFrame } from "@/components/ui/occ-horizontal-frame"

export default function SolutionsLayout({ children }: { children: ReactNode }) {
  return <OccHorizontalFrame variant="service">{children}</OccHorizontalFrame>
}
