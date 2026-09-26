import type { ReactNode } from "react"
import "./occ-commercial-html-layout.css"

type Photo = { src: string; alt: string }
type Props = {
  className?: string
  title: string
  eyebrow: string
  lead: string
  description: string
  heroImage: Photo
  heroCtaLabel: string
  heroCtaHref: string
  splitId: string
  processImages: [Photo, Photo]
  splitTitle: string
  splitDescription: ReactNode
  splitCtaLabel: string
  splitCtaHref: string
  featureId: string
  featureEyebrow: string
  featureTitle: string
  featureDescription: ReactNode
  featureImage: Photo
  ctaId?: string
  ctaEyebrow: string
  ctaTitle: string
  ctaLabel: string
  ctaHref: string
  children?: ReactNode
}

/** User-supplied OCC HTML skeleton. SiteShell owns the only navbar and footer. */
export function OccCommercialHtmlLayout({
  className = "", title, eyebrow, lead, description, heroImage,
  heroCtaLabel, heroCtaHref, splitId, processImages, splitTitle, splitDescription, splitCtaLabel, splitCtaHref,
  featureId, featureEyebrow, featureTitle, featureDescription, featureImage,
  ctaId = "contact", ctaEyebrow, ctaTitle, ctaLabel, ctaHref, children,
}: Props) {
  return (
    <div className={`occ-commercial-html ${className}`}>
      <div className="page">
        <section className="hero" id="overview">
          <div className="hero-copy">
            <span className="eyebrow">{eyebrow}</span>
            <h1>{title}</h1>
            <p className="lead">{lead}</p>
            <p className="desc">{description}</p>
            <a className="pill-btn" href={heroCtaHref}>{heroCtaLabel} <span aria-hidden="true">↗</span></a>
          </div>
          <div className="hero-visual">
            <img src={heroImage.src} alt={heroImage.alt} />
          </div>
        </section>
        <section className="split-section" id={splitId}>
          <div className="media-grid">
            <div className="media-card"><img src={processImages[0].src} alt={processImages[0].alt} /></div>
            <div className="media-card"><img src={processImages[1].src} alt={processImages[1].alt} /></div>
          </div>
          <div className="info-panel">
            <h2>{splitTitle}</h2>
            <p className="section-copy">{splitDescription}</p>
            <a className="text-link" href={splitCtaHref}>{splitCtaLabel} <span aria-hidden="true">↓</span></a>
          </div>
        </section>
        <div className="divider" />
        <section className="feature-band" id={featureId}>
          <div className="feature-copy">
            <span className="eyebrow">{featureEyebrow}</span>
            <h3>{featureTitle}</h3>
            <p>{featureDescription}</p>
          </div>
          <div className="feature-image">
            <img src={featureImage.src} alt={featureImage.alt} />
          </div>
        </section>
        {children ? <div className="extended-sections">{children}</div> : null}
        <section className="b2b-cta" id={ctaId} aria-labelledby={`${ctaId}-title`}>
          <div>
            <span className="eyebrow">{ctaEyebrow}</span>
            <h3 id={`${ctaId}-title`}>{ctaTitle}</h3>
          </div>
          <a className="cta-btn" href={ctaHref}>{ctaLabel} <span aria-hidden="true">↗</span></a>
        </section>
      </div>
    </div>
  )
}
