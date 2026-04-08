"use client"

import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"

/** On narrow viewports the nav stacks above content; after in-app navigation, scroll main into view so the new page is visible without manual scrolling. */
export default function MobileScrollToMain() {
  const pathname = usePathname()
  const isFirstMount = useRef(true)

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false
      return
    }
    const mq = window.matchMedia("(max-width: 767px)")
    if (!mq.matches) return
    const main = document.querySelector("main")
    main?.scrollIntoView({ block: "start", behavior: "auto" })
  }, [pathname])

  return null
}
