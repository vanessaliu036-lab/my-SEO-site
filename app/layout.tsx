import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  // 🔧 請替換為實際網域
  metadataBase: new URL('https://你的網域.com'),
  title: {
    // 🔧 請替換為網站名稱
    template: '%s | 網站名稱',
    // 🔧 請替換為網站名稱
    default: '網站名稱 - 預設標題',
  },
  // 🔧 請填入網站描述
  description: '網站描述，約 150-160 個字元',
  keywords: ['關鍵字1', '關鍵字2', '關鍵字3', '關鍵字4'],
  authors: [{ name: '作者或公司名稱' }],
  creator: '創作者名稱',
  publisher: '發行者名稱',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  generator: 'v0.app',
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    alternateLocale: ['zh_CN', 'en_US'],
    // 🔧 請替換為實際網域
    url: 'https://你的網域.com',
    // 🔧 請替換為網站名稱
    siteName: '網站名稱',
    // 🔧 請替換為網站名稱
    title: '網站名稱 - 預設標題',
    // 🔧 請填入網站描述
    description: '請填入網站描述，約150-160個字元',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Open Graph 圖片描述',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@你的Twitter帳號',
    creator: '@創作者Twitter帳號',
    // 🔧 請替換為網站名稱
    title: '網站名稱 - 預設標題',
    // 🔧 請填入網站描述
    description: '請填入網站描述',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '你的Google Search Console驗證碼',
    // yandex: '你的Yandex驗證碼',
    // me: '你的驗證連結',
  },
  alternates: {
    // 🔧 請替換為實際網域
    canonical: 'https://你的網域.com',
    languages: {
      'zh-TW': 'https://你的網域.com/zh-TW',
      'zh-CN': 'https://你的網域.com/zh-CN',
      'en-US': 'https://你的網域.com/en-US',
    },
  },
  category: '網站類別',
  classification: '網站分類',
  referrer: 'origin-when-cross-origin',
  manifest: '/manifest.json',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-Hant">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
