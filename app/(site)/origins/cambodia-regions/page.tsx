import type { Metadata } from "next"
import Link from "next/link"
import type { ReactNode } from "react"
import { ArrowUpRight } from "lucide-react"
import { MotionReveal } from "@/components/ui/motion-reveal"
import { pageAlternates } from "@/lib/seo"
import { siteUrl } from "@/lib/siteConfig"
import "./cambodia-regions.css"

export const metadata: Metadata = {
  title: "Cambodia Coffee Origins & Regions | Mondulkiri Coffee | OCC",
  description:
    "Explore Cambodia coffee origins, northeastern coffee highlands, Mondulkiri coffee, Ratanakiri, growing regions, regional geography, and Cambodia-grown coffee from OCC.",
  keywords:
    "Cambodia coffee origin, Cambodia coffee regions, Cambodia coffee highlands, Cambodian highland coffee, coffee growing regions in Cambodia, Mondulkiri coffee, Mondulkiri coffee Cambodia, Sen Monorom coffee, Ratanakiri coffee, coffee grown in Cambodia, Cambodia-grown coffee",
  alternates: pageAlternates("/origins/cambodia-regions"),
  openGraph: {
    title: "Cambodia Coffee Origins & Regions | OCC",
    description:
      "A geographic guide to Cambodia coffee origins, northeastern highlands, Mondulkiri, Ratanakiri, and Cambodia-grown coffee.",
    url: `${siteUrl}/origins/cambodia-regions`,
    type: "article",
  },
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Origins", item: `${siteUrl}/origins` },
    { "@type": "ListItem", position: 3, name: "Cambodia & Regions", item: `${siteUrl}/origins/cambodia-regions` },
  ],
}

const highlights = [
  {
    title: "Cambodia",
    meta: "Country of Origin",
    text: "OCC uses Cambodia to describe agricultural origin: coffee grown in Cambodia, not simply coffee roasted, packed, branded, or served here.",
  },
  {
    title: "Northeastern Highlands",
    meta: "Regional Geography",
    text: "Cambodia’s clearest coffee geography sits in the northeast, where upland terrain differs from the country’s broad lowland plains.",
  },
  {
    title: "Mondulkiri",
    meta: "Primary OCC Focus",
    text: "Mondulkiri is OCC’s central regional reference for Cambodian coffee and the strongest current geographic focus of our origin work.",
  },
  {
    title: "Ratanakiri",
    meta: "Wider Northeast",
    text: "Ratanakiri helps complete the wider northeastern coffee map without assuming that every Cambodian growing area shares one terroir.",
  },
]

