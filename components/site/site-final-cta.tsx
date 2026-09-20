"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowUpRight } from "lucide-react"

type CtaConfig = {
  eyebrow: string
  title: string
  copy: string
  primaryLabel: string
  primaryHref: string
  secondaryLabel?: string
  secondaryHref?: string
}

const excludedPaths = new Set(["/contact", "/distribution", "/partnerships"])

function getCta(pathname: string): CtaConfig {
  if (pathname === "/" || pathname === "") {
    return {
      eyebrow: "Work With OCC",
      title: "Bring Cambodian coffee into your business.",
      copy: "Tell us what you are building, which market you serve, and where Cambodian coffee can fit. We will help identify the clearest supply or development path.",
      primaryLabel: "Start an Enquiry",
      primaryHref: "/contact",
      secondaryLabel: "Explore Solutions",
      secondaryHref: "/solutions",
    }
  }

  if (pathname.startsWith("/about")) {
    return {
      eyebrow: "Work With OCC",
      title: "Start with Cambodia. Build from there.",
      copy: "If your business is evaluating Cambodian coffee, Fine Robusta, wholesale supply, custom roasting, or a market partnership, start the conversation with OCC.",
      primaryLabel: "Contact OCC",
      primaryHref: "/contact",
      secondaryLabel: "Explore Solutions",
      secondaryHref: "/solutions",
    }
  }

  if (pathname.startsWith("/origins") || pathname.startsWith("/fine-robusta-cambodia")) {
    return {
      eyebrow: "From Origin to Supply",
      title: "Source Cambodian coffee with more clarity.",
      copy: "Move from origin research into supplier evaluation, samples, roast direction, and a commercial conversation built around the coffee you actually need.",
      primaryLabel: "Discuss Supply",
      primaryHref: "/contact",
      secondaryLabel: "Wholesale Coffee",
      secondaryHref: "/solutions/wholesale",
    }
  }

  if (pathname.startsWith("/solutions")) {
    return {
      eyebrow: "Build Your Coffee Program",
      title: "Tell us what you need the coffee to do.",
      copy: "Choose an OCC-developed supply direction or build a roast and product program around your market, application, and commercial target.",
      primaryLabel: "Start a Conversation",
      primaryHref: "/contact",
      secondaryLabel: "Wholesale Coffee",
      secondaryHref: "/solutions/wholesale",
    }
  }

  if (pathname.startsWith("/blog")) {
    return {
      eyebrow: "From Research to Business",
      title: "Turn coffee research into a commercial conversation.",
      copy: "If you are researching Cambodian coffee for sourcing, roasting, hospitality, retail, or distribution, OCC can help you evaluate the next practical step.",
      primaryLabel: "Contact OCC",
      primaryHref: "/contact",
      secondaryLabel: "Explore Solutions",
      secondaryHref: "/solutions",
    }
  }

  return {
    eyebrow: "Work With OCC",
    title: "Bring Cambodian coffee into your next program.",
    copy: "Tell us about your business, market, coffee application, and what you need to evaluate next.",
    primaryLabel: "Contact OCC",
    primaryHref: "/contact",
    secondaryLabel: "Explore Solutions",
    secondaryHref: "/solutions",
  }
}

export function SiteFinalCta() {
  const pathname = usePathname() || "/"

  if (excludedPaths.has(pathname)) return null

  const cta = getCta(pathname)

  return (
    <section className="border-y border-occ-primary/10 bg-occ-surface text-occ-primary" aria-label="Work with Origin Coffee Cambodia">
      <div className="mx-auto w-full max-w-[1240px] px-6 py-14 sm:px-8 md:px-12 lg:px-16 lg:py-16">
        <div className="grid overflow-hidden border border-occ-primary/12 bg-occ-background md:grid-cols-[minmax(0,1.35fr)_minmax(280px,.65fr)]">
          <div className="px-7 py-9 sm:px-10 lg:px-12 lg:py-11">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-occ-secondary">{cta.eyebrow}</p>
            <h2 className="mt-5 max-w-[760px] font-[var(--font-display)] text-[clamp(2.25rem,4.2vw,4.25rem)] font-normal leading-[0.96] tracking-[-0.035em] text-occ-primary">
              {cta.title}
            </h2>
          </div>
          <div className="flex flex-col justify-between border-t border-occ-primary/12 px-7 py-8 sm:px-10 md:border-l md:border-t-0 lg:py-10">
            <p className="max-w-[520px] text-[15px] leading-7 text-occ-secondary">{cta.copy}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={cta.primaryHref}
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-occ-burgundy px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.17em] text-white transition duration-150 hover:-translate-y-0.5 hover:bg-occ-primary"
              >
                {cta.primaryLabel} <ArrowUpRight className="size-3" />
              </Link>
              {cta.secondaryHref && cta.secondaryLabel ? (
                <Link
                  href={cta.secondaryHref}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-occ-primary/28 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.17em] text-occ-primary transition duration-150 hover:border-occ-primary hover:bg-occ-primary hover:text-white"
                >
                  {cta.secondaryLabel} <ArrowUpRight className="size-3" />
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
