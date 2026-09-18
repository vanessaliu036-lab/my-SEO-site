import type { ReactNode } from "react"
import Image from "next/image"

export default function RoastingProgramLayout({ children }: { children: ReactNode }) {
  return (
    <div className="roasting-program-page">
      {children}
      <section
        className="roasting-photo-gallery mx-auto w-full max-w-[1680px] bg-[#f6f3ea] px-6 pb-16 pt-3 sm:px-8 md:px-12 lg:px-16 lg:pb-24"
        aria-label="OCC roasting and coffee reference photographs"
      >
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:gap-8">
          <figure className="relative aspect-[3/4] overflow-hidden bg-[#202820] sm:aspect-[4/5]">
            <Image
              src="/images/roasting/roaster-evaluation.png"
              alt="Roaster smelling coffee beans while evaluating a roast beside the roasting equipment"
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1280px) 45vw, 720px"
              className="object-cover object-center"
            />
          </figure>
          <figure className="relative aspect-[3/4] overflow-hidden bg-[#202820] sm:aspect-[4/5]">
            <Image
              src="/images/roasting/coffee-beans-reference.png"
              alt="Close overhead view of coffee beans inside a silver coffee bag"
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1280px) 45vw, 720px"
              className="object-cover object-center"
            />
          </figure>
        </div>
      </section>
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
