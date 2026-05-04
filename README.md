# SEO 網站

一個使用 Next.js 和 Tailwind CSS 構建的現代 SEO 優化網站。

## 功能特性

- 📱 響應式設計（Tailwind CSS）
- 📊 Google Analytics 4 集成
- 📝 Blog 功能（使用 Airtable）
- 🌓 深色模式支持
- ⚡ 靜態生成優化
- 🔍 SEO 優化

## 快速開始

### 安裝依賴

```bash
npm install
```

### 環境配置

複製 `.env.example` 為 `.env.local` 並填入相應的值：

```bash
cp .env.example .env.local
```

需要配置：
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics 4 Measurement ID
- `AIRTABLE_TOKEN` 或 `AIRTABLE_API_KEY` - Airtable 認證令牌
- `AIRTABLE_BASE_ID` - Airtable Base ID

### 開發服務器

```bash
npm run dev
```

訪問 `http://localhost:3000` 查看應用。

### 構建生產版本

```bash
npm run build
npm start
```

## 技術棧

- **Framework**: Next.js 16.2.4
- **Styling**: Tailwind CSS 4.2.4
- **UI Components**: Radix UI, shadcn/ui
- **Forms**: React Hook Form + Zod
- **CMS**: Airtable API
- **Analytics**: Vercel Analytics + Google Analytics 4

## 項目結構

```
├── app/               # Next.js 應用路由
├── components/        # React 組件
├── lib/              # 工具函數
├── public/           # 靜態資源
├── styles/           # CSS 樣式
└── proxy.ts          # API 代理配置
```

## 已知問題

- **安全漏洞**: PostCSS XSS 漏洞 (等待 Next.js 官方修復)
  - 需要 Next.js 16.3.0+ 穩定版本
  - 目前使用版本: 16.2.4 (最新穩定版)

## 許可證

MIT
