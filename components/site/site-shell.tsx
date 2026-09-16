import type { ReactNode } from "react"
import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteFinalCta } from "@/components/site/site-final-cta"

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="relative min-h-screen bg-white">{children}</main>
      <SiteFinalCta />
      <SiteFooter />
    </>
  )
}
