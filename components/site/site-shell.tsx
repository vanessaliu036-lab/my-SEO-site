import type { ReactNode } from "react"
import { SiteHeader } from "@/components/site/site-header"

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <div className="occ-site-root min-h-screen">
        <main className="relative min-h-screen bg-white">{children}</main>
      </div>
    </>
  )
}
