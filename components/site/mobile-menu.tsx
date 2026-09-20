"use client"

import Link from "next/link"
import { X } from "lucide-react"
import { siteNavigation } from "@/components/site/navigation-data"

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-occ-background text-occ-primary lg:hidden">
      <div className="mx-auto min-h-full max-w-3xl px-6 py-6 sm:px-10">
        <div className="flex items-center justify-between border-b border-black/10 pb-5">
          <Link
            href="/"
            onClick={onClose}
            className="flex shrink-0 items-center"
            aria-label="Origin Coffee Cambodia home"
          >
            <img
              src="/occ-logo-primary-local.svg"
              alt=""
              width={600}
              height={272}
              className="h-[42px] w-auto sm:h-[48px]"
            />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-10 items-center justify-center rounded-full border border-black/15"
            aria-label="Close navigation menu"
          >
            <X className="size-4" />
          </button>
        </div>

        <nav className="py-8 font-sans" aria-label="Mobile navigation">
          {siteNavigation.map((item, index) => (
            <div key={item.label} className="border-b border-black/10 py-5">
              <div className="flex items-baseline justify-between gap-4">
                {item.href ? (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="font-sans text-3xl leading-none tracking-[-0.035em]"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-sans text-3xl leading-none tracking-[-0.035em]">
                    {item.label}
                  </span>
                )}
                <span className="text-[9px] tracking-[0.22em] text-black/35">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              {item.children?.length ? (
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={onClose}
                      className="font-sans text-[11px] uppercase tracking-[0.12em] text-black/55"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}
