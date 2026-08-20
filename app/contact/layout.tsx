import type { ReactNode } from "react"
import { OccHorizontalFrame } from "@/components/ui/occ-horizontal-frame"

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <OccHorizontalFrame variant="contact">{children}</OccHorizontalFrame>
}
