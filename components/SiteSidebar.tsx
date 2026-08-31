"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";

/**
 * 左側全站導覽欄。首頁（"/"）採滿版視覺，隱藏側欄；其餘頁面維持原本側欄。
 */
export default function SiteSidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  if (pathname === "/") return null;

  return (
    <>
      <div className="md:hidden sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="flex h-16 items-center justify-between px-5">
          <Link href="/" className="text-xl font-bold tracking-tighter" aria-label="Origin Coffee Cambodia home">
            OCC
          </Link>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={isMobileMenuOpen}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-full border border-gray-300 text-[11px] font-medium tracking-[0.2em] text-gray-700"
          >
            MENU
          </button>
        </div>
      </div>

      {isMobileMenuOpen ? (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-white overscroll-contain">
          <div className="min-h-[100svh] px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))]">
            <div className="flex items-center justify-between border-b border-gray-200 pb-5">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xl font-bold tracking-tighter"
              >
                OCC
              </Link>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 text-2xl leading-none text-gray-800"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <Navigation onNavigate={() => setIsMobileMenuOpen(false)} />
          </div>
        </div>
      ) : null}

      <aside className="hidden w-full md:block md:w-80 lg:w-96 md:h-screen md:sticky md:top-0 overflow-y-auto bg-transparent z-30">
      <Navigation />
      </aside>
    </>
  );
}
