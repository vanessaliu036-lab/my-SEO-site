"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/** A single premium motion language for the public site. */
export function SiteMotion() {
  const pathname = usePathname()

  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".occ-site-main")
    if (!root) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const targets = Array.from(root.querySelectorAll<HTMLElement>("section, article"))
      .filter((node) => !node.closest("[data-motion-static]"))

    targets.forEach((node, index) => {
      node.dataset.occReveal = ""
      node.style.setProperty("--occ-reveal-delay", `${Math.min(index % 3, 2) * 45}ms`)
    })

    if (reduced) {
      targets.forEach((node) => node.dataset.occVisible = "")
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          ;(entry.target as HTMLElement).dataset.occVisible = ""
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.02, rootMargin: "0px 0px -5%" },
    )

    targets.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [pathname])

  return null
}
