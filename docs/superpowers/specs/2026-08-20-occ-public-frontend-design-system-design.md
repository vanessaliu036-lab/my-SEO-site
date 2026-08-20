# OCC Public Frontend Design System

Date: 2026-08-20
Status: Approved design specification
Repository: `vanessaliu036-lab/my-SEO-site`

## 1. Goal

Unify the entire public-facing Origin Coffee Cambodia website under the new homepage visual language while preserving the existing SEO architecture and content semantics.

The redesign is presentation-layer work. It must not rewrite or weaken indexing, canonicalization, schema, internal linking, article routing, Airtable content, or contact-form behavior.

`/admin` is out of scope.

## 2. Mandatory layout direction

All public desktop pages use a **horizontal / landscape composition**.

This means:

- full-width page framing rather than a narrow centered reading card;
- 12-column grid as the main desktop layout system;
- wide hero bands;
- left/right content splits;
- horizontal information strips and specification bands;
- section transitions that move across the width of the viewport;
- large editorial typography with asymmetric placement;
- important metadata or supporting information placed in side columns rather than stacked directly under the heading;
- article pages may preserve a controlled reading width for body copy, but the article header, metadata, related content, and CTA framing must still feel horizontally composed.

Mobile is the exception: below tablet widths, the same information collapses into a clear vertical flow.

The old persistent left sidebar must be removed from public desktop pages. Navigation moves to the top.

## 3. Mandatory desktop menu

The desktop top navigation must show all top-level categories at all times:

- HOME
- ABOUT
- COFFEE
- COLLECTION
- INSIGHTS
- SOLUTIONS
- CULTURE & ETHICS

These labels must not be reduced to a shorter four- or five-item navigation.

Each category may expose existing child routes through hover/click dropdowns or a restrained mega-menu. Existing route destinations must be reused; no SEO route renaming is allowed.

Mobile uses the same top-level categories inside a full-screen expandable menu.

## 4. SEO invariants

The following must remain unchanged unless a separate pre-existing bug is found and explicitly approved:

1. Public URLs and route paths.
2. Metadata titles, descriptions, keywords, Open Graph, and Twitter metadata.
3. Canonical URLs and alternate-link logic.
4. JSON-LD schema objects and semantic content, including Organization, WebPage, AboutPage, Article, Service, FAQPage, ItemList, CollectionPage, Product, and BreadcrumbList markup.
5. Existing H1 text and one-H1-per-page behavior.
6. Existing H2/H3 copy and content ordering, except for non-semantic wrapper changes.
7. Airtable article titles, summaries, excerpts, body content, dates, authors, categories, keywords, and dynamic slug logic.
8. Blog `generateMetadata`, `generateStaticParams`, `dynamicParams`, revalidation, redirects, and 404 behavior.
9. Existing internal-link destinations, including the Robusta pillar/cluster links and automatic keyword-link injection.
10. Sitemap and robots behavior.
11. Contact form fields, validation, server action, success/error handling.
12. Structured breadcrumb data even when the visual breadcrumb UI changes.

Representative routes must be regression-checked before and after the redesign.

## 5. Visual language

The whole public site extends the approved homepage direction:

- deep olive / forest-black / espresso hero surfaces;
- warm ivory and stone reading surfaces;
- thin architectural grid lines;
- Cormorant Garamond for large editorial display type and Inter for interface/body type;
- small uppercase metadata labels with wide tracking;
- oversized headings placed asymmetrically across the 12-column system;
- restrained pill CTAs;
- arrow-slide hover motion;
- generous but controlled whitespace;
- photography as origin evidence, not decorative stock-card filler;
- no SaaS dashboard cards;
- no black-heavy treatment across every section;
- no narrow stacked desktop layout.

The homepage remains the most cinematic page. Inner pages are more editorial but visually part of the same system.

## 6. Motion system

Motion is part of the design system, not an afterthought.

Global motion rules:

- use restrained movement with `ease: [0.22, 1, 0.36, 1]` for primary entrance/reveal motion;
- typical reveal duration is 0.55–0.75 seconds;
- page heroes may use staged entrance animation but must settle quickly;
- hover interactions use 150–300 ms transitions;
- alternating content cards may move 60–80 px on desktop and 20–30 px on mobile;
- use viewport-triggered reveal only once for long-form content;
- no bounce, elastic overshoot, aggressive parallax, continuous floating, or decorative motion that competes with reading;
- support `prefers-reduced-motion`: remove translation and keep opacity-only or static presentation;
- do not animate SEO-relevant content in a way that removes it from the server-rendered DOM.

Framer Motion may be used for client-side presentation components. Semantic content must remain present in rendered markup.

## 7. Shared public shell

Create a reusable public shell.

### 7.1 Top navigation

Desktop uses the full seven-category menu defined above. OCC branding remains on the left; Contact may appear as a restrained action on the right only if the seven categories remain visible.

Dropdowns/mega-menu reuse existing route groupings:

