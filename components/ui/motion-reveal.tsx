"use client"

import type { ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

type MotionRevealProps = {
  children: ReactNode
  direction?: "left" | "right" | "up"
  className?: string
  delay?: number
}

export function MotionReveal({
  children,
  direction = "up",
  className,
  delay = 0,
}: MotionRevealProps) {
  const reducedMotion = useReducedMotion()
  const desktopOffset = direction === "left" ? -72 : direction === "right" ? 72 : 28

  return (
    <motion.div
      className={cn(className)}
      initial={reducedMotion ? { opacity: 0 } : direction === "up" ? { opacity: 0, y: desktopOffset } : { opacity: 0, x: desktopOffset }}
      whileInView={reducedMotion ? { opacity: 1 } : direction === "up" ? { opacity: 1, y: 0 } : { opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
