// app/layout.tsx
import type { Metadata } from "next";
import { Fraunces, Montserrat } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import { siteUrl, siteLogoUrl, ogImage, siteName, siteDescription, htmlLang } from "@/lib/siteConfig";
import { pageAlternates } from "@/lib/seo";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Origin Coffee Cambodia | Fine Robusta Beans & Specialty Coffee Supplier",
  description: siteDescription,
  keywords: [
    "Fine Robusta",
    "Fine Robusta Coffee",
    "Fine Robusta Cambodia",
    "Specialty Robusta",
    "Coffea canephora",
    "Cambodian Coffee",
    "Cambodia Coffee Supplier",
    "Specialty Coffee Supplier Cambodia",
    "Cambodia Coffee Beans",
    "Cambodian Coffee Beans",
    "Mondulkiri Coffee",
    "Mondulkiri Coffee Beans",
    "Coffee Sourcing Cambodia",
    "Wholesale Coffee Cambodia",
    "B2B Coffee Supply",
    "Coffee Roasting Cambodia",
    "Coffee Quality Standards",
    "Coffee Processing",
    "Coffee Sensory Evaluation",
  ],
  alternates: pageAlternates("/"),
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    locale: "en_KH",
    images: [{ url: ogImage, alt: "Origin Coffee Cambodia Fine Robusta and specialty coffee supply" }],
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

const typographyCss = `
  :root {
    --occ-font-title: var(--font-sans);
    --occ-font-subtitle: var(--font-sans);
    --occ-font-body: var(--font-serif);
    --font-display: var(--font-sans);
  }

  html,
  body {
    font-family: var(--occ-font-body), Georgia, serif !important;
  }

  body,
  p,
  span,
  a,
  li,
  dd,
  dt,
  small,
  strong,
  em,
  blockquote,
  table,
  thead,
  tbody,
  tr,
  th,
  td,
  input,
  textarea,
  select,
  option {
    font-family: var(--occ-font-body), Georgia, serif !important;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  [data-occ-type="title"] {
    font-family: var(--occ-font-title), Arial, sans-serif !important;
    font-style: normal !important;
    font-feature-settings: "liga" 1, "kern" 1;
    text-rendering: optimizeLegibility;
  }

  h1,
  h2,
  [data-occ-type="title"] {
    font-weight: 600 !important;
  }

  h3,
  h4,
  h5,
  h6 {
    font-weight: 600 !important;
  }

  nav,
  label,
  legend,
  button,
  [role="button"],
  .occ-eyebrow,
  [data-occ-type="subtitle"],
  [class*="uppercase"][class*="tracking-"] {
    font-family: var(--occ-font-subtitle), system-ui, sans-serif !important;
    font-weight: 500 !important;
  }
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={htmlLang} data-scroll-behavior="smooth" className={`${montserrat.variable} ${fraunces.variable}`}>
      <head>
        <style id="occ-typography-system">{typographyCss}</style>
      </head>
      <body className="font-sans antialiased">
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
                "Coffee Sourcing",
                "Wholesale Coffee Supply",
                "B2B Coffee Solutions",
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
