"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"

type HeroAction = {
  href: string
  label: string
  kind?: "primary" | "secondary"
  direction?: "down" | "out"
}

type InnerPageHeroProps = {
  eyebrow: string
  title: string
  summary: string
  image: string
  imageAlt: string
  imageCaption?: string
  actions?: HeroAction[]
  priority?: boolean
  tone?: "paper" | "forest"
}

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

export function InnerPageHero({
  eyebrow,
  title,
  summary,
  image,
  imageAlt,
  imageCaption,
  actions = [],
  priority = true,
  tone = "paper",
}: InnerPageHeroProps) {
  const reduce = useReducedMotion()
  const dark = tone === "forest"
  const enter = reduce ? { opacity: 1 } : { opacity: 0, y: 24 }

  return (
    <section
      data-motion-static
      className={`occ-inner-hero ${dark ? "occ-inner-hero--forest" : "occ-inner-hero--paper"}`}
      aria-label={`${eyebrow} introduction`}
    >
      <div className="occ-inner-hero__grid">
        <motion.div
          className="occ-inner-hero__copy"
          initial={enter}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0.01 : 0.62, ease }}
        >
          <p className="occ-inner-hero__eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="occ-inner-hero__summary">{summary}</p>

          {actions.length > 0 ? (
            <div className="occ-inner-hero__actions">
              {actions.slice(0, 2).map((action) => {
                const Icon = action.direction === "down" ? ArrowDown : ArrowUpRight
                return (
                  <Link
                    key={`${action.href}-${action.label}`}
                    href={action.href}
                    className={`occ-inner-hero__action ${action.kind === "secondary" ? "occ-inner-hero__action--secondary" : "occ-inner-hero__action--primary"}`}
                  >
                    <span>{action.label}</span>
                    <Icon aria-hidden="true" className="size-4" strokeWidth={1.8} />
                  </Link>
                )
              })}
            </div>
          ) : null}
        </motion.div>

        <motion.figure
          className="occ-inner-hero__visual"
          initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduce ? 0.01 : 0.76, delay: reduce ? 0 : 0.08, ease }}
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority={priority}
            sizes="(min-width: 900px) 43vw, 100vw"
            className="object-cover"
          />
          {imageCaption ? <figcaption>{imageCaption}</figcaption> : null}
        </motion.figure>
      </div>
    </section>
  )
}
