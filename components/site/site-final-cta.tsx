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
const excludedPrefixes = ["/solutions", "/about", "/origins"]

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

  if (excludedPaths.has(pathname) || excludedPrefixes.some((prefix) => pathname.startsWith(prefix))) return null

  const cta = getCta(pathname)

  return (
    <section className="border-y border-white/10 bg-occ-primary text-white" aria-label="Work with Origin Coffee Cambodia">
      <div className="mx-auto grid w-full max-w-[1240px] gap-10 px-6 py-16 sm:px-8 md:px-12 lg:grid-cols-[1.2fr_.8fr] lg:items-end lg:px-16 lg:py-20">
          <div>
            <p className="occ-section-label text-white/60">{cta.eyebrow}</p>
            <h2 className="mt-5 max-w-[760px] text-[clamp(2.35rem,4.2vw,4.25rem)] text-white">
              {cta.title}
            </h2>
          </div>
          <div className="lg:border-l lg:border-white/20 lg:pl-10">
            <p className="max-w-[520px] text-lg text-white/70">{cta.copy}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={cta.primaryHref}
                className="occ-cta border border-white bg-white text-occ-primary"
              >
                {cta.primaryLabel} <ArrowUpRight className="size-4" strokeWidth={1.8} />
              </Link>
              {cta.secondaryHref && cta.secondaryLabel ? (
                <Link
                  href={cta.secondaryHref}
                  className="occ-cta border border-white/45 text-white hover:border-white hover:bg-white hover:text-occ-primary"
                >
                  {cta.secondaryLabel} <ArrowUpRight className="size-4" strokeWidth={1.8} />
                </Link>
              ) : null}
            </div>
          </div>
      </div>
    </section>
  )
}
