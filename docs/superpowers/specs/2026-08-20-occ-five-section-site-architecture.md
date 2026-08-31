# OCC Five-Section Site Architecture

## Goal

Reduce the public site to one coherent information architecture with exactly five top-level sections: ABOUT, SOLUTIONS, COLLECTION, BLOG, CONTACT. The homepage is reached through the OCC logo and is not a navigation item. Admin remains isolated at `/admin` and is not part of the public information architecture.

## Public route architecture

```text
app/
├─ layout.tsx
├─ globals.css
├─ (site)/
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ about/
│  │  ├─ page.tsx
│  │  ├─ mission/
│  │  ├─ founder/
│  │  ├─ manifesto/
│  │  └─ sustainability/
│  ├─ solutions/
│  │  ├─ page.tsx
│  │  ├─ wholesale/
│  │  ├─ roasting-program/
│  │  ├─ barista-staffing/
│  │  └─ equipment-service/
│  ├─ collection/
│  │  ├─ page.tsx
│  │  ├─ sovann/
│  │  ├─ prek/
│  │  └─ angkar/
│  ├─ blog/
│  │  ├─ page.tsx
│  │  └─ [slug]/
│  └─ contact/
├─ (admin)/
│  └─ admin/
├─ api/
├─ robots.ts
└─ sitemap.ts
```

Route groups MUST NOT change public URLs.

## Navigation

The public header has exactly these five top-level items, in this order:

1. ABOUT
2. SOLUTIONS
3. COLLECTION
4. BLOG
5. CONTACT

The OCC logo links to `/`.

ABOUT children:
- Mission → `/about/mission`
- Founder → `/about/founder`
- Manifesto → `/about/manifesto`
- Sustainability → `/about/sustainability`

SOLUTIONS children:
- Wholesale → `/solutions/wholesale`
- Roasting Program → `/solutions/roasting-program`
- Barista Staffing → `/solutions/barista-staffing`
- Equipment Service → `/solutions/equipment-service`

COLLECTION children:
- Mondulkiri Origin Collection → `/collection`
- SOVANN → `/collection/sovann`
- PREK → `/collection/prek`
- ANGKAR → `/collection/angkar`

BLOG and CONTACT are independent top-level links with no children.

`HOME`, `COFFEE`, `INSIGHTS`, `CULTURE & ETHICS`, `VISION`, `SYSTEM`, `SIGNAL`, `MATTER`, and `ARCHIVE` MUST NOT appear as public top-level navigation items.

A small `STAFF ACCESS ↗` link may link to `/admin`, but it is visually subordinate and outside the public navigation hierarchy. The old floating `ADMIN ↗` control is removed.

## Legacy route handling

The following former public routes are removed from the page architecture and preserved only with permanent redirects:

- `/coffee` and `/coffee/single-origin` → `/collection`
- `/vision` → `/about`
- `/system` → `/about`
- `/signal` → `/blog`
- `/matter` → `/blog`
- `/archive` → `/blog`

Existing historical blog redirects remain intact.

## Shared layout boundaries

`app/layout.tsx` owns only global document concerns: fonts, global metadata defaults, analytics, global Organization JSON-LD, and `globals.css`.

`app/(site)/layout.tsx` owns the only public site shell: header, mobile navigation, public page background, main content wrapper, and footer if/when present.

`app/(admin)/admin/**` does not inherit the public site shell.

No page route may introduce a second site header, second global navigation, floating admin control, or duplicate persistent OCC side ornament.

## Component architecture

```text
components/
├─ site/
│  ├─ navigation-data.ts
│  ├─ site-header.tsx
│  ├─ mobile-menu.tsx
│  ├─ site-shell.tsx
│  └─ staff-access.tsx
├─ templates/
│  ├─ home-template.tsx
│  ├─ story-template.tsx
│  ├─ service-template.tsx
│  ├─ collection-template.tsx
│  ├─ product-template.tsx
│  ├─ journal-template.tsx
│  ├─ article-template.tsx
│  └─ contact-template.tsx
├─ sections/
└─ ui/
```

Navigation data exists in exactly one source file and is consumed by desktop and mobile navigation.

## Design-system boundary

`app/globals.css` is the single source for public design tokens: color, typography scale, content widths, spacing rhythm, border treatment, motion timing, and responsive breakpoints used by shared components.

Individual pages may choose different compositions, but they may not establish unrelated page-wide background systems, independent header typography, or conflicting base text scales.

## SEO invariants

The architecture refactor MUST preserve:

- Current canonical URLs for retained pages.
- Page metadata and Open Graph/Twitter metadata unless a route is intentionally redirected.
- Existing JSON-LD for retained pages.
- Blog dynamic slug behavior and Airtable/data fetching.
- Article H1 text and article body content.
- Existing pillar/cluster internal-link logic.
- `robots.ts` and `sitemap.ts` behavior, except that removed legacy pages must no longer be emitted as standalone public pages if the current implementation explicitly lists them.
- Existing redirects for deleted historical blog posts.

## Scope for this phase

This phase is architecture-first. It moves retained routes under route groups, creates the single public shell and single navigation source, removes conflicting legacy chrome, adds legacy redirects, and preserves SEO behavior.

This phase does NOT perform the final visual redesign of every page. Page-specific design templates will be refined after the architecture is stable and verified.
