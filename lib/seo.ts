import type { Metadata } from "next"
import { siteUrl } from "@/lib/siteConfig"

const MAX_TITLE_LENGTH = 60
const MAX_DESCRIPTION_LENGTH = 160

/** Keep SERP metadata within display-safe bounds while preserving whole words. */
export function seoTitle(value: string): string {
  const normalized = value.replace(/\s+/g, " ").trim()
  if (normalized.length <= MAX_TITLE_LENGTH) return normalized

  const withoutBrand = normalized.replace(/\s*\|\s*(?:OCC|Origin Coffee Cambodia).*$/i, "")
  if (withoutBrand.length <= MAX_TITLE_LENGTH) return withoutBrand

  const shortened = withoutBrand.slice(0, MAX_TITLE_LENGTH - 1).replace(/\s+\S*$/, "")
  return `${shortened}…`
}

export function seoDescription(value: string, fallback = "Specialty coffee insights from Origin Coffee Cambodia."): string {
  const normalized = value.replace(/\s+/g, " ").trim() || fallback
  if (normalized.length <= MAX_DESCRIPTION_LENGTH) return normalized
  const shortened = normalized.slice(0, MAX_DESCRIPTION_LENGTH - 3).replace(/\s+\S*$/, "")
  return `${shortened}...`
}

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
