"use client"

import { motion, useReducedMotion } from "framer-motion"
import Link from "next/link"
import "./about-mission-template.css"

type InstitutionalSection = { title: string; paragraphs: string[] }
type FaqItem = { q: string; a: string }
type FeatureItem = { label: string; title: string; body: string }
type EditorialImage = { src: string; alt: string; caption: string; width: number; height: number }
type AboutInstitutionalTemplateProps = {
  index: string
  title: string
  subtitle: string
  heroImage: { src: string; alt: string; width: number; height: number }
  heroCaption: string
  chapterImages: EditorialImage[]
  lead: string[]
  sections: InstitutionalSection[]
  closing?: string[]
  faqs?: FaqItem[]
  featureGrid?: FeatureItem[]
  practiceLabel?: string
  practiceTitle?: string
  storyTitle?: string
  next?: { href: string; label: string; description: string; note?: string }
}

const premiumEase = [0.22, 1, 0.36, 1] as [number, number, number, number]

export function AboutInstitutionalTemplate({
  index,
  title,
  subtitle,
  heroImage,
  heroCaption,
  chapterImages,
  lead,
  sections,
  closing = [],
  faqs = [],
  featureGrid = [],
  practiceLabel = "Our approach",
  practiceTitle = "The work, put into practice.",
  storyTitle = "The work behind the standard.",
  next,
}: AboutInstitutionalTemplateProps) {
  const reducedMotion = useReducedMotion()
  const reveal = (distance = 24, delay = 0) => ({
    initial: reducedMotion ? { opacity: 1 } : { opacity: 0, y: distance },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.16 },
    transition: { duration: reducedMotion ? 0.01 : 0.58, delay: reducedMotion ? 0 : delay, ease: premiumEase },
  })

  return (
    <main className="occ-about-mission-template" data-occ-motion="off">
      <section className="about-hero">
        <div className="about-shell about-hero-grid">
          <motion.div
            className="about-hero-copy"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0.01 : 0.62, ease: premiumEase }}
          >
            <p className="about-eyebrow">About / {index} · {title}</p>
            <h1>{lead[0]}</h1>
            <p className="about-hero-support">{lead[1] ?? subtitle}</p>
          </motion.div>
          <motion.figure
            className="about-hero-media"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reducedMotion ? 0.01 : 0.72, delay: reducedMotion ? 0 : 0.08, ease: premiumEase }}
          >
            <img src={heroImage.src} alt={heroImage.alt} width={heroImage.width} height={heroImage.height} />
            <figcaption className="about-image-marker">{heroCaption}</figcaption>
          </motion.figure>
        </div>
      </section>

      {featureGrid.length ? (
        <section className="about-approach">
          <div className="about-shell">
            <motion.div {...reveal(18)} className="about-approach-heading">
              <div>
                <p className="about-eyebrow">{practiceLabel}</p>
                <h2>{practiceTitle}</h2>
              </div>
              <p className="about-approach-note">A consistent standard across origin, quality, and professional coffee decisions.</p>
            </motion.div>
            <div className="about-features">
              {featureGrid.map((item, featureIndex) => (
                <motion.article {...reveal(18, featureIndex * 0.06)} className="about-feature" key={item.title}>
                  <p className="about-eyebrow">{item.label}</p>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="about-story">
        <div className="about-shell">
          <motion.header {...reveal(18)} className="about-story-heading">
            <h2>{storyTitle}</h2>
            <p className="about-eyebrow">The full story</p>
          </motion.header>
          <div>
            {sections.map((section, sectionIndex) => (
              <motion.article {...reveal(28)} className="about-chapter" key={section.title}>
                <motion.figure {...reveal(18, 0.06)} className="about-chapter-visual">
                  <img src={chapterImages[sectionIndex].src} alt={chapterImages[sectionIndex].alt} width={chapterImages[sectionIndex].width} height={chapterImages[sectionIndex].height} loading="lazy" />
                  <figcaption>{chapterImages[sectionIndex].caption}</figcaption>
                </motion.figure>
                <motion.div {...reveal(18, 0.1)} className="about-chapter-copy">
                  <div className="about-chapter-kicker">
                    <span className="about-chapter-number">{String(sectionIndex + 1).padStart(2, "0")}</span>
                    <span className="about-eyebrow">Chapter / OCC</span>
                  </div>
                  <h3>{section.title}</h3>
                  <div>
                    {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                </motion.div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {closing.length ? (
        <section className="about-conclusion">
          <motion.div {...reveal()} className="about-shell about-conclusion-grid">
            <p className="about-eyebrow">What we are building</p>
            <div>
              <h2>{closing[0]}</h2>
              {closing.slice(1).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </motion.div>
        </section>
      ) : null}

      {faqs.length ? (
        <section className="about-shell about-faq">
          <motion.div {...reveal()} className="about-faq-grid">
            <div>
              <p className="about-eyebrow">Buyer questions</p>
              <h2>Questions,<br />answered.</h2>
            </div>
            <div>
              {faqs.map(({ q, a }, faqIndex) => (
                <motion.details {...reveal(12, faqIndex * 0.05)} className="about-faq-item" key={q}>
                  <summary>
                    <span className="about-faq-number">{String(faqIndex + 1).padStart(2, "0")}</span>
                    <span>{q}</span>
                    <span aria-hidden="true">＋</span>
                  </summary>
                  <p className="about-faq-answer">{a}</p>
                </motion.details>
              ))}
            </div>
          </motion.div>
        </section>
      ) : null}

      {next ? (
        <section className="about-shell about-next" aria-label="Continue exploring OCC">
          <motion.div {...reveal(18)}>
            <p className="about-eyebrow">Continue exploring</p>
            <Link href={next.href}>
              <span>
                <strong>{next.label}</strong>
                <small>{next.description}</small>
              </span>
              <span aria-hidden="true">↗</span>
            </Link>
            {next.note ? <p>{next.note}</p> : null}
          </motion.div>
        </section>
      ) : null}

      <footer className="about-shell about-page-meta">
        <span>Origin Coffee Cambodia · OCC</span>
        <span>About / {index} · Cambodia · Fine Robusta · B2B Coffee</span>
      </footer>
    </main>
  )
}
