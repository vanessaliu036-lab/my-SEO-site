// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
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
  title: "Origin Coffee Cambodia | Coffee Research & Fine Robusta Knowledge",
  description: siteDescription,
  keywords: [
    "Fine Robusta",
    "Fine Robusta Coffee",
    "Fine Robusta Cambodia",
    "Specialty Robusta",
    "Coffea canephora",
    "Cambodian Coffee",
    "Cambodia Coffee Research",
    "Coffee Quality Institute Fine Robusta",
    "CQI Fine Robusta Standards",
    "Robusta Grading",
    "Coffee Processing",
    "Coffee Fermentation",
    "Coffee Drying",
    "Coffee Roasting",
    "Coffee Sensory Evaluation",
    "Coffee Quality Standards",
    "Mondulkiri Coffee",
    "Cambodian Coffee Industry",
    "Coffee Origin Research",
  ],
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
    site: "@OCCoffeeKh",
    creator: "@OCCoffeeKh",
    images: [ogImage],
  },
};

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const organizationId = `${siteUrl}/#organization`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={htmlLang} className={`${inter.variable} ${cormorant.variable}`}>
      <body className="font-sans bg-white text-gray-900 antialiased">
        {children}

        <Analytics />
        {gaMeasurementId ? <GoogleAnalytics measurementId={gaMeasurementId} /> : null}

        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "xjlld0s2hz");`,
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": organizationId,
              "name": "Origin Coffee Cambodia",
              "alternateName": "OCC",
              "url": siteUrl,
              "logo": siteLogoUrl,
              "description": siteDescription,
              "areaServed": {
                "@type": "Country",
                "name": "Cambodia",
              },
              "knowsAbout": [
                "Fine Robusta",
                "Coffea canephora",
                "Cambodian Coffee",
                "Coffee Quality Standards",
                "Coffee Processing",
                "Coffee Fermentation",
                "Coffee Drying",
                "Coffee Roasting",
                "Coffee Sensory Evaluation",
                "Mondulkiri Coffee",
                "Cambodian Coffee Industry",
                "Coffee Origin Research",
              ],
              "sameAs": [
                "https://www.linkedin.com/company/origin-coffee-cambodia",
                "https://www.facebook.com/origincoffeecambodia",
                "https://www.instagram.com/origin.coffee.cambodia",
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "general inquiries",
                "url": `${siteUrl}/contact`,
                "availableLanguage": ["English", "Khmer"],
              },
              "subjectOf": [
                { "@id": `${siteUrl}/#webpage` },
                { "@id": `${siteUrl}/blog#blog` },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
