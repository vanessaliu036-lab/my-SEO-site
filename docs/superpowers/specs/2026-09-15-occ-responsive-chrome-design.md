# OCC Responsive Chrome Design

## Goal
Make OCC behave as a true responsive site rather than a mobile-first layout stretched onto desktop. Desktop, tablet, and mobile must each have deliberate composition while preserving the approved visual language and existing SEO routes.

## Breakpoints
- Mobile: `< 768px` — single-column content, touch-friendly controls, mobile drawer navigation, 2-column or single-column visual entries as space permits.
- Tablet: `768px–1023px` — transitional two-column layouts where useful; hamburger remains available when the complete desktop navigation would be cramped.
- Desktop: `>= 1024px` — full horizontal primary navigation, wide editorial grid, bounded hero heights, deliberate image/text split composition, compact multi-column footer.

## Navigation
Primary navigation order is fixed:
1. ABOUT
2. ORIGINS
3. SOLUTIONS
4. PARTNERSHIPS
5. DISTRIBUTION
6. BLOG
7. CONTACT

ABOUT, ORIGINS, and SOLUTIONS retain their approved child links. PARTNERSHIPS, DISTRIBUTION, BLOG, and CONTACT are primary destinations, not footer utility links.

Desktop uses the full horizontal primary navigation. Mobile uses the drawer and displays every primary destination at the same top-level hierarchy; child links remain secondary inside their parent group.

## Footer
Footer must reflect the same information hierarchy as the primary navigation. ABOUT, ORIGINS, and SOLUTIONS may remain grouped with children. PARTNERSHIPS, DISTRIBUTION, BLOG, and CONTACT must render as normal primary footer navigation items in a vertical/structured layout, not a tiny horizontal utility row.

Copyright remains visually secondary.

## About Page
The current approved desktop polish is retained: split hero composition, bounded desktop height, large editorial whitespace, and four image-led commercial/origin entry panels. The four panels must remain real links:
- ONE ORIGIN → `/origins`
- FINE ROBUSTA → `/fine-robusta-cambodia`
- READY-TO-SELL → `/solutions/wholesale`
- MADE-FOR-YOU → `/solutions/roasting-program`

Desktop must not reuse a vertically stretched mobile composition. Mobile retains readable stacking and touch-friendly entry panels.

## Regression Requirements
Automated source-level tests must guard:
- primary navigation order;
- desktop logo/header sizing and desktop navigation breakpoint;
- mobile menu rendering all primary navigation items;
- footer no longer classifying the four primary destinations as utility links;
- four About entry panels remain linked to approved routes;
- About desktop hero remains split and bounded.

## Non-goals
No slug, canonical, redirect, SEO owner, page copy, or content architecture changes beyond navigation ordering and presentation.