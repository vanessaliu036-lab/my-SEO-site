"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

/** Mobile: after opening /blog or an article, scroll the main column into view so content is not below the fold. */
export default function BlogScrollToContent() {
  const pathname = usePathname()

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)")
    if (!mq.matches) return
    const main = document.querySelector("main")
    main?.scrollIntoView({ block: "start", behavior: "auto" })
  }, [pathname])

  return null
}
