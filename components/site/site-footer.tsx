import Link from "next/link"
import { siteNavigation } from "@/components/site/navigation-data"

export function SiteFooter() {
  return (
    <footer className="border-t border-[#182019]/10 bg-[#efe9dc] text-[#182019]">
      <div className="mx-auto w-full max-w-[1680px] px-5 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-20">
        <div className="grid gap-10 border-b border-[#182019]/12 pb-10 lg:grid-cols-[0.9fr_2.1fr] lg:gap-16 lg:pb-16">
          <div className="max-w-md">
            <Link
              href="/"
              className="inline-flex items-center"
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

            <p className="mt-6 max-w-sm text-sm leading-7 text-[#182019]/66">
              Cambodia-origin specialty coffee, Fine Robusta expertise, sourcing, roasting, and B2B coffee solutions.
            </p>

            <Link
              href="/contact"
              className="mt-6 inline-flex border-b border-[#182019] pb-1 text-[11px] font-medium uppercase tracking-[0.18em] transition-opacity hover:opacity-60"
            >
              Start an enquiry
            </Link>
          </div>

          <nav
            className="grid grid-cols-1 border-t border-[#182019]/12 sm:grid-cols-2 lg:grid-cols-4"
            aria-label="Footer navigation"
          >
            {siteNavigation.map((item, index) => (
              <div
                key={item.label}
                className={`border-b border-[#182019]/12 px-0 py-5 sm:px-6 sm:py-6 lg:min-h-[180px] lg:px-7 lg:py-7 ${
                  index % 2 === 1 ? "sm:border-l sm:border-[#182019]/12" : ""
                } ${index % 4 !== 0 ? "lg:border-l lg:border-[#182019]/12" : "lg:border-l-0"}`}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className="inline-flex text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors hover:text-[#5c6f58]"
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
                        className="text-sm leading-6 text-[#182019]/62 transition-colors hover:text-[#182019]"
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
