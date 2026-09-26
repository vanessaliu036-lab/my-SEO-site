"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import styles from "./about-editorial-template.module.css"

type AboutSection = { title: string; href: string; desc: string }
type AboutEditorialTemplateProps = { sections: AboutSection[] }

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const principles = [
  ["One origin", "Every OCC coffee starts in Cambodia. Origin is the product foundation, not a label added later."],
  ["Small batches", "We prefer smaller, clearer batches over volume that weakens quality or origin identity."],
  ["Origin clarity", "Country, region, producer, process, and lot claims become more specific only when the evidence does."],
  ["Quality focus", "We evaluate processing, physical condition, sensory performance, roast application, and consistency."],
  ["Fine Robusta expertise", "Canephora is evaluated as a quality category, with evidence ahead of old assumptions."],
]

const capabilities = [
  { label: "Origin", note: "Cambodia first. Always.", href: "/origins", image: "/about/about-origin.svg" },
  { label: "Fine Robusta", note: "Our specialist coffee category.", href: "/fine-robusta-cambodia", image: "/about/about-fine-robusta.svg" },
  { label: "Ready to sell", note: "Wholesale and supplier evaluation.", href: "/solutions/wholesale", image: "/about/occ-about-ready-to-sell.webp" },
  { label: "Made for you", note: "Custom roasting and profile development.", href: "/solutions/roasting-program", image: "/about/about-made-for-you.svg" },
]

const pathways = [
  {
    number: "01", title: "Ready-to-Sell", kicker: "Choose our profile",
    copy: "For distributors, importers, retailers, hospitality groups, and coffee businesses looking for a defined Cambodian coffee profile and a clearer route to repeat supply.",
    items: ["Cambodian coffee / Fine Robusta", "Supplier evaluation", "Wholesale coffee supply", "Repeat supply"],
    href: "/solutions/wholesale", cta: "Explore wholesale supply",
  },
  {
    number: "02", title: "Made-for-You", kicker: "Build your profile",
    copy: "For buyers who know the cup, menu, format, or market position they want and need custom roasting to turn that target into repeatable production.",
    items: ["Target cup", "Custom roasting", "Profile development", "Repeatable production"],
    href: "/solutions/roasting-program", cta: "Explore custom roasting",
  },
]

