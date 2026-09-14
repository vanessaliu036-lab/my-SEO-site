import Link from "next/link"
import { siteNavigation } from "@/components/site/navigation-data"

const groupedItems = siteNavigation.filter((item) => item.children?.length)
const utilityItems = siteNavigation.filter((item) => !item.children?.length)

export function SiteFooter() {
  return (
    <footer className="border-t border-[#182019]/10 bg-[#efe9dc] text-[#182019]">
      <div className="mx-auto w-full max-w-[1680px] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1.85fr] lg:gap-16">
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

          <nav className="grid grid-cols-1 gap-10 sm:grid-cols-3" aria-label="Footer navigation">
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

        <div className="mt-14 flex flex-col gap-6 border-t border-[#182019]/12 pt-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {utilityItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#182019]/62 transition-colors hover:text-[#182019]"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <p className="text-[10px] uppercase tracking-[0.14em] text-[#182019]/45">
            © 2026 Origin Coffee Cambodia
          </p>
        </div>
      </div>
    </footer>
  )
}
