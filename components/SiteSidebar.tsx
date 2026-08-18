"use client";

import { usePathname } from "next/navigation";
import Navigation from "@/components/Navigation";

/**
 * 左側全站導覽欄。首頁與 /admin 後台採滿版視覺，隱藏前台側欄。
 */
export default function SiteSidebar() {
  const pathname = usePathname();
  if (pathname === "/" || pathname.startsWith("/admin")) return null;

  return (
    <aside className="w-full md:w-80 lg:w-96 md:h-screen md:sticky md:top-0 overflow-y-auto bg-transparent z-30">
      <Navigation />
    </aside>
  );
}
