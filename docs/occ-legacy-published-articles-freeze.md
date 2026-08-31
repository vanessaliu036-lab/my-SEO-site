# OCC legacy published article freeze

Effective immediately, the 387 records in Airtable base `ＯＣＣ內容資料庫`, table `Articles`, listed in `lib/legacyPublishedArticles.mjs`, are a protected recovery corpus.

These records are read-only. No SEO scan, deduplication pass, content rewrite, or deployment may:

- delete or archive a record;
- change its publication state;
- change its `slug`, `Blogger URL`, title, or body (`Blogger Version` / `content`); or
- remove its stable `/blog/{slug}` URL from the public site or sitemap.

SEO review may add or update audit metadata only in separate audit fields. It must not rewrite the protected content or identity fields. Any exceptional change requires an explicit owner decision, a complete backup, and a new reviewed recovery manifest.

The application enforces the public side of this rule by always reading both `OCC_Blog_Posts` and `Articles`, treating the frozen record IDs as public even when a later SEO gate says rewrite or duplicate, and using the frozen slug manifest for canonical URLs.
