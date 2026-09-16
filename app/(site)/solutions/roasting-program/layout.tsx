import type { ReactNode } from "react"

export default function RoastingProgramLayout({ children }: { children: ReactNode }) {
  return (
    <div className="roasting-program-page">
      {children}
      <style>{`
        .roasting-program-page section > div.grid[class*="bg-[#202820]"] {
          background-color: #2F3B2D;
          background-image:
            linear-gradient(90deg, rgba(47, 59, 45, 0.94) 0%, rgba(47, 59, 45, 0.84) 56%, rgba(47, 59, 45, 0.72) 100%),
            url('/images/occ-roasting-program-background.webp');
          background-size: cover;
          background-position: center 46%;
          background-repeat: no-repeat;
        }
      `}</style>
    </div>
  )
}
