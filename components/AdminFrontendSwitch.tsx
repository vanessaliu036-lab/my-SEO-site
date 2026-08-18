"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminFrontendSwitch() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <Link
      href={isAdmin ? "/" : "/admin"}
      className={`fixed z-[80] rounded-full border px-4 py-2.5 text-[11px] font-semibold tracking-[0.14em] shadow-sm transition-colors ${
        isAdmin
          ? "right-5 top-5 border-[#dfe3e8] bg-white text-[#121826] hover:bg-[#121826] hover:text-white"
          : "right-5 bottom-5 border-gray-900 bg-gray-900 text-white hover:bg-white hover:text-gray-900"
      }`}
      aria-label={isAdmin ? "Go to frontend" : "Go to admin"}
    >
      {isAdmin ? "FRONTEND ↗" : "ADMIN ↗"}
    </Link>
  );
}
