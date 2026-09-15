import Link from "next/link"
import { siteNavigation } from "@/components/site/navigation-data"

const groupedItems = siteNavigation.filter((item) => item.children?.length)
const standaloneItems = siteNavigation.filter((item) => !item.children?.length)

export function SiteFooter() {
  return (
    <footer className="border-t border-[#182019]/10 bg-[#efe9dc] text-[#182019]">
      <div className="mx-auto w-full max-w-[1680px] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1.95fr] lg:gap-20">
          <div className="max-w-md">
            <Link
              href="/"
              className="inline-flex"
              aria-label="Origin Coffee Cambodia home"
            >
              <img
                src="/occ-logo-primary-local.svg"
                alt=""
                width={600}
                height={272}
                className="h-auto w-[210px]"
              />
            </Link>

            <p className="mt-7 max-w-sm text-sm leading-7 text-[#182019]/66">
              Cambodia-origin specialty coffee, Fine Robusta expertise, sourcing, roasting, and B2B coffee solutions.
            </p>

            <Link
              href="/contact"
              className="mt-7 inline-flex border-b border-[#182019] pb-1 text-[11px] font-medium uppercase tracking-[0.18em] transition-opacity hover:opacity-60"
            >
              Start an enquiry
            </Link>
          </div>

          <nav className="grid grid-cols-1 gap-10 sm:grid-cols-3" aria-label="Footer navigation groups">
            {groupedItems.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  className="text-[11px] font-semibold uppercase tracking-[0.2em]"
                >
                  {item.label}
                </Link>
                <div className="mt-5 flex flex-col gap-3.5">
                  {item.children?.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="text-sm leading-6 text-[#182019]/62 transition-colors hover:text-[#182019]"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>

        <nav
          className="mt-14 grid grid-cols-1 border-y border-[#182019]/12 sm:grid-cols-2 lg:grid-cols-4"
          aria-label="Primary footer navigation"
        >
          {standaloneItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex min-h-16 items-center justify-between gap-5 py-5 text-sm font-medium uppercase tracking-[0.13em] transition-colors hover:text-[#5c6f58] sm:px-6 lg:min-h-20 lg:px-7 ${
                index > 0 ? "border-t border-[#182019]/12 sm:border-t-0" : ""
              } ${index % 2 === 1 ? "sm:border-l sm:border-[#182019]/12" : ""} ${index > 1 ? "sm:border-t sm:border-[#182019]/12 lg:border-t-0" : ""} ${index > 0 ? "lg:border-l lg:border-[#182019]/12" : ""}`}
            >
              <span>{item.label}</span>
              <span className="text-base font-normal tracking-normal text-[#182019]/34 transition-transform duration-200 group-hover:translate-x-1">
                ↗
              </span>
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] uppercase tracking-[0.14em] text-[#182019]/45">
            © 2026 Origin Coffee Cambodia
          </p>
          <p className="text-[10px] uppercase tracking-[0.14em] text-[#182019]/36">
            Cambodia · Fine Robusta · B2B Coffee
          </p>
        </div>
      </div>
    </footer>
  )
}
