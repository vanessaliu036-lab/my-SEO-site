import Link from "next/link"
import { siteNavigation } from "@/components/site/navigation-data"

export function SiteFooter() {
  return (
    <footer className="border-t border-occ-primary/10 bg-occ-background text-occ-primary">
      <div className="mx-auto w-full max-w-[1680px] px-5 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-12">
        <div className="grid gap-10 border-b border-occ-primary/12 pb-10 lg:grid-cols-[0.9fr_2.1fr] lg:gap-12 lg:pb-8">
          <div className="max-w-md">
            <Link
              href="/"
              className="inline-flex items-center"
              aria-label="Origin Coffee Cambodia home"
            >
              <img
                src="/occ-logo-primary-local.svg"
                alt="Origin Coffee Cambodia"
                width={600}
                height={272}
                className="h-[42px] w-auto sm:h-[48px] lg:h-[52px]"
              />
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-occ-primary/66">
              Cambodia-origin specialty coffee, Fine Robusta expertise, sourcing, roasting, and B2B coffee solutions.
            </p>

            <Link
              href="/contact"
              className="mt-6 inline-flex border-b border-occ-primary pb-1 text-[11px] font-medium uppercase tracking-[0.18em] transition-opacity hover:opacity-60"
            >
              Start an enquiry
            </Link>
          </div>

          <nav
            className="grid grid-cols-1 border-t border-occ-primary/12 sm:grid-cols-2 lg:grid-cols-4"
            aria-label="Footer navigation"
          >
            {siteNavigation.map((item, index) => (
              <div
                key={item.label}
                className={`border-b border-occ-primary/12 px-0 py-5 sm:px-6 sm:py-6 lg:px-6 ${index >= 4 ? "lg:col-span-2 lg:py-4" : "lg:py-5"} ${
                  index % 2 === 1 ? "sm:border-l sm:border-occ-primary/12" : ""
                } ${index % 4 !== 0 ? "lg:border-l lg:border-occ-primary/12" : "lg:border-l-0"}`}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className="inline-flex text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors hover:text-occ-secondary"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="inline-flex text-[11px] font-semibold uppercase tracking-[0.2em]">
                    {item.label}
                  </span>
                )}

                {item.children?.length ? (
                  <div className="mt-4 flex flex-col gap-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="text-sm leading-6 text-occ-primary/62 transition-colors hover:text-occ-primary"
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

        <div className="flex flex-col gap-3 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] uppercase tracking-[0.14em] text-occ-primary/45">
            © 2026 Origin Coffee Cambodia
          </p>
          <p className="text-[10px] uppercase tracking-[0.14em] text-occ-primary/36">
            Cambodia · Fine Robusta · B2B Coffee
          </p>
        </div>
      </div>
    </footer>
  )
}
