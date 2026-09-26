"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function SiteMotion() {
  const pathname = usePathname()

  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".occ-site-main")
    if (!root) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const targets = Array.from(
      root.querySelectorAll<HTMLElement>("section, article[data-occ-reveal], [data-rv]")
    ).filter((target) => !target.closest("[data-occ-motion='off']"))

    if (reduced || !("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("occ-motion-block", "is-visible"))
      return
    }

    targets.forEach((target) => target.classList.add("occ-motion-block"))
    document.documentElement.classList.add("occ-app-motion")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add("is-visible")
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.05, rootMargin: "0px 0px -5% 0px" }
    )

    targets.forEach((target) => observer.observe(target))
    const failsafe = window.setTimeout(() => {
      targets.forEach((target) => target.classList.add("is-visible"))
    }, 2400)

    return () => {
      observer.disconnect()
      window.clearTimeout(failsafe)
      document.documentElement.classList.remove("occ-app-motion")
    }
  }, [pathname])

  return null
}
