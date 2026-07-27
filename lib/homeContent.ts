/**
 * 首頁 AEO 內容單一來源 — 同時供 FAQPage JSON-LD（page.tsx）與
 * 頁面可見區塊（HomePageClient.tsx）使用。
 * Google 要求 FAQPage 的 schema 內容必須與可見文字一致，故共用此檔。
 */

/** 內容最後審訂日期（content freshness / dateModified）。更新內文時一併調整。 */
export const homeDateModified = "2026-07-26"

/**
 * 首頁問答 — 每則回答為 30–150 字、自包含語句（主詞+動詞開頭，
 * 不以 This / It 等回指詞起頭），符合 AI 引擎的 chunk 擷取需求。
 */
export const homeFaqs = [
  {
    q: "What is Fine Robusta?",
    a: "Fine Robusta is a grade of Robusta coffee that scores 80 points or higher on the Coffee Quality Institute's Fine Robusta cupping protocol. Unlike commodity Robusta, Fine Robusta is evaluated for clarity, sweetness, and the absence of defects — the same discipline applied to specialty Arabica. Origin Coffee Cambodia sources and grades Fine Robusta from Mondulkiri to this standard.",
  },
  {
    q: "What does Origin Coffee Cambodia do?",
    a: "Origin Coffee Cambodia is a B2B specialty coffee company that connects Cambodian Fine Robusta producers with global buyers. The company operates across five functions — sourcing, precision roasting, wholesale supply, barista training, and industry development — so that quality is controlled at every handoff from farm to cup.",
  },
  {
    q: "Who does Origin Coffee Cambodia supply?",
    a: "Origin Coffee Cambodia supplies coffee roasters, importers, cafés, and distributors that need traceable Cambodian Fine Robusta and specialty coffee in wholesale volume. Each buyer receives green or roasted coffee matched to a defined roast profile and cupping score, with consistent lot documentation for every shipment.",
  },
  {
    q: "Where is Cambodian Fine Robusta grown?",
    a: "Cambodian Fine Robusta is grown primarily in Mondulkiri, a highland province in the country's east where elevation and volcanic soil support higher-scoring Robusta and Arabica. Origin Coffee Cambodia sources single-origin lots from this region and processes them to Fine Robusta grading standards.",
  },
] as const
