// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { Analytics } from "@vercel/analytics/react";
import { siteUrl } from "@/lib/siteConfig";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Origin Coffee Cambodia | OCC",
  description: "Specialty coffee B2B supplier in Cambodia. Engineering consistency and digital sovereignty.",
  keywords: ["Wholesale coffee beans Cambodia", "Specialty coffee B2B", "Mondulkiri Arabica", "Precision Roasting"],
  alternates: {
    canonical: siteUrl,
  },
};

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
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

        {/* 固定右側裝飾 */}
        <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-20 hidden md:flex" aria-hidden="true">
          <div className="w-px h-12 bg-gray-300" />
          <span className="text-[10px] text-gray-400 [writing-mode:vertical-lr] tracking-widest">OCC</span>
          <div className="w-px h-12 bg-gray-300" />
        </div>

        <Analytics />
        {gaMeasurementId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}');
              `}
            </Script>
          </>
        ) : null}

        {/* SEO / GEO 數據標註 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Origin Coffee Cambodia",
              "alternateName": "OCC",
              "url": siteUrl,
              "logo": `${siteUrl}/logo.png`,
              "description": "Specialty coffee B2B supplier and technical roasting authority in Cambodia.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Phnom Penh",
                "addressCountry": "Cambodia"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": `${siteUrl}/blog?q={search_term_string}`
                },
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
      </body>
    </html>
  );
}