- ABOUT: `/about`, `/about/mission`, `/about/founder`, `/about/manifesto`
- COFFEE: `/coffee/single-origin` and existing coffee-origin destinations
- COLLECTION: `/collection`, `/collection/sovann`, `/collection/prek`, `/collection/angkar`
- INSIGHTS: `/blog`, `/signal`, `/matter`, `/archive`
- SOLUTIONS: `/solutions`, `/solutions/wholesale`, `/solutions/roasting-program`, `/solutions/barista-staffing`, `/solutions/equipment-service`
- CULTURE & ETHICS: `/about/sustainability` and other existing culture/ethics destinations

No new SEO landing URLs are introduced merely for navigation.

### 7.2 Public-only behavior

The shared shell applies only to public routes. `/admin` keeps its current layout and logic.

### 7.3 Shared primitives

Reusable presentation components should include:

- `PublicTopNav`
- `PublicMobileMenu`
- `MinimalistHero`
- `HorizontalPageHero`
- `EditorialSection`
- `SectionIndex`
- `WideContentGrid`
- `SpecBand`
- `EditorialCTA`
- `RelatedLinksBand`
- `VisualBreadcrumb`
- `PublicFooter`
- `OriginFeatureStrip`
- `AlternatingRevealSection`

These components are presentation-only. SEO data remains owned by each route.

## 8. Page templates and approved page-specific art direction

### 8.1 About page: Minimalist Hero with coffee bag

Route: `/about`

The first viewport adapts the supplied `MinimalistHero` component pattern into OCC rather than copying the demo brand/content.

Required behavior and structure:

- create `components/ui/minimalist-hero.tsx` in the configured shadcn UI alias path;
- project already uses TypeScript, Tailwind, shadcn aliases, `@/lib/utils`, and `lucide-react`;
- use Framer Motion for the restrained entrance sequence;
- preserve the current About page H1 semantic text: `ABOUT ORIGIN.`;
- the center visual is a vertical coffee package/bag, never a human portrait;
- behind the bag, use a restrained origin-color circle or halo that belongs to the OCC palette rather than generic bright yellow;
- left copy uses the current About positioning/content rather than lorem ipsum;
- desktop is a three-zone horizontal composition: statement / product visual / H1;
- the complete seven-category OCC menu is available from the shared navigation system;
- mobile collapses to product visual, H1, and supporting copy without horizontal overflow;
- existing About metadata, Organization schema, Breadcrumb schema, AboutPage schema, copy, statistics, navigation links, and SEO body content remain unchanged below or around the new hero.

### 8.2 Brand / institutional horizontal template

Routes:

- `/about/mission`
- `/about/founder`
- `/about/manifesto`
- `/about/sustainability`
- `/vision`
- `/system`
- `/solutions`
- `/solutions/wholesale`
- `/solutions/roasting-program`
- `/solutions/barista-staffing`
- `/solutions/equipment-service`

Desktop structure:

- 12-column hero band;
- eyebrow + H1 occupying one side;
- supporting copy or key facts occupying the opposing columns;
- content sections expressed as alternating left/right bands rather than stacked cards;
- facts, terms, and service specifications displayed in horizontal strips;
- related pages displayed as full-width editorial rows.

Wholesale must keep its current metadata, FAQ schema, Service schema, Breadcrumb schema, B2B copy, and internal-link injection unchanged.

### 8.3 Collection: three-package overlap composition

Route: `/collection`

The collection landing page uses the approved three-object overlapping visual composition.

Required desktop structure:

- warm ivory background;
- centered eyebrow and existing Collection H1;
- short existing collection description beneath the title;
- three large package visuals overlap in the lower hero region;
- PREK sits left and rotates slightly counter-clockwise;
- SOVANN is largest and visually foremost in the center;
- ANGKAR sits right and rotates slightly clockwise;
- each package links to its existing route;
- hovering/focusing a package lifts it slightly and scales it subtly while the other packages visually recede;
- do not convert the hero into ecommerce cards;
- below the package hero, retain the existing explanatory content and convert technical/origin information into wide horizontal bands;
- no route, CollectionPage schema, Product entries, H1 copy, metadata, or internal destination changes.

Mobile behavior:

- central package remains dominant;
- side packages remain partially visible or are horizontally scrollable;
- avoid three full-width stacked product cards in the first viewport.

### 8.4 Collection detail horizontal template

Routes:

- `/collection/sovann`
- `/collection/prek`
- `/collection/angkar`

Desktop structure:

- product/lot identity and package/origin visual occupy opposing columns;
- wide specification bands for process, origin, tasting, and technical information;
- asymmetric full-width sections;
- existing H1, metadata, schema, copy, and route structure retained.

### 8.5 Origin / terroir page: four feature icons + alternating reveal

Route: `/coffee/single-origin`

This page uses the approved origin-introduction pattern.

The hero preserves the existing H1 `Terroir Architecture.` and current metadata/schema.

