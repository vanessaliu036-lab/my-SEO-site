export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://origincafekh.com'

/**
 * HTML `lang` — default `en-KH` = English for Cambodia (GEO hint without a Khmer site).
 * Override with `NEXT_PUBLIC_HTML_LANG` (e.g. `en` or `km` when you ship Khmer pages).
 */
export const htmlLang =
  process.env.NEXT_PUBLIC_HTML_LANG || 'en-KH'

export const siteName =
  process.env.NEXT_PUBLIC_SITE_NAME || 'Origin Coffee Cambodia'

export const siteDescription =
  process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
  'Specialty coffee B2B supplier in Cambodia. Engineering consistency and digital sovereignty.'

/** Default OG / social preview — must exist under `public/` (override with NEXT_PUBLIC_OG_IMAGE). */
export const ogImage =
  process.env.NEXT_PUBLIC_OG_IMAGE || `${siteUrl}/apple-icon.png`

/**
 * Organization / publisher logo URL (JSON-LD, OG). Default `apple-icon.png` in `public/`.
 * Set `NEXT_PUBLIC_SITE_LOGO_URL` to an absolute URL if you host the asset elsewhere.
 */
export const siteLogoUrl =
  process.env.NEXT_PUBLIC_SITE_LOGO_URL || `${siteUrl}/apple-icon.png`
