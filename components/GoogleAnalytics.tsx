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

/**
 * GA4 — `afterInteractive` loads gtag after hydration so short sessions and
 * typical crawlers are more likely to be counted (vs `lazyOnload` after full page load).
 *
 * Commercial events intentionally separate intent from outcome:
 * - wholesale_view/contact_view/contact_click = funnel intent
 * - generate_lead = successful contact-form submission (emitted in ContactForm)
 * - occ_404 = exact broken path for technical cleanup
 * - whatsapp_click/email_click = ready for direct-contact CTAs when present
 */
export function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  const pathname = usePathname()

  useEffect(() => {
    if (!measurementId) return

    const pagePath = `${window.location.pathname}${window.location.search}`
    const commonParams = {
      page_path: pagePath,
      page_location: window.location.href,
    }

    // gtag is loaded after hydration. Retry briefly so the first route signal is
    // not lost if this effect wins the race against the afterInteractive script.
    let attempts = 0
    const signalTimer = window.setInterval(() => {
      attempts += 1
      if (!window.gtag && attempts < 10) return

      window.clearInterval(signalTimer)
      if (!window.gtag) return

      if (document.title.startsWith("404")) {
        sendEvent("occ_404", {
          ...commonParams,
          page_referrer: document.referrer || "(direct)",
        })
      }

      if (pathname === "/solutions/wholesale") {
        sendEvent("wholesale_view", commonParams)
      }

      if (pathname === "/contact") {
        sendEvent("contact_view", commonParams)
      }
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
      try {
        url = new URL(rawHref, window.location.href)
      } catch {
        return
      }

      if (["wa.me", "api.whatsapp.com", "web.whatsapp.com"].includes(url.hostname.toLowerCase())) {
        sendEvent("whatsapp_click", clickParams)
        return
      }

      if (url.origin === window.location.origin && url.pathname === "/contact") {
        sendEvent("contact_click", clickParams)
      }
    }

    document.addEventListener("click", handleClick)

    return () => {
      window.clearInterval(signalTimer)
      document.removeEventListener("click", handleClick)
    }
  }, [measurementId, pathname])

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
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
