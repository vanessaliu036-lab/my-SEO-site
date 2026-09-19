import type { ReactNode } from "react"
import "./about-images.css"

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`
        [role="img"][aria-label="Cambodian coffee at origin"] {
          background-image: url("/about/occ-about-green-hero.webp") !important;
          background-position: center 45% !important;
          background-size: cover !important;
        }
      `}</style>
      {children}
    </>
  )
}
