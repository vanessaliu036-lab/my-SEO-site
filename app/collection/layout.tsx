import type { ReactNode } from "react"
import { OccHorizontalFrame } from "@/components/ui/occ-horizontal-frame"

export default function CollectionLayout({ children }: { children: ReactNode }) {
  return <OccHorizontalFrame variant="collection">{children}</OccHorizontalFrame>
}