const featureSections: {
  label: string
  title: string
  image: string
  alt: string
  caption: string
  content: ReactNode
}[] = [
  {
    label: "01 / Cambodia Coffee Origin",
    title: "Where Is Coffee Grown in Cambodia?",
    image: "/media/mondulkiri-terroir-red-earth-elevation.jpg",
    alt: "Fine Robusta trees growing in the red laterite soil of Cambodia's Mondulkiri highlands",
    caption: "Mondulkiri · origin context",
    content: (
      <>
        <p>
          Coffee is grown in Cambodia, although the country remains a relatively small and under-recognized producer compared with larger Southeast Asian coffee origins. For OCC, the first job of an origin page is therefore simple: make the geography clear.
        </p>
        <p>
          The strongest contemporary geographic association is with northeastern Cambodia, particularly <strong>Mondulkiri</strong>. Coffee has also been associated with <strong>Ratanakiri</strong> and other upland agricultural areas, but public documentation and lot-level evidence are not equally developed across every location.
        </p>
        <p>
          This is why OCC does not treat <strong>Cambodia coffee</strong> as one uniform terroir. Regional identity should become more specific as the evidence becomes stronger.
        </p>
      </>
    ),
  },
  {
    label: "02 / Cambodia Coffee Highlands",
    title: "Why the Northeast Matters",
    image: "/media/raised-bed-drying-honey-process-mondulkiri.jpg",
    alt: "Cambodian coffee drying on raised beds in the Mondulkiri highlands",
    caption: "Coffee production · Mondulkiri",
    content: (
      <>
        <p>
          Much of Cambodia is associated with lowland plains, river systems, and tropical heat. The northeastern provinces introduce a different physical landscape, including elevated plateaux, rolling uplands, forest-agriculture mosaics, and red-earth agricultural zones.
        </p>
        <p>
          That geographic contrast is the foundation behind searches such as <strong>Cambodia coffee highlands</strong>, <strong>Cambodian highland coffee</strong>, and <strong>coffee growing regions in Cambodia</strong>. These queries are asking where Cambodian coffee comes from, not how a particular farm manages soil, shade, or harvest.
        </p>
        <p>
          Geography gives the map. Farm-level growing conditions belong to the next layer: <Link href="/origins/farm-terroir">Farm &amp; Terroir</Link>.
        </p>
      </>
    ),
  },
  {
    label: "03 / Mondulkiri Coffee",
    title: "Cambodia’s Key Coffee Reference Point",
    image: "/media/raised-bed-drying-honey-process-mondulkiri.jpg",
    alt: "Cambodian coffee drying on raised beds in Mondulkiri",
    caption: "Drying · Mondulkiri",
    content: (
      <>
        <p>
          <strong>Mondulkiri coffee</strong> is one of the clearest regional terms for understanding modern Cambodian coffee. The province sits in eastern Cambodia and is widely associated with upland terrain, cooler conditions at elevation, red-earth landscapes, forest, and agriculture.
        </p>
        <p>
          Around <strong>Sen Monorom</strong>, published field research has documented Coffea canephora production and examined real coffee-growing systems. That gives an emerging coffee origin a geographic evidence base rather than broad marketing language.
        </p>
        <div className="cr-rule-note">
          <span>Geographic rule</span>
          <p>Mondulkiri tells us where the coffee comes from. It does not, by itself, tell us how the coffee grew or how a lot was verified.</p>
        </div>
      </>
    ),
  },
  {
    label: "04 / Sen Monorom",
    title: "A Geographic Anchor for Cambodian Coffee",
    image: "/media/mondulkiri-terroir-red-earth-elevation.jpg",
    alt: "Mondulkiri highland terrain documenting Cambodian coffee origin context",
    caption: "Highland context · Cambodia",
    content: (
      <>
        <p>
          Sen Monorom, the provincial capital of Mondulkiri, sits within the upland landscape most frequently associated with contemporary Cambodian coffee cultivation. Research around the area has examined Canephora farms, shade systems, soil moisture, yield, fruit development, and seasonal conditions.
        </p>
        <p>
          The role of this information on a regional page is not to turn one research site into a universal description of every Mondulkiri farm. Its value is to show that <strong>Mondulkiri coffee Cambodia</strong> can be discussed through real places and documented growing areas rather than a vague national story.
        </p>
        <p>
          As Cambodia develops more producer, farm, harvest, process, and lot records, the regional term can gain more resolution.
        </p>
      </>
    ),
  },
  {
    label: "05 / Ratanakiri",
    title: "The Wider Northeastern Coffee Map",
    image: "/media/raised-bed-drying-honey-process-mondulkiri.jpg",
    alt: "Coffee processing landscape in northeastern Cambodia",
    caption: "Northeastern Cambodia",
    content: (
      <>
        <p>
          Mondulkiri is OCC’s primary origin focus today, but Cambodia’s coffee geography should not be reduced to one province. <strong>Ratanakiri</strong>, to the north, is another major northeastern highland province with basaltic upland landscapes and a long agricultural association with perennial crops.
        </p>
        <p>
          OCC does not assume that coffee from Ratanakiri should taste like coffee from Mondulkiri, and we do not treat every northeastern farm as one terroir. The purpose of a regional origin architecture is to create enough geographic resolution that differences can eventually become visible.
        </p>
      </>
    ),
  },
  {
    label: "06 / Cambodia-Grown Coffee",
    title: "Agricultural Origin Comes First",
    image: "/media/mondulkiri-terroir-red-earth-elevation.jpg",
    alt: "Red-earth landscape associated with coffee grown in Cambodia",
    caption: "Agricultural origin · Cambodia",
    content: (
      <>
        <p>
          There is an important difference between coffee <strong>grown in Cambodia</strong> and coffee that is only roasted, packed, branded, or served in Cambodia. Only the first describes agricultural origin.
        </p>
        <ol className="cr-definition-list">
          <li><span>01</span> Coffee grown in Cambodia — agricultural origin</li>
          <li><span>02</span> Coffee roasted in Cambodia — production location</li>
          <li><span>03</span> Coffee packed in Cambodia — packaging location</li>
          <li><span>04</span> Cambodian-style coffee — preparation or cultural style</li>
        </ol>
        <p>
          Whether the coffee is Robusta or Arabica, the coffee itself begins in Cambodia. That distinction gives every later layer — region, farm, lot, quality evaluation, and commercial supply — a clearer starting point.
        </p>
      </>
    ),
  },
  {
    label: "07 / Origin Architecture",
    title: "One Geography, More Resolution Over Time",
    image: "/media/raised-bed-drying-honey-process-mondulkiri.jpg",
    alt: "Cambodian coffee production forming part of the origin record",
    caption: "Origin resolution · Cambodia",
    content: (
      <>
        <p>
          Cambodia is the country. Mondulkiri or another verified location is the regional layer. Farm &amp; Terroir explains the growing environment. Single Origin explains how a particular coffee remains identifiable through producer, process, and lot records. Fine Robusta Cambodia explains OCC’s quality specialization.
        </p>
        <div className="cr-resolution">
          <span>Origin resolution</span>
          <p>Cambodia → Northeast → Mondulkiri → Farm → Harvest → Process → Lot</p>
        </div>
        <p>
          This page owns the first half of that chain: <strong>country and regional geography</strong>. It deliberately stops before farm management and lot traceability become the main subject.
        </p>
      </>
    ),
  },
]

