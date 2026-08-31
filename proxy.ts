import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Article migration belongs here so historical URLs have one canonical handling
// layer. Every redirect target below is a current OCC research route.
const LEGACY_BLOG_REDIRECTS: Record<string, string> = {
  "/blog/the-rise-of-fine-robusta-a-game-changer-for-wholesale-coffee-buyers-in-cambodia":
    "/blog/what-makes-fine-robusta",
  "/blog/cambodias-coffee-export-industry-challenges-opportunities-and-the-occ-model":
    "/blog/cambodia-fine-robusta-coffee-ecosystem",
  "/blog/high-altitude-robusta-vs-commercial-robusta-a-technical-breakdown":
    "/blog/mondulkiri-robusta-growing-conditions",
  "/blog/how-to-shop-ethically-in-cambodia-a-guide-to-supporting-real-communities":
    "/about/sustainability",
  "/blog/rethinking-robusta-in-espresso-the-case-for-high-altitude-single-origin":
    "/blog/fine-robusta-espresso-recipe",
  "/blog/specialty-coffee-sourcing-in-emerging-markets-why-cambodia-belongs-on-your-radar":
    "/blog/cambodia-specialty-robusta-coffee-guide",
  "/blog/the-premium-robusta-flavor-revolution-why-everything-you-knew-was-wrong":
    "/blog/fine-robusta-flavor-notes",
  "/blog/how-specialty-pricing-changes-farmer-economics-the-math-behind-occs-model":
    "/about/sustainability",
  "/blog/what-does-specialty-grade-robusta-actually-mean-a-buyers-guide":
    "/blog/what-makes-fine-robusta",
  "/blog/is-cambodian-coffee-good-an-honest-assessment":
    "/blog/cambodia-coffee",

  // 2026-08-28 migration map: preserve relevant legacy equity after the
  // public journal switched from Articles to moderated OCC_Blog_Posts.
  "/blog/the-occ-advantage-why-our-coffee-meets-cambodia-s-toughest-procurement-standards":
    "/blog/fine-robusta-grading-standards-cqi-certification-for-cambodia",
  "/blog/partnering-with-cambodian-coffee-roasters-a-guide-to-building-strong-b2b-relationships":
    "/blog/cambodia-fine-robusta-coffee-ecosystem",
  "/blog/cambodias-fine-robusta-journey-a-case-study-in-quality-transformation":
    "/blog/cambodia-fine-robusta-coffee-ecosystem",
  "/blog/qualify-cambodia-robusta-exporter":
    "/blog/cambodia-specialty-robusta-coffee-guide",
  "/blog/how-a-mondulkiri-honey-process-batch-won-a-2027-eu-direct-trade-contract":
    "/blog/honey-process-robusta",
  "/blog/cambodia-robusta-supplier-audit-checklist":
    "/blog/fine-robusta-grading-standards-cqi-certification-for-cambodia",
  "/blog/what-makes-fine-robusta-different-from-farm-to-cup-long-form":
    "/blog/what-makes-fine-robusta",
  "/blog/what-is-fine-robusta-the-complete-guide-to-the-future-of-specialty-coffee":
    "/blog/what-makes-fine-robusta",
  "/blog/cambodia-specialty-coffee-wholesale-buyer-checklist":
    "/blog/cambodia-specialty-robusta-coffee-guide",
  "/blog/specialty-robusta-vs-arabica-honest-comparison":
    "/blog/fine-robusta-vs-arabica-buyer-guide",
  "/blog/cambodia-robusta-buyer-due-diligence":
    "/blog/fine-robusta-grading-standards-cqi-certification-for-cambodia",

  // 2026-08-31 SEO Keyword Owners recovery map. These owner URLs were
  // detached from the public corpus during the source cutover. Keep the
  // frozen 387 Articles slugs and bodies unchanged; recover equity with 301s.
  "/blog/mondulkiri-coffee-processing-facility":
    "/blog/mondulkiri-fine-robusta-processing-capacity",
  "/blog/is-coffee-industry-undervaluing-canephora-quality":
    "/blog/why-robusta-was-underestimated-and-why-cambodia-can-benefit-from-the-shift",
  "/blog/why-fermentation-changes-coffee-flavor":
    "/blog/fermented-flavor-cambodia-robusta",
  "/blog/why-specialty-roasters-reconsider-robusta":
    "/blog/how-specialty-roasters-use-fine-robusta-differently",
  "/blog/robusta-vs-arabica-processing":
    "/blog/cambodia-robusta-processing-methods-washed-natural-and-honey",
  "/blog/why-consumers-think-robusta-cheap":
    "/blog/why-robusta-was-underestimated-and-why-cambodia-can-benefit-from-the-shift",
  "/blog/experimental-processing-does-not-mean-better-coffee":
    "/blog/how-processing-consistency-affects-cambodia-robusta-quality",
  "/blog/what-makes-mondulkiri-valuable-international-roasters":
    "/blog/cambodia-robusta-for-roasters-flavor-body-processing-and-fit",
  "/blog/coffee-cofermentation-infusion-inoculation-disclosure":
    "/blog/cambodia-robusta-fermentation-control",
  "/blog/why-fine-robusta-matters-more-espresso":
    "/blog/fine-robusta-espresso-recipe",
  "/fine-robusta-cambodia":
    "/blog/cambodia-specialty-robusta-coffee-guide",
  "/blog/different-not-better-robusta-positioning":
    "/blog/why-cambodia-robusta-should-be-marketed-as-an-origin-not-a-substitute",
  "/blog/what-creates-fine-robusta-price-premium":
    "/blog/fine-robusta-price-premiums",
  "/blog/beyond-arabica-why-fine-robusta-deserves-a-place-in-your-specialty-coffee-portfolio-in-phnom-penh-internal-dup-ci50":
    "/blog/beyond-arabica-why-fine-robusta-deserves-a-place-in-your-specialty-coffee-portfolio-in-phnom-penh-internal-dup-unes",
  "/blog/fine-robusta-own-specialty-category":
    "/blog/what-makes-fine-robusta",
  "/blog/100-percent-fine-robusta-espresso":
    "/blog/single-origin-cambodian-robusta-espresso",
  "/blog/good-coffee-cherries-need-processing":
    "/blog/processing-and-drying-where-cambodian-fine-robusta-quality-is-won-or-lost",
  "/blog/why-traceability-matters-new-coffee-origin":
    "/blog/why-traceable-robusta-is-becoming-more-valuable-to-buyers",
  "/blog/fine-robusta-premium-espresso-milk-single-origin":
    "/blog/fine-robusta-milk-based-coffee",
  "/blog/drying-capacity-limits-coffee-growth":
    "/blog/cambodia-robusta-drying-protocols",
  "/blog/the-economic-advantages-of-fine-robusta-cost-benefit-analysis-for-cambodian-coffee-businesses":
    "/blog/the-roi-of-quality-why-investing-in-premium-specialty-coffee-pays-off-for-cambodian-hotels-restaurants",
  "/blog/fine-robusta-consistency-vs-extra-cup-point":
    "/blog/why-repeatable-quality-matters-more-than-one-high-scoring-sample",
  "/blog/fine-robusta-processing-transparency":
    "/blog/how-cambodia-robusta-can-differentiate-through-processing",
  "/blog/what-happens-peak-harvest-coffee-processing":
    "/blog/cambodian-coffee-harvest-planning",

  // Owner URL was live but noindex; recover it to an indexable origin page.
  "/blog/mondulkiri-next-specialty-coffee-origin":
    "/blog/mondulkiri-coffee-climate",
};

