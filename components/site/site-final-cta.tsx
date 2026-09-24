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

const excludedPaths = new Set(["/", "/about", "/contact", "/distribution", "/partnerships", "/origins"])

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

  if (pathname === "/solutions/roasting-program") {
    return {
      eyebrow: "B2B Roast Profile Development",
      title: "Your market. Your customer. Your roast profile.",
      copy: "Tell us about your market, customer, brewing application, and the coffee product you want to develop.",
      primaryLabel: "Develop Your Roast Profile",
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

  if (pathname === "/brand-gifting") {
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

  const hasPageCta =
    pathname.startsWith("/about/") ||
    pathname.startsWith("/solutions") ||
    pathname.startsWith("/resources/") ||
    pathname.startsWith("/brand-gifting") ||
    pathname.startsWith("/blog/")

  if (excludedPaths.has(pathname) || hasPageCta) return null

  const cta = getCta(pathname)

  return (
    <section className="occ-site-final-cta border-t border-occ-primary/10 bg-occ-background text-occ-primary" aria-label="Work with Origin Coffee Cambodia">
      <div className="mx-auto grid w-full max-w-[1360px] grid-cols-1 gap-10 px-6 py-16 sm:px-8 md:grid-cols-12 md:px-12 lg:px-16 lg:py-20">
        <div className="md:col-span-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-occ-burgundy">{cta.eyebrow}</p>
          <span className="mt-4 block h-px w-10 bg-occ-burgundy/40" aria-hidden="true" />
        </div>
        <div className="md:col-span-9 md:col-start-4">
          <h2 className="max-w-[900px] font-[var(--font-display)] text-[clamp(2.4rem,4.8vw,5.2rem)] font-light leading-[0.92] tracking-[-0.04em] text-occ-primary">
            {cta.title}
          </h2>
          <div className="mt-7 grid grid-cols-1 gap-6 border-t border-occ-primary/16 pt-6 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-10">
            <p className="max-w-[720px] text-[15px] leading-7 text-occ-primary/68">{cta.copy}</p>
            <div className="flex flex-wrap">
              <Link
                href={cta.primaryHref}
                className="occ-primary-cta"
              >
                {cta.primaryLabel} <ArrowUpRight className="size-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
