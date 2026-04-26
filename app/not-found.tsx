import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Page Not Found | Origin Coffee Cambodia",
  description: "The page you are looking for does not exist. Return to Origin Coffee Cambodia.",
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-8">
      <div className="max-w-md text-center">
        <p className="text-[10px] tracking-[0.5em] text-gray-400 uppercase mb-6">
          404 — Page Not Found
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-light text-gray-900 mb-6">
          Nothing Here
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-block bg-gray-900 text-white px-8 py-3 text-xs tracking-widest uppercase hover:bg-gray-800 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/blog"
            className="inline-block border border-gray-300 text-gray-700 px-8 py-3 text-xs tracking-widest uppercase hover:border-gray-900 hover:text-gray-900 transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="inline-block border border-gray-300 text-gray-700 px-8 py-3 text-xs tracking-widest uppercase hover:border-gray-900 hover:text-gray-900 transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  )
}
