"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const HIGH_INTENT_ROUTES = [
  "/blog",
  "/solutions",
  "/original",
  "/origins",
  "/fine-robusta-cambodia",
  "/distribution",
] as const

export function MobileConversionCta() {
  const pathname = usePathname()
  const shouldShow = HIGH_INTENT_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  )

  if (!shouldShow || pathname === "/contact") return null

  return (
    <div className="pointer-events-none fixed bottom-[max(14px,env(safe-area-inset-bottom))] right-4 z-40 md:hidden">
      <Link
        href="/contact"
        className="pointer-events-auto inline-flex items-center rounded-full border border-white/15 bg-[#182019]/95 px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.15em] text-[#f6f3ea] shadow-lg backdrop-blur-sm"
        aria-label="Start a Conversation with Origin Coffee Cambodia"
      >
        Start a Conversation <span className="ml-2" aria-hidden="true">→</span>
      </Link>
    </div>
  )
}
