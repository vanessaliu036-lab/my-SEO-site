// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { Analytics } from "@vercel/analytics/react";
import { siteUrl } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Origin Coffee Crafter | OCC",
  description: "Specialty coffee B2B supplier in Cambodia. Engineering consistency and digital sovereignty.",
  keywords: ["Wholesale coffee beans Cambodia", "Specialty coffee B2B", "Mondulkiri Arabica", "Precision Roasting"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-white text-gray-900 antialiased">
        {/* 全版面設計：左側導航欄無背景色 */}
        <div className="flex flex-col md:flex-row min-h-screen">
          
          {/* 左側導航欄 - 移除背景色和邊框 */}
          <aside className="w-full md:w-80 lg:w-96 md:h-screen md:sticky md:top-0 overflow-y-auto bg-transparent z-30">
            <Navigation />
          </aside>

          {/* 右側內容區塊 */}
          <main className="flex-1 relative bg-white">
            {children}
          </main>
          
        </div>

        <Analytics />

        {/* SEO / GEO 數據標註 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Origin Coffee Crafter",
              "alternateName": "OCC",
              "url": siteUrl,
              "logo": `${siteUrl}/logo.png`,
              "description": "Specialty coffee B2B supplier and technical roasting authority in Cambodia.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Phnom Penh",
                "addressCountry": "Cambodia"
              }
            }),
          }}
        />
      </body>
    </html>
  );
}