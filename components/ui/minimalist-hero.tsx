"use client"

import React from "react"
import { motion, useReducedMotion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface MinimalistHeroProps {
  logoText: string
  navLinks: { label: string; href: string }[]
  mainText: string
  readMoreLink: string
  imageSrc: string
  imageAlt: string
  overlayText: {
    part1: string
    part2: string
  }
  socialLinks: { icon: LucideIcon; href: string }[]
  locationText: string
  className?: string
  visual?: React.ReactNode
  showHeader?: boolean
  eyebrow?: string
  readMoreLabel?: string
}

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-[10px] font-medium tracking-[0.16em] text-[#182019]/55 transition-colors hover:text-[#182019]"
  >
    {children}
  </a>
)

const SocialIcon = ({ href, icon: Icon }: { href: string; icon: LucideIcon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-[#182019]/55 transition-colors hover:text-[#182019]"
  >
    <Icon className="h-4 w-4" />
  </a>
)

export const MinimalistHero = ({
  logoText,
  navLinks,
  mainText,
  readMoreLink,
  imageSrc,
  imageAlt,
  overlayText,
  socialLinks,
  locationText,
  className,
  visual,
  showHeader = true,
  eyebrow = "Origin Coffee Cambodia",
  readMoreLabel = "Read More",
}: MinimalistHeroProps) => {
  const reducedMotion = useReducedMotion()
  const transition = (delay = 0) => ({
    duration: reducedMotion ? 0.01 : 0.68,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    delay: reducedMotion ? 0 : delay,
  })

  return (
    <section
      className={cn(
        "relative flex min-h-[calc(100svh-72px)] w-full flex-col items-center justify-between overflow-hidden bg-[#f6f3ea] px-6 py-8 font-sans text-[#182019] sm:px-8 md:px-12 lg:px-16",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 hidden grid-cols-12 divide-x divide-black/[0.07] md:grid" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, index) => <div key={index} />)}
      </div>

      {showHeader ? (
        <header className="relative z-30 flex w-full max-w-[1600px] items-center justify-between">
          <motion.div
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={transition(0.05)}
            className="text-xl font-semibold tracking-[-0.06em]"
          >
            {logoText}
          </motion.div>
          <div className="hidden items-center space-x-7 md:flex">
            {navLinks.map((link) => (
              <NavLink key={link.label} href={link.href}>{link.label}</NavLink>
            ))}
          </div>
        </header>
      ) : null}

      <div className="relative z-10 grid w-full max-w-[1600px] flex-1 grid-cols-1 items-center gap-10 py-12 md:grid-cols-12 md:gap-0 md:py-6">
        <motion.div
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition(0.42)}
          className="order-3 text-center md:order-1 md:col-span-3 md:pr-10 md:text-left"
        >
          <p className="occ-eyebrow mb-5 text-[#182019]/45">{eyebrow}</p>
          <p className="mx-auto max-w-[310px] text-sm font-light leading-7 text-[#182019]/72 md:mx-0">{mainText}</p>
          <a href={readMoreLink} className="mt-5 inline-block border-b border-[#182019]/35 pb-1 text-[10px] font-medium uppercase tracking-[0.16em] text-[#182019]">
            {readMoreLabel}
          </a>
        </motion.div>

        <div className="relative order-1 flex min-h-[420px] items-center justify-center md:order-2 md:col-span-5 md:min-h-[620px]">
          <motion.div
            initial={reducedMotion ? { opacity: 1 } : { scale: 0.82, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={transition(0.12)}
            className="absolute z-0 h-[280px] w-[280px] rounded-full bg-[#d9d1b7] sm:h-[340px] sm:w-[340px] md:h-[440px] md:w-[440px] lg:h-[500px] lg:w-[500px]"
          />
          <motion.div
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition(0.22)}
            className="relative z-10 flex items-center justify-center"
          >
            {visual ?? (
              <motion.img
                src={imageSrc}
                alt={imageAlt}
                className="relative z-10 h-auto w-56 object-cover md:w-64 lg:w-72"
              />
            )}
          </motion.div>
        </div>

        <motion.div
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition(0.48)}
          className="z-20 order-2 text-center md:order-3 md:col-span-4 md:text-left"
        >
          <h1 className="occ-editorial-title text-[4.5rem] sm:text-[5.5rem] md:text-[6.4rem] lg:text-[8rem]">
            {overlayText.part1}
            <br />
            {overlayText.part2}
          </h1>
        </motion.div>
      </div>

      <footer className="relative z-30 flex w-full max-w-[1600px] items-center justify-between border-t border-black/10 pt-5">
        <motion.div
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition(0.5)}
          className="flex items-center space-x-4"
        >
          {socialLinks.map((link, index) => <SocialIcon key={index} href={link.href} icon={link.icon} />)}
        </motion.div>
        <motion.div
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition(0.54)}
          className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#182019]/48"
        >
          {locationText}
        </motion.div>
      </footer>
    </section>
  )
}
