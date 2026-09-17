"use client"

import Link from "next/link"
import { ChevronDown, Menu } from "lucide-react"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { MobileMenu } from "@/components/site/mobile-menu"
import { siteNavigation } from "@/components/site/navigation-data"

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const onHome = pathname === "/"

  const headerClass = onHome
    ? "absolute inset-x-0 top-0 z-[70] w-full border-b border-white/15 bg-transparent text-white"
    : "sticky inset-x-0 top-0 z-[70] w-full border-b border-[#182019]/12 bg-[#f6f3ea]/95 text-[#182019] backdrop-blur-md"

  const inactiveLinkClass = onHome ? "text-white/70 hover:text-white" : "text-[#182019]/62 hover:text-[#182019]"
  const activeLinkClass = onHome ? "text-white" : "text-[#182019]"
  const mobileButtonClass = onHome
    ? "border-white/30 text-white hover:bg-white hover:text-black"
    : "border-[#182019]/20 text-[#182019] hover:bg-[#182019] hover:text-[#f6f3ea]"

  return (
    <>
      <header className={headerClass}>
        <div className="mx-auto flex h-[72px] w-full max-w-[1680px] items-center gap-6 px-5 sm:h-20 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="flex shrink-0 items-center"
            aria-label="Origin Coffee Cambodia home"
          >
            <img
              src="/occ-logo-primary-local.svg"
              alt=""
              width={600}
              height={272}
              className="h-[42px] w-auto sm:h-[48px] lg:h-[52px]"
            />
          </Link>

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-7 lg:flex" aria-label="Primary navigation">
            {siteNavigation.map((item) => (
              <div key={item.label} className="group relative flex h-20 items-center">
                {item.href ? (
                  <Link
                    href={item.href}
                    className={`inline-flex items-center gap-1 whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.18em] transition-colors ${
                      isActive(pathname, item.href) || item.children?.some((child) => isActive(pathname, child.href))
                        ? activeLinkClass
                        : inactiveLinkClass
                    }`}
                  >
                    {item.label}
                    {item.children?.length ? <ChevronDown className="size-3 opacity-50" aria-hidden="true" /> : null}
                  </Link>
                ) : (
                  <span
                    className={`inline-flex items-center gap-1 whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.18em] ${
                      item.children?.some((child) => isActive(pathname, child.href)) ? activeLinkClass : inactiveLinkClass
                    }`}
                  >
                    {item.label}
                    {item.children?.length ? <ChevronDown className="size-3 opacity-50" aria-hidden="true" /> : null}
                  </span>
                )}

                {item.children?.length ? (
                  <div className="pointer-events-none absolute left-1/2 top-20 min-w-[230px] -translate-x-1/2 translate-y-2 border border-black/10 bg-[#f6f3ea] p-2 text-[#182019] opacity-0 shadow-[0_18px_45px_rgba(20,24,18,0.10)] transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block border-b border-black/5 px-4 py-3 text-[11px] tracking-[0.08em] text-[#4f554e] transition-colors last:border-b-0 hover:bg-white/70 hover:text-[#182019]"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>

          <button
            type="button"
            className={`ml-auto inline-flex size-10 items-center justify-center rounded-full border transition-colors lg:hidden ${mobileButtonClass}`}
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
          >
            <Menu className="size-[17px]" />
          </button>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
