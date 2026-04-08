/**
 * 與 Next 網站讀同一套 lib/airtable（需先載入 .env.local / .env）。
 * 用法：npm run check:blog
 * 抽單篇：npm run check:blog -- my-post-slug
 */
import { config } from 'dotenv'

config({ path: '.env.local' })
config({ path: '.env' })

import { getBlogAlignmentReport, getPostBySlug } from '../lib/airtable'

function normalizeSlugInput(raw: string): string {
  let s = raw.trim()
  try {
    if (s.includes('://')) {
      const u = new URL(s)
      const path = u.pathname.replace(/\/$/, '')
      const m = path.match(/\/blog\/(?:blog\/)?(.+)$/)
      if (m) return decodeURIComponent(m[1])
    }
  } catch {
    /* ignore */
  }
  s = s.replace(/^\/+/, '').replace(/^blog\/+/, '')
  try {
    return decodeURIComponent(s)
  } catch {
    return s
  }
}

const REASON_ZH: Record<string, string> = {
  not_publish: 'status 不是 publish / published',
  missing_title: '缺 title',
  missing_content: '缺 Content',
  empty_slug: 'slug 空白',
  bad_slug: 'slug 格式不符（僅英數與 - _）',
}

async function main() {
  const slugArg = process.argv[2] ? normalizeSlugInput(process.argv[2]) : ''

  console.log('=== OCC blog 對齊檢查（與線上同一套規則）===\n')

  const report = await getBlogAlignmentReport()

  console.log('環境變數')
  console.log(`  AIRTABLE_API_KEY 或 AIRTABLE_PAT: ${report.env.hasKey ? '已設定' : '未設定'}`)
  console.log(`  AIRTABLE_BASE_ID: ${report.env.hasBase ? '已設定' : '未設定'}`)
  console.log('')

  if (!report.env.hasKey || !report.env.hasBase) {
    console.error('請在 .env.local 設定 AIRTABLE_API_KEY（或 AIRTABLE_PAT）與 AIRTABLE_BASE_ID，與 Vercel Production 一致。')
    process.exit(1)
  }

  if (!report.apiOk) {
    console.error('Airtable API 失敗:', report.apiError ?? 'unknown')
    process.exit(1)
  }

  console.log(`表內筆數（最多 100）: ${report.totalRecords}`)
  console.log(`可公開顯示篇數: ${report.displayableCount}`)
  console.log('')

  if (report.skipped.length > 0) {
    console.log('未符合上線條件的列（不會出現在 /blog）：')
    for (const row of report.skipped) {
      const why = REASON_ZH[row.reason] ?? row.reason
      console.log(`  — ${row.titleHint} | status=${row.statusHint} | slug=${row.slugHint}`)
      console.log(`    id=${row.id} → ${why}`)
    }
    console.log('')
  }

  console.log('可公開文章的 slug（前 20 個）：')
  for (const p of report.displayable.slice(0, 20)) {
    console.log(`  /blog/${p.slug}`)
  }
  if (report.displayable.length > 20) {
    console.log(`  … 共 ${report.displayable.length} 篇`)
  }
  console.log('')

  if (slugArg) {
    const canonical = `/blog/${slugArg}`
    console.log(`單篇測試 slug: ${slugArg}`)
    const post = await getPostBySlug(slugArg)
    if (post) {
      console.log(`  → OK，可讀取: ${canonical}`)
      console.log(`     title: ${post.title}`)
    } else {
      console.log(`  → 讀不到（404）。請對照上方「未符合」或 slug 是否與表內一致。`)
      console.log(`     正確網址應為: https://origincafekh.com${canonical}`)
      process.exit(1)
    }
  }

  console.log('完成。請將 Vercel Production 的環境變數與此機 .env.local 對齊後再部署。')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
