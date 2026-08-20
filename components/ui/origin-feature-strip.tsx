"use client"

import { Layers3, MapPinned, Mountain, ScanLine } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"

export type OriginFeature = {
  label: string
  value: string
  icon: "altitude" | "terroir" | "origin" | "traceability"
}

const iconMap = {
  altitude: Mountain,
  terroir: Layers3,
  origin: MapPinned,
  traceability: ScanLine,
}

export function OriginFeatureStrip({ features }: { features: readonly OriginFeature[] }) {
  const reducedMotion = useReducedMotion()

  return (
    <div className="grid grid-cols-2 border-y border-white/15 md:grid-cols-4">
      {features.map((feature, index) => {
        const Icon = iconMap[feature.icon]
        return (
          <motion.div
            key={feature.label}
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0.01 : 0.5, delay: reducedMotion ? 0 : 0.28 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group min-h-[180px] border-b border-white/15 p-5 text-white odd:border-r md:min-h-[210px] md:border-b-0 md:border-r md:p-7 md:last:border-r-0"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="text-[9px] uppercase tracking-[0.2em] text-white/38">0{index + 1}</span>
              <Icon className="size-7 stroke-[1.25] text-white/65 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105 md:size-9" aria-hidden="true" />
            </div>
            <div className="mt-14 md:mt-16">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/80">{feature.label}</p>
              <p className="mt-3 max-w-[230px] text-xs leading-6 text-white/48 md:text-sm">{feature.value}</p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
