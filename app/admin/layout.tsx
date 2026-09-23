import type { Metadata } from 'next'
import Link from 'next/link'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'OCC Staff | Order & Contact Inbox',
  robots: { index: false, follow: false, nocache: true },
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-200 bg-emerald-50 px-5 py-3 text-xs text-emerald-950 md:px-10">
        <strong className="tracking-[0.12em]">STAFF WORKSPACE · ORDER + CONTACT INBOX LIVE</strong>
        <nav aria-label="Admin navigation" className="flex flex-wrap gap-5 underline underline-offset-4">
          <Link href="/admin">Operations</Link>
          <Link href="/admin?view=order-inbox">Order inbox</Link>
          <Link href="/admin?view=contact-inquiries">Contact inquiries</Link>
        </nav>
      </div>
      {children}
    </div>
  )
}
