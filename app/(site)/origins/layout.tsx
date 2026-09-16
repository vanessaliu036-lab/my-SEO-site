import type { ReactNode } from "react"

export default function OriginsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="occ-origins-scope">
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
