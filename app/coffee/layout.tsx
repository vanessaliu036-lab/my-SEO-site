import type { ReactNode } from "react"
import { OccHorizontalFrame } from "@/components/ui/occ-horizontal-frame"

export default function CoffeeLayout({ children }: { children: ReactNode }) {
  return <OccHorizontalFrame variant="origin">{children}</OccHorizontalFrame>
}
