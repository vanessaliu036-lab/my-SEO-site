import "./about-mission-template.css"

type InstitutionalSection = { title: string; paragraphs: string[] }
type FaqItem = { q: string; a: string }
type FeatureItem = { label: string; title: string; body: string }
type AboutInstitutionalTemplateProps = {
  index: string
  title: string
  subtitle: string
  lead: string[]
  sections: InstitutionalSection[]
  closing?: string[]
  faqs?: FaqItem[]
  featureGrid?: FeatureItem[]
  practiceLabel?: string
  practiceTitle?: string
  heroImage: { src: string; alt: string }
  chapterImage: string
  next?: { href: string; label: string; description: string; note?: string }
}

export function AboutInstitutionalTemplate({
  index,
  title,
  subtitle,
  lead,
  sections,
  closing = [],
  faqs = [],
  featureGrid = [],
  practiceLabel = "Our approach",
  practiceTitle = "The work, put into practice.",
  heroImage,
  chapterImage,
}: AboutInstitutionalTemplateProps) {

  return (
    <main className="occ-about-mission-template">
      <section className="about-hero">
        <div className="about-shell about-hero-grid">
          <div className="about-hero-copy">
            <p className="about-eyebrow">About / {index} · {title}</p>
            <h1>{lead[0]}</h1>
            <p className="about-hero-support">{lead[1] ?? subtitle}</p>
          </div>
          <figure className="about-hero-media">
            <img src={heroImage.src} alt={heroImage.alt} />
            <figcaption className="about-image-marker">Origin · Quality · Professional coffee</figcaption>
          </figure>
        </div>
      </section>

      {featureGrid.length ? (
        <section className="about-approach">
          <div className="about-shell">
            <div className="about-approach-heading">
              <div>
                <p className="about-eyebrow">{practiceLabel}</p>
                <h2>{practiceTitle}</h2>
              </div>
              <p className="about-approach-note">A consistent standard across origin, quality, and professional coffee decisions.</p>
            </div>
            <div className="about-features">
              {featureGrid.map((item) => (
                <article className="about-feature" key={item.title}>
                  <p className="about-eyebrow">{item.label}</p>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="about-story">
        <div className="about-shell">
          <header className="about-story-heading">
            <h2>{practiceTitle}</h2>
            <p className="about-eyebrow">The full story</p>
          </header>
          <div>
            {sections.map((section, sectionIndex) => (
              <article className="about-chapter" key={section.title}>
                <figure className="about-chapter-visual">
                  <img src={chapterImage} alt="" loading="lazy" />
                  <figcaption>Origin · Quality · Professional coffee</figcaption>
                </figure>
                <div className="about-chapter-copy">
                  <div className="about-chapter-kicker">
                    <span className="about-chapter-number">{String(sectionIndex + 1).padStart(2, "0")}</span>
                    <span className="about-eyebrow">Chapter / OCC</span>
                  </div>
                  <h3>{section.title}</h3>
                  <div>
                    {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {closing.length ? (
        <section className="about-conclusion">
          <div className="about-shell about-conclusion-grid">
            <p className="about-eyebrow">What we are building</p>
            <div>
              <h2>{closing[0]}</h2>
              {closing.slice(1).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </section>
      ) : null}

      {faqs.length ? (
        <section className="about-shell about-faq">
          <div className="about-faq-grid">
            <div>
              <p className="about-eyebrow">Buyer questions</p>
              <h2>Questions,<br />answered.</h2>
            </div>
            <div>
              {faqs.map(({ q, a }, faqIndex) => (
                <details className="about-faq-item" key={q}>
                  <summary>
                    <span className="about-faq-number">{String(faqIndex + 1).padStart(2, "0")}</span>
                    <span>{q}</span>
                    <span aria-hidden="true">＋</span>
                  </summary>
                  <p className="about-faq-answer">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <footer className="about-shell about-page-meta">
        <span>Origin Coffee Cambodia · OCC</span>
        <span>About / {index} · Cambodia · Fine Robusta · B2B Coffee</span>
      </footer>
    </main>
  )
}
