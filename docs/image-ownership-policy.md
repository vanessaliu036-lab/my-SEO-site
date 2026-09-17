# OCC editorial-image ownership policy

Status: implementation in progress; this document is not a production-release approval.

## Rule

Every **visible editorial image** (Hero, banner, content photography, gallery/card art) has exactly one owning public route. No two routes may render the same source photograph, including files with different names, different crops, alternate resolutions, or color edits of the same photograph. An image may be reused for responsive variants within its own route only when they represent the same editorial slot. Logos, icons, functional UI symbols, and non-visible social-sharing metadata are separate identity assets rather than editorial images; do not use that exemption to hide a photograph in page content.

A template may be shared for structure, copy layout, and motion, but must not hard-code a shared editorial photo when it renders across routes. Provide each route's image assignment explicitly. Do not silently fall back to the homepage photo or another route's photo. If a photo is unavailable, use a designed non-photographic treatment and raise a missing-asset item instead of substituting somebody else's photograph.

## Confirmed defects on main (2026-09-17)

- `components/templates/home-template.tsx` and `components/templates/about-editorial-template.tsx` both use `/hero-home.webp` for their respective hero image.
- `components/templates/wholesale-editorial-template.tsx` also uses `/hero-home.webp` as its hero.
- `app/about-image-overrides.css` is loaded globally from `app/layout.tsx` and force-overrides About images with `!important`; this hides the template-level assignments and can defeat route-local changes.
- `/about/occ-about-atlas.avif` is used in About's gallery override and the Distribution hero, duplicating the same asset across routes.
- `tests/occ-about-image-uniqueness.test.mjs` checks six About slots against one another, but not against other routes; passing it does not demonstrate site-wide uniqueness.

## Release acceptance

1. Remove global image-source overrides. Image choice must be set at the owning page or supplied as a route-specific template prop.
2. Build an asset inventory mapping every visible image occurrence to its owning public route, with separate treatment for dynamic images from content APIs.
3. Compare canonical URL/path, exact-file SHA-256, and visual similarity where source photographs could have been duplicated/cropped.
4. Use only photos from the owner's approved `網站用照片` library or another explicitly approved source; do not re-create, arbitrarily crop, or relabel photos to pass the audit.
5. Enforce a new automated cross-route duplicate-image gate and keep the existing About responsive layout, readability, mobile Safari behavior, navigation, and SEO unchanged.
6. Verify desktop and mobile previews. The gate reports zero cross-route duplicates and zero missing images before the user-controlled release flow may publish. No direct Codex production deployment.