// These topics were deliberately retired because they no longer fit OCC's
// independent research positioning and do not have a semantically equivalent
// replacement. 410 is preferable to a generic /blog redirect (soft-404 risk).
const RETIRED_BLOG_PATHS = new Set([
  "/blog/corporate-coffee-gift-ideas-2025",
  "/blog/phnom-penhs-best-coffee-shops-and-where-to-buy-coffee-souvenirs",
  "/blog/the-best-luxury-gift-boxes-from-cambodia-a-curated-guide-for-discerning-givers",
  "/blog/the-best-gifts-to-bring-elderly-parents-from-cambodia-that-theyll-actually-love",
  "/blog/angkor-wat-must-buy-souvenirs-beyond-the-temple-replicas",
  "/blog/what-to-buy-in-cambodia-souvenir-guide",
  "/blog/the-best-coffee-gifts-for-travel-lovers-origins-that-tell-a-story",
]);

export function proxy(request: NextRequest) {
  const { hostname, pathname, search } = request.nextUrl;
  const normalizedPath = pathname.replace(/\/$/, "");
  const legacyTarget = LEGACY_BLOG_REDIRECTS[normalizedPath];

  if (legacyTarget) {
    const url = new URL(`https://origincafekh.com${legacyTarget}`);
    return NextResponse.redirect(url, 301);
  }

  if (RETIRED_BLOG_PATHS.has(normalizedPath)) {
    return new NextResponse(null, {
      status: 410,
      headers: {
        "Cache-Control": "public, max-age=86400",
        "X-Robots-Tag": "noindex",
      },
    });
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
