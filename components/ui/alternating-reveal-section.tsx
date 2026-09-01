"use client"

import type { ReactNode } from "react"
import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

type AlternatingRevealSectionProps = {
  index: number
  children: ReactNode
  className?: string
}

export function AlternatingRevealSection({ index, children, className }: AlternatingRevealSectionProps) {
  const reducedMotion = useReducedMotion()
  const [offset, setOffset] = useState(24)

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)")
    const syncOffset = () => setOffset(query.matches ? 72 : 24)
    syncOffset()
    query.addEventListener("change", syncOffset)
    return () => query.removeEventListener("change", syncOffset)
  }, [])

  const direction = index % 2 === 0 ? -1 : 1

  return (
    <motion.section
      className={cn(className)}
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: direction * offset }}
      whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: reducedMotion ? 0.01 : 0.62, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  )
}