Immediately beneath the hero, add a four-feature strip derived only from facts already supported by the page content. The four design concepts are:

- ALTITUDE
- TERROIR / SOIL
- HARVEST / ORIGIN
- TRACEABILITY / LOT DATA

The exact supporting copy must come from existing page content/schema and may not invent unsupported origin claims.

Use Lucide icons where suitable rather than hand-drawn SVGs.

Below the feature strip, present the existing regional information in alternating horizontal reveal sections:

- first major region/detail block enters from the left;
- second enters from the right;
- subsequent blocks alternate if more are added;
- desktop translation 60–80 px with opacity 0 → 1;
- mobile translation 20–30 px;
- duration around 0.6 s;
- easing `[0.22, 1, 0.36, 1]`;
- trigger once at approximately 25% viewport visibility;
- reduced-motion users receive no translation.

The existing `ItemList`, FAQ, and Breadcrumb JSON-LD remain untouched. Existing region coordinates, altitude, soil, profile, density, and moisture data remain authoritative.

### 8.6 Journal index horizontal template

Route: `/blog`

Desktop structure:

- wide `The Signal.` editorial masthead;
- category/summary context placed horizontally beside the title;
- article entries displayed as wide rows spanning most of the viewport;
- pagination preserved exactly in behavior and canonical logic.

### 8.7 Article horizontal-reading template

Route: `/blog/[slug]`

Desktop structure:

- wide article masthead using a 12-column grid;
- category/date/reading metadata placed in side columns;
- H1 spans a dominant center/right region;
- body text remains at a readable measure, but sits within a wider editorial frame;
- tables and specification content can break wider than the body column when appropriate;
- Robusta pillar block, topics, CTA, and related articles become horizontal bands;
- Article JSON-LD, Breadcrumb JSON-LD, metadata generation, Airtable data, dynamic params, formatting pipeline, tables, lists, article-link notes, internal links, and pillar backlink logic remain unchanged.

## 9. Contact page

`/contact` uses the same top navigation and horizontal hero. The form remains functionally unchanged and sits inside a wide left/right layout with contact context or routing information in the opposing columns.

## 10. Existing special/editorial routes

`/signal`, `/matter`, `/archive`, and other existing public editorial routes migrate to the shared shell and horizontal visual system without changing their current indexing directives, metadata, or route behavior.

## 11. Content rules

- Do not rewrite copy just to fit the design.
- Do not delete SEO-relevant paragraphs because they look dense.
- Use layout, grouping, width, rhythm, labels, and progressive visual hierarchy to make dense pages readable.
- Existing heading text remains authoritative.
- Existing internal-link anchor text remains unchanged unless the current code already generates it dynamically.
- Do not invent coffee-origin facts to populate decorative UI.

## 12. Implementation strategy

Use shared components and wrappers rather than individually rebuilding 20+ pages from scratch.

Preferred order:

1. Add motion dependency and shared navigation/mobile menu.
2. Remove the public left sidebar from the shared layout while protecting `/admin`.
3. Create horizontal layout and motion primitives.
4. Implement About Minimalist Hero.
5. Implement Collection overlap hero.
6. Implement Origin feature strip + alternating reveal sections.
7. Migrate remaining About / Solutions / Collection detail pages.
8. Migrate Blog index and Article template.
9. Migrate Contact and smaller editorial routes.
10. Run SEO/semantic regression checks.
11. Run production build.
12. Deploy through the feature branch preview first, then update production only after verification and explicit approval.

## 13. Verification gates

For representative routes `/about`, `/solutions/wholesale`, `/collection`, `/coffee/single-origin`, `/blog`, one Robusta pillar article, `/contact`, and one noindex editorial route, verify:

- route remains identical;
- HTTP response succeeds;
- canonical remains identical;
- title/description remain identical;
- H1 text and count remain identical;
- JSON-LD blocks remain present and parseable;
- breadcrumb schema remains present;
- internal-link hrefs remain present;
- Robusta pillar backlink logic remains present;
- noindex stays noindex where currently configured;
- mobile layout collapses correctly;
- all seven desktop menu categories are visible;
- desktop layout is horizontal, not a narrow stacked column;
- reduced-motion behavior is available for motion components;
- `/admin` is visually/functionally unaffected;
- `next build` passes TypeScript and static generation.

## 14. Out of scope

- Admin redesign.
- URL changes.
- SEO copy rewriting.
- New CMS fields.
- Airtable schema changes.
- New ecommerce functionality.
- New authentication.
- Reworking the contact backend.

## 15. Success criteria

The redesign succeeds when a visitor can move from homepage to About, Origin, Collection, Solutions, Journal, an article, and Contact and clearly perceive one OCC visual system; all desktop pages use a wide horizontal composition; all seven primary menu categories remain visible; motion follows one restrained system; mobile remains usable; and the site's SEO/indexing/content architecture is unchanged.