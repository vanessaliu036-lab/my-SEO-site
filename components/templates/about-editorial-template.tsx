import Image from "next/image"
import Link from "next/link"
import styles from "./about-editorial-template.module.css"

type AboutSection = { title: string; href: string; desc: string }

type AboutEditorialTemplateProps = { sections: AboutSection[] }

const pillars = [
  { href: "/coffee/single-origin", image: "/about/occ-about-origin.webp", label: "001 /", title: ["One", "origin"], summary: "Every OCC coffee starts in Cambodia →", alt: "Cambodian coffee origin landscape" },
  { href: "/fine-robusta-cambodia", image: "/about/occ-about-fine-robusta.webp", label: "002 /", title: ["Fine", "Robusta"], summary: "Cambodian Fine Robusta expertise →", alt: "Fine Robusta coffee detail" },
  { href: "/solutions", image: "/about/occ-about-solutions.webp", label: "003 /", title: ["Coffee", "solutions"], summary: "Wholesale coffee supply & custom roasting →", alt: "Coffee solutions for professional buyers" },
]

const values = [
  ["01 /", "One origin", "Every OCC coffee starts in Cambodia. Origin is the product foundation, not a label added later."],
  ["02 /", "Small batches", "We prefer smaller, clearer batches over volume that weakens quality or origin identity."],
  ["03 /", "Origin clarity", "Country, region, producer, process, and lot claims become more specific only when the evidence does."],
  ["04 /", "Quality focus", "We evaluate processing, physical condition, sensory performance, roast application, and consistency."],
]

