# OCC engagement optimization diagnosis — 2026-09-18

Status: diagnosis only; no production deployment or page modifications.

## Baseline (user-provided GA4)
Home page titles: 24 and 30 seconds average engagement per active user; Blog: 26 seconds; Research Journal: 16 seconds; Wholesale: 35 seconds; Fine Robusta: 60 seconds. Page titles alone do not establish unique URLs or causal reasons for disengagement.

## Verified code observations
- `app/(site)/page.tsx` already uses approved homepage title and renders `HomeTemplate`; do not change the title based on duplicate GA4 titles alone.
- `components/templates/home-template.tsx` already has hero links to Wholesale and Fine Robusta, then a lengthy authority section, sources and FAQs. It has links to Contact and Blog. Therefore missing CTAs is not a verified cause of short engagement.
- Homepage's authority content should not be deleted or hidden without checking SEO and the approved layout.

## Next verification gate
1. In GA4 compare page path + query string, device, source/medium, landing page, engagement and scroll events for homepage, Blog, Research Journal, Wholesale; exclude 404 traffic when assessing content engagement.
2. Inspect existing analytics implementation and successful form submission instrumentation before adding events; distinguish clicks from successful leads.
3. Reproduce on mobile and desktop, measure LCP/INP/CLS, inspect image transfer and runtime errors; record failures and their exact source.
4. Read Blog, Research Journal and Wholesale implementations and compare with Fine Robusta before proposing a targeted code change.
5. Make isolated changes on a feature branch, run build and visual checks, submit draft PR for review. Do not merge or deploy without the user-controlled release process.

Success metrics: engagement time and qualified next-page navigation, actual lead submission, 404 traffic, Core Web Vitals; 45–60 seconds is a test hypothesis, not a promised result.
