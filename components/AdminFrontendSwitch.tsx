"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminFrontendSwitch() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <Link
      href="/admin"
      className="fixed bottom-5 right-5 z-[80] rounded-full border border-gray-900 bg-gray-900 px-4 py-2.5 text-[11px] font-semibold tracking-[0.14em] text-white shadow-sm transition-colors hover:bg-white hover:text-gray-900"
      aria-label="Go to admin"
    >
      ADMIN ↗
    </Link>
  );
}
