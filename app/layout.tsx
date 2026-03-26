import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={`${inter.className} bg-[#F8F9FA] text-gray-900 antialiased`}>
        {/* 全站統一導航結構 */}
        <div className="flex flex-col md:flex-row min-h-screen">
          
          {/* 左側/側邊導航欄 (基於您提供的截圖風格) */}
          <aside className="w-full md:w-80 lg:w-96 md:h-screen md:sticky md:top-0 overflow-y-auto border-r border-gray-200 bg-white z-30">
            <Navigation />
          </aside>

          {/* 右側內容區塊 */}
          <main className="flex-1 relative">
            {children}
          </main>
          
        </div>

        {/* SEO / GEO 數據標註 (全站通用實體) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Origin Coffee Crafter",
              "alternateName": "OCC",
              "url": "https://yourdomain.com",
              "logo": "https://yourdomain.com/logo.png",
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