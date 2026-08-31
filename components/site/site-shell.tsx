import type { ReactNode } from "react"
import { SiteHeader } from "@/components/site/site-header"

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f6f3ea] text-[#182019]">
      <SiteHeader />
      <main className="min-h-screen">{children}</main>
    </div>
  )
}
