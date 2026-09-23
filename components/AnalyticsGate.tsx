"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/react"
import { GoogleAnalytics } from "@/components/GoogleAnalytics"

const PRODUCTION_HOSTS = new Set(["origincafekh.com", "www.origincafekh.com"])
const QA_DISABLE_KEY = "occ-analytics-disabled"

export function AnalyticsGate({
  measurementId,
  clarityId,
}: {
  measurementId?: string
  clarityId: string
}) {
  const pathname = usePathname()
  const [eligible, setEligible] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function evaluateTraffic() {
      const hostname = window.location.hostname.toLowerCase()
      const params = new URLSearchParams(window.location.search)
      const qaMode = params.get("occ_qa")

      if (qaMode === "1") window.localStorage.setItem(QA_DISABLE_KEY, "1")
      if (qaMode === "0") window.localStorage.removeItem(QA_DISABLE_KEY)

      const isProductionHost = PRODUCTION_HOSTS.has(hostname)
      const isAutomatedBrowser = navigator.webdriver === true
      const isInternalQa = window.localStorage.getItem(QA_DISABLE_KEY) === "1"

      if (!isProductionHost || isAutomatedBrowser || isInternalQa) {
        if (!cancelled) setEligible(false)
        return
      }

      try {
        const controller = new AbortController()
        const timeout = window.setTimeout(() => controller.abort(), 1800)
        const response = await fetch("/api/analytics-eligibility", {
          method: "POST",
          cache: "no-store",
          headers: { "Content-Type": "application/json" },
          body: "{}",
          signal: controller.signal,
        })
        window.clearTimeout(timeout)

        if (!response.ok) throw new Error("Analytics eligibility check failed")
        const result = (await response.json()) as { allow?: boolean }
        if (!cancelled) setEligible(result.allow === true)
      } catch {
        // Fail open for real visitors if the measurement-quality check is unavailable.
        // Preview, QA and webdriver traffic are still excluded above.
        if (!cancelled) setEligible(true)
      }
    }

    void evaluateTraffic()
    return () => {
      cancelled = true
    }
  }, [])

  if (pathname === "/admin" || pathname.startsWith("/admin/")) return null
  if (!eligible) return null

  return (
    <>
      <Analytics
        beforeSend={(event) => {
          const url = new URL(event.url, window.location.origin)
          if (!PRODUCTION_HOSTS.has(url.hostname.toLowerCase())) return null
          if (url.pathname === "/admin" || url.pathname.startsWith("/admin/")) return null
          return event
        }}
      />
      {measurementId ? <GoogleAnalytics measurementId={measurementId} /> : null}
      <Script
        id="microsoft-clarity"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${clarityId}");`,
        }}
      />
    </>
  )
}
