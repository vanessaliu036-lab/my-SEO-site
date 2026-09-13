import type { ReactNode } from "react"
import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="relative min-h-screen bg-white">{children}</main>
      <SiteFooter />

      <div
        className="fixed right-8 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-4 md:flex"
        aria-hidden="true"
      >
        <div className="h-12 w-px bg-gray-300" />
        <span className="text-[10px] tracking-widest text-gray-400 [writing-mode:vertical-lr]">OCC</span>
        <div className="h-12 w-px bg-gray-300" />
      </div>
    </>
  )
}