export default function CambodiaRegionsPage() {
  return (
    <div className="cambodia-regions-editorial">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="cr-page">
        <section className="cr-hero" aria-labelledby="page-title">
          <MotionReveal className="cr-hero-copy">
            <span className="cr-eyebrow">Where / Geography</span>
            <h1 id="page-title">Cambodia &amp; Regions</h1>
            <p className="cr-lead">Where Cambodian coffee begins — before the conversation moves to farm, lot, or quality category.</p>
            <p className="cr-description">
              Cambodia coffee origins, northeastern highlands, Mondulkiri coffee, Ratanakiri, and the regional geography behind Cambodia-grown coffee.
            </p>
            <Link href="/origins/farm-terroir" className="cr-pill-link">
              Explore Farm &amp; Terroir <ArrowUpRight aria-hidden="true" />
            </Link>
          </MotionReveal>

          <MotionReveal direction="right" className="cr-hero-visual">
            <img src="/media/mondulkiri-terroir-red-earth-elevation.jpg" alt="Red-earth highland coffee landscape in Mondulkiri, Cambodia" width={1600} height={1800} fetchPriority="high" />
            <span className="cr-image-caption">Mondulkiri · Cambodia</span>
          </MotionReveal>
        </section>

        <section className="cr-intro" id="region" aria-labelledby="intro-heading">
          <div className="cr-intro-media">
            <MotionReveal direction="left" className="cr-media-card cr-media-card--tall">
              <img src="/media/raised-bed-drying-honey-process-mondulkiri.jpg" alt="Cambodian coffee drying on raised beds in Mondulkiri" width={1600} height={2000} loading="lazy" />
              <span className="cr-image-caption">Coffee production · Mondulkiri</span>
            </MotionReveal>
            <MotionReveal direction="left" className="cr-media-card cr-media-card--short">
              <img src="/media/raised-bed-drying-honey-process-mondulkiri.jpg" alt="Cambodian coffee drying on raised beds in Mondulkiri" width={1600} height={1200} loading="lazy" />
              <span className="cr-image-caption">Drying · Mondulkiri</span>
            </MotionReveal>
          </div>

          <MotionReveal direction="right" className="cr-intro-copy">
            <span className="cr-eyebrow">The starting point</span>
            <h2 id="intro-heading">A Coffee Origin Shaped by Land, Climate, and Care.</h2>
            <p>
              Coffee is grown in Cambodia, with the strongest contemporary geographic association in the northeast, particularly Mondulkiri. Ratanakiri and other upland agricultural areas also belong in the wider map, but the public evidence is not equally developed across every location.
            </p>
            <p>
              Geography tells us where coffee comes from. Individual farms and identifiable lots help us understand the coffee itself, which is why this page stays focused on country and regional origin.
            </p>
            <Link href="/fine-robusta-cambodia" className="cr-text-link">Read the Fine Robusta context <ArrowUpRight aria-hidden="true" /></Link>
          </MotionReveal>
        </section>

        <section className="cr-statement" aria-labelledby="statement-heading">
          <MotionReveal>
            <span className="cr-eyebrow">Why this region matters</span>
            <h2 id="statement-heading">Country first. Region next. Evidence at every layer.</h2>
            <p>
              Mondulkiri is more than a landscape label. Its documented Robusta farms, highland geography, and growers’ work establish a real Cambodian coffee origin without turning one research site into a universal claim about every farm or harvest.
            </p>
          </MotionReveal>
        </section>

        <section className="cr-highlights" aria-labelledby="highlights-heading">
          <div className="cr-section-heading">
            <span className="cr-eyebrow">Origin map</span>
            <h2 id="highlights-heading">Cambodia Coffee Geography</h2>
            <p>This page owns geographic search intent: country, highlands, regions, Mondulkiri, Ratanakiri, and where coffee is grown in Cambodia.</p>
          </div>
          <div className="cr-highlight-grid">
            {highlights.map((highlight, index) => (
              <MotionReveal key={highlight.title} direction={index % 2 === 0 ? "left" : "right"} className="cr-highlight-card">
                <span className="cr-card-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="cr-card-meta">{highlight.meta}</span>
                <h3>{highlight.title}</h3>
                <p>{highlight.text}</p>
              </MotionReveal>
            ))}
          </div>
        </section>

        <section className="cr-features" aria-label="Cambodia coffee origin features">
          {featureSections.map((section, index) => (
            <MotionReveal key={section.title} className={`cr-feature ${index % 2 === 1 ? "cr-feature--reverse" : ""}`}>
              <div className="cr-feature-media">
                <img src={section.image} alt={section.alt} width={1600} height={2000} loading="lazy" />
                <span className="cr-image-caption">{section.caption}</span>
              </div>
              <div className="cr-feature-copy">
                <span className="cr-eyebrow">{section.label}</span>
                <h2>{section.title}</h2>
                <div className="cr-prose">{section.content}</div>
              </div>
            </MotionReveal>
          ))}
        </section>

        <div className="cr-metabar">
          <span>Origin Coffee Cambodia · OCC</span>
          <span>Cambodia · Origin · Evidence</span>
          <span>Origins / 01</span>
        </div>
      </div>
    </div>
  )
}
