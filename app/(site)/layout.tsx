import type { ReactNode } from "react"
import { SiteShell } from "@/components/site/site-shell"

export default function PublicSiteLayout({ children }: { children: ReactNode }) {
  return <SiteShell>{children}</SiteShell>
}
