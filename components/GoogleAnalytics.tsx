"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import Script from "next/script"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

const sendEvent = (eventName: string, params: Record<string, unknown>) => {
  window.gtag?.("event", eventName, params)
}

/** Track real user actions; these are diagnostic events, not key conversions. */
export function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  const pathname = usePathname()

  useEffect(() => {
    if (!measurementId) return

    const pagePath = `${window.location.pathname}${window.location.search}`
    const commonParams = { page_path: pagePath, page_location: window.location.href }
    let attempts = 0
    const signalTimer = window.setInterval(() => {
      attempts += 1
      if (!window.gtag && attempts < 10) return
      window.clearInterval(signalTimer)
      if (!window.gtag) return

      if (document.title.startsWith("404") || document.querySelector('[data-occ-not-found="true"]')) {
        sendEvent("occ_404", { ...commonParams, page_referrer: document.referrer || "(direct)" })
      }
      if (pathname === "/solutions/wholesale") sendEvent("wholesale_view", commonParams)
      if (pathname === "/contact") sendEvent("contact_view", commonParams)
    }, 200)

    const handleClick = (event: MouseEvent) => {
      const target = event.target as Element | null
      const anchor = target?.closest("a")
      if (!anchor) return
      const rawHref = anchor.getAttribute("href")?.trim()
      if (!rawHref) return
      const clickParams = {
        ...commonParams,
        link_text: anchor.textContent?.trim().slice(0, 120) || "(no text)",
        link_url: anchor.href || rawHref,
      }
      if (rawHref.toLowerCase().startsWith("mailto:")) {
        sendEvent("email_click", clickParams)
        return
      }
      let url: URL
      try { url = new URL(rawHref, window.location.href) } catch { return }
      if (["wa.me", "api.whatsapp.com", "web.whatsapp.com"].includes(url.hostname.toLowerCase())) {
        sendEvent("whatsapp_click", clickParams)
        return
      }
      if (url.origin === window.location.origin) {
        if (url.pathname === "/contact") sendEvent("contact_click", clickParams)
        if (url.pathname !== window.location.pathname) {
          sendEvent("occ_internal_navigation", { ...clickParams, destination_path: url.pathname })
        }
        if (document.querySelector('[data-occ-not-found="true"]')) {
          sendEvent("occ_404_recovery_click", { ...clickParams, destination_path: url.pathname })
        }
      }
    }

    // Thresholds record actual scroll depth, never synthetic time or engagement.
    const thresholds = [25, 50, 75, 90] as const
    const reached = new Set<number>()
    let framePending = false
    const measureScroll = () => {
      framePending = false
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      if (scrollable <= 0) return
      const percent = Math.min(100, Math.round((window.scrollY / scrollable) * 100))
      for (const threshold of thresholds) {
        if (percent >= threshold && !reached.has(threshold)) {
          reached.add(threshold)
          sendEvent("occ_scroll_depth", { ...commonParams, percent_scrolled: threshold })
        }
      }
    }
    const onScroll = () => {
      if (framePending) return
      framePending = true
      window.requestAnimationFrame(measureScroll)
    }
    document.addEventListener("click", handleClick)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.clearInterval(signalTimer)
      document.removeEventListener("click", handleClick)
      window.removeEventListener("scroll", onScroll)
    }
  }, [measurementId, pathname])

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  )
}
