import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LEGACY_BLOG_REDIRECTS: Record<string, string> = {
  "/blog/the-rise-of-fine-robusta-a-game-changer-for-wholesale-coffee-buyers-in-cambodia":
    "/blog/specialty-robusta-market-2025-boom",
  "/blog/phnom-penhs-best-coffee-shops-and-where-to-buy-coffee-souvenirs":
    "/blog/cambodian-coffee-souvenir-gift-sets-2025",
  "/blog/cambodias-coffee-export-industry-challenges-opportunities-and-the-occ-model":
    "/blog/cambodia-specialty-coffee-market-supply-side-dynamics-export-capacity",
  "/blog/high-altitude-robusta-vs-commercial-robusta-a-technical-breakdown":
    "/blog/mondulkiri-robusta-sourcing-geographic-and-climatic-data",
  "/blog/the-best-luxury-gift-boxes-from-cambodia-a-curated-guide-for-discerning-givers":
    "/blog/premium-coffee-gift-box-complete-guide",
  "/blog/the-best-gifts-to-bring-elderly-parents-from-cambodia-that-theyll-actually-love":
    "/blog/specialty-coffee-gift-set-ultimate-guide",
  "/blog/angkor-wat-must-buy-souvenirs-beyond-the-temple-replicas":
    "/blog/cambodian-coffee-souvenir-gift-sets-2025",
  "/blog/how-to-shop-ethically-in-cambodia-a-guide-to-supporting-real-communities":
    "/about/sustainability",
  "/blog/shade-grown-coffee-how-forest-canopy-changes-whats-in-your-cup":
    "/blog/sustainable-specialty-robusta-farming",
  "/blog/rethinking-robusta-in-espresso-the-case-for-high-altitude-single-origin":
    "/blog/specialty-robusta-espresso-blend-guide",
  "/blog/specialty-coffee-sourcing-in-emerging-markets-why-cambodia-belongs-on-your-radar":
    "/blog/beyond-the-bean-why-sourcing-specialty-cambodia-coffee-elevates-your-cafe-s-brand-and-profitability",
  "/blog/what-to-buy-in-cambodia-souvenir-guide":
    "/blog/cambodian-coffee-souvenir-gift-sets-2025",
  "/blog/the-best-coffee-gifts-for-travel-lovers-origins-that-tell-a-story":
    "/blog/single-origin-coffee-gift-terroir",
  "/blog/the-premium-robusta-flavor-revolution-why-everything-you-knew-was-wrong":
    "/blog/robusta-coffee-flavor-profile-deep-dive",
  "/blog/how-specialty-pricing-changes-farmer-economics-the-math-behind-occs-model":
    "/about/sustainability",
  "/blog/what-does-specialty-grade-robusta-actually-mean-a-buyers-guide":
    "/blog/what-is-specialty-robusta-coffee-complete-guide",
  "/blog/terroir-in-coffee-what-the-concept-actually-means-and-why-cambodia-is-relevant":
    "/blog/from-farm-to-roaster-understanding-the-unique-terroir-and-processing-of-specialty-cambodia-coffee",
  "/blog/is-cambodian-coffee-good-an-honest-assessment":
    "/blog/cambodia-specialty-robusta-coffee-guide",
};

export function proxy(request: NextRequest) {
  const { hostname, pathname, search } = request.nextUrl;
  const legacyTarget = LEGACY_BLOG_REDIRECTS[pathname.replace(/\/$/, "")];
  if (legacyTarget) {
    const url = new URL(`https://origincafekh.com${legacyTarget}`);
    return NextResponse.redirect(url, 301);
  }

  if (hostname === "www.origincafekh.com") {
    const url = new URL(`https://origincafekh.com${pathname}${search}`);
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
