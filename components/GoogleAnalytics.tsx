"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Script from "next/script"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

const QA_SESSION_KEY = "occ_analytics_excluded"
const PRODUCTION_HOSTS = new Set(["origincafekh.com", "www.origincafekh.com"])

const sendEvent = (eventName: string, params: Record<string, unknown>) => {
  window.gtag?.("event", eventName, params)
}

function shouldExcludeAnalytics(pathname: string) {
  if (!PRODUCTION_HOSTS.has(window.location.hostname.toLowerCase())) return true
  if (pathname === "/admin" || pathname.startsWith("/admin/")) return true

  const params = new URLSearchParams(window.location.search)
  if (params.get("occ_qa") === "1") {
    window.sessionStorage.setItem(QA_SESSION_KEY, "1")
    return true
  }

  if (window.sessionStorage.getItem(QA_SESSION_KEY) === "1") return true

  const userAgent = window.navigator.userAgent || ""
  const webdriver = Boolean(window.navigator.webdriver)
  const knownAutomation = /HeadlessChrome|PhantomJS|Playwright|Puppeteer|Lighthouse/i.test(userAgent)
  if (webdriver || knownAutomation) return true

  if (document.referrer) {
    try {
      const referrerHost = new URL(document.referrer).hostname.toLowerCase()
      const isVercelQaReferrer =
        referrerHost === "vercel.com" ||
        referrerHost.endsWith(".vercel.com") ||
        referrerHost.endsWith(".vercel.app")

      if (isVercelQaReferrer) {
        window.sessionStorage.setItem(QA_SESSION_KEY, "1")
        return true
      }
    } catch {
      // Ignore malformed referrers and keep normal analytics behavior.
    }
  }

  return false
}

/**
 * OCC production-only GA4.
 *
 * Traffic-quality rules:
 * - no GA on Vercel previews, localhost or non-canonical hosts
 * - no GA in /admin
 * - no GA for browser automation exposed through navigator.webdriver / known headless UAs
 * - sessions arriving from Vercel QA surfaces are excluded for the rest of that tab
 * - ?occ_qa=1 explicitly marks the current tab as internal QA without changing public content
 *
 * This does NOT geo-block Singapore, China or any other market and does not block
 * verified search/AI crawlers from accessing the site. It only keeps development /
 * automation sessions out of the GA4 KPI stream.
 */
export function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  const pathname = usePathname()
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false)

  useEffect(() => {
    if (!measurementId) return
    setAnalyticsEnabled(!shouldExcludeAnalytics(pathname))
  }, [measurementId, pathname])

  useEffect(() => {
    if (!measurementId || !analyticsEnabled) return

    const pagePath = `${window.location.pathname}${window.location.search}`
    const commonParams = {
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title,
    }

    // GA config uses send_page_view:false so excluded sessions never emit an
    // automatic page_view before the production/QA guard runs.
    let attempts = 0
    const signalTimer = window.setInterval(() => {
      attempts += 1
      if (!window.gtag && attempts < 15) return

      window.clearInterval(signalTimer)
      if (!window.gtag) return

      sendEvent("page_view", {
        ...commonParams,
        page_referrer: document.referrer || "(direct)",
      })

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
  }, [analyticsEnabled, measurementId, pathname])

  if (!analyticsEnabled) return null

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
          gtag('config', '${measurementId}', { send_page_view: false });
        `}
      </Script>
    </>
  )
}
