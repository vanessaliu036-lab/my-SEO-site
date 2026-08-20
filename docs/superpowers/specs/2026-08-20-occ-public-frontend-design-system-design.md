# OCC Public Frontend Design System

Date: 2026-08-20
Status: Design specification for review
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

The desktop top navigation must show all top-level categories at all times, matching the current information architecture shown by the user:

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
4. JSON-LD schema objects and semantic content, including Organization, WebPage, AboutPage, Article, Service, FAQPage, and BreadcrumbList markup.
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

- deep olive / forest-black hero surfaces;
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

## 6. Shared public shell

Create a reusable public shell.

### 6.1 Top navigation

Desktop uses the full seven-category menu defined above. OCC branding remains on the left; Contact or the most relevant primary action may appear as a restrained action on the right only if the seven categories remain visible.

Dropdowns/mega-menu should reuse existing route groupings:

- ABOUT: About, Mission, Founder, Manifesto
- COFFEE: Single Origin and relevant coffee-origin pages
- COLLECTION: Collection, SOVANN, PREK, ANGKAR
- INSIGHTS: Blog / Signal / editorial pages
- SOLUTIONS: Wholesale, Roasting Program, Barista Staffing, Equipment Service
- CULTURE & ETHICS: Sustainability and other existing culture/ethics destinations

No new SEO landing URLs are introduced merely for navigation.

### 6.2 Public-only behavior

The shared shell applies only to public routes. `/admin` keeps its current layout and logic.

### 6.3 Shared primitives

Reusable presentation components should include:

- PublicTopNav
- PublicMobileMenu
- HorizontalPageHero
- EditorialSection
- SectionIndex
- WideContentGrid
- SpecBand
- EditorialCTA
- RelatedLinksBand
- VisualBreadcrumb
- PublicFooter

These components are presentation-only. SEO data remains owned by each route.

## 7. Page templates

### 7.1 Brand / institutional horizontal template

Routes:

- `/about`
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
- `/coffee/single-origin`

Desktop structure:

- 12-column hero band;
- eyebrow + H1 occupying one side;
- supporting copy or key facts occupying the opposing columns;
- content sections expressed as alternating left/right bands rather than stacked cards;
- facts, terms, and service specifications displayed in horizontal strips;
- related pages displayed as full-width editorial rows.

Wholesale must keep its current metadata, FAQ schema, Service schema, Breadcrumb schema, B2B copy, and internal-link injection unchanged.

### 7.2 Collection horizontal template

Routes:

- `/collection`
- `/collection/sovann`
- `/collection/prek`
- `/collection/angkar`

Desktop structure:

- image/origin area on one side and product/lot identity on the other;
- wide specification bands for process, origin, tasting, and technical information;
- asymmetric full-width sections;
- no ecommerce-style card grid unless needed for the collection index itself;
- existing H1, metadata, schema, copy, and route structure retained.

### 7.3 Journal index horizontal template

Route:

- `/blog`

Desktop structure:

- wide `The Signal.` editorial masthead;
- category/summary context placed horizontally beside the title;
- article entries displayed as wide rows spanning most of the viewport;
- pagination preserved exactly in behavior and canonical logic.

### 7.4 Article horizontal-reading template

Route:

- `/blog/[slug]`

Desktop structure:

- wide article masthead using a 12-column grid;
- category/date/reading metadata placed in side columns;
- H1 spans a dominant center/right region;
- body text remains at a readable measure, but sits within a wider editorial frame;
- tables and specification content can break wider than the body column when appropriate;
- Robusta pillar block, topics, CTA, and related articles become horizontal bands;
- Article JSON-LD, Breadcrumb JSON-LD, metadata generation, Airtable data, dynamic params, formatting pipeline, tables, lists, article-link notes, internal links, and pillar backlink logic remain unchanged.

## 8. Contact page

`/contact` uses the same top navigation and horizontal hero. The form remains functionally unchanged and sits inside a wide left/right layout with contact context or routing information in the opposing columns.

## 9. Existing special/editorial routes

`/signal`, `/matter`, `/archive`, and other existing public editorial routes should be migrated to the shared shell and horizontal visual system without changing their current indexing directives, metadata, or route behavior.

## 10. Content rules

- Do not rewrite copy just to fit the design.
- Do not delete SEO-relevant paragraphs because they look dense.
- Use layout, grouping, width, rhythm, labels, and progressive visual hierarchy to make dense pages readable.
- Existing heading text remains authoritative.
- Existing internal-link anchor text remains unchanged unless the current code already generates it dynamically.

## 11. Implementation strategy

Use shared components and wrappers rather than individually rebuilding 20+ pages from scratch.

Preferred order:

1. Create shared navigation and mobile menu.
2. Remove the public left sidebar from the shared layout while protecting `/admin`.
3. Create horizontal layout primitives.
4. Migrate About / Solutions pages.
5. Migrate Collection pages.
6. Migrate Blog index and Article template.
7. Migrate Contact and smaller editorial routes.
8. Run SEO/semantic regression checks.
9. Run production build.
10. Deploy through a feature branch preview first, then update production only after verification.

## 12. Verification gates

For representative routes `/about`, `/solutions/wholesale`, `/collection`, `/blog`, one Robusta pillar article, `/contact`, and one noindex editorial route, verify:

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
- `next build` passes TypeScript and static generation.

## 13. Out of scope

- Admin redesign.
- URL changes.
- SEO copy rewriting.
- New CMS fields.
- Airtable schema changes.
- New ecommerce functionality.
- New authentication.
- Reworking the contact backend.

## 14. Success criteria

The redesign succeeds when a visitor can move from homepage to About, Collection, Solutions, Journal, an article, and Contact and clearly perceive one OCC visual system; all desktop pages use a wide horizontal composition; all seven primary menu categories remain visible; mobile remains usable; and the site's SEO/indexing/content architecture is unchanged.