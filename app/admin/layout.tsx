import type { Metadata } from 'next'
import Link from 'next/link'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'OCC Staff | Demo workspace',
  robots: { index: false, follow: false, nocache: true },
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-300 bg-amber-50 px-5 py-3 text-xs text-amber-950 md:px-10">
        <strong className="tracking-[0.12em]">DEMO DATA · NOT LIVE · NO AIRTABLE WRITES</strong>
        <nav aria-label="Admin demo navigation" className="flex flex-wrap gap-5 underline underline-offset-4">
          <Link href="/admin">Original dashboard</Link>
          <Link href="/admin/leads">B2B lead form lab</Link>
        </nav>
      </div>
      {children}
    </div>
  )
}
