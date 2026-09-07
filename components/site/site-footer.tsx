import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { siteNavigation } from "@/components/site/navigation-data"

const primaryLinks = siteNavigation.map(({ label, href }) => ({ label, href }))
const aboutLinks = siteNavigation.find((item) => item.href === "/about")?.children ?? []
const solutionLinks = siteNavigation.find((item) => item.href === "/solutions")?.children ?? []
const coffeeLinks = [{ label: "Single Origin", href: "/coffee/single-origin" }] as const

function FooterSubnav({ label, links }: { label: string; links: readonly { label: string; href: string }[] }) {
  return (
    <div>
      <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.22em] text-black/38">{label}</p>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.12em] text-black/58 transition-colors hover:text-[#182019]"
            >
              <span>{link.label}</span>
              <ArrowUpRight className="size-3 -translate-x-0.5 translate-y-0.5 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-70" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-black/10 bg-[#f6f3ea] text-[#182019]" aria-label="Site footer">
      <div className="mx-auto w-full max-w-[1680px] px-5 py-14 sm:px-8 md:py-18 lg:px-12 lg:py-20">
        <div className="grid grid-cols-1 gap-14 border-b border-black/10 pb-14 lg:grid-cols-12 lg:gap-10 lg:pb-20">
          <div className="lg:col-span-7">
            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-black/40">Origin Coffee Cambodia</p>
            <Link href="/" className="mt-7 inline-block font-[var(--font-display)] text-[clamp(5rem,12vw,10rem)] font-normal leading-[0.72] tracking-[-0.09em] transition-opacity hover:opacity-65" aria-label="Origin Coffee Cambodia home">
              OCC<span className="text-black/25">.</span>
            </Link>
            <p className="mt-10 max-w-md text-sm leading-7 text-black/62">
              Cambodian coffee, considered from origin to cup. Sourcing, quality, and professional coffee systems for a clearer next step.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:col-span-5 lg:gap-8">
            <nav aria-label="Footer primary navigation">
              <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.22em] text-black/38">Navigate</p>
              <ol>
                {primaryLinks.map((link, index) => (
                  <li key={link.href} className="border-t border-black/10 py-3 last:border-b">
                    <Link href={link.href} className="group flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.15em] transition-colors hover:text-black/55">
                      <span className="w-5 text-[9px] font-normal tracking-[0.18em] text-black/32">{String(index + 1).padStart(2, "0")}</span>
                      <span>{link.label}</span>
                      <ArrowUpRight className="ml-auto size-3 -translate-x-1 translate-y-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-60" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="border-t border-black/10 pt-5 sm:border-t-0 sm:pt-0">
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-black/38">Start here</p>
              <Link href="/contact" className="group mt-7 inline-flex items-center gap-2 border-b border-black/25 pb-2 text-sm font-medium tracking-[-0.01em] transition-colors hover:border-black">
                Talk to OCC
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </Link>
              <p className="mt-5 max-w-[22ch] text-xs leading-6 text-black/48">
                Wholesale, sourcing, roasting, and coffee-solution enquiries.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 border-b border-black/10 py-8 sm:grid-cols-3 sm:gap-6">
          <FooterSubnav label="About" links={aboutLinks} />
          <FooterSubnav label="Solutions" links={solutionLinks} />
          <FooterSubnav label="Coffee" links={coffeeLinks} />
        </div>

        <div className="flex flex-col gap-3 pt-5 text-[9px] uppercase tracking-[0.16em] text-black/38 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Origin Coffee Cambodia</span>
          <span>Cambodia · Fine Robusta · Coffee systems</span>
        </div>
      </div>
    </footer>
  )
}
