import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "404 | Page Not Found | Origin Coffee Cambodia",
  description: "The requested OCC page is unavailable. Find Cambodian coffee, Fine Robusta research, wholesale sourcing and contact information.",
  robots: { index: false, follow: true },
}

const recoveryLinks = [
  { href: "/", title: "Home", description: "Explore Origin Coffee Cambodia." },
  { href: "/fine-robusta-cambodia", title: "Fine Robusta", description: "Discover origin, quality and sourcing." },
  { href: "/blog", title: "Research Journal", description: "Find OCC coffee articles and research." },
  { href: "/solutions/wholesale", title: "Wholesale & Sourcing", description: "Explore coffee supply for buyers." },
  { href: "/contact", title: "Contact OCC", description: "Ask us for the page or information you need." },
] as const

export default function NotFound() {
  return (
    <main className="min-h-[75svh] bg-[#f6f3ea] px-6 py-24 text-stone-950 sm:px-8" aria-labelledby="not-found-heading">
      <div className="mx-auto max-w-5xl">
        <p className="mb-5 text-xs font-medium uppercase tracking-[0.3em] text-[#7a1118]">Origin Coffee Cambodia / 404</p>
        <h1 id="not-found-heading" className="max-w-3xl text-4xl leading-tight sm:text-6xl">This page could not be found.</h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-stone-600">The link may have changed or the address may be incorrect. Continue with one of the destinations below, or contact us for help.</p>
        <nav aria-label="Find your next page" className="mt-12 grid gap-3 sm:grid-cols-2">
          {recoveryLinks.map((item) => (
            <Link key={item.href} href={item.href} className="group border border-stone-300 bg-white px-6 py-5 transition-colors hover:border-stone-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7a1118]">
              <span className="flex items-center justify-between text-lg font-medium">{item.title}<span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span></span>
              <span className="mt-2 block text-sm leading-6 text-stone-600">{item.description}</span>
            </Link>
          ))}
        </nav>
      </div>
    </main>
  )
}
