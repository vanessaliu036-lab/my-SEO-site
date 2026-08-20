"use client"

import Link from "next/link"
import { ChevronDown, Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { occNavigationItems } from "@/components/ui/occ-navigation-data"

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(`${href}/`)
}

type PublicTopNavProps = {
  variant?: "light" | "dark"
  overlay?: boolean
}

export function PublicTopNav({ variant = "light", overlay = false }: PublicTopNavProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const dark = variant === "dark"

  return (
    <>
      <header
        className={`occ-top-nav z-[70] border-b ${
          overlay ? "absolute inset-x-0 top-0" : "sticky top-0"
        } ${
          dark
            ? "border-white/15 bg-transparent text-white"
            : "border-black/10 bg-[#f6f3ea]/95 text-[#182019] backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-20 w-full max-w-[1680px] items-center gap-6 px-5 sm:px-8 lg:px-12">
          <Link href="/" className="flex shrink-0 items-end gap-3" aria-label="Origin Coffee Cambodia home">
            <span className={`text-2xl font-semibold leading-none tracking-[-0.075em] ${dark ? "text-white" : "text-[#182019]"}`}>
              OCC
            </span>
            <span
              className={`hidden pb-[1px] text-[8px] font-medium uppercase leading-[1.05] tracking-[0.22em] sm:block ${
                dark ? "text-white/65" : "text-[#6f746d]"
              }`}
            >
              Origin Coffee<br />Cambodia
            </span>
          </Link>

          <nav className="hidden min-w-0 flex-1 items-center justify-end gap-7 lg:flex xl:gap-9" aria-label="Primary navigation">
            {occNavigationItems.map((item) => (
              <div key={item.label} className="group relative flex h-20 items-center">
                <Link
                  href={item.href}
                  className={`inline-flex items-center gap-1 whitespace-nowrap text-[10px] font-medium tracking-[0.18em] transition-colors xl:text-[11px] ${
                    dark
                      ? isActive(pathname, item.href)
                        ? "text-white"
                        : "text-white/70 hover:text-white"
                      : isActive(pathname, item.href)
                        ? "text-[#182019]"
                        : "text-[#6f746d] hover:text-[#182019]"
                  }`}
                >
                  {item.label}
                  {"children" in item ? <ChevronDown className="size-3 opacity-45" aria-hidden="true" /> : null}
                </Link>

                {"children" in item ? (
                  <div className="pointer-events-none absolute left-1/2 top-20 min-w-[235px] -translate-x-1/2 translate-y-2 border border-black/10 bg-[#f6f3ea] p-2 text-[#182019] opacity-0 shadow-[0_18px_45px_rgba(20,24,18,0.10)] transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
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
            href="/admin"
            aria-label="Staff access"
            className={`hidden shrink-0 text-[8px] font-medium uppercase tracking-[0.18em] transition-colors lg:inline-flex ${
              dark ? "text-white/40 hover:text-white/75" : "text-[#8a8e87] hover:text-[#182019]"
            }`}
          >
            Staff Access ↗
          </Link>

          <button
            type="button"
            className={`ml-auto inline-flex size-10 items-center justify-center rounded-full border lg:hidden ${
              dark ? "border-white/30 text-white" : "border-black/15 text-[#182019]"
            }`}
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
              {occNavigationItems.map((item, index) => (
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
                href="/admin"
                onClick={() => setMobileOpen(false)}
                className="mt-8 inline-flex text-[9px] uppercase tracking-[0.18em] text-black/40"
              >
                Staff Access ↗
              </Link>
            </nav>
          </div>
        </div>
      ) : null}
    </>
  )
}
