import type { ReactNode } from "react"

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`
        [role="img"][aria-label="Cambodian coffee at origin"] {
          background-image: url("/about/hero-image") !important;
          background-position: center center !important;
        }
      `}</style>
      {children}
    </>
  )
}