export function AboutEditorialTemplate({ sections }: AboutEditorialTemplateProps) {
  return (
    <div className={styles.page}>
      <main className={styles.site}>
        <section className={styles.hero} aria-labelledby="about-hero-title">
          <Image className={styles.heroLeft} src="/about/occ-about-hero-left.webp" alt="OCC green coffee being loaded into a roasting machine" width={162} height={231} priority />
          <div className={styles.heroInner}>
            <p className={styles.micro}>OCC.</p>
            <h1 id="about-hero-title">One origin.<br />Cambodia.</h1>
            <p className={styles.descriptor}>100% Cambodia origin / Fine Robusta specialist</p>
            <a className={styles.scroll} href="#about-pillars" aria-label="Scroll to OCC specialisms">↓</a>
          </div>
          <Image className={styles.heroRight} src="/about/occ-about-hero-right.webp" alt="OCC coffee being poured into cups" width={158} height={217} priority />
        </section>

        <section className={styles.pillars} id="about-pillars" aria-labelledby="pillars-title">
          <div className={styles.sectionHead}><span className={styles.sectionKicker}>02 /</span><div className={styles.ruleTitle}><h2 id="pillars-title">How would you like to work with OCC?</h2></div></div>
          <div className={styles.cardRow}>
            {pillars.map((pillar) => (
              <Link className={styles.tile} href={pillar.href} key={pillar.href} aria-label={`Explore ${pillar.title.join(" ")}`}>
                <Image className={styles.tileImage} src={pillar.image} alt={pillar.alt} fill sizes="(max-width: 680px) 33vw, 31vw" />
                <span className={styles.tileOverlay} aria-hidden="true" />
                <span className={styles.tileNum}>{pillar.label}</span>
                <h3 className={styles.tileTitle}>{pillar.title.map((line) => <span key={line}>{line}</span>)}</h3>
                <span className={styles.tileBottom}>{pillar.summary}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.intro} id="about-intro" aria-labelledby="intro-title">
          <div className={styles.portraitWrap}>
            <Image src="/about/occ-about-intro.webp" alt="Coffee picker harvesting red cherries in a Cambodian coffee garden" fill sizes="(max-width: 680px) 100vw, 50vw" loading="lazy" />
            <span className={styles.vertical}>ORIGIN COFFEE CAMBODIA</span>
          </div>
          <div className={styles.introCopy}>
            <span className={styles.micro}>03 /</span>
            <h2 id="intro-title">A Cambodian coffee supplier with one origin to protect.</h2>
            <p>OCC is built around one commercial idea: help Cambodian coffee travel further without losing the identity, evidence, and quality decisions that make the coffee worth choosing.</p>
            <p>Cambodia is the origin. Fine Robusta is the specialist expertise. Wholesale coffee supply and custom roasting are the two main ways buyers work with us.</p>
            <a className={styles.outline} href="#about-story">Explore OCC&nbsp; →</a>
          </div>
        </section>

        <section className={styles.story} id="about-story" aria-labelledby="story-title">
          <div><span className={styles.micro}>04 / What we are building</span><h2 id="story-title">A Premium Cambodian Coffee Brand</h2></div>
          <div className={styles.text}><p>Cambodia is still a young coffee origin in the minds of many international buyers. OCC is building toward a future in which Cambodian coffee can be recognized for its own origin identity.</p><p>Cambodian Fine Robusta should be evaluated for quality rather than reduced to old assumptions about Robusta.</p><p>That requires origin clarity, credible quality language, better buyer information, repeatable roasting decisions, and a brand strong enough to carry Cambodia into new commercial conversations.</p></div>
        </section>

        <section className={styles.values} aria-labelledby="values-title">
          <div className={styles.sectionHead}><span className={styles.sectionKicker}>05 /</span></div>
          <h2 id="values-title">One origin. Clear principles.</h2>
          <div className={styles.valueGrid}>{values.map(([number, title, body]) => <div className={styles.value} key={number}><span className={styles.num}>{number}</span><h3>{title}</h3><p>{body}</p></div>)}</div>
        </section>

        <section className={styles.way} id="about-work" aria-labelledby="work-title">
          <div className={styles.wayHead}><span className={styles.micro}>06 / Work With OCC</span><h2 id="work-title">How would you like to work with OCC?</h2><p>Overseas buyer conversations belong to one of two paths: choose a Cambodian coffee profile that is ready to evaluate and sell, or build a roasting profile around the cup, market, and application you need.</p></div>
          <div className={styles.wayGrid}>
            <article className={styles.wayItem}><span className={styles.micro}>01 / Ready-to-Sell</span><h3>Choose our profile.</h3><p>For distributors, importers, retailers, hospitality groups, and coffee businesses looking for a Cambodian coffee supplier with a defined profile and a clearer route to repeat supply.</p><Link href="/solutions" className={styles.more}>Ready-to-Sell ↗</Link></article>
            <article className={styles.wayItem}><span className={styles.micro}>02 / Made-for-You</span><h3>Build yours.</h3><p>For buyers who already know the cup, menu, format, or market position they want and need custom roasting to turn that target into a repeatable production profile.</p><Link href="/solutions/roasting-program" className={styles.more}>Made-for-You ↗</Link></article>
          </div>
        </section>

        <section className={styles.closing} aria-labelledby="closing-title">
          <span className={styles.micro}>07 / Where We Are Going</span><h2 id="closing-title">Cambodian coffee for international markets.</h2>
          <p>OCC is building toward long-term relationships with international distributors, importers, retailers, and hospitality partners that want a clearer Cambodian coffee proposition.</p><p>The goal is repeat business built on fit: the right coffee, the right roast, the right channel, and a supply relationship that can become more precise as origin evidence and commercial requirements become more precise.</p><p>We are building the conditions for buyers to recognize Cambodian coffee, and especially Cambodian Fine Robusta, on its own terms.</p>
        </section>

        <nav className={styles.explore} aria-label="Explore OCC"><span className={styles.micro}>08 / Explore OCC</span><h2>The thinking<br />behind the company.</h2><div className={styles.exploreLinks}>{sections.map((section, index) => <Link href={section.href} key={section.href}><span>{String(index + 1).padStart(2, "0")} /</span>{section.title} ↗</Link>)}</div></nav>
        <footer className={styles.footer}><span>© 2026 Origin Coffee Cambodia</span><span>Cambodia · Fine Robusta · B2B Coffee</span></footer>
      </main>
    </div>
  )
}
