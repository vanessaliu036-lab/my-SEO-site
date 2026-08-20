"use client"

import Link from "next/link"
import { ChevronDown, Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { useState } from "react"

const navItems = [
  { label: "HOME", href: "/" },
  {
    label: "ABOUT",
    href: "/about",
    children: [
      { label: "About Origin", href: "/about" },
      { label: "Mission", href: "/about/mission" },
      { label: "Founder", href: "/about/founder" },
      { label: "Manifesto", href: "/about/manifesto" },
    ],
  },
  {
    label: "COFFEE",
    href: "/coffee/single-origin",
    children: [{ label: "Single Origin", href: "/coffee/single-origin" }],
  },
  {
    label: "COLLECTION",
    href: "/collection",
    children: [
      { label: "Mondulkiri Origin Collection", href: "/collection" },
      { label: "SOVANN", href: "/collection/sovann" },
      { label: "PREK", href: "/collection/prek" },
      { label: "ANGKAR", href: "/collection/angkar" },
    ],
  },
  {
    label: "INSIGHTS",
    href: "/blog",
    children: [
      { label: "Journal", href: "/blog" },
      { label: "Signal", href: "/signal" },
      { label: "Matter", href: "/matter" },
      { label: "Archive", href: "/archive" },
    ],
  },
  {
    label: "SOLUTIONS",
    href: "/solutions",
    children: [
      { label: "Solutions", href: "/solutions" },
      { label: "Wholesale", href: "/solutions/wholesale" },
      { label: "Roasting Program", href: "/solutions/roasting-program" },
      { label: "Barista Staffing", href: "/solutions/barista-staffing" },
      { label: "Equipment Service", href: "/solutions/equipment-service" },
    ],
  },
  {
    label: "CULTURE & ETHICS",
    href: "/about/sustainability",
    children: [
      { label: "Sustainability", href: "/about/sustainability" },
      { label: "Vision", href: "/vision" },
      { label: "System", href: "/system" },
    ],
  },
] as const

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function PublicTopNav() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <header className="occ-top-nav sticky top-0 z-[70] border-b border-black/10 bg-[#f6f3ea]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] w-full max-w-[1680px] items-center gap-6 px-5 sm:px-8 lg:px-10">
          <Link href="/" className="flex shrink-0 items-end gap-2" aria-label="Origin Coffee Cambodia home">
            <span className="text-[25px] font-semibold leading-none tracking-[-0.075em] text-[#182019]">OCC</span>
            <span className="hidden pb-[1px] text-[8px] font-medium uppercase leading-[1.05] tracking-[0.22em] text-[#6f746d] xl:block">
              Origin Coffee<br />Cambodia
            </span>
          </Link>

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-3 lg:flex xl:gap-5" aria-label="Primary navigation">
            {navItems.map((item) => (
              <div key={item.label} className="group relative flex h-[72px] items-center">
                <Link
                  href={item.href}
                  className={`inline-flex items-center gap-1 whitespace-nowrap text-[9px] font-medium tracking-[0.16em] transition-colors xl:text-[10px] ${
                    isActive(pathname, item.href) ? "text-[#182019]" : "text-[#6f746d] hover:text-[#182019]"
                  }`}
                >
                  {item.label}
                  {"children" in item ? <ChevronDown className="size-3 opacity-50" aria-hidden="true" /> : null}
                </Link>

                {"children" in item ? (
                  <div className="pointer-events-none absolute left-1/2 top-[72px] min-w-[220px] -translate-x-1/2 translate-y-2 border border-black/10 bg-[#f6f3ea] p-2 opacity-0 shadow-[0_18px_45px_rgba(20,24,18,0.10)] transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
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

          <Link
            href="/contact"
            className="ml-auto hidden shrink-0 rounded-full border border-[#182019]/25 px-5 py-2.5 text-[9px] font-medium uppercase tracking-[0.16em] text-[#182019] transition-colors hover:bg-[#182019] hover:text-white lg:inline-flex"
          >
            Contact
          </Link>

          <button
            type="button"
            className="ml-auto inline-flex size-10 items-center justify-center rounded-full border border-black/15 text-[#182019] lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
          >
            <Menu className="size-4" />
          </button>
        </div>
      </header>

      {mobileOpen ? (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-[#f6f3ea] text-[#182019] lg:hidden">
          <div className="mx-auto min-h-full max-w-3xl px-6 py-6 sm:px-10">
            <div className="flex items-center justify-between border-b border-black/10 pb-5">
              <Link href="/" onClick={() => setMobileOpen(false)} className="text-2xl font-semibold tracking-[-0.07em]">
                OCC
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="inline-flex size-11 items-center justify-center rounded-full border border-black/15"
                aria-label="Close navigation menu"
              >
                <X className="size-4" />
              </button>
            </div>

            <nav className="py-8" aria-label="Mobile navigation">
              {navItems.map((item, index) => (
                <div key={item.label} className="border-b border-black/10 py-5">
                  <div className="flex items-baseline justify-between gap-4">
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="font-[var(--font-display)] text-3xl leading-none tracking-[-0.035em]"
                    >
                      {item.label}
                    </Link>
                    <span className="text-[9px] tracking-[0.22em] text-black/35">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  {"children" in item ? (
                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="text-[11px] uppercase tracking-[0.12em] text-black/55"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-8 inline-flex rounded-full bg-[#182019] px-6 py-3 text-[10px] uppercase tracking-[0.16em] text-white"
              >
                Contact OCC
              </Link>
            </nav>
          </div>
        </div>
      ) : null}
    </>
  )
}
