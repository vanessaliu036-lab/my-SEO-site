"use client"

import { usePathname } from "next/navigation"
import type { ReactNode } from "react"
import { PublicTopNav } from "@/components/ui/public-top-nav"

export default function PublicSiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const bypassChrome = pathname === "/" || pathname.startsWith("/admin")

  if (bypassChrome) return <>{children}</>

  return (
    <div className="occ-public-shell min-h-screen bg-[#f6f3ea] text-[#182019]">
      <PublicTopNav />
      <div className="occ-public-main min-h-[calc(100vh-72px)]">{children}</div>
    </div>
  )
}
