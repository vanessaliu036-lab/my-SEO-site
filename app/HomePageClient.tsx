"use client"

import Link from "next/link"
import { useState } from "react"

export default function HomePageClient() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isShareOpen, setIsShareOpen] = useState(false)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
    } catch (err) {
      console.error("Failed to copy link:", err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 relative overflow-hidden">
      {/* Top Navigation */}
      <div className="absolute top-8 left-8 z-20">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-600 text-sm font-medium tracking-wider hover:text-gray-800 transition-colors"
        >
          MENU
        </button>
      </div>

      <div className="absolute top-8 right-8 z-20">
        <button
          onClick={() => setIsShareOpen(!isShareOpen)}
          className="text-gray-600 text-sm font-medium tracking-wider hover:text-gray-800 transition-colors"
        >
          SHARE
        </button>
      </div>

      {isShareOpen && (
        <div className="fixed inset-0 bg-gray-100/95 backdrop-blur-sm z-40 flex items-center justify-center pointer-events-auto">
          <div className="max-w-md w-full px-8">
            <div className="space-y-12">
              {/* Close button */}
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 tracking-wider">SHARE</h2>
                <button onClick={() => setIsShareOpen(false)} className="text-gray-600 hover:text-gray-800 text-2xl">
                  ✕
                </button>
              </div>

              {/* Share Options */}
              <div className="space-y-6">
                <button
                  onClick={() =>
                    window.open(
                      `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`,
                      "_blank",
                    )
                  }
                  className="w-full text-left border-b border-gray-300 pb-4 hover:border-gray-400 transition-colors group"
                >
                  <h3 className="text-lg font-medium text-gray-800 tracking-wide mb-1 group-hover:text-gray-900">
                    Broadcast
                  </h3>
                  <p className="text-gray-600 text-sm tracking-wide">→ Twitter</p>
                </button>

                <button
                  onClick={() =>
                    window.open(
                      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
                      "_blank",
                    )
                  }
                  className="w-full text-left border-b border-gray-300 pb-4 hover:border-gray-400 transition-colors group"
                >
                  <h3 className="text-lg font-medium text-gray-800 tracking-wide mb-1 group-hover:text-gray-900">
                    Upload to Grid
                  </h3>
                  <p className="text-gray-600 text-sm tracking-wide">→ LinkedIn</p>
                </button>

                <button
                  onClick={() =>
                    window.open(
                      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
                      "_blank",
                    )
                  }
                  className="w-full text-left border-b border-gray-300 pb-4 hover:border-gray-400 transition-colors group"
                >
                  <h3 className="text-lg font-medium text-gray-800 tracking-wide mb-1 group-hover:text-gray-900">
                    Echo in Void
                  </h3>
                  <p className="text-gray-600 text-sm tracking-wide">→ Facebook</p>
                </button>

                <button
                  onClick={handleCopyLink}
                  className="w-full text-left pb-4 hover:text-gray-900 transition-colors group"
                >
                  <h3 className="text-lg font-medium text-gray-800 tracking-wide mb-1 group-hover:text-gray-900">
                    Replicate Signal
                  </h3>
                  <p className="text-gray-600 text-sm tracking-wide">→ Copy Link</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isMenuOpen && (
        <div className="fixed inset-0 bg-gray-100/95 backdrop-blur-sm z-40 flex items-center justify-center pointer-events-auto">
          <div className="max-w-2xl w-full px-8">
            <div className="space-y-12">
              {/* Close button */}
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 tracking-wider">NAVIGATION</h2>
                <button onClick={() => setIsMenuOpen(false)} className="text-gray-600 hover:text-gray-800 text-2xl">
                  ✕
                </button>
              </div>

              {/* Menu Items */}
              <div className="space-y-8">
                <Link
                  href="/about"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-left border-b border-gray-300 pb-6 transition-colors hover:border-gray-400"
                >
                  <h3 className="text-xl font-medium text-gray-800 tracking-wide mb-2">About</h3>
                  <p className="text-gray-600 text-sm tracking-wide">philosophy, mission, manifesto</p>
                </Link>

                <Link
                  href="/vision"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-left border-b border-gray-300 pb-6 transition-colors hover:border-gray-400"
                >
                  <h3 className="text-xl font-medium text-gray-800 tracking-wide mb-2">Vision</h3>
                  <p className="text-gray-600 text-sm tracking-wide">overview, philosophy, the big idea</p>
                </Link>

                <Link
                  href="/solutions/wholesale"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-left border-b border-gray-300 pb-6 transition-colors hover:border-gray-400"
                >
                  <h3 className="text-xl font-medium text-gray-800 tracking-wide mb-2">Wholesale</h3>
                  <p className="text-gray-600 text-sm tracking-wide">B2B coffee supply, Phnom Penh &amp; Cambodia</p>
                </Link>

                <Link
                  href="/system"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-left border-b border-gray-300 pb-6 transition-colors hover:border-gray-400"
                >
                  <h3 className="text-xl font-medium text-gray-800 tracking-wide mb-2">System</h3>
                  <p className="text-gray-600 text-sm tracking-wide">methodology, process, frameworks</p>
                </Link>

                <Link
                  href="/archive"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-left border-b border-gray-300 pb-6 transition-colors hover:border-gray-400"
                >
                  <h3 className="text-xl font-medium text-gray-800 tracking-wide mb-2">Archive</h3>
                  <p className="text-gray-600 text-sm tracking-wide">past projects, experiments, case studies</p>
                </Link>

                <Link
                  href="/matter"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-left border-b border-gray-300 pb-6 transition-colors hover:border-gray-400"
                >
                  <h3 className="text-xl font-medium text-gray-800 tracking-wide mb-2">Matter</h3>
                  <p className="text-gray-600 text-sm tracking-wide">resources, tools, downloads</p>
                </Link>

                <Link
                  href="/signal"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-left border-b border-gray-300 pb-6 transition-colors hover:border-gray-400"
                >
                  <h3 className="text-xl font-medium text-gray-800 tracking-wide mb-2">Signal</h3>
                  <p className="text-gray-600 text-sm tracking-wide">blog, updates, publications</p>
                </Link>

                <Link
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-left pb-6 transition-colors hover:text-gray-900"
                >
                  <h3 className="text-xl font-medium text-gray-800 tracking-wide mb-2">Contact</h3>
                  <p className="text-gray-600 text-sm tracking-wide">connect, collaborate, reach out</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Container */}
      <div className="relative w-full h-screen flex items-center justify-center">
        {/* Large Background Circles */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gray-200/50 -translate-x-1/2"></div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-dashed border-gray-400 -translate-x-1/4"></div>

        {/* Vertical DESIGN Text */}
        <div className="absolute left-16 top-1/2 -translate-y-1/2 -rotate-90 origin-center">
          <h1 className="text-6xl font-bold text-gray-800 tracking-wider">DESIGN</h1>
        </div>

        {/* Central Geometric Object */}
        <div className="relative z-10">
          <div className="w-48 h-64 bg-gray-900 transform rotate-12 relative">
            <div className="absolute inset-0 bg-gray-800 transform -skew-x-12 skew-y-6"></div>
            <div className="absolute inset-0 bg-gray-700 transform skew-x-6 -skew-y-3 translate-x-4"></div>
            <div className="absolute inset-0 bg-gray-900 transform -skew-x-6 skew-y-12 translate-y-2"></div>
            <div className="absolute top-0 left-1/2 w-0 h-0 border-l-12 border-r-12 border-b-16 border-l-transparent border-r-transparent border-b-gray-800 -translate-x-1/2 -translate-y-4"></div>
          </div>
        </div>

        <div className="absolute left-1/3 top-1/3 w-[152px] h-[152px] opacity-40 [background-image:radial-gradient(#9ca3af_1px,transparent_1px)] [background-size:20px_20px]" aria-hidden="true" />

        <div className="absolute top-16 left-1/2 -translate-x-1/2 text-gray-600 text-xl">✕✕</div>
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-gray-600 text-xl">✕✕</div>

        <div className="absolute right-16 top-1/2 -translate-y-1/2">
          <div className="border border-gray-600 px-4 py-8 rotate-90">
            <span className="text-gray-600 text-xs font-medium tracking-widest">PRODUCT</span>
          </div>
        </div>

        <div className="absolute top-1/4 right-1/4 w-32 h-px border-t border-dashed border-gray-400 rotate-45"></div>
        <div className="absolute bottom-1/3 left-1/3 w-24 h-px border-t border-dashed border-gray-400 -rotate-12"></div>
      </div>

      <div className="absolute bottom-16 left-8">
        <div className="space-y-2">
          <h2 className="text-gray-800 text-lg font-medium tracking-wider">VISUAL SYSTEM</h2>
          <p className="text-gray-600 text-sm tracking-wide">CREATE VISION</p>
        </div>
      </div>

      <div className="absolute bottom-16 right-8">
        <div className="flex items-center gap-2">
          <span className="text-gray-600 text-sm font-medium tracking-wider">NEXT</span>
          <span className="text-gray-600 text-lg">→</span>
        </div>
      </div>

      <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        <div className="w-px h-4 bg-gray-400"></div>
        <div className="w-px h-4 bg-gray-400"></div>
        <div className="w-px h-4 bg-gray-400"></div>
      </div>
    </div>
  )
}
