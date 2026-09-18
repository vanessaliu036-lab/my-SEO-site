"use client"

import { useEffect } from "react"

export function V9Reveal() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-rv], .feature"))
    if (targets.length === 0) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    targets.forEach((node) => {
      if (node.hasAttribute("data-rv")) node.classList.add("rv")
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const target = entry.target as HTMLElement
          observer.unobserve(target)
          const group = target.closest(".grid, .figures, .pills, .listing, .terms")
          if (group) {
            Array.from(group.querySelectorAll<HTMLElement>(".rv")).forEach((node, index) => {
              node.style.transitionDelay = `${index * 0.07}s`
              node.classList.add("on")
              observer.unobserve(node)
            })
          } else {
            target.classList.add("on")
          }
        })
      },
      { threshold: 0.06, rootMargin: "0px 0px -4% 0px" }
    )

    targets.forEach((node) => observer.observe(node))

    // Content must never stay invisible: anything still hidden after a few
    // seconds is revealed outright.
    const failsafe = window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>(".rv:not(.on)").forEach((node) => node.classList.add("on"))
    }, 2500)

    return () => {
      observer.disconnect()
      window.clearTimeout(failsafe)
    }
  }, [])

  useEffect(() => {
    const video = document.querySelector<HTMLVideoElement>("video.vhero__v")
    if (!video || typeof video.play !== "function") return
    const play = () => {
      const attempt = video.play()
      if (attempt && typeof attempt.catch === "function") attempt.catch(() => {})
    }
    play()
    const events: Array<keyof WindowEventMap> = ["touchstart", "click", "keydown"]
    events.forEach((event) => window.addEventListener(event, play, { once: true, passive: true }))
    return () => events.forEach((event) => window.removeEventListener(event, play))
  }, [])

  return null
}
