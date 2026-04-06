// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { Analytics } from "@vercel/analytics/next";
import { siteUrl, siteLogoUrl, ogImage, siteName, siteDescription, htmlLang } from "@/lib/siteConfig";
import { pageAlternates } from "@/lib/seo";

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
  metadataBase: new URL(siteUrl),
  title: "Origin Coffee Cambodia | OCC",
  description: siteDescription,
  keywords: ["Wholesale coffee beans Cambodia", "Specialty coffee B2B", "Mondulkiri Arabica", "Precision Roasting"],
  alternates: pageAlternates("/"),
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    locale: "en_KH",
    images: [{ url: ogImage, width: 180, height: 180, alt: siteName }],
  },
  twitter: {
    card: "summary_large_image",
    images: [ogImage],
  },
};

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={htmlLang} className={`${inter.variable} ${cormorant.variable}`}>
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
        {gaMeasurementId ? <GoogleAnalytics measurementId={gaMeasurementId} /> : null}

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
              "logo": siteLogoUrl,
              "description": "Specialty coffee B2B supplier and technical roasting authority in Cambodia.",
              "areaServed": {
                "@type": "Country",
                "name": "Cambodia",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