export function AboutEditorialTemplate({ sections }: AboutEditorialTemplateProps) {
  const reducedMotion = useReducedMotion()
  const reveal = (offset = 28) => ({
    initial: reducedMotion ? { opacity: 1 } : { opacity: 0, y: offset },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.16 },
    transition: { duration: reducedMotion ? 0.01 : 0.72, ease },
  })

  return (
    <div className={styles.page} data-about-page>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <motion.div {...reveal(18)} className={styles.heroCopyInner}>
            <p className={styles.eyebrow}>Who we are · Origin Coffee Cambodia</p>
            <h1>One origin.<br /><em>Cambodia.</em></h1>
            <p className={styles.heroLead}>A Cambodia-origin specialty coffee supplier and Fine Robusta specialist.</p>
            <p className={styles.heroBody}>We connect origin, quality, and roasting with the people and businesses bringing Cambodian coffee to new markets.</p>
            <Link href="#why-occ" className={styles.textLink}>Discover OCC <ArrowDown aria-hidden="true" /></Link>
          </motion.div>
          <div className={styles.heroIndex}><span>Est. in Cambodia</span><span>01 / About</span></div>
        </div>
        <div className={styles.heroMedia}>
          <Image src="/about/occ-about-green-hero.webp" alt="Cambodian coffee cherries growing at origin" fill priority sizes="(max-width: 900px) 100vw, 55vw" />
          <div className={styles.heroMediaShade} aria-hidden="true" />
        </div>
      </section>

      <main>
        <section id="why-occ" className={styles.introSection}>
          <div className={styles.sectionFrame}>
            <motion.div {...reveal()} className={styles.introGrid}>
              <div className={styles.introTitle}>
                <p className={styles.sectionLabel}>02 / Why OCC</p>
                <h2>A Cambodian coffee company with one origin to protect.</h2>
              </div>
              <div className={styles.introCopy}>
                <p className={styles.statement}>OCC helps Cambodian coffee travel further while keeping the identity, evidence, and quality decisions that make it worth choosing.</p>
                <p>Cambodia is the origin. Fine Robusta is the specialist expertise. Wholesale supply and custom roasting are the two main ways buyers work with us.</p>
              </div>
            </motion.div>

            <div className={styles.originStory}>
              <motion.div {...reveal(18)} className={styles.originMedia}>
                <Image src="/about/occ-about-intro.webp" alt="Coffee professionals evaluating Cambodian coffee" fill sizes="(max-width: 900px) 100vw, 52vw" />
              </motion.div>
              <motion.div {...reveal(32)} className={styles.principleList}>
                {principles.map(([title, copy], index) => (
                  <div className={styles.principle} key={title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div><h3>{title}</h3><p>{copy}</p></div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <section className={styles.capabilitySection} aria-labelledby="capabilities-title">
          <div className={styles.sectionFrame}>
            <div className={styles.sectionHeading}>
              <p className={styles.sectionLabel}>03 / What defines OCC</p>
              <h2 id="capabilities-title">From origin evidence<br />to market application.</h2>
            </div>
            <div className={styles.capabilityGrid}>
              {capabilities.map((item, index) => (
                <motion.div key={item.label} {...reveal(20 + index * 4)}>
                  <Link href={item.href} className={styles.capability}>
                    <div className={styles.capabilityImage}>
                      <Image src={item.image} alt="" fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 25vw" />
                    </div>
                    <div className={styles.capabilityMeta}>
                      <span>0{index + 1}</span>
                      <div><h3>{item.label}</h3><p>{item.note}</p></div>
                      <ArrowUpRight aria-hidden="true" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.buildSection}>
          <div className={`${styles.sectionFrame} ${styles.buildGrid}`}>
            <motion.div {...reveal()} className={styles.buildTitle}>
              <p className={styles.sectionLabel}>04 / What we are building</p>
              <h2>A recognized Cambodian coffee origin.</h2>
            </motion.div>
            <motion.div {...reveal(22)} className={styles.buildCopy}>
              <p className={styles.statement}>Cambodia is still a young coffee origin in the minds of many international buyers. OCC is building a future where its coffee is recognized on its own terms.</p>
              <div className={styles.buildPoints}>
                {[
                  ["Origin first", "Cambodia remains visible from story to supply."],
                  ["Quality made legible", "Processing, sensory, roast, and evidence are explained in buyer language."],
                  ["Commercially usable", "Profiles work in real cafés, retail programs, hospitality, and distribution."],
                  ["Built for recognition", "Each relationship increases familiarity with Cambodian coffee."],
                ].map(([title, copy], index) => (
                  <div key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className={styles.pathSection} aria-labelledby="path-title">
          <div className={styles.sectionFrame}>
            <div className={styles.pathIntro}>
              <p className={styles.sectionLabel}>05 / Work with OCC</p>
              <h2 id="path-title">Two paths.<br />One clear origin.</h2>
              <p>Choose a Cambodian coffee profile ready to evaluate and sell, or build a roast around the cup and market you need.</p>
            </div>
            <div className={styles.pathList}>
              {pathways.map((path, index) => (
                <motion.article {...reveal(24 + index * 8)} className={styles.path} key={path.title}>
                  <div className={styles.pathNumber}>{path.number}</div>
                  <div className={styles.pathMain}><p className={styles.pathKicker}>{path.kicker}</p><h3>{path.title}</h3><p>{path.copy}</p></div>
                  <ul>{path.items.map((item) => <li key={item}>{item}</li>)}</ul>
                  <Link href={path.href} aria-label={path.cta}><ArrowUpRight aria-hidden="true" /></Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.futureSection}>
          <motion.div {...reveal()} className={`${styles.sectionFrame} ${styles.futureGrid}`}>
            <div><p className={styles.sectionLabel}>06 / Where we are going</p><h2>Cambodian coffee for international markets.</h2></div>
            <div className={styles.futureCopy}>
              <p>We are building long-term relationships with distributors, importers, retailers, and hospitality partners that want a clearer Cambodian coffee proposition.</p>
              <p>The goal is repeat business built on fit: the right coffee, roast, channel, and supply relationship.</p>
              <Link href="/contact" className={styles.lightButton}>Start a conversation <ArrowUpRight aria-hidden="true" /></Link>
            </div>
          </motion.div>
        </section>

        <section className={styles.exploreSection} aria-labelledby="explore-title">
          <div className={styles.sectionFrame}>
            <div className={styles.exploreHeading}><p className={styles.sectionLabel}>07 / Explore OCC</p><h2 id="explore-title">The thinking behind the company.</h2></div>
            <div className={styles.exploreList}>
              {sections.map((section, index) => (
                <motion.div key={section.href} {...reveal(20)}>
                  <Link href={section.href}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div><h3>{section.title}</h3><p>{section.desc}</p></div>
                    <ArrowUpRight aria-hidden="true" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
