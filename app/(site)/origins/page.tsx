import type { Metadata } from "next"
import Link from "next/link"
import { pageAlternates } from "@/lib/seo"
import { siteUrl } from "@/lib/siteConfig"
import "./origins-v2.css"

export const metadata: Metadata = {
  title: "Cambodian Coffee Origins | Mondulkiri Fine Robusta | OCC",
  description: "Explore the place, people, process and cup behind OCC coffee from Cambodia, with a closer look at Mondulkiri and Fine Robusta.",
  alternates: pageAlternates("/origins"),
  openGraph: {
    title: "Cambodian Coffee Origins | Mondulkiri Fine Robusta | OCC",
    description: "Follow Cambodian coffee from place to cup and continue into Fine Robusta evaluation or wholesale supply.",
    url: `${siteUrl}/origins`,
    type: "website",
  },
}

const story = [
  {
    number: "01 · PLACE",
    title: "Cambodia is the starting point.",
    body: "Coffee becomes easier to understand when the place has a name. OCC begins with Cambodia and looks closely at Mondulkiri, where elevation, red earth, climate and cultivation context give each coffee a first point of reference.",
    img: "/media/mondulkiri-coffee-harvest-worker.webp",
    alt: "Coffee worker harvesting ripe cherries in Mondulkiri, Cambodia",
    cta: { text: "Explore Cambodia & Regions", href: "/origins/cambodia-regions" },
  },
  {
    number: "02 · PEOPLE & PROCESS",
    title: "The cup is shaped after harvest.",
    body: "Farmers, processors, evaluators and roasters make decisions that affect the coffee long after the cherry is picked. Selection, handling, drying and evaluation turn a place into a coffee that buyers can understand and use.",
    img: "/media/raised-bed-drying-honey-process-mondulkiri.jpg",
    alt: "Coffee drying and processing in Mondulkiri",
    cta: null,
  },
  {
    number: "03 · THE CUP",
    title: "Fine Robusta should be evaluated in context.",
    body: "A place name does not guarantee quality. Fine Robusta is understood through the specific coffee, processing information, sensory evaluation and the way the roasted coffee performs in its intended use.",
    img: "/media/cupping-bowls-fine-robusta-grading-cambodia.jpg",
    alt: "Fine Robusta cupping and quality evaluation in Cambodia",
    cta: { text: "Explore Fine Robusta Cambodia", href: "/fine-robusta-cambodia" },
  },
]

const originFramework = [
  { title: "Place", description: "Country, region and growing context" },
  { title: "People", description: "The decisions behind each lot" },
  { title: "Process", description: "What happens from cherry to coffee" },
  { title: "Cup", description: "Quality evaluation for the coffee in question" },
]

export default function OriginsPage() {
  return (
    <div className="occ-origins-v2">
      <section className="originHero" aria-labelledby="origin-title">
        <img src="/media/cambodian-coffee-farmers-mondulkiri-harvest.jpg" alt="Coffee farmers walking through a Cambodian coffee landscape" className="originHeroImage" />
        <div className="originWrap originHeroCopy">
          <div className="originEyebrow originEyebrowLight">ORIGINS · CAMBODIA</div>
          <h1 id="origin-title">Coffee with<br />a place you can follow.</h1>
          <p>OCC starts with 100% Cambodia-origin coffee, with particular attention to Mondulkiri and the potential of Fine Robusta.</p>
        </div>
      </section>

      <section className="originSection" aria-labelledby="origin-why-title">
        <div className="originWrap">
          <div className="originIntro">
            <div>
              <div className="originEyebrow">WHY ORIGIN MATTERS</div>
              <h2 id="origin-why-title">Trust grows when the path is clear.</h2>
            </div>
            <p>Origin is the first question, not the last one. OCC follows the path from place to cup so buyers can see what is known, what still needs confirmation and where the coffee may fit a professional product or menu.</p>
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
            <h2 id="origin-framework-title">Four questions behind a coffee.</h2>
            <p>OCC looks at the place, people, process and cup, then keeps the claim specific to the evidence available for the coffee or lot being discussed.</p>
            <div className="originTrustList">
              {originFramework.map((item) => <div className="originTrustItem" key={item.title}><strong>{item.title}</strong>{item.description}</div>)}
            </div>
          </div>
          <div className="originTrustVisual"><img src="/media/cambodian-coffee-origin-field-notes.jpg" alt="Cambodian coffee origin field notes and lot documentation" loading="lazy" /></div>
        </div>
      </section>

      <section className="originFinal" aria-labelledby="origin-final-title">
        <div className="originWrap originFinalBox">
          <div className="originFinalCopy">
            <div className="originEyebrow">FROM ORIGIN TO BUSINESS</div>
            <h2 id="origin-final-title">Follow the coffee into its next use.</h2>
            <p>If you are evaluating Cambodian coffee for a menu, retail product or wholesale program, move from origin research into the evidence and commercial questions that shape the decision.</p>
            <div className="originPath" aria-label="Region to cup journey">Region <span>→</span> Farm <span>→</span> Harvest <span>→</span> Processing <span>→</span> Evaluation <span>→</span> Roasting <span>→</span> Cup</div>
            <div className="originButtons">
              <Link href="/fine-robusta-cambodia" className="originButton">Explore Fine Robusta</Link>
              <Link href="/solutions/wholesale" className="originButton originButtonDark">Discuss Wholesale Supply</Link>
            </div>
          </div>
          <div className="originFinalVisual"><img src="/media/coffee-dispatch-sealed-bags-phnom-penh.jpg" alt="Prepared Cambodian coffee moving from origin toward buyers" /></div>
        </div>
      </section>
    </div>
  )
}
