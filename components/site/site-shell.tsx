import type { ReactNode } from "react"
import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteFinalCta } from "@/components/site/site-final-cta"

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="occ-site-main relative min-h-screen bg-[var(--occ-ivory)]">{children}</main>
      <SiteFinalCta />
      <SiteFooter />
    </>
  )
}
