import type { Metadata } from "next"
import { blogCategories, type BlogCategorySlug } from "@/lib/blogCategories"
import { alternatesFromCanonical } from "@/lib/seo"
import { ogImage, siteName, siteUrl } from "@/lib/siteConfig"

export const revalidate = 300

const categoryVisuals: Record<BlogCategorySlug, { image: string; alt: string }> = {
  "fine-robusta": { image: "/blog-media/fine-robusta.webp", alt: "Fine Robusta coffee cherries and origin research" },
  processing: { image: "/blog-media/processing.webp", alt: "Commercial coffee roasting and processing equipment" },
  "brewing-roasting": { image: "/blog-media/brewing.webp", alt: "Professional coffee brewing and roast evaluation" },
  "origin-producers": { image: "/blog-media/origin-producers.webp", alt: "Coffee origin and producer collaboration" },
  "quality-grading": { image: "/blog-media/quality-grading.webp", alt: "Coffee bean quality evaluation and grading" },
  "buyer-market": { image: "/blog-media/buyer-market.webp", alt: "Commercial coffee sourcing and buyer market activity" },
}

export const metadata: Metadata = {
  title: "Cambodia Coffee Journal | Fine Robusta Research & Market Insights | OCC",
  description: "Explore OCC's journal on Cambodian coffee, Fine Robusta, processing, roasting, quality, origins, producers and buyer intelligence.",
  alternates: alternatesFromCanonical(`${siteUrl}/blog`),
  openGraph: {
    title: "Cambodia Coffee Journal | Origin Coffee Cambodia",
    description: "Research, origin and commercial coffee intelligence from Origin Coffee Cambodia.",
    url: `${siteUrl}/blog`,
    siteName,
    locale: "en_US",
    type: "website",
    images: [{ url: ogImage, width: 1672, height: 941, alt: siteName }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cambodia Coffee Journal | Origin Coffee Cambodia",
    description: "Research, origin and commercial coffee intelligence from Origin Coffee Cambodia.",
    images: [ogImage],
  },
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
  ],
}

export default function BlogPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="overflow-hidden bg-occ-background text-occ-primary">
        <div className="mx-auto grid min-h-[620px] w-full max-w-[1360px] lg:grid-cols-[44%_56%]">
          <div className="relative min-h-[430px] overflow-hidden sm:min-h-[520px] lg:min-h-[620px]">
            <img
              src="/blog-media/hero.webp"
              alt="Cambodian coffee origin"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </div>

          <div className="relative flex min-h-[480px] flex-col justify-center px-6 py-14 sm:px-10 lg:min-h-[620px] lg:px-16 xl:px-20">
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.24em] text-occ-burgundy">OCC Journal</p>
            <h1 className="max-w-[760px] text-[clamp(3.6rem,6.4vw,6.9rem)] font-normal leading-[0.9] tracking-[-0.065em] text-occ-primary">
              The art of<br />Cambodian coffee.
            </h1>
            <p className="mt-7 max-w-[560px] text-xl leading-tight tracking-[-0.025em] text-occ-primary/72 sm:text-2xl lg:text-[1.8rem]">
              Research, origin and commercial coffee intelligence.
            </p>
            <a
              href="#blog-categories"
              className="mt-9 inline-flex w-fit items-center gap-5 bg-occ-primary px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-occ-background transition-colors hover:bg-occ-burgundy"
            >
              Explore the journal <span aria-hidden="true">→</span>
            </a>
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -right-24 h-[310px] w-[460px] rotate-[-17deg] rounded-tr-[100%] border-r border-t border-occ-primary/25" />
          </div>
        </div>
      </section>

      <section id="blog-categories" className="bg-occ-background py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <header className="mb-10 text-center sm:mb-12">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-occ-burgundy">Explore by topic</p>
            <h2 className="font-[var(--font-display)] text-[clamp(2.7rem,5vw,4.5rem)] font-normal leading-none tracking-[-0.035em] text-occ-primary">
              Blog Categories
            </h2>
          </header>

          <div className="grid gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {blogCategories.map((category) => {
              const visual = categoryVisuals[category.slug]
              return (
                <a
                  key={category.slug}
                  href={`/blog/category/${category.slug}`}
                  aria-label={`Open ${category.title} articles`}
                  className="group relative z-[1] block cursor-pointer touch-manipulation pointer-events-auto"
                >
                  <div className="pointer-events-none aspect-[1.8/1] overflow-hidden bg-occ-primary/5">
                    <img
                      src={visual.image}
                      alt={visual.alt}
                      className="pointer-events-none h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                    />
                  </div>
                  <p className="pointer-events-none mt-4 font-[var(--font-display)] text-[13px] text-occ-primary/48">OCC Journal</p>
                  <h3 className="pointer-events-none mt-1 font-[var(--font-display)] text-[clamp(1.7rem,2.6vw,2.25rem)] font-normal uppercase leading-[0.95] tracking-[-0.025em] text-occ-primary">
                    {category.title}
                  </h3>
                  <div className="pointer-events-none mt-3 flex items-center justify-between gap-4 border-b border-occ-primary/18 pb-4">
                    <span className="text-[8px] font-medium uppercase tracking-[0.23em] text-occ-primary/56">{category.kicker}</span>
                    <span className="text-lg leading-none text-occ-primary/50 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-occ-burgundy" aria-hidden="true">→</span>
                  </div>
                </a>
              )
            })}
          </div>

          <nav aria-label="OCC editorial foundations" className="mt-14 flex flex-wrap justify-center gap-x-7 gap-y-3 border-t border-occ-primary/15 pt-7">
            <a href="/fine-robusta-cambodia" className="text-[10px] font-semibold uppercase tracking-[0.18em] text-occ-burgundy hover:underline">Fine Robusta Cambodia</a>
            <a href="/origins/cambodia-regions" className="text-[10px] font-semibold uppercase tracking-[0.18em] text-occ-primary/65 hover:text-occ-burgundy">Cambodia &amp; Regions</a>
            <a href="/solutions/wholesale" className="text-[10px] font-semibold uppercase tracking-[0.18em] text-occ-primary/65 hover:text-occ-burgundy">Wholesale</a>
          </nav>
        </div>
      </section>
    </>
  )
}
