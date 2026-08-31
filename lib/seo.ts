import type { Metadata } from "next"
import { siteUrl } from "@/lib/siteConfig"

/**
 * Canonical + hreflang for the current URL (single English locale + x-default).
 * Use on every page that sets `alternates`, so child metadata does not drop `languages` from the root layout.
 */
export function pageAlternates(path: string): NonNullable<Metadata["alternates"]> {
  const p = path === "/" || path === "" ? "" : path.startsWith("/") ? path : `/${path}`
  const url = `${siteUrl}${p}`
  return {
    canonical: url,
    languages: {
      en: url,
      "x-default": url,
    },
  }
}

/** When canonical is already a full URL (e.g. blog pagination). */
export function alternatesFromCanonical(canonicalUrl: string): NonNullable<Metadata["alternates"]> {
  return {
    canonical: canonicalUrl,
    languages: {
      en: canonicalUrl,
      "x-default": canonicalUrl,
    },
  }
}
