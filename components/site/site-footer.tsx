import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { ReactNode } from "react"
import { siteNavigation } from "@/components/site/navigation-data"

const aboutLinks = siteNavigation.find((item) => item.href === "/about")?.children ?? []
const solutionLinks = siteNavigation.find((item) => item.href === "/solutions")?.children ?? []
const coffeeLinks = siteNavigation.find((item) => item.href === "/coffee/single-origin")?.children ?? []

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.13em] text-white/60 transition-colors hover:text-white"
    >
      <span>{children}</span>
      <ArrowUpRight className="size-3 -translate-x-0.5 translate-y-0.5 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-70" aria-hidden="true" />
    </Link>
  )
}

function FooterColumn({ label, links }: { label: string; links: readonly { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="mb-5 text-[10px] font-medium uppercase tracking-[0.22em] text-white/38">{label}</h2>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <FooterLink href={link.href}>{link.label}</FooterLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SiteFooter() {
  return (
    <footer className="bg-[#182019] text-[#f6f3ea]" aria-label="Site footer">
      <div className="mx-auto w-full max-w-[1680px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-14 lg:grid-cols-[minmax(260px,1.35fr)_repeat(4,minmax(0,1fr))] lg:gap-10">
          <div className="max-w-xs">
            <Link href="/" className="inline-flex items-end gap-3" aria-label="Origin Coffee Cambodia home">
              <span className="text-3xl font-semibold tracking-[-0.08em]">OCC</span>
              <span className="mb-0.5 text-[9px] font-medium uppercase leading-tight tracking-[0.24em] text-white/50">
                Origin Coffee
                <br />
                Cambodia
              </span>
            </Link>
            <p className="mt-7 max-w-[24ch] text-sm leading-7 text-white/58">
              Cambodian coffee, considered from origin to cup.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 border-b border-white/35 pb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white transition-colors hover:border-white"
            >
              Start a conversation
              <ArrowUpRight className="size-3" aria-hidden="true" />
            </Link>
          </div>

          <FooterColumn
            label="Explore"
            links={siteNavigation.map(({ label, href }) => ({ label, href }))}
          />
          <FooterColumn label="About" links={aboutLinks} />
          <FooterColumn label="Solutions" links={solutionLinks} />
          <FooterColumn label="Coffee" links={coffeeLinks} />
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/12 pt-5 text-[9px] uppercase tracking-[0.16em] text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Origin Coffee Cambodia</span>
          <span>From Cambodian origins, with intention.</span>
        </div>
      </div>
    </footer>
  )
}
