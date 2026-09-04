"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { useState } from "react"
import { CoffeeBagVisual } from "@/components/ui/coffee-bag-visual"

export type CollectionPackageStageItem = {
  slug: string
  name: string
  subtitle: string
  tone: "olive" | "sand" | "charcoal"
}

const desktopPlacement: Record<string, string> = {
  prek: "md:left-[7%] md:top-[18%] md:-rotate-[7deg]",
  sovann: "md:left-1/2 md:top-[4%] md:z-20 md:-translate-x-1/2",
  angkar: "md:right-[7%] md:top-[18%] md:rotate-[7deg]",
}

const desktopScale: Record<string, string> = {
  prek: "md:scale-[0.9]",
  sovann: "md:scale-[1.06]",
  angkar: "md:scale-[0.9]",
}

export function CollectionPackageStage({ items }: { items: readonly CollectionPackageStageItem[] }) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null)
  const reducedMotion = useReducedMotion()

  return (
    <div className="relative mx-auto w-full max-w-[1260px]">
      <div className="pointer-events-none absolute inset-x-[10%] bottom-[3%] h-[24%] rounded-[50%] bg-black/[0.06] blur-3xl" aria-hidden="true" />

      <div className="flex snap-x snap-mandatory gap-0 overflow-x-auto px-[10vw] pb-8 pt-4 md:relative md:block md:h-[650px] md:overflow-visible md:px-0 md:pb-0 md:pt-0 lg:h-[720px]">
        {items.map((item, index) => {
          const inactive = activeSlug && activeSlug !== item.slug
          return (
            <motion.div
              key={item.slug}
              className={`relative shrink-0 snap-center px-1 md:absolute md:px-0 ${desktopPlacement[item.slug] ?? ""} ${desktopScale[item.slug] ?? ""}`}
              style={{ width: "min(78vw, 330px)" }}
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 42 }}
              animate={{ opacity: inactive ? 0.58 : 1, y: 0, scale: inactive ? 0.965 : 1 }}
              transition={{ duration: reducedMotion ? 0.01 : 0.58, delay: reducedMotion ? 0 : 0.08 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              onHoverStart={() => setActiveSlug(item.slug)}
              onHoverEnd={() => setActiveSlug(null)}
              onFocus={() => setActiveSlug(item.slug)}
              onBlur={() => setActiveSlug(null)}
            >
              <Link
                href={`/collection/${item.slug}`}
                className="group block outline-none"
                aria-label={`Explore ${item.name}`}
              >
                <motion.div
                  whileHover={reducedMotion ? undefined : { y: -14, scale: 1.025 }}
                  whileFocus={reducedMotion ? undefined : { y: -10, scale: 1.018 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center"
                >
                  <CoffeeBagVisual
                    name={item.name}
                    subtitle={item.subtitle}
                    tone={item.tone}
                    context="collection"
                    className="origin-bottom"
                  />
                  <div className="mt-5 flex items-center gap-3 text-[9px] uppercase tracking-[0.18em] text-black/45 md:mt-7">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span className="h-px w-7 bg-black/20 transition-all duration-300 group-hover:w-11" />
                    <span>Explore {item.name}</span>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
