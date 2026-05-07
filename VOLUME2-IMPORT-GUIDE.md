# Origin Coffee Cambodia - Volume 2 文章導入指南

## 概述

這份文件包含 **30 篇新文章**，分成 6 個關鍵字集群 (A–F)，針對 Origin Coffee Cambodia (OCC) 的 SEO 優化。

## 文件清單

### 1. **OCC-Volume2-Articles.csv** ✅
- 30 篇文章的基本信息（可直接導入 Airtable）
- 包含欄位：Title、Slug、Publish Date、Author、Summary、Category、Status
- **狀態**：已準備導入

### 2. **articles-volume2-import.json** (部分)
- 前 10 篇文章的完整 JSON 格式，含完整內容
- 可用於備份或 API 集成

## 如何導入到 Airtable

### 方法 A: 使用 CSV 導入（推薦）

1. 打開您的 Airtable workspace
2. 進入 **OCC_Blog_Posts** 表
3. 點擊 **Add** → **Import CSV**
4. 上傳 `OCC-Volume2-Articles.csv` 文件
5. 映射欄位：
   - Title → Title
   - Slug → Slug
   - Publish Date → Publish Date
   - Author → Author
   - Summary → Summary
   - Category → Category
   - Status → Status (設置為 "Publish")

### 方法 B: 手動逐個添加

1. 在 Airtable 中打開 **OCC_Blog_Posts** 表
2. 對每篇文章（在 CSV 中），創建新記錄並填入：
   - 所有必需欄位（見下文）
   - 完整的文章內容（從 ARTICLE 01-30 部分複製）
   - 設置 Status 為 "Publish"

## 必需 Airtable 欄位

根據 `lib/airtable.ts`，以下欄位是必需的：

| 欄位名 | 類型 | 必需 | 說明 |
|-------|------|------|------|
| **Title** | Text | ✅ | 文章標題 |
| **Slug** | Text | ✅ | URL slug (如 cambodia-coffee-beans-online) |
| **Publish Date** | Date | ✅ | 發布日期 (格式: 2025-05-07) |
| **Author** | Text | ✅ | 作者 (使用 "OCC Team") |
| **Summary** | Long Text | ✅ | Meta description (~155 字) |
| **Category** | Select | ⚠️ | 文章分類 |
| **Content** | Long Text | ✅ | 完整文章內容 (Markdown 或 HTML) |
| **Keywords** | Text | ⚠️ | SEO 關鍵詞 (逗號分隔) |
| **Excerpt** | Text | ⚠️ | 摘錄文本 |
| **Featured Image URL** | Text | ⚠️ | 特色圖片 URL |
| **Status** | Select | ✅ | 必須設置為 "Publish" 才能顯示 |

## 文章分類

導入時，請使用以下分類（根據 CSV 中的 Category 欄）：

| 集群 | 分類 | 文章數 |
|-----|------|--------|
| **A** | Product & Ordering | 4 |
| **A** | B2B Trade | 7 |
| **B** | Brand | 1 |
| **C** | Education | 6 |
| **D** | Travel & Local | 4 |
| **D** | Culture | 1 |
| **E** | B2B Trade | 3 |
| **E** | Sustainability | 1 |
| **F** | Comparison | 2 |
| **F** | Ranking | 1 |
| **F** | Geography | 1 |

## 文章內容來源

所有 30 篇文章的完整內容可在原始提案文檔中找到：

**ARTICLE 01** → Cambodia Coffee Beans Online  
**ARTICLE 02** → Robusta Coffee Beans Cambodia  
**ARTICLE 03** → Single Origin Coffee Cambodia  
...以此類推到  
**ARTICLE 30** → Full Body Coffee Single Origin

複製相應的 ARTICLE 部分內容到 Airtable 的 **Content** 欄。

## 內部鏈接建議

每篇文章應包含指向相關文章的內部鏈接：

- 文章 01-05 應鏈接到文章 06-10
- 文章 11-15 應鏈接到文章 16-20
- 文章 21-25 應鏈接到文章 26-30
- 所有文章應鏈接回主要 OCC 頁面

## SEO 最佳實踐

### Meta 標籤
- **Meta Title**: ~60 字符（已在 CSV 的 Title 欄中）
- **Meta Description**: 應與 Summary 欄匹配，~155 字符
- **Keywords**: 列在 CSV 的 Keywords 欄中

### URL 結構
- 所有 slug 已使用小寫連字符格式（如 `cambodia-coffee-beans-online`）
- URL 將自動生成為 `/blog/[slug]`

### 內容優化
- 每篇文章已針對主要關鍵詞進行優化
- 包含相關的長尾關鍵詞
- 適合 AI Overview、People Also Ask 等特色片段

## 導入後的步驟

1. ✅ 驗證所有 30 篇文章都顯示在 `/blog` 頁面
2. ✅ 檢查每篇文章的元數據是否正確顯示
3. ✅ 驗證內部鏈接是否正常工作
4. ✅ 提交網站地圖到 Google Search Console
5. ✅ 監控 Google Analytics 中的文章流量

## 技術細節

### Airtable 配置

確保您的 Airtable 表包含以下欄位：

```
- Title (Single line text)
- Slug (Single line text)
- Publish Date (Date)
- Author (Single line text)
- Summary (Long text)
- Category (Single select)
- Content (Long text)
- Keywords (Single line text)
- Excerpt (Long text)
- Featured Image URL (URL)
- Status (Single select: "Publish" / "Draft" / etc)
```

### 環境變數

確保您的 `.env.local` 包含：

```bash
AIRTABLE_API_KEY=your_api_key
AIRTABLE_BASE_ID=your_base_id
AIRTABLE_TOKEN=your_token  # 或使用 API_KEY
```

### 重新驗證

網站設置了 60 秒的重新驗證時間。添加文章後，最多需要 60 秒即可看到更新。

## 故障排除

### 文章不顯示
- ✅ 檢查 Status 欄是否設置為 "Publish"
- ✅ 確保 Title 和 Slug 都已填入
- ✅ 驗證 Airtable 連接憑證正確

### URL 出現 404
- ✅ 驗證 Slug 格式（小寫、使用連字符）
- ✅ 檢查是否有特殊字符或空格

### 內容格式問題
- ✅ 使用 Markdown 格式寫內容
- ✅ 確保所有標題使用 ## 格式（H2）
- ✅ 代碼塊使用三重反引號

## 聯繫方式

如有任何導入問題或需要支援，請聯繫 OCC 技術團隊。

---

**文件版本**: 2025-05-07  
**作者**: Claude Code  
**狀態**: 準備導入 ✅
