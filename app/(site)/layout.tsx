import type { ReactNode } from "react"
import { AboutImageFallback } from "@/components/site/about-image-fallback"
import { SiteShell } from "@/components/site/site-shell"

export default function PublicSiteLayout({ children }: { children: ReactNode }) {
  return (
    <SiteShell>
      {children}
      <AboutImageFallback />
    </SiteShell>
  )
}
