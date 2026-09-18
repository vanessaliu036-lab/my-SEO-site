import type { ReactNode } from "react"

// The shared SiteShell renders the only global navigation, CTA and footer.
// Page images and geometry are owned by OccCommercialHtmlLayout on both B2B routes.
export default function RoastingProgramLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
