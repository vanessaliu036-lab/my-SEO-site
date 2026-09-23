import Link from "next/link"

const recoveryLinks = [
  { href: "/origins", label: "Explore Cambodian origins", detail: "Meet the coffees and places behind them." },
  { href: "/solutions/wholesale", label: "Wholesale & sourcing", detail: "Find the right route for your coffee supply needs." },
  { href: "/blog", label: "Read the journal", detail: "Browse coffee guides, research, and stories." },
  { href: "/contact", label: "Contact OCC", detail: "Tell us what you were trying to find." },
]

export function NotFoundContent() {
  return (
    <section className="relative isolate flex min-h-[68vh] items-center overflow-hidden border-b border-occ-primary/10 px-5 py-20 sm:px-8 lg:px-12">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-1/2 -z-10 size-[min(75vw,42rem)] -translate-y-1/2 rounded-full border border-occ-primary/10 sm:right-0" />
      <div aria-hidden="true" className="pointer-events-none absolute right-[8%] top-1/2 -z-10 size-[min(55vw,30rem)] -translate-y-1/2 rounded-full border border-occ-primary/10" />

      <div className="mx-auto grid w-full max-w-[1180px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
        <div>
          <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.24em] text-occ-burgundy">Origin Coffee Cambodia · 404</p>
          <h1 className="max-w-[660px] text-5xl leading-[0.98] text-occ-primary sm:text-6xl lg:text-7xl">This page isn’t here.</h1>
          <p className="mt-7 max-w-[520px] text-base leading-8 text-occ-secondary">
            The link may be out of date, or the address may have a small typo. Let’s get you back to something useful.
          </p>
          <Link
            href="/"
            className="mt-9 inline-flex min-h-12 items-center justify-center bg-occ-primary px-6 py-3 text-[10px] font-medium uppercase tracking-[0.18em] text-occ-background transition-colors hover:bg-occ-burgundy focus-visible:outline-offset-4"
          >
            Return to the homepage
          </Link>
        </div>

        <nav aria-label="Helpful pages" className="border-y border-occ-primary/15">
          <p className="border-b border-occ-primary/15 py-4 text-[10px] font-medium uppercase tracking-[0.2em] text-occ-secondary">Or continue exploring</p>
          {recoveryLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className="group grid gap-1 border-b border-occ-primary/10 py-5 transition-colors last:border-b-0 hover:bg-white/50 sm:grid-cols-[2rem_1fr_auto] sm:items-center sm:gap-4 sm:px-3"
            >
              <span className="text-[10px] tracking-[0.16em] text-occ-burgundy">0{index + 1}</span>
              <span>
                <span className="block text-sm font-medium text-occ-primary group-hover:text-occ-burgundy">{link.label}</span>
                <span className="mt-1 block text-xs leading-6 text-occ-secondary">{link.detail}</span>
              </span>
              <span aria-hidden="true" className="hidden text-lg text-occ-secondary transition-transform group-hover:translate-x-1 sm:block">→</span>
            </Link>
          ))}
        </nav>
      </div>
    </section>
  )
}
