"use client"

import Link from "next/link"
import { ChevronDown, Menu } from "lucide-react"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { MobileMenu } from "@/components/site/mobile-menu"
import { siteNavigation } from "@/components/site/navigation-data"
import { StaffAccess } from "@/components/site/staff-access"

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const onHome = pathname === "/"

  return (
    <>
      <header
        className={`z-[70] w-full border-b ${
          onHome
            ? "absolute inset-x-0 top-0 border-white/15 bg-transparent text-white"
            : "sticky top-0 border-black/10 bg-[#f6f3ea]/95 text-[#182019] backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-20 w-full max-w-[1680px] items-center gap-6 px-5 sm:px-8 lg:px-12">
          <Link href="/" className="flex shrink-0 items-end gap-3" aria-label="Origin Coffee Cambodia home">
            <span className="text-2xl font-semibold tracking-[-0.07em]">OCC</span>
            <span
              className={`mb-0.5 hidden text-[9px] font-medium uppercase leading-tight tracking-[0.24em] sm:block ${
                onHome ? "text-white/65" : "text-[#6f746d]"
              }`}
            >
              Origin Coffee
              <br />
              Cambodia
            </span>
          </Link>

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-7 lg:flex" aria-label="Primary navigation">
            {siteNavigation.map((item) => (
              <div key={item.label} className="group relative flex h-20 items-center">
                <Link
                  href={item.href}
                  className={`inline-flex items-center gap-1 whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.18em] transition-colors ${
                    onHome
                      ? isActive(pathname, item.href)
                        ? "text-white"
                        : "text-white/70 hover:text-white"
                      : isActive(pathname, item.href)
                        ? "text-[#182019]"
                        : "text-[#6f746d] hover:text-[#182019]"
                  }`}
                >
                  {item.label}
                  {item.children?.length ? <ChevronDown className="size-3 opacity-50" aria-hidden="true" /> : null}
                </Link>

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

          <StaffAccess dark={onHome} />

          <button
            type="button"
            className={`ml-auto inline-flex size-10 items-center justify-center rounded-full border transition-colors lg:hidden ${
              onHome ? "border-white/30 text-white hover:bg-white hover:text-black" : "border-black/15 text-[#182019]"
            }`}
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
          >
            <Menu className="size-4" />
          </button>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
