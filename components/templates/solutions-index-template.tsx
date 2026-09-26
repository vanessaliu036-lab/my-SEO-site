import Link from "next/link"
import styles from "./solutions-index-template.module.css"

type SolutionItem = {
  href: string
  tag: string
  title: string
  desc: string
}

type SolutionsIndexTemplateProps = {
  services: readonly SolutionItem[]
}

export function SolutionsIndexTemplate({ services }: SolutionsIndexTemplateProps) {
  const wholesale = services[0]
  const roasting = services[1]
  const marketing = services[2]

  return (
    <div className={styles.page}>
      <section className={styles.hero} id="solutions">
        <div className={styles.eyebrow}>Coffee Solutions</div>
        <h1>From Origin to <em>Opportunity.</em></h1>
        <p>
          OCC delivers origin-led coffee solutions from Cambodia — combining Fine Robusta expertise,
          roasting alignment, and commercial direction to help your coffee business grow with purpose.
        </p>
        <div className={styles.sub}>Cambodian Coffee for a Brighter Tomorrow</div>
      </section>

      <section className={styles.dual} aria-label="Primary OCC solutions">
        <article className={styles.feature}>
          <img src="/images/solutions/occ-solutions-wholesale-guide.webp" alt="Roasted coffee prepared for OCC wholesale evaluation" />
          <div className={styles.featureContent}>
            <div className={styles.tag}>{wholesale.tag}</div>
            <h2>Origin-led<br />Supply.</h2>
            <p>{wholesale.desc}</p>
            <Link href={wholesale.href} className={styles.whiteBtn}>Explore Our Supply <span>→</span></Link>
          </div>
        </article>

        <article className={styles.feature}>
          <img src="/images/solutions/occ-solutions-custom-roasting-profile.webp" alt="Custom roast profile development with roast-color samples" />
          <div className={styles.featureContent}>
            <div className={styles.tag}>{roasting.tag}</div>
            <h2>Roasting-aligned<br />Support.</h2>
            <p>{roasting.desc}</p>
            <Link href={roasting.href} className={styles.whiteBtn}>Discover Our Support <span>→</span></Link>
          </div>
        </article>
      </section>

      <section className={styles.guide}>
        <div className={styles.bookWrap} aria-label="Wholesale coffee guide mockup">
          <div className={`${styles.book} ${styles.bookAlt}`} aria-hidden="true">
            <div className={styles.miniBrand}>OCC</div>
            <h3>Cambodian<br />Coffee</h3>
            <p>Origin · Quality · Supply</p>
          </div>
          <div className={styles.book}>
            <div className={styles.miniBrand}>OCC</div>
            <h3>The Wholesale<br />Coffee Guide</h3>
            <p>Sourcing Cambodian Coffee for a Brighter Tomorrow</p>
          </div>
        </div>

        <div className={styles.guideCopy}>
          <div className={styles.eyebrow}>Free Resource</div>
          <h2>The Wholesale Coffee Guide</h2>
          <div className={styles.subtitle}>A Strategic Sourcing Guide for Buyers</div>
          <p>
            Get practical insights on Cambodian coffee, quality, logistics, and how to build a sustainable,
            successful coffee program with OCC.
          </p>
          <div className={styles.leadForm} aria-label="Wholesale guide request">
            <span>Your name</span>
            <span>Your email address</span>
            <Link href="/contact" className={styles.cta}>Get the guide →</Link>
          </div>
        </div>
      </section>

      <section className={styles.approach} aria-label="Coffee marketing solution">
        <div className={styles.approachPhoto}>
          <img src="/images/solutions/occ-solutions-signature-drink-development.webp" alt="Barista developing three signature coffee drinks for a café menu" />
        </div>
        <div className={styles.approachCopy}>
          <div className={styles.eyebrow}>{marketing.tag}</div>
          <h2>Turn a menu into a product customers remember.</h2>
          <p>{marketing.desc}</p>
          <Link href={marketing.href} className={styles.textLink}>Explore Coffee Marketing <span>→</span></Link>
        </div>
      </section>

      <section className={styles.approach} id="about">
        <div className={styles.approachPhoto}>
          <img src="/images/solutions/occ-solutions-origin-lot-traceability.webp" alt="Cambodian coffee cherry lots separated and documented at origin" />
        </div>
        <div className={styles.approachCopy}>
          <div className={styles.eyebrow}>Our Approach</div>
          <h2>Fine Robusta expertise,<br />origin-led thinking, and<br />commercial clarity.</h2>
          <p>
            We connect global buyers with the unique potential of Cambodian coffee — combining deep origin
            knowledge with practical support, from quality development to long-term partnership.
          </p>
          <Link href="/about" className={styles.textLink}>Our story <span>→</span></Link>
        </div>
      </section>

      <section className={styles.pillars} aria-label="Why OCC">
        <div className={styles.pillar}><div className={styles.icon}>⌁</div><h3>Origin-led</h3><small>Cambodia at Heart</small></div>
        <div className={styles.pillar}><div className={styles.icon}>◐</div><h3>Fine Robusta</h3><small>Quality &amp; Character</small></div>
        <div className={styles.pillar}><div className={styles.icon}>☕</div><h3>Roasting-aligned</h3><small>From Farm to Cup</small></div>
        <div className={styles.pillar}><div className={styles.icon}>▥</div><h3>Commercial Direction</h3><small>Built for Growth</small></div>
        <div className={styles.pillar}><div className={styles.icon}>♙</div><h3>Sample-ready</h3><small>Let&apos;s Explore Together</small></div>
      </section>

    </div>
  )
}
