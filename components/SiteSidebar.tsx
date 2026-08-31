"use client";

import { usePathname } from "next/navigation";
import Navigation from "@/components/Navigation";

/**
 * 左側全站導覽欄。首頁（"/"）採滿版視覺，隱藏側欄；其餘頁面維持原本側欄。
 */
export default function SiteSidebar() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <aside className="w-full md:w-80 lg:w-96 md:h-screen md:sticky md:top-0 overflow-y-auto bg-transparent z-30">
      <Navigation />
    </aside>
  );
}
