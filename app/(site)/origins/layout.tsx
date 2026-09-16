import type { ReactNode } from "react"
import { Playfair_Display } from "next/font/google"

const originsDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
})

export default function OriginsLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${originsDisplay.variable} occ-origins-scope`}>
      <style>{`
        .occ-origins-scope h1,
        .occ-origins-scope h2,
        .occ-origins-scope h3,
        .occ-origins-scope [data-occ-type="title"] {
          font-weight: 400 !important;
        }
      `}</style>
      {children}
    </div>
  )
}
