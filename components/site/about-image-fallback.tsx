"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

const WHY_OCC_SELECTOR = 'div[role="img"][aria-label="Cambodian coffee origin and production"]'
const WHY_OCC_SOURCE = "/distribution-hero.webp"

export function AboutImageFallback() {
  const [target, setTarget] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const element = document.querySelector<HTMLElement>(WHY_OCC_SELECTOR)
    if (!element) return

    const previousPosition = element.style.position
    element.style.position = "relative"
    setTarget(element)

    return () => {
      element.style.position = previousPosition
    }
  }, [])

  if (!target) return null

  return createPortal(
    <img
      src={WHY_OCC_SOURCE}
      alt=""
      aria-hidden="true"
      data-about-why-occ-fallback="true"
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover object-center"
      decoding="async"
      loading="eager"
    />,
    target,
  )
}
