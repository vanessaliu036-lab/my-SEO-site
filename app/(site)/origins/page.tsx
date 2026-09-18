import type { Metadata } from "next"
import Link from "next/link"
import { pageAlternates } from "@/lib/seo"
import { siteUrl } from "@/lib/siteConfig"
import "./origins-v2.css"

export const metadata: Metadata = {
  title: "Coffee Origins | Cambodia Fine Robusta | OCC",
  description: "Explore where Origin Coffee Cambodia begins: Cambodian coffee, Mondulkiri, Fine Robusta, and the people and processes behind every lot.",
  alternates: pageAlternates("/origins"),
  openGraph: {
    title: "Coffee Origins | Cambodia Fine Robusta | OCC",
    description: "Explore Cambodian coffee origins, Mondulkiri, Fine Robusta, and the journey from place to cup.",
    url: `${siteUrl}/origins`,
    type: "website",
  },
}

const story = [
  {
    number: "01 · PLACE",
    title: "Cambodia is where the story begins.",
    body: "Country, region, climate, agriculture and growing conditions give a coffee its first context. Explore Cambodia and Mondulkiri to understand the places behind OCC coffee.",
    img: "/about/about-origin.svg",
    alt: "Ripe coffee cherries on a Cambodian coffee plant",
    cta: { text: "Explore Cambodia & Regions", href: "/origins/cambodia-regions" },
  },
  {
    number: "02 · PEOPLE & PROCESS",
    title: "Origin is built by decisions.",
    body: "Farmers, processors, evaluators and roasters shape what happens after harvest. The work of selecting, handling, drying and evaluating a lot turns place into coffee that can be understood and used.",
    img: "/images/roasting/roaster-evaluation.png",
    alt: "Coffee being evaluated during roasting and quality work",
    cta: null,
  },
  {
    number: "03 · THE CUP",
    title: "Fine Robusta deserves a closer look.",
    body: "Quality is not guaranteed by a place name alone. Fine Robusta is understood through lot-specific evaluation, clean cup quality, processing records and the way the coffee performs after roasting.",
    img: "/images/roasting/coffee-beans-reference.png",
    alt: "Coffee being brewed and poured into a cup",
    cta: { text: "Explore Fine Robusta Cambodia", href: "/fine-robusta-cambodia" },
  },
]

const originFramework = [
  { title: "Place", description: "Country, region and growing context" },
  { title: "People", description: "The work behind each lot" },
  { title: "Process", description: "From cherry to green coffee" },
  { title: "Cup", description: "Lot-specific quality evaluation" },
]

export default function OriginsPage() {
  return (
    <div className="occ-origins-v2">
      <section className="originHero" aria-labelledby="origin-title">
        <img src="/hero-home.webp" alt="Cambodian highland landscape and coffee origin" className="originHeroImage" />
        <div className="originWrap originHeroCopy">
          <div className="originEyebrow originEyebrowLight">ORIGINS · CAMBODIA</div>
          <h1 id="origin-title">Coffee with<br />a place behind it.</h1>
          <p>Origin Coffee Cambodia begins with coffee grown in Cambodia, with particular attention to Mondulkiri and the potential of Fine Robusta.</p>
        </div>
      </section>

      <section className="originSection" aria-labelledby="origin-why-title">
        <div className="originWrap">
          <div className="originIntro">
            <div>
              <div className="originEyebrow">WHY ORIGIN MATTERS</div>
              <h2 id="origin-why-title">Trust begins with place.</h2>
            </div>
            <p>OCC focuses on Cambodian coffee and documents the path from place to cup. This page is an introduction to that work — a starting point for exploring Cambodia &amp; Regions, Fine Robusta, and the practical decisions behind each coffee lot.</p>
          </div>
          {story.map((item, index) => (
            <article className={`originChapter ${index === 1 ? "originChapterReverse" : ""}`} key={item.number}>
              <div className="originChapterVisual"><img src={item.img} alt={item.alt} loading="lazy" /></div>
              <div className="originChapterStory">
                <div className="originTag">{item.number}</div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                {item.cta && <p><Link href={item.cta.href} className="originTextLink">{item.cta.text} →</Link></p>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="originTrust" aria-labelledby="origin-framework-title">
        <div className="originWrap originTrustGrid">
          <div>
            <div className="originEyebrow originEyebrowTrust">THE ORIGIN FRAMEWORK</div>
            <h2 id="origin-framework-title">Four ways to understand origin.</h2>
            <p>Origin is more than a landscape image. OCC looks at the place, the people, the process and the cup — then keeps the claims specific to the evidence available for each lot.</p>
            <div className="originTrustList">
              {originFramework.map((item) => <div className="originTrustItem" key={item.title}><strong>{item.title}</strong>{item.description}</div>)}
            </div>
          </div>
          <div className="originTrustVisual"><img src="/about/about-fine-robusta.svg" alt="Fine Robusta coffee visual" loading="lazy" /></div>
        </div>
      </section>

      <section className="originFinal" aria-labelledby="origin-final-title">
        <div className="originWrap originFinalBox">
          <div className="originFinalCopy">
            <div className="originEyebrow">FROM ORIGIN TO CUP</div>
            <h2 id="origin-final-title">Follow the path.</h2>
            <p>From region to farm, harvest to processing, evaluation to roasting — every step adds context to the final cup.</p>
            <div className="originPath" aria-label="Region to cup journey">Region <span>→</span> Farm <span>→</span> Harvest <span>→</span> Processing <span>→</span> Evaluation <span>→</span> Roasting <span>→</span> Cup</div>
            <div className="originButtons">
              <Link href="/origins/single-origin" className="originButton">Explore single-origin coffees</Link>
              <Link href="/solutions/wholesale" className="originButton originButtonDark">Discuss wholesale supply</Link>
            </div>
          </div>
          <div className="originFinalVisual"><img src="/about/about-origin.svg" alt="Cambodian coffee origin visual" loading="lazy" /></div>
        </div>
      </section>
    </div>
  )
}
