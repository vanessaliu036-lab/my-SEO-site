import Link from "next/link"
import { V9Reveal } from "@/components/site/v9-reveal"

export type OriginEditorialSection = {
  eyebrow?: string
  title: string
  paragraphs?: readonly string[]
  bullets?: readonly string[]
  items?: readonly { title: string; body: string }[]
  statement?: string
}

type OriginEditorialTemplateProps = {
  index: string
  eyebrow: string
  title: string
  subtitle: string
  intro: readonly string[]
  sections: readonly OriginEditorialSection[]
  cta?: { label: string; href: string }
  sectionName?: string
}

const sectionMedia = [
  {
    src: "/media/mondulkiri-terroir-red-earth-elevation.jpg",
    alt: "Fine Robusta trees growing in the red laterite soil of Cambodia's Mondulkiri highlands",
    caption: "Mondulkiri · origin context",
  },
  {
    src: "/media/cambodian-coffee-farmers-mondulkiri-harvest.jpg",
    alt: "Cambodian coffee farmers carrying harvest baskets through a Mondulkiri coffee plot",
    caption: "Harvest · Mondulkiri",
  },
  {
    src: "/media/raised-bed-drying-honey-process-mondulkiri.jpg",
    alt: "Cambodian coffee drying on raised beds in Mondulkiri",
    caption: "Drying · Mondulkiri",
  },
  {
    src: "/media/cupping-bowls-fine-robusta-grading-cambodia.jpg",
    alt: "Cupping bowls prepared for Fine Robusta grading in Cambodia",
    caption: "Sensory protocol · Cambodia",
  },
]

export function OriginEditorialTemplate({
  index,
  eyebrow,
  title,
  subtitle,
  intro,
  sections,
  cta,
  sectionName = "Origins",
}: OriginEditorialTemplateProps) {
  return (
    <div className="occ-v9-page">
      <V9Reveal />

      <header className="phead">
        <div className="phead__bg">
          <img
            src="/media/cambodian-coffee-origin-field-notes.jpg"
            alt="Field notes documenting Cambodian coffee origin conditions and growing context"
            width={2400}
            height={1350}
            fetchPriority="high"
          />
        </div>
        <div className="wrap">
          <div className="phead__crumb">
            <span>
              {sectionName} / {index}
            </span>
          </div>
          <span className="lbl lbl--onDark">{eyebrow}</span>
          <h1 className="phead__t">{title}</h1>
          <p className="phead__s">{subtitle}</p>
          <div className="occ-metabar occ-metabar--onDark">
            <span>Origin Coffee Cambodia</span>
            <span>Cambodia · Origin · Evidence</span>
            <span>
              {index} / {String(sections.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </header>

      <main>
        <section className="sec">
          <div className="wrap">
            <div className="head" data-rv>
              <span className="lbl lbl--brass">The starting point</span>
              {intro.map((paragraph, paragraphIndex) => (
                <p key={paragraph} className={paragraphIndex === 0 ? "lede lede--kh" : "lede"}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        {sections.map((section, sectionIndex) => {
          const media = sectionMedia[sectionIndex % sectionMedia.length]
          const tinted = sectionIndex % 2 === 0
          return (
            <section key={section.title} className={tinted ? "sec sec--tint" : "sec"}>
              <div className="wrap">
                <div className={tinted ? "feature feature--flip" : "feature"}>
                  <div className="feature__media">
                    <img
                      src={media.src}
                      alt={media.alt}
                      width={1600}
                      height={2000}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="feature__cap">{media.caption}</span>
                  </div>
                  <div className="feature__body">
                    <span className="lbl lbl--brass">
                      {String(sectionIndex + 1).padStart(2, "0")} / {section.eyebrow ?? sectionName}
                    </span>
                    <h2 style={{ marginTop: "1.2rem" }}>{section.title}</h2>

                    {section.paragraphs?.length
                      ? section.paragraphs.map((paragraph) => (
                          <p key={paragraph} className="lede">
                            {paragraph}
                          </p>
                        ))
                      : null}

                    {section.bullets?.length ? (
                      <ol className="terms" style={{ marginTop: "2rem" }}>
                        {section.bullets.map((bullet, bulletIndex) => (
                          <li key={bullet} data-rv>
                            <b>{String(bulletIndex + 1).padStart(2, "0")}</b>
                            <p>{bullet}</p>
                          </li>
                        ))}
                      </ol>
                    ) : null}

                    {section.items?.length ? (
                      <div className="listing" style={{ marginTop: "2rem" }}>
                        {section.items.map((item, itemIndex) => (
                          <div key={item.title} className="listing__row" data-rv>
                            <div className="listing__n">{String(itemIndex + 1).padStart(2, "0")}</div>
                            <div>
                              <h3>{item.title}</h3>
                            </div>
                            <div>
                              <p>{item.body}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}

                    {section.statement ? (
                      <p className="lede lede--kh" style={{ marginTop: "2.2rem" }}>
                        {section.statement}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </section>
          )
        })}

        {cta ? (
          <section className="cta">
            <div className="cta__bg">
              <img
                src="/media/coffee-dispatch-sealed-bags-phnom-penh.jpg"
                alt=""
                width={2400}
                height={1350}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="wrap">
              <span className="lbl lbl--onDark">Next step</span>
              <p className="cta__t">{cta.label}</p>
              <div className="btns" style={{ justifyContent: "center" }}>
                <Link href={cta.href} className="btn">
                  {cta.label} <i>→</i>
                </Link>
              </div>
            </div>
          </section>
        ) : null}

        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="occ-metabar">
              <span>Origin Coffee Cambodia · OCC</span>
              <span>
                {sectionName} / {index}
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
