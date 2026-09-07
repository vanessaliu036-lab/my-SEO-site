import type { ReactNode } from "react"
import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <div className="occ-site-root min-h-screen">
        <main className="relative min-h-screen bg-[#f6f3ea]">{children}</main>
        <SiteFooter />
      </div>
    </>
  )
}
